import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import Model from './Chai'

const store = createXRStore()

export default function ChaiContainer() {
  const modelRef = useRef()

  useEffect(() => {
    const onARStart = () => {
      if (modelRef.current) {
        modelRef.current.visible = true
        modelRef.current.position.set(0, 0, -0.5) // 50cm in front
      }
    }

    store.addEventListener('sessionstart', onARStart)
    return () => {
      store.removeEventListener('sessionstart', onARStart)
    }
  }, [])

  return (
    <>
      <a
        onClick={() => store.enterAR()}
        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      >
        Order from your table
      </a>

      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}
        camera={{ position: [0, 0, 0], fov: 70 }}
      >
        <XR store={store}>
          <ambientLight />
          <Suspense fallback={null}>
            <group ref={modelRef} visible={false}>
              <Model scale={0.5} />
            </group>
          </Suspense>
        </XR>
      </Canvas>
    </>
  )
}
