import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

import Logo from "../components/Logo";


function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");


  const handleRegister = (event) => {

    event.preventDefault();

    setError("");


    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }


    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }


    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }


    const normalizedEmail = email.trim().toLowerCase();


    // Get existing users
    const existingUsers =
      JSON.parse(localStorage.getItem("users")) || [];


    // Check if email already exists
    const userAlreadyExists = existingUsers.some(
      (user) => user.email === normalizedEmail
    );


    if (userAlreadyExists) {
      setError("An account with this email already exists.");
      return;
    }


    // Create new user
    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password,
    };


    // Save user
    localStorage.setItem(
      "users",
      JSON.stringify([
        ...existingUsers,
        newUser,
      ])
    );


    // Save currently logged-in user
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      })
    );


    // Go to home
    navigate("/home");

  };


  return (
    <div className="min-h-screen bg-[#0d0d0d] px-5 py-10 text-white">

      <div className="flex justify-center">
        <Logo />
      </div>


      <form
        onSubmit={handleRegister}
        className="mx-auto mt-8 w-full max-w-[480px] rounded-[26px] border border-zinc-800 bg-[#101010] p-8 sm:p-9"
      >

        <h1 className="text-3xl font-bold">
          Create account
        </h1>


        <p className="mt-2 text-base text-zinc-500">
          Join SkyMart and start shopping
        </p>


        {/* NAME */}

        <div className="relative mt-8">

          <User
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
          />

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Full name"
            className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#1d1d1d] pl-12 pr-4 text-white outline-none placeholder:text-zinc-600 focus:border-[#c8ff00]"
          />

        </div>


        {/* EMAIL */}

        <div className="relative mt-4">

          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
          />

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#1d1d1d] pl-12 pr-4 text-white outline-none placeholder:text-zinc-600 focus:border-[#c8ff00]"
          />

        </div>


        {/* PASSWORD */}

        <div className="relative mt-4">

          <LockKeyhole
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
          />

          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password (min 6 chars)"
            className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#1d1d1d] pl-12 pr-12 text-white outline-none placeholder:text-zinc-600 focus:border-[#c8ff00]"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>


        {/* CONFIRM PASSWORD */}

        <div className="relative mt-4">

          <LockKeyhole
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
          />

          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            placeholder="Confirm password"
            className="h-14 w-full rounded-2xl border border-zinc-700 bg-[#1d1d1d] pl-12 pr-12 text-white outline-none placeholder:text-zinc-600 focus:border-[#c8ff00]"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white"
          >
            {showConfirmPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>


        {/* ERROR */}

        {error && (
          <p className="mt-3 text-sm text-red-400">
            {error}
          </p>
        )}


        {/* CREATE ACCOUNT */}

        <button
          type="submit"
          className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#c8ff00] text-lg font-semibold text-black transition hover:bg-[#b8ef00] active:scale-[0.98]"
        >
          Create Account
          <ArrowRight size={21} />
        </button>


        <p className="mt-7 text-center text-sm text-zinc-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-[#c8ff00] hover:underline"
          >
            Sign in
          </Link>

        </p>

      </form>

    </div>
  );
}


export default Register;