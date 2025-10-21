
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/config";
import Header from "@/components/Header";
import Footer from "@/components/FooterSections";
import { Card, CardContent } from "@/components/ui/card";
interface Speaker {
    id?: string | number;
    name: string;
    title?: string;
    institution?: string;
    university?: string;
    image?: string;
    imageUrl?: string;
    bio?: string;
    type?: string;
}

const API_URL = `${BASE_URL}/api/speakers/nursing`;
const placeholder = "";


const SpeakersPage = () => {
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSpeakers = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await axios.get(API_URL);
                setSpeakers(res.data);
            } catch (e) {
                setError("Failed to fetch speakers");
            }
            setLoading(false);
        };
        fetchSpeakers();
    }, []);

    // Dynamically determine grid columns based on speaker count
    let gridCols = "grid-cols-1";
    if (speakers.length >= 5) gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
    else if (speakers.length === 4) gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
    else if (speakers.length === 3) gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    else if (speakers.length === 2) gridCols = "grid-cols-1 md:grid-cols-2";

    return (
        <>
            <Header />
            <main className="bg-[#4EB6B8] min-h-screen py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Keynote Speakers</h1>
                    <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                        Learn from world-renowned nursing leaders who are shaping the future of healthcare
                    </p>

                    {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                    {loading ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        <div className={`grid ${gridCols} gap-10`}>
                            {speakers.map((speaker, index) => (
                                <Card
                                    key={speaker.id || index}
                                    className="text-center border-0 shadow-md bg-white"
                                >
                                    <CardContent className="p-8">
                                        <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-nursing-accent">
                                            {speaker.imageUrl && (
                                                <img
                                                    src={speaker.imageUrl}
                                                    alt={speaker.name}
                                                    className="w-full h-full object-cover rounded-full"
                                                    loading="lazy"
                                                    onError={e => (e.currentTarget.src = placeholder)}
                                                />
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold text-nursing-text mb-2">{speaker.name}</h3>
                                        <p className="text-nursing-primary font-medium mb-1">{speaker.title}</p>
                                        <p className="text-nursing-text-light mb-4">{speaker.university || speaker.institution}</p>
                                        <p className="text-sm text-nursing-text-light leading-relaxed">{speaker.bio}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default SpeakersPage;
