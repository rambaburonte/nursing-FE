const AboutSection = () => {
  return (
    <section className="py-20 bg-[#E8F6F3]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Heading */}
          <h2
            className="text-4xl font-bold text-nursing-text mb-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            About the Summit
          </h2>

          {/* Paragraphs */}
          <div
            className="text-lg text-nursing-text leading-relaxed space-y-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <p>
              The <strong> Nursing Innovation & Leadership Summit 2026</strong> brings together the world’s most
              influential <strong>nursing professionals</strong>, educators, researchers, and healthcare leaders to explore
              the future of <strong>nursing practice</strong> and healthcare delivery.
            </p>
            <p>
              This prestigious gathering fosters <strong>unprecedented collaboration</strong> among nurse educators,
              clinical researchers, and thought leaders who are pioneering <strong>transformative approaches</strong>
              to patient care, nursing education, and healthcare innovation.
            </p>
            <p>
              Join us as we shape the future of nursing through <strong>evidence-based practice</strong>,
              <strong> technological advancement</strong>, and <strong>visionary leadership</strong> that will define healthcare
              for generations to come.
            </p>
          </div>

          {/* Highlighted Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="w-16 h-16 bg-nursing-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌐</span>
              </div>
              <h3 className="font-bold text-nursing-text mb-2">Collaboration</h3>
              <p className="text-nursing-text-light">
                Connect with  nursing leaders and build lasting partnerships
              </p>
            </div>

            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="w-16 h-16 bg-nursing-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🧠</span>
              </div>
              <h3 className="font-bold text-nursing-text mb-2">Innovation</h3>
              <p className="text-nursing-text-light">
                Discover cutting-edge research and breakthrough technologies
              </p>
            </div>

            <div
              className="text-center"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <div className="w-16 h-16 bg-nursing-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎓</span>
              </div>
              <h3 className="font-bold text-nursing-text mb-2">Leadership</h3>
              <p className="text-nursing-text-light">
                Develop skills to lead transformational change in healthcare
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
