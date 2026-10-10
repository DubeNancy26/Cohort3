import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import Logo from "../components/Logo";


function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");


  const handleLogin = (event) => {

    event.preventDefault();

    setError("");


    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }


    const normalizedEmail =
      email.trim().toLowerCase();


    // Get registered users
    const users =
      JSON.parse(localStorage.getItem("users")) || [];


    // Find user
    const user = users.find(
      (item) =>
        item.email === normalizedEmail &&
        item.password === password
    );


    // Invalid login
    if (!user) {
      setError(
        "Invalid email or password. Please register first."
      );
      return;
    }


    // Save logged-in user
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
      })
    );


    navigate("/home");

  };


  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">

      <div className="grid min-h-screen lg:grid-cols-2">


        {/* LEFT */}

        <section className="relative hidden overflow-hidden border-r border-zinc-700 lg:block">

          <div className="absolute left-[-150px] top-[250px] h-[450px] w-[450px] rounded-full bg-[#c8ff00]/10 blur-[120px]" />


          <div className="relative flex h-full flex-col px-12 py-12">

            <Logo />


            <div className="my-auto max-w-[650px]">

              <p className="mb-6 text-sm font-bold tracking-[2px] text-[#c8ff00]">
                WELCOME BACK
              </p>


              <h1 className="text-5xl font-bold leading-[1.1] xl:text-6xl">
                Shop the future.
                <br />

                <span className="text-[#c8ff00]">
                  Today.
                </span>
              </h1>


              <p className="mt-8 max-w-[560px] text-lg leading-8 text-zinc-500">
                Thousands of products, lightning-fast delivery,
                and prices that make your wallet happy.
              </p>


              <div className="mt-12 grid grid-cols-3 gap-4">

                <Stat number="20K+" label="Products" />
                <Stat number="50K+" label="Users" />
                <Stat number="4.9★" label="Rating" />

              </div>

            </div>

          </div>

        </section>


        {/* RIGHT */}

        <section className="flex min-h-screen items-center justify-center px-5 py-10">

          <form
            onSubmit={handleLogin}
            className="w-full max-w-[500px] rounded-[28px] border border-zinc-800 bg-[#101010] p-8 shadow-2xl sm:p-10"
          >

            <h2 className="text-3xl font-bold">
              Sign in
            </h2>

            <p className="mt-2 text-zinc-500">
              Enter your credentials to continue
            </p>


            {/* EMAIL */}

            <div className="relative mt-9">

              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
              />

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Email address"
                className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#1d1d1d] pl-12 pr-4 text-white outline-none placeholder:text-zinc-600 focus:border-[#c8ff00]"
              />

            </div>


            {/* PASSWORD */}

            <div className="relative mt-4">

              <LockKeyhole
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Password"
                className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#1d1d1d] pl-12 pr-12 text-white outline-none placeholder:text-zinc-600 focus:border-[#c8ff00]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

            </div>


            {/* ERROR */}

            {error && (
              <p className="mt-3 text-sm text-red-400">
                {error}
              </p>
            )}


            {/* LOGIN */}

            <button
              type="submit"
              className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#c8ff00] text-lg font-bold text-black transition hover:bg-[#b8ef00] active:scale-[0.98]"
            >
              Sign in
              <ArrowRight size={21} />
            </button>


            {/* REGISTER */}

            <p className="mt-7 text-center text-sm text-zinc-600">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-[#c8ff00] hover:underline"
              >
                Create one
              </Link>

            </p>

          </form>

        </section>

      </div>

    </div>
  );
}


function Stat({ number, label }) {

  return (
    <div className="rounded-2xl border border-zinc-600 px-5 py-6 text-center">

      <div className="text-2xl font-bold text-[#c8ff00]">
        {number}
      </div>

      <div className="mt-2 text-sm text-zinc-500">
        {label}
      </div>

    </div>
  );
}


export default Login;