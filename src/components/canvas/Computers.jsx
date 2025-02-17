import { Suspense, useEffect, useState} from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from '../Loader';

const Computers = ( {isMobile}) => {
  const computer = useGLTF('./desktop_pc/scene.glb')
  return (
    <mesh>
      <hemisphereLight intensity={0.5} groundColor="black" />
      <pointLight intensity={4} />
      <spotLight 
          position={[-3, 5, 1]}
          intensity={400}

      />
      <primitive object={computer.scene}
      scale={isMobile ? 0.65 : 0.75}
      position={isMobile ? [-1,-3, -1.2] :[0, -3.25, -1.5]}
      rotation={[-0.01, -0.2, -0.1]}
      /> 
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => { mediaQuery.removeEventListener('change', handleMediaQueryChange)}
  }, [])

  return(
    <Canvas frameloop="demand" 
    shadows
    camera={{position: [20, 3, 5], fov: 25}}
    gl={{preserveDrawingBuffer: true}}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
       />
        <Computers isMobile={isMobile}/>
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas;