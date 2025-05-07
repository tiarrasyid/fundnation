'use client';

import Navbar from '@/components/Navbar'
import React from 'react'
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#EFEEEA]">
      <Navbar />

      <section className="pt-[140px] pb-0 px-6 text-center relative">
        <div className="max-w-[1100px] mx-auto relative z-10">
          <h1 className="text-[60px] leading-[70px] font-sen-bold mb-6 text-[#222222]">
            Your project has been uploaded!
          </h1>
          <p className="text-[22px] text-[#5F5F75] mb-12 pt-[15px]">
            Let the support begin.
          </p>
        </div>

        <div className="relative mt-20 z-0 pb-[100px] pt-[100px]">
          <Image
            src="/images/uploaded.svg"
            alt="Hero Illustration"
            width={1200}
            height={600}
            className="mx-auto"
          />
        </div>

        <div className="pb-[100px] flex justify-end pr-[300px]">
          <Button
            type="button"
            onClick={() => router.push('/creators')}
            className="w-[166px] h-[50px] bg-[#169976] text-[#FFFFFF] text-[22px] font-sen-bold rounded-[12px] hover:bg-[#138a69] focus:outline-none">
            Done
          </Button>
        </div>
      </section>

      <footer className="h-[100px] bg-[#111111] flex items-center px-[60px]">
        <p className="text-[#EFEEEA] text-[20px] sm:text-[24px] font-sen-bold">
          FundNation © 2025.
        </p>
      </footer>
    </div>
  );
}

export default Page;
