const topics = [
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

const TopicsSection = () => {
  return (
    <section id="agenda" className="py-20" style={{ backgroundColor: "#EDF4FB" }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div
          className="text-center mb-16"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h2 className="text-4xl font-bold text-nursing-primary mb-4">Conference Topics</h2>
          <p className="text-xl text-nursing-text max-w-2xl mx-auto">
            Explore cutting-edge topics across all nursing specialties and practice areas.
          </p>
        </div>

        {/* Grid of Topics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topics.map((topic, index) => (
            <div
              key={index}
              data-aos="flip-up"
              data-aos-delay={index * 60}
              className="flex items-center gap-4 bg-white rounded-xl py-4 px-5 border border-nursing-accent/10 shadow-sm hover:shadow-md hover:bg-nursing-accent/10 transition duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-nursing-accent/10 text-nursing-accent text-base sm:text-lg font-semibold">
                {index + 1}
              </div>
              <span className="text-nursing-text text-sm sm:text-base font-medium">{topic}</span>
            </div>
          ))}
        </div>

        {/* Agenda Highlights */}
        <div
          className="text-center mt-20"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="bg-white border border-nursing-primary/10 p-10 rounded-2xl shadow-md max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-nursing-text mb-6">
              Conference Agenda Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left text-nursing-text-light text-base">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎤</span>
                <span>Inspiring keynote presentations from  nursing leaders</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💬</span>
                <span>Interactive panel discussions on current healthcare challenges</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🛠️</span>
                <span>Hands-on workshops on nursing innovation and best practices</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤝</span>
                <span>Networking sessions with international nursing professionals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
