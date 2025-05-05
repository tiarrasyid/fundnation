import Navbar from '@/components/Navbar'
import React from 'react'
import Image from "next/image";
import { Button } from '@/components/ui/button';

function page() {
  return (
    <div className="min-h-screen bg-[#EFEEEA]">
      <Navbar />
      <section className="pt-[140px] pb-0 px-6 text-center relative">
        <div className="max-w-[1100px] mx-auto relative z-10 pb-[70px]">
          <h1 className="text-[60px] leading-[70px] font-sen-bold mb-6 text-[#222222]">
            Find Brilliant Ideas, Support Now!
          </h1>
        </div>

        {/* Ilustrasi Bawah */}
        <div className="relative mt-20 z-0 pb-[100px]">
          <Image
            src="/images/project.svg"
            alt="Hero Illustration"
            width={1200}
            height={600}
            className="mx-auto"
          />
        </div>
      </section>

      <section className="py-24 px-6 bg-[#EFEEEA] flex justify-center pt-[120px] pb-[120px]">
        <div className="bg-[#FFFFFF] w-full max-w-[1320px] rounded-[20px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-16 sm:p-20">
          <div className="flex gap-[25px] justify-left gap-6 sm:gap-14 pt-[25px] pl-[25px] pb-[25px]">
            <Button className="w-[180px] h-[55px] bg-[#169976] text-[#FFFFFF] text-[22px] font-sen-bold rounded-[12px] hover:bg-[#138a69] focus:outline-none">
              All Project
            </Button>
            <Button className="w-[180px] h-[55px] bg-[#169976] text-[#FFFFFF] text-[22px] font-sen-bold rounded-[12px] hover:bg-[#138a69] focus:outline-none">
              Food
            </Button>
            <Button className="w-[180px] h-[55px] bg-[#169976] text-[#FFFFFF] text-[22px] font-sen-bold rounded-[12px] hover:bg-[#138a69] focus:outline-none">
              Tech
            </Button>
            <Button className="w-[180px] h-[55px] bg-[#169976] text-[#FFFFFF] text-[22px] font-sen-bold rounded-[12px] hover:bg-[#138a69] focus:outline-none">
              Service
            </Button>
          </div>
          <div className="div">
            {/* di sini product yang bisa di CRUD */}
          </div>
        </div>
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

export default page
