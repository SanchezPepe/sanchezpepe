import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import mermaid from 'mermaid'
import type { ContentData } from '../types/content'
import DarkModeToggle from './DarkModeToggle'

function MermaidDiagram({ chart, isDark }: { chart: string; isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // mermaid.run() processes nodes in-place in the real DOM, which lets the
    // browser measure text and compute foreignObject dimensions correctly.
    // mermaid.render() (string-based) returns foreignObjects with width=0.
    mermaid.initialize({ startOnLoad: false, theme: isDark ? 'dark' : 'default' })
    el.removeAttribute('data-processed')
    el.textContent = chart
    mermaid.run({ nodes: [el] }).catch(() => { el.textContent = chart })
  }, [chart, isDark])

  return <div className="mermaid my-6 overflow-x-auto flex justify-center" ref={ref} />
}

const postModules = import.meta.glob('../data/posts/*.md', { query: '?raw', import: 'default' })

type Lang = 'en' | 'es'

function getSavedLang(): Lang {
  const saved = localStorage.getItem('blogLang')
  return saved === 'es' ? 'es' : 'en'
}

function estimateReadingTime(text: string): number {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200))
}

interface BlogPostProps {
  data: ContentData
  isDark: boolean
  toggleDarkMode: () => void
}

const BlogPost = ({ data, isDark, toggleDarkMode }: BlogPostProps) => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [lang, setLang] = useState<Lang>(getSavedLang)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)

  const project = data.projects.find(p => p.slug === slug)

  const hasLang = (l: Lang) => `../data/posts/${slug}.${l}.md` in postModules
  const showToggle = hasLang('en') && hasLang('es')

  function switchLang(l: Lang) {
    setLang(l)
    localStorage.setItem('blogLang', l)
  }

  useEffect(() => {
    setLoading(true)
    // Fall back to 'en' if the preferred lang doesn't exist for this post
    const activeLang = hasLang(lang) ? lang : 'en'
    const key = `../data/posts/${slug}.${activeLang}.md`
    const loader = postModules[key]
    if (loader) {
      loader().then(raw => {
        setContent(raw as string)
        setLoading(false)
      })
    } else {
      setContent('')
      setLoading(false)
    }
  }, [slug, lang]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-500">Post not found.</p>
        <button onClick={() => navigate('/')} className="text-primary hover:underline font-medium">
          ← Back to portfolio
        </button>
      </div>
    )
  }

  const readingTime = estimateReadingTime(content)

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors shrink-0"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
            Back
          </button>

          <span className="text-sm font-semibold text-gray-900 dark:text-white truncate hidden sm:block">
            {project.title}
          </span>

          <div className="flex items-center gap-2 shrink-0">
            {showToggle && (
              <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 text-xs font-bold">
                <button
                  onClick={() => switchLang('en')}
                  className={`px-2.5 py-1.5 transition-colors ${
                    lang === 'en'
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => switchLang('es')}
                  className={`px-2.5 py-1.5 transition-colors ${
                    lang === 'es'
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  ES
                </button>
              </div>
            )}
            <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map(tech => (
            <span
              key={tech}
              className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>schedule</span>
          <span>{readingTime} min read</span>
          {project.blogPublishedAt && (
            <>
              <span>·</span>
              <span>{project.blogPublishedAt}</span>
            </>
          )}
        </div>

        <div className="rounded-2xl overflow-hidden mb-10 w-full aspect-video bg-gray-100 dark:bg-gray-800">
          <img
            src={project.image}
            alt={project.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {loading ? (
          <div className="animate-pulse space-y-3">
            {[100, 100, 75, 100, 100, 60, 100, 85].map((w, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-0 mb-6 leading-tight">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4 pb-2 border-b border-gray-100 dark:border-gray-800">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-7 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-base sm:text-lg leading-8 text-gray-600 dark:text-gray-300 mb-5">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-5 space-y-2 text-gray-600 dark:text-gray-300">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-5 space-y-2 text-gray-600 dark:text-gray-300">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-base sm:text-lg leading-7">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-5 my-6 italic text-gray-500 dark:text-gray-400">
                  {children}
                </blockquote>
              ),
              code: ({ className, children }) => {
                if (className?.startsWith('language-')) {
                  return (
                    <code className={`font-mono text-sm text-gray-100 ${className}`}>
                      {children}
                    </code>
                  )
                }
                return (
                  <code className="font-mono text-sm bg-gray-100 dark:bg-gray-800 text-primary px-1.5 py-0.5 rounded">
                    {children}
                  </code>
                )
              },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              pre: ({ children, node }: any) => {
                const codeNode = node?.children?.[0]
                if (
                  codeNode?.type === 'element' &&
                  codeNode?.tagName === 'code' &&
                  codeNode?.properties?.className?.[0] === 'language-mermaid'
                ) {
                  const textNode = codeNode.children?.[0]
                  const chart = textNode?.type === 'text' ? String(textNode.value).trim() : ''
                  return <MermaidDiagram chart={chart} isDark={isDark} />
                }
                return (
                  <pre className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-5 overflow-x-auto my-6 text-sm leading-6">
                    {children}
                  </pre>
                )
              },
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium hover:underline"
                >
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
              ),
              hr: () => <hr className="border-gray-200 dark:border-gray-700 my-10" />,
              img: ({ src, alt }) => (
                <img src={src} alt={alt} className="rounded-2xl w-full my-6 shadow-sm" />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}

        {!loading && (
          <div className="mt-14 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-blue-700 transition-colors"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>open_in_new</span>
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>code</span>
                GitHub
              </a>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default BlogPost
