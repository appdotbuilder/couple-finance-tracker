<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWeeklyIncomeRequest;
use App\Http\Requests\UpdateWeeklyIncomeRequest;
use App\Models\WeeklyIncome;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WeeklyIncomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $incomes = WeeklyIncome::with('user')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->paginate(10);
        
        return Inertia::render('weekly-incomes/index', [
            'incomes' => $incomes
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('weekly-incomes/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWeeklyIncomeRequest $request)
    {
        $income = WeeklyIncome::create([
            'user_id' => $request->user()->id,
            ...$request->validated()
        ]);

        return redirect()->route('weekly-incomes.index')
            ->with('success', 'Weekly income created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(WeeklyIncome $weeklyIncome)
    {
        $weeklyIncome->load('user');
        
        return Inertia::render('weekly-incomes/show', [
            'income' => $weeklyIncome
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(WeeklyIncome $weeklyIncome)
    {
        return Inertia::render('weekly-incomes/edit', [
            'income' => $weeklyIncome
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWeeklyIncomeRequest $request, WeeklyIncome $weeklyIncome)
    {
        $weeklyIncome->update($request->validated());

        return redirect()->route('weekly-incomes.index')
            ->with('success', 'Weekly income updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(WeeklyIncome $weeklyIncome)
    {
        $weeklyIncome->delete();

        return redirect()->route('weekly-incomes.index')
            ->with('success', 'Weekly income deleted successfully.');
    }
}