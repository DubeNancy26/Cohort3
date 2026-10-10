import {
  ArrowRight,
  Heart,
  ShieldCheck,
  Star,
  Truck,
  Users,
  Zap
} from "lucide-react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

function About() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      <Navbar />

      <main className="mx-auto max-w-[900px] px-5 py-12">

        {/* ================= INTRO ================= */}

        <section className="text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#c8ff00]">
            <Zap
              size={25}
              className="fill-black text-black"
              strokeWidth={3}
            />
          </div>

          <h1 className="mt-6 text-4xl font-bold md:text-5xl">
            About{" "}
            <span className="text-[#c8ff00]">
              SkyMart
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-[650px] leading-7 text-zinc-500">
            SkyMart is a next-generation e-commerce platform built
            to make online shopping fast, fair, and enjoyable —
            for everyone.
          </p>

        </section>


        {/* ================= STATS ================= */}

        <section className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">

          <Stat
            icon={<Zap size={17} />}
            value="20K+"
            label="Products"
          />

          <Stat
            icon={<Users size={17} />}
            value="50K+"
            label="Happy Customers"
          />

          <Stat
            icon={<Star size={17} />}
            value="4.9"
            label="Avg. Rating"
          />

          <Stat
            icon={<Truck size={17} />}
            value="99%"
            label="On-time Delivery"
          />

        </section>


        {/* ================= OUR STORY ================= */}

        <section className="mt-11 rounded-[22px] border border-zinc-600 p-7 md:p-8">

          <h2 className="text-xl font-semibold">
            Our Story
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-zinc-500">

            <p>
              SkyMart started in 2022 as a small side project —
              two engineers tired of bloated, slow e-commerce
              experiences. We asked ourselves: what if shopping
              online was actually <i>enjoyable?</i>
            </p>

            <p>
              Three years later, SkyMart serves over 50,000
              customers across the country. We stock electronics,
              fashion, jewelry, and everyday essentials — all at
              prices that don't require a second mortgage.
            </p>

            <p>
              We're still the same team at heart: obsessed with
              speed, transparency, and making you feel good about
              every purchase you make here.
            </p>

          </div>

        </section>


        {/* ================= VALUES ================= */}

        <section className="mt-10">

          <h2 className="mb-6 text-center text-xl font-semibold">
            What We Stand For
          </h2>

          <div className="grid gap-3 md:grid-cols-2">

            <Value
              icon={<ShieldCheck size={19} />}
              title="Trust"
              description="Every product is verified for quality and authenticity before listing."
            />

            <Value
              icon={<Truck size={19} />}
              title="Speed"
              description="We obsess over delivery times so your orders arrive when promised."
            />

            <Value
              icon={<Heart size={19} />}
              title="Community"
              description="Built around real customer feedback, not just business metrics."
            />

            <Value
              icon={<Star size={19} />}
              title="Quality"
              description="We curate the best — no filler, no junk, just great products."
            />

          </div>

        </section>


        {/* ================= TEAM ================= */}

        <section className="mt-10">

          <h2 className="mb-6 text-center text-xl font-semibold">
            Meet the Team
          </h2>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

            <TeamMember
              letter="A"
              name="Aryan Shah"
              role="Founder & CEO"
              color="bg-[#c8ff00]"
            />

            <TeamMember
              letter="P"
              name="Priya Mehta"
              role="Head of Product"
              color="bg-blue-500"
            />

            <TeamMember
              letter="R"
              name="Rohan Verma"
              role="Lead Engineer"
              color="bg-purple-500"
            />

            <TeamMember
              letter="S"
              name="Sneha Kapoor"
              role="Design Director"
              color="bg-rose-500"
            />

          </div>

        </section>


        {/* ================= CTA ================= */}

        <section className="mt-9 rounded-[20px] border border-[#c8ff00]/20 bg-[#0f1108] px-6 py-8 text-center">

          <h2 className="text-xl font-semibold">
            Ready to shop?
          </h2>

          <p className="mt-3 text-sm text-zinc-500">
            Explore thousands of products at unbeatable prices.
          </p>

          <Link
            to="/products"
            className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-xl bg-[#c8ff00] px-6 py-3 font-semibold text-black transition hover:bg-[#b8ef00]"
          >
            Browse Products
            <ArrowRight size={17} />
          </Link>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="mt-16 border-t border-zinc-800 py-8 text-center">

        <div className="font-semibold text-[#c8ff00]">
          SkyMart
        </div>

        <p className="mt-2 text-xs text-zinc-600">
          © 2025 SkyMart · Built with React + Redux + TanStack Query
        </p>

      </footer>

    </div>
  );
}


/* ================= STAT ================= */

function Stat({ icon, value, label }) {
  return (
    <div className="rounded-2xl border border-zinc-600 p-5 text-center">

      <div className="flex justify-center text-[#c8ff00]">
        {icon}
      </div>

      <div className="mt-3 text-xl font-bold">
        {value}
      </div>

      <div className="mt-1 text-xs text-zinc-600">
        {label}
      </div>

    </div>
  );
}


/* ================= VALUE ================= */

function Value({ icon, title, description }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-zinc-600 p-5">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#c8ff00]/10 text-[#c8ff00]">
        {icon}
      </div>

      <div>

        <h3 className="font-semibold">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-zinc-500">
          {description}
        </p>

      </div>

    </div>
  );
}


/* ================= TEAM ================= */

function TeamMember({
  letter,
  name,
  role,
  color
}) {
  return (
    <div className="rounded-2xl border border-zinc-600 p-5 text-center">

      <div
        className={`mx-auto flex h-11 w-11 items-center justify-center rounded-xl ${color} font-bold text-black`}
      >
        {letter}
      </div>

      <h3 className="mt-4 text-sm font-semibold">
        {name}
      </h3>

      <p className="mt-1 text-xs text-zinc-600">
        {role}
      </p>

    </div>
  );
}

export default About;