'use client'

import Image from "next/image"



const ExplorerBtn = () => {
  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto cursor-pointe hover:cursor-pointer" onClick={() => console.log("Working")}>
    <a href="#">Explorer Events

        <Image src="/icons/arrow-down.svg"  alt="arrow down" width={24} height={24}/>
    </a>
    
    </button>
  )
}

export default ExplorerBtn