import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/FooterSections";
import { BASE_URL } from '../config';
const ContactPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                throw new Error("Something went wrong");
            }

            alert("Message sent successfully!");
            setForm({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            console.error(error);
            alert("Failed to send message. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />

            <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
                {/* Hero Section */}
                <div className="text-center py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
                    <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
                    <p className="text-lg">Get in touch with our team</p>
                </div>

                {/* Contact Info + Form */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6 py-16">
                    {/* Contact Info */}
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                            Contact Information
                        </h2>
                        <p className="mb-4">
                            <span className="font-medium text-gray-700">Address:</span>
                            <br />
                            The  Nursing Innovation & Leadership Summit
                            📍
                            Rome, Italy, Nursing Venue: Crowne Plaza Rome - St. Peter’s


                        </p>
                        <p className="mb-4">
                            <span className="font-medium text-gray-700">Email:</span>
                            <br />
                            <a
                                href="mailto:secretary@nursingmeet2026.com"
                                className="text-blue-600 underline"
                            >
                                secretary@nursingmeet2026.com
                            </a>
                        </p>
                        <p>
                            <span className="font-medium text-gray-700">Phone:</span>
                            <br />
                            <a
                                href="tel:+12345678900"
                                className="text-green-600 font-medium"
                            >
                               📞 +1 (716) 374-9009
                            </a>
                        </p>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                            Send us a Message
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block mb-1 font-medium text-gray-700">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    required
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="Subject of your message"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block mb-1 font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={5}
                                    required
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Your message here..."
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ContactPage;
