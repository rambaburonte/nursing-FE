import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import janeWatsonImage from "@/assets/speaker-jane-watson.jpg";
import thomasLeeImage from "@/assets/speaker-thomas-lee.jpg";
import lindaMatthewsImage from "@/assets/speaker-linda-matthews.jpg";

const SpeakersSection = () => {
  const speakers = [
    {
      name: "Dr. Jane Watson",
      title: "Chief Nursing Officer",
      institution: "Johns Hopkins Hospital",
      image: janeWatsonImage,
      bio: "Leading expert in nursing innovation and patient care excellence with over 25 years of experience.",
      link: "/speakers#jane-watson",
    },
    {
      name: "Dr. Thomas Lee",
      title: "Director of Nursing Research",
      institution: "Mayo Clinic",
      image: thomasLeeImage,
      bio: "Pioneering researcher in evidence-based nursing practice and healthcare quality improvement.",
      link: "/speakers#thomas-lee",
    },
    {
      name: "Prof. Linda Matthews",
      title: "Dean of Nursing",
      institution: "University of Toronto",
      image: lindaMatthewsImage,
      bio: "Renowned educator and advocate for advanced nursing practice and global health initiatives.",
      link: "/speakers#linda-matthews",
    },
  ];

  return (
    <section id="speakers" className="py-20 bg-[#4EB6B8]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Keynote Speakers</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Learn from world-renowned nursing leaders who are shaping the future of healthcare
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={`${index * 150}`}
              className="hover:scale-[1.03] transition-transform duration-300"
            >
              <Card className="text-center border-0 shadow-md hover:shadow-xl transition-shadow bg-white h-full rounded-2xl">
                <CardContent className="p-8">
                  <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-[6px] border-white shadow-inner shadow-nursing-primary/20 aspect-square bg-white">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-nursing-text mb-2">{speaker.name}</h3>
                  <p className="text-nursing-primary font-medium mb-1">{speaker.title}</p>
                  <p className="text-nursing-text-light mb-4">{speaker.institution}</p>
                  <p className="text-sm text-nursing-text-light leading-relaxed mb-4">{speaker.bio}</p>

                  <Link
                    to={speaker.link}
                    className="inline-flex items-center text-sm text-nursing-primary font-medium hover:underline hover:text-nursing-primary/90 transition"
                  >
                    Read more <ArrowUpRight size={16} className="ml-1" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

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
