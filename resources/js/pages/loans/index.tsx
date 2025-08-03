import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Loan {
    id: number;
    description: string;
    amount: number;
    loan_date: string;
    status: 'pending' | 'paid' | 'cancelled';
    notes?: string;
    created_at: string;
}

interface Props {
    loans: {
        data: Loan[];
        links: Array<Record<string, unknown>>;
        meta: Record<string, unknown>;
    };
    [key: string]: unknown;
}

export default function LoansIndex({ loans }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString();
    };

    const getStatusEmoji = (status: string) => {
        switch (status) {
            case 'pending': return '⏳';
            case 'paid': return '✅';
            case 'cancelled': return '❌';
            default: return '📄';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'text-orange-600';
            case 'paid': return 'text-green-600';
            case 'cancelled': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const handleDelete = (loan: Loan) => {
        if (confirm(`Are you sure you want to delete the loan "${loan.description}"?`)) {
            router.delete(route('loans.destroy', loan.id));
        }
    };

    const pendingLoans = loans.data.filter(loan => loan.status === 'pending');
    const totalPending = pendingLoans.reduce((sum, loan) => sum + loan.amount, 0);
    const totalLoaned = loans.data.reduce((sum, loan) => sum + loan.amount, 0);

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">🏦 Loans</h1>
                        <p className="text-muted-foreground">
                            Track money you've loaned to others
                        </p>
                    </div>
                    <Link href="/loans/create">
                        <Button>
                            ➕ Add Loan
                        </Button>
                    </Link>
                </div>

                {/* Summary Cards */}
                {loans.data.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">⏳ Pending Amount</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-orange-600">
                                    {formatCurrency(totalPending)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {pendingLoans.length} pending loan{pendingLoans.length !== 1 ? 's' : ''}
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">💰 Total Loaned</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {formatCurrency(totalLoaned)}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {loans.data.length} total loan{loans.data.length !== 1 ? 's' : ''}
                                </p>
                            </CardContent>
                        </Card>
                        
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">📊 Recovery Rate</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">
                                    {totalLoaned > 0 ? Math.round((1 - totalPending / totalLoaned) * 100) : 0}%
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Loans recovered
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Loans Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Your Loans</CardTitle>
                        <CardDescription>
                            All money you've loaned with status tracking
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loans.data.length > 0 ? (
                            <div className="space-y-4">
                                {loans.data.map((loan) => (
                                    <div key={loan.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <div className="text-2xl">
                                                {getStatusEmoji(loan.status)}
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{loan.description}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    <span className={`capitalize ${getStatusColor(loan.status)}`}>
                                                        {loan.status}
                                                    </span>
                                                    {' • '}
                                                    {formatDate(loan.loan_date)}
                                                </p>
                                                {loan.notes && (
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        📝 {loan.notes}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <div className="font-bold text-lg">
                                                    {formatCurrency(loan.amount)}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Added {formatDate(loan.created_at)}
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Link href={route('loans.edit', loan.id)}>
                                                    <Button variant="outline" size="sm">
                                                        ✏️ Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(loan)}
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
                                <div className="text-4xl mb-4">🏦</div>
                                <h3 className="text-lg font-medium mb-2">No loans recorded</h3>
                                <p className="text-muted-foreground mb-4">
                                    Start tracking money you've loaned to keep better records.
                                </p>
                                <Link href="/loans/create">
                                    <Button>
                                        ➕ Add Your First Loan
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