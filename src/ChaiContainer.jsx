import React, { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { XR, createXRStore, DefaultXRControllers } from '@react-three/xr'
import { Environment, Center } from '@react-three/drei'
import Model from './Chai'

const store = createXRStore({ depthSensing: true, hand: false })

export default function ChaiContainer() {
  const modelRef = useRef()

  const placeModel = () => {
    if (modelRef.current) {
      modelRef.current.visible = true
      modelRef.current.position.set(0, 0, -0.5) // Place 0.5m in front of camera
    }
  }

  return (
    <>
      {/* Your original button triggering AR */}
      <a
        onClick={() => store.enterAR()}
        className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      >
        Order from your table
        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </a>

      <Canvas camera={{ position: [0, 0, 0.2], fov: 70 }}>
        <XR store={store}>
          <Suspense fallback={null}>
            <Environment preset="dawn" />
            <Center>
              <group ref={modelRef} visible={false} onClick={placeModel}>
                <Model scale={0.5} />
              </group>
            </Center>
          </Suspense>
          <DefaultXRControllers />
        </XR>
      </Canvas>
    </>
  )
}
