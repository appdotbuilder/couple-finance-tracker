import React, { useState } from 'react';
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
    expense_category_id: number;
    description: string;
    amount: number;
    expense_date: string;
    category: Category;
}

interface Props {
    expense: Expense;
    categories: Category[];
    [key: string]: unknown;
}

export default function EditExpense({ expense, categories }: Props) {
    const [formData, setFormData] = useState({
        expense_category_id: expense.expense_category_id.toString(),
        description: expense.description,
        amount: expense.amount.toString(),
        expense_date: expense.expense_date,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.put(route('expenses.update', expense.id), formData, {
            onError: (errors) => {
                setErrors(errors);
                setProcessing(false);
            },
            onSuccess: () => {
                setProcessing(false);
            },
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">✏️ Edit Expense</h1>
                        <p className="text-muted-foreground">
                            Update the details of your expense
                        </p>
                    </div>
                    <Link href="/expenses">
                        <Button variant="outline">
                            ← Back to Expenses
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Expense Details</CardTitle>
                        <CardDescription>
                            Update the information about your expense
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Category */}
                            <div>
                                <label htmlFor="expense_category_id" className="block text-sm font-medium mb-2">
                                    Category *
                                </label>
                                <select
                                    id="expense_category_id"
                                    name="expense_category_id"
                                    value={formData.expense_category_id}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.expense_category_id && (
                                    <p className="text-sm text-destructive mt-1">{errors.expense_category_id}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium mb-2">
                                    Description *
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="e.g., Grocery shopping at Walmart"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    required
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive mt-1">{errors.description}</p>
                                )}
                            </div>

                            {/* Amount */}
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium mb-2">
                                    Amount *
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0.01"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    required
                                />
                                {errors.amount && (
                                    <p className="text-sm text-destructive mt-1">{errors.amount}</p>
                                )}
                            </div>

                            {/* Date */}
                            <div>
                                <label htmlFor="expense_date" className="block text-sm font-medium mb-2">
                                    Expense Date *
                                </label>
                                <input
                                    type="date"
                                    id="expense_date"
                                    name="expense_date"
                                    value={formData.expense_date}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    required
                                />
                                {errors.expense_date && (
                                    <p className="text-sm text-destructive mt-1">{errors.expense_date}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex space-x-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? '💾 Updating...' : '💾 Update Expense'}
                                </Button>
                                <Link href="/expenses">
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Current Category Info */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Current Category</CardTitle>
                        <CardDescription>
                            This expense is currently categorized as
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-3 p-3 rounded-lg border bg-muted">
                            <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: expense.category.color }}
                            />
                            <span className="font-medium">{expense.category.name}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}