import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Category {
    id: number;
    name: string;
    color: string;
}

interface Expense {
    id: number;
    description: string;
    amount: number;
    expense_date: string;
    created_at: string;
    category: Category;
}

interface Props {
    expenses: {
        data: Expense[];
        links: Array<Record<string, unknown>>;
        meta: Record<string, unknown>;
    };
    [key: string]: unknown;
}

export default function ExpensesIndex({ expenses }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const handleDelete = (expense: Expense) => {
        if (confirm(`Are you sure you want to delete "${expense.description}"?`)) {
            router.delete(route('expenses.destroy', expense.id));
        }
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">💸 Expenses</h1>
                        <p className="text-muted-foreground">
                            Track and manage your expenses
                        </p>
                    </div>
                    <Link href="/expenses/create">
                        <Button>
                            ➕ Add Expense
                        </Button>
                    </Link>
                </div>

                {/* Expenses Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Your Expenses</CardTitle>
                        <CardDescription>
                            All your recorded expenses with categories and amounts
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {expenses.data.length > 0 ? (
                            <div className="space-y-4">
                                {expenses.data.map((expense) => (
                                    <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div 
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: expense.category.color }}
                                            />
                                            <div>
                                                <h3 className="font-medium">{expense.description}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {expense.category.name} • {formatDate(expense.expense_date)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <div className="font-bold text-red-600">
                                                    -{formatCurrency(expense.amount)}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {formatDate(expense.created_at)}
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Link href={route('expenses.edit', expense.id)}>
                                                    <Button variant="outline" size="sm">
                                                        ✏️ Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(expense)}
                                                >
                                                    🗑️ Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">📝</div>
                                <h3 className="text-lg font-medium mb-2">No expenses yet</h3>
                                <p className="text-muted-foreground mb-4">
                                    Start tracking your expenses to get a better overview of your finances.
                                </p>
                                <Link href="/expenses/create">
                                    <Button>
                                        ➕ Add Your First Expense
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Stats */}
                {expenses.data.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">📊 Total Expenses</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-600">
                                    {formatCurrency(expenses.data.reduce((sum, expense) => sum + expense.amount, 0))}
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">🏷️ Categories Used</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {new Set(expenses.data.map(expense => expense.category.id)).size}
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">📈 Average Amount</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {formatCurrency(expenses.data.reduce((sum, expense) => sum + expense.amount, 0) / expenses.data.length)}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </AppShell>
    );
}