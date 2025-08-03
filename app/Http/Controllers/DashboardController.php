<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\Loan;
use App\Models\WeeklyIncome;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with financial summary.
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        
        // Get current week's data
        $startOfWeek = Carbon::now()->startOfWeek();
        $endOfWeek = Carbon::now()->endOfWeek();
        
        // Calculate weekly totals
        $weeklyIncome = WeeklyIncome::where('user_id', $userId)
            ->whereBetween('income_date', [$startOfWeek, $endOfWeek])
            ->sum('amount');
            
        $weeklyExpenses = Expense::where('user_id', $userId)
            ->whereBetween('expense_date', [$startOfWeek, $endOfWeek])
            ->sum('amount');
            
        $pendingLoans = Loan::where('user_id', $userId)
            ->where('status', 'pending')
            ->sum('amount');
            
        // Calculate remaining balance
        $remainingBalance = $weeklyIncome - $weeklyExpenses - $pendingLoans;
        
        // Recent transactions
        $recentExpenses = Expense::with(['category'])
            ->where('user_id', $userId)
            ->latest()
            ->take(5)
            ->get();
            
        $recentIncomes = WeeklyIncome::where('user_id', $userId)
            ->latest()
            ->take(5)
            ->get();
            
        $recentLoans = Loan::where('user_id', $userId)
            ->latest()
            ->take(5)
            ->get();
        
        return Inertia::render('dashboard', [
            'summary' => [
                'weeklyIncome' => $weeklyIncome,
                'weeklyExpenses' => $weeklyExpenses,
                'pendingLoans' => $pendingLoans,
                'remainingBalance' => $remainingBalance,
            ],
            'recentExpenses' => $recentExpenses,
            'recentIncomes' => $recentIncomes,
            'recentLoans' => $recentLoans,
        ]);
    }
}