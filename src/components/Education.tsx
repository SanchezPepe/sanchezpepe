import type { ContentData } from "../types/content";

interface EducationProps {
	data: ContentData;
}

const Education = ({ data }: EducationProps) => {
  return (
    <div className="rounded-3xl bg-card-light dark:bg-card-dark p-6 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-primary">
          <span className="material-symbols-outlined">school</span>
        </div>
        <h3 className="text-xl font-bold">Education</h3>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary shadow-sm">
          <span className="material-symbols-outlined text-[24px]">
            {data.education.icon}
          </span>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 dark:text-white text-sm">
            {data.education.degree}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {data.education.institution}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {data.education.year}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Education;
