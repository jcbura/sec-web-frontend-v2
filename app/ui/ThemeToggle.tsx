"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className="flex flex-col justify-center items-center text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150">
        <MdLightMode className="hidden dark:flex w-[18px] h-[18px]" />
        <MdDarkMode className="dark:hidden w-[18px] h-[18px]" />
      </div>
    );

  if (resolvedTheme === "dark") {
    return (
      <button
        onClick={() => setTheme("light")}
        className="flex flex-col justify-center items-center text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150"
      >
        <MdLightMode className="w-[18px] h-[18px]" />
      </button>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <button
        onClick={() => setTheme("dark")}
        className="flex flex-col justify-center items-center text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150"
      >
        <MdDarkMode className="w-[18px] h-[18px]" />
      </button>
    );
  }
};

export default ThemeToggle;
