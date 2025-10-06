import Header from "@/components/Header";
import ConferenceHero from "@/components/ConferenceHero";
import ConferenceStats from "@/components/ConferenceStats";
import SpeakersSection from "@/components/SpeakersSection";
import AboutSection from "@/components/AboutSection";
import WhoShouldAttend from "@/components/WhoShouldAttend";
import TopicsSection from "@/components/TopicsSection";
import SponsorsSection from "@/components/SponsorsSection";
import FooterSection from "@/components/FooterSections";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <ConferenceHero />
      <ConferenceStats />
      <AboutSection />
      <SpeakersSection />
      <WhoShouldAttend />
      <TopicsSection />
      <SponsorsSection />
      {/* <FooterSection /> */}
    </div>
  );
};

export default Index;
