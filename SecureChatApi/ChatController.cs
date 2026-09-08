using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

namespace SecureChatApi.Controllers;

[ApiController]
[Route("api/chat")]
public class ChatController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly IHttpClientFactory _httpClientFactory;

    public ChatController(
        IConfiguration configuration,
        IHttpClientFactory httpClientFactory)
    {
        _configuration = configuration;
        _httpClientFactory = httpClientFactory;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] JsonElement requestBody)
    {
        var apiKey = _configuration["OpenRouterSettings:ApiKey"];

        if (string.IsNullOrWhiteSpace(apiKey))
        {
            return StatusCode(500, new
            {
                error = "OpenRouter API Key غير موجود في إعدادات الخادم."
            });
        }

        var client = _httpClientFactory.CreateClient();

        using var request = new HttpRequestMessage(
            HttpMethod.Post,
            "https://openrouter.ai/api/v1/chat/completions"
        );

        request.Headers.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue(
                "Bearer",
                apiKey
            );

        request.Headers.Add("HTTP-Referer", "http://localhost");
        request.Headers.Add("X-Title", "Ebda3 Soft Assistant");

        var json = requestBody.GetRawText();

        request.Content = new StringContent(
            json,
            Encoding.UTF8,
            "application/json"
        );

        var response = await client.SendAsync(request);
        var responseText = await response.Content.ReadAsStringAsync();

        return new ContentResult
        {
            StatusCode = (int)response.StatusCode,
            Content = responseText,
            ContentType = "application/json"
        };
    }
}