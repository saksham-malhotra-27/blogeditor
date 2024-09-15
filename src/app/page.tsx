'use client';
import { BackgroundLines } from "@/components/ui/bglines";
import React from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import localFont from "next/dist/compiled/@next/font/dist/local";
function Page() {
  const router = useRouter(); // Initialize the router
  const righteous =  ''
  

  return (
    <div>
      <BackgroundLines>
        <div className="flex flex-col items-center justify-center min-h-screen text-center py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-6xl font-bold text-neutral-900 dark:text-white mb-4">
              Welcome to <span className={`${righteous} text-red-500 `}>GoHard Blogs</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 mb-8">
              Dive into a collection of blogs where our team of tech enthusiasts
              explores the latest trends, tools, and innovations in various tech fields.
              Whether you're a beginner or a seasoned expert, you'll find
              insights and tips curated just for you.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => router.push('/blogs')} // Navigate to the /blogs page on click
                className="bg-red-500 z-[100] text-white px-6 py-3 rounded-full hover:bg-red-600 transition">
                Explore Blogs
              </button>
            </div>
          </div>
        </div>
      </BackgroundLines>
    </div>
  );
}

export default Page;
