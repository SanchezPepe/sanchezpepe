import React, { useRef, useEffect, useState } from "react";

const ProjectsCarousel = ({ data }) => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const scrollAmount = 320;

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
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="rounded-3xl bg-card-light dark:bg-card-dark p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-gray-800 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600">
            <span className="material-symbols-outlined">rocket_launch</span>
          </div>
          <h3 className="text-xl font-bold">Projects</h3>
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
          </button>
          <button
            onClick={() => scroll("right")}
            className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-2 px-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {data.projects.map((project) => (
          <a
            key={project.id}
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="snap-start shrink-0 w-[300px] group rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300"
          >
            <div className="relative h-40 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${project.image}')` }}
              ></div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">
                  open_in_new
                </span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-base text-gray-900 dark:text-white mb-1.5 group-hover:text-primary transition-colors">
                {project.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
        <div className="snap-start shrink-0 w-4"></div>
      </div>
    </div>
  );
};

export default ProjectsCarousel;
