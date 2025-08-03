<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Loan>
 */
class LoanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'description' => fake()->sentence(),
            'amount' => fake()->randomFloat(2, 50, 1000),
            'loan_date' => fake()->date(),
            'status' => fake()->randomElement(['pending', 'paid', 'cancelled']),
            'notes' => fake()->optional()->paragraph(),
        ];
    }
}