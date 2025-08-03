import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface WeeklyIncome {
    id: number;
    amount: number;
    income_date: string;
    source?: string;
    notes?: string;
    created_at: string;
}

interface Props {
    incomes: {
        data: WeeklyIncome[];
        links: Array<Record<string, unknown>>;
        meta: Record<string, unknown>;
    };
    [key: string]: unknown;
}

export default function WeeklyIncomesIndex({ incomes }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const handleDelete = (income: WeeklyIncome) => {
        if (confirm(`Are you sure you want to delete this income record of ${formatCurrency(income.amount)}?`)) {
            router.delete(route('weekly-incomes.destroy', income.id));
        }
    };

    const totalIncome = incomes.data.reduce((sum, income) => sum + income.amount, 0);
    const averageIncome = incomes.data.length > 0 ? totalIncome / incomes.data.length : 0;

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">💵 Weekly Income</h1>
                        <p className="text-muted-foreground">
                            Track your weekly income and sources
                        </p>
                    </div>
                    <Link href="/weekly-incomes/create">
                        <Button>
                            ➕ Add Income
                        </Button>
                    </Link>
                </div>

                {/* Summary Cards */}
                {incomes.data.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">💰 Total Income</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">
                                    {formatCurrency(totalIncome)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    All recorded income
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">📊 Average Income</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {formatCurrency(averageIncome)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Per income entry
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">📅 Total Entries</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {incomes.data.length}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Income record{incomes.data.length !== 1 ? 's' : ''}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Income Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Your Income Records</CardTitle>
                        <CardDescription>
                            All your weekly income entries with sources and dates
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {incomes.data.length > 0 ? (
                            <div className="space-y-4">
                                {incomes.data.map((income) => (
                                    <div key={income.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className="text-2xl">💵</div>
                                            <div>
                                                <h3 className="font-medium">
                                                    {income.source || 'Weekly Income'}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Income date: {formatDate(income.income_date)}
                                                </p>
                                                {income.notes && (
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        📝 {income.notes}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <div className="font-bold text-lg text-green-600">
                                                    +{formatCurrency(income.amount)}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Added {formatDate(income.created_at)}
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Link href={route('weekly-incomes.edit', income.id)}>
                                                    <Button variant="outline" size="sm">
                                                        ✏️ Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(income)}
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
                                <div className="text-4xl mb-4">💵</div>
                                <h3 className="text-lg font-medium mb-2">No income records yet</h3>
                                <p className="text-muted-foreground mb-4">
                                    Start tracking your weekly income to get better financial insights.
                                </p>
                                <Link href="/weekly-incomes/create">
                                    <Button>
                                        ➕ Add Your First Income
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}