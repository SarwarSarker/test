import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full text-center">
      <h3 className="text-xl text-white font-semibold">Page not found</h3>
      <Link
        href="/"
        className="py-2 px-5 bg-transparent border-2 border-white text-white hover:text-white hover:bg-violet-600 hover:border-violet-600 rounded mt-5 "
        prefetch={false}
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
