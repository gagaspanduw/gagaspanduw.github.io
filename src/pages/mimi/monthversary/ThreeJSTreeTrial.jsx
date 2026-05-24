import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as THREE from 'three';

// ── Month data ──
const months = [
  {
    number: 4,
    route: '/mimi/monthversary/4',
    title: '4th Monthversary',
    date: 'May 26, 2026',
    hint: 'Tap to unwrap',
    unlockDate: new Date('2026-05-26T00:00:00'),
  },
  // { number: 5, route: '/mimi/monthversary/5', title: '5th Monthversary', date: 'June 26, 2026', hint: '...', unlockDate: new Date('2026-06-26T00:00:00') },
  // { number: 6, route: '/mimi/monthversary/6', title: '6th Monthversary', date: 'July 26, 2026', hint: '...', unlockDate: new Date('2026-07-26T00:00:00') },
  // { number: 7, route: '/mimi/monthversary/7', title: '7th Monthversary', date: 'August 26, 2026', hint: '...', unlockDate: new Date('2026-08-26T00:00:00') },
  // { number: 8, route: '/mimi/monthversary/8', title: '8th Monthversary', date: 'September 26, 2026', hint: '...', unlockDate: new Date('2026-09-26T00:00:00') },
];

function getFruitPosition(index, total, p) {
  const angle = (index / Math.max(total, 1)) * Math.PI * 2 + 0.3;
  // Place fruit inside the canopy, not at the far edge
  const r = p.canopyRadius * 0.45;
  const y = p.trunkHeight + p.canopyHeight * 0.35 + (index % 2) * 0.2;
  const x = Math.cos(angle) * r;
  const z = Math.sin(angle) * r;
  return [x, y, z];
}

