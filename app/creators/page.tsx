"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  CircleDollarSign,
  CircleUserRound,
  Eye,
  HandHeart,
  Plus,
  Rocket,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Project } from "@/types/project";

export default function CreatorsPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalDonations: 0,
    activeProjects: 0,
  });

  useEffect(() => {
    if (!isLoaded || !user) return;

    const loadProjects = () => {
      try {
        const savedProjects = localStorage.getItem("projects");
        if (savedProjects) {
          const parsedProjects: Project[] = JSON.parse(savedProjects);

          const updatedProjects = parsedProjects.map((project) => ({
            ...project,
            status: project.isWithdrawn
              ? "done"
              : project.totalRaised >= project.donationTarget
              ? "done"
              : "active",
          }));

          localStorage.setItem("projects", JSON.stringify(updatedProjects));

          const creatorProjects = updatedProjects.filter(
            (p) =>
              p.creator === user.fullName ||
              p.creator === user.primaryEmailAddress?.emailAddress
          );

          const activeProjects = creatorProjects.filter(
            (p) => p.status === "active"
          ).length;

          setStats({
            totalProjects: creatorProjects.length,
            totalDonations: creatorProjects.reduce(
              (sum, p) => sum + p.totalRaised,
              0
            ),
            activeProjects: activeProjects,
          });
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      }
    };

    loadProjects();
    window.addEventListener("storage", loadProjects);
    return () => window.removeEventListener("storage", loadProjects);
  }, [isLoaded, user]);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !user) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#EFEEEA]">
      <Navbar />
      <main className="flex-1">
        <section className="py-24 px-6 bg-[#EFEEEA] flex justify-center pt-[120px] pb-[120px]">
          <div className="flex lg:flex-row items-start gap-20 pl-[120px] pr-[120px]">
            {/* Kiri - Profile */}
            <div className="w-full lg:w-[30%] pr-[30px]">
              <div className="w-[400px] h-[800px] bg-[#FFFFFF] rounded-[30px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-10 flex flex-col items-center text-center">
                <div className="mt-[47px] mb-[34px] flex justify-center">
                  {user.hasImage ? (
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      className="w-auto h-auto max-w-[100px] max-h-[100px] rounded-full object-cover border-4 border-[#01806D]"
                    />
                  ) : (
                    <CircleUserRound
                      width={100}
                      height={100}
                      className="text-[#01806D]"
                    />
                  )}
                </div>
                <h3 className="text-[20px] font-semibold mt-4">
                  {user?.fullName}
                </h3>
                <p className="text-[#666] text-sm">
                  {user?.emailAddresses[0].emailAddress}
                </p>
                <hr className="w-[344px] border-t my-4 m-[15px]" />
                <span className="text-[#01806D] font-semibold">Creator</span>
              </div>
            </div>

            {/* Kanan - Dashboard */}
            <div className="w-full lg:w-[70%] pl-[30px]">
              <h2 className="text-[48px] font-bold mb-10 pb-[25px]">
                Creators Dashboard
              </h2>
              {/* Stats */}
              <div className="flex flex-row flex-nowrap gap-6 mb-10 gap-[30px]">
                <div className="flex-shrink-0 bg-[#FFFFFF] rounded-[30px] shadow-[0_4px_30px_rgba(0,0,0,0.25)] p-10 w-[270px] h-[234px] text-center">
                  <div className="text-left mb-6 pt-[30px] pl-[30px]">
                    <p className="text-[#666] text-[18px] font-sen-bold mb-2 flex items-center gap-2">
                      Project Supported
                      <HandHeart className="inline-block ml-[10px] text-[#169976]" />
                    </p>
                  </div>
                  <p className="text-[40px] font-sen-bold text-[#222222] mb-4 pt-[30px] item-center gap-2 mb-2 flex pl-[30px]">
                    {stats.totalProjects}
                  </p>
                  <p className="text-[#666] text-[16px] font-sen-medium mb-2 flex items-center gap-2 pt-[30px] pl-[30px]">
                    Total Supported Projects
                  </p>
                </div>

                <div className="flex-shrink-0 bg-[#FFFFFF] rounded-[30px] shadow-[0_4px_30px_rgba(0,0,0,0.25)] p-10 w-auto pr-[25px] h-[234px] text-center">
                  <div className="text-left mb-6 pt-[30px] pl-[30px]">
                    <p className="text-[#666] text-[18px] font-sen-bold mb-2 flex items-center gap-2">
                      Total Donations
                      <CircleDollarSign className="inline-block ml-[10px] text-[#169976]" />
                    </p>
                  </div>
                  <button
                    onClick={() => router.push("/creators/withdraw")}
                    className="text-[40px] font-sen-bold text-[#222222] mb-4 pt-[30px] item-center gap-2 mb-2 flex pl-[30px] bg-transparent border-none cursor-pointer w-full text-left"
                    style={{ outline: "none" }}
                  >
                    Rp {stats.totalDonations.toLocaleString()}
                  </button>
                  <p className="text-[#666] text-[16px] font-sen-medium mb-2 flex items-center gap-2 pt-[42px] pl-[30px]">
                    Across all projects
                  </p>
                </div>

                <div className="flex-shrink-0 bg-[#FFFFFF] rounded-[30px] shadow-[0_4px_30px_rgba(0,0,0,0.25)] p-10 w-[270px] h-[234px] text-center">
                  <div className="text-left mb-6 pt-[30px] pl-[30px]">
                    <p className="text-[#666] text-[18px] font-sen-bold mb-2 flex items-center gap-2">
                      Active Projects
                      <Rocket className="inline-block ml-[10px] text-[#169976]" />
                    </p>
                  </div>
                  <p className="text-[40px] font-sen-bold text-[#222222] mb-4 pt-[30px] item-center gap-2 mb-2 flex pl-[30px]">
                    {stats.activeProjects}
                  </p>
                  <p className="text-[#666] text-[16px] font-sen-medium mb-2 flex items-center gap-2 pt-[30px] pl-[30px]">
                    Ongoing Projects
                  </p>{" "}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-[30px] justify-center gap-6 sm:gap-14 pt-[50px]">
                <button
                  onClick={() => router.push("/creators/viewAll")}
                  className="h-[60px] flex items-center gap-2 justify-center border border-[#01806D] text-[#01806D] px-6 py-3 rounded-[10px] text-[20px] font-semibold w-full sm:w-auto"
                >
                  <Eye width={20} height={20} className="mr-[10px]" />
                  View All Projects
                </button>
                <button
                  onClick={() => router.push("/creators/create")}
                  className="h-[60px] flex items-center gap-2 justify-center border bg-[#01806D] text-[#FFFFFF] px-6 py-3 rounded-[10px] text-[20px] font-semibold w-full sm:w-auto"
                >
                  <Plus width={20} height={20} className="mr-[10px]" />
                  Create New Project
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="h-[100px] bg-[#111111] flex items-center px-[60px]">
        <p className="text-[#EFEEEA] text-[20px] sm:text-[24px] font-sen-bold">
          FundNation © 2025.
        </p>
      </footer>
    </div>
  );
}
