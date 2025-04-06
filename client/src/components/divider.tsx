import React from 'react'

export const Divider = () => {
  return (
    <div
      className="w-full border-t mx-auto my-20 h-0.5"
      style={{
        borderImageSlice: 1,
        borderImageSource: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.5) 0%, rgba(252,70,107,0) 100%)",
      }}
    />
  )
}
