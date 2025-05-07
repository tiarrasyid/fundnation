'use client'
import Navbar from '@/components/Navbar';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // pastikan kamu punya komponen Button ini

const ViewAll = () => {
  const router = useRouter();

  const projects = [
    { id: 1, name: "The Climate App", category: "Tech" },
    { id: 2, name: "Support Baker’s through COVID–19", category: "Service" },
    { id: 3, name: "The Food Shift Kitchen is Expanding!", category: "Food" },
  ];

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
                  <th className="py-3 px-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{project.name}</td>
                    <td className="py-3 px-4">{project.category}</td>
                    <td className="py-3 px-4 text-right">⋮</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex justify-end pt-[25px]">
              <Button className="w-[65px] h-[36px] bg-[#169976] text-[#FFFFFF] text-[14px] font-sen-bold rounded-[8px] hover:bg-[#138a69] focus:outline-none"
              onClick={() => router.back()}>Back</Button>
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
