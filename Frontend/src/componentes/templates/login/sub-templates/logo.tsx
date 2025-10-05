import { useState, useEffect } from 'react'
import logo from '../../../organismos/topbar/assets/logo_topbar.png'

export default function Logo(){
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const percentX = x / rect.width - 0.5
    const percentY = y / rect. height - 0.5

    const rotateX = -percentY * 15
    const rotateY = percentX * 10

    setRotation({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setRotation({ rotateX: 0, rotateY: 0})
  }

  return (
    <div
      className="inline-block [perspective:1000px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
      className="
        w-[18rem]   h-auto    mb-[20px]
        transition-transform duration-100 ease
        [transform-style:preserve-3d]
        s
        "
      style={{
        transform: `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
         filter: "drop-shadow(3px 3px 3px var(--branding-400))"
        
      }}
      src={logo} 
      alt="logo do al-mossar" />
    </div>
  )
}
