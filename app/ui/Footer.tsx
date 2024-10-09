import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full h-[65px] px-6 flex flex-row justify-center items-center bg-neutral-400">
      <div className="w-full max-w-[1200px] flex flex-row gap-3 justify-center items-center">
        <Link
          href="/"
          className="text-3xl text-white hover:text-blue-500 transition-colors duration-150 text-nowrap uppercase"
        >
          <span className="font-bold">SEC</span>hedules
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
