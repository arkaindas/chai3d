import React, { useRef, useState, useEffect, Suspense } from 'react'
import { ARCanvas, XR, useXRFrame, DefaultXRControllers, useXR } from '@react-three/xr'
import { Center, Environment } from '@react-three/drei'
import Model from './Chai'
import * as THREE from 'three'

function ReticleModel() {
  const ref = useRef()
  const [hitTestSource, setHitTestSource] = useState(null)
  const [hitTestSourceRequested, setHitTestSourceRequested] = useState(false)
  const { player } = useXR()

  useXRFrame((_, frame) => {
    if (!frame) return

    const referenceSpace = player?.space
    const session = frame.session

    if (!hitTestSourceRequested) {
      session.requestReferenceSpace('viewer').then((viewerSpace) => {
        session.requestHitTestSource({ space: viewerSpace }).then((source) => {
          setHitTestSource(source)
        })
      })
      setHitTestSourceRequested(true)
    }

    if (hitTestSource && referenceSpace) {
      const hitTestResults = frame.getHitTestResults(hitTestSource)
      if (hitTestResults.length > 0) {
        const hit = hitTestResults[0]
        const pose = hit.getPose(referenceSpace)

        if (pose) {
          ref.current.visible = true
          ref.current.position.set(
            pose.transform.position.x,
            pose.transform.position.y,
            pose.transform.position.z
          )
          ref.current.quaternion.set(
            pose.transform.orientation.x,
            pose.transform.orientation.y,
            pose.transform.orientation.z,
            pose.transform.orientation.w
          )
        }
      }
    }
  })

  return (
    <group ref={ref} visible={false}>
      <Model scale={0.5} />
    </group>
  )
}

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
