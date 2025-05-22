"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

function Page() {
  const [amount, setAmount] = useState(5);
  const router = useRouter();
  const params = useParams();
  const projectId = params && Array.isArray(params.id) ? params.id[0] : params?.id || "";
  const presetAmounts = [5, 10, 20, 50];

  const handlePresetClick = (val: number) => {
    setAmount(val);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleSupport = () => {
    router.push(`/product/payment/${projectId}?amount=${amount}`);
  };

  return (
    <div className="min-h-screen bg-[#EFEEEA]">
      <Navbar />

      <section className="py-24 px-6 bg-[#EFEEEA] flex justify-center pt-[70px] pb-[70px] pr-[36px] pl-[36px]">
        <div className="bg-[#FFFFFF] w-[1440px] h-[800px] max-w-[1440px] rounded-[15px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-16 text-center">
          <div className="pt-[141px] pb-[75px] pl-[120px] pr-[120px]">
            <h1 className="text-[42px] sm:text-[60px] leading-[70px] font-sen-extrabold mb-4 text-[#222222]">
              Give Your Support Now!
            </h1>
            <p className="text-[18px] sm:text-[22px] text-[#5F5F75] mb-12">
              Realize creators ideas with your best contributions.
            </p>
          </div>

          <div className="pl-[408px] pr-[408px] pb-[221]px">
            <div className="flex justify-left items-left mb-6 w-full">
              <span className="bg-[#F2EFE8] text-[24px] font-sen-bold w-[56px] h-[56px] border border-[#ccc] rounded-l-[10px] flex items-center justify-center">
                $
              </span>
              <input
                type="number"
                value={amount}
                onChange={handleInputChange}
                className="w-[382px] h-[56px] text-[24px] font-sen-bold text-center text-xl border-t border-b border-r border-[#ccc] rounded-r-[10px] py-3 outline-none"
              />
            </div>

            <div className="flex justify-center gap-[36px] pt-[24px] pb-[24px] flex-wrap">
              {presetAmounts.map((val) => (
                <button
                  key={val}
                  onClick={() => handlePresetClick(val)}
                  className={`px-6 py-3 w-[128px] h-[56px] rounded-[10px] text-[24px] font-sen-bold  border transition ${
                    amount === val
                      ? "bg-[#169976] text-white"
                      : "bg-[#F2EFE8] text-[#222] hover:bg-[#ddd]"
                  }`}
                >
                  ${val}
                </button>
              ))}
            </div>

            <Button
              onClick={handleSupport}
              className="w-[623px] h-[56px] bg-[#169976] text-[#FFFFFF] text-[24px] font-sen-bold rounded-[10px] hover:bg-[#138a69]"
            >
              Support Now!
            </Button>
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
