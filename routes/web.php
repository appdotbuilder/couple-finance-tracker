<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExpenseCategoryController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\WeeklyIncomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Financial management routes
    Route::resource('expenses', ExpenseController::class);
    Route::resource('loans', LoanController::class);
    Route::resource('weekly-incomes', WeeklyIncomeController::class);
    Route::resource('expense-categories', ExpenseCategoryController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
