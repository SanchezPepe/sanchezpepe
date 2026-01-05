import React from "react";

const FunStats = ({ data }) => {
  return (
    <div className="rounded-3xl bg-card-light dark:bg-card-dark p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20 text-amber-600">
          <span className="material-symbols-outlined">bar_chart</span>
        </div>
        <h3 className="text-xl font-bold">Quick Stats</h3>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {data.funStats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
          >
            <span className="text-2xl mb-1">{stat.emoji}</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </span>
            <span className="text-[10px] text-gray-500 text-center leading-tight">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunStats;
