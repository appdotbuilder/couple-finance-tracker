import React, { useState } from 'react';
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
}

interface Props {
    loan: Loan;
    [key: string]: unknown;
}

export default function EditLoan({ loan }: Props) {
    const [formData, setFormData] = useState({
        description: loan.description,
        amount: loan.amount.toString(),
        loan_date: loan.loan_date,
        status: loan.status,
        notes: loan.notes || '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.put(route('loans.update', loan.id), formData, {
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
                        <h1 className="text-3xl font-bold tracking-tight">✏️ Edit Loan</h1>
                        <p className="text-muted-foreground">
                            Update the details of your loan record
                        </p>
                    </div>
                    <Link href="/loans">
                        <Button variant="outline">
                            ← Back to Loans
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Loan Details</CardTitle>
                        <CardDescription>
                            Update the information about your loan
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                    placeholder="e.g., Loan to John for car repair"
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

                            {/* Loan Date */}
                            <div>
                                <label htmlFor="loan_date" className="block text-sm font-medium mb-2">
                                    Loan Date *
                                </label>
                                <input
                                    type="date"
                                    id="loan_date"
                                    name="loan_date"
                                    value={formData.loan_date}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    required
                                />
                                {errors.loan_date && (
                                    <p className="text-sm text-destructive mt-1">{errors.loan_date}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium mb-2">
                                    Status *
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    required
                                >
                                    <option value="pending">⏳ Pending</option>
                                    <option value="paid">✅ Paid Back</option>
                                    <option value="cancelled">❌ Cancelled</option>
                                </select>
                                {errors.status && (
                                    <p className="text-sm text-destructive mt-1">{errors.status}</p>
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
                                    placeholder="Additional notes about the loan..."
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
                                    {processing ? '💾 Updating...' : '💾 Update Loan'}
                                </Button>
                                <Link href="/loans">
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Status Change Suggestions */}
                {formData.status !== loan.status && (
                    <Card className="max-w-2xl border-orange-200 bg-orange-50">
                        <CardHeader>
                            <CardTitle className="text-orange-800">⚠️ Status Change</CardTitle>
                            <CardDescription className="text-orange-700">
                                You're changing the loan status from <strong>{loan.status}</strong> to <strong>{formData.status}</strong>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-orange-700">
                                {formData.status === 'paid' && loan.status === 'pending' && (
                                    <p>✅ Great! This will remove the loan from your pending amounts.</p>
                                )}
                                {formData.status === 'cancelled' && (
                                    <p>❌ This loan will be marked as cancelled/forgiven.</p>
                                )}
                                {formData.status === 'pending' && loan.status !== 'pending' && (
                                    <p>⏳ This will add the loan back to your pending amounts.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}