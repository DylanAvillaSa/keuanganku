"use client";

import React from "react";
import Image from "next/image";

import { IconRightArrow } from "@/components/icon/TableIcon";
import { useRouter } from "next/navigation";

const IntroductionPage = () => {
  const router = useRouter();
  return (
    <section className="flex flex-col justify-between min-h-screen items-center p-5">
      <header>
        <Image
          src="/bg/background.jpg"
          width={820}
          height={520}
          alt="bg"
          className="object-cover rounded-xl"
        />
      </header>

      <article className="flex flex-col gap-5 justify-center items-center">
        <h1 className="font-bold text-2xl w-[15rem] text-center">
          Money Management & To Do List
        </h1>
        <p className="leading-5 text-center">
          This productive tool is designed to help you better manage your money
          and project-wise conveniently
        </p>
      </article>

      <button
        className="font-semibold bg-blue-500 text-white rounded-md p-2 w-full relative"
        onClick={() => router.push("/auth/login")}
      >
        <span>Let's Start</span>
        <div className="absolute top-2 right-4">
          <IconRightArrow />
        </div>
      </button>
    </section>
  );
};

export default IntroductionPage;
