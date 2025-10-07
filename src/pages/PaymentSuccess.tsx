import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import FooterSection from '../components/FooterSections';


const PaymentSuccess = () => {
    const [registrationStatus, setRegistrationStatus] = useState<'pending' | 'success' | 'error' | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const location = useLocation();
    const [transactionId, setTransactionId] = useState<string | null>(null);

    useEffect(() => {
        // Get session_id from query params
        const params = new URLSearchParams(location.search);
        const sessionId = params.get('session_id');
        setTransactionId(sessionId);

        if (!sessionId) {
            setRegistrationStatus(null);
            setErrorMsg('No session id found in URL.');
            return;
        }

        const checkAndUpdatePayment = async () => {
            setRegistrationStatus('pending');
            try {
                // 1. Check payment status
                const statusRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || "https://nursing.markmarketing.xyz"}/api/payment/status/${sessionId}`);
                if (!statusRes.ok) {
                    setRegistrationStatus('error');
                    setErrorMsg('Could not verify payment status.');
                    return;
                }
                const statusData = await statusRes.json();
                if (statusData.status !== 'success') {
                    setRegistrationStatus('error');
                    setErrorMsg('Payment not successful.');
                    return;
                }

                // 2. Update payment status in DB
                const updateRes = await fetch(`${import.meta.env.VITE_API_BASE_URL || "https://nursing.markmarketing.xyz"}/api/payment/update`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `sessionId=${encodeURIComponent(sessionId)}`,
                });
                if (!updateRes.ok) {
                    setRegistrationStatus('error');
                    setErrorMsg('Failed to update payment status in database.');
                    return;
                }
                setRegistrationStatus('success');
            } catch (err) {
                setRegistrationStatus('error');
                setErrorMsg('Error processing payment status.');
            }
        };
        checkAndUpdatePayment();
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
                    {transactionId && (
                        <p className="text-green-800 font-semibold mb-2">Transaction ID: <span className="font-mono">{transactionId}</span></p>
                    )}
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
