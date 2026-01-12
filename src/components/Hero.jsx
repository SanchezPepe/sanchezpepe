import heroImage from "../assets/portrait2.jpg";
import Icon from "./Icon";
import DarkModeToggle from "./DarkModeToggle";

const Hero = ({ data, isDark, toggleDarkMode }) => {
  return (
    <>
      {/* Hero Text Tile */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 rounded-3xl bg-card-light dark:bg-card-dark p-6 sm:p-10 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col justify-center relative">
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 no-print">
          <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />
        </div>
        <div className="space-y-4 pr-14 sm:pr-0">
          {/* Name */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-gray-900 dark:text-white">
            José Sánchez <span className="text-primary">(Pepe)</span> <span className="text-lg text-gray-400 dark:text-gray-500" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic' }}>[{data.personal.phonetic}]</span>
          </h2>

          {/* One-liner */}
          <div className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl space-y-1">
            <p>Computer Engineer & Customer Engineer at Google Cloud.</p>
            <p>I help businesses figure out the cloud. The coffee helps me figure out everything else.</p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            {data.hero.buttons.map((button, index) => (
              <a
                key={index}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 dark:bg-gray-800 px-6 py-3 text-sm font-bold text-gray-900 dark:text-white transition-all hover:bg-primary hover:text-white"
                href={data.social_links[button.socialKey]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name={button.icon} className="h-[18px] w-[18px]" />
                {button.text}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Portrait Tile */}
      <div className="col-span-1 md:col-span-2 lg:col-span-1 h-full min-h-[300px] lg:min-h-auto relative rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 group">
        <img
          alt={data.personal.imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={heroImage}
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4 bg-black/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-center text-sm leading-relaxed mb-3">
            Why a penguin? No deep reason. Who doesn't like emperor penguins?
          </p>
          <div className="text-center">
            <a href="https://www.youtube.com/watch?v=q3uXXh1sHcI" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-blue-700 transition-colors">
              <span>▶</span> Evidence 🐧
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
