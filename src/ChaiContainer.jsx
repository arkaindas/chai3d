import React, { Suspense, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import Model from './Chai'

const store = createXRStore()

export default function ChaiContainer() {
  const modelRef = useRef()

  useEffect(() => {
    const checkWebXR = async () => {
      const supported = await navigator.xr?.isSessionSupported?.('immersive-ar')
      console.log('✅ AR supported:', supported)
      if (!supported) alert("WebXR AR not supported on this device/browser.")
    }

    checkWebXR()

    const onStart = () => {
      console.log('✅ AR session started')
      if (modelRef.current) {
        modelRef.current.visible = true
        modelRef.current.position.set(0, 0, -0.5)
      }
    }

    const onEnd = () => console.log('🛑 AR session ended')

    store.addEventListener('sessionstart', onStart)
    store.addEventListener('sessionend', onEnd)

    return () => {
      store.removeEventListener('sessionstart', onStart)
      store.removeEventListener('sessionend', onEnd)
    }
  }, [])

  return (
    <>
      <button
        onClick={() => {
          console.log('🚀 Starting AR...')
          store.enterAR()
        }}
        style={{ position: 'absolute', zIndex: 10, top: 20, left: 20 }}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Order from your table
      </button>

      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}
        camera={{ position: [0, 0, 0.2], fov: 70 }}
      >
        <XR store={store}>
          <ambientLight intensity={1} />
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
