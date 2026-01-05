import React from "react";

const Languages = ({ data }) => {
  return (
    <div className="rounded-3xl bg-card-light dark:bg-card-dark p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600">
          <span className="material-symbols-outlined">translate</span>
        </div>
        <h3 className="text-xl font-bold">Languages</h3>
      </div>
      <div className="flex flex-col gap-6">
        {data.languages.map((language) => (
          <div key={language.id} className="space-y-2">
            <div className="flex justify-between items-center text-sm font-medium text-gray-900 dark:text-white">
              <span>{language.name}</span>
              <span className="text-xs text-primary font-bold bg-primary/10 px-2 py-0.5 rounded">
                {language.proficiency}
              </span>
            </div>
            <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${language.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Languages;