export default function ThreeJSTreeTrial() {
  const canvasRef = useRef(null);
  const history = useHistory();
  const [hoveredFruit, setHoveredFruit] = useState(null);

  // Use refs so the Three.js effect doesn't re-run on state changes
  const hoveredRef = useRef(null);
  const nowRef = useRef(new Date());

  const handleFruitClick = useCallback((month) => {
    const now = nowRef.current;
    const isUnlocked = !month.unlockDate || now >= month.unlockDate;
    if (isUnlocked) history.push(month.route);
  }, [history]);

  const handleFruitClickRef = useRef(handleFruitClick);
  handleFruitClickRef.current = handleFruitClick;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Growth calculation ──
    const now = nowRef.current;
    const unlocked = months.filter(m => !m.unlockDate || now >= m.unlockDate);
    // 1 month = 0.15 (tiny sapling), 4 months = 0.6, 7+ months = full
    const growth = Math.min(1, unlocked.length * 0.15);

    const lerp = (a, b, t) => a + (b - a) * t;

    const P = {
      trunkHeight: lerp(0.4, 2.5, growth),
      trunkRadiusTop: lerp(0.03, 0.16, growth),
      trunkRadiusBottom: lerp(0.08, 0.34, growth),
      rootCount: Math.max(1, Math.floor(lerp(1, 7, growth))),
      rootSpread: lerp(0.15, 1.1, growth),
      branchCount: Math.max(1, Math.floor(lerp(1, 14, growth))),
      branchSpread: lerp(0.2, 2.2, growth),
      canopyLayers: Math.max(2, Math.floor(lerp(3, 14, growth))),
      canopyRadius: lerp(0.5, 3.0, growth),
      canopyHeight: lerp(0.4, 2.5, growth),
      cameraDistance: lerp(3.5, 9, growth),
      vineCount: Math.floor(lerp(0, 8, growth)),
      fireflyCount: Math.floor(lerp(5, 35, growth)),
      particleCount: Math.floor(lerp(8, 50, growth)),
    };

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0f0a, 0.02);

    // ── Camera ──
    const camera = new THREE.PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight, 0.1, 100);

    const orbit = {
      theta: 0, phi: 0.38, radius: P.cameraDistance,
      target: new THREE.Vector3(0, P.trunkHeight * 0.55, 0),
      isDragging: false, prevX: 0, prevY: 0,
      velTheta: 0, velPhi: 0, idleTime: 0, autoRotate: true,
    };

    const updateCamera = () => {
      const p = Math.max(0.05, Math.min(Math.PI * 0.45, orbit.phi));
      orbit.phi = p;
      camera.position.x = orbit.target.x + orbit.radius * Math.sin(p) * Math.sin(orbit.theta);
      camera.position.y = orbit.target.y + orbit.radius * Math.cos(p);
      camera.position.z = orbit.target.z + orbit.radius * Math.sin(p) * Math.cos(orbit.theta);
      camera.lookAt(orbit.target);
    };
    updateCamera();

    // ── Lighting ──
    scene.add(new THREE.AmbientLight(0x2E7D32, 0.25));
    const sun = new THREE.DirectionalLight(0xFFF8E1, 0.65);
    sun.position.set(4, 8, 3);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x81C784, 0.2);
    fill.position.set(-3, 4, -2);
    scene.add(fill);
    const rootGlow = new THREE.PointLight(0x4CAF50, 0.4, 5);
    rootGlow.position.set(0, 0.3, 0);
    scene.add(rootGlow);
    const canopyLight = new THREE.PointLight(0x66BB6A, 0.35, 8);
    canopyLight.position.set(0, P.trunkHeight + P.canopyHeight * 0.4, 0);
    scene.add(canopyLight);

    // ── Tree group ──
    const treeGroup = new THREE.Group();
    scene.add(treeGroup);

    const barkMat = new THREE.MeshStandardMaterial({ color: 0x4E342E, roughness: 0.92 });
    const barkDarkMat = new THREE.MeshStandardMaterial({ color: 0x3E2723, roughness: 0.95 });

    // ── Trunk (twisted) ──
    const trunkGeo = new THREE.CylinderGeometry(P.trunkRadiusTop, P.trunkRadiusBottom, P.trunkHeight, 12);
    const tPos = trunkGeo.attributes.position;
    for (let i = 0; i < tPos.count; i++) {
      const y = tPos.getY(i);
      const ny = (y + P.trunkHeight / 2) / P.trunkHeight;
      const twist = ny * 0.18;
      const x = tPos.getX(i), z = tPos.getZ(i);
      tPos.setX(i, x * Math.cos(twist) - z * Math.sin(twist));
      tPos.setZ(i, x * Math.sin(twist) + z * Math.cos(twist));
    }
    trunkGeo.computeVertexNormals();
    const trunk = new THREE.Mesh(trunkGeo, barkMat);
    trunk.position.y = P.trunkHeight / 2;
    treeGroup.add(trunk);

    // ── Roots ──
    for (let i = 0; i < P.rootCount; i++) {
      const a = (i / P.rootCount) * Math.PI * 2 + Math.random() * 0.3;
      const len = P.rootSpread * (0.7 + Math.random() * 0.3);
      const rad = P.trunkRadiusBottom * (0.25 + Math.random() * 0.15);
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.15, 0),
        new THREE.Vector3(Math.cos(a) * len * 0.35, 0.04, Math.sin(a) * len * 0.35),
        new THREE.Vector3(Math.cos(a) * len * 0.7, -0.06, Math.sin(a) * len * 0.7),
        new THREE.Vector3(Math.cos(a) * len, -0.12, Math.sin(a) * len),
      ]);
      treeGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 8, rad, 5, false), barkDarkMat));
    }

    // ── Branches ──
    const branchGroup = new THREE.Group();
    branchGroup.position.y = P.trunkHeight;
    treeGroup.add(branchGroup);

    for (let i = 0; i < P.branchCount; i++) {
      const a = (i / P.branchCount) * Math.PI * 2 + Math.random() * 0.4;
      const elev = 0.25 + Math.random() * 0.55;
      const len = P.branchSpread * (0.65 + Math.random() * 0.35);
      const rad = P.trunkRadiusTop * (0.25 + (i < 5 ? 0.25 : 0.1));
      // Branch curve — natural length without overextending
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(a) * len * 0.3, elev * len * 0.35, Math.sin(a) * len * 0.3),
        new THREE.Vector3(Math.cos(a) * len * 0.65, elev * len * 0.7, Math.sin(a) * len * 0.65),
        new THREE.Vector3(Math.cos(a) * len * 0.9, elev * len * 0.9, Math.sin(a) * len * 0.9),
        new THREE.Vector3(Math.cos(a) * len, elev * len, Math.sin(a) * len),
      ]);
      branchGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 10, rad, 5, false), barkMat));
    }

    // ── Canopy ──
    const canopyColors = [0x1B5E20, 0x2E7D32, 0x388E3C, 0x43A047, 0x4CAF50, 0x66BB6A, 0x81C784];
    const canopyMeshes = [];
    const baseY = P.trunkHeight;

    // Leaf shape types: 0=round, 1=flat, 2=elongated, 3=pointy
    const makeLeafGeo = (size, shapeType) => {
      switch (shapeType) {
        case 1: { // Flat leaf — wide and thin like a real leaf
          const g = new THREE.IcosahedronGeometry(size, 1);
          g.scale(1.3, 0.35, 1.0);
          return g;
        }
        case 2: { // Elongated — long and narrow
          const g = new THREE.IcosahedronGeometry(size, 1);
          g.scale(0.5, 1.4, 0.5);
          return g;
        }
        case 3: { // Pointy — like a pine/conifer leaf cluster
          const g = new THREE.ConeGeometry(size * 0.7, size * 1.6, 5);
          return g;
        }
        default: // Round cluster
          return new THREE.IcosahedronGeometry(size, 1);
      }
    };

    for (let i = 0; i < P.canopyLayers; i++) {
      const t = i / (P.canopyLayers - 1);
      // Natural taper — wider at bottom, narrower at top
      const layerR = P.canopyRadius * (1.0 - t * 0.35);
      const y = baseY + P.canopyHeight * (0.1 + t * 0.8);
      const blobR = P.canopyRadius * (0.25 + (1 - t) * 0.2);
      // More blobs per layer for a fuller canopy
      const count = Math.max(2, Math.floor(lerp(2, 5, growth) + (1 - t) * lerp(3, 8, growth)));

      for (let j = 0; j < count; j++) {
        const a = (j / count) * Math.PI * 2 + t * 0.5 + Math.random() * 0.3;
        // Tighter distribution — keep leaves connected to branches
        const r = layerR * (0.15 + Math.random() * 0.55);
        const size = blobR * (0.4 + Math.random() * 0.35);
        const ci = Math.min(Math.floor(t * canopyColors.length + Math.random() * 2), canopyColors.length - 1);
        // Mix leaf shapes — 30% round, 30% flat, 20% elongated, 20% pointy
        const shapeType = Math.random() < 0.3 ? 0 : Math.random() < 0.5 ? 1 : Math.random() < 0.6 ? 2 : 3;

        const geo = makeLeafGeo(size, shapeType);
        const mat = new THREE.MeshStandardMaterial({ color: canopyColors[ci], roughness: 0.7, flatShading: true });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(Math.cos(a) * r, y + Math.random() * 0.15, Math.sin(a) * r);
        mesh.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
        treeGroup.add(mesh);
        canopyMeshes.push({ mesh, baseY: mesh.position.y });
      }
    }

    // Core blob — fills center to connect trunk to outer leaves
    const coreGeo = new THREE.IcosahedronGeometry(P.canopyRadius * 0.45, 1);
    const coreMat = new THREE.MeshStandardMaterial({ color: 0x2E7D32, roughness: 0.75, flatShading: true });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(0, baseY + P.canopyHeight * 0.4, 0);
    treeGroup.add(coreMesh);
    canopyMeshes.push({ mesh: coreMesh, baseY: coreMesh.position.y });

    // ── Hanging vines / moss ──
    const vineMat = new THREE.MeshStandardMaterial({ color: 0x33691E, roughness: 0.85, transparent: true, opacity: 0.7 });
    for (let i = 0; i < P.vineCount; i++) {
      const a = (i / P.vineCount) * Math.PI * 2 + Math.random() * 0.4;
      const dist = P.canopyRadius * (0.5 + Math.random() * 0.4);
      const hangLen = 0.6 + Math.random() * 1.0;
      const startY = baseY + P.canopyHeight * (0.2 + Math.random() * 0.3);
      const vine = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.cos(a) * dist, startY, Math.sin(a) * dist),
        new THREE.Vector3(Math.cos(a) * dist * 1.05, startY - hangLen * 0.4, Math.sin(a) * dist * 1.05),
        new THREE.Vector3(Math.cos(a) * dist * 0.95, startY - hangLen * 0.8, Math.sin(a) * dist * 0.95),
        new THREE.Vector3(Math.cos(a) * dist * 1.0, startY - hangLen, Math.sin(a) * dist * 1.0),
      ]);
      treeGroup.add(new THREE.Mesh(new THREE.TubeGeometry(vine, 6, 0.015 + Math.random() * 0.01, 4, false), vineMat));
    }

    // ── Fruits ──
    const fruitMeshes = [];

    unlocked.forEach((month, i) => {
      const pos = getFruitPosition(i, unlocked.length, P);
      const g = new THREE.Group();
      g.position.set(...pos);

      const orbGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const orbMat = new THREE.MeshStandardMaterial({
        color: 0xFFD54F, emissive: 0xFFA000, emissiveIntensity: 0.9, roughness: 0.2, metalness: 0.3,
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      g.add(orb);

      const haloMat = new THREE.SpriteMaterial({ color: 0xFFC107, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
      const halo = new THREE.Sprite(haloMat);
      halo.scale.set(1.1, 1.1, 1.1);
      g.add(halo);

      const ringGeo = new THREE.TorusGeometry(0.32, 0.02, 8, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xFFD54F, transparent: true, opacity: 0.5 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      g.add(ring);

      const stemGeo = new THREE.CylinderGeometry(0.01, 0.015, 0.18, 4);
      const stem = new THREE.Mesh(stemGeo, new THREE.MeshStandardMaterial({ color: 0x5D4037 }));
      stem.position.y = 0.26;
      g.add(stem);

      // Point light at fruit for glow effect
      const fruitLight = new THREE.PointLight(0xFFC107, 0.4, 2);
      g.add(fruitLight);

      orb.userData = { month, ring, halo, basePos: [...pos] };
      scene.add(g);
      fruitMeshes.push(orb);
    });

    // ── Rising energy particles ──
    const pCount = P.particleCount;
    const pBuf = new Float32Array(pCount * 3);
    const pMeta = [];
    for (let i = 0; i < pCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.random() * P.rootSpread * 1.2;
      pBuf[i * 3] = Math.cos(a) * d;
      pBuf[i * 3 + 1] = Math.random() * (P.trunkHeight + P.canopyHeight);
      pBuf[i * 3 + 2] = Math.sin(a) * d;
      pMeta.push({ speed: 0.2 + Math.random() * 0.4, phase: Math.random() * Math.PI * 2 });
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pBuf, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x81C784, size: 0.04, transparent: true, opacity: 0.55,
      blending: THREE.AdditiveBlending, sizeAttenuation: true,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    // ── Fireflies ──
    const ffCount = P.fireflyCount;
    const ffBuf = new Float32Array(ffCount * 3);
    const ffMeta = [];
    for (let i = 0; i < ffCount; i++) {
      const spread = Math.max(3, P.canopyRadius * 2.5);
      ffBuf[i * 3] = (Math.random() - 0.5) * spread;
      ffBuf[i * 3 + 1] = 0.5 + Math.random() * (P.trunkHeight + P.canopyHeight + 1);
      ffBuf[i * 3 + 2] = (Math.random() - 0.5) * spread;
      ffMeta.push({ speed: 0.3 + Math.random() * 0.5, phase: Math.random() * 6 });
    }
    const ffGeo = new THREE.BufferGeometry();
    ffGeo.setAttribute('position', new THREE.BufferAttribute(ffBuf, 3));
    const ffMat = new THREE.PointsMaterial({
      color: 0xFFFF88, size: 0.06, transparent: true, opacity: 0.7,
      blending: THREE.AdditiveBlending, sizeAttenuation: true,
    });
    scene.add(new THREE.Points(ffGeo, ffMat));

    // ── Ground ──
    const groundGeo = new THREE.CircleGeometry(Math.max(2, P.canopyRadius * 1.5), 32);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x1B5E20, roughness: 1, transparent: true, opacity: 0.08 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    scene.add(ground);

    // ── Stars ──
    const sBuf = new Float32Array(150 * 3);
    for (let i = 0; i < 150; i++) {
      sBuf[i * 3] = (Math.random() - 0.5) * 60;
      sBuf[i * 3 + 1] = 5 + Math.random() * 30;
      sBuf[i * 3 + 2] = -10 - Math.random() * 35;
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute('position', new THREE.BufferAttribute(sBuf, 3));
    scene.add(new THREE.Points(sGeo, new THREE.PointsMaterial({
      color: 0xffffff, size: 0.07, transparent: true, opacity: 0.4, sizeAttenuation: true,
    })));

    // ── Pointer / orbit controls ──
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let downTime = 0, wasMoved = false;

    const getMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const checkFruitHover = () => {
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(fruitMeshes);
      const newHover = hits.length > 0 ? hits[0].object.userData.month.number : null;
      if (newHover !== hoveredRef.current) {
        hoveredRef.current = newHover;
        setHoveredFruit(newHover);
      }
      canvas.style.cursor = orbit.isDragging ? 'grabbing' : (newHover ? 'pointer' : 'grab');
    };

    const onDown = (e) => {
      orbit.isDragging = true; orbit.prevX = e.clientX; orbit.prevY = e.clientY;
      orbit.velTheta = 0; orbit.velPhi = 0; orbit.autoRotate = false; orbit.idleTime = 0;
      downTime = Date.now(); wasMoved = false;
    };
    const onMove = (e) => {
      getMouse(e);
      checkFruitHover();
      if (!orbit.isDragging) return;
      const dx = e.clientX - orbit.prevX, dy = e.clientY - orbit.prevY;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) wasMoved = true;
      orbit.velTheta = -dx * 0.005; orbit.velPhi = dy * 0.003;
      orbit.theta += orbit.velTheta; orbit.phi += orbit.velPhi;
      orbit.prevX = e.clientX; orbit.prevY = e.clientY;
      canvas.style.cursor = 'grabbing';
    };
    const onUp = (e) => {
      orbit.isDragging = false;
      canvas.style.cursor = 'grab';
      if (Date.now() - downTime < 250 && !wasMoved) {
        getMouse(e);
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(fruitMeshes);
        if (hits.length > 0) handleFruitClickRef.current(hits[0].object.userData.month);
      }
    };

    const onTouchStart = (e) => { if (e.touches.length === 1) onDown({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }); };
    const onTouchMove = (e) => { if (e.touches.length === 1) { e.preventDefault(); onMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }); } };
    const onTouchEnd = (e) => { const t = e.changedTouches[0]; onUp({ clientX: t.clientX, clientY: t.clientY }); };
    const onWheel = (e) => { e.preventDefault(); orbit.radius = Math.max(3, Math.min(14, orbit.radius + e.deltaY * 0.005)); orbit.autoRotate = false; orbit.idleTime = 0; };

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointerleave', () => { orbit.isDragging = false; });
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);
    canvas.addEventListener('wheel', onWheel, { passive: false });

    // ── Animation ──
    let frameId;
    const clock = new THREE.Clock();
    const maxY = P.trunkHeight + P.canopyHeight + 1.5;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const dt = Math.min(clock.getDelta(), 0.05);

      // Orbit
      if (!orbit.isDragging) {
        orbit.idleTime += dt;
        if (orbit.idleTime > 3) orbit.autoRotate = true;
        orbit.velTheta *= 0.95; orbit.velPhi *= 0.95;
        orbit.theta += orbit.velTheta; orbit.phi += orbit.velPhi;
      }
      if (orbit.autoRotate && !orbit.isDragging) orbit.theta += 0.0015;
      updateCamera();

      // Tree sway
      treeGroup.rotation.z = Math.sin(t * 0.12) * 0.005;

      // Canopy sway
      canopyMeshes.forEach((c, i) => {
        c.mesh.rotation.y += 0.0004;
        c.mesh.position.y = c.baseY + Math.sin(t * 0.3 + i * 0.35) * 0.01;
      });

      // Rising particles
      const pp = pGeo.attributes.position;
      for (let i = 0; i < pCount; i++) {
        pp.array[i * 3 + 1] += pMeta[i].speed * dt;
        pp.array[i * 3] += Math.sin(t * 0.5 + pMeta[i].phase) * 0.001;
        pp.array[i * 3 + 2] += Math.cos(t * 0.5 + pMeta[i].phase) * 0.001;
        if (pp.array[i * 3 + 1] > maxY) {
          pp.array[i * 3 + 1] = 0;
          const a = Math.random() * Math.PI * 2;
          pp.array[i * 3] = Math.cos(a) * Math.random() * P.rootSpread;
          pp.array[i * 3 + 2] = Math.sin(a) * Math.random() * P.rootSpread;
        }
      }
      pp.needsUpdate = true;
      pMat.opacity = 0.3 + Math.sin(t * 1.2) * 0.15;

      // Fireflies
      const fp = ffGeo.attributes.position;
      for (let i = 0; i < ffCount; i++) {
        fp.array[i * 3] += Math.sin(t * ffMeta[i].speed + ffMeta[i].phase) * 0.002;
        fp.array[i * 3 + 1] += Math.cos(t * ffMeta[i].speed * 0.7 + ffMeta[i].phase) * 0.0008;
        fp.array[i * 3 + 2] += Math.cos(t * ffMeta[i].speed + ffMeta[i].phase) * 0.002;
      }
      fp.needsUpdate = true;
      ffMat.opacity = 0.4 + Math.sin(t * 1.5) * 0.25;

      // Fruit
      fruitMeshes.forEach((orb, i) => {
        const bp = orb.userData.basePos;
        orb.parent.position.y = bp[1] + Math.sin(t * 1.2 + i) * 0.04;
        orb.userData.ring.rotation.x = Math.sin(t + i) * 0.3;
        orb.userData.ring.rotation.y = t * 0.6;
        const pulse = 0.5 + Math.sin(t * 2 + i) * 0.15;
        orb.userData.halo.scale.set(pulse, pulse, pulse);
        orb.userData.halo.material.opacity = 0.35 + Math.sin(t * 2.5 + i) * 0.15;
      });

      rootGlow.intensity = 0.3 + Math.sin(t * 0.8) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('wheel', onWheel);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount — refs handle dynamic values

  const now = nowRef.current;

  return (
    <div style={styles.page}>
      {/* Full-width immersive canvas */}
      <div style={styles.canvasSection}>
        <canvas ref={canvasRef} style={styles.canvas} />
        <p style={styles.dragHint}>Drag to rotate &middot; Scroll to zoom</p>

        {/* Floating header overlay */}
        <div style={styles.headerOverlay}>
          <p style={styles.topLabel}>Our little garden</p>
          <h1 style={styles.title}>Monthversary</h1>
          <p style={styles.subtitle}>
            Our tree grows with every month we share.
          </p>
        </div>

        {/* Floating tooltip */}
        {hoveredFruit && (() => {
          const month = months.find(m => m.number === hoveredFruit);
          if (!month) return null;
          const isUnlocked = !month.unlockDate || now >= month.unlockDate;
          return (
            <div style={styles.tooltip}>
              <span>{isUnlocked ? '\uD83C\uDF4E' : '\uD83C\uDF31'}</span>
              <span style={styles.tooltipTitle}>{month.title}</span>
              <span style={styles.tooltipHint}>
                {isUnlocked ? month.hint : 'Coming soon...'}
              </span>
            </div>
          );
        })()}
      </div>

      {/* Month cards below */}
      <div style={styles.bottomSection}>
        <div style={styles.monthCards}>
          {months.map((month) => {
            const isUnlocked = !month.unlockDate || now >= month.unlockDate;
            return (
              <div
                key={month.number}
                style={{
                  ...styles.monthCard,
                  ...(hoveredFruit === month.number && isUnlocked ? styles.monthCardHover : {}),
                  ...(!isUnlocked ? styles.monthCardLocked : {}),
                }}
                onClick={() => handleFruitClick(month)}
              >
                <span style={styles.monthEmoji}>{isUnlocked ? '\uD83C\uDF4E' : '\uD83C\uDF31'}</span>
                <div style={styles.monthInfo}>
                  <p style={styles.monthTitle}>{month.title}</p>
                  <p style={styles.monthDate}>{month.date}</p>
                  <p style={isUnlocked ? styles.monthHint : styles.countdownText}>
                    {isUnlocked ? month.hint : 'Coming soon...'}
                  </p>
                </div>
                <span style={{ ...styles.arrow, opacity: isUnlocked ? 1 : 0.2 }}>{'\u2192'}</span>
              </div>
            );
          })}
        </div>
        <p style={styles.footer}>Our tree is still growing. More fruits will bloom soon.</p>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0a0f0a',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Lora', Georgia, serif",
    boxSizing: 'border-box',
  },
  canvasSection: {
    position: 'relative',
    width: '100%',
    height: '75vh',
    minHeight: '450px',
    background: 'linear-gradient(180deg, #050a05 0%, #0a0f0a 50%, #0d120d 100%)',
    overflow: 'hidden',
  },
  canvas: {
    width: '100%',
    height: '100%',
    display: 'block',
    cursor: 'grab',
  },
  dragHint: {
    position: 'absolute',
    bottom: '14px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.2)',
    fontFamily: "'Caveat', cursive",
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
  },
  headerOverlay: {
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    pointerEvents: 'none',
    animation: 'fadeUp 0.8s ease-out both',
    zIndex: 2,
  },
  topLabel: {
    fontFamily: "'Caveat', cursive",
    fontSize: '20px',
    color: 'rgba(255,255,255,0.35)',
    margin: '0 0 4px 0',
  },
  title: {
    fontFamily: "'Lora', Georgia, serif",
    fontSize: 'clamp(32px, 7vw, 48px)',
    color: '#81C784',
    margin: '0 0 6px 0',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    textShadow: '0 2px 20px rgba(76,175,80,0.3)',
  },
  subtitle: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.35)',
    margin: 0,
    fontStyle: 'italic',
  },
  tooltip: {
    position: 'absolute',
    bottom: '45px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 18px',
    background: 'rgba(10,15,10,0.85)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '14px',
    backdropFilter: 'blur(10px)',
    zIndex: 3,
    whiteSpace: 'nowrap',
  },
  tooltipTitle: { fontSize: '13px', color: '#fff', fontWeight: 600 },
  tooltipHint: { fontSize: '12px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' },

  bottomSection: {
    flex: 1,
    background: '#0a0f0a',
    padding: '20px 14px 32px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  monthCards: {
    width: '100%',
    maxWidth: '500px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
  },
  monthCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '14px',
    padding: '16px 18px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  monthCardHover: {
    background: 'rgba(76, 175, 80, 0.08)',
    borderColor: 'rgba(76, 175, 80, 0.2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 24px rgba(76, 175, 80, 0.1)',
  },
  monthCardLocked: { opacity: 0.5, cursor: 'not-allowed' },
  monthEmoji: { fontSize: '28px', flexShrink: 0 },
  monthInfo: { flex: 1, minWidth: 0 },
  monthTitle: { fontSize: '16px', color: '#fff', margin: '0 0 2px 0', fontWeight: 600 },
  monthDate: { fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: '0 0 4px 0' },
  monthHint: { fontSize: '13px', color: 'rgba(255,255,255,0.45)', margin: 0, fontStyle: 'italic' },
  countdownText: { fontSize: '13px', color: '#81C784', margin: 0, fontFamily: "'Caveat', cursive", fontWeight: 600 },
  arrow: { fontSize: '18px', color: 'rgba(255,255,255,0.2)', flexShrink: 0 },
  footer: {
    textAlign: 'center', fontSize: '14px', color: 'rgba(255,255,255,0.25)',
    margin: 0, fontStyle: 'italic',
  },
};
