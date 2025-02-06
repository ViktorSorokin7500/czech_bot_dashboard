"use client";

import React, { FormEvent } from "react";

export default function LoginPage() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const login = (form.elements.namedItem("login") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });

    if (res.ok) {
      const { token }: { token: string } = await res.json();
      document.cookie = `jwt_token=${token}; path=/;`;
      window.location.href = "/";
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-lg rounded-lg max-w-sm mx-auto"
      >
        {" "}
        <h2 className="text-3xl font-bold text-center text-backgroundSoft mb-6">
          Login
        </h2>{" "}
        <input
          name="login"
          type="text"
          placeholder="Login"
          required
          className="block w-full p-3 mb-4 border rounded-lg text-background focus:outline-none focus:ring-2 focus:ring-blue-500"
        />{" "}
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="block w-full p-3 mb-4 border rounded-lg text-background focus:outline-none focus:ring-2 focus:ring-blue-500"
        />{" "}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white p-3 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 transition-all duration-300"
        >
          {" "}
          Log in{" "}
        </button>
      </form>
    </div>
  );
}
