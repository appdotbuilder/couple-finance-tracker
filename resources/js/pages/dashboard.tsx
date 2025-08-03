import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Summary {
    weeklyIncome: number;
    weeklyExpenses: number;
    pendingLoans: number;
    remainingBalance: number;
}

interface Transaction {
    id: number;
    description: string;
    amount: number;
    created_at: string;
    category?: {
        name: string;
        color: string;
    };
    status?: string;
    source?: string;
}

interface Props {
    summary: Summary;
    recentExpenses: Transaction[];
    recentIncomes: Transaction[];
    recentLoans: Transaction[];
    [key: string]: unknown;
}

export default function Dashboard({ summary, recentExpenses, recentIncomes, recentLoans }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">💰 Financial Dashboard</h1>
                    <p className="text-muted-foreground">
                        Your weekly financial overview and recent activity
                    </p>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Weekly Income</CardTitle>
                            <span className="text-2xl">💵</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                {formatCurrency(summary.weeklyIncome)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                This week's total income
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Weekly Expenses</CardTitle>
                            <span className="text-2xl">💸</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {formatCurrency(summary.weeklyExpenses)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                This week's total expenses
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Loans</CardTitle>
                            <span className="text-2xl">🏦</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">
                                {formatCurrency(summary.pendingLoans)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Outstanding loan amounts
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Remaining Balance</CardTitle>
                            <span className="text-2xl">💰</span>
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${summary.remainingBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {formatCurrency(summary.remainingBalance)}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                After expenses and loans
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>⚡ Quick Actions</CardTitle>
                        <CardDescription>
                            Manage your finances quickly
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Link href="/expenses/create">
                                <Button className="w-full h-16 text-left justify-start" variant="outline">
                                    <div>
                                        <div className="text-lg mb-1">💸 Add Expense</div>
                                        <div className="text-xs text-muted-foreground">Record new expense</div>
                                    </div>
                                </Button>
                            </Link>
                            <Link href="/weekly-incomes/create">
                                <Button className="w-full h-16 text-left justify-start" variant="outline">
                                    <div>
                                        <div className="text-lg mb-1">💵 Add Income</div>
                                        <div className="text-xs text-muted-foreground">Record weekly income</div>
                                    </div>
                                </Button>
                            </Link>
                            <Link href="/loans/create">
                                <Button className="w-full h-16 text-left justify-start" variant="outline">
                                    <div>
                                        <div className="text-lg mb-1">🏦 Add Loan</div>
                                        <div className="text-xs text-muted-foreground">Record money loaned</div>
                                    </div>
                                </Button>
                            </Link>
                            <Link href="/expense-categories">
                                <Button className="w-full h-16 text-left justify-start" variant="outline">
                                    <div>
                                        <div className="text-lg mb-1">🏷️ Categories</div>
                                        <div className="text-xs text-muted-foreground">Manage categories</div>
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <div className="grid gap-4 md:grid-cols-3">
                    {/* Recent Expenses */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">💸 Recent Expenses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentExpenses.length > 0 ? (
                                    recentExpenses.map((expense) => (
                                        <div key={expense.id} className="flex justify-between items-center">
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium truncate">
                                                    {expense.description}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {expense.category?.name} • {formatDate(expense.created_at)}
                                                </p>
                                            </div>
                                            <div className="text-sm font-medium text-red-600">
                                                -{formatCurrency(expense.amount)}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No recent expenses</p>
                                )}
                                <Link href="/expenses">
                                    <Button variant="outline" size="sm" className="w-full">
                                        View All Expenses
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Income */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">💵 Recent Income</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentIncomes.length > 0 ? (
                                    recentIncomes.map((income) => (
                                        <div key={income.id} className="flex justify-between items-center">
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium">
                                                    {income.source || 'Weekly Income'}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {formatDate(income.created_at)}
                                                </p>
                                            </div>
                                            <div className="text-sm font-medium text-green-600">
                                                +{formatCurrency(income.amount)}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No recent income</p>
                                )}
                                <Link href="/weekly-incomes">
                                    <Button variant="outline" size="sm" className="w-full">
                                        View All Income
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Loans */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">🏦 Recent Loans</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {recentLoans.length > 0 ? (
                                    recentLoans.map((loan) => (
                                        <div key={loan.id} className="flex justify-between items-center">
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium truncate">
                                                    {loan.description}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {loan.status} • {formatDate(loan.created_at)}
                                                </p>
                                            </div>
                                            <div className="text-sm font-medium text-orange-600">
                                                {formatCurrency(loan.amount)}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground">No recent loans</p>
                                )}
                                <Link href="/loans">
                                    <Button variant="outline" size="sm" className="w-full">
                                        View All Loans
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}