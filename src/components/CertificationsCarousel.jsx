import React, { useRef, useEffect, useState } from "react";

const CertificationsCarousel = ({ data }) => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollAmount = 200;

      if (direction === "right") {
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;
        if (isAtEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({
            left: scrollAmount,
            behavior: "smooth",
          });
        }
      } else {
        const isAtStart = scrollLeft <= 10;
        if (isAtStart) {
          scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({
            left: -scrollAmount,
            behavior: "smooth",
          });
        }
      }
    }
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;

        if (isAtEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scroll("right");
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="rounded-3xl bg-card-light dark:bg-card-dark p-6 shadow-sm border border-gray-100 dark:border-gray-800 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-900/20 text-teal-600">
            <span className="material-symbols-outlined">verified</span>
          </div>
          <h3 className="text-xl font-bold">Certifications</h3>
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
          </button>
          <button
            onClick={() => scroll("right")}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide -mx-2 px-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
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
              className="snap-start shrink-0 w-[180px] group rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 p-4 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
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
        <div className="snap-start shrink-0 w-2"></div>
      </div>
    </div>
  );
};

export default CertificationsCarousel;
