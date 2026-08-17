import React from 'react';
import { staffData } from '@/data/staffData';
import StaffCard from './StaffCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/i18n/i18n';

interface StaffSectionProps {
  id?: string;
  badgeTitle?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const StaffSection: React.FC<StaffSectionProps> = ({
  id = 'staff-administration',
  badgeTitle,
  title,
  subtitle,
  className = '',
}) => {
  const { t: tFn } = useLanguage();
  const resolvedBadge = badgeTitle ?? tFn('staff_badge_title');
  const resolvedTitle = title ?? tFn('staff_title');
  const resolvedSubtitle = subtitle ?? tFn('staff_subtitle');

  return (
    <section id={id} className={`py-20 bg-gray-50 dark:bg-slate-900 transition-colors ${className}`}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-in-up">
          <div className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest mb-2">
            {resolvedBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-poppins text-gray-900 dark:text-white mb-4">
            {resolvedTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            {resolvedSubtitle}
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
