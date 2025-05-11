"use client";

import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const allProjects = [
  {
    id: 1,
    category: "Tech",
    name: "Tech Project A",
    description: "Deskripsi singkat tentang project teknologi.",
    deadline: "2025-06-01",
    mediaUrls: ["/images/list-project.png"],
    creator: "John Doe",
    totalRaised: 5000,
  },
  {
    id: 2,
    category: "Food",
    name: "Food Project B",
    description: "Deskripsi singkat tentang project kuliner.",
    deadline: "2025-07-15",
    mediaUrls: ["/images/list-project.png"],
    creator: "John Doe",
    totalRaised: 5000,
  },
  {
    id: 3,
    category: "Service",
    name: "Service Project C",
    description: "Deskripsi singkat tentang project jasa.",
    deadline: "2025-08-10",
    mediaUrls: ["/images/list-project.png"],
    creator: "John Doe",
    totalRaised: 5000,
  },
];

function Page() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#EFEEEA]">
      <Navbar />

      <section className="pt-[140px] pb-0 px-6 text-center relative">
        <div className="max-w-[1100px] mx-auto relative z-10 pb-[70px]">
          <h1 className="text-[60px] leading-[70px] font-sen-bold mb-6 text-[#222222]">
            Find Brilliant Ideas, Support Now!
          </h1>
        </div>

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
          {/* Filter Buttons */}
          <div className="flex gap-[25px] justify-left gap-6 sm:gap-14 pt-[25px] pl-[25px] pb-[25px]">
            {["All", "Food", "Tech", "Service"].map((cat) => (
              <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-[140px] h-[50px] rounded-[12px] text-[18px] font-sen-bold ${
                  selectedCategory === cat
                    ? "bg-[#169976] text-[#FFFFFF]"
                    : "bg-[#E5E5E5] text-[#169976]"
                }`}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="flex lg:flex-row items-start gap-20">
            {" "}
            {/* grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 */}
            {filteredProjects.map((project) => {
              const daysLeft = Math.ceil(
                (new Date(project.deadline).getTime() - new Date().getTime()) /
                  (1000 * 60 * 60 * 24)
              );

              return (
                <div
                  key={project.id}
                  onClick={() => router.push("/product/detail")}
                  className="bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-[16px] ml-[25px] mb-[25px] shadow-md overflow-hidden w-[400px]"
                >
                  {project.mediaUrls?.[0] && (
                    <img
                      src={project.mediaUrls[0]}
                      alt={project.name}
                      className="w-full h-[220px] object-cover"
                    />
                  )}
                  <div className="p-[10px]">
                    <p className="text-sm text-gray-500 mb-1">
                      {project.category}
                    </p>
                    <h3 className="text-lg font-extrabold text-gray-800 mb-2">
                      {project.name}
                    </h3>
                    <div className="text-sm text-gray-700 mb-2 flex items-center">
                      <span className="mr-1">💰</span> $
                      {project.totalRaised.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-700 mb-2 flex items-center">
                      <span className="mr-1">📅</span> {daysLeft} Days left
                    </div>
                    <p className="text-sm text-gray-600 italic mb-4">
                      by {project.creator}
                    </p>
                  </div>
                </div>
              );
            })}
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
