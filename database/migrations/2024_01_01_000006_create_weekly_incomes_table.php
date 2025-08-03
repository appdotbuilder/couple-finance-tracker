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
        Schema::create('weekly_incomes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 10, 2)->comment('Amount of the weekly income');
            $table->date('income_date')->comment('Date when the income was received');
            $table->string('source')->nullable()->comment('Source of the income');
            $table->text('notes')->nullable()->comment('Additional notes about the income');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['user_id', 'income_date']);
            $table->index('income_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weekly_incomes');
    }
};