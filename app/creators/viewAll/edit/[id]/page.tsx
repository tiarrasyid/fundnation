"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useParams, useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import { Project } from "@/types/project";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId =
    params && params.id
      ? Array.isArray(params.id)
        ? params.id[0]
        : params.id
      : undefined;
  const [project, setProject] = useState<Project | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Tech",
    description: "",
    donationTarget: "",
    deadline: "",
    notes: "",
    mediaUrls: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!projectId) return;

    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const foundProject = projects.find((p: Project) => p.id === projectId);

    if (!foundProject) {
      router.push("/creators/viewAll");
      return;
    }

    setProject(foundProject);
    setFormData({
      name: foundProject.name,
      category: foundProject.category,
      description: foundProject.description,
      donationTarget: foundProject.donationTarget.toString(),
      deadline: foundProject.deadline.split("T")[0],
      notes: foundProject.notes || "",
      mediaUrls: foundProject.mediaUrls,
    });
  }, [projectId, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Project name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.donationTarget || isNaN(Number(formData.donationTarget))) {
      newErrors.donationTarget = "Invalid donation target";
    }
    if (!formData.deadline) newErrors.deadline = "Deadline is required";
    if (formData.mediaUrls.length === 0)
      newErrors.mediaUrls = "At least one media required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const updatedProject: Project = {
      ...project!,
      ...formData,
      donationTarget: Number(formData.donationTarget),
      deadline: new Date(formData.deadline).toISOString(),
    };

    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const updatedProjects = projects.map((p: Project) =>
      p.id === projectId ? updatedProject : p
    );

    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    router.push("/creators/viewAll");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newUrls = await Promise.all(
        files.map(
          (file) =>
            new Promise<string>((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.readAsDataURL(file);
            })
        )
      );

      setFormData((prev) => ({
        ...prev,
        mediaUrls: [...prev.mediaUrls, ...newUrls],
      }));
    }
  };

  const removeMedia = (index: number) => {
    const newMedia = [...formData.mediaUrls];
    newMedia.splice(index, 1);
    setFormData({ ...formData, mediaUrls: newMedia });
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#EFEEEA]">
      <Navbar />

      <section className="py-24 px-6 bg-[#EFEEEA] flex justify-center pt-[120px] pb-[120px]">
        <div className="w-[800px] mr-[20px] bg-[#FFFFFF] rounded-[30px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] text-left flex flex-col p-[50px]">
          <h1 className="text-3xl font-bold mb-[20px]">Edit Project</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Project Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={`w-full p-3 border rounded-[15px] pl-[10px] pr-[10px] h-[36px] mt-[10px] mb-[10px] ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-[15px] h-[36px] mt-[10px] mb-[10px] pl-[10]"
              >
                <option value="Tech">Tech</option>
                <option value="Food">Food</option>
                <option value="Service">Service</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className={`w-full p-3 border rounded-[15px] h-[64px] pl-[10px] pt-[10px] pr-[10px] pb-[10px] mt-[10px] mb-[10px] ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Donation Target */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Donation Target (IDR) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 pl-[10]">
                  Rp
                </span>
                <input
                  type="number"
                  value={formData.donationTarget}
                  onChange={(e) =>
                    setFormData({ ...formData, donationTarget: e.target.value })
                  }
                  className={`w-full pl-10 p-3 border rounded-[15px] h-[36px] pl-[33px] mt-[10px] mb-[10px] ${
                    errors.donationTarget ? "border-red-500" : ""
                  }`}
                />
                {errors.donationTarget && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.donationTarget}
                  </p>
                )}
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Deadline *
              </label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                className={`w-full p-3 border rounded-[15px] h-[36px] mt-[10px] mb-[10px] pr-[10] pl-[10] ${
                  errors.deadline ? "border-red-500" : ""
                }`}
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label className="block text-lg font-medium mb-2">Notes</label>
              <input
                type="text"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-[15px] h-[36px] pl-[10px] pr-[10px] mt-[10px] mb-[10px]"
              />
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Project Media *
              </label>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="mb-4 mt-4"
              />
              <div className="flex gap-[35px] mt-[28px]">
                {formData.mediaUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    {url.startsWith("data:image") ? (
                      <img
                        src={url}
                        alt={`Media ${index}`}
                        className="w-[122px] h-[92] object-cover rounded-[8px]"
                      />
                    ) : (
                      <video
                        src={url}
                        className="w-[122px] h-[92] object-cover rounded-[8px]"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      className="h-[36px] w-[36px] flex items-center gap-2 justify-center border border-[#01806D] text-[#01806D] px-6 py-3 rounded-[8px] sm:w-auto"
                    >
                      <XCircle className="w-6 h-6" />
                    </button>
                  </div>
                ))}
              </div>
              {errors.mediaUrls && (
                <p className="text-red-500 text-sm">{errors.mediaUrls}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8 gap-[15px] mt-[20px]">
              <button
                type="button"
                onClick={() => router.back()}
                className="h-[36px] flex items-center gap-2 justify-center border border-[#01806D] text-[#01806D] px-6 py-3 rounded-[8px] text-[14px] font-semibold w-[79px] sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-auto pr-[16px] pl-[16px] h-[36px] bg-[#169976] text-[#FFFFFF] text-[14px] font-sen-bold rounded-[8px] border-[#169976] hover:bg-[#f2f2f0] focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </form>
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
