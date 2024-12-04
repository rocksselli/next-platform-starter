"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // For navigation
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./utils/firebase"; // Adjust the path as necessary

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setMessage("Signup successful! You can now log in.");
        } catch (error) {
            setMessage(`Signup failed: ${error.message}`);
        }
    };

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setMessage("Login successful!");
            router.push("/chat"); // Redirect to chat page
        } catch (error) {
            setMessage(`Login failed: ${error.message}`);
        }
    };

    return (
        <main className="flex flex-col items-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-6">Login or Signup</h1>
            <div className="w-full max-w-md flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 rounded text-black"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 rounded text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleSignup}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Signup
                </button>
                <button
                    onClick={handleLogin}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Login
                </button>
            </div>
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </main>
    );
}
