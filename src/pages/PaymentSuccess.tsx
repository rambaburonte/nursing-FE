import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import FooterSection from '../components/FooterSections';
import { PAYMENT_API_URL } from '../config';


const PaymentSuccess = () => {
    const [registrationStatus, setRegistrationStatus] = useState<'pending' | 'success' | 'error' | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [debugInfo, setDebugInfo] = useState('');
    const location = useLocation();
    const [transactionId, setTransactionId] = useState<string | null>(null);

    useEffect(() => {
        // Get session_id from query params
        const params = new URLSearchParams(location.search);
        const sessionId = params.get('session_id');
        setTransactionId(sessionId);

        if (!sessionId) {
            setRegistrationStatus('error');
            setErrorMsg('Invalid payment link. Please complete your registration through the proper payment process.');
            return;
        }

        const checkAndUpdatePayment = async () => {
            setRegistrationStatus('pending');
            try {
                // 1. Check payment status
                console.log('Calling status API for session:', sessionId);
                const statusRes = await fetch(`${PAYMENT_API_URL}/api/payment/status/${sessionId}`);
                console.log('Status API response status:', statusRes.status);
                
                if (!statusRes.ok) {
                    const errorText = await statusRes.text();
                    console.error('Status API error:', errorText);
                    setRegistrationStatus('error');
                    setErrorMsg(`Could not verify payment status. Response: ${statusRes.status} ${errorText}`);
                    return;
                }
                
                const statusData = await statusRes.json();
                console.log('Status API response data:', statusData);
                setDebugInfo(`Status API Response: ${JSON.stringify(statusData, null, 2)}`);
                
                // Check if payment is successful - check both paymentStatus and status fields
                const isPaymentSuccessful = 
                    statusData.paymentStatus === 'paid' || 
                    statusData.status === 'COMPLETED' ||
                    (statusData.paymentStatus === 'no_payment_required');
                
                if (!isPaymentSuccessful) {
                    setRegistrationStatus('error');
                    setErrorMsg(`Payment verification failed. PaymentStatus: ${statusData.paymentStatus || 'unknown'}, Status: ${statusData.status || 'unknown'}. Please contact support if payment was deducted.`);
                    return;
                }

                // 2. Update payment status in DB
                console.log('Calling update API for session:', sessionId);
                const updateRes = await fetch(`${PAYMENT_API_URL}/api/payment/update`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `sessionId=${encodeURIComponent(sessionId)}`,
                });
                console.log('Update API response status:', updateRes.status);
                
                if (!updateRes.ok) {
                    const errorText = await updateRes.text();
                    console.error('Update API error:', errorText);
                    setRegistrationStatus('error');
                    setErrorMsg(`Failed to update payment status in database. Response: ${updateRes.status} ${errorText}`);
                    return;
                }
                
                const updateData = await updateRes.json();
                console.log('Update API response data:', updateData);
                
                // Success - payment verified and database updated
                setRegistrationStatus('success');
            } catch (err) {
                console.error('Error in checkAndUpdatePayment:', err);
                setRegistrationStatus('error');
                setErrorMsg(`Error processing payment status: ${err instanceof Error ? err.message : 'Unknown error'}`);
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
                        <p className="text-green-800 font-semibold mb-2">Session ID: <span className="font-mono">{transactionId}</span></p>
                    )}
                    {registrationStatus === 'pending' && (
                        <p className="text-blue-600 mb-4">Verifying payment and updating registration...</p>
                    )}
                    {registrationStatus === 'success' && (
                        <p className="text-green-600 mb-4">Payment verified and registration completed successfully!</p>
                    )}
                    {registrationStatus === 'error' && (
                        <div className="text-red-600 mb-4">
                            <p className="mb-2">{errorMsg}</p>
                            {debugInfo && (
                                <details className="text-xs">
                                    <summary>Debug Info (Click to expand)</summary>
                                    <pre className="whitespace-pre-wrap mt-2 p-2 bg-gray-100 rounded text-left">{debugInfo}</pre>
                                </details>
                            )}
                        </div>
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
