import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import ProjectsCarousel from './components/ProjectsCarousel';
import CertificationsCarousel from './components/CertificationsCarousel';
import Languages from './components/Languages';
import Education from './components/Education';
import Footer from './components/Footer';
import { useDarkMode } from './hooks/useDarkMode';
import contentData from './data/content.json';
import './App.css'

function App() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <>
      <Header isDark={isDark} toggleDarkMode={toggleDarkMode} data={contentData} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-3 lg:mb-4">
          <Hero data={contentData} />
        </div>

        {/* Main Content: Experience (left) + Right column stack */}
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 mb-3 lg:mb-4">
          <div className="w-full lg:w-1/2">
            <Experience data={contentData} />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-3 lg:gap-4">
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
              <div className="w-full lg:w-1/2">
                <Education data={contentData} />
              </div>
              <div className="w-full lg:w-1/2">
                <Languages data={contentData} />
              </div>
            </div>
            <CertificationsCarousel data={contentData} />
            <ProjectsCarousel data={contentData} />
          </div>
        </div>

        <Footer data={contentData} />
      </main>
    </>
  )
}

export default App