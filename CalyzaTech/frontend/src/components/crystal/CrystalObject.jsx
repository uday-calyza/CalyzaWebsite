import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useCrystal } from './CrystalController';
import { useTheme } from '../ThemeProvider';

const smooth = (a, b, x) => {
  const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

const RING_DEFS = [
  { radius: 1.6, tilt: [Math.PI / 2.4, 0.3, 0], color: '#5B1DB8' },
  { radius: 2.0, tilt: [Math.PI / 1.9, -0.5, 0.4], color: '#4169FF' },
];

const MILESTONE_RINGS = [
  { radius: 1.2, color: '#8A4DE8', tilt: [Math.PI / 2.15, 0.1, 0.1] },
  { radius: 1.34, color: '#4169FF', tilt: [Math.PI / 2.05, 0.55, 0.3] },
  { radius: 1.48, color: '#27C7D9', tilt: [Math.PI / 2.28, 1.0, 0.55] },
  { radius: 1.62, color: '#E99AC2', tilt: [Math.PI / 1.95, 1.45, 0.8] },
];

const BG_ORIGIN = new THREE.Color('#F7F5F2');
const BG_OPEN = new THREE.Color('#F1ECE6');
const BG_ECO = new THREE.Color('#1C1613');
const BG_ACCEL = new THREE.Color('#171310');
const BG_TRANS = new THREE.Color('#100D0B');
const BG_FACTORY = new THREE.Color('#050505');

const LIGHT_SET = {
  o: BG_ORIGIN,
  p: BG_OPEN,
  e: BG_ECO,
  a: BG_ACCEL,
  t: BG_TRANS,
  f: BG_FACTORY,
};

const DARK_SET = {
  o: new THREE.Color('#050505'),
  p: new THREE.Color('#080808'),
  e: new THREE.Color('#0A0A0A'),
  a: new THREE.Color('#090909'),
  t: new THREE.Color('#070707'),
  f: new THREE.Color('#050505'),
};

const ATTEN_BASE = '#D3C2FF';
const LIGHT_ORCHID = new THREE.Color('#8A4DE8');
const LIGHT_CYAN = new THREE.Color('#27C7D9');

export default function CrystalObject() {
  const { progress, pointer, hoverTone } = useCrystal();
  const { theme } = useTheme();
  const { viewport } = useThree();

  const root = useRef();
  const core = useRef();
  const nucleus = useRef();
  const wireShell = useRef();
  const innerShell = useRef();
  const innerLight = useRef();
  const ringRefs = useRef([]);
  const nodeRefs = useRef([]);
  const achRefs = useRef([]);

  const toneTarget = useMemo(() => new THREE.Color(ATTEN_BASE), []);
  const toneCurrent = useMemo(() => new THREE.Color(ATTEN_BASE), []);
  const bgTarget = useMemo(() => new THREE.Color('#F7F5F2'), []);
  const lightTarget = useMemo(() => new THREE.Color('#8B4DE8'), []);
  const pulseT = useRef(-10);
  const prevP = useRef(0);
  const pulseRing = useRef();

  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 6; i++) {
      arr.push({
        ring: i % 2,
        angle: (i / 6) * Math.PI * 2 + (i % 2) * 0.9,
      });
    }
    return arr;
  }, []);

  useFrame((state, delta) => {
    const p = progress.get();
    const t = state.clock.elapsedTime;

    const open = smooth(0.08, 0.24, p);
    const layers = smooth(0.14, 0.3, p);
    const eco = smooth(0.25, 0.45, p);
    const accel = smooth(0.46, 0.7, p);
    /* Transform choreography: converge → compress → stillness → pulse → reveal */
    const converge = smooth(0.68, 0.75, p);
    const compress = smooth(0.73, 0.78, p);
    const still = smooth(0.765, 0.78, p);
    const reveal = smooth(0.78, 0.83, p);
    const depth = smooth(0.25, 0.85, p);
    const quiet = 1 - still * 0.75;

    /* the intelligence pulse — one soft, physical beat at the breath */
    if ((prevP.current < 0.78 && p >= 0.78) || (prevP.current > 0.78 && p <= 0.78)) {
      pulseT.current = t;
    }
    prevP.current = p;
    const pt = t - pulseT.current;
    const pulse = pt >= 0 && pt < 2 ? 1 - pt / 2 : 0;

    const g = root.current;
    const fit = THREE.MathUtils.clamp(viewport.width / 8, 0.42, 1);
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, fit, 4, delta));

    const heroOffset = fit > 0.9 ? 1.05 * (1 - converge) : 0;
    g.position.x = THREE.MathUtils.damp(g.position.x, heroOffset, 3, delta);

    const targetY = t * 0.12 * quiet + p * Math.PI * 1.2 + pointer.current.x * 0.07;
    const targetX = pointer.current.y * 0.06 + open * 0.08;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3.2, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3.2, delta);
    g.position.y = Math.sin(t * 0.45) * 0.05 * (1 - still * 0.6);

    const cam = state.camera;
    cam.position.z = THREE.MathUtils.damp(cam.position.z, 6.9 - open * 0.25 - compress * 0.8 - reveal * 0.15, 2.5, delta);

    const bg = state.scene.background;
    if (bg && bg.isColor) {
      const S = theme === 'dark' ? DARK_SET : LIGHT_SET;
      bgTarget.copy(S.o).lerp(S.p, open).lerp(S.e, eco).lerp(S.a, accel).lerp(S.t, compress).lerp(S.f, reveal);
      bg.lerp(bgTarget, Math.min(1, delta * 2.6));
    }

    if (innerLight.current) {
      innerLight.current.intensity = (theme === 'dark' ? 2.4 : 0.5) + depth * 2.6 + compress * 0.8 + pulse * 1.6;
      innerLight.current.position.set(Math.cos(t * 0.3 * quiet) * 0.9, Math.sin(t * 0.4 * quiet) * 0.5, 0.7);
      lightTarget.copy(LIGHT_ORCHID).lerp(LIGHT_CYAN, Math.sin(t * 0.2) * 0.5 + 0.5);
      innerLight.current.color.lerp(lightTarget, Math.min(1, delta * 2));
    }

    toneTarget.set(hoverTone?.current || ATTEN_BASE);
    toneCurrent.lerp(toneTarget, Math.min(1, delta * 3));
    const mat = core.current.material;
    if (mat && mat.attenuationColor) mat.attenuationColor.copy(toneCurrent);

    const coreScale = 1 - layers * 0.24 + compress * 0.09 + pulse * 0.05;
    core.current.scale.setScalar(THREE.MathUtils.damp(core.current.scale.x, coreScale, 4, delta));
    core.current.rotation.y = -t * 0.1 * quiet;

    nucleus.current.material.opacity =
      (theme === 'dark' ? 0.35 : 0.15) + layers * 0.4 + compress * 0.45 + reveal * 0.08 + pulse * 0.35;
    nucleus.current.scale.setScalar(1 + compress * 0.08 + pulse * 0.15);
    nucleus.current.material.color.set(theme === 'dark' ? '#8A4DE8' : '#1D062B');

    if (pulseRing.current) {
      const pr = Math.max(0.001, 0.7 + pt * 1.2);
      pulseRing.current.scale.setScalar(pt >= 0 && pt < 2 ? pr : 0.001);
      pulseRing.current.material.opacity = pulse * 0.45;
    }

    /* decorative shells quiet down and thin out through convergence */
    wireShell.current.material.opacity = layers * 0.2 * (1 - converge * 0.7);
    wireShell.current.rotation.y = t * 0.05 * quiet;
    wireShell.current.rotation.z = t * 0.03 * quiet;
    wireShell.current.scale.setScalar(1 + open * 0.4 + accel * 0.1 - compress * 0.15);

    innerShell.current.material.opacity = layers * 0.16 * (1 - converge * 0.75);
    innerShell.current.rotation.x = t * 0.04 * quiet;
    innerShell.current.rotation.y = -t * 0.03 * quiet;
    innerShell.current.scale.setScalar(1 + open * 0.55 - compress * 0.2);

    RING_DEFS.forEach((r, i) => {
      const m = ringRefs.current[i];
      if (!m) return;
      const base = 0.32 + open * (0.86 + i * 0.18) + accel * 0.1;
      /* rings compress toward the center; the outer orbit fades first,
         one subtle structural ring remains */
      const s = Math.max(0.001, base * (1 - compress * (i === 0 ? 0.5 : 0.65)));
      m.scale.setScalar(THREE.MathUtils.damp(m.scale.x, s, 4, delta));
      const fade = i === 0 ? (1 - converge * 0.25) * (1 - still * 0.55) : 1 - converge * 0.92;
      m.material.opacity = Math.min(1, open * (0.85 - i * 0.2) * (1 + eco * 0.15)) * Math.max(0, fade);
      /* the orbits gradually slow down as everything converges */
      const spin = t * (0.05 + i * 0.02) * (1 + accel * 2.4) * (1 - converge * 0.85);
      m.rotation.set(r.tilt[0], r.tilt[1], r.tilt[2] + spin);
    });

    MILESTONE_RINGS.forEach((r, i) => {
      const m = achRefs.current[i];
      if (!m) return;
      const appear = smooth(0.48 + i * 0.05, 0.54 + i * 0.05, p);
      const spacing = 1 - accel * (0.05 + i * 0.045);
      const waveDelay = (3 - i) * 0.02;
      /* milestone rings converge inward — coming together, not disappearing */
      const contract = smooth(0.68 + waveDelay, 0.75 + waveDelay, p);
      const targetS = Math.max(0.001, appear * spacing * (1 - contract * 0.85));
      m.scale.setScalar(THREE.MathUtils.damp(m.scale.x, targetS, 4, delta));
      m.material.opacity = appear * 0.62 * (1 - contract * 0.8);
      const dir = i % 2 === 0 ? 1 : -1;
      m.rotation.set(r.tilt[0], r.tilt[1], r.tilt[2] + t * 0.05 * dir * (1 + accel * (0.4 + i * 0.3)) * (1 - converge * 0.8));
    });

    nodeRefs.current.forEach((n, i) => {
      if (!n) return;
      const def = nodes[i];
      const ringScale = 0.32 + open * (0.86 + def.ring * 0.18) + accel * 0.1;
      const ringR = RING_DEFS[def.ring].radius * ringScale;
      const spin = t * (0.05 + def.ring * 0.02) * (1 + accel * 2.4) * (1 - converge * 0.85);
      const x = Math.cos(def.angle + spin) * ringR;
      const y = Math.sin(def.angle + spin) * ringR * 0.38;
      const z = Math.sin(def.angle + spin) * ringR * 0.55;
      n.position.set(x, y, z);
      const nodeReveal = smooth(0.28 + i * 0.02, 0.36 + i * 0.02, p);
      /* every node converges into the core */
      n.material.opacity = nodeReveal * (1 - converge);
      n.scale.setScalar(THREE.MathUtils.damp(n.scale.x, 1, 5, delta));
    });
  });

  return (
    <group ref={root}>
      <pointLight ref={innerLight} color="#8B4DE8" intensity={0.5} distance={6} decay={2} />

      <mesh ref={pulseRing} scale={0.001}>
        <torusGeometry args={[1, 0.008, 8, 128]} />
        <meshBasicMaterial color="#8A4DE8" transparent opacity={0} depthWrite={false} />
      </mesh>

      <mesh ref={core}>
        <icosahedronGeometry args={[1.02, 0]} />
        <MeshTransmissionMaterial
          samples={4}
          resolution={448}
          transmission={1}
          thickness={1.35}
          roughness={0.05}
          ior={1.45}
          chromaticAberration={0.5}
          anisotropy={0.25}
          distortion={0.12}
          distortionScale={0.4}
          temporalDistortion={0.05}
          iridescence={0.45}
          iridescenceIOR={1.3}
          clearcoat={1}
          clearcoatRoughness={0.08}
          flatShading
          color="#F3EEFF"
          attenuationColor="#D3C2FF"
          attenuationDistance={1.8}
        />
      </mesh>

      <mesh ref={nucleus}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshBasicMaterial color="#1D062B" transparent opacity={0.15} />
      </mesh>

      <mesh ref={wireShell}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshBasicMaterial color="#5B1DB8" wireframe transparent opacity={0} />
      </mesh>

      <mesh ref={innerShell}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial color="#4169FF" wireframe transparent opacity={0} />
      </mesh>

      {MILESTONE_RINGS.map((r, i) => (
        <mesh key={`milestone-${i}`} ref={(el) => (achRefs.current[i] = el)} rotation={r.tilt} scale={0.001}>
          <torusGeometry args={[r.radius, 0.006, 8, 160]} />
          <meshBasicMaterial color={r.color} transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}

      {RING_DEFS.map((r, i) => (
        <mesh key={i} ref={(el) => (ringRefs.current[i] = el)} rotation={r.tilt} scale={0.32}>
          <torusGeometry args={[r.radius, 0.006, 8, 160]} />
          <meshBasicMaterial color={r.color} transparent opacity={0} />
        </mesh>
      ))}

      {nodes.map((def, i) => (
        <mesh key={i} ref={(el) => (nodeRefs.current[i] = el)}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#5B1DB8" transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}
