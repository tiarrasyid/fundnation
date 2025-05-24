"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarDays, CircleUserRound, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { Project } from "@/types/project";
import { useUser } from "@clerk/nextjs";

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [daysLeft, setDaysLeft] = useState(0);
  const { isLoaded, isSignedIn, user } = useUser();

  const projectId =
    params && Array.isArray(params.id)
      ? params.id[0]
      : params?.id?.toString() || "";

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/sign-in");
    }

    const projects: Project[] = JSON.parse(
      localStorage.getItem("projects") || "[]"
    );

    const foundProject = projects.find((p) => p.id.toString() === projectId);

    if (!foundProject) {
      router.push("/product");
      return;
    }

    setProject(foundProject);
    const deadlineDate = new Date(foundProject.deadline);
    const timeDiff = deadlineDate.getTime() - Date.now();
    setDaysLeft(Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));

    const handleStorageChange = () => {
      const projects: Project[] = JSON.parse(
        localStorage.getItem("projects") || "[]"
      );
      const updatedProject = projects.find(
        (p) => p.id.toString() === projectId
      );
      if (updatedProject) setProject(updatedProject);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [params, params?.id, router, isLoaded, isSignedIn, projectId]);

  if (!isLoaded || !user) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#EFEEEA]">
        <Navbar />
        <div className="text-center p-8">Loading project details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFEEEA]">
      <Navbar />

      <section className="py-24 px-6 bg-[#EFEEEA] flex justify-center pt-[70px] pb-[70px] pr-[36px] pl-[36px]">
        <div className="bg-[#FFFFFF] w-[1440px] max-w-[1440px] rounded-[15px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-16 sm:p-20">
          <div className="flex lg:flex-row items-start gap-20 pt-[75px] pb-[120px] pl-[120px] pr-[120px]">
            {/* Media Section */}
            <div className="w-full lg:w-[45%] flex flex-col items-center pr-[50px]">
              <div className="relative w-full h-[500px]">
                {project.mediaUrls[0] && (
                  <Image
                    src={project.mediaUrls[0]}
                    alt="Main Image"
                    fill
                    className="rounded-[15px] object-cover"
                  />
                )}
              </div>

              <div className="flex gap-[30px] mt-[29px]">
                {project.mediaUrls.map((url, index) => (
                  <div key={index} className="relative min-w-[180px] h-[150px]">
                    <Image
                      src={url}
                      alt={`Thumb ${index + 1}`}
                      fill
                      className="rounded-[15px] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Detail Section */}
            <div className="w-full lg:w-[50%] h-[500px] relative pr-8 pt-8 pb-8">
              <div className="mb-5">
                <div className="flex items-center text-[#444] text-xl font-semibold mb-[21px] mt-[21px]">
                  {user.hasImage ? (
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      className="w-auto h-auto max-w-[40px] max-h-[40px] mr-[21px] rounded-full object-cover border-4 border-[#01806D]"
                    />
                  ) : (
                    <CircleUserRound
                      width={40}
                      height={40}
                      className="text-[#01806D]"
                    />
                  )}
                  {project.creator}
                </div>
                {/* Project Title */}
                <h1 className="text-3xl font-bold text-[#2B2B39] mb-6">
                  {project.name}
                </h1>

                {/* Project Description */}
                <p className="mb-[10px] mt-[10px] text-[#444] text-lg leading-relaxed">
                  {" "}
                  {project.description}
                </p>

                <div className="flex flex-col gap-[10px] mb-[10px] mt-[10px]">
                  <div className="flex items-center gap-3 text-lg text-[#111]">
                    <DollarSign size={24} />
                    Total Raised: Rp {project.totalRaised.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-3 text-lg text-[#111]">
                    <DollarSign size={24} />
                    Target: Rp {project.donationTarget.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-[4] text-lg text-[#111]">
                    <CalendarDays size={24} />
                    {daysLeft} Hari lagi
                  </div>
                </div>

                <div className="mb-[20px] mt-[20px]">
                  {" "}
                  <Button
                    disabled={project.totalRaised >= project.donationTarget}
                    onClick={() =>
                      router.push(`/product/supportNow/${project.id}`)
                    }
                    className={`min-w-[166px]  h-[50px] text-lg text-[#ffffff] font-bold rounded-[15px] shadow-md text-[22px] font-sen-bold ${
                      project.totalRaised >= project.donationTarget
                        ? "bg-[#169976] cursor-not-allowed pr-[15px] pl-[15px]"
                        : "bg-[#169976] hover:bg-[#138a69]"
                    }`}
                  >
                    {project.totalRaised >= project.donationTarget
                      ? "Funding Completed"
                      : "Donate"}
                  </Button>
                </div>
              </div>

              {/* <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#169976] h-2.5 rounded-full"
                    style={{ width: `${project.progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Terkumpul {project.progressPercentage.toFixed(1)}% dari target
                </div>
              </div> */}

              <div className="bg-[#F6F6F6] w-full p-6 rounded-[15px] space-y-4 p-[20px]">
                {" "}
                {project.notes && (
                  <div className="bg-[#F6F6F6] w-full p-6 rounded-[15px] mt-6">
                    <h3 className="text-xl font-bold text-[#2B2B39] mb-3">
                      Project Notes:
                    </h3>
                    <p className="text-[#444] leading-relaxed">
                      {project.notes}
                    </p>
                  </div>
                )}
              </div>
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
