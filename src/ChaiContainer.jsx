import React, { Suspense, useRef } from 'react'
import { ARCanvas, DefaultXRControllers, XR, useHitTest, useXR } from '@react-three/xr'
import { Center, Environment } from '@react-three/drei'
import Model from './Chai'

function ReticleModel() {
  const ref = useRef()

  useHitTest((hit) => {
    hit.decompose(ref.current.position, ref.current.quaternion, ref.current.scale)
  })

  return (
    <group ref={ref}>
      <Model scale={0.5} />
    </group>
  )
}

// ✅ Custom AR Start Button using XR hook
function StartARButton() {
  const { startSession } = useXR()

  return (
    <button
      onClick={startSession}
      className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
    >
      Order from your table
      <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
      </svg>
    </button>
  )
}

export default function ChaiContainer() {
  return (
    <>
      {/* Your Button is back! */}
      <StartARButton />

      <ARCanvas sessionInit={{ requiredFeatures: ['hit-test', 'local-floor'] }}>
        <XR>
          <Suspense fallback={null}>
            <Environment preset="dawn" />
            <Center>
              <ReticleModel />
            </Center>
          </Suspense>
          <DefaultXRControllers />
        </XR>
      </ARCanvas>
    </>
  )
}
