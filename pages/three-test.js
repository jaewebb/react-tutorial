import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

import utilStyles from '../styles/utils.module.css';

import Layout from '../components/layout';

function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta * 5))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 3 : 1.5}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <icosahedronGeometry />
      <meshStandardMaterial color={hovered ? 'lime' : 'lightblue'} />
    </mesh>
  )
}

export default function ThreeTest() {
  return (
    <Layout>
      <div className="text-center">
        <p>
          I added a sample of React-three-fiber and played around with a few parameters to try out the library
        </p>
        <p>
          Clicking on the "die" changes it's size
        </p>
      </div>
      <div>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[0, 0, 0]} />
        </Canvas>
      </div>

    </Layout>
  );
}