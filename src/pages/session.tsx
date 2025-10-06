import React from "react";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/FooterSections";

const topicsLeft = [
    "Nursing Education",
    "Pediatric Nursing",
    "Oncology Nursing",
    "Midwifery",
    "Geriatric Nursing",
    "Psychiatric Nursing",
    "Emergency & Trauma Nursing",
    "Surgical Nursing",
    "Women’s Health Nursing",
    "Cardiac Nursing",
    "Pain Management",
    "Community Health Nursing",
];

const topicsRight = [
    "Neonatal Nursing",
    "Critical Care Nursing",
    "Nursing Informatics",
    "Infection Control",
    "Nursing Ethics",
    "Disaster Nursing",
    "Mental Health Promotion",
    "Evidence-Based Practice",
    "Advanced Clinical Practice",
    "Chronic Illness Management",
    "Global Health Nursing",
    "Leadership in Nursing",
];

const NursingTopicsPage = () => {
    return (
        <>
            <Header />

            <section className="min-h-screen bg-[#F4FAF9] py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Hero Banner */}
                    <div
                        className="relative h-[300px] md:h-[420px] rounded-3xl bg-cover bg-center shadow-2xl overflow-hidden mb-16"
                        style={{ backgroundImage: "url('/images/nursing-banner.jpg')" }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 flex items-center justify-center text-white text-center px-4">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                    Conference Topics
                                </h1>
                                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                                    Dive deep into the evolving frontiers of nursing education,
                                    clinical excellence, patient-centered care, and 
                                    innovations.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Topics List */}
                    <Card className="bg-white border border-gray-200 rounded-3xl shadow-lg p-10">
                        <h2 className="text-3xl font-bold text-center text-nursing-primary mb-10">
                            Topics Covered
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-4">
                            {[topicsLeft, topicsRight].map((list, colIndex) => (
                                <ul
                                    key={colIndex}
                                    className="space-y-4 text-base text-gray-700 list-disc list-inside"
                                >
                                    {list.map((topic, idx) => (
                                        <li
                                            key={idx}
                                            className="hover:text-nursing-accent transition duration-200"
                                        >
                                            {topic}
                                        </li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </Card>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default NursingTopicsPage;
