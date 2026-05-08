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
            'error' => 'Cb lagi',
        ], 500);
    }
    return response()->json([
        'result' => $raw['choices'][0]['message']['content']
    ]);
});