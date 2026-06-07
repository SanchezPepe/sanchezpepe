import { HashRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Experience from './components/Experience'
import ProjectsCarousel from './components/ProjectsCarousel'
import Certifications from './components/Certifications'
import Languages from './components/Languages'
import Education from './components/Education'
import Footer from './components/Footer'
import BlogPost from './components/BlogPost'
import { useDarkMode } from './hooks/useDarkMode'
import contentData from './data/content.json'
import type { ContentData } from './types/content'
import './App.css'

const typedContentData = contentData as ContentData

function Portfolio({ isDark, toggleDarkMode }: { isDark: boolean; toggleDarkMode: () => void }) {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-3 lg:mb-4">
        <Hero data={typedContentData} isDark={isDark} toggleDarkMode={toggleDarkMode} />
      </div>

      <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 mb-3 lg:mb-4">
        <div className="w-full lg:w-1/2 flex flex-col gap-3 lg:gap-4">
          <Experience data={typedContentData} />
          <Languages data={typedContentData} />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-3 lg:gap-4">
          <Education data={typedContentData} />
          <Certifications data={typedContentData} />
          <ProjectsCarousel data={typedContentData} />
        </div>
      </div>

      <Footer data={typedContentData} />
    </main>
  )
}

function App() {
  const { isDark, toggleDarkMode } = useDarkMode()

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Portfolio isDark={isDark} toggleDarkMode={toggleDarkMode} />} />
        <Route
          path="/blog/:slug"
          element={<BlogPost data={typedContentData} isDark={isDark} toggleDarkMode={toggleDarkMode} />}
        />
      </Routes>
    </HashRouter>
  )
}

export default App
