"use client";

import { decodeJWT } from "@/lib/decodeJwt";

export default function Dashboard() {
  const user = decodeJWT();
  return (
    <section className="w-full h-screen flex lg:flex-row">
      <main></main>
    </section>
  );
}

const cards = ({}) => {
  return (
    <section>
      <div></div>
    </section>
  );
};
