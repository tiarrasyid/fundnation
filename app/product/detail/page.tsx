"use client";
import Navbar from "@/components/Navbar";
import React from "react";
import Image from "next/image";
import { CalendarDays, CircleUserRound, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#EFEEEA]">
      <Navbar />

      <section className="py-24 px-6 bg-[#EFEEEA] flex justify-center pt-[70px] pb-[70px] pr-[36px] pl-[36px]">
        <div className="bg-[#FFFFFF] w-[1440px] h-[800px] max-w-[1440px] rounded-[15px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-16 sm:p-20">
          <div className="flex lg:flex-row items-start gap-20 pt-[75px] pb-[120px] pl-[120px] pr-[120px]">
            {/* Kiri - Fitur */}
            <div className="w-full lg:w-[45%] flex flex-col items-center pr-[50px] ">
              <Image
                src="/images/list-project.png"
                alt="Main Image"
                width={400}
                height={400}
                className="rounded-[15px] object-cover w-[600px] h-[500px]"
              />

              <div className="flex mt-6 gap-[25px] mt-[25px]">
                <Image
                  src="/images/list-project.png"
                  alt="Thumb 1"
                  width={90}
                  height={90}
                  className="rounded-[15px] object-cover w-[180px] h-[150px]"
                />
                <Image
                  src="/images/list-project.png"
                  alt="Thumb 2"
                  width={90}
                  height={90}
                  className="rounded-[15px] object-cover w-[180px] h-[150px]"
                />
                <Image
                  src="/images/list-project.png"
                  alt="Thumb 3"
                  width={90}
                  height={90}
                  className="rounded-[15px] object-cover w-[180px] h-[150px]"
                />
              </div>
            </div>

            {/* Kanan - Deskripsi */}
            <div className="w-full lg:w-[50%] h-[500px] relative pr-8 pt-8 pb-8">
              {" "}
              <div className="mb-[20px] mt-[20px]">
                {" "}
                <div className="flex items-center text-[#444] text-xl font-semibold mb-4">
                  {" "}
                  <CircleUserRound className="mr-2" /> Jason
                </div>
                <h2 className="mt-[10px] mb-[10px] font-bold text-[#2B2B39] text-2xl">
                  {" "}
                  The Climate App – create a carbon cutting movement
                </h2>
              </div>
              <p className="mb-[10px] mt-[10px] text-[#444] text-lg leading-relaxed">
                {" "}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s...
              </p>
              <div className="flex flex-col gap-[10px] mb-[10px] mt-[10px]">
                <div className="flex items-center gap-3 text-lg text-[#111]">
                  <DollarSign size={24} />
                  Total Raised $ 4,000
                </div>
                <div className="flex items-center gap-3 text-lg text-[#111]">
                  <CalendarDays size={24} />
                  45 Days left
                </div>
              </div>
              <div className="mb-[20px] mt-[20px]">
                {" "}
                <Button
                  onClick={() => router.push("/product/supportNow")}
                  className="w-[166px] h-[50px] bg-[#169976] text-[#FFFFFF] text-lg font-bold rounded-[15px] 
                    hover:bg-[#138a69] transition-colors shadow-md text-[22px] font-sen-bold"
                >
                  Donate
                </Button>
              </div>
              <div className="bg-[#F6F6F6] w-full p-6 rounded-[15px] space-y-4 p-[20px]">
                {" "}
                <h3 className="text-xl font-bold text-[#2B2B39]">
                  Project Notes :
                </h3>
                <p className="text-[#444] leading-relaxed">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s...
                </p>
              </div>
            </div>
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
  );
}

export default Page;
