import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-nursing-conference.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ConferenceHero = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // AOS setup
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleScroll = () => {
    const nextSection = document.getElementById("next-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E4D91]/80 via-black/20 to-[#4EB6B8]/90 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 z-10"></div>

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${heroImage})` }}
      ></div>

      {/* Text Content */}
      <div
        className="absolute z-20 inset-x-0 px-4 py-10 bg-black/40 backdrop-blur-sm sm:rounded-xl mx-auto max-w-5xl text-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-md text-white">
          The  Nursing Innovation & Leadership Summit
        </h1>

        <div className="flex items-center justify-center mb-4 text-lg text-white/90">
          <span className="mr-2">📍</span>
          <span>  Nursing Venue: Crowne Plaza Rome - St. Peter’s, Rome, Italy
            15-16, May 2026 </span>
        </div>

        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white/80">
          Empowering nursing professionals for the future of healthcare through innovation,
          collaboration, and leadership excellence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={handleRegisterClick}
            className="bg-gradient-to-r from-[#007BFF] to-[#00D4FF] hover:from-[#005ECF] hover:to-[#00B0D4] hover:scale-105 transition-transform duration-300 text-white px-6 py-4 text-lg rounded-full shadow-xl"
          >
            Register Now
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        onClick={handleScroll}
        className="absolute bottom-6 z-30 text-white text-2xl cursor-pointer animate-bounce"
        title="Scroll Down"
      >
        ⬇
      </div>
    </section>
  );
};

export default ConferenceHero;
