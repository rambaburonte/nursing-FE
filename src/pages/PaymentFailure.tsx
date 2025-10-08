import React from "react";
import { useLocation } from "react-router-dom";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import FooterSection from '../components/FooterSections';

const PaymentFailure = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id');
    
    return (
        <div className="min-h-screen flex flex-col bg-red-50">
            <Header />
            <main className="flex-grow flex items-center justify-center px-4 py-8">
                <div className="bg-white rounded-2xl shadow-xl border border-red-100 max-w-md w-full p-8 flex flex-col items-center text-center">
                    <XCircle className="text-red-600 w-20 h-20 mb-4" />
                    <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Failed</h1>
                    <p className="text-gray-700 mb-6">
                        Something went wrong during the payment process. Please try again or contact support if the issue persists.
                    </p>
                    {sessionId && (
                        <p className="text-red-800 font-semibold mb-2">Session ID: <span className="font-mono">{sessionId}</span></p>
                    )}
                    <Link
                        to="/register"
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        Try Again
                    </Link>
                </div>
            </main>
            <FooterSection />
        </div>
    );
};

export default PaymentFailure;
