import Link from "next/link";

export default function SignupComponent() {
  return (
    <section className="w-full h-auto lg:h-auto flex flex-col items-center justify-center ">
      <div className="w-full lg:h-auto flex flex-col md:flex-row lg:flex-row-reverse gap-4">
        <div
          className="relative w-full h-[50vh] lg:h-auto bg-cover bg-center flex flex-col items-center justify-center "
          style={{ backgroundImage: "url('/signup.jpg')" }}
        >
          <div className="w-full h-auto lg:h-[100%]  absolute bg-black/60 hover:bg-black/30 duration-300 ease-in"></div>
          <div className="h-full w-full max-w-[90%] lg:max-w-[90%] items-center justify-center flex flex-col space-y-4 z-40">
            <h1 className="text-[32px] lg:text-[56px] text-center text-white font-bold">
              Get Informations from{" "}
              <span className="text-red-500">Prime Mattress</span>{" "}
              <span className="text-blue-500">Shift</span>
            </h1>
            <p className="text-white text-[18px] md:text-[20px] font-medium">
              Trust · Explore · get analytics
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center pb-14 lg:pb-0">
          <div className="w-full text-center py-12">
            <h1 className="text-[20px] md:text-[24px] lg:text-[32px] font-bold">
              Signup for more at{" "}
              <span className="text-red-600">Prime Mattress</span>👋
            </h1>
          </div>
          <form action="post " className="max-w-[80%] mx-auto w-full space-y-4">
            <div className="w-full  space-y-4">
              <div className="flex flex-row gap-8">
                <div className="w-full flex flex-col space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-[16px] md:text-[20px] font-semibold"
                  >
                    First name
                  </label>
                  <input
                    type="firstName"
                    name="text"
                    id="f-name"
                    placeholder="John"
                    className="border-2 'border-black focus:border-green-400 p-4 rounded-md"
                  />
                </div>
                <div className="w-full flex flex-col space-y-2">
                  <label
                    htmlFor="secondName"
                    className="text-[16px] md:text-[20px] font-semibold"
                  >
                    Second name
                  </label>
                  <input
                    type="secondName"
                    name="text"
                    id="fname"
                    placeholder="Doe"
                    className="border-2 'border-black focus:border-green-400 p-4 rounded-md"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col space-y-2">
                <label
                  htmlFor="Email"
                  className="text-[16px] md:text-[20px] font-semibold"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="john.doe@kilmawave.net"
                  className="border-2 'border-black focus:border-green-400 p-4 rounded-md"
                />
              </div>
            </div>
            <div className="w-full flex flex-row gap-4">
              <div className="w-full flex flex-col space-y-2">
                <label
                  htmlFor="password"
                  className="text-[16px] md:text-[20px] font-semibold"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Mumbai str-05"
                  className="border-2 'border-black focus:border-green-400 p-4 rounded-md"
                />
              </div>
              <div className="w-full flex flex-col space-y-2">
                <label
                  htmlFor="organisation"
                  className="text-[16px] md:text-[20px] font-semibold"
                >
                  Organisation
                </label>
                <input
                  type="text"
                  name="organisation"
                  id="organisation"
                  placeholder="Kilma-wave"
                  className="border-2 'border-black focus:border-green-400 p-4 rounded-md"
                />
              </div>
            </div>
            <div>
              <div className="w-full flex flex-col space-y-2">
                <label
                  htmlFor="password"
                  className="text-[16px] md:text-[20px] font-semibold"
                >
                  Enter Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className="border-2 'border-black focus:border-green-400 p-4 rounded-md"
                />
              </div>
              <div className="w-full flex flex-col space-y-2">
                <label
                  htmlFor="email"
                  className="text-[16px] md:text-[20px] font-semibold"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className="border-2 'border-black focus:border-green-400 p-4 rounded-md"
                />
              </div>
            </div>
            <div className="space-y-4 flex flex-col">
              <div className=" w-full flex flex-row items-start justify-between py-4 px-2">
                <span className="flex space-x-2">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="w-4 h-4 rounded-full"
                  />
                  <p className="text-[8px] md:text-[12px] lg:text-[14px] text-gray-800">
                    Remember me
                  </p>
                </span>
              </div>
              <div className="w-full">
                <div className="w-full">
                  <button className="cursor-pointer bg-black hover:bg-[#1e1e1e] duration-300 ease-in text-white rounded-md w-full px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 font-bold">
                    Signup
                  </button>
                  <span className="w-full text-[8px] lg:text-[12px] py-4 text-gray-600 text-center">
                    instant Signup Coming soon
                  </span>
                </div>
                <div className="w-full text-center mt-4">
                  <p className="text-[12px] lg:text-[14px]">
                    Have an account?
                    <Link
                      href={"/login"}
                      className="text-amber-600 underline underline-offset-4 px-2"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
