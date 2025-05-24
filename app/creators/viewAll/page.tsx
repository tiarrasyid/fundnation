"use client";
import Navbar from "@/components/Navbar";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash } from "lucide-react";
import { Project } from "@/types/project";

export default function ViewAllProjects() {
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null); // Ubah tipe ke string
  const menuRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = () => {
      const savedProjects = localStorage.getItem("projects");
      if (savedProjects) {
        const parsedProjects: Project[] = JSON.parse(savedProjects);

        const updatedProjects = parsedProjects
          .filter((p) => !p.isWithdrawn)
          .map((project) => ({
            ...project,
            status:
              project.totalRaised >= project.donationTarget
                ? "done"
                : ("active" as "done" | "active"),
            progressPercentage: Math.min(
              (project.totalRaised / project.donationTarget) * 100,
              100
            ),
          }));

        setProjects(updatedProjects);
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
      }
    };

    loadProjects();
    window.addEventListener("storage", loadProjects);
    return () => window.removeEventListener("storage", loadProjects);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = (projectId: string) => {
    router.push(`/creators/viewAll/edit/${projectId}`);
  };

  const handleDelete = (projectId: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const updatedProjects = projects.filter(
        (project) => project.id !== projectId
      );
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      setProjects(updatedProjects);
      setOpenMenuId(null);
    }
  };

  const getStatusStyle = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-[#E6F4FF] text-[#1890FF] w-auto p-[5px]";
      case "done":
        return "bg-[#F6FFED] text-[#52C41A] w-auto p-[5px]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#EFEEEA]">
      <Navbar />

      <main className="flex-1">
        <section className="py-24 px-6 bg-[#EFEEEA] flex justify-center pt-[120px] pb-[120px]">
          <div className="p-[35px] bg-[#FFFFFF] w-full max-w-[1319px] rounded-[12px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-16 sm:p-20">
            <h1 className="text-2xl font-semibold mb-6">All Project</h1>
            <div className="bg-white rounded-lg shadow p-4">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 font-medium">Project</th>
                    <th className="py-3 px-4 font-medium">Category</th>
                    <th className="py-3 px-4 font-medium">Total Raised</th>
                    <th className="py-3 px-4 font-medium">Target</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project.id}
                      className="border-b hover:bg-gray-50 relative"
                    >
                      <td className="py-3 px-4">{project.name}</td>
                      <td className="py-3 px-4">{project.category}</td>
                      <td className="py-3 px-4">{project.totalRaised}</td>
                      <td className="py-3 px-4">{project.donationTarget}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuId(
                              project.id === openMenuId ? null : project.id
                            );
                          }}
                          className="p-1 hover:bg-gray-100"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {openMenuId === project.id && (
                          <div
                            ref={menuRef}
                            className="absolute right-4 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                          >
                            <button
                              onClick={() => handleEdit(project.id)}
                              className="p-[5px] w-[100px] h-[35px] px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(project.id)}
                              className="p-[5px] w-[100px] h-[35px] px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2"
                            >
                              <Trash className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6 flex justify-end pt-[25px]">
                <Button
                  className="w-[65px] h-[36px] bg-[#169976] text-[#FFFFFF] text-[14px] font-sen-bold rounded-[8px] hover:bg-[#138a69] focus:outline-none"
                  onClick={() => router.back()}
                >
                  Back
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="h-[100px] bg-[#111111] flex items-center px-[60px]">
        <p className="text-[#EFEEEA] text-[20px] sm:text-[24px] font-sen-bold">
          FundNation © 2025.
        </p>
      </footer>
    </div>
  );
}
