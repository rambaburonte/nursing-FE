
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "@/config";

interface Speaker {
  id?: string | number;
  name: string;
  title?: string;
  institution?: string;
  university?: string;
  image?: string;
  imageUrl?: string;
  bio?: string;
  link?: string;
  type?: string;
}


const API_URL = `${BASE_URL}/api/speakers/nursing`;
const placeholder = "";

const SpeakersSection = () => {
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
  if (speakers.length >= 6) gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6";
  else if (speakers.length === 5) gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";
  else if (speakers.length === 4) gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  else if (speakers.length === 3) gridCols = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  else if (speakers.length === 2) gridCols = "grid-cols-1 md:grid-cols-2";

  return (
    <section id="speakers" className="py-20 bg-[#4EB6B8]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Keynote Speakers</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Learn from world-renowned nursing leaders who are shaping the future of healthcare
          </p>
        </div>

        {/* Speaker Cards */}
        {error && <div className="text-red-500 text-center mb-6">{error}</div>}
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="flex justify-center mb-12">
            <div className="inline-grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {speakers.slice(0, 5).map((speaker, index) => (
              <div
                key={speaker.id || index}
                className="transition-transform duration-300"
              >
                <Card className="text-center border-0 shadow-md bg-white h-full rounded-2xl">
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
                    <p className="text-sm text-nursing-text-light leading-relaxed mb-4">{speaker.bio}</p>

                    {speaker.link && (
                      <Link
                        to={speaker.link}
                        className="inline-flex items-center text-sm text-nursing-primary font-medium hover:underline hover:text-nursing-primary/90 transition"
                      >
                        Read more <ArrowUpRight size={16} className="ml-1" />
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <Link
            to="/speakers"
            className="inline-flex items-center gap-2 bg-nursing-primary text-white text-sm font-medium px-6 py-3 rounded-full shadow hover:bg-nursing-primary/90 hover:shadow-lg transition"
          >
            View All Speakers <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
