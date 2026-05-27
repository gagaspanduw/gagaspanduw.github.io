import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import * as THREE from 'three';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { Tree, TreeType, BarkType, LeafType } from '@dgreenheck/ez-tree';
import MusicPlayer from './MusicPlayer';

// ── Month data ──
const months = [
  {
    number: 3,
    route: '/mimi/monthversary/3',
    title: '3rd Monthversary',
    date: 'May 26, 2026',
    hint: 'Tap to unwrap',
    unlockDate: new Date('2026-05-26T00:00:00'),
  },
  // { number: 5, route: '/mimi/monthversary/5', title: '5th Monthversary', date: 'June 26, 2026', hint: '...', unlockDate: new Date('2026-06-26T00:00:00') },
  // { number: 6, route: '/mimi/monthversary/6', title: '6th Monthversary', date: 'July 26, 2026', hint: '...', unlockDate: new Date('2026-07-26T00:00:00') },
  // { number: 7, route: '/mimi/monthversary/7', title: '7th Monthversary', date: 'August 26, 2026', hint: '...', unlockDate: new Date('2026-08-26T00:00:00') },
  // { number: 8, route: '/mimi/monthversary/8', title: '8th Monthversary', date: 'September 26, 2026', hint: '...', unlockDate: new Date('2026-09-26T00:00:00') },
];

const GROUND_Y = -0.1;

const gardenPlaylist = [
  {
    title: 'Kiss The Rain',
    artist: 'Yiruma',
    src: 'https://archive.org/download/YirumaKissTheRain_201602/Yiruma-KissTheRain.mp3',
  },
];

function getUnlockedMonths(items, now) {
  return items.filter((month) => !month.unlockDate || now >= month.unlockDate);
}

function getLatestUnlockedMonth(items, now) {
  return getUnlockedMonths(items, now).reduce((latest, month) => {
    if (!latest || month.number > latest.number) return month;
    return latest;
  }, null);
}

function getGrowth(items, now) {
  const latestUnlockedMonth = getLatestUnlockedMonth(items, now);
  if (!latestUnlockedMonth) return 0.12;
  return Math.min(1, Math.max(0.15, latestUnlockedMonth.number * 0.15));
}

function createLeafGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.55);
  shape.bezierCurveTo(0.28, 0.42, 0.34, 0.05, 0, -0.55);
  shape.bezierCurveTo(-0.34, 0.05, -0.28, 0.42, 0, 0.55);

  const geometry = new THREE.ShapeGeometry(shape, 16);
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i);
    const curve = Math.sin(((y + 0.55) / 1.1) * Math.PI) * 0.03;
    positions.setZ(i, curve);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function createPetalGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.028, 0.012, 0.05, 0.09, 0, 0.155);
  shape.bezierCurveTo(-0.05, 0.09, -0.028, 0.012, 0, 0);

  const geometry = new THREE.ShapeGeometry(shape, 18);
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const yNorm = y / 0.155;
    const curve = Math.sin(yNorm * Math.PI) * 0.016 - yNorm * 0.005;
    positions.setZ(i, curve + Math.abs(x) * 0.08);
  }
  geometry.computeVertexNormals();
  return geometry;
}

function createGrassTuftGeometry() {
  const makeBlade = (rotationY, tiltZ, xOffset, zOffset, scale = 1) => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.016 * scale, 0.04 * scale, 0.022 * scale, 0.12 * scale, 0, 0.24 * scale);
    shape.bezierCurveTo(-0.022 * scale, 0.12 * scale, -0.016 * scale, 0.04 * scale, 0, 0);

    const geometry = new THREE.ShapeGeometry(shape, 10);
    const positions = geometry.attributes.position;
    const height = 0.24 * scale;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const yNorm = y / height;
      positions.setZ(i, Math.sin(yNorm * Math.PI) * 0.015 * scale + x * 0.18);
    }
    geometry.computeVertexNormals();
    geometry.rotateZ(tiltZ);
    geometry.rotateY(rotationY);
    geometry.translate(xOffset, 0, zOffset);
    return geometry;
  };

  return mergeBufferGeometries([
    makeBlade(0, -0.18, 0, 0, 1),
    makeBlade(Math.PI / 3, 0.12, 0.01, -0.004, 0.92),
    makeBlade(-Math.PI / 3, 0.16, -0.008, 0.006, 0.88),
  ], false);
}

function createGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.28, 'rgba(255,255,255,0.9)');
  gradient.addColorStop(0.58, 'rgba(255,255,255,0.22)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

function getFruitPosition(index, total, p) {
  const angle = (index / Math.max(total, 1)) * Math.PI * 2 + 0.5;
  // Place tulips on the ground around the tree base
  const r = Math.max(0.5, p.canopyRadius * 0.6) + index * 0.15;
  const y = GROUND_Y;
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
    const unlocked = getUnlockedMonths(months, now);
    const isCompactViewport = window.innerWidth <= 768;
    // 1 month = 0.15 (tiny sapling), 4 months = 0.6, 7+ months = full
    const growth = getGrowth(months, now);

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
    const camera = new THREE.PerspectiveCamera(isCompactViewport ? 46 : 40, canvas.clientWidth / canvas.clientHeight, 0.1, 100);

    const orbit = {
      theta: 0,
      phi: isCompactViewport ? 0.46 : 0.38,
      radius: isCompactViewport ? P.cameraDistance * 1.08 : P.cameraDistance,
      target: new THREE.Vector3(0, GROUND_Y + P.trunkHeight * 0.5, 0),
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
    rootGlow.position.set(0, GROUND_Y + 0.35, 0);
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
    tree.updateMatrixWorld(true);

    const initialTreeBounds = new THREE.Box3().setFromObject(tree);
    const treeGroundOffset = GROUND_Y - initialTreeBounds.min.y + 0.015;
    treeGroup.position.y = treeGroundOffset;
    treeGroup.updateMatrixWorld(true);

    // Compute effective tree dimensions from the actual generated tree
    const treeBounds = new THREE.Box3().setFromObject(tree);
    const treeSize = new THREE.Vector3();
    treeBounds.getSize(treeSize);
    const effectiveTreeHeight = treeSize.y;
    const effectiveTrunkHeight = Math.max(tree.options.branch.length[0] * treeScale * 0.9, effectiveTreeHeight * 0.48);
    const effectiveCanopyTop = treeBounds.max.y;
    const effectiveCanopyRadius = Math.max(treeSize.x, treeSize.z) * 0.42;

    // Override P values for fruit/feature positioning to match the real rendered tree
    P.trunkHeight = effectiveTrunkHeight;
    P.canopyHeight = Math.max(0.5, effectiveCanopyTop - (GROUND_Y + effectiveTrunkHeight));
    P.canopyRadius = effectiveCanopyRadius;

    rootGlow.position.y = GROUND_Y + Math.max(0.22, P.trunkHeight * 0.14);
    canopyLight.position.y = GROUND_Y + P.trunkHeight + P.canopyHeight * 0.55;
    orbit.target.y = GROUND_Y + P.trunkHeight * (isCompactViewport ? 0.42 : 0.48);
    updateCamera();

    const organicLeafGeo = createLeafGeometry();
    const tulipPetalGeo = createPetalGeometry();
    const grassTuftGeo = createGrassTuftGeometry();
    const glowTexture = createGlowTexture();

    // ── Tulips ──
    const fruitMeshes = [];
    const flowerGroups = [];

    const tulipColors = [0xF48FB1, 0xE91E63, 0xF06292, 0xCE93D8, 0xFFCDD2, 0xFF8A80, 0xEF5350];

    const makeTulip = (pos, month) => {
      const g = new THREE.Group();
      g.position.set(...pos);

      const color = tulipColors[Math.floor(Math.random() * tulipColors.length)];
      const baseCol = new THREE.Color(color);
      const petalColors = [
        baseCol.clone().lerp(new THREE.Color(0xffffff), 0.02),
        baseCol.clone().lerp(new THREE.Color(0xffffff), 0.12),
        baseCol.clone().offsetHSL(0, 0.02, -0.02),
      ];

      const bloomBase = new THREE.Group();
      bloomBase.position.y = 0.012;
      g.add(bloomBase);

      for (let i = 0; i < 6; i++) {
        const isInner = i >= 3;
        const angle = ((i % 3) / 3) * Math.PI * 2 + (isInner ? Math.PI / 3 : 0);
        const petal = new THREE.Mesh(
          tulipPetalGeo,
          new THREE.MeshPhongMaterial({
            color: petalColors[i % petalColors.length],
            emissive: baseCol.clone().multiplyScalar(0.18),
            emissiveIntensity: 0.08,
            shininess: 70,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.98,
          })
        );
        const radius = isInner ? 0.014 : 0.022;
        const heightOffset = isInner ? 0.012 : 0;
        petal.position.set(Math.cos(angle) * radius, heightOffset, Math.sin(angle) * radius);
        petal.rotation.y = angle;
        petal.rotation.x = isInner ? -0.04 : -0.18;
        petal.rotation.z = Math.sin(angle * 2) * 0.05;
        const scale = isInner ? 0.9 : 1.05;
        petal.scale.set(scale, scale, scale);
        bloomBase.add(petal);
      }

      const centerGeo = new THREE.SphereGeometry(0.015, 10, 10);
      const centerMat = new THREE.MeshPhongMaterial({
        color: 0xFFE082,
        emissive: 0xFFCA28,
        emissiveIntensity: 0.45,
        shininess: 45,
        transparent: true,
        opacity: 0.95,
      });
      const center = new THREE.Mesh(centerGeo, centerMat);
      center.position.y = 0.065;
      g.add(center);

      const hitTarget = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 10, 10),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
      );
      hitTarget.position.y = 0.06;
      g.add(hitTarget);

      const stemCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.145, 0),
        new THREE.Vector3(0.01, -0.08, 0.004),
        new THREE.Vector3(-0.008, -0.02, -0.002),
        new THREE.Vector3(0, 0.018, 0),
      ]);
      const stemGeo = new THREE.TubeGeometry(stemCurve, 8, 0.008, 6, false);
      const stemMat = new THREE.MeshPhongMaterial({ color: 0x388E3C, shininess: 16 });
      g.add(new THREE.Mesh(stemGeo, stemMat));

      const leafMat = new THREE.MeshPhongMaterial({ color: 0x4CAF50, shininess: 12, side: THREE.DoubleSide });
      const leafA = new THREE.Mesh(organicLeafGeo, leafMat);
      leafA.scale.set(0.045, 0.08, 0.045);
      leafA.position.set(0.028, -0.075, 0);
      leafA.rotation.set(Math.PI / 2, Math.PI / 3, -0.58);
      g.add(leafA);

      const leafB = new THREE.Mesh(organicLeafGeo, leafMat.clone());
      leafB.scale.set(0.04, 0.07, 0.04);
      leafB.position.set(-0.022, -0.045, -0.002);
      leafB.rotation.set(Math.PI / 2, -Math.PI / 2.8, 0.48);
      g.add(leafB);

      const ringGeo = new THREE.RingGeometry(0.06, 0.09, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color, transparent: true, opacity: 0.22,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.002;
      g.add(ring);

      const flowerLight = new THREE.PointLight(color, 0.13, 0.7);
      flowerLight.position.y = 0.07;
      g.add(flowerLight);

      hitTarget.userData = { month, ring, basePos: [...pos], flowerGroup: g, center, flowerLight, bloomBase };
      scene.add(g);
      fruitMeshes.push(hitTarget);
      flowerGroups.push(g);
    };

    unlocked.forEach((month, i) => {
      const pos = getFruitPosition(i, unlocked.length, P);
      makeTulip(pos, month);
    });

    // ── Rising energy particles ──
    const pCount = P.particleCount;
    const particleSprites = [];
    const pMeta = [];
    for (let i = 0; i < pCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.random() * P.rootSpread * 1.2;
      const baseScale = 0.08 + Math.random() * 0.05;
      const material = new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0x81C784,
        transparent: true,
        opacity: 0.28 + Math.random() * 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.set(Math.cos(a) * d, GROUND_Y + Math.random() * (P.trunkHeight + P.canopyHeight), Math.sin(a) * d);
      sprite.scale.set(baseScale, baseScale, 1);
      scene.add(sprite);
      particleSprites.push(sprite);
      pMeta.push({ speed: 0.2 + Math.random() * 0.4, phase: Math.random() * Math.PI * 2, baseScale, baseOpacity: material.opacity });
    }

    // ── Fireflies ──
    const ffCount = P.fireflyCount;
    const fireflySprites = [];
    const ffMeta = [];
    const fireflyColors = [0xFFF59D, 0xFFECB3, 0xFFE082];
    for (let i = 0; i < ffCount; i++) {
      const spread = Math.max(3, P.canopyRadius * 2.5);
      const baseScale = 0.09 + Math.random() * 0.05;
      const material = new THREE.SpriteMaterial({
        map: glowTexture,
        color: fireflyColors[Math.floor(Math.random() * fireflyColors.length)],
        transparent: true,
        opacity: 0.45 + Math.random() * 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.set(
        (Math.random() - 0.5) * spread,
        GROUND_Y + 0.5 + Math.random() * (P.trunkHeight + P.canopyHeight + 1),
        (Math.random() - 0.5) * spread
      );
      sprite.scale.set(baseScale, baseScale, 1);
      scene.add(sprite);
      fireflySprites.push(sprite);
      ffMeta.push({ speed: 0.3 + Math.random() * 0.5, phase: Math.random() * 6, baseScale, baseOpacity: material.opacity });
    }

    // ── Falling leaves ──
    const fallingLeafMeshes = [];
    const fallingLeafCount = Math.floor(lerp(3, 18, growth));
    const fallLeafColors = [0x4CAF50, 0x66BB6A, 0x81C784, 0x8D6E63, 0xA5D6A7];
    for (let i = 0; i < fallingLeafCount; i++) {
      const size = 0.035 + Math.random() * 0.045;
      const ci = Math.floor(Math.random() * fallLeafColors.length);
      const leafMat = new THREE.MeshPhongMaterial({
        color: fallLeafColors[ci], shininess: 12, side: THREE.DoubleSide,
        transparent: true, opacity: 0.72 + Math.random() * 0.18, flatShading: true,
      });
      const leaf = new THREE.Mesh(organicLeafGeo, leafMat);
      leaf.scale.setScalar(size);
      const a = Math.random() * Math.PI * 2;
      const dist = Math.random() * P.canopyRadius * 0.9;
      leaf.position.set(
        Math.cos(a) * dist,
        GROUND_Y + P.trunkHeight + Math.random() * P.canopyHeight,
        Math.sin(a) * dist
      );
      leaf.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
      leaf.userData = {
        fallSpeed: 0.08 + Math.random() * 0.12,
        swaySpeed: 0.5 + Math.random() * 1.0,
        swayAmount: 0.15 + Math.random() * 0.2,
        rotSpeed: 0.5 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        startY: GROUND_Y + P.trunkHeight + P.canopyHeight * 0.2 + Math.random() * P.canopyHeight * 0.8,
      };
      scene.add(leaf);
      fallingLeafMeshes.push(leaf);
    }

    // ── Ground ──
    const groundRadius = Math.max(2.5, P.canopyRadius * 1.85);
    const groundGeo = new THREE.CircleGeometry(groundRadius, 48);
    const gColors = new Float32Array(groundGeo.attributes.position.count * 3);
    for (let i = 0; i < groundGeo.attributes.position.count; i++) {
      const gx = groundGeo.attributes.position.getX(i);
      const gz = groundGeo.attributes.position.getY(i);
      const dist = Math.sqrt(gx * gx + gz * gz) / groundRadius;
      const patch = Math.sin(gx * 4.5) * Math.cos(gz * 4.2) * 0.015;
      const base = 0.05 + dist * 0.06;
      gColors[i * 3] = base * 0.36 + patch * 0.4;
      gColors[i * 3 + 1] = base * 1.42 + patch;
      gColors[i * 3 + 2] = base * 0.22;
    }
    groundGeo.setAttribute('color', new THREE.BufferAttribute(gColors, 3));
    const groundMat = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 4, transparent: true, opacity: 0.72, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = GROUND_Y;
    scene.add(ground);

    const contactShadowGeo = new THREE.CircleGeometry(Math.max(0.45, P.trunkRadiusBottom * 4.8), 32);
    const contactShadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.16, depthWrite: false });
    const contactShadow = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = GROUND_Y + 0.003;
    scene.add(contactShadow);

    const soilMoundGeo = new THREE.SphereGeometry(Math.max(0.18, P.trunkRadiusBottom * 2.3), 18, 12);
    const soilMoundMat = new THREE.MeshPhongMaterial({ color: 0x4E342E, shininess: 5, flatShading: true });
    const soilMound = new THREE.Mesh(soilMoundGeo, soilMoundMat);
    soilMound.scale.set(1.35, 0.24, 1.15);
    soilMound.position.set(0, GROUND_Y - Math.max(0.045, P.trunkRadiusBottom * 0.55), 0);
    scene.add(soilMound);

    const mossGeo = new THREE.TorusGeometry(P.trunkRadiusBottom * 1.9, P.trunkRadiusBottom * 0.32, 6, 18);
    const mossMat = new THREE.MeshPhongMaterial({ color: 0x33691E, shininess: 5, transparent: true, opacity: 0.82 });
    const moss = new THREE.Mesh(mossGeo, mossMat);
    moss.rotation.x = -Math.PI / 2;
    moss.position.y = GROUND_Y + 0.012;
    scene.add(moss);

    // Fallen leaves scattered on ground
    const leafColors = [0x8D6E63, 0xA1887F, 0x6D4C41, 0x4CAF50, 0x388E3C, 0x2E7D32, 0x81C784];
    const fallenLeafCount = Math.floor(lerp(5, 40, growth));
    for (let i = 0; i < fallenLeafCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const dist = P.trunkRadiusBottom * 2 + Math.random() * (groundRadius * 0.7);
      const leafSize = 0.04 + Math.random() * 0.07;
      const ci = Math.floor(Math.random() * leafColors.length);
      const leafMat = new THREE.MeshPhongMaterial({
        color: leafColors[ci], shininess: 10, side: THREE.DoubleSide,
        transparent: true, opacity: 0.75, flatShading: true,
      });
      const leaf = new THREE.Mesh(organicLeafGeo, leafMat);
      leaf.scale.setScalar(leafSize);
      leaf.position.set(Math.cos(a) * dist, GROUND_Y + 0.015 + Math.random() * 0.018, Math.sin(a) * dist);
      leaf.rotation.set(-Math.PI / 2 + (Math.random() - 0.5) * 0.28, Math.random() * Math.PI * 2, (Math.random() - 0.5) * 0.35);
      scene.add(leaf);
    }

    // Grass tufts — crossed curved blades so they look fuller from more angles
    const grassBladeCount = Math.floor(lerp(26, 140, growth));
    const grassMat = new THREE.MeshPhongMaterial({
      color: 0x388E3C, shininess: 8, flatShading: true, side: THREE.DoubleSide,
    });
    const grassInstances = new THREE.InstancedMesh(grassTuftGeo, grassMat, grassBladeCount);
    const grassColorAttr = new Float32Array(grassBladeCount * 3);
    const dummy = new THREE.Object3D();
    const grassBaseColors = [
      new THREE.Color(0x1B5E20), new THREE.Color(0x2E7D32),
      new THREE.Color(0x388E3C), new THREE.Color(0x43A047),
      new THREE.Color(0x4CAF50), new THREE.Color(0x33691E),
    ];
    for (let i = 0; i < grassBladeCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const dist = P.trunkRadiusBottom * 1.7 + Math.random() * groundRadius * 0.92;
      const tuftScale = 0.6 + Math.random() * 0.85;
      dummy.position.set(Math.cos(a) * dist, GROUND_Y + 0.003, Math.sin(a) * dist);
      dummy.rotation.set((Math.random() - 0.5) * 0.22, Math.random() * Math.PI * 2, (Math.random() - 0.5) * 0.28);
      dummy.scale.set(tuftScale * (0.85 + Math.random() * 0.25), tuftScale, tuftScale * (0.8 + Math.random() * 0.3));
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
        mushGroup.position.set(Math.cos(a) * dist, GROUND_Y, Math.sin(a) * dist);
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
    const starSprites = [];
    const starMeta = [];
    for (let i = 0; i < 90; i++) {
      const baseScale = 0.045 + Math.random() * 0.04;
      const material = new THREE.SpriteMaterial({
        map: glowTexture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.18 + Math.random() * 0.2,
        depthWrite: false,
      });
      const star = new THREE.Sprite(material);
      star.position.set((Math.random() - 0.5) * 60, 5 + Math.random() * 30, -10 - Math.random() * 35);
      star.scale.set(baseScale, baseScale, 1);
      scene.add(star);
      starSprites.push(star);
      starMeta.push({ phase: Math.random() * Math.PI * 2, twinkleSpeed: 0.4 + Math.random() * 0.8, baseScale, baseOpacity: material.opacity });
    }

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
    const maxY = GROUND_Y + P.trunkHeight + P.canopyHeight + 1.5;

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
      for (let i = 0; i < pCount; i++) {
        const sprite = particleSprites[i];
        const meta = pMeta[i];
        sprite.position.y += meta.speed * dt;
        sprite.position.x += Math.sin(t * 0.5 + meta.phase) * 0.0012;
        sprite.position.z += Math.cos(t * 0.5 + meta.phase) * 0.0012;
        if (sprite.position.y > maxY) {
          sprite.position.y = GROUND_Y + 0.02;
          const a = Math.random() * Math.PI * 2;
          sprite.position.x = Math.cos(a) * Math.random() * P.rootSpread;
          sprite.position.z = Math.sin(a) * Math.random() * P.rootSpread;
        }
        const pulse = 0.82 + Math.sin(t * 1.8 + meta.phase) * 0.18;
        sprite.material.opacity = meta.baseOpacity * pulse;
        const scale = meta.baseScale * (0.9 + Math.sin(t * 1.5 + meta.phase) * 0.14);
        sprite.scale.set(scale, scale, 1);
      }

      // Fireflies
      for (let i = 0; i < ffCount; i++) {
        const sprite = fireflySprites[i];
        const meta = ffMeta[i];
        sprite.position.x += Math.sin(t * meta.speed + meta.phase) * 0.002;
        sprite.position.y += Math.cos(t * meta.speed * 0.7 + meta.phase) * 0.0008;
        sprite.position.z += Math.cos(t * meta.speed + meta.phase) * 0.002;
        const pulse = 0.76 + Math.sin(t * 2.2 + meta.phase) * 0.24;
        sprite.material.opacity = meta.baseOpacity * pulse;
        const scale = meta.baseScale * (0.88 + Math.sin(t * 1.6 + meta.phase) * 0.16);
        sprite.scale.set(scale, scale, 1);
      }

      // Stars
      starSprites.forEach((star, i) => {
        const meta = starMeta[i];
        star.material.opacity = meta.baseOpacity * (0.7 + Math.sin(t * meta.twinkleSpeed + meta.phase) * 0.3);
      });

      // Falling leaves
      fallingLeafMeshes.forEach((leaf) => {
        const d = leaf.userData;
        leaf.position.y -= d.fallSpeed * dt;
        leaf.position.x += Math.sin(t * d.swaySpeed + d.phase) * d.swayAmount * dt;
        leaf.position.z += Math.cos(t * d.swaySpeed * 0.7 + d.phase) * d.swayAmount * dt * 0.6;
        leaf.rotation.x += d.rotSpeed * dt * 0.8;
        leaf.rotation.z += d.rotSpeed * dt * 0.5;
        if (leaf.position.y < GROUND_Y) {
          const a = Math.random() * Math.PI * 2;
          const dist = Math.random() * P.canopyRadius * 0.9;
          leaf.position.set(Math.cos(a) * dist, d.startY, Math.sin(a) * dist);
        }
      });

      // Tulips — gentle bob + ring rotation + small bloom pulse
      fruitMeshes.forEach((hitTarget, i) => {
        const bp = hitTarget.userData.basePos;
        const fg = hitTarget.userData.flowerGroup;
        fg.position.y = bp[1] + Math.sin(t * 0.6 + i * 1.5) * 0.01;
        hitTarget.userData.ring.rotation.z += 0.005;
        hitTarget.userData.ring.material.opacity = 0.14 + Math.sin(t * 0.8 + i * 0.9) * 0.08;
        const bloomScale = 0.98 + Math.sin(t * 1.2 + i) * 0.02;
        hitTarget.userData.bloomBase.scale.set(bloomScale, bloomScale, bloomScale);
        hitTarget.userData.center.material.emissiveIntensity = 0.32 + Math.sin(t * 1.4 + i * 0.8) * 0.08;
        hitTarget.userData.flowerLight.intensity = 0.1 + Math.sin(t * 1.1 + i * 0.7) * 0.03;
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
      glowTexture.dispose();
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount — refs handle dynamic values

  const now = nowRef.current;
  const latestUnlockedMonth = getLatestUnlockedMonth(months, now);

  return (
    <div style={styles.page} className="monthversary-page">
      <div style={styles.mobileIntro} className="monthversary-mobile-intro">
        <div style={styles.headerChipRow}>
          <span style={styles.headerChip}>Still blooming</span>
          {latestUnlockedMonth && (
            <span style={{ ...styles.headerChip, ...styles.headerChipAccent }}>
              {latestUnlockedMonth.number} months of us
            </span>
          )}
        </div>
        <p style={styles.topLabel}>Our little garden</p>
        <h1 style={styles.title}>Monthversary Garden</h1>
        <p style={styles.subtitle}>
          Every month we share adds a new bloom. Tap a flower or open the card below to see its little surprise.
        </p>
      </div>

      {/* Full-width immersive canvas */}
      <div style={styles.canvasSection} className="monthversary-canvas-section">
        <canvas ref={canvasRef} style={styles.canvas} />
        <div style={styles.canvasFadeTop} />
        <div style={styles.canvasFadeBottom} />
        <p style={styles.dragHint} className="monthversary-drag-hint">Drag to rotate · Tap a bloom to open it</p>

        {/* Floating header overlay */}
        <div style={styles.headerOverlay} className="monthversary-desktop-header">
          <div style={styles.headerChipRow}>
            <span style={styles.headerChip}>Still blooming</span>
            {latestUnlockedMonth && (
              <span style={{ ...styles.headerChip, ...styles.headerChipAccent }}>
                {latestUnlockedMonth.number} months of us
              </span>
            )}
          </div>
          <p style={styles.topLabel}>Our little garden</p>
          <h1 style={styles.title}>Monthversary Garden</h1>
          <p style={styles.subtitle}>
            Every month we share adds a new bloom. Tap a flower or open the card below to see its little surprise.
          </p>
        </div>

        {/* Floating tooltip */}
        {hoveredFruit && (() => {
          const month = months.find(m => m.number === hoveredFruit);
          if (!month) return null;
          const isUnlocked = !month.unlockDate || now >= month.unlockDate;
          return (
            <div style={styles.tooltip} className="monthversary-tooltip">
              <span style={styles.tooltipEmoji}>{isUnlocked ? '\uD83C\uDF38' : '\uD83C\uDF31'}</span>
              <span style={styles.tooltipTitle} className="monthversary-tooltip-title">{month.title}</span>
              <span style={styles.tooltipHint} className="monthversary-tooltip-hint">
                {isUnlocked ? month.hint : 'Coming soon...'}
              </span>
            </div>
          );
        })()}
      </div>

      {/* Month cards below */}
      <div style={styles.bottomSection} className="monthversary-bottom">
        <p style={styles.cardsIntro}>Blooms we&apos;ve already grown together</p>
        <div style={styles.monthCards}>
          {months.map((month) => {
            const isUnlocked = !month.unlockDate || now >= month.unlockDate;
            return (
              <div
                key={month.number}
                className="monthversary-month-card"
                style={{
                  ...styles.monthCard,
                  ...(hoveredFruit === month.number && isUnlocked ? styles.monthCardHover : {}),
                  ...(!isUnlocked ? styles.monthCardLocked : {}),
                }}
                onClick={() => handleFruitClick(month)}
                onMouseEnter={() => setHoveredFruit(month.number)}
                onMouseLeave={() => setHoveredFruit(null)}
              >
                <span style={styles.monthEmoji}>{isUnlocked ? '\uD83C\uDF38' : '\uD83C\uDF31'}</span>
                <div style={styles.monthInfo}>
                  <p style={styles.monthTitle}>{month.title}</p>
                  <p style={styles.monthDate}>{month.date}</p>
                  <p style={isUnlocked ? styles.monthHint : styles.countdownText}>
                    {isUnlocked ? month.hint : 'Coming soon...'}
                  </p>
                </div>
                <span className="monthversary-arrow" style={{ ...styles.arrow, opacity: isUnlocked ? 1 : 0.2 }}>{'\u2192'}</span>
              </div>
            );
          })}
        </div>
        <p style={styles.footer}>Our garden is still growing. More blooms will appear soon.</p>
      </div>

      <MusicPlayer
        playlist={gardenPlaylist}
        startIndex={0}
        loop={true}
        promptText="Tap to play our garden song"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .monthversary-mobile-intro {
          display: none;
        }

        @media (max-width: 768px) {
          .monthversary-mobile-intro {
            display: block;
            padding-top: calc(20px + env(safe-area-inset-top));
          }

          .monthversary-desktop-header {
            display: none;
          }

          .monthversary-canvas-section {
            height: min(62vh, 520px) !important;
            min-height: 340px !important;
          }

          .monthversary-drag-hint {
            width: calc(100% - 32px);
            bottom: 12px !important;
            white-space: normal !important;
            line-height: 1.35;
          }

          .monthversary-tooltip {
            left: 16px !important;
            right: 16px !important;
            bottom: 54px !important;
            transform: none !important;
            width: auto !important;
            gap: 4px !important;
            align-items: flex-start !important;
            text-align: left !important;
          }

          .monthversary-tooltip-title,
          .monthversary-tooltip-hint {
            width: 100%;
          }

          .monthversary-bottom {
            padding-bottom: 28px !important;
            padding-bottom: calc(28px + env(safe-area-inset-bottom)) !important;
          }

          .monthversary-month-card {
            padding: 14px 14px !important;
            gap: 12px !important;
            align-items: flex-start !important;
          }

          .monthversary-arrow {
            display: none;
          }
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
  mobileIntro: {
    padding: '22px 16px 16px',
    textAlign: 'center',
    background: 'linear-gradient(180deg, rgba(5,10,5,0.98) 0%, rgba(10,15,10,0.98) 100%)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  headerChipRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '10px',
  },
  headerChip: {
    padding: '6px 10px',
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.04)',
    color: 'rgba(255,255,255,0.55)',
    fontSize: '11px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
  },
  headerChipAccent: {
    background: 'rgba(244,143,177,0.12)',
    borderColor: 'rgba(244,143,177,0.24)',
    color: '#F8BBD0',
  },
  canvasSection: {
    position: 'relative',
    width: '100%',
    height: '75vh',
    minHeight: '450px',
    maxHeight: '760px',
    background: 'linear-gradient(180deg, #050a05 0%, #0a0f0a 50%, #0d120d 100%)',
    overflow: 'hidden',
  },
  canvas: {
    width: '100%',
    height: '100%',
    display: 'block',
    cursor: 'grab',
  },
  canvasFadeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '34%',
    background: 'linear-gradient(180deg, rgba(5,10,5,0.94) 0%, rgba(5,10,5,0.58) 46%, rgba(5,10,5,0) 100%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  canvasFadeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '24%',
    background: 'linear-gradient(0deg, rgba(10,15,10,0.96) 0%, rgba(10,15,10,0.3) 55%, rgba(10,15,10,0) 100%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  dragHint: {
    position: 'absolute',
    bottom: '14px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '12px',
    color: 'rgba(255,255,255,0.26)',
    fontFamily: "'Caveat', cursive",
    pointerEvents: 'none',
    maxWidth: 'calc(100% - 32px)',
    textAlign: 'center',
    zIndex: 2,
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
    width: 'calc(100% - 28px)',
    maxWidth: '460px',
    padding: '16px 20px 18px',
    boxSizing: 'border-box',
    background: 'radial-gradient(ellipse at center, rgba(5,10,5,0.72) 0%, rgba(5,10,5,0.42) 58%, transparent 92%)',
    borderRadius: '18px',
  },
  topLabel: {
    fontFamily: "'Caveat', cursive",
    fontSize: '22px',
    color: 'rgba(255,255,255,0.46)',
    margin: '0 0 4px 0',
  },
  title: {
    fontFamily: "'Lora', Georgia, serif",
    fontSize: 'clamp(32px, 7vw, 48px)',
    color: '#81C784',
    margin: '0 0 8px 0',
    fontWeight: 600,
    letterSpacing: '-0.02em',
    textShadow: '0 2px 20px rgba(76,175,80,0.3)',
  },
  subtitle: {
    fontSize: '14px',
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.46)',
    margin: 0,
    fontStyle: 'italic',
  },
  tooltip: {
    position: 'absolute',
    bottom: '48px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '8px',
    padding: '10px 18px',
    background: 'rgba(10,15,10,0.86)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '14px',
    backdropFilter: 'blur(10px)',
    zIndex: 3,
    maxWidth: 'calc(100% - 32px)',
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  tooltipEmoji: { fontSize: '19px', lineHeight: 1 },
  tooltipTitle: { fontSize: '13px', color: '#fff', fontWeight: 600 },
  tooltipHint: { fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' },
  bottomSection: {
    flex: 1,
    background: '#0a0f0a',
    padding: '24px 14px 34px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cardsIntro: {
    width: '100%',
    maxWidth: '500px',
    margin: '0 0 14px 0',
    color: 'rgba(255,255,255,0.35)',
    fontSize: '11px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
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
  monthHint: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0, fontStyle: 'italic' },
  countdownText: { fontSize: '13px', color: '#81C784', margin: 0, fontFamily: "'Caveat', cursive", fontWeight: 600 },
  arrow: { fontSize: '18px', color: 'rgba(255,255,255,0.2)', flexShrink: 0 },
  footer: {
    textAlign: 'center',
    fontSize: '14px',
    color: 'rgba(255,255,255,0.25)',
    margin: 0,
    fontStyle: 'italic',
  },
};
