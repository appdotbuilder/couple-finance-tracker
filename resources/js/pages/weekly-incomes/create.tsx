import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';



export default function CreateWeeklyIncome() {
    const [formData, setFormData] = useState({
        amount: '',
        income_date: new Date().toISOString().split('T')[0],
        source: '',
        notes: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.post(route('weekly-incomes.store'), formData, {
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
                        <h1 className="text-3xl font-bold tracking-tight">➕ Add Weekly Income</h1>
                        <p className="text-muted-foreground">
                            Record your weekly income and update your balance
                        </p>
                    </div>
                    <Link href="/weekly-incomes">
                        <Button variant="outline">
                            ← Back to Income
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Income Details</CardTitle>
                        <CardDescription>
                            Fill in the information about your weekly income
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
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

                            {/* Income Date */}
                            <div>
                                <label htmlFor="income_date" className="block text-sm font-medium mb-2">
                                    Income Date *
                                </label>
                                <input
                                    type="date"
                                    id="income_date"
                                    name="income_date"
                                    value={formData.income_date}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    required
                                />
                                {errors.income_date && (
                                    <p className="text-sm text-destructive mt-1">{errors.income_date}</p>
                                )}
                            </div>

                            {/* Source */}
                            <div>
                                <label htmlFor="source" className="block text-sm font-medium mb-2">
                                    Source
                                </label>
                                <input
                                    type="text"
                                    id="source"
                                    name="source"
                                    value={formData.source}
                                    onChange={handleChange}
                                    placeholder="e.g., Salary, Freelance work, Business income"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                                {errors.source && (
                                    <p className="text-sm text-destructive mt-1">{errors.source}</p>
                                )}
                            </div>

                            {/* Notes */}
                            <div>
                                <label htmlFor="notes" className="block text-sm font-medium mb-2">
                                    Notes
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    placeholder="Additional notes about this income..."
                                    rows={3}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                                {errors.notes && (
                                    <p className="text-sm text-destructive mt-1">{errors.notes}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="flex space-x-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? '💾 Saving...' : '💾 Save Income'}
                                </Button>
                                <Link href="/weekly-incomes">
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>💡 Income Tracking Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Record income as soon as you receive it for accurate tracking</li>
                            <li>• Use the source field to categorize different income streams</li>
                            <li>• Include both regular salary and additional income sources</li>
                            <li>• The income date helps track when money was actually received</li>
                            <li>• Adding income will automatically update your remaining balance</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}