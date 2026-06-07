import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import type { ContentData } from "../types/content";

const SCROLL_AMOUNT = 320;
const SCROLL_THRESHOLD = 10;
const AUTO_SCROLL_INTERVAL_MS = 3000;

interface ProjectsCarouselProps {
  data: ContentData;
}

type ScrollDirection = "left" | "right";

const ProjectsCarousel = ({ data }: ProjectsCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = useCallback((direction: ScrollDirection) => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

      if (direction === "right") {
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - SCROLL_THRESHOLD;
        if (isAtEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
        }
      } else {
        const isAtStart = scrollLeft <= SCROLL_THRESHOLD;
        if (isAtStart) {
          scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - SCROLL_THRESHOLD;

        if (isAtEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scroll("right");
        }
      }
    }, AUTO_SCROLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isPaused, scroll]);

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
            <span className="material-symbols-outlined text-sm">arrow_back</span>
          </button>
          <button
            onClick={() => scroll("right")}
            className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-2 px-2"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {data.projects.map((project) => {
          const cardContent = (
            <>
              <div className="relative h-40 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${project.image}')` }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-2xl">
                    {project.slug ? "article" : "open_in_new"}
                  </span>
                </div>
                {project.slug && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                    <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>edit_note</span>
                    Read
                  </div>
                )}
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
            </>
          );

          const cardClass =
            "snap-start shrink-0 w-[300px] group rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300";

          if (project.slug) {
            return (
              <Link
                key={project.id}
                to={`/blog/${project.slug}`}
                className={cardClass}
              >
                {cardContent}
              </Link>
            );
          }

          return (
            <a
              key={project.id}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cardClass}
            >
              {cardContent}
            </a>
          );
        })}
        <div className="snap-start shrink-0 w-4" />
      </div>
    </div>
  );
};

export default ProjectsCarousel;
