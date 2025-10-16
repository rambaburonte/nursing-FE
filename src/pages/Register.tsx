import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import FooterSection from '../components/FooterSections';
import { FaSyncAlt } from 'react-icons/fa';
import { BASE_URL, PAYMENT_API_URL } from '../config';

interface RegisterFormData {
    title: string; // Frontend only field for user experience
    name: string;
    phone: string;
    email: string;
    institute: string; // Will be mapped to instituteOrUniversity for backend
    country: string;
    registrationType: string;
    presentationType: string;
    guests: number;
    nights: number;
    accompanyingPerson: boolean;
    extraNights: number;
    captcha: string;
}

interface PricingConfig {
    id: number;
    presentationType: {
        id: number;
        type: string;
        price: number;
    };
    accommodationOption?: {
        id: number;
        nights: number;
        guests: number;
        price: number;
    };
    processingFeePercent: number;
    totalPrice: number;
}

const Style: React.FC = () => (
    <style>
        {`
      @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

      * {
        font-family: 'IBM Plex Sans', sans-serif;
      }

      .form-input, .form-select {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        font-size: 1rem;
        color: #1f2937;
        transition: border-color 0.2s ease;
      }
      .form-input:focus, .form-select:focus {
        outline: none;
        border-color: #000;
      }
      .form-input.error, .form-select.error {
        border-color: #ef4444;
      }
      .error-text {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }
      .custom-checkbox {
        width: 1.5rem;
        height: 1.5rem;
        border: 2px solid #1f2937;
        border-radius: 0.25rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.2s ease, border-color 0.2s ease;
      }
      .custom-checkbox.checked {
        background-color: #1f2937;
        border-color: #1f2937;
      }
      .custom-checkbox.checked::before {
        content: '✔';
        color: #fff;
        font-size: 1rem;
        font-weight: bold;
      }
      .radio-group {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-bottom: 1rem;
      }
      .radio-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
      }
      .radio-input {
        width: 1.25rem;
        height: 1.25rem;
        border: 2px solid #1f2937;
        border-radius: 50%;
        appearance: none;
        cursor: pointer;
      }
      .radio-input:checked {
        background-color: #1f2937;
        border-color: #1f2937;
        position: relative;
      }
      .radio-input:checked::before {
        content: '';
        width: 0.5rem;
        height: 0.5rem;
        background-color: #fff;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .payment-summary {
        border-top: 2px dashed #1f2937;
        padding-top: 1.5rem;
        margin-top: 2rem;
      }
      .captcha-section {
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        border: 1px solid #cbd5e1;
        border-radius: 1rem;
        padding: 1.5rem;
        margin-top: 1.5rem;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      }
      .captcha-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .captcha-display {
        display: flex;
        align-items: center;
        gap: 1rem;
        background: #ffffff;
        padding: 1rem;
        border-radius: 0.75rem;
        border: 2px solid #e2e8f0;
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
      }
      .captcha-image {
        font-size: 1.75rem;
        font-weight: 700;
        letter-spacing: 0.2em;
        background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
        color: #ffffff;
        padding: 0.75rem 1.25rem;
        border-radius: 0.5rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        font-family: 'Courier New', monospace;
        user-select: none;
        min-width: 120px;
        text-align: center;
        position: relative;
      }
      .captcha-image::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" patternUnits="userSpaceOnUse" width="100" height="100"><circle cx="20" cy="20" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="80" cy="40" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="40" cy="80" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        border-radius: 0.5rem;
        pointer-events: none;
      }
      .refresh-button {
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        border: none;
        color: white;
        padding: 0.75rem;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 44px;
        height: 44px;
        box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
      }
      .refresh-button:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
      }
      .refresh-button:active {
        transform: translateY(0);
      }
      .captcha-input-container {
        position: relative;
      }
      .captcha-input {
        width: 100%;
        padding: 0.875rem 1rem;
        border: 2px solid #e2e8f0;
        border-radius: 0.75rem;
        font-size: 1rem;
        font-weight: 500;
        color: #1e293b;
        background: #ffffff;
        transition: all 0.2s ease;
        letter-spacing: 0.1em;
      }
      .captcha-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
      .captcha-input.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
      .captcha-label {
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 0.5rem;
        display: block;
        font-size: 0.875rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .captcha-help-text {
        font-size: 0.75rem;
        color: #64748b;
        margin-top: 0.5rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
      .security-icon {
        width: 1rem;
        height: 1rem;
        color: #64748b;
      }
      .accommodation-selectors {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
      .info-section {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2rem;
        padding: 1rem;
        background-color: #f9fafb;
        border-radius: 0.5rem;
      }
      .info-item {
        text-align: center;
      }
      .info-item label {
        font-weight: 600;
        color: #1f2937;
      }
      .info-item p {
        color: #4b5563;
      }
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .modal-content {
        background-color: white;
        padding: 2rem;
        border-radius: 0.5rem;
        text-align: center;
      }
      .modal-button {
        background-color: #4db6ac;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        margin-top: 1rem;
        cursor: pointer;
        border: none;
      }
    `}
    </style>
);

