"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCreditCard, FaPaypal, FaLock, FaArrowLeft } from 'react-icons/fa';
import { HiOutlineCreditCard } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';

const PaymentPage = () => {
    const router = useRouter();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');
    const [cardData, setCardData] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        // Format card number with spaces
        if (name === 'cardNumber') {
            const formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
            if (formattedValue.replace(/\s/g, '').length <= 16) {
                setCardData({ ...cardData, [name]: formattedValue });
            }
        }
        // Format expiry date MM/YY
        else if (name === 'expiryDate') {
            const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
            if (formattedValue.length <= 5) {
                setCardData({ ...cardData, [name]: formattedValue });
            }
        }
        // Format CVV (3-4 digits only)
        else if (name === 'cvv') {
            const formattedValue = value.replace(/\D/g, '');
            if (formattedValue.length <= 4) {
                setCardData({ ...cardData, [name]: formattedValue });
            }
        }
        else {
            setCardData({ ...cardData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            // Navigate to order confirmation page or home
            router.push('/dashboard/orders');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Link href="/checkout" className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
                        <FaArrowLeft className="mr-2" />
                        Back to Checkout
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
                    <p className="text-gray-600 mt-2">Complete your order by providing payment details</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Payment Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <FaLock className="text-primary" />
                                <h2 className="text-xl font-semibold text-gray-900">Secure Payment</h2>
                            </div>

                            {/* Payment Method Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Select Payment Method
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedPaymentMethod('card')}
                                        className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                                            selectedPaymentMethod === 'card'
                                                ? 'border-primary bg-primary/5'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <FaCreditCard className={`text-xl ${selectedPaymentMethod === 'card' ? 'text-primary' : 'text-gray-400'}`} />
                                        <span className={`font-medium ${selectedPaymentMethod === 'card' ? 'text-primary' : 'text-gray-700'}`}>
                                            Credit/Debit Card
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedPaymentMethod('paypal')}
                                        className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                                            selectedPaymentMethod === 'paypal'
                                                ? 'border-primary bg-primary/5'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <FaPaypal className={`text-xl ${selectedPaymentMethod === 'paypal' ? 'text-primary' : 'text-gray-400'}`} />
                                        <span className={`font-medium ${selectedPaymentMethod === 'paypal' ? 'text-primary' : 'text-gray-700'}`}>
                                            PayPal
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Payment Form */}
                            <form onSubmit={handleSubmit}>
                                {selectedPaymentMethod === 'card' ? (
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                                Card Number
                                            </label>
                                            <div className="relative">
                                                <HiOutlineCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <input
                                                    type="text"
                                                    id="cardNumber"
                                                    name="cardNumber"
                                                    value={cardData.cardNumber}
                                                    onChange={handleCardInputChange}
                                                    placeholder="1234 5678 9012 3456"
                                                    required
                                                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-2">
                                                Cardholder Name
                                            </label>
                                            <input
                                                type="text"
                                                id="cardName"
                                                name="cardName"
                                                value={cardData.cardName}
                                                onChange={handleCardInputChange}
                                                placeholder="John Doe"
                                                required
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Expiry Date
                                                </label>
                                                <input
                                                    type="text"
                                                    id="expiryDate"
                                                    name="expiryDate"
                                                    value={cardData.expiryDate}
                                                    onChange={handleCardInputChange}
                                                    placeholder="MM/YY"
                                                    required
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                                                    CVV
                                                </label>
                                                <input
                                                    type="text"
                                                    id="cvv"
                                                    name="cvv"
                                                    value={cardData.cvv}
                                                    onChange={handleCardInputChange}
                                                    placeholder="123"
                                                    required
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-8 text-center border-2 border-dashed border-gray-300 rounded-lg">
                                        <FaPaypal className="text-5xl text-primary mx-auto mb-4" />
                                        <p className="text-gray-600 mb-4">You will be redirected to PayPal to complete your payment</p>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
                                        >
                                            Continue with PayPal
                                        </button>
                                    </div>
                                )}

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <button
                                        type="submit"
                                        disabled={isProcessing}
                                        className="w-full bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isProcessing ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <FaLock className="mr-2" />
                                                Complete Payment
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
                            
                            <div className="border-b border-gray-200 pb-4 mb-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <Image
                                        src="/products/product6.jpg"
                                        alt="Product"
                                        className="w-16 h-16 rounded-lg object-cover"
                                        width={64}
                                        height={64}
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">Angie's Sweet & Salty Kettle Corn</p>
                                        <p className="text-sm text-gray-600">× 1</p>
                                    </div>
                                    <span className="font-semibold text-gray-900">$48.85</span>
                                </div>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span className="font-medium">$48.85</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Shipping</span>
                                    <span className="font-medium text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Tax</span>
                                    <span className="font-medium">$0.00</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                    <span>Total</span>
                                    <span>$48.85</span>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <FaLock className="text-primary" />
                                    <span>Your payment information is secure and encrypted</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;

