"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarDays, CircleUserRound, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import { Project } from "@/types/project";
import { useUser } from "@clerk/nextjs";
import { Report } from "@/types/report";

export default function ProjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [daysLeft, setDaysLeft] = useState(0);
  const { isLoaded, isSignedIn, user } = useUser();
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [hasReported, setHasReported] = useState(false);

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

  useEffect(() => {
    if (user?.id) {
      const reports: Report[] = JSON.parse(
        localStorage.getItem("reports") || "[]"
      );
      const userReport = reports.find(
        (r) => r.userId === user.id && r.projectId === projectId
      );
      setHasReported(!!userReport);
    }
  }, [user, projectId]);

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

  // Fungsi handle report
  const handleReport = async () => {
    if (!user || !reportReason) return;

    const newReport: Report = {
      projectId,
      userId: user.id,
      reason: reportReason as Report["reason"], // Type casting
      timestamp: new Date(),
    };
    try {
      const existingReports = JSON.parse(
        localStorage.getItem("reports") || "[]"
      );
      const updatedReports = [...existingReports, newReport];

      localStorage.setItem("reports", JSON.stringify(updatedReports));
      setHasReported(true);
      setShowReportModal(false);
      setReportReason("");
      alert("Thanks for the report! We will review this project.");
    } catch (error) {
      console.error("Failed to save report:", error);
      alert("Failed to send report. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEEEA]">
      <Navbar />

      <section className="py-24 px-6 bg-[#EFEEEA] h-auto flex justify-center pt-[70px] pb-[70px] pr-[36px] pl-[36px]">
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

              <div className="bg-[#F6F6F6] w-full p-6 rounded-[15px] space-y-4 p-[20px]">
                {" "}
                {project.notes && (
                  <div className="bg-[#F6F6F6] w-full max-w-[550px] p-6 rounded-[15px] mt-6">
                    <h3 className="text-xl font-bold text-[#2B2B39] mb-3">
                      Project Notes:
                    </h3>
                    <p className="text-[#444] leading-relaxed">
                      {project.notes}
                    </p>
                  </div>
                )}
              </div>
              <div className="mb-[20px] mt-[20px]">
                <div className="mt-6">
                  <Button
                    onClick={() => {
                      setReportReason("");
                      setShowReportModal(true);
                    }}
                    disabled={hasReported}
                    className="min-w-[140px] h-[40px] p-[13px] text-[#169976] bg-[#ffffff] text-lg font-bold rounded-[10px] shadow-md text-[15px] font-sen-bold"
                  >
                    {hasReported
                      ? "Thank You For Reporting"
                      : "Report This Project"}
                  </Button>
                </div>
                {showReportModal && (
                  <div className="inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-[10px] rounded-lg max-w-md w-full mx-4">
                      <h3 className="text-xl font-bold mb-4">
                        Select Report Reason
                      </h3>

                      {/* Daftar Alasan Report */}
                      <div className="space-y-4 mb-[20px] mt-[10px]">
                        <div
                          onClick={() => setReportReason("rules_violation")}
                          className={`border rounded-[10px] p-[15px] mb-[10px] cursor-pointer transition-colors ${
                            reportReason === "rules_violation"
                              ? "border-[#01806D] bg-[#01806D]/10"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <h4 className="font-medium">
                            This project breaks one of our rules
                          </h4>
                        </div>

                        <div
                          onClick={() => setReportReason("spam_abuse")}
                          className={`border rounded-[10px] p-[15px]  mb-[10px] cursor-pointer transition-colors ${
                            reportReason === "spam_abuse"
                              ? "border-[#01806D] bg-[#01806D]/10"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <h4 className="font-medium">
                            Report spam or abusive behavior
                          </h4>
                        </div>

                        <div
                          onClick={() => setReportReason("ip_violation")}
                          className={`border rounded-[10px] p-[15px]  mb-[10px] cursor-pointer transition-colors ${
                            reportReason === "ip_violation"
                              ? "border-[#01806D] bg-[#01806D]/10"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <h4 className="font-medium">
                            Intellectual property violation
                          </h4>
                        </div>
                      </div>

                      {/* Tombol Aksi */}
                      <div className="flex justify-start gap-[10px]">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowReportModal(false);
                            setReportReason("");
                          }}
                          className="h-[36px] flex items-center gap-2 justify-center border border-[#01806D] text-[#01806D] px-6 py-3 rounded-[8px] text-[14px] font-semibold w-[79px] sm:w-auto"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleReport}
                          disabled={!reportReason || hasReported}
                          className="w-auto pl-[15px] pr-[15px] h-[36px] bg-[#169976] text-[#FFFFFF] text-[14px] font-sen-bold rounded-[8px] border-[#169976] hover:bg-[#f2f2f0] focus:outline-none"
                        >
                          Submit Report
                        </Button>
                      </div>
                    </div>
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
