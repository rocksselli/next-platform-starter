"use client";

import React, { useState } from "react";

export default function Page() {
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
            {/* Chat Section */}
            <section className="w-full max-w-lg flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-4">Chat with OpenAI</h1>
                <textarea
                    className="chat-input mb-4"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button
                    className="chat-button"
                    onClick={sendMessage}
                >
                    Send
                </button>
                <div className="mt-4">
                    <h2 className="font-bold">Response:</h2>
                    <div className="chat-response">
                        {response?.choices?.[0]?.message?.content || "No response yet."}
                    </div>
                </div>
            </section>
        </main>
    );
}
