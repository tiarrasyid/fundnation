import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#EFEEEA]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-0 text-center px-4 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-[70px] font-sen-bold mb-8 leading-tight text-[#222222]">
            Support Great Ideas,<br />
            Make Them Happen Together.
          </h1>
          <p className="text-[24px] text-[#5F5F75] mb-16">
            We believe every idea is worth fighting for.
          </p>

          <div className="flex gap-[70px] justify-center">
            <Button
              className="w-[220px] h-[60px] bg-[#169976] text-[#EFEEEA] text-xl font-bold rounded-[15px] hover:bg-[#138a69]"
            >
              Get Started
            </Button>

            <Button
              className="w-[220px] h-[60px] bg-[#EFEEEA] text-[#169976] text-xl font-bold rounded-[15px] border-2 border-[#169976] hover:bg-[#f2f2f0]"
            >
              Explore
            </Button>
          </div>
        </div>

        {/* Ilustrasi bawah */}
        <div className="relative mt-20 z-0">
          <Image
            src="/images/pict1.svg"
            alt="Hero Illustration"
            width={1200}
            height={600}
            className="mx-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-[#F1F0ED] flex justify-center">
        <div className="bg-[#FFFFFF] w-[1400px] min-h-[800px] rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-20">
          <div className="text-center mb-16">
            <h2 className="text-[48px] font-sen-bold text-[#222222] mb-6">
              Start your campaign today
            </h2>
            <p className="text-[24px] text-[#5F5F75]">
              Campoal has a variety of features that make it the best place to start a petition.
            </p>
          </div>

          <div className="flex justify-between items-start gap-16">
            <div className="flex flex-col gap-16 w-[600px]">
              {/* Item 1 */}
              <div className="flex gap-6 items-start">
                <div className="bg-[#1AA179] p-4 rounded-full">
                  <img src="/icons/chart-area.svg" alt="Manage" className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <h3 className="text-[32px] font-sen-bold text-[#222222] mb-4">
                    Manage your campaigns
                  </h3>
                  <p className="text-[20px] text-[#5F5F75] leading-relaxed">
                    Track how many people signed the petition by week, month, year.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-6 items-start">
                <div className="bg-[#1AA179] p-4 rounded-full">
                  <img src="/icons/circle-dollar-sign.svg" alt="Donation" className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <h3 className="text-[32px] font-sen-bold text-[#222222] mb-4">
                    Collecting donation
                  </h3>
                  <p className="text-[20px] text-[#5F5F75] leading-relaxed">
                    Campaign owners can set up donations to receive donations from supporters.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-6 items-start">
                <div className="bg-[#1AA179] p-4 rounded-full">
                  <img src="/icons/file-down.svg" alt="Export" className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <h3 className="text-[32px] font-sen-bold text-[#222222] mb-4">
                    Export Signature
                  </h3>
                  <p className="text-[20px] text-[#5F5F75] leading-relaxed">
                    Download the signatures of supporters and submit to the decision makers.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="w-[600px] h-[600px] relative">
              <Image
                src="/images/syct.svg"
                alt="Campaign Illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="h-[120px] bg-[#111111] flex items-center px-[60px]">
        <p className="text-[#EFEEEA] text-[24px] font-sen-bold">
          FundNation © 2025.
        </p>
      </footer>
    </div>
  );
}