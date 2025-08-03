<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('expense_category_id')->constrained()->onDelete('cascade');
            $table->string('description')->comment('Description of the expense');
            $table->decimal('amount', 10, 2)->comment('Amount of the expense');
            $table->date('expense_date')->comment('Date when the expense occurred');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['user_id', 'expense_date']);
            $table->index('expense_category_id');
            $table->index('expense_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};