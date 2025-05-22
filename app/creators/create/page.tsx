"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { PlusCircle, XCircle } from "lucide-react";
import { useUser } from "@clerk/nextjs";

interface MediaFile {
  url: string;
  name: string;
}

export default function CreateNewProject() {
  const router = useRouter();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    name: "",
    category: "Tech",
    description: "",
    donation: "",
    deadline: "",
    notes: "",
    media: [] as MediaFile[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    return () => {
      formData.media.forEach((file) => {
        if (file.url.startsWith("blob:")) {
          URL.revokeObjectURL(file.url);
        }
      });
    };
  }, [formData.media]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validasi required fields
    if (!formData.name.trim()) newErrors.name = "Project name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.donation) newErrors.donation = "Donation target is required";
    if (!formData.deadline) newErrors.deadline = "Deadline is required";
    if (formData.media.length === 0)
      newErrors.media = "At least one media file is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showNotification("error", "Please fill in all required fields ");
      return;
    }

    // Di creators/create/page.tsx
    // const newProject = {
    //   id: Date.now().toString(), // Gunakan string ID
    //   // ... properti lainnya
    //   mediaUrls: formData.media.map((m) => ({
    //     name: m.name,
    //     // Simpan hanya metadata, bukan data URL
    //     url: m.url.startsWith("blob:") ? "" : m.url,
    //   })),
    // };

    // Simpan ke localStorage
    const newProject = {
      id: Date.now().toString(),
      category: formData.category,
      name: formData.name,
      description: formData.description,
      deadline: formData.deadline,
      mediaUrls: formData.media.map((m) => m.url),
      creator:
        user?.fullName ||
        user?.primaryEmailAddress?.emailAddress ||
        "Anonymous",
      totalRaised: 0,
      donationTarget: Number(formData.donation),
      notes: formData.notes,
    };

    const existingProjects = JSON.parse(
      localStorage.getItem("projects") || "[]"
    );
    const updatedProjects = [...existingProjects, newProject];
    localStorage.setItem("projects", JSON.stringify(updatedProjects));

    // Simulasi submit sukses
    console.log("Form data:", formData);
    showNotification("success", "Project created successfully ");

    // Redirect setelah submit sukses
    setTimeout(() => {
      router.push("/creators");
    }, 1000);

    try {
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "QuotaExceededError"
      ) {
        showNotification(
          "error",
          "Storage full! Please delete some old projects"
        );
        return;
      }
      throw error;
    }
  };

  const compressImage = async (file: File): Promise<MediaFile> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_SIZE = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob as Blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });

              const reader = new FileReader();
              reader.onload = () =>
                resolve({
                  url: reader.result as string,
                  name: file.name,
                });
              reader.readAsDataURL(compressedFile);
            },
            "image/jpeg",
            0.7
          );
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        const files = Array.from(e.target.files);
        if (files.length + formData.media.length > 5) {
          showNotification("error", "Maximum 5 files allowed");
          return;
        }

        const newMedia = await Promise.all(
          files.slice(0, 5 - formData.media.length).map(async (file) => {
            if (file.type.startsWith("image/")) {
              return await compressImage(file);
            }
            return {
              url: URL.createObjectURL(file),
              name: file.name,
            };
          })
        );

        setFormData((prev) => ({
          ...prev,
          media: [...prev.media, ...newMedia],
        }));
      } catch {
        showNotification("error", "Error processing files");
      }
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...formData.media];
    newFiles.splice(index, 1);
    setFormData({ ...formData, media: newFiles });
  };

  return (
    <div className="min-h-screen bg-[#EFEEEA]">
      <Navbar />
      {notification && (
        <div
          className={`bg-[#FFFFFF] mt-[50px] w-[300px] h-[50px] fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-4 rounded-[10px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.50)] flex justify-center items-center gap-2
          ${
            notification.type === "success"
              ? "bg-green-700 text-white"
              : "bg-red-700 text-white"
          } z-50`}
        >
          <span>{notification.message}</span>
          <span>{notification.type === "success" ? "✅" : "❌"}</span>
        </div>
      )}

      <section className="py-24 px-6 bg-[#EFEEEA] flex justify-center relative text-center pt-[120px] pb-[120px]">
        <div className="flex lg:flex-row items-start gap-20 pl-[120px] ">
          {/* Form Section */}
          <div className="w-[800px] mr-[20px] bg-[#FFFFFF] rounded-[30px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] text-left flex flex-col p-[50px]">
            <h1 className="text-3xl font-bold mb-[20px]">Create New Project</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Name */}
              <div>
                <label className="block text-lg font-medium mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  className={`w-full p-3 border rounded-[15px] pl-[10px] pr-[10px] h-[36px] mt-[10px] mb-[10px] ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
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
                  className="w-full p-3 border border-gray-300 rounded-[15px] h-[36px] mt-[10px] mb-[10px] pl-[10]"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="Food">Food</option>
                  <option value="Tech">Tech</option>
                  <option value="Service">Service</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-lg font-medium mb-2">
                  Description *
                </label>
                <textarea
                  className={`w-full p-3 border rounded-[15px] h-[64px] pl-[10px] pt-[10px] pr-[10px] pb-[10px] mt-[10px] mb-[10px] ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
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
                    className={`w-full pl-10 p-3 border rounded-[15px] h-[36px] pl-[33px] mt-[10px] mb-[10px] ${
                      errors.donation ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.donation}
                    onChange={(e) =>
                      setFormData({ ...formData, donation: e.target.value })
                    }
                  />
                </div>
                {errors.donation && (
                  <p className="text-red-500 text-sm mt-1">{errors.donation}</p>
                )}
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-lg font-medium mb-2">
                  Deadline *
                </label>
                <input
                  type="date"
                  className={`w-full p-3 border rounded-[15px] h-[36px] mt-[10px] mb-[10px] pr-[10] pl-[10] ${
                    errors.deadline ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.deadline}
                  onChange={(e) =>
                    setFormData({ ...formData, deadline: e.target.value })
                  }
                />
                {errors.deadline && (
                  <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>
                )}
              </div>

              {/* Notes */}
              <div>
                <label className="block text-lg font-medium mb-2">
                  Notes (Optional)
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-[15px] h-[36px] pl-[10px] pr-[10px] mt-[10px] mb-[10px]"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                />
              </div>

              {/* Media Upload */}
              <div>
                <label className="block text-lg font-medium mb-2">
                  Upload Media (Images/Video)
                </label>
                <label className="w-full p-4 border-2 border-dashed border-gray-300 rounded-[15px] h-[92px] mt-[10px] mb-[10px] flex flex-col items-center justify-center cursor-pointer">
                  <PlusCircle className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-gray-600">
                    Click to upload or drag and drop
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                  />
                </label>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {errors.media && (
                    <p className="text-red-500 text-sm mt-1 w-[300px]">
                      {errors.media}
                    </p>
                  )}
                  {formData.media.map((mediaFile, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          className="h-[36px] w-[36px] flex items-center gap-2 justify-center border border-[#01806D] text-[#01806D] px-6 py-3 rounded-[8px] sm:w-auto"
                          onClick={() => removeFile(index)}
                        >
                          {errors.media && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.deadline}
                            </p>
                          )}
                          <XCircle className="w-6 h-6" />
                        </button>
                      </div>
                      {mediaFile.url.startsWith("data:image/") ? (
                        <img
                          src={mediaFile.url}
                          alt={`Preview ${index}`}
                          className="w-[122px] h-[92] object-cover rounded-[8px]"
                        />
                      ) : (
                        <video className="w-[122px] h-[92] object-cover rounded-[8px]">
                          <source src={mediaFile.url} />
                        </video>
                      )}
                      <p className="text-xs truncate mt-1">{mediaFile.name}</p>
                    </div>
                  ))}
                </div>
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
                  className="w-[79px] h-[36px] bg-[#169976] text-[#FFFFFF] text-[14px] font-sen-bold rounded-[8px] border-[#169976] hover:bg-[#f2f2f0] focus:outline-none"
                >
                  Create
                </button>
              </div>
            </form>
          </div>

          {/* Image Section */}
          <div className="relative mt-20 z-0 pb-[100px] w-full ml-[20px] pt-[200px]">
            <NextImage
              src="/images/projections.svg"
              alt="Project Illustration"
              width={461}
              height={450}
              className="mx-auto"
            />
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
