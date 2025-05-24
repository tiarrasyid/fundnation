"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function Page() {
  const [isProcessed, setIsProcessed] = useState(false);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const projectId = params?.id as string;
  const amount = parseInt(searchParams?.get("amount") || "0");
  const transactionKey = `transaction-${projectId}-${amount}`;
  const [isProcessing, setIsProcessing] = useState(false);

  type Project = {
    id: string;
    totalRaised: number;
    donationTarget: number;
    status: "active" | "done";
    [key: string]: unknown;
  };

  const handleDone = () => {
    if (isProcessed || isProcessing) return;
    setIsProcessing(true);

    try {
      const projects: Project[] = JSON.parse(
        localStorage.getItem("projects") || "[]"
      );

      const updatedProjects = projects.map((project) => {
        if (project.id === projectId) {
          const newTotal = project.totalRaised + amount;
          return {
            ...project,
            totalRaised: newTotal,
            status: newTotal >= project.donationTarget ? "done" : "active",
          };
        }
        return project;
      });

      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      localStorage.setItem(transactionKey, "processed");
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setIsProcessing(false);
      setIsProcessed(true);
      router.push(`/product/detail/${projectId}`);
    }
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
                disabled={isProcessing || isProcessed}
                className={`w-[166px] text-[#ffffff] h-[50px] text-lg font-bold rounded-[15px] shadow-md text-[22px] font-sen-bold ${
                  isProcessed
                    ? "bg-[#169976] cursor-not-allowed"
                    : "bg-[#169976] hover:bg-[#138a69]"
                }`}
              >
                {isProcessing ? "Processing..." : "Done"}
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
