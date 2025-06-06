import { useState } from 'react'
import ChaiContainer from './ChaiContainer'

import './App.css'

function App() {
  return (
    <>
      

      <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Welcome to Gorda chai er dokan</h1>
{/*               <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p> */}
              <div className="" style={{height:500,width:'100%'}}>
                  <ChaiContainer />
              </div>

          </div>
      </section>

    </>
  )
}

export default App
