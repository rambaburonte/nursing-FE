import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/FooterSections";
import { Card, CardContent } from "@/components/ui/card";
import janeWatsonImage from "@/assets/speaker-jane-watson.jpg";
import thomasLeeImage from "@/assets/speaker-thomas-lee.jpg";
import lindaMatthewsImage from "@/assets/speaker-linda-matthews.jpg";

const speakers = [
    {
        name: "Dr. Jane Watson",
        title: "Chief Nursing Officer",
        institution: "Johns Hopkins Hospital",
        image: janeWatsonImage,
        bio: "Leading expert in nursing innovation and patient care excellence with over 25 years of experience.",
    },
    {
        name: "Dr. Thomas Lee",
        title: "Director of Nursing Research",
        institution: "Mayo Clinic",
        image: thomasLeeImage,
        bio: "Pioneering researcher in evidence-based nursing practice and healthcare quality improvement.",
    },
    {
        name: "Prof. Linda Matthews",
        title: "Dean of Nursing",
        institution: "University of Toronto",
        image: lindaMatthewsImage,
        bio: "Renowned educator and advocate for advanced nursing practice and global health initiatives.",
    },
];

const SpeakersPage = () => {
    return (
        <>
            <Header />

            <main className="bg-[#4EB6B8] min-h-screen py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Keynote Speakers</h1>
                    <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                        Learn from world-renowned nursing leaders who are shaping the future of healthcare
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {speakers.map((speaker, index) => (
                            <Card
                                key={index}
                                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white"
                            >
                                <CardContent className="p-8">
                                    <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-nursing-accent">
                                        <img
                                            src={speaker.image}
                                            alt={speaker.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-bold text-nursing-text mb-2">{speaker.name}</h3>
                                    <p className="text-nursing-primary font-medium mb-1">{speaker.title}</p>
                                    <p className="text-nursing-text-light mb-4">{speaker.institution}</p>
                                    <p className="text-sm text-nursing-text-light leading-relaxed">{speaker.bio}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default SpeakersPage;
