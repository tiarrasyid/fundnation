// app/about_us/page.tsx
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#EFEEEA]">
      <Navbar />

      {/* Header Section */}
      <section className="pt-[140px] pb-0 px-6 text-center relative">
        <div className="max-w-[1100px] mx-auto relative z-10">
          <h1 className="text-[60px] leading-[70px] font-sen-bold mb-6 text-[#222222]">
            Getting to Know FundNation Better
          </h1>
          <p className="text-[22px] text-[#5F5F75] mb-12 pt-[15px]">
            A crowdfunding platform that connects creators with a community of supporters to create real impact.
          </p>
        </div>

        {/* Ilustrasi Bawah */}
        <div className="relative mt-20 z-0 pb-[100px] pt-[70px]">
          <Image
            src="/images/aboutUs.svg"
            alt="Hero Illustration"
            width={1200}
            height={600}
            className="mx-auto"
          />
        </div>
      </section>

      <section className="py-24 px-6 bg-[#EFEEEA] flex justify-center pt-[120px] pb-[120px]">
          <div className="flex lg:flex-row items-start gap-20 pt-[75px] pb-[120px] pl-[120px] pr-[120px]">
            {/* Kiri - Fitur */}
            <div className="mb-20 pr-[120px] w-full lg:w-[50%]">
              <h2 className="text-[42px] font-sen-bold text-[#222222] mb-8">FundNation</h2>
              <div className="space-y-6">
                <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                  About Us
                </p>
                <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                  FundNation is a crowdfunding platform dedicated to helping ideas, innovations, 
                  and social action become reality. We believe that behind every big dream, 
                  there is a community ready to support.
                </p>
                <br/>
                <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                  At FundNation, creators can share their vision, and supporters can be part 
                  of the change. We bridge the spirit of collaboration between those with 
                  ideas and those who want to contribute.
                </p>
              </div>
              <br/>
              <div className="space-y-6">
                <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                  Our Mission
                </p>
                <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                  Empowering big ideas through real support.
                </p>
                <br/>
                <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                  We want to create a safe, transparent, and inclusive space for everyone to share, build, and make an impact.
                </p>
              </div>
              <br/>
              <div className="space-y-6">
                <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                  Our Values:
                </p>
                <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                  Collaboration – Together, we are stronger.
                </p>
                <br/>
                <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                  Innovation – Supporting fresh ideas for the future.
                </p>
                <br/>
                <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                  Trust – Upholding transparency and integrity.
                </p>
                <br/>
                <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                  Social Impact – Driving positive, sustainable change.               
                </p>
              </div>
            </div>

            {/* Kanan - Ilustrasi */}
            <div className="w-full h-[700px] relative rounded-[25px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] overflow-hidden">
              <Image
                src="/images/team-work.jpg"
                alt="Campaign Illustration"
                fill
                sizes="(max-width: 768px) 100vw, 419px"
                className="object-cover rounded-[25px]"
                style={{
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                }}
              />
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