<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>SyntaxTranslate</title>
        <link rel="shortcut icon" href="{{ asset('favicon.png') }}">

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/beautify.jsx'])
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>