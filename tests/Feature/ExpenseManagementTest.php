<?php

namespace Tests\Feature;

use App\Models\Expense;
use App\Models\ExpenseCategory;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExpenseManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_view_expenses()
    {
        $user = User::factory()->create();
        $category = ExpenseCategory::factory()->create();
        $expense = Expense::factory()->create([
            'user_id' => $user->id,
            'expense_category_id' => $category->id,
        ]);

        $response = $this->actingAs($user)->get('/expenses');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('expenses/index')
            ->has('expenses.data', 1)
        );
    }

    public function test_user_can_create_expense()
    {
        $user = User::factory()->create();
        $category = ExpenseCategory::factory()->create();

        $expenseData = [
            'expense_category_id' => $category->id,
            'description' => 'Test expense',
            'amount' => 50.00,
            'expense_date' => '2024-01-15',
        ];

        $response = $this->actingAs($user)->post('/expenses', $expenseData);

        $response->assertRedirect('/expenses');
        $this->assertDatabaseHas('expenses', [
            'user_id' => $user->id,
            'description' => 'Test expense',
            'amount' => 50.00,
        ]);
    }

    public function test_user_can_update_expense()
    {
        $user = User::factory()->create();
        $category = ExpenseCategory::factory()->create();
        $expense = Expense::factory()->create([
            'user_id' => $user->id,
            'expense_category_id' => $category->id,
        ]);

        $updateData = [
            'expense_category_id' => $category->id,
            'description' => 'Updated expense',
            'amount' => 75.00,
            'expense_date' => '2024-01-15',
        ];

        $response = $this->actingAs($user)->put("/expenses/{$expense->id}", $updateData);

        $response->assertRedirect('/expenses');
        $this->assertDatabaseHas('expenses', [
            'id' => $expense->id,
            'description' => 'Updated expense',
            'amount' => 75.00,
        ]);
    }

    public function test_user_can_delete_expense()
    {
        $user = User::factory()->create();
        $category = ExpenseCategory::factory()->create();
        $expense = Expense::factory()->create([
            'user_id' => $user->id,
            'expense_category_id' => $category->id,
        ]);

        $response = $this->actingAs($user)->delete("/expenses/{$expense->id}");

        $response->assertRedirect('/expenses');
        $this->assertDatabaseMissing('expenses', ['id' => $expense->id]);
    }
}