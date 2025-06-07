import React, { useRef, useEffect, useState,Suspense } from 'react';
import {Canvas,useLoader,useFrame} from "@react-three/fiber"
import { XR, XROrigin, createXRStore } from '@react-three/xr'
//import Cube from './cube';
import logo from './assets/react.svg'
import {TextureLoader} from 'three'
import * as THREE from 'three'
import Model from "./Chai"; 
import { OrbitControls,Environment,Stage, Center } from "@react-three/drei";

const store = createXRStore({depthSensing:true,hand:false});

export default function ChaiContainer() {

    return (
      <>
        <a onClick={() => store.enterAR()} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
        order from your table
                      <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
        </a>
        <Canvas camera={{ position: [0, 0, -0.2], near: 0.025,fov:35 }}>
        <XR store={store}>
            <OrbitControls minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI/2.2} />
            
            <Stage environment="dawn">
            {/* <directionalLight position={[10, 10, 5]} intensity={1} />
            <spotLight position={[5, 5, 5]} intensity={1} angle={0.3} penumbra={0.2} /> */}
            <Suspense>
                <Center top>
            <Model scale={0.5} />
            </Center>
            </Suspense>
            <ambientLight />
            
            {/* <primitive object={gltf.scene} /> */}
            </Stage>
            <group position={[0,0,5.6]}>
                <XROrigin/>
            </group>
            </XR>
        </Canvas>
      </>
    )
}

