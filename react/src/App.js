import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './App.css';

/*
  Docs: https://docs.pmnd.rs/react-three-fiber/getting-started/your-first-scene
  ====
  Canvas: Already sets up Scene and Camera, handles resizing out of the box, and renders every frame :)
  JSX Tags: Each object in Three has it's own tag provided by Fiber, literally everything :D
  Passing params to tags: As we already know Three accepts constructor params to it's objects, Fiber accepts an args prop that's ALWAYS an array
  useFrame: Can ONLY be used inside a Canvas, ie: need to create components
  
  EXTRAS:
  ====
  Fiber offers more hooks to load models and textures, this way you can get creative. The only downside to keep in mind with this
  is that these are loaded async, meaning you have to manage the possible downtime of loading these assets, similar when fetching an API
*/

function Cube() {
  const meshRef = useRef()

  useFrame((usefulProps) => {
    // usefulProps contains a ton of useful variables and functions to know the current state
    // of the Canvas, Camera and Scene
    const { clock } = usefulProps
    // clock.getElapsedTime() - Get the seconds passed since the clock started.

    meshRef.current.rotation.x = clock.getElapsedTime();
    meshRef.current.rotation.y = clock.getElapsedTime();
    // Easter egg: try Math.sin(clock.getElapsedTime()) and see the magic :D
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color={0x44aa88} />
    </mesh>
  )
}

function App() {
  return (
    <div className="App">
      <Canvas>
        <Cube />
        <directionalLight color={0xFFFFFF} intensity={1} position={[-1, 2, 4]} />
      </Canvas>
    </div>
  );
}

export default App;
