"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/configuration";
import Image from "next/image";
import { setUserProfiles } from "@/redux/features/userSlice/userSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getUserProfile = async () => {
      if (!token) router.push("/auth/login");
      onAuthStateChanged(auth, (user) => {
        dispatch(
          setUserProfiles({
            username: user?.displayName,
            img: user?.photoURL,
            phone: user?.phoneNumber,
            email: user?.email,
          })
        );
        setUserProfile({
          username: user?.displayName,
          img: user?.photoURL,
          phone: user?.phoneNumber,
          email: user?.email,
        });
      });
    };
    getUserProfile();
  }, []);

  if (
    pathname === "/auth/login" ||
    pathname === "/auth/register" ||
    pathname === "/"
  ) {
    return null;
  }

  return (
    <nav className="text-white font-medium fixed top-0 left-0 right-0 p-4 z-50">
      <div className="max-w-screen-lg mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image
            src="/icon/Avatar2.png"
            width={45}
            height={45}
            alt="profile"
            className="rounded-full object-cover"
          />
          <span className="text-sm sm:text-base">
            Hi, {userProfile?.username}
          </span>
        </div>
        <div className="relative">
          <Image src="/icon/bell.png" width={26} height={26} alt="bell" />
          <div className="absolute top-0 right-0 w-[16px] h-[16px] text-[10px] bg-rose-500 rounded-full flex items-center justify-center text-white">
            0
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
