import React from "react";

const Certifications = ({ data }) => {
  return (
    <div className="rounded-3xl bg-card-light dark:bg-card-dark p-6 shadow-sm border border-gray-100 dark:border-gray-800 h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/20 text-teal-600">
          <span className="material-symbols-outlined">verified</span>
        </div>
        <h3 className="text-xl font-bold">Certifications</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {data.certifications.map((cert) => {
          const CertWrapper = cert.link ? "a" : "div";
          const wrapperProps = cert.link
            ? {
                href: cert.link,
                target: "_blank",
                rel: "noopener noreferrer",
              }
            : {};

          return (
            <CertWrapper
              key={cert.id}
              {...wrapperProps}
              className="group rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 p-4 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${cert.iconBgColor} ${cert.iconColor} shadow-sm group-hover:scale-110 transition-transform`}
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {cert.icon}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-xs leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {cert.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 mt-1">{cert.date}</p>
                </div>
              </div>
            </CertWrapper>
          );
        })}
      </div>
    </div>
  );
};

export default Certifications;
