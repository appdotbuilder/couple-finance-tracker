import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ExpenseCategory {
    id: number;
    name: string;
    color: string;
    description?: string;
    created_at: string;
}

interface Props {
    categories: {
        data: ExpenseCategory[];
        links: Array<Record<string, unknown>>;
        meta: Record<string, unknown>;
    };
    [key: string]: unknown;
}

export default function ExpenseCategoriesIndex({ categories }: Props) {
    const handleDelete = (category: ExpenseCategory) => {
        if (confirm(`Are you sure you want to delete the category "${category.name}"? This will affect all expenses using this category.`)) {
            router.delete(route('expense-categories.destroy', category.id));
        }
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">🏷️ Expense Categories</h1>
                        <p className="text-muted-foreground">
                            Manage your expense categories and colors
                        </p>
                    </div>
                    <Link href="/expense-categories/create">
                        <Button>
                            ➕ Add Category
                        </Button>
                    </Link>
                </div>

                {/* Categories Grid */}
                <Card>
                    <CardHeader>
                        <CardTitle>Your Categories</CardTitle>
                        <CardDescription>
                            All your expense categories with color coding
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {categories.data.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {categories.data.map((category) => (
                                    <div key={category.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center space-x-3">
                                                <div 
                                                    className="w-6 h-6 rounded-full border-2 border-gray-200"
                                                    style={{ backgroundColor: category.color }}
                                                />
                                                <h3 className="font-semibold">{category.name}</h3>
                                            </div>
                                            <div className="flex space-x-1">
                                                <Link href={route('expense-categories.edit', category.id)}>
                                                    <Button variant="outline" size="sm">
                                                        ✏️
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(category)}
                                                >
                                                    🗑️
                                                </Button>
                                            </div>
                                        </div>
                                        {category.description && (
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {category.description}
                                            </p>
                                        )}
                                        <p className="text-xs text-muted-foreground">
                                            Created {new Date(category.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">🏷️</div>
                                <h3 className="text-lg font-medium mb-2">No categories yet</h3>
                                <p className="text-muted-foreground mb-4">
                                    Create categories to organize your expenses better.
                                </p>
                                <Link href="/expense-categories/create">
                                    <Button>
                                        ➕ Create Your First Category
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Category Usage Tips */}
                <Card>
                    <CardHeader>
                        <CardTitle>💡 Category Tips</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <h4 className="font-medium mb-2">🎨 Color Coding</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Use similar colors for related categories</li>
                                    <li>• Bright colors for major expenses</li>
                                    <li>• Neutral colors for miscellaneous items</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">📋 Organization</h4>
                                <ul className="space-y-1 text-sm text-muted-foreground">
                                    <li>• Keep category names short and clear</li>
                                    <li>• Use descriptions for clarification</li>
                                    <li>• Don't create too many similar categories</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Popular Categories Examples */}
                {categories.data.length === 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>🌟 Popular Categories</CardTitle>
                            <CardDescription>
                                Here are some common expense categories you might want to create
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                {[
                                    { name: 'Food & Groceries', color: '#10B981', emoji: '🍕' },
                                    { name: 'Transportation', color: '#3B82F6', emoji: '🚗' },
                                    { name: 'Utilities', color: '#F59E0B', emoji: '💡' },
                                    { name: 'Entertainment', color: '#8B5CF6', emoji: '🎬' },
                                    { name: 'Healthcare', color: '#EF4444', emoji: '🏥' },
                                    { name: 'Personal Care', color: '#EC4899', emoji: '💄' },
                                    { name: 'Household', color: '#06B6D4', emoji: '🏠' },
                                    { name: 'Miscellaneous', color: '#6B7280', emoji: '📦' },
                                ].map((example) => (
                                    <div key={example.name} className="flex items-center space-x-2 p-2 border rounded">
                                        <div 
                                            className="w-4 h-4 rounded-full"
                                            style={{ backgroundColor: example.color }}
                                        />
                                        <span className="text-sm">{example.emoji} {example.name}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}