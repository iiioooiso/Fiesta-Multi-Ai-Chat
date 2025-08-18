import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

// Initialize OpenAI client via OpenRouter
const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

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

        // Fire parallel requests to OpenRouter (all use the new model)
        const requests = aiModels.map(async (modelId) => {
            const start = Date.now();
            try {
                const completion = await openai.chat.completions.create({
                    model: "deepseek/deepseek-r1:free",
                    messages: [{ role: "user", content: prompt }],
                    temperature: 0.7 + Math.random() * 0.5, // slight variation per "model"
                });

                const response = completion.choices?.[0]?.message?.content || "No response received";

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
