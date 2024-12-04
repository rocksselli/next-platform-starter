"use client";

import React, { useState } from "react";

export default function ChatPage() {
    const [message, setMessage] = useState(""); // Input from user
    const [response, setResponse] = useState(""); // OpenAI response

    const sendMessage = async () => {
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            setResponse({ error: "Failed to fetch response from API" });
        }
    };

    return (
        <main className="flex flex-col items-center min-h-screen p-4">
            <section className="w-full max-w-lg flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-4">Chat with ChatGPT</h1>
                <textarea
                    className="border p-2 rounded text-black mb-4 w-full"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={sendMessage}
                >
                    Send
                </button>
                <div className="mt-4">
                    <h2 className="font-bold">Response:</h2>
                    <div className="p-2 bg-gray-100 border rounded">
                        {response?.choices?.[0]?.message?.content || "No response yet."}
                    </div>
                </div>
            </section>
        </main>
    );
}
