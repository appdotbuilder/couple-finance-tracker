import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';



export default function CreateExpenseCategory() {
    const [formData, setFormData] = useState({
        name: '',
        color: '#6B7280',
        description: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        router.post(route('expense-categories.store'), formData, {
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

    const colorPresets = [
        '#EF4444', '#F97316', '#F59E0B', '#EAB308',
        '#84CC16', '#22C55E', '#10B981', '#14B8A6',
        '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1',
        '#8B5CF6', '#A855F7', '#D946EF', '#EC4899',
        '#F43F5E', '#6B7280', '#374151', '#111827'
    ];

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">➕ Add Category</h1>
                        <p className="text-muted-foreground">
                            Create a new expense category with custom color
                        </p>
                    </div>
                    <Link href="/expense-categories">
                        <Button variant="outline">
                            ← Back to Categories
                        </Button>
                    </Link>
                </div>

                {/* Form */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Category Details</CardTitle>
                        <CardDescription>
                            Fill in the information for your new expense category
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Category Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g., Food & Groceries"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Color */}
                            <div>
                                <label htmlFor="color" className="block text-sm font-medium mb-2">
                                    Color *
                                </label>
                                <div className="space-y-3">
                                    <input
                                        type="color"
                                        id="color"
                                        name="color"
                                        value={formData.color}
                                        onChange={handleChange}
                                        className="w-20 h-10 rounded border border-input"
                                        required
                                    />
                                    <div className="grid grid-cols-10 gap-2">
                                        {colorPresets.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, color }))}
                                                className={`w-8 h-8 rounded border-2 hover:scale-110 transition-transform ${
                                                    formData.color === color ? 'border-gray-900' : 'border-gray-300'
                                                }`}
                                                style={{ backgroundColor: color }}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                </div>
                                {errors.color && (
                                    <p className="text-sm text-destructive mt-1">{errors.color}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Optional description of what this category includes..."
                                    rows={3}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive mt-1">{errors.description}</p>
                                )}
                            </div>

                            {/* Preview */}
                            {formData.name && (
                                <div className="p-4 border rounded-lg bg-muted">
                                    <p className="text-sm font-medium mb-2">Preview:</p>
                                    <div className="flex items-center space-x-3">
                                        <div 
                                            className="w-6 h-6 rounded-full border-2 border-gray-200"
                                            style={{ backgroundColor: formData.color }}
                                        />
                                        <span className="font-medium">{formData.name}</span>
                                    </div>
                                    {formData.description && (
                                        <p className="text-sm text-muted-foreground mt-2 ml-9">
                                            {formData.description}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex space-x-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? '💾 Creating...' : '💾 Create Category'}
                                </Button>
                                <Link href="/expense-categories">
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Tips Card */}
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>💡 Category Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>• Choose descriptive names that are easy to recognize</li>
                            <li>• Use colors that help you quickly identify expense types</li>
                            <li>• Add descriptions to clarify what belongs in each category</li>
                            <li>• Start with broad categories, you can add specific ones later</li>
                            <li>• Consider grouping similar expenses under one category</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}