"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { IconPlus } from "@/components/icon/TableIcon";
import { Clock, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import ProjectFormModal from "@/components/ui/MenuProject";

const ProjectPage = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Projek Bukit Asam BUMN",
      deskripsi: [
        "Untuk fitur UI sudah dikerjakan",
        "Submit proposal belum karena belum ada hosting",
      ],
      img: "/projek/bukit-asam.png",
      status: "Progres",
      link: "https://bukit-asam-make-by-dylan.vercel.app/",
    },
  ]);

  const toggleStatus = (id) => {
    setProjects((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Progres" ? "Selesai" : "Progres",
            }
          : item
      )
    );
  };

  return (
    <div className="bg-slate-50 min-h-[85vh] max-h-[85vh] overflow-y-auto absolute bottom-0 p-5 sm:p-6 rounded-t-3xl left-0 right-0 w-full mt-[80px] pb-20">
      <header className="w-full">
        <ul className="flex items-center w-full text-sm gap-5 justify-start">
          <li className="py-2 px-3 rounded-md bg-[#3629B7] text-white">
            Project board
          </li>
        </ul>
      </header>

      <button
        className="text-white bg-[#3629B7] rounded-full w-[60px] fixed bottom-[7rem] right-5 h-[60px] flex items-center justify-center"
        onClick={() => setShowMenu(!showMenu)}
      >
        <IconPlus />
      </button>

      <ProjectFormModal showMenu={showMenu} setShowMenu={setShowMenu} />

      <section className="mt-12 flex justify-center items-center flex-wrap gap-7">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white text-[#1e293b] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-between"
          >
            <Image
              src={project.img}
              width={400}
              height={200}
              alt={project.title}
              className="rounded-xl object-cover w-full h-[180px]"
            />
            <div className="mt-4 flex-1">
              <h2 className="font-semibold text-lg text-[#1e293b] ">
                {project.title}
              </h2>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                {project.deskripsi.map((desc, idx) => (
                  <li key={idx} className="text-slate-700">
                    {desc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium flex items-center gap-2 transition-all ${
                  project.status === "Selesai"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {project.status === "Selesai" ? (
                  <CheckCircle size={16} />
                ) : (
                  <Clock size={16} />
                )}
                {project.status}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => router.push(project.link)}
                  className="text-xs bg-[#3629B7] hover:bg-[#2e24a0] text-white px-3 py-2 rounded-lg transition"
                >
                  Live
                </button>
                <button
                  onClick={() => toggleStatus(project.id)}
                  className="text-xs bg-gray-200 dark:bg-slate-700 dark:text-white px-3 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Edit Status
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default ProjectPage;
