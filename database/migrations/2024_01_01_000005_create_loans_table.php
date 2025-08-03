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
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('description')->comment('Description of the loan');
            $table->decimal('amount', 10, 2)->comment('Amount of the loan');
            $table->date('loan_date')->comment('Date when the loan was made');
            $table->enum('status', ['pending', 'paid', 'cancelled'])->default('pending')->comment('Status of the loan');
            $table->text('notes')->nullable()->comment('Additional notes about the loan');
            $table->timestamps();
            
            // Indexes for performance
            $table->index(['user_id', 'status']);
            $table->index('loan_date');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};