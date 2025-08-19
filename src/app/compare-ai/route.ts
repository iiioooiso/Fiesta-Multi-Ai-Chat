import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch"; // Needed if running in Node.js

// Your frontend's "fake models"
const aiModels = [
    "chatgpt",
    "claude-sonnet-35",
    "claude-opus-41",
    "gemini-25-pro",
    "grok-4",
    "openai-o3",
];

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();
        if (!prompt) {
            return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
        }

        const requests = aiModels.map(async (modelId) => {
            const start = Date.now();
            try {
                // Groq API request
                const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: "meta-llama/llama-4-scout-17b-16e-instruct", // You can parametrize per model if needed
                        messages: [
                            {
                                role: "user",
                                content: prompt + " Give Unique Replpy not usual ones ",
                            },
                        ],
                        temperature: 0.7 + Math.random() * 0.5,
                    }),
                });

                const data = await res.json() as {
                    choices?: { message?: { content?: string } }[];
                };
                const response = data.choices?.[0]?.message?.content || "No response received";

                return {
                    modelId,
                    response,
                    responseTime: Date.now() - start,
                    error: false,
                };
            } catch (err) {
                console.error(`Error with model ${modelId}:`, err);
                return {
                    modelId,
                    response: "Error: Could not fetch response.",
                    responseTime: Date.now() - start,
                    error: true,
                };
            }
        });

        const results = await Promise.all(requests);

        // Transform results into frontend-friendly structure
        const responses: Record<string, { response: string; responseTime: number; error: boolean }> = {};
        results.forEach((r) => {
            responses[r.modelId] = {
                response: r.response,
                responseTime: r.responseTime,
                error: r.error,
            };
        });

        return NextResponse.json({ responses });
    } catch (error) {
        console.error("API /compare-ai error:", error);
        return NextResponse.json(
            { error: "Server error while comparing models" },
            { status: 500 }
        );
    }
}
