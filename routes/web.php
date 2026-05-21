<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/compare', function () {
    return view('compare');
});

Route::get('/beautify', function () {
    return view('beautify');
});
