import React from 'react'

export default function Title(props) {
    const { title, width } = props

  return (
    <div className={`z-[200] triangle title absolute hidden -top-12 right-1/2 transform translate-x-1/2 w-[${width}px] px-2 py-1 rounded-md tracking-widest bg-[#8C52FF] text-white text-base font-medium`}>
        {title}
    </div>
  )
}
