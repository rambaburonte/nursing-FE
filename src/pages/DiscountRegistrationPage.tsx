// src/pages/DiscountRegistrationPage.tsx

import React, { useState, useEffect, useRef } from "react";
import { BASE_URL, PAYMENT_API_URL } from "../config";
import { fetchCountries } from "../lib/countriesApi";
import Header from '../components/Header';
import FooterSection from '../components/FooterSections';

const generateRandomCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
};

const DiscountRegistrationPage = () => {
    const [form, setForm] = useState({
        title: "",
        name: "",
        phone: "",
        email: "",
        institute: "",
        country: "",
        description: "",
        discountAmount: "",
        captcha: "",
    });
    const [captchaCode, setCaptchaCode] = useState(generateRandomCaptcha());
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [countries, setCountries] = useState<string[]>([
        "India", "USA", "UK", "Germany", "France", "Canada", "Australia", "Japan", "China", "Brazil",
        "Italy", "Spain", "Netherlands", "Switzerland", "Sweden", "Norway", "Denmark", "Belgium",
        "Austria", "Poland", "Turkey", "Russia", "South Korea", "Singapore", "Malaysia", "Thailand",
        "Indonesia", "Philippines", "Vietnam", "South Africa", "Egypt", "Nigeria", "Kenya", "Other"
    ]);
    const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
    const [showPayPal, setShowPayPal] = useState(false);
    const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
    const [paypalProcessing, setPaypalProcessing] = useState(false);

    const validateForm = () => {
        const errors: {[key: string]: string} = {};
        
        if (!form.title.trim()) errors.title = 'Title is required';
        if (!form.name.trim()) errors.name = 'Name is required';
        if (!form.phone.trim()) errors.phone = 'Phone is required';
        if (!form.email.trim()) errors.email = 'Email is required';
        if (!form.institute.trim()) errors.institute = 'Institute/University is required';
        if (!form.country.trim()) errors.country = 'Country is required';
        if (!form.description.trim()) errors.description = 'Description is required';
        if (!form.discountAmount.trim()) errors.discountAmount = 'Discount amount is required';
        if (form.discountAmount && (isNaN(Number(form.discountAmount)) || Number(form.discountAmount) <= 0)) {
            errors.discountAmount = 'Please enter a valid discount amount';
        }
        if (!form.captcha.trim()) errors.captcha = 'Captcha is required';
        if (form.captcha && form.captcha !== captchaCode) {
            errors.captcha = 'Captcha is incorrect';
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const generateCaptcha = () => {
        setCaptchaCode(generateRandomCaptcha());
        setForm(f => ({ ...f, captcha: "" }));
    };

    const handleChange = (field: string, value: string) => {
        setForm({ ...form, [field]: value });
        // Clear error for this field when user starts typing
        if (formErrors[field]) {
            setFormErrors({ ...formErrors, [field]: '' });
        }
    };

    const handleStripePayment = async () => {
        setError("");
        setSuccess(false);
        
        if (!validateForm()) {
            setError("Please fill in all required fields correctly.");
            return;
        }

        setSubmitting(true);
        try {
            // Calculate total amount including 5% processing fee
            const baseAmount = parseFloat(form.discountAmount);
            const processingFee = baseAmount * 0.05;
            const totalAmount = baseAmount + processingFee;
            
            // Prepare request body as per backend DTO
            const reqBody = {
                productName: "NURSING 2026 DISCOUNT REGISTRATION",
                description: `NURSING 2026 DISCOUNT REQUEST: ${form.description} (Base: €${baseAmount.toFixed(2)}, Processing Fee: €${processingFee.toFixed(2)})`,
                orderReference: `DISCOUNT-${Date.now()}`,
                unitAmount: totalAmount.toFixed(2), // send total amount including processing fee
                quantity: 1,
                currency: "eur",
                successUrl: window.location.origin + "/payment-success",
                cancelUrl: window.location.origin + "/payment-failure",
                customerEmail: form.email,
                name: form.name,
                phone: form.phone,
                instituteOrUniversity: form.institute,
                country: form.country,
            };
            const response = await fetch(`${BASE_URL}/api/discounts/create-session`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reqBody),
            });
            if (!response.ok) {
                const err = await response.text();
                throw new Error(err || "Failed to create Stripe session");
            }
            const data = await response.json();
            // If your backend returns a Stripe Checkout URL, redirect:
            if (data && data.url) {
                sessionStorage.setItem("stripeRedirect", "true");
                window.location.href = data.url;
                return;
            }
            setSuccess(true);
            setForm({
                title: "",
                name: "",
                phone: "",
                email: "",
                institute: "",
                country: "",
                description: "",
                discountAmount: "",
                captcha: "",
            });
            generateCaptcha();
        } catch (err: any) {
            setError(err.message || "Submission failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handlePayPalPayment = async () => {
        setError("");
        setSuccess(false);
        
        if (!validateForm()) {
            setError("Please fill in all required fields correctly.");
            return;
        }

        setSubmitting(true);
        setPaypalProcessing(true);
        
        try {
            // Calculate total amount including 5% processing fee
            const baseAmount = parseFloat(form.discountAmount);
            const processingFee = baseAmount * 0.05;
            const totalAmount = baseAmount + processingFee;
            
            // Create PayPal order via API
            const paypalRequest = {
                customerEmail: form.email,
                customerName: form.name,
                phone: form.phone,
                country: form.country,
                instituteOrUniversity: form.institute,
                amount: totalAmount, // send total amount including processing fee
                currency: 'EUR',
                successUrl: `${window.location.origin}/payment-success`,
                cancelUrl: `${window.location.origin}/discount-registration`
            };

            console.log('Creating PayPal order with request:', paypalRequest);

            const response = await fetch(`${BASE_URL}/api/discounts/paypal/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paypalRequest),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('PayPal order response:', data);
                
                if (data.success && data.approvalUrl) {
                    // Store registration data for completion after PayPal return
                    const registrationData = {
                        title: form.title,
                        name: form.name,
                        phone: form.phone,
                        email: form.email,
                        instituteOrUniversity: form.institute,
                        country: form.country,
                        description: form.description,
                        discountAmount: baseAmount,
                        processingFee: processingFee,
                        totalAmount: totalAmount,
                        orderId: data.orderId
                    };
                    sessionStorage.setItem('paypalDiscountRegistration', JSON.stringify(registrationData));
                    
                    // Redirect to PayPal for payment
                    window.location.href = data.approvalUrl;
                } else {
                    throw new Error(data.message || data.errorMessage || 'Failed to create PayPal order');
                }
            } else {
                let errorMessage = 'Failed to create PayPal order';
                try {
                    const errorData = await response.json();
                    console.error('PayPal create error response:', errorData);
                    errorMessage = errorData.message || errorData.errorMessage || errorData.error || `Server error: ${response.status}`;
                } catch (parseError) {
                    console.error('Failed to parse error response:', parseError);
                    errorMessage = `Server error: ${response.status} ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            console.error('PayPal order creation error:', error);
            setError(`PayPal error: ${error.message || 'Unknown error'}`);
        } finally {
            setSubmitting(false);
            setPaypalProcessing(false);
        }
    };

    // Add PayPal direct payment function following Register.tsx pattern
    const handlePayPalDirectPayment = async () => {
        if (!validateForm()) return;

        // Call the main PayPal payment handler
        await handlePayPalPayment();
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Check which payment method is selected and handle accordingly
        if (paymentMethod === 'stripe') {
            await handleStripePayment();
        } else if (paymentMethod === 'paypal') {
            await handlePayPalDirectPayment();
        }
    };

    useEffect(() => {
        // Load countries asynchronously without blocking the UI
        fetchCountries()
            .then((fetchedCountries) => {
                if (fetchedCountries && fetchedCountries.length > 0) {
                    setCountries(fetchedCountries);
                }
            })
            .catch((error) => {
                console.warn("Failed to fetch countries from API, using fallback list:", error);
                // Already have fallback list in state, so no action needed
            });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-sky-50 to-white flex flex-col">
            <Header />
            <div className="flex-grow flex items-center justify-center p-4 pt-20">
                <div className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl p-10 border border-blue-100 relative">
                    <h2 className="text-3xl font-extrabold text-center text-blue-800 mb-2 tracking-tight">Discount Registration</h2>
                    <p className="text-center text-gray-500 mb-6">Fill in the form below to request a discount for your registration.</p>
                    {success && (
                        <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-center font-medium animate-fade-in">
                            Registration submitted successfully!
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 p-3 rounded bg-red-100 text-red-800 text-center font-medium animate-fade-in">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-blue-700 mb-1">Title *</label>
                        <select 
                            required 
                            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 ${formErrors.title ? 'border-red-500' : 'border-blue-200'}`} 
                            value={form.title} 
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange("title", e.target.value)}
                        >
                            <option value="">Select Title</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Dr.">Dr.</option>
                            <option value="Prof.">Prof.</option>
                        </select>
                        {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-blue-700 mb-1">Name *</label>
                            <input 
                                placeholder="Name" 
                                required 
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 ${formErrors.name ? 'border-red-500' : 'border-blue-200'}`} 
                                value={form.name} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("name", e.target.value)} 
                            />
                            {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-blue-700 mb-1">Phone *</label>
                            <input 
                                placeholder="Phone" 
                                required 
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 ${formErrors.phone ? 'border-red-500' : 'border-blue-200'}`} 
                                value={form.phone} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("phone", e.target.value)} 
                            />
                            {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-blue-700 mb-1">Email *</label>
                            <input 
                                placeholder="Email" 
                                type="email" 
                                required 
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 ${formErrors.email ? 'border-red-500' : 'border-blue-200'}`} 
                                value={form.email} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("email", e.target.value)} 
                            />
                            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-blue-700 mb-1">Institute/University *</label>
                            <input 
                                placeholder="Institute/University" 
                                required 
                                className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 ${formErrors.institute ? 'border-red-500' : 'border-blue-200'}`} 
                                value={form.institute} 
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("institute", e.target.value)} 
                            />
                            {formErrors.institute && <p className="text-red-500 text-xs mt-1">{formErrors.institute}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-blue-700 mb-1">Country *</label>
                        <select 
                            required 
                            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 ${formErrors.country ? 'border-red-500' : 'border-blue-200'}`} 
                            value={form.country} 
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange("country", e.target.value)}
                        >
                            <option value="">Choose Country</option>
                            {countries.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                        {formErrors.country && <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-blue-700 mb-1">Registration Description *</label>
                        <textarea 
                            placeholder="Describe your registration..." 
                            required 
                            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 min-h-[80px] ${formErrors.description ? 'border-red-500' : 'border-blue-200'}`} 
                            value={form.description} 
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange("description", e.target.value)} 
                        />
                        {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-blue-700 mb-1">Discount Amount (€) *</label>
                        <input 
                            placeholder="Enter Discount Amount" 
                            required 
                            type="number" 
                            min="0" 
                            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 ${formErrors.discountAmount ? 'border-red-500' : 'border-blue-200'}`} 
                            value={form.discountAmount} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("discountAmount", e.target.value)} 
                        />
                        {formErrors.discountAmount && <p className="text-red-500 text-xs mt-1">{formErrors.discountAmount}</p>}
                        
                        {/* Pricing Summary with Processing Fee */}
                        {form.discountAmount && !isNaN(Number(form.discountAmount)) && Number(form.discountAmount) > 0 && (
                            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-3">Payment Summary</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Discount Amount</span>
                                        <span className="font-medium">€{Number(form.discountAmount).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Processing Fee (5%)</span>
                                        <span className="font-medium">€{(Number(form.discountAmount) * 0.05).toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-gray-300 pt-2">
                                        <div className="flex justify-between items-center font-bold text-lg">
                                            <span>Total Amount</span>
                                            <span className="text-blue-600">€{(Number(form.discountAmount) * 1.05).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Payment Method Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-blue-700 mb-3">Payment Method *</label>
                        <div className="flex gap-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="stripe"
                                    checked={paymentMethod === 'stripe'}
                                    onChange={(e) => setPaymentMethod(e.target.value as 'stripe' | 'paypal')}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-sm font-medium text-gray-700">Credit/Debit Card (Stripe)</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={paymentMethod === 'paypal'}
                                    onChange={(e) => setPaymentMethod(e.target.value as 'stripe' | 'paypal')}
                                    className="w-4 h-4 text-blue-600"
                                />
                                <span className="text-sm font-medium text-gray-700">PayPal</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 items-center">
                        <label className="block text-sm font-semibold text-blue-700 mb-1">Captcha *</label>
                        <div
                            className="w-36 h-12 flex items-center justify-center font-mono text-xl font-bold bg-gradient-to-r from-blue-200 to-blue-100 rounded select-none tracking-widest border border-blue-400 mb-1 shadow-inner"
                            style={{ letterSpacing: '0.3em', userSelect: 'none', textShadow: '1px 1px 2px #b6c6e6' }}
                        >
                            {captchaCode}
                        </div>
                        <button
                            type="button"
                            className="text-xs text-blue-700 underline mb-1 hover:text-blue-900"
                            onClick={generateCaptcha}
                            tabIndex={-1}
                        >
                            Refresh Captcha
                        </button>
                        <input 
                            placeholder="Enter the code above" 
                            required 
                            className={`w-full p-2 border rounded focus:ring-2 focus:ring-blue-300 ${formErrors.captcha ? 'border-red-500' : 'border-blue-200'}`} 
                            value={form.captcha} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("captcha", e.target.value)} 
                        />
                        {formErrors.captcha && <p className="text-red-500 text-xs mt-1">{formErrors.captcha}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitting || paypalProcessing}
                        className={`w-full bg-blue-700 hover:bg-blue-800 text-white p-2 rounded font-semibold transition-all duration-200 ${(submitting || paypalProcessing) ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                        {paypalProcessing ? 'Redirecting to PayPal...' : 
                         submitting ? 'Processing...' : 
                         form.discountAmount && !isNaN(Number(form.discountAmount)) && Number(form.discountAmount) > 0 
                           ? `Pay €${(Number(form.discountAmount) * 1.05).toFixed(2)} with ${paymentMethod === 'stripe' ? 'Stripe' : 'PayPal'}`
                           : paymentMethod === 'stripe' ? 'Pay with Stripe' : 'Pay with PayPal'}
                    </button>
                </form>
            </div>
        </div>
        <FooterSection />
        </div>
    );
};

export default DiscountRegistrationPage;