import React from "react";

const Interests = ({ data }) => {
  return (
    <div className="rounded-3xl bg-card-light dark:bg-card-dark p-6 shadow-sm border border-gray-100 dark:border-gray-800 h-full">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/20 text-rose-600">
          <span className="material-symbols-outlined">interests</span>
        </div>
        <h3 className="text-xl font-bold">Interests</h3>
      </div>
      <div className="flex flex-col gap-4">
        {data.interests.map((interest) => (
          <div key={interest.id} className="flex items-center gap-3">
            <span className="text-2xl">{interest.emoji}</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {interest.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interests;
