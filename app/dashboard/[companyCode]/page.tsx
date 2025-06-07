
"use client";

import { decodeJWT } from "@/lib/decodeJwt";

export default function Dashboard() {
  const user = decodeJWT();
  return (
    <section className="w-full h-auto flex lg:flex-row">
      <div className="w-full max-w-[90%] mx-auto flex flex-col py-8 gap-8">
        <div className="w-full grid lg:grid-cols-2 gap-6 lg:gap-8">
          <div className="w-full border-2 bg-white border-gray-300 hover:shadow-sm duration-300 ease-in p-4 rounded-xl cursor-pointer flex flex-col space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <h1 className="font-bold text-[22px] font-prim">
                  Available Balance
                </h1>
                <span className="text-[14px] text-gray-500 font-sec">
                  Last 7 days
                </span>
              </div>
              <div>
                <button className="cursor-pointer underline underline-offset-4 font-sec">
                  View Reports
                </button>
              </div>
            </div>
            <div className="w-full">
              <p className="text-[16px] font-bold font-prim">Active: 567</p>
            </div>
            <div className="h-40 border-l-2 border-b-2 border-gray-200"></div>
          </div>
          <div className="w-full border-2 bg-white border-gray-300 hover:shadow-sm duration-300 ease-in p-4 rounded-xl cursor-pointer flex flex-col space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <h1 className="font-bold text-[22px] font-prim">
                  Available Debtors
                </h1>
                <span className="text-[14px] text-gray-500 font-sec">
                  Last 7 days
                </span>
              </div>
              <div>
                <button className="cursor-pointer underline underline-offset-4 font-sec">
                  View Reports
                </button>
              </div>
            </div>
            <div className="w-full">
              <p className="text-[16px] font-bold font-prim">Active: 67</p>
            </div>
            <div className="h-40 border-l-2 border-b-2 border-gray-200"></div>
          </div>
          <div className="w-full border-2 bg-white  border-gray-300 hover:shadow-sm duration-300 ease-in p-4 rounded-xl cursor-pointer flex flex-col space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <h1 className="font-bold text-[22px] font-prim">
                  Available warehouses
                </h1>
                <span className="text-[14px] text-gray-500 font-sec">
                  Last 7 days
                </span>
              </div>
              <div>
                <button className="cursor-pointer underline underline-offset-4 font-sec">
                  View warehouses
                </button>
              </div>
            </div>
            <div className="w-full">
              <p className="text-[16px] font-bold font-prim">Active: 567</p>
            </div>
            <div className="h-40 border-l-2 border-b-2 border-gray-200"></div>
          </div>
          <div className="w-full border-2 bg-white  border-gray-300 hover:shadow-sm duration-300 ease-in p-4 rounded-xl cursor-pointer flex flex-col space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex flex-col space-y-2">
                <h1 className="font-bold text-[22px] font-prim">
                  Shifts taken
                </h1>
                <span className="text-[14px] text-gray-500 font-sec">
                  Last 7 days
                </span>
              </div>
              <div>
                <button className="cursor-pointer underline underline-offset-4 font-sec">
                  View shifts
                </button>
              </div>
            </div>
            <div className="w-full">
              <p className="text-[16px] font-bold font-prim">Active: 567</p>
            </div>
            <div className="h-40 border-l-2 border-b-2 border-gray-200"></div>
          </div>
        </div>
        <div className="p-8 w-full h-40 border-2 border-gray-300 rounded-xl bg-white">
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-2">
              <h1 className="font-bold text-[22px] font-prim">Cash flow</h1>
              <span className="text-[14px] text-gray-500 font-sec">
                Last 7 days
              </span>
            </div>
            <div>
              <button className="cursor-pointer underline underline-offset-4 font-sec">
                Download summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const ShiftCards = ({}) => {
  return (
    <section>
      <div></div>
    </section>
  );
};

const DebtCards = ({}) => {
  return (
    <section>
      <div></div>
    </section>
  );
};

const PaymentCards = ({}) => {
  return (
    <section>
      <div></div>
    </section>
  );
};

const LoggedCards = ({}) => {
  return (
    <section>
      <div></div>
    </section>
  );
};

const CashflowCards = ({}) => {
  return (
    <section>
      <div></div>
    </section>
  );
};
