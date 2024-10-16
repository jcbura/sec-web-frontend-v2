"use client";

import Link from "next/link";

const Error = () => {
  return (
    <main className="bg-white dark:bg-neutral-800 text-black dark:text-white w-screen h-screen flex flex-col gap-3 justify-center items-center">
      <p className="text-2xl font-bold">404</p>
      <h2 className="text-6xl font-bold uppercase">page not found</h2>
      <p className="text-2xl">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        href="/"
        className="px-2 py-1 dark:bg-white bg-sec-primary text-2xl dark:text-sec-primary text-sec-secondary font-bold uppercase rounded-md"
      >
        go back home
      </Link>
    </main>
  );
};

export default Error;
