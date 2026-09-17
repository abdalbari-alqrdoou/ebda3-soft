export default async (req) => {
    const headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
    };

    // CORS preflight
    if (req.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers
        });
    }

    if (req.method !== "POST") {
        return Response.json(
            { error: "Method Not Allowed" },
            { status: 405, headers }
        );
    }

    try {
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return Response.json(
                {
                    error: "OPENROUTER_API_KEY غير موجود في Netlify Environment Variables"
                },
                { status: 500, headers }
            );
        }

        const body = await req.json();

        if (!body || !Array.isArray(body.messages)) {
            return Response.json(
                {
                    error: "الطلب يجب أن يحتوي على messages"
                },
                { status: 400, headers }
            );
        }

        const openRouterResponse = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://ebda3-soft776724021.netlify.app/",
                   "X-Title": "Ebda3 Soft AI Assistant"
                },
                body: JSON.stringify({
                    model: body.model || "openrouter/free",
                    messages: body.messages
                })
            }
        );

        const result = await openRouterResponse.text();

        return new Response(result, {
            status: openRouterResponse.status,
            headers
        });

    } catch (error) {
        return Response.json(
            {
                error: "خطأ داخل Netlify Function",
                details: error.message
            },
            { status: 500, headers }
        );
    }
};