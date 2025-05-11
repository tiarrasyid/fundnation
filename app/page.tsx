import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#EFEEEA]">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-[140px] pb-0 px-6 text-center relative">
        <div className="max-w-[1100px] mx-auto relative z-10">
          <h1 className="text-[60px] leading-[70px] font-sen-bold mb-6 text-[#222222]">
            Support Great Ideas,
            <br />
            Make Them Happen Together.
          </h1>
          <p className="text-[22px] text-[#5F5F75] mb-12 pt-[15px]">
            We believe every idea is worth fighting for.
          </p>

          <div className="flex gap-[70px] justify-center gap-6 sm:gap-14 pt-[25px]">
            <Button className="w-[180px] h-[55px] bg-[#169976] text-[#FFFFFF] text-[22px] font-sen-bold rounded-[12px] hover:bg-[#138a69] focus:outline-none">
              Get Started
            </Button>

            <Button className="w-[180px] h-[55px] bg-[#FFFFFF] text-[#169976] text-[22px] font-sen-bold rounded-[12px] border-[#169976] hover:bg-[#f2f2f0] focus:outline-none">
              Explore
            </Button>
          </div>
        </div>

        {/* Ilustrasi Bawah */}
        <div className="relative mt-20 z-0 pb-[100px]">
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
      <section className="py-24 px-6 bg-[#EFEEEA] flex justify-center pt-[120px] pb-[120px]">
        <div className="bg-[#FFFFFF] w-full max-w-[1320px] rounded-[20px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-16 sm:p-20">
          <div className="text-center mb-16 pt-[70px]">
            <h2 className="text-[42px] sm:text-[48px] font-sen-bold text-[#222222] mb-4">
              Start your campaign today
            </h2>
            <p className="text-[20px] sm:text-[22px] text-[#5F5F75] max-w-3xl mx-auto">
              Campoal has a variety of features that make it the best place to
              start a petition.
            </p>
          </div>

          <div className="flex lg:flex-row items-start gap-20 pt-[75px] pb-[120px] pl-[120px] pr-[120px]">
            {/* Kiri - Fitur */}
            <div className="flex flex-col gap-14 w-full lg:w-[50%]">
              {[
                {
                  icon: "chart-area.svg",
                  title: "Manage your campaigns",
                  desc: "Track how many people signed the petition by week, month, year.",
                },
                {
                  icon: "donate.svg",
                  title: "Collecting donation",
                  desc: "Campaign owners can set up donations to receive donations from supporters.",
                },
                {
                  icon: "file-download.svg",
                  title: "Export Signature",
                  desc: "Download the signatures of supporters and submit to the decision makers.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start pt-[70px]">
                  <div className="bg-[#1AA179] w-[72px] h-[72px] flex items-center justify-center rounded-full shrink-0">
                    <img
                      src={`/icons/${item.icon}`}
                      alt={item.title}
                      className="w-[36px] h-[36px]"
                    />
                  </div>
                  <div className="text-left pl-[15px]">
                    <h3 className="text-[26px] sm:text-[30px] font-sen-bold text-[#222222] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[18px] sm:text-[20px] text-[#5F5F75] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Kanan - Ilustrasi */}
            <div className="w-full lg:w-[50%] h-[500px] relative">
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
      <footer className="h-[100px] bg-[#111111] flex items-center px-[60px]">
        <p className="text-[#EFEEEA] text-[20px] sm:text-[24px] font-sen-bold">
          FundNation © 2025.
        </p>
      </footer>
    </div>
  );
}
