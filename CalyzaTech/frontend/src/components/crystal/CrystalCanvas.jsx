import { Canvas } from '@react-three/fiber';
import { Environment, Lightformer, Preload } from '@react-three/drei';
import CrystalObject from './CrystalObject';
import { useTheme } from '../ThemeProvider';

export default function CrystalCanvas({ onReady, active }) {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6.7], fov: 30 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      frameloop={active ? 'always' : 'never'}
      onCreated={onReady}
      data-testid="crystal-canvas"
    >
      <color attach="background" args={[dark ? '#050505' : '#F7F5F2']} />
      <ambientLight intensity={dark ? 0.7 : 0.4} />
      <directionalLight position={[5, 6, 4]} intensity={dark ? 1.9 : 1.2} />
      <directionalLight position={[-6, -3, -4]} intensity={dark ? 0.9 : 0.5} color="#D3C2FF" />
      <CrystalObject />
      <Environment resolution={128}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 3]} scale={[7, 3, 1]} color="#ffffff" />
        <Lightformer form="circle" intensity={2} position={[-5, 1, -1]} scale={3} color="#A8BCFF" />
        <Lightformer form="circle" intensity={1.6} position={[5, -1, -1]} scale={2.5} color="#F2B9D6" />
        <Lightformer form="rect" intensity={1.4} position={[0, -5, 2]} scale={[6, 2, 1]} color="#B9EEDD" />
        <Lightformer form="rect" intensity={1} position={[0, 0, -5]} scale={[8, 4, 1]} color="#EAE2FF" />
      </Environment>
      <Preload all />
    </Canvas>
  );
}
