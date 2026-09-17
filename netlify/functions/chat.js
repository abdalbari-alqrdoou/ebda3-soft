exports.handler = async function (event) {
    const jsonHeaders = {
        "Content-Type": "application/json; charset=utf-8"
    };

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: jsonHeaders,
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
                headers: jsonHeaders,
                body: JSON.stringify({
                    error: "OPENROUTER_API_KEY غير موجود في Netlify"
                })
            };
        }

        let rawBody = event.body || "";

        if (event.isBase64Encoded) {
            rawBody = Buffer.from(rawBody, "base64").toString("utf8");
        }

        rawBody = rawBody.trim();

        let body;

        try {
            body = JSON.parse(rawBody);
        } catch (parseError) {
            return {
                statusCode: 400,
                headers: jsonHeaders,
                body: JSON.stringify({
                    error: "الطلب المرسل ليس JSON صالحًا",
                    receivedLength: rawBody.length,
                    receivedStart: rawBody.substring(0, 100),
                    parseError: parseError.message
                })
            };
        }

        if (!Array.isArray(body.messages)) {
            return {
                statusCode: 400,
                headers: jsonHeaders,
                body: JSON.stringify({
                    error: "messages غير موجودة أو ليست Array"
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
            headers: jsonHeaders,
            body: responseText
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: jsonHeaders,
            body: JSON.stringify({
                error: "خطأ داخل Netlify Function",
                details: error.message
            })
        };
    }
};