import React from 'react';

const Skills = ({ data }) => {
  return (
    <div className="rounded-3xl bg-card-light dark:bg-card-dark p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800 h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20 text-orange-600">
          <span className="material-symbols-outlined">{data.skills.icon}</span>
        </div>
        <h3 className="text-xl font-bold">Tech Arsenal</h3>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {data.skills.categories.map((category, index) => (
          <div key={index}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              {category.name}
            </h4>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium hover:bg-primary hover:text-white transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;