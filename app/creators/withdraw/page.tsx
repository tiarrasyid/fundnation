"use client";
import Navbar from "@/components/Navbar";
import { Project } from "@/types/project";
import { BanknoteArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function WithdrawPage() {
  const [completedProjects, setCompletedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProjects = () => {
      const savedProjects = localStorage.getItem("projects");
      if (savedProjects) {
        const projects: Project[] = JSON.parse(savedProjects);
        setCompletedProjects(
          projects.filter(
            (p) => p.status === "done" && p.totalRaised > 0 && !p.isWithdrawn
          )
        );
      }
    };
    loadProjects();
    window.addEventListener("storage", loadProjects);
    return () => window.removeEventListener("storage", loadProjects);
  }, []);

  const handleWithdraw = (projectId: string) => {
    setLoading(true);
    try {
      const projects: Project[] = JSON.parse(
        localStorage.getItem("projects") || "[]"
      );

      const updatedProjects = projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            totalRaised: 0,
            isWithdrawn: true,
            status: "done",
          };
        }
        return project;
      });

      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      setCompletedProjects(
        updatedProjects.filter(
          (p): p is Project =>
            !p.isWithdrawn && (p.status === "done" || p.status === "active")
        )
      );
      toast.success("Withdrawal successful!");
    } catch {
      toast.error("Failed to process withdrawal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#EFEEEA]">
      <Navbar />

      <main className="flex-1">
        <section className="py-24 px-6 bg-[#EFEEEA] flex justify-center pt-[120px] pb-[50px] h-[700px]">
          <div className="p-[35px] bg-[#FFFFFF]  w-full max-w-[1319px] rounded-[12px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
            <h1 className="text-3xl font-bold mb-[30px] text-center">
              Withdraw Funds
            </h1>
            <div className="grid gap-[20px] max-h-[400px] overflow-y-auto pr-2">
              {completedProjects
                .filter((p) => p.status === "done")
                .map((project) => (
                  <div
                    key={project.id}
                    className="bg-white p-6 rounded-lg shadow-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-semibold">
                          {project.name}
                        </h2>
                        <p className="text-[#01806D] font-medium mt-2">
                          Rp {project.totalRaised.toLocaleString("id-ID")}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Status: {project.status.toUpperCase()}
                        </p>
                      </div>
                      <button
                        onClick={() => handleWithdraw(project.id)}
                        disabled={loading || project.status !== "done"}
                        className="h-[45px] flex items-center gap-2 justify-center border bg-[#01806D] text-[#FFFFFF] px-6 py-3 rounded-[10px] text-[20px] font-semibold w-auto pr-[20px] pl-[20px] sm:w-auto"
                      >
                        <BanknoteArrowDown
                          width={20}
                          height={20}
                          className="mr-[10px]"
                        />
                        {loading ? "Processing..." : "Withdraw"}
                      </button>
                    </div>
                  </div>
                ))}
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
