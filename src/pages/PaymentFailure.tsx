import React from "react";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentFailure = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-red-50 px-4">
            <XCircle className="text-red-600 w-20 h-20 mb-4" />
            <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Failed</h1>
            <p className="text-gray-700 mb-6">
                Something went wrong during the payment process. Please try again or contact support if the issue persists.
            </p>
            <Link
                to="/register"
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
            >
                Try Again
            </Link>
        </div>
    );
};

export default PaymentFailure;
