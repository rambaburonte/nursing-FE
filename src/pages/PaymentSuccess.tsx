import React, { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import FooterSection from '../components/FooterSections';


const PaymentSuccess = () => {
    const [registrationStatus, setRegistrationStatus] = useState<'pending' | 'success' | 'error' | null>(null);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const submitRegistration = async () => {
            const pending = localStorage.getItem('pendingRegistration');
            if (!pending) {
                setRegistrationStatus(null);
                return;
            }
            setRegistrationStatus('pending');
            try {
                const registrationData = JSON.parse(pending);
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || "https://nursing.markmarketing.xyz"}/api/registration/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(registrationData),
                });
                if (response.ok) {
                    setRegistrationStatus('success');
                    localStorage.removeItem('pendingRegistration');
                } else {
                    let errorMessage = 'Registration failed after payment.';
                    try {
                        const errorData = await response.json();
                        errorMessage = errorData.message || errorData.error || errorMessage;
                    } catch {}
                    setErrorMsg(errorMessage);
                    setRegistrationStatus('error');
                }
            } catch (err) {
                setErrorMsg('Could not submit registration after payment.');
                setRegistrationStatus('error');
            }
        };
        submitRegistration();
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-green-50">
            <Header />
            <main className="flex-grow flex items-center justify-center px-4 py-8">
                <div className="bg-white rounded-2xl shadow-xl border border-green-100 max-w-md w-full p-8 flex flex-col items-center text-center">
                    <CheckCircle className="text-green-600 w-20 h-20 mb-4" />
                    <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful!</h1>
                    <p className="text-gray-700 mb-6">
                        Thank you for registering for the Nursing Summit 2026. A confirmation email has been sent to your registered email address.
                    </p>
                    {registrationStatus === 'pending' && (
                        <p className="text-blue-600 mb-4">Submitting your registration details...</p>
                    )}
                    {registrationStatus === 'success' && (
                        <p className="text-green-600 mb-4">Registration completed successfully after payment.</p>
                    )}
                    {registrationStatus === 'error' && (
                        <p className="text-red-600 mb-4">{errorMsg}</p>
                    )}
                    <Link
                        to="/"
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Back to Home
                    </Link>
                </div>
            </main>
            <FooterSection />
        </div>
    );
};

export default PaymentSuccess;
