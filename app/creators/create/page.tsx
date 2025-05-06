import Navbar from '@/components/Navbar'
import React from 'react'

function createNewProject() {
  return (
    <div className="min-h-screen bg-[#EFEEEA]">
    <Navbar />

    <section className="">
      createNewProject
    </section>  

    {/* Footer */}
    <footer className="h-[100px] bg-[#111111] flex items-center px-[60px]">
        <p className="text-[#EFEEEA] text-[20px] sm:text-[24px] font-sen-bold">
          FundNation © 2025.
        </p>
    </footer>
    </div>
  )
}

export default createNewProject
