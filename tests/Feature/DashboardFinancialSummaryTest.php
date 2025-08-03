<?php

namespace Tests\Feature;

use App\Models\Expense;
use App\Models\ExpenseCategory;
use App\Models\Loan;
use App\Models\User;
use App\Models\WeeklyIncome;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardFinancialSummaryTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_shows_financial_summary()
    {
        $user = User::factory()->create();
        $category = ExpenseCategory::factory()->create();

        // Create current week data
        $currentWeekStart = Carbon::now()->startOfWeek();
        $currentWeekEnd = Carbon::now()->endOfWeek();

        // Weekly income
        WeeklyIncome::factory()->create([
            'user_id' => $user->id,
            'amount' => 1000.00,
            'income_date' => $currentWeekStart->addDay(),
        ]);

        // Weekly expense
        Expense::factory()->create([
            'user_id' => $user->id,
            'expense_category_id' => $category->id,
            'amount' => 250.00,
            'expense_date' => $currentWeekStart->addDays(2),
        ]);

        // Pending loan
        Loan::factory()->create([
            'user_id' => $user->id,
            'amount' => 100.00,
            'status' => 'pending',
        ]);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('dashboard')
            ->has('summary')
            ->where('summary.weeklyIncome', 1000)
            ->where('summary.weeklyExpenses', 250)
            ->where('summary.pendingLoans', 100)
            ->where('summary.remainingBalance', 650) // 1000 - 250 - 100
        );
    }

    public function test_dashboard_shows_recent_transactions()
    {
        $user = User::factory()->create();
        $category = ExpenseCategory::factory()->create();

        // Create recent transactions
        $expense = Expense::factory()->create([
            'user_id' => $user->id,
            'expense_category_id' => $category->id,
        ]);

        $income = WeeklyIncome::factory()->create([
            'user_id' => $user->id,
        ]);

        $loan = Loan::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('dashboard')
            ->has('recentExpenses', 1)
            ->has('recentIncomes', 1)
            ->has('recentLoans', 1)
        );
    }
}