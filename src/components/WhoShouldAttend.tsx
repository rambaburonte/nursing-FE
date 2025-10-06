const attendees = [
  {
    title: "Nurse Leaders",
    description: "Chief Nursing Officers, Nursing Directors, and Department Heads",
    icon: "👥",
  },
  {
    title: "Nurse Educators",
    description: "Faculty, Clinical Instructors, and Academic Administrators",
    icon: "👩‍🏫",
  },
  {
    title: "ICU Nurses",
    description: "Critical Care Specialists and Emergency Department Nurses",
    icon: "🏥",
  },
  {
    title: "Public Health Nurses",
    description: "Community Health Advocates and Population Health Specialists",
    icon: "🌍",
  },
  {
    title: "Nursing Innovators",
    description: "Researchers, Technology Pioneers, and Practice Innovators",
    icon: "🔬",
  },
  {
    title: "Advanced Practice Nurses",
    description: "Nurse Practitioners, Clinical Specialists, and Nurse Anesthetists",
    icon: "⚕️",
  },
];

const WhoShouldAttend = () => {
  return (
    <section className="py-20" style={{ backgroundColor: "#FFF3F6" }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-nursing-text mb-4 leading-snug">
            Who Should Attend
          </h2>
          <p className="text-xl text-nursing-text-light max-w-2xl mx-auto">
            This summit is designed for nursing professionals across all specialties and career stages.
          </p>
        </div>

        {/* Attendees Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {attendees.map((attendee, index) => (
            <div
              key={index}
              className="group relative rounded-2xl p-[2px] bg-gradient-to-tr from-[#D1E8FF] to-[#FFF] transition-transform duration-300 hover:scale-[1.03] shadow-sm hover:shadow-xl"
            >
              {/* Inner white card with padding */}
              <div className="rounded-[14px] bg-white p-8 text-center h-full">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center text-3xl rounded-full bg-nursing-accent/10 text-nursing-primary transform transition-transform duration-300 group-hover:scale-110">
                  {attendee.icon}
                </div>
                <h3 className="text-xl font-semibold text-nursing-text mb-2">
                  {attendee.title}
                </h3>
                <p className="text-sm text-nursing-text-light leading-relaxed">
                  {attendee.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoShouldAttend;
