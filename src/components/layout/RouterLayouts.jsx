"use client";

import React, { act, useState } from "react";
import {
  IconHome,
  IconLogout,
  IconReport,
  IconSearch,
  IconSettings,
} from "@/components/icon/TableIcon";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import Navbar from "../ui/Navbar";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/configuration";
import { signOut } from "firebase/auth";

const iconItems = [
  { icon: IconHome, label: "home" },
  { icon: IconLogout, label: "logout" },
];

const RouterLayouts = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleFooterClick = async (label) => {
    console.log(label);
    try {
      if (label == "home") {
        router.push("/dashboard");
      } else if (label === "logout") {
        await signOut(auth);
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Gagal logout:", error.message);
    }
  };

  const onClick = (label, idx) => {
    setActiveIndex(idx);
    handleFooterClick(label);
  };

  return (
    <Provider store={store}>
      <Navbar />
      <main
        className={`max-h-full min-h-screen font-extralight bg-gradient-to-r  relative ${
          pathname == "/auth/login" ||
          pathname === "/auth/register" ||
          pathname === "/"
            ? "bg-white"
            : "from-[#5655B9] to-[#3629B7]"
        }`}
      >
        {children}
      </main>

      {pathname === "/auth/login" ||
      pathname === "/auth/register" ||
      pathname === "/" ? null : (
        <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-lg z-50">
          <div className="max-w-screen-lg mx-auto flex justify-center gap-14 p-4 sm:p-6">
            {iconItems.map(({ icon: Icon, label, action }, idx) => (
              <button
                key={idx}
                onClick={() => onClick(label, idx)}
                aria-label={label}
                className={`
              relative flex flex-col items-center justify-center
              text-white 
              p-3 rounded-xl cursor-pointer
              transition-all duration-300
              ${
                activeIndex === idx
                  ? "bg-slate-500 text-indigo-700 shadow-xl scale-110"
                  : "hover:bg-white hover:text-indigo-700"
              }
            `}
              >
                <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                <span
                  className="absolute -top-7 whitespace-nowrap
                bg-indigo-900 bg-opacity-80 text-white text-xs rounded px-2 py-1
                opacity-0 pointer-events-none transition-opacity duration-300
                group-hover:opacity-100
              "
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </footer>
      )}
    </Provider>
  );
};

export default RouterLayouts;
