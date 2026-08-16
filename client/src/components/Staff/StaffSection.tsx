import React from 'react';
import { staffData } from '@/data/staffData';
import StaffCard from './StaffCard';

interface StaffSectionProps {
  id?: string;
  badgeTitle?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const StaffSection: React.FC<StaffSectionProps> = ({
  id = 'staff-administration',
  badgeTitle = 'Our Leadership',
  title = 'Staff Administration',
  subtitle = 'Meet the dedicated leadership team driving agricultural excellence and quality seed production at DERN SEED Company Ltd.',
  className = '',
}) => {
  return (
    <section id={id} className={`py-20 bg-gray-50 dark:bg-slate-900 transition-colors ${className}`}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-in-up">
          <div className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest mb-2">
            {badgeTitle}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Staff Grid - generated with .map() from static staffData */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {staffData.map((member) => (
            <StaffCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaffSection;
