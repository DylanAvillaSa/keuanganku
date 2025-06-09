"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { login_user } from "@/helper/users";
import { useRouter } from "next/navigation";
import { IconLock, IconUser } from "@/components/icon/TableIcon";

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [formInput, setFormInput] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login_user(formInput.email, formInput.password);
      if (user.message) {
        setErrMessage(user.message);
        return false;
      }

      router.push("/dashboard");
    } catch (err) {
      return false;
    } finally {
      setFormInput({ email: "", password: "" });
    }
  };

  return (
    <section className="flex min-h-screen w-full justify-start items-center flex-col">
      <header>
        <Image
          src="/icon/icon-login.jpg"
          width={500}
          height={500}
          alt="icon login"
        />
      </header>

      <form
        className="flex flex-col w-full justify-center items-center gap-5 px-5"
        onSubmit={handleSubmit}
      >
        <header className="text-slate-600 flex items-center justify-center flex-col">
          <h2 className="text-xl font-semibold">Authenticator</h2>
          <p className="text-xs text-center">
            Protect your account in just a few minutes by reviewing your
            security settings and activity
          </p>
        </header>

        {errMessage && (
          <p className="text-rose-500 text-center">
            {errMessage.replace("Firebase:", "")}
          </p>
        )}

        <label className="w-full relative">
          <div className="absolute top-2 left-1 text-blue-400">
            <IconUser />
          </div>
          <input
            type="email"
            placeholder="Email address"
            className="py-2 px-8 rounded-md border border-slate-100 w-full"
            name="email"
            value={formInput.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="w-full relative">
          <div className="absolute top-2 left-1 text-blue-400">
            <IconLock />
          </div>
          <input
            type="password"
            placeholder="Password"
            className="py-2 px-8 rounded-md border border-slate-100 w-full"
            name="password"
            value={formInput.password}
            onChange={handleChange}
            required
          />
        </label>

        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-400 duration-300 text-white rounded-md p-2 w-full font-semibold ${
            loading && "opacity-35"
          }`}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <div className="text-sm">
          <span>Don't have an account ? </span>
          <Link href="/auth/register" className="text-blue-500">
            Register
          </Link>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
