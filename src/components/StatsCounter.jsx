// src/components/StatsCounter.jsx
import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FaUserTie, FaCalendarAlt, FaCalendarCheck, FaUsers } from 'react-icons/fa';
import '../assets/css/StatsCounter.css'; 

const stats = [
  {
    icon: <FaUserTie />,
    end: 21,
    label: 'Best Speaker',
  },
  {
    icon: <FaCalendarAlt />,
    end: 84,
    label: 'Ideal Event',
  },
  {
    icon: <FaCalendarCheck />,
    end: 28,
    label: 'New Schedule',
  },
  {
    icon: <FaUsers />,
    end: 42,
    label: 'Participants',
  },
];

const StatsCounter = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="stats-section text-white my-5" ref={ref} >
      <div className="container d-flex justify-content-between flex-wrap gap-4">
        {stats.map((item, index) => (
          <div key={index} className="stat-box text-center flex-grow-1">
            <div className="stat-icon mb-3">{item.icon}</div>
            <h2 className="stat-count">
              {inView && <CountUp end={item.end} duration={2} />}+
            </h2>
            <p className="stat-label">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCounter;
