import Link from "next/link";

const NotFound = () => {
  return (
    <main className="w-screen h-screen flex flex-col gap-3 justify-center items-center">
      <p className="text-2xl font-bold">404</p>
      <h2 className="text-6xl font-bold uppercase">page not found</h2>
      <p className="text-2xl">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        href="/"
        className="px-2 py-1 bg-sec-primary text-2xl text-sec-secondary font-bold uppercase rounded-md"
      >
        go back home
      </Link>
    </main>
  );
};

export default NotFound;
