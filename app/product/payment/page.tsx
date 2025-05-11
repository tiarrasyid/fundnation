"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function Page() {
  const router = useRouter();

  const handleDone = () => {
    router.push("/product");
  };

  return (
    <div className="min-h-screen bg-[#EFEEEA]">
      <Navbar />

      <section className="py-24 px-6 bg-[#EFEEEA] flex justify-center pt-[70px] pb-[70px] pr-[36px] pl-[36px]">
        <div className="bg-[#FFFFFF] w-full max-w-[1440px] rounded-[15px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-16 sm:p-20">
          <div className="flex flex-col lg:flex-row items-left justify-between h-full">
            <div className="max-w-[600px] pt-[50px] pl-[50px]">
              <h1 className="text-[36px] sm:text-[40px] font-bold text-[#2D2D2D] mt-[16px] mb-[16px] w-[947px] leading-relaxed">
                Payment Successful! <br />
                Thank you for your support. This project <br />
                is one step closer to being realized.
              </h1>

              <Button
                onClick={handleDone}
                className="w-[166px] h-[50px] bg-[#169976] text-[#FFFFFF] text-lg font-bold rounded-[15px] 
                    hover:bg-[#138a69] transition-colors shadow-md text-[22px] font-sen-bold"
              >
                Done
              </Button>
            </div>
            <div className="mt-[31px] mb-[45px] mr-[58px] flex justify-end">
              <Image
                src="/images/payment.svg"
                alt="Payment Successful Illustration"
                width={773}
                height={419}
                className="object-contain"
              />
            </div>
          </div>
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
