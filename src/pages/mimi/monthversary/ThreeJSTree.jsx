import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as THREE from 'three';
import { Tree, TreeType, BarkType, LeafType } from '@dgreenheck/ez-tree';

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
  const angle = (index / Math.max(total, 1)) * Math.PI * 2 + 0.5;
  // Place tulips on the ground around the tree base
  const r = Math.max(0.5, p.canopyRadius * 0.6) + index * 0.15;
  const y = -0.1;
  const x = Math.cos(angle) * r;
  const z = Math.sin(angle) * r;
  return [x, y, z];
}

export default function ThreeJSTree() {
  const canvasRef = useRef(null);
  const history = useHistory();
  const [hoveredFruit, setHoveredFruit] = useState(null);

  // Use refs so the Three.js effect doesn't re-run on state changes
  const hoveredRef = useRef(null);
  const nowRef = useRef(new Date());

  const handleFruitClick = useCallback((month) => {
    if (!month) return;
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
    const hemiLight = new THREE.HemisphereLight(0x87CEEB, 0x1B5E20, 0.15);
    scene.add(hemiLight);
    scene.add(new THREE.AmbientLight(0x2E7D32, 0.15));
    const sun = new THREE.DirectionalLight(0xFFF8E1, 0.7);
    sun.position.set(4, 8, 3);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x81C784, 0.18);
    fill.position.set(-3, 4, -2);
    scene.add(fill);
    // Warm rim light from behind — adds depth and silhouette glow
    const rim = new THREE.DirectionalLight(0xFFE0B2, 0.25);
    rim.position.set(-2, 5, -5);
    scene.add(rim);
    // Cool moonlight from above-left
    const moon = new THREE.DirectionalLight(0xB3E5FC, 0.1);
    moon.position.set(-4, 10, 2);
    scene.add(moon);
    const rootGlow = new THREE.PointLight(0x4CAF50, 0.4, 5);
    rootGlow.position.set(0, 0.3, 0);
    scene.add(rootGlow);
    const canopyLight = new THREE.PointLight(0x66BB6A, 0.35, 8);
    canopyLight.position.set(0, P.trunkHeight + P.canopyHeight * 0.4, 0);
    scene.add(canopyLight);

    // ── Tree group ──
    const treeGroup = new THREE.Group();
    scene.add(treeGroup);

    // ── ez-tree procedural tree ──
    const treeLevels = growth < 0.2 ? 1 : growth < 0.45 ? 2 : 3;
    const treeScale = lerp(0.06, 0.22, growth);

    const tree = new Tree();
    tree.options.seed = 42;
    tree.options.type = TreeType.Deciduous;
    tree.options.bark.type = BarkType.Oak;
    tree.options.bark.tint = 0x5D4037;
    tree.options.bark.textured = true;
    tree.options.bark.flatShading = false;

    // Branch config scaled with growth
    tree.options.branch.levels = treeLevels;
    tree.options.branch.angle = { 1: lerp(50, 70, growth), 2: lerp(45, 60, growth), 3: 55 };
    tree.options.branch.children = {
      0: Math.max(2, Math.floor(lerp(3, 7, growth))),
      1: Math.max(2, Math.floor(lerp(3, 6, growth))),
      2: Math.max(1, Math.floor(lerp(2, 5, growth))),
    };
    tree.options.branch.length = {
      0: lerp(8, 16, growth),
      1: lerp(5, 12, growth),
      2: lerp(3, 6, growth),
      3: lerp(0.5, 1.5, growth),
    };
    tree.options.branch.radius = {
      0: lerp(0.8, 1.5, growth),
      1: lerp(0.3, 0.7, growth),
      2: lerp(0.2, 0.5, growth),
      3: lerp(0.1, 0.3, growth),
    };
    tree.options.branch.gnarliness = {
      0: lerp(0.08, 0.15, growth),
      1: lerp(0.1, 0.2, growth),
      2: lerp(0.15, 0.3, growth),
      3: 0.02,
    };
    tree.options.branch.sections = { 0: 12, 1: 10, 2: 8, 3: 6 };
    tree.options.branch.segments = { 0: 8, 1: 6, 2: 4, 3: 3 };
    tree.options.branch.start = { 1: lerp(0.5, 0.35, growth), 2: 0.3, 3: 0.3 };
    tree.options.branch.taper = { 0: 0.7, 1: 0.7, 2: 0.7, 3: 0.7 };
    tree.options.branch.twist = { 0: 0, 1: 0, 2: 0, 3: 0 };
    tree.options.branch.force = { direction: { x: 0, y: 1, z: 0 }, strength: 0.01 };

    // Leaf config
    tree.options.leaves.type = LeafType.Oak;
    tree.options.leaves.count = Math.max(3, Math.floor(lerp(5, 20, growth)));
    tree.options.leaves.size = lerp(1.5, 3.0, growth);
    tree.options.leaves.sizeVariance = 0.7;
    tree.options.leaves.start = lerp(0.2, 0.0, growth);
    tree.options.leaves.angle = lerp(15, 10, growth);
    tree.options.leaves.tint = 0x4CAF50;
    tree.options.leaves.alphaTest = 0.5;

    tree.generate();
    tree.scale.set(treeScale, treeScale, treeScale);
    treeGroup.add(tree);

    // Compute effective tree dimensions for fruit/feature placement
    const effectiveTrunkHeight = tree.options.branch.length[0] * treeScale;
    const effectiveBranchHeight = (tree.options.branch.length[1] || 0) * treeScale;
    const effectiveCanopyTop = effectiveTrunkHeight + effectiveBranchHeight * 1.2;
    const effectiveCanopyRadius = (tree.options.branch.length[1] || effectiveTrunkHeight * 0.5) * treeScale * 0.8;

    // Override P values for fruit/feature positioning to match ez-tree output
    P.trunkHeight = effectiveTrunkHeight;
    P.canopyHeight = effectiveCanopyTop - effectiveTrunkHeight;
    P.canopyRadius = effectiveCanopyRadius;

    // ── Tulips ──
    const fruitMeshes = [];
    const flowerGroups = [];

    const tulipColors = [0xF48FB1, 0xE91E63, 0xF06292, 0xCE93D8, 0xFFCDD2, 0xFF8A80, 0xEF5350];

    // Tulip cup profile — smaller, more delicate
    const tulipProfile = [
      new THREE.Vector2(0.001, 0),
      new THREE.Vector2(0.012, 0.003),
      new THREE.Vector2(0.03, 0.012),
      new THREE.Vector2(0.045, 0.03),
      new THREE.Vector2(0.054, 0.055),
      new THREE.Vector2(0.057, 0.075),
      new THREE.Vector2(0.052, 0.095),
      new THREE.Vector2(0.044, 0.105),
    ];

    const makeTulip = (pos, month) => {
      const g = new THREE.Group();
      g.position.set(...pos);

      const color = tulipColors[Math.floor(Math.random() * tulipColors.length)];

      // Tulip cup — LatheGeometry with 6 petal facets
      const cupGeo = new THREE.LatheGeometry(tulipProfile, 6);
      const cupColors = new Float32Array(cupGeo.attributes.position.count * 3);
      const baseCol = new THREE.Color(color);
      const tipCol = new THREE.Color(color).lerp(new THREE.Color(0xffffff), 0.35);
      const posAttr = cupGeo.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const y = posAttr.getY(i);
        const t = Math.min(1, y / 0.105);
        const c = baseCol.clone().lerp(tipCol, t * 0.5);
        const x = posAttr.getX(i), z = posAttr.getZ(i);
        const angle = Math.atan2(z, x);
        const petalIdx = Math.floor(((angle + Math.PI) / (Math.PI * 2)) * 6);
        if (petalIdx % 2 === 0) c.multiplyScalar(0.88);
        cupColors[i * 3] = c.r;
        cupColors[i * 3 + 1] = c.g;
        cupColors[i * 3 + 2] = c.b;
      }
      cupGeo.setAttribute('color', new THREE.BufferAttribute(cupColors, 3));
      cupGeo.computeVertexNormals();
      const cupMat = new THREE.MeshPhongMaterial({
        vertexColors: true, shininess: 60, side: THREE.DoubleSide,
        emissive: color, emissiveIntensity: 0.08,
      });
      const cup = new THREE.Mesh(cupGeo, cupMat);
      cup.position.y = 0.03;
      g.add(cup);

      // Inner pistil — larger for easier click targeting
      const pistilGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const pistilMat = new THREE.MeshPhongMaterial({
        color: 0xFFD54F, emissive: 0xFFA000, emissiveIntensity: 0.35, shininess: 40,
        transparent: true, opacity: 0.9,
      });
      const pistil = new THREE.Mesh(pistilGeo, pistilMat);
      pistil.position.y = 0.07;
      g.add(pistil);

      // Stem — curved tube
      const stemCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.14, 0),
        new THREE.Vector3(0.003, -0.07, 0.003),
        new THREE.Vector3(-0.002, -0.01, 0),
        new THREE.Vector3(0, 0.03, 0),
      ]);
      const stemGeo = new THREE.TubeGeometry(stemCurve, 6, 0.008, 4, false);
      const stemMat = new THREE.MeshPhongMaterial({ color: 0x388E3C, shininess: 15 });
      g.add(new THREE.Mesh(stemGeo, stemMat));

      // Small leaf on stem
      const leafShape = new THREE.Shape();
      leafShape.moveTo(0, 0);
      leafShape.quadraticCurveTo(0.02, 0.025, 0, 0.06);
      leafShape.quadraticCurveTo(-0.02, 0.025, 0, 0);
      const leafGeo = new THREE.ShapeGeometry(leafShape);
      const leafMat = new THREE.MeshPhongMaterial({ color: 0x4CAF50, shininess: 10, side: THREE.DoubleSide });
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(0.01, -0.08, 0);
      leaf.rotation.set(0, Math.random() * Math.PI, -0.3);
      g.add(leaf);

      // Circular ring indicator — flat on the ground below tulip
      const ringGeo = new THREE.RingGeometry(0.06, 0.09, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color, transparent: true, opacity: 0.35,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0;
      g.add(ring);

      // Subtle point light
      const flowerLight = new THREE.PointLight(color, 0.15, 0.8);
      flowerLight.position.y = 0.07;
      g.add(flowerLight);

      pistil.userData = { month, ring, basePos: [...pos], flowerGroup: g };
      scene.add(g);
      fruitMeshes.push(pistil);
      flowerGroups.push(g);
    };

    unlocked.forEach((month, i) => {
      const pos = getFruitPosition(i, unlocked.length, P);
      makeTulip(pos, month);
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

    // ── Falling leaves ──
    const fallingLeafMeshes = [];
    const fallingLeafCount = Math.floor(lerp(3, 18, growth));
    const fallLeafColors = [0x4CAF50, 0x66BB6A, 0x81C784, 0x8D6E63, 0xA5D6A7];
    for (let i = 0; i < fallingLeafCount; i++) {
      const size = 0.03 + Math.random() * 0.05;
      const leafGeo = new THREE.PlaneGeometry(size, size * 1.5);
      const ci = Math.floor(Math.random() * fallLeafColors.length);
      const leafMat = new THREE.MeshPhongMaterial({
        color: fallLeafColors[ci], shininess: 10, side: THREE.DoubleSide,
        transparent: true, opacity: 0.6 + Math.random() * 0.3,
      });
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      const a = Math.random() * Math.PI * 2;
      const dist = Math.random() * P.canopyRadius * 0.9;
      leaf.position.set(
        Math.cos(a) * dist,
        P.trunkHeight + Math.random() * P.canopyHeight,
        Math.sin(a) * dist
      );
      leaf.userData = {
        fallSpeed: 0.08 + Math.random() * 0.12,
        swaySpeed: 0.5 + Math.random() * 1.0,
        swayAmount: 0.15 + Math.random() * 0.2,
        rotSpeed: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        startY: P.trunkHeight + P.canopyHeight * 0.2 + Math.random() * P.canopyHeight * 0.8,
      };
      scene.add(leaf);
      fallingLeafMeshes.push(leaf);
    }

    // ── Ground ──
    const groundRadius = Math.max(2.5, P.canopyRadius * 1.8);
    const groundGeo = new THREE.CircleGeometry(groundRadius, 48);
    // Vertex color gradient — darker near trunk, lighter at edges
    const gColors = new Float32Array(groundGeo.attributes.position.count * 3);
    for (let i = 0; i < groundGeo.attributes.position.count; i++) {
      const gx = groundGeo.attributes.position.getX(i);
      const gz = groundGeo.attributes.position.getY(i);
      const dist = Math.sqrt(gx * gx + gz * gz) / groundRadius;
      // Greener ground with variation — darker near trunk, grassy at edges
      const base = 0.05 + dist * 0.06;
      gColors[i * 3] = base * 0.3;
      gColors[i * 3 + 1] = base * 1.5 + Math.sin(gx * 5 + gz * 3) * 0.01;
      gColors[i * 3 + 2] = base * 0.2;
    }
    groundGeo.setAttribute('color', new THREE.BufferAttribute(gColors, 3));
    const groundMat = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 3, transparent: true, opacity: 0.4 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    scene.add(ground);

    // Moss ring around trunk base
    const mossGeo = new THREE.TorusGeometry(P.trunkRadiusBottom * 1.8, P.trunkRadiusBottom * 0.4, 6, 16);
    const mossMat = new THREE.MeshPhongMaterial({ color: 0x33691E, shininess: 5, transparent: true, opacity: 0.45 });
    const moss = new THREE.Mesh(mossGeo, mossMat);
    moss.rotation.x = -Math.PI / 2;
    moss.position.y = -0.05;
    treeGroup.add(moss);

    // Fallen leaves scattered on ground
    const leafColors = [0x8D6E63, 0xA1887F, 0x6D4C41, 0x4CAF50, 0x388E3C, 0x2E7D32, 0x81C784];
    const fallenLeafCount = Math.floor(lerp(5, 40, growth));
    for (let i = 0; i < fallenLeafCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const dist = P.trunkRadiusBottom * 2 + Math.random() * (groundRadius * 0.7);
      const leafSize = 0.04 + Math.random() * 0.08;
      const leafGeo = new THREE.PlaneGeometry(leafSize, leafSize * 1.4);
      const ci = Math.floor(Math.random() * leafColors.length);
      const leafMat = new THREE.MeshPhongMaterial({
        color: leafColors[ci], shininess: 10, side: THREE.DoubleSide,
        transparent: true, opacity: 0.5 + Math.random() * 0.3,
      });
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.position.set(Math.cos(a) * dist, -0.08 + Math.random() * 0.02, Math.sin(a) * dist);
      leaf.rotation.set(-Math.PI / 2 + (Math.random() - 0.5) * 0.4, Math.random() * Math.PI * 2, 0);
      scene.add(leaf);
    }

    // Grass — dense InstancedMesh for performance
    const grassBladeCount = Math.floor(lerp(50, 400, growth));
    const bladeGeo = new THREE.PlaneGeometry(0.018, 0.22, 1, 3);
    // Taper the blade to a point at top
    const bladePos = bladeGeo.attributes.position;
    for (let v = 0; v < bladePos.count; v++) {
      const y = bladePos.getY(v);
      const normalizedY = (y + 0.11) / 0.22; // 0 at base, 1 at tip
      const taper = 1.0 - normalizedY * 0.85;
      bladePos.setX(v, bladePos.getX(v) * taper);
    }
    bladeGeo.translate(0, 0.11, 0); // pivot at base
    bladeGeo.computeVertexNormals();

    const grassMat = new THREE.MeshPhongMaterial({
      color: 0x388E3C, shininess: 5, side: THREE.DoubleSide,
      transparent: true, opacity: 0.75,
    });
    const grassInstances = new THREE.InstancedMesh(bladeGeo, grassMat, grassBladeCount);
    const grassColorAttr = new Float32Array(grassBladeCount * 3);
    const dummy = new THREE.Object3D();
    const grassBaseColors = [
      new THREE.Color(0x1B5E20), new THREE.Color(0x2E7D32),
      new THREE.Color(0x388E3C), new THREE.Color(0x43A047),
      new THREE.Color(0x4CAF50), new THREE.Color(0x33691E),
    ];
    for (let i = 0; i < grassBladeCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const dist = P.trunkRadiusBottom * 1.5 + Math.random() * groundRadius * 0.9;
      dummy.position.set(Math.cos(a) * dist, -0.1, Math.sin(a) * dist);
      dummy.rotation.set(0, Math.random() * Math.PI * 2, (Math.random() - 0.5) * 0.4);
      const s = 0.6 + Math.random() * 0.8;
      dummy.scale.set(0.8 + Math.random() * 0.4, s, 1);
      dummy.updateMatrix();
      grassInstances.setMatrixAt(i, dummy.matrix);
      const col = grassBaseColors[Math.floor(Math.random() * grassBaseColors.length)];
      grassColorAttr[i * 3] = col.r;
      grassColorAttr[i * 3 + 1] = col.g;
      grassColorAttr[i * 3 + 2] = col.b;
    }
    grassInstances.instanceMatrix.needsUpdate = true;
    grassInstances.instanceColor = new THREE.InstancedBufferAttribute(grassColorAttr, 3);
    scene.add(grassInstances);

    // ── Small mushrooms near roots ──
    if (growth > 0.4) {
      const mushroomCount = Math.floor(lerp(0, 6, growth));
      for (let i = 0; i < mushroomCount; i++) {
        const a = Math.random() * Math.PI * 2;
        const dist = P.trunkRadiusBottom * 1.2 + Math.random() * 0.6;
        const mushGroup = new THREE.Group();
        mushGroup.position.set(Math.cos(a) * dist, -0.1, Math.sin(a) * dist);
        const stemH = 0.04 + Math.random() * 0.06;
        const stemGeo = new THREE.CylinderGeometry(0.01, 0.015, stemH, 5);
        const stemMat = new THREE.MeshPhongMaterial({ color: 0xFFF8E1, shininess: 20 });
        const stem = new THREE.Mesh(stemGeo, stemMat);
        stem.position.y = stemH / 2;
        mushGroup.add(stem);
        const capGeo = new THREE.SphereGeometry(0.025 + Math.random() * 0.02, 6, 4, 0, Math.PI * 2, 0, Math.PI / 2);
        const capMat = new THREE.MeshPhongMaterial({ color: Math.random() > 0.5 ? 0xD32F2F : 0xFF8F00, shininess: 40 });
        const cap = new THREE.Mesh(capGeo, capMat);
        cap.position.y = stemH;
        mushGroup.add(cap);
        scene.add(mushGroup);
      }
    }

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
      const hitMonth = hits.length > 0 ? hits[0].object.userData.month : null;
      const newHover = hitMonth ? hitMonth.number : null;
      if (newHover !== hoveredRef.current) {
        hoveredRef.current = newHover;
        setHoveredFruit(newHover);
      }
      canvas.style.cursor = orbit.isDragging ? 'grabbing' : (hits.length > 0 ? 'pointer' : 'grab');
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

      // Update ez-tree leaf wind shader
      tree.update(t);

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

      // Falling leaves
      fallingLeafMeshes.forEach((leaf) => {
        const d = leaf.userData;
        leaf.position.y -= d.fallSpeed * dt;
        leaf.position.x += Math.sin(t * d.swaySpeed + d.phase) * d.swayAmount * dt;
        leaf.position.z += Math.cos(t * d.swaySpeed * 0.7 + d.phase) * d.swayAmount * dt * 0.6;
        leaf.rotation.x += d.rotSpeed * dt * 0.8;
        leaf.rotation.z += d.rotSpeed * dt * 0.5;
        if (leaf.position.y < -0.1) {
          const a = Math.random() * Math.PI * 2;
          const dist = Math.random() * P.canopyRadius * 0.9;
          leaf.position.set(Math.cos(a) * dist, d.startY, Math.sin(a) * dist);
        }
      });

      // Tulips — gentle bob + ring rotation + opacity pulse
      fruitMeshes.forEach((hitTarget, i) => {
        const bp = hitTarget.userData.basePos;
        const fg = hitTarget.userData.flowerGroup;
        fg.position.y = bp[1] + Math.sin(t * 0.6 + i * 1.5) * 0.01;
        hitTarget.userData.ring.rotation.z += 0.005;
        hitTarget.userData.ring.material.opacity = 0.2 + Math.sin(t * 0.8 + i * 0.9) * 0.1;
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
              <span>{isUnlocked ? '\uD83C\uDF38' : '\uD83C\uDF31'}</span>
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
                <span style={styles.monthEmoji}>{isUnlocked ? '\uD83C\uDF38' : '\uD83C\uDF31'}</span>
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
        <p style={styles.footer}>Our tree is still growing. More flowers will bloom soon.</p>
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
    top: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    pointerEvents: 'none',
    animation: 'fadeUp 0.8s ease-out both',
    zIndex: 2,
    width: '100%',
    maxWidth: '420px',
    padding: '12px 20px',
    boxSizing: 'border-box',
    background: 'radial-gradient(ellipse at center, rgba(5,10,5,0.6) 0%, rgba(5,10,5,0.3) 50%, transparent 80%)',
    borderRadius: '16px',
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
    maxWidth: 'calc(100% - 32px)',
    boxSizing: 'border-box',
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
    background: 'rgba(244, 143, 177, 0.08)',
    borderColor: 'rgba(244, 143, 177, 0.2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 24px rgba(244, 143, 177, 0.1)',
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
