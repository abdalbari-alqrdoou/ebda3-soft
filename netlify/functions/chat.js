exports.handler = async function (event) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                error: "Method Not Allowed"
            })
        };
    }

    try {
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            return {
                statusCode: 500,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error: "OPENROUTER_API_KEY غير موجود في Netlify Environment Variables"
                })
            };
        }

        const body = JSON.parse(event.body || "{}");

        if (!body.messages || !Array.isArray(body.messages)) {
            return {
                statusCode: 400,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error: "messages غير موجودة أو غير صحيحة"
                })
            };
        }

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://ebda3-soft776724021.netlify.app/",
                    "X-Title": "المساعد الذكي - إبداع سوفت"
                },
                body: JSON.stringify({
                    model: body.model || "openrouter/free",
                    messages: body.messages
                })
            }
        );

        const responseText = await response.text();

        return {
            statusCode: response.status,
            headers: {
                "Content-Type": "application/json"
            },
            body: responseText
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                error: "خطأ داخل Netlify Function",
                details: error.message
            })
        };
    }
};