<?php

namespace Database\Seeders;

use App\Models\ExpenseCategory;
use Illuminate\Database\Seeder;

class ExpenseCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Food & Groceries',
                'color' => '#10B981',
                'description' => 'Supermarket, restaurants, and food delivery expenses',
            ],
            [
                'name' => 'Transportation',
                'color' => '#3B82F6',
                'description' => 'Gas, public transport, taxi, and vehicle maintenance',
            ],
            [
                'name' => 'Utilities',
                'color' => '#F59E0B',
                'description' => 'Electricity, water, gas, internet, and phone bills',
            ],
            [
                'name' => 'Entertainment',
                'color' => '#8B5CF6',
                'description' => 'Movies, games, subscriptions, and leisure activities',
            ],
            [
                'name' => 'Healthcare',
                'color' => '#EF4444',
                'description' => 'Medical expenses, pharmacy, and health insurance',
            ],
            [
                'name' => 'Household',
                'color' => '#06B6D4',
                'description' => 'Cleaning supplies, furniture, and home maintenance',
            ],
            [
                'name' => 'Personal Care',
                'color' => '#EC4899',
                'description' => 'Cosmetics, haircuts, and personal hygiene products',
            ],
            [
                'name' => 'Miscellaneous',
                'color' => '#6B7280',
                'description' => 'Other expenses that don\'t fit in specific categories',
            ],
        ];

        foreach ($categories as $category) {
            ExpenseCategory::create($category);
        }
    }
}