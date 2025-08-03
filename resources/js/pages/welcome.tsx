import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth: {
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl mb-4">
                            <span className="text-3xl">💰</span>
                        </div>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        💑 Family Finance Tracker
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Take control of your weekly finances as a couple. Track expenses, manage loans, 
                        and monitor your income all in one beautiful, easy-to-use application.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold mb-2">Weekly Dashboard</h3>
                        <p className="text-gray-600">
                            Get a complete overview of your weekly income, expenses, and remaining balance at a glance.
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">💸</div>
                        <h3 className="text-xl font-semibold mb-2">Expense Tracking</h3>
                        <p className="text-gray-600">
                            Categorize and track all your expenses with detailed descriptions and easy editing.
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">🏦</div>
                        <h3 className="text-xl font-semibold mb-2">Loan Management</h3>
                        <p className="text-gray-600">
                            Keep track of money you've loaned out with status updates and detailed records.
                        </p>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-4xl mb-4">💵</div>
                        <h3 className="text-xl font-semibold mb-2">Income Tracking</h3>
                        <p className="text-gray-600">
                            Record your weekly income and automatically update your available balance.
                        </p>
                    </div>
                </div>

                {/* Screenshots/Mockups Section */}
                <div className="bg-white rounded-2xl p-8 shadow-xl mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">✨ Key Features</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg h-32 mb-4 flex items-center justify-center">
                                <span className="text-white text-4xl">📈</span>
                            </div>
                            <h4 className="font-semibold mb-2">Smart Categories</h4>
                            <p className="text-sm text-gray-600">Organize expenses with customizable categories and color coding</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg h-32 mb-4 flex items-center justify-center">
                                <span className="text-white text-4xl">📱</span>
                            </div>
                            <h4 className="font-semibold mb-2">Mobile Friendly</h4>
                            <p className="text-sm text-gray-600">Access your finances anywhere with our responsive design</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg h-32 mb-4 flex items-center justify-center">
                                <span className="text-white text-4xl">👥</span>
                            </div>
                            <h4 className="font-semibold mb-2">Couple-Friendly</h4>
                            <p className="text-sm text-gray-600">Built specifically for couples managing finances together</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    {auth.user ? (
                        <div className="space-y-4">
                            <p className="text-lg text-gray-700 mb-6">
                                Welcome back, {auth.user.name}! Ready to manage your finances?
                            </p>
                            <Link href="/dashboard">
                                <Button size="lg" className="text-lg px-8 py-3">
                                    🏠 Go to Dashboard
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-lg text-gray-700 mb-6">
                                Start taking control of your family finances today!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/register">
                                    <Button size="lg" className="text-lg px-8 py-3 w-full sm:w-auto">
                                        🚀 Get Started Free
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button variant="outline" size="lg" className="text-lg px-8 py-3 w-full sm:w-auto">
                                        👋 Sign In
                                    </Button>
                                </Link>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                No credit card required • Start tracking immediately
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}