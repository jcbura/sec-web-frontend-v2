import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full h-[65px] px-6 flex flex-row justify-center items-center bg-neutral-350 dark:bg-neutral-700">
      <div className="w-full max-w-[1200px] flex flex-row gap-3 justify-center items-center">
        <Link
          href="/"
          className="text-3xl text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-150 uppercase"
        >
          <span className="font-bold">SEC</span>hedules
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
