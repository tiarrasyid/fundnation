import React from 'react'

function layout({children}: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-between">
      <div className="mt-12">
        {children}
      </div>
    </div>
  )
}

export default layout
