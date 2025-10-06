import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Footer from "@/components/FooterSections";

const agenda = {

  "Day 1": {
    date: "May 15 2026",
    sessions: [
      {
        time: "09:00 - 10:00",
        title: "Keynote: Digital Health Transformation",
        description: "Leveraging AI and telehealth in nursing",
        speaker: "Prof. Susan Lee, Harvard Medical School",
      },
      {
        time: "10:00 - 11:30",
        title: "Panel: Patient-Centered Care",
        description: "Redefining care through empathy and innovation",
        speaker: " patient advocacy leaders",
      },
      {
        time: "11:30 - 12:00",
        title: "Coffee Break",
        description: "Networking opportunity",
      },
      {
        time: "12:00 - 13:00",
        title: "Session: Mental Health Nursing",
        description: "Strategies to support mental well-being in care environments",
        speaker: "Dr. Anita Kurian, University of Toronto",
      },
      {
        time: "13:00 - 14:00",
        title: "Lunch Break",
        description: "Networking lunch",
      },
      {
        time: "14:00 - 15:30",
        title: "Workshop: Evidence-Based Practice",
        description: "Improving clinical outcomes through research",
        speaker: "Dr. Thomas Ravi, Johns Hopkins",
      },
      {
        time: "15:30 - 16:30",
        title: "Tech Demo: Smart Monitoring Devices",
        description: "Live demonstration of digital health tools",
        speaker: "Startup Showcase",
      },
    ],
  },
  "Day 2": {
    date: "May 16, 2026",
    sessions: [
      {
        time: "09:00 - 10:30",
        title: "Keynote:  Health Equity",
        description: "Addressing disparities in nursing care across regions",
        speaker: "Dr. Fatima Noor, WHO Geneva",
      },
      {
        time: "10:30 - 11:00",
        title: "Coffee Break",
        description: "Networking opportunity",
      },
      {
        time: "11:00 - 12:30",
        title: "Panel: Future of Nursing Education",
        description: "Curriculum innovations for next-generation nurses",
        speaker: "Academic leaders from top universities",
      },
      {
        time: "12:30 - 13:30",
        title: "Lunch Break",
        description: "Networking lunch",
      },
      {
        time: "13:30 - 15:00",
        title: "Workshop: Community-Based Nursing",
        description: "Strategies for outreach and local health impact",
        speaker: "Dr. Lydia James, University of Nairobi",
      },
      {
        time: "15:00 - 16:00",
        title: "Closing Session: Reflections & Awards",
        description: "Wrap-up, feedback, and recognition of contributions",
        speaker: "Organizing Committee",
      },
    ],
  },
};

const ConferenceAgenda = () => {
  const [activeDay, setActiveDay] = useState("Day 1");
  const { date, sessions } = agenda[activeDay];

  return (
    <>
      <div className="bg-[#E6F4F1] min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-nursing-primary mb-2">Conference Agenda</h1>
          <p className="text-lg text-gray-700 mb-10">
            Explore our comprehensive program of events and sessions
          </p>

          {/* Day Selector */}
          <div className="inline-flex space-x-2 mb-6">
            {Object.keys(agenda).map((day) => (
              <Button
                key={day}
                variant={activeDay === day ? "default" : "outline"}
                onClick={() => setActiveDay(day)}
              >
                {day}
              </Button>
            ))}
          </div>

          {/* Agenda Display */}
          <Card className="shadow-lg p-6 bg-white text-left">
            <h2 className="text-lg font-semibold text-nursing-primary mb-4">
              {activeDay}: {date}
            </h2>
            {sessions.length === 0 ? (
              <p className="text-gray-600 text-sm">Agenda will be updated soon.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {sessions.map((session, idx) => (
                  <li
                    key={idx}
                    className="py-4 flex flex-col md:flex-row md:justify-between"
                  >
                    <div className="text-nursing-primary font-semibold md:w-1/5">
                      {session.time}
                    </div>
                    <div className="md:w-4/5">
                      <h3 className="font-medium text-gray-800">{session.title}</h3>
                      <p className="text-gray-600 text-sm">{session.description}</p>
                      {session.speaker && (
                        <p className="text-gray-500 text-xs italic mt-1">
                          Speaker: {session.speaker}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Download Option */}
          <div className="mt-6">
            <Button variant="default">Download Full Agenda</Button>
            <p className="mt-2 text-xs text-gray-500">
              * The agenda is subject to change. More sessions and speakers will be announced soon.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ConferenceAgenda;
