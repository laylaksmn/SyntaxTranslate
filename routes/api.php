<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::post('/translate', function (Request $request) {
    $source = $request->source_code_lang;
    $target = $request->selected_lang;
    $sourceCode = $request->input('code');
    $prompt = "You are an expert programmer in PHP and Phyton language. 
    Return plain text only.
    - Do NOT add explanations
    - Do NOT add any extra text before or after the code
    - Do NOT modify logic unless required for translation
    - Only keep comments if they exist in the original code
    Translate this {$source} code to {$target}.
    Code: {$sourceCode}";

    $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . env('API_KEY'),
        'Content-Type' => 'application/json',
    ])->post('https://api.groq.com/openai/v1/chat/completions', [
        'model' => 'llama-3.3-70b-versatile',
        'messages' => [
            [
                'role' => 'system',
                'content' => 'You are a code translator.'
            ],
            [
                'role' => 'user',
                'content' => $prompt
            ]
        ]
    ]);
    
    $raw = $response->json();
    if (!isset($raw['choices'][0]['message']['content'])) {
        return response()->json([
            'error' => 'Please try again later',
        ], 500);
    }
    return response()->json([
        'result' => $raw['choices'][0]['message']['content']
    ]);
});

Route::post('/beautify', function (Request $request) {
    $lang = $request->input('lang', 'php');
    $code = $request->input('code');

    $langLabel = strtoupper($lang);

    $prompt = "You are an expert {$langLabel} code formatter.
Return plain text only — the beautified code, nothing else.
- Do NOT add explanations or comments
- Do NOT wrap the code in markdown code blocks
- Fix indentation, spacing, and formatting
- Keep the logic exactly the same, only improve readability
- Follow {$langLabel} best practices for formatting

Beautify this {$langLabel} code:
{$code}";

    $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . env('API_KEY'),
        'Content-Type' => 'application/json',
    ])->post('https://api.groq.com/openai/v1/chat/completions', [
        'model' => 'llama-3.3-70b-versatile',
        'messages' => [
            [
                'role' => 'system',
                'content' => 'You are a code formatter. Return only clean, formatted code with no explanations.'
            ],
            [
                'role' => 'user',
                'content' => $prompt
            ]
        ]
    ]);

    $raw = $response->json();
    if (!isset($raw['choices'][0]['message']['content'])) {
        return response()->json([
            'error' => 'Please try again later',
        ], 500);
    }
    return response()->json([
        'result' => $raw['choices'][0]['message']['content']
    ]);
});