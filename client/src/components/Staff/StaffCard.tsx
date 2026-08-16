import React, { useState } from 'react';
import { User, Quote } from 'lucide-react';
import type { StaffMember } from '@/data/staffData';

interface StaffCardProps {
  member: StaffMember;
  className?: string;
}

export const StaffCard: React.FC<StaffCardProps> = ({ member, className = '' }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={`bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-md hover:shadow-xl hover:border-green-500/50 dark:hover:border-green-500/50 transition-all duration-300 hover:-translate-y-1.5 ${className}`}
    >
      {/* Profile Photo */}
      <div className="relative mb-5 group">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-green-600 via-green-400 to-amber-400 shadow-lg">
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
            {!imageError ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <User className="w-14 h-14 text-green-700 dark:text-green-400" />
            )}
          </div>
        </div>
      </div>

      {/* Position Badge */}
      <div className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-50 dark:bg-green-950/60 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/60 mb-2.5">
        {member.position}
      </div>

      {/* Name */}
      <h3 className="text-xl sm:text-2xl font-bold font-poppins text-gray-900 dark:text-white mb-3 leading-snug">
        {member.name}
      </h3>

      {/* Professional Speech / Quote */}
      <div className="relative bg-gray-50 dark:bg-slate-900/60 rounded-xl p-4 border border-gray-100 dark:border-slate-700/60 w-full mb-3 flex-1 flex flex-col justify-center">
        <Quote className="w-4 h-4 text-green-600 dark:text-green-400 mb-1 opacity-70" />
        <p className="text-sm italic text-gray-700 dark:text-gray-300 leading-relaxed">
          &ldquo;{member.speech}&rdquo;
        </p>
      </div>

      {/* Additional Professional Information (if present) */}
      {member.additionalInfo && (
        <p className="text-xs text-gray-600 dark:text-gray-400 text-left bg-green-50/50 dark:bg-slate-900/30 rounded-lg p-3 border border-green-100/70 dark:border-slate-800 leading-relaxed">
          {member.additionalInfo}
        </p>
      )}
    </div>
  );
};

export default StaffCard;
