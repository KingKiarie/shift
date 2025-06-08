import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-600 via-red-500 to-white text-white">
      <div className="text-center px-4">
        <h1 className="text-[34px] md:text-[42px] lg:text-[60px] uppercase font-bold mb-4 drop-shadow-lg">
          Customer Business Relationship
        </h1>
        <p className="text-[16px] md:text-[16px] lg:text-[18px] mb-8 drop-shadow">
          Your journey starts here · Get Realtime Updates · Generate shift
          reports
        </p>
        <Link href="/login">
          <button className="md:px-6 md:py-3 px-4 py-2 lg:px-8 lg:py-4 bg-white text-blue-700 font-bold rounded-full shadow-md hover:bg-blue-100 transition-all duration-300 ease-in-out cursor-pointer">
            Login to get started
          </button>
        </Link>
      </div>
    </section>
  );
}
