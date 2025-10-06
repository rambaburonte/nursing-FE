import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Sponsors from "./Sponsors";


import {
  CalendarDays,
  Stethoscope,
  ClipboardList,
  GraduationCap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    number: "2 Days",
    label: "of Nursing Insight",
    icon: <CalendarDays className="w-8 h-8 text-nursing-accent" />,
    animate: false,
  },
  {
    number: 150,
    label: "Nursing Experts",
    icon: <Stethoscope className="w-8 h-8 text-nursing-accent" />,
    animate: true,
  },
  {
    number: 40,
    label: "Topics",
    icon: <ClipboardList className="w-8 h-8 text-nursing-accent" />,
    animate: true,
  },
  {
    number: "Earn",
    label: "CE/CME Credits",
    icon: <GraduationCap className="w-8 h-8 text-nursing-accent" />,
    animate: false,
  },
];


const ConferenceStats = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [expertCount, setExpertCount] = useState(0);
  const [topicsCount, setTopicsCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || hasAnimated) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setHasAnimated(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    let expertTarget = 150;
    let topicsTarget = 40;
    let expertStart = 0;
    let topicsStart = 0;
    const duration = 2200; // slower animation
    const frameRate = 24; // fewer frames per second for a smoother, slower effect
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      setExpertCount(Math.round((expertTarget * frame) / totalFrames));
      setTopicsCount(Math.round((topicsTarget * frame) / totalFrames));
      if (frame >= totalFrames) {
        setExpertCount(expertTarget);
        setTopicsCount(topicsTarget);
        clearInterval(interval);
      }
    }, 1000 / frameRate);
    return () => clearInterval(interval);
  }, [hasAnimated]);

  return (
    <section className="py-16 bg-[#EDF4FB]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1.5}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {stats.map((stat, index) => (
            <SwiperSlide key={index}>
              <div
                data-aos="zoom-in"
                data-aos-delay={index * 150}
                className="bg-white rounded-xl shadow-sm border border-nursing-accent/10 text-center p-8 mx-2 transition-transform hover:scale-105 hover:shadow-md border-b-[3px] border-b-nursing-primary"
              >
                <div className="mb-4">{stat.icon}</div>
                <div className="text-2xl font-bold text-nursing-text mb-1">
                  {stat.animate && index === 1
                    ? `${expertCount}+`
                    : stat.animate && index === 2
                    ? `${topicsCount}+`
                    : stat.number}
                </div>
                <div className="text-nursing-text-light text-sm">
                  {stat.label}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-16">
        <Sponsors />
      </div>
    </section>
  );
};

export default ConferenceStats;
