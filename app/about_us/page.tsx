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
            Get to Know FundNation{" "}
          </h1>
          <p className="text-[22px] text-[#5F5F75] mb-12 pt-[15px]">
            A Crowdfunding Platform for Students, by Students, and Anyone Who
            Wants to Make a Difference.
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
            <h2 className="text-[42px] font-sen-bold text-[#222222] mb-8">
              FundNation
            </h2>
            <div className="space-y-6">
              <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                About Us
              </p>
              <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                FundNation is a web-based crowdfunding platform for you
                students, artists, developers, young entrepreneurs, or anyone
                with a great idea who wants to make it happen. Here, you can
                share your creative vision, and anyone can contribute directly
                to support that idea.
              </p>
              <br />
              <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                We believe that every big dream needs a community that cares.
                And that community can start from your campus, your friends, or
                even strangers who believe in the positive impact of your idea.
              </p>
            </div>
            <br />
            <div className="space-y-6">
              <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                Our Mission
              </p>
              <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                To encourage big ideas through real support. We want to create a
                safe, open, and inclusive space—a place where students can
                share, build, and contribute to real change.
              </p>
            </div>
            <br />
            <div className="space-y-6">
              <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                Our Values:
              </p>
              <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                Collaboration – Together, we are stronger.
              </p>
              <br />
              <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                Innovation – Support fresh ideas from young people.
              </p>
              <br />
              <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                Trust – All processes are transparent and fair.
              </p>
              <br />
              <p className="text-[20px] leading-[32px] text-[#5F5F75]">
                Social Impact – Focus on sustainable, positive change.
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