const Register: React.FC<{
    captchaCode: string;
    generateCaptcha: () => void;
    setRegisterFormData: React.Dispatch<React.SetStateAction<RegisterFormData>>;
    registerFormData: RegisterFormData;
}> = ({ captchaCode, generateCaptcha, setRegisterFormData, registerFormData }) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [pricing, setPricing] = useState<PricingConfig[] | null>(null);
    const [pricingError, setPricingError] = useState<string>('');
    const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
    const [paymentError, setPaymentError] = useState<string>('');
    const [paypalMessage, setPaypalMessage] = useState<string>('');
    const [showCaptcha, setShowCaptcha] = useState(false);

    // Add refs for error fields
    const nameRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const instituteRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLSelectElement>(null);
    const registrationTypeRef = useRef<HTMLInputElement>(null);
    const presentationTypeRef = useRef<HTMLInputElement>(null);
    const captchaRef = useRef<HTMLInputElement>(null);
    const errorSectionRef = useRef<HTMLDivElement>(null);

    // Map error keys to refs
    const fieldRefs: { [key: string]: React.RefObject<any> } = {
        name: nameRef,
        phone: phoneRef,
        email: emailRef,
        institute: instituteRef,
        country: countryRef,
        registrationType: registrationTypeRef,
        presentationType: presentationTypeRef,
        captcha: captchaRef,
    };

    const fetchPricing = async () => {
        if (!registerFormData.registrationType || !registerFormData.presentationType) {
            setPricing(null);
            return;
        }

        try {
            // Map frontend presentationType to backend expected values
            let backendPresentationType = '';
            switch (registerFormData.presentationType) {
                case 'abstract-submission':
                    backendPresentationType = 'DELEGATE';
                    break;
                case 'listener/delegate':
                    backendPresentationType = 'LISTENER';
                    break;
                default:
                    backendPresentationType = registerFormData.presentationType.toUpperCase();
            }

            const pricingRequest = {
                registrationType: registerFormData.registrationType === 'registrationAndAccommodation'
                    ? 'REGISTRATION_AND_ACCOMMODATION'
                    : 'REGISTRATION_ONLY',
                presentationType: backendPresentationType,
                numberOfNights: registerFormData.nights,
                numberOfGuests: registerFormData.guests,
            };

            const response = await fetch(`${BASE_URL}/api/registration/get-pricing-config`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pricingRequest),
            });

            if (response.ok) {
                const data = await response.json();
                setPricing(data);
                setPricingError('');
            } else {
                let errorMessage = 'Failed to fetch pricing information';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) {
                    errorMessage = `Pricing fetch failed: ${response.status} ${response.statusText}`;
                }
                setPricingError(errorMessage);
                setPricing(null);
            }
        } catch (error) {
            const errorMessage = `Error fetching pricing information: ${error instanceof Error ? error.message : 'Unknown error'}`;
            setPricingError(errorMessage);
            setPricing(null);
        }
    };

    useEffect(() => {
        fetchPricing();
    }, [registerFormData.registrationType, registerFormData.presentationType, registerFormData.nights, registerFormData.guests]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setRegisterFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!registerFormData.name) newErrors.name = 'Name is required';
        if (!registerFormData.phone) newErrors.phone = 'Phone is required';
        if (!registerFormData.email) newErrors.email = 'Email is required';
        if (!registerFormData.institute) newErrors.institute = 'Institute is required';
        if (!registerFormData.country) newErrors.country = 'Country is required';
        if (!registerFormData.registrationType) newErrors.registrationType = 'Registration type is required';
        if (!registerFormData.presentationType) newErrors.presentationType = 'Presentation type is required';
        if (!registerFormData.captcha) newErrors.captcha = 'Captcha is required';
        if (registerFormData.captcha && registerFormData.captcha !== captchaCode) {
            newErrors.captcha = 'Captcha is incorrect';
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            const firstErrorKey = Object.keys(newErrors)[0];
            const ref = fieldRefs[firstErrorKey];
            if (ref && ref.current) {
                const y = ref.current.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
                ref.current.focus();
            } else if (errorSectionRef.current) {
                const y = errorSectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
        return Object.keys(newErrors).length === 0;
    };

    const createPaymentSession = async (pricingConfigId: number) => {
        setIsProcessingPayment(true);
        setPaymentError('');

        try {
            const selectedPricing = pricing?.find(p => p.id === pricingConfigId);
            if (!selectedPricing) {
                throw new Error('Pricing configuration not found');
            }

            if (isNaN(selectedPricing.totalPrice)) {
                throw new Error('Invalid pricing amount');
            }

            let description = `Registration for ${registerFormData.name} - ${selectedPricing.presentationType.type}`;
            let productName = `Nursing Summit 2026 - ${selectedPricing.presentationType.type}`;

            if (selectedPricing.accommodationOption) {
                description += ` + Accommodation (${selectedPricing.accommodationOption.nights} nights, ${selectedPricing.accommodationOption.guests} guests)`;
                productName += ` + Accommodation`;
            }

            const paymentData = {
                productName: productName,
                description: description,
                orderReference: `REG-${Date.now()}-${registerFormData.name.replace(/\s+/g, '')}`,
                unitAmount: Math.round(selectedPricing.totalPrice * 100), // Convert to cents
                quantity: 1,
                currency: "eur",
                successUrl: `${window.location.origin}/payment-success`,
                cancelUrl: `${window.location.origin}/payment-failure`,
                pricingConfigId: pricingConfigId,
                name: registerFormData.name,
                phone: registerFormData.phone,
                email: registerFormData.email,
                instituteOrUniversity: registerFormData.institute,
                country: registerFormData.country,
                registrationType: registerFormData.registrationType === 'registrationAndAccommodation'
                    ? 'REGISTRATION_AND_ACCOMMODATION'
                    : 'REGISTRATION_ONLY',
                // Map frontend presentationType to backend expected values
                presentationType: (() => {
                    switch (registerFormData.presentationType) {
                        case 'abstract-submission':
                            return 'DELEGATE';
                        case 'listener/delegate':
                            return 'LISTENER';
                        default:
                            return registerFormData.presentationType.toUpperCase();
                    }
                })(),
                accompanyingPerson: registerFormData.accompanyingPerson,
                extraNights: registerFormData.extraNights,
                accommodationNights: selectedPricing.accommodationOption ? selectedPricing.accommodationOption.nights : 0,
                accommodationGuests: selectedPricing.accommodationOption ? selectedPricing.accommodationOption.guests : 0,
            };

            const response = await fetch(`${PAYMENT_API_URL}/api/payment/create-checkout-session?pricingConfigId=${pricingConfigId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (response.ok) {
                const paymentSession = await response.json();
                if (paymentSession.url) {
                    window.location.href = paymentSession.url;
                } else {
                    throw new Error('Invalid payment session response');
                }
            } else {
                let errorMessage = 'Failed to create payment session';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) {
                    errorMessage = `Payment session creation failed: ${response.status} ${response.statusText}`;
                }
                throw new Error(errorMessage);
            }
        } catch (error) {
            setPaymentError(error instanceof Error ? error.message : 'Failed to create payment session');
        } finally {
            setIsProcessingPayment(false);
        }
    };

    const createPayPalOrder = async (pricingConfigId: number): Promise<{ orderId: string; approvalUrl: string }> => {
        setIsProcessingPayment(true);
        setPaymentError('');
        setPaypalMessage('');

        try {
            const selectedPricing = pricing?.find(p => p.id === pricingConfigId);
            if (!selectedPricing) {
                throw new Error('Selected pricing configuration not found');
            }

            if (isNaN(selectedPricing.totalPrice)) {
                throw new Error('Invalid price amount');
            }

            // Create PayPal order request matching backend expectations
            const paypalRequest = {
                customerEmail: registerFormData.email,
                customerName: registerFormData.name,
                phone: registerFormData.phone,
                country: registerFormData.country,
                instituteOrUniversity: registerFormData.institute,
                amount: selectedPricing.totalPrice,
                currency: 'EUR',
                pricingConfigId: pricingConfigId,
                successUrl: `${window.location.origin}/payment-success`,
                cancelUrl: `${window.location.origin}/register`,
            };

            console.log('Creating PayPal order with request:', paypalRequest);

            const response = await fetch(`${PAYMENT_API_URL}/api/payment/paypal/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paypalRequest),
            });

            console.log('PayPal create response status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('PayPal create response data:', data);
                if (data.orderId && data.approvalUrl) {
                    // Return both orderId and approvalUrl
                    return { orderId: data.orderId, approvalUrl: data.approvalUrl };
                } else if (data.orderId) {
                    // Fallback: construct approval URL if not provided
                    const approvalUrl = `https://www.api.paypal.com/checkoutnow?token=${data.orderId}`;
                    return { orderId: data.orderId, approvalUrl: approvalUrl };
                } else {
                    throw new Error('Invalid response from PayPal service - no orderId');
                }
            } else {
                const errorData = await response.json();
                console.error('PayPal create error response:', errorData);
                throw new Error(errorData.message || 'Failed to create PayPal order');
            }
        } catch (error) {
            console.error('PayPal order creation error:', error);
            setPaymentError(`PayPal error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        } finally {
            setIsProcessingPayment(false);
        }
    };



    const handlePayment = async (paymentFunction: (pricingConfigId: number) => Promise<void>) => {
        if (!validate()) return;

        if (!pricing || pricing.length === 0) {
            setErrors((prev) => ({ ...prev, general: 'Please wait for pricing information to load or check your selection.' }));
            return;
        }

        try {
            const registrationData = {
                name: registerFormData.name,
                phone: registerFormData.phone,
                email: registerFormData.email,
                instituteOrUniversity: registerFormData.institute,
                country: registerFormData.country,
                presentationType: (() => {
                    switch (registerFormData.presentationType) {
                        case 'abstract-submission':
                            return 'DELEGATE';
                        case 'listener/delegate':
                            return 'LISTENER';
                        default:
                            return registerFormData.presentationType ? registerFormData.presentationType.toUpperCase() : '';
                    }
                })(),
            };

            const response = await fetch(`${BASE_URL}/api/registration/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            if (response.ok) {
                const pricingConfigId = pricing[0].id;
                await paymentFunction(pricingConfigId);
            } else {
                const registrationDataForStorage = {
                    name: registerFormData.name,
                    phone: registerFormData.phone,
                    email: registerFormData.email,
                    instituteOrUniversity: registerFormData.institute,
                    country: registerFormData.country,
                    registrationType: registerFormData.registrationType === 'registrationAndAccommodation'
                        ? 'REGISTRATION_AND_ACCOMMODATION'
                        : 'REGISTRATION_ONLY',
                    presentationType: (() => {
                        switch (registerFormData.presentationType) {
                            case 'abstract-submission':
                                return 'DELEGATE';
                            case 'listener/delegate':
                                return 'LISTENER';
                            default:
                                return registerFormData.presentationType.toUpperCase();
                        }
                    })(),
                };
                localStorage.setItem('pendingRegistration', JSON.stringify(registrationDataForStorage));

                let errorMessage = 'Registration failed';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) {
                    errorMessage = `Registration failed: ${response.status} ${response.statusText}`;
                }
                setErrors((prev) => ({ ...prev, general: errorMessage }));

                const pricingConfigId = pricing[0].id;
                await paymentFunction(pricingConfigId);
            }
        } catch (error) {
            // If registration API fails completely, try direct payment
            try {
                const registrationDataForStorage = {
                    name: registerFormData.name,
                    phone: registerFormData.phone,
                    email: registerFormData.email,
                    instituteOrUniversity: registerFormData.institute,
                    country: registerFormData.country,
                    registrationType: registerFormData.registrationType === 'registrationAndAccommodation'
                        ? 'REGISTRATION_AND_ACCOMMODATION'
                        : 'REGISTRATION_ONLY',
                    presentationType: (() => {
                        switch (registerFormData.presentationType) {
                            case 'abstract-submission':
                                return 'DELEGATE';
                            case 'listener/delegate':
                                return 'LISTENER';
                            default:
                                return registerFormData.presentationType.toUpperCase();
                        }
                    })(),
                };
                localStorage.setItem('pendingRegistration', JSON.stringify(registrationDataForStorage));
                // Proceed to payment
                const pricingConfigId = pricing[0].id;
                await paymentFunction(pricingConfigId);
            } catch (paymentError) {
                setErrors((prev) => ({
                    ...prev,
                    general: `Unable to process registration and payment: ${paymentError instanceof Error ? paymentError.message : 'Unknown error'}`,
                }));
            }
        }
    };

    const handleStripePayment = async (pricingConfigId: number): Promise<void> => {
        return createPaymentSession(pricingConfigId);
    };

    const handlePayPalPayment = async (): Promise<{ orderId: string; approvalUrl: string }> => {
        if (!validate()) throw new Error('Validation failed');

        if (!pricing || pricing.length === 0) {
            throw new Error('Pricing information not available');
        }

        try {
            // Create the PayPal order and return both orderId and approvalUrl
            const pricingConfigId = pricing[0].id;
            const orderResult = await createPayPalOrder(pricingConfigId);
            return orderResult;
        } catch (error) {
            setPaymentError(`PayPal order creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    };

    const handlePayPalDirectPayment = async () => {
        if (!validate()) return;

        if (!pricing || pricing.length === 0) {
            setErrors((prev) => ({ ...prev, general: 'Please wait for pricing information to load or check your selection.' }));
            return;
        }

        setIsProcessingPayment(true);
        setPaymentError('');
        setPaypalMessage('Creating PayPal payment...');

        try {
            const pricingConfigId = pricing[0].id;
            
            // Create PayPal order via backend API
            const orderResult = await createPayPalOrder(pricingConfigId);
            
            // Store registration data for completion after PayPal return
            const registrationData = {
                name: registerFormData.name,
                phone: registerFormData.phone,
                email: registerFormData.email,
                instituteOrUniversity: registerFormData.institute,
                country: registerFormData.country,
                presentationType: (() => {
                    switch (registerFormData.presentationType) {
                        case 'abstract-submission':
                            return 'DELEGATE';
                        case 'listener/delegate':
                            return 'LISTENER';
                        default:
                            return registerFormData.presentationType ? registerFormData.presentationType.toUpperCase() : '';
                    }
                })(),
                orderId: orderResult.orderId,
                pricingConfigId: pricingConfigId
            };
            localStorage.setItem('paypalRegistration', JSON.stringify(registrationData));
            
            setPaypalMessage('Redirecting to PayPal...');
            
            // Redirect to PayPal using the approval URL from backend
            window.location.href = orderResult.approvalUrl;
            
        } catch (error) {
            setPaymentError(`PayPal payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setPaypalMessage('');
        } finally {
            setIsProcessingPayment(false);
        }
    };

    const handlePayPalRegistrationAndPayment = async () => {
        if (!validate()) return;

        if (!pricing || pricing.length === 0) {
            setErrors((prev) => ({ ...prev, general: 'Please wait for pricing information to load or check your selection.' }));
            return;
        }

        try {
            const registrationData = {
                name: registerFormData.name,
                phone: registerFormData.phone,
                email: registerFormData.email,
                instituteOrUniversity: registerFormData.institute,
                country: registerFormData.country,
                presentationType: (() => {
                    switch (registerFormData.presentationType) {
                        case 'abstract-submission':
                            return 'DELEGATE';
                        case 'listener/delegate':
                            return 'LISTENER';
                        default:
                            return registerFormData.presentationType ? registerFormData.presentationType.toUpperCase() : '';
                    }
                })(),
            };

            const response = await fetch(`${BASE_URL}/api/registration/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registrationData),
            });

            if (response.ok) {
                // Registration successful, PayPal order will be created when user clicks PayPal button
                setPaypalMessage('Registration successful. You can now proceed with PayPal payment.');
            } else {
                const registrationDataForStorage = {
                    name: registerFormData.name,
                    phone: registerFormData.phone,
                    email: registerFormData.email,
                    instituteOrUniversity: registerFormData.institute,
                    country: registerFormData.country,
                    registrationType: registerFormData.registrationType === 'registrationAndAccommodation'
                        ? 'REGISTRATION_AND_ACCOMMODATION'
                        : 'REGISTRATION_ONLY',
                    presentationType: (() => {
                        switch (registerFormData.presentationType) {
                            case 'abstract-submission':
                                return 'DELEGATE';
                            case 'listener/delegate':
                                return 'LISTENER';
                            default:
                                return registerFormData.presentationType.toUpperCase();
                        }
                    })(),
                };
                localStorage.setItem('pendingRegistration', JSON.stringify(registrationDataForStorage));

                let errorMessage = 'Registration failed';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) {
                    errorMessage = `Registration failed: ${response.status} ${response.statusText}`;
                }
                setErrors((prev) => ({ ...prev, general: errorMessage }));
                setPaypalMessage('Registration failed, but you can still proceed with payment.');
            }
        } catch (error) {
            // If registration API fails completely, try direct payment
            const registrationDataForStorage = {
                name: registerFormData.name,
                phone: registerFormData.phone,
                email: registerFormData.email,
                instituteOrUniversity: registerFormData.institute,
                country: registerFormData.country,
                registrationType: registerFormData.registrationType === 'registrationAndAccommodation'
                    ? 'REGISTRATION_AND_ACCOMMODATION'
                    : 'REGISTRATION_ONLY',
                presentationType: (() => {
                    switch (registerFormData.presentationType) {
                        case 'abstract-submission':
                            return 'DELEGATE';
                        case 'listener/delegate':
                            return 'LISTENER';
                        default:
                            return registerFormData.presentationType.toUpperCase();
                    }
                })(),
            };
            localStorage.setItem('pendingRegistration', JSON.stringify(registrationDataForStorage));
            setPaypalMessage('Registration API unavailable, but you can still proceed with payment.');
        }
    };

    useEffect(() => {
        const handlePasteShortcut = (e: KeyboardEvent) => {
            if (document.activeElement === captchaRef.current) {
                if ((e.altKey && e.key.toLowerCase() === 'v') || (e.ctrlKey && e.key.toLowerCase() === 'v')) {
                    setTimeout(() => {
                        if (captchaRef.current) {
                            setRegisterFormData((prev) => ({ ...prev, captcha: captchaRef.current!.value }));
                        }
                    }, 10);
                }
            }
        };
        window.addEventListener('keydown', handlePasteShortcut);
        return () => window.removeEventListener('keydown', handlePasteShortcut);
    }, [setRegisterFormData]);

    return (
        <form className="space-y-6">
            <div className="info-section">
                <div className="info-item">
                    <label>Conference Date</label>
                    <p>May 15-16, 2026</p>
                </div>
                <div className="info-item">
                    <label>Location</label>
                    <p>Crowne Plaza Rome - St. Peter's, Rome, Italy</p>
                </div>
                <div className="info-item">
                    <label>Registration Deadline</label>
                    <p>January 25, 2026</p>
                </div>
            </div>

            <Style />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title
                    </label>
                    <select
                        name="title"
                        value={registerFormData.title}
                        onChange={handleInputChange}
                        className="form-select"
                    >
                        <option value="">Select Title</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Prof.">Prof.</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                    </label>
                    <input
                        ref={nameRef}
                        type="text"
                        name="name"
                        value={registerFormData.name}
                        onChange={handleInputChange}
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Enter your full name"
                        required
                    />
                    {errors.name && <div className="error-text">{errors.name}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone *
                    </label>
                    <input
                        ref={phoneRef}
                        type="tel"
                        name="phone"
                        value={registerFormData.phone}
                        onChange={handleInputChange}
                        className={`form-input ${errors.phone ? 'error' : ''}`}
                        placeholder="Enter your phone number"
                        required
                    />
                    {errors.phone && <div className="error-text">{errors.phone}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                    </label>
                    <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        value={registerFormData.email}
                        onChange={handleInputChange}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="Enter your email address"
                        required
                    />
                    {errors.email && <div className="error-text">{errors.email}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Institute/University *
                    </label>
                    <input
                        ref={instituteRef}
                        type="text"
                        name="institute"
                        value={registerFormData.institute}
                        onChange={handleInputChange}
                        className={`form-input ${errors.institute ? 'error' : ''}`}
                        placeholder="Enter your institute or university"
                        required
                    />
                    {errors.institute && <div className="error-text">{errors.institute}</div>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                    </label>
                    <select
                        ref={countryRef}
                        name="country"
                        value={registerFormData.country}
                        onChange={handleInputChange}
                        className={`form-select ${errors.country ? 'error' : ''}`}
                        required
                    >
                        <option value="">Select Country</option>
                        <option value="Afghanistan">Afghanistan</option>
                        <option value="Albania">Albania</option>
                        <option value="Algeria">Algeria</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Bangladesh">Bangladesh</option>
                        <option value="Belgium">Belgium</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Canada">Canada</option>
                        <option value="China">China</option>
                        <option value="Czech Republic">Czech Republic</option>
                        <option value="Denmark">Denmark</option>
                        <option value="Egypt">Egypt</option>
                        <option value="Finland">Finland</option>
                        <option value="France">France</option>
                        <option value="Germany">Germany</option>
                        <option value="India">India</option>
                        <option value="Italy">Italy</option>
                        <option value="Japan">Japan</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Norway">Norway</option>
                        <option value="Poland">Poland</option>
                        <option value="Spain">Spain</option>
                        <option value="Sweden">Sweden</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                    </select>
                    {errors.country && <div className="error-text">{errors.country}</div>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                    Registration Type *
                </label>
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            ref={registrationTypeRef}
                            type="radio"
                            name="registrationType"
                            value="registrationOnly"
                            checked={registerFormData.registrationType === 'registrationOnly'}
                            onChange={handleInputChange}
                            className="radio-input"
                        />
                        Registration Only
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="registrationType"
                            value="registrationAndAccommodation"
                            checked={registerFormData.registrationType === 'registrationAndAccommodation'}
                            onChange={handleInputChange}
                            className="radio-input"
                        />
                        Registration + Accommodation
                    </label>
                </div>
                {errors.registrationType && <div className="error-text">{errors.registrationType}</div>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                    Presentation Type *
                </label>
                <div className="radio-group">
                    <label className="radio-label">
                        <input
                            ref={presentationTypeRef}
                            type="radio"
                            name="presentationType"
                            value="speaker"
                            checked={registerFormData.presentationType === 'speaker'}
                            onChange={handleInputChange}
                            className="radio-input"
                        />
                        Speaker
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="presentationType"
                            value="poster"
                            checked={registerFormData.presentationType === 'poster'}
                            onChange={handleInputChange}
                            className="radio-input"
                        />
                        Poster
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="presentationType"
                            value="abstract-submission"
                            checked={registerFormData.presentationType === 'abstract-submission'}
                            onChange={handleInputChange}
                            className="radio-input"
                        />
                        Delegate
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="presentationType"
                            value="listener/delegate"
                            checked={registerFormData.presentationType === 'listener/delegate'}
                            onChange={handleInputChange}
                            className="radio-input"
                        />
                        Listener
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="presentationType"
                            value="student"
                            checked={registerFormData.presentationType === 'student'}
                            onChange={handleInputChange}
                            className="radio-input"
                        />
                        Student
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            name="presentationType"
                            value="exhibitor"
                            checked={registerFormData.presentationType === 'exhibitor'}
                            onChange={handleInputChange}
                            className="radio-input"
                        />
                        Exhibitor
                    </label>
                </div>
                {errors.presentationType && <div className="error-text">{errors.presentationType}</div>}
            </div>

            {registerFormData.registrationType === 'registrationAndAccommodation' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Accommodation Details
                    </h3>

                    <div className="accommodation-selectors">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Number of Nights
                            </label>
                            <select
                                name="nights"
                                value={registerFormData.nights}
                                onChange={handleInputChange}
                                className="form-select w-32"
                            >
                                {[1, 2, 3, 4, 5].map(night => (
                                    <option key={night} value={night}>{night} night{night > 1 ? 's' : ''}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Number of Guests
                            </label>
                            <select
                                name="guests"
                                value={registerFormData.guests}
                                onChange={handleInputChange}
                                className="form-select w-32"
                            >
                                <option value={0}>Just Me</option>
                                <option value={1}>Me + 1 Guest</option>
                                <option value={2}>Me + 2 Guests</option>
                                <option value={3}>Me + 3 Guests</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            <div className="captcha-section">
                <div className="captcha-container">
                    <label className="captcha-label">Security Verification</label>
                    <div className="captcha-display">
                        <div className="captcha-image">{captchaCode}</div>
                        <button type="button" onClick={generateCaptcha} className="refresh-button" title="Generate new captcha">
                            <FaSyncAlt />
                        </button>
                    </div>
                    <div className="captcha-input-container">
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showCaptcha ? 'text' : 'password'}
                                name="captcha"
                                value={registerFormData.captcha}
                                onChange={handleInputChange}
                                placeholder="Enter the code shown above"
                                className={`captcha-input${errors.captcha ? ' error' : ''}`}
                                autoComplete="off"
                                maxLength={6}
                                ref={captchaRef}
                            />
                            <button
                                type="button"
                                aria-label={showCaptcha ? 'Hide captcha' : 'Show captcha'}
                                onClick={() => setShowCaptcha((v) => !v)}
                                style={{
                                    position: 'absolute',
                                    right: 8,
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: 0,
                                    color: '#64748b',
                                }}
                                tabIndex={-1}
                            >
                                {showCaptcha ? (
                                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-5 0-9-4.03-9-7 0-1.13.44-2.19 1.22-3.13M6.53 6.53A9.97 9.97 0 0 1 12 5c5 0 9 4.03 9 7 0 1.13-.44 2.19-1.22 3.13M1 1l22 22" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                ) : (
                                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="9" ry="7" /><circle cx="12" cy="12" r="3" /></svg>
                                )}
                            </button>
                        </div>
                        <div className="captcha-help-text">
                            <svg className="security-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Please enter the 6-character code to verify you're human. <span style={{ marginLeft: 4 }}>Use <b>Alt+V</b> or <b>Ctrl+V</b> to paste from clipboard. <b>Show/Hide</b> with the eye icon.</span>
                        </div>
                    </div>
                    {errors.captcha && <p className="error-text">{errors.captcha}</p>}
                </div>
            </div>

            {Object.keys(errors).length > 0 && (
                <div ref={errorSectionRef}></div>
            )}

            {pricing && pricing.length > 0 && (
                <div className="payment-summary">
                    <h3 className="text-lg font-semibold mb-4">Pricing Summary</h3>
                    {(() => {
                        const config = pricing[0];
                        if (!config) return null;
                        const registrationPrice = config.presentationType.price;
                        const accommodationPrice = config.accommodationOption ? config.accommodationOption.price : 0;
                        const subtotal = registrationPrice + accommodationPrice;
                        const processingFee = subtotal * ((config.processingFeePercent ?? 5) / 100);
                        return (
                            <div key={config.id} className="mb-4 p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-semibold text-lg mb-3 text-gray-900">Order Details</h4>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">{config.presentationType.type} Registration</span>
                                    <span className="font-semibold">€{registrationPrice}</span>
                                </div>
                                {config.accommodationOption && (
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium">
                                            Accommodation ({config.accommodationOption.nights} night{config.accommodationOption.nights > 1 ? 's' : ''}, {config.accommodationOption.guests} guest{config.accommodationOption.guests > 1 ? 's' : ''})
                                        </span>
                                        <span className="font-semibold">€{accommodationPrice}</span>
                                    </div>
                                )}
                                <div className="border-t border-gray-300 my-3"></div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-medium">€{subtotal}</span>
                                </div>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-gray-600">Processing Fee ({config.processingFeePercent ?? 5}%)</span>
                                    <span className="font-medium">€{processingFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center font-bold text-xl border-t border-gray-400 pt-3">
                                    <span>Total Amount</span>
                                    <span className="text-green-600">€{config.totalPrice}</span>
                                </div>
                                {registerFormData.registrationType === 'registrationAndAccommodation' && config.accommodationOption && (
                                    <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                                        <div className="text-sm text-blue-800">
                                            <p className="font-semibold">Accommodation Details:</p>
                                            <p>• Duration: {config.accommodationOption.nights} night{config.accommodationOption.nights > 1 ? 's' : ''}</p>
                                            <p>• Capacity: {config.accommodationOption.guests} guest{config.accommodationOption.guests > 1 ? 's' : ''}</p>
                                            <p>• Check-in: May 14, 2026</p>
                                            <p>• Check-out: May {14 + config.accommodationOption.nights}, 2026</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })()}
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start">
                            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-sm text-blue-800">
                                <p className="font-semibold mb-1">Secure Payment Process</p>
                                <p>Choose your preferred payment method below. You'll be redirected to our secure payment processor to complete your registration payment in euros (EUR).</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {pricingError && (
                <div className="text-red-500 text-sm">{pricingError}</div>
            )}
            {paymentError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    <strong>Payment Error:</strong> {paymentError}
                </div>
            )}
            {paypalMessage && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                    <strong>PayPal Status:</strong> {paypalMessage}
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                    type="button"
                    onClick={() => handlePayment(handleStripePayment)}
                    disabled={isProcessingPayment || !pricing || pricing.length === 0}
                    className={`px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${isProcessingPayment || !pricing || pricing.length === 0
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-gray-800'
                        }`}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    {isProcessingPayment ? 'Processing...' : 'Pay with Stripe'}
                </button>
                <button
                    type="button"
                    onClick={handlePayPalDirectPayment}
                    disabled={isProcessingPayment || !pricing || pricing.length === 0}
                    className={`px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${isProcessingPayment || !pricing || pricing.length === 0
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a.631.631 0 0 1 .633-.74h4.607a.641.641 0 0 1 .633.74l-3.107 19.696c-.082.519-.53.901-1.054.901h-4.607a.631.631 0 0 1-.633-.74l3.108-19.696z"/>
                    </svg>
                    {isProcessingPayment ? 'Processing...' : 'Pay with PayPal'}
                </button>
            </div>
        </form>
    );
};

const RegistrationPage: React.FC = () => {
    const [captchaCode, setCaptchaCode] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
        title: '',
        name: '',
        phone: '',
        email: '',
        institute: '',
        country: '',
        registrationType: '',
        presentationType: '',
        guests: 0, // Default to 0 (Just Me)
        nights: 1,
        accompanyingPerson: false,
        extraNights: 0,
        captcha: '',
    });

    const generateCaptcha = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCaptchaCode(result);
        setRegisterFormData((prev) => ({ ...prev, captcha: '' }));
    };

    const resetForm = () => {
        setRegisterFormData({
            title: '',
            name: '',
            phone: '',
            email: '',
            institute: '',
            country: '',
            registrationType: '',
            presentationType: '',
            guests: 0,
            nights: 1,
            accompanyingPerson: false,
            extraNights: 0,
            captcha: '',
        });
        generateCaptcha();
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-8">
                            <h1 className="text-3xl font-bold text-white text-center">
                                Nursing Summit 2026 Registration
                            </h1>
                            <p className="text-teal-100 text-center mt-2">
                                Join us in Prague for the premier nursing conference
                            </p>
                        </div>
                        <div className="px-6 py-8">
                            <Register
                                captchaCode={captchaCode}
                                generateCaptcha={generateCaptcha}
                                setRegisterFormData={setRegisterFormData}
                                registerFormData={registerFormData}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <FooterSection />
        </>
    );
};

export default RegistrationPage;