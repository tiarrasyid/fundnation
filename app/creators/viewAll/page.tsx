'use client'
import Navbar from '@/components/Navbar';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MoreVertical, Edit, Trash } from 'lucide-react';

const ViewAll = () => {
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState([
    { id: 1, name: "The Climate App", category: "Tech" },
    { id: 2, name: "Support Baker’s through COVID–19", category: "Service" },
    { id: 3, name: "The Food Shift Kitchen is Expanding!", category: "Food" },
    { id: 4, name: "The Food Shift Kitchen is Expanding!", category: "Food" },
    { id: 5, name: "The Food Shift Kitchen is Expanding!", category: "Food" },
    { id: 6, name: "The Food Shift Kitchen is Expanding!", category: "Food" },
  ]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEdit = (projectId: number) => {
    router.push(`/creators/edit/${projectId}`);
    setOpenMenuId(null);
  };

  const handleDelete = (projectId: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter(project => project.id !== projectId));
      setOpenMenuId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#EFEEEA]">
      <Navbar />

      <section className="py-24 px-6 bg-[#EFEEEA] flex justify-center pt-[120px] pb-[120px] h-[700px]">
        <div className="p-[35px] bg-[#FFFFFF] w-full max-w-[1319px] rounded-[12px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] p-16 sm:p-20">
          <h1 className="text-2xl font-semibold mb-6">All Project</h1>
          <div className="bg-white rounded-lg shadow p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 font-medium">Project</th>
                  <th className="py-3 px-4 font-medium">Category</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b hover:bg-gray-50 relative">
                    <td className="py-3 px-4">{project.name}</td>
                    <td className="py-3 px-4">{project.category}</td>
                    <td className="py-3 px-4 text-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(project.id === openMenuId ? null : project.id);
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

      <footer className="h-[100px] bg-[#111111] flex items-center px-[60px]">
        <p className="text-[#EFEEEA] text-[20px] sm:text-[24px] font-sen-bold">
          FundNation © 2025.
        </p>
      </footer>
    </div>
  );
};

export default ViewAll;