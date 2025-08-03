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

interface Props {
    categories: Category[];
    [key: string]: unknown;
}

export default function CreateExpense({ categories }: Props) {
    const [formData, setFormData] = useState({
        expense_category_id: '',
        description: '',
        amount: '',
        expense_date: new Date().toISOString().split('T')[0],
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.post(route('expenses.store'), formData, {
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
                        <h1 className="text-3xl font-bold tracking-tight">➕ Add Expense</h1>
                        <p className="text-muted-foreground">
                            Record a new expense with category and details
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
                            Fill in the information about your expense
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
                                    {processing ? '💾 Saving...' : '💾 Save Expense'}
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

                {/* Category Preview */}
                {categories.length > 0 && (
                    <Card className="max-w-2xl">
                        <CardHeader>
                            <CardTitle>Available Categories</CardTitle>
                            <CardDescription>
                                Choose from these expense categories
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2 sm:grid-cols-2">
                                {categories.map((category) => (
                                    <div key={category.id} className="flex items-center space-x-3 p-2 rounded-lg border">
                                        <div 
                                            className="w-4 h-4 rounded-full"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <span className="text-sm font-medium">{category.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <Link href="/expense-categories">
                                    <Button variant="outline" size="sm">
                                        🏷️ Manage Categories
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}