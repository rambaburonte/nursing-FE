import { Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const FooterSection = () => {
    const nursingOrgs = [
        "International Council of Nurses",
        "American Nurses Association",
        "Royal College of Nursing",
        "Canadian Nurses Association",
        "Australian College of Nursing",
        "European Federation of Nurses",
    ];

    return (
        <footer
            id="contact"
            className="text-gray-300 py-16"
            style={{ backgroundColor: "#0B2545" }}
        >
            <div className="container mx-auto px-4">
                {/* Top grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* About */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 text-white">
                             Nursing Summit 2026
                        </h3>
                        <p className="mb-4 leading-relaxed">
                            Empowering nursing professionals for the future of healthcare through innovation and leadership.
                        </p>
                        <div className="space-y-2 text-sm">
                            <p>📧 secretary@nursingmeet2026.com</p>
                            <p>📞 +1 (716) 374-9009</p>
                            <p>Nursing Venue: Crowne Plaza Rome - St. Peter’s,📍Rome, Italy</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/register" className="hover:underline hover:text-white transition-all">Registration</a>
                            </li>
                            <li>
                                <a href="/abstract-submission" className="hover:underline hover:text-white transition-all">Submit Abstract</a>
                            </li>
                            <li>
                                <a href="/agenda" className="hover:underline hover:text-white transition-all">Agenda</a>
                            </li>
                            <li>
                                <a href="/speakers" className="hover:underline hover:text-white transition-all">Speakers</a>
                            </li>
                            <li>

                            </li>
                        </ul>
                    </div>

                    {/* Important Dates */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white">Important Dates</h4>
                        <ul className="space-y-2 text-sm">
                            <li>📅 Early Bird: July 30, 2025 </li>
                            <li>📅 Abstract Deadline: January 25, 2026</li>
                            <li>📅 Standard Deadline: January 25, 2026</li>
                            <li>📅 Conference: May 15-16, 2026</li>
                        </ul>
                    </div>

                    {/* Social + Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 text-white">Stay Connected</h4>
                        <div className="flex items-center gap-4 text-white text-xl mb-6">
                            <a href="#" className="hover:text-white transition" aria-label="Facebook"><Facebook size={22} /></a>
                            <a href="#" className="hover:text-white transition" aria-label="Twitter"><Twitter size={22} /></a>
                            <a href="#" className="hover:text-white transition" aria-label="Instagram"><Instagram size={22} /></a>
                            <a href="#" className="hover:text-white transition" aria-label="LinkedIn"><Linkedin size={22} /></a>
                        </div>

                        {/* Newsletter Form removed as requested */}
                    </div>
                </div>

                {/* Divider and Bottom */}
                <div className="border-t border-gray-600 pt-8">
                    {/* Supporting Organizations */}
                    <div className="text-center mb-10">
                        <h4 className="text-lg font-bold text-white mb-4">
                            Supported by Leading Nursing Organizations
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-300">
                            {nursingOrgs.map((org, index) => (
                                <div key={index} className="text-center">{org}</div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Footer Links */}
                    <div className="text-center text-sm text-gray-400">
                        <p>&copy; 2026  Nursing Innovation & Leadership Summit. All rights reserved.</p>
                        <p className="mt-2 space-x-4">
                            <a href="#" className="hover:underline hover:text-white transition">Privacy Policy</a>
                            <span>|</span>
                            <a href="#" className="hover:underline hover:text-white transition">Terms of Service</a>
                            <span>|</span>
                            <a href="#" className="hover:underline hover:text-white transition">Contact Us</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
