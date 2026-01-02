
import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

function ReportPage() {
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch('/assets/ml-project/docs/README.md')
            .then((res) => res.text())
            .then((text) => setContent(text));
    }, []);

    const transformImageUri = (src) => {
        // Map markdown paths to actual asset paths
        if (src.startsWith('red_wine/outputs/')) {
            return src.replace('red_wine/outputs/', '/assets/ml-project/images/red-wine/');
        }
        if (src.startsWith('white_wine/outputs/')) {
            return src.replace('white_wine/outputs/', '/assets/ml-project/images/white-wine/');
        }
        if (src.startsWith('combined_outputs/')) {
            return src.replace('combined_outputs/', '/assets/ml-project/images/combined/');
        }
        if (src.startsWith('combined_analysis/outputs/')) {
            return src.replace('combined_analysis/outputs/', '/assets/ml-project/images/combined/');
        }
        if (src.startsWith('score_prediction/outputs/')) {
            return src.replace('score_prediction/outputs/', '/assets/ml-project/images/score_prediction/');
        }
        if (src.startsWith('type_prediction/outputs/')) {
            return src.replace('type_prediction/outputs/', '/assets/ml-project/images/type_prediction/');
        }
        return src;
    };

    const [scrollProgress, setScrollProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [toc, setToc] = useState([]);
    const [activeId, setActiveId] = useState('');
    const sidebarRef = useRef(null);

    // Auto-scroll sidebar to active item
    useEffect(() => {
        if (activeId && sidebarRef.current) {
            const activeLink = sidebarRef.current.querySelector(`a[href="#${activeId}"]`);
            if (activeLink) {
                // simple scrollIntoView centered
                activeLink.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [activeId]);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
            setShowBackToTop(window.scrollY > 500);

            // Active ToC Item Detection
            const headers = document.querySelectorAll('h1, h2, h3');
            let currentActive = '';
            headers.forEach((header) => {
                if (window.scrollY >= header.offsetTop - 150) {
                    currentActive = header.id;
                }
            });
            if (currentActive) setActiveId(currentActive);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Extract ToC after content loads
    useEffect(() => {
        if (!content) return;
        // Small timeout to allow DOM validation
        const timer = setTimeout(() => {
            const headers = Array.from(document.querySelectorAll('.prose h1, .prose h2, .prose h3'))
                .map(header => ({
                    id: header.id,
                    text: header.innerText,
                    level: Number(header.tagName.charAt(1)),
                }))
                .filter(h => h.id); // Only keep headers with IDs
            setToc(headers);
        }, 300);
        return () => clearTimeout(timer);
    }, [content]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Pipeline Diagram Component
    const PipelineVisual = () => (
        <div className="my-12 p-8 rounded-2xl bg-white/5 border border-white/10 shadow-2xl overflow-x-auto">
            <h4 className="text-xl font-display text-wine-gold mb-8 text-center uppercase tracking-widest">Machine Learning Pipeline</h4>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 min-w-[600px]">
                {/* Step 1 */}
                <div className="flex flex-col items-center gap-3 group">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-wine-red to-black flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-2xl">💾</span>
                    </div>
                    <span className="text-sm font-mono text-gray-400">Load Data</span>
                </div>
                {/* Arrow */}
                <div className="h-[2px] w-8 bg-white/20 md:w-full md:flex-1 relative">
                    <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-white/20 rotate-45"></div>
                </div>
                {/* Step 2 */}
                <div className="flex flex-col items-center gap-3 group">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-tech-purple to-black flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-2xl">✂️</span>
                    </div>
                    <span className="text-sm font-mono text-gray-400">Split (80/20)</span>
                </div>
                {/* Arrow */}
                <div className="h-[2px] w-8 bg-white/20 md:w-full md:flex-1 relative">
                    <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-white/20 rotate-45"></div>
                </div>
                {/* Step 3 */}
                <div className="flex flex-col items-center gap-3 group">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-900 to-black flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-2xl">🧹</span>
                    </div>
                    <span className="text-sm font-mono text-gray-400">Clean (Train)</span>
                </div>
                {/* Arrow */}
                <div className="h-[2px] w-8 bg-white/20 md:w-full md:flex-1 relative">
                    <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-white/20 rotate-45"></div>
                </div>
                {/* Step 4 */}
                <div className="flex flex-col items-center gap-3 group">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-900 to-black flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-2xl">⚖️</span>
                    </div>
                    <span className="text-sm font-mono text-gray-400">Scale</span>
                </div>
                {/* Arrow */}
                <div className="h-[2px] w-8 bg-white/20 md:w-full md:flex-1 relative">
                    <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-white/20 rotate-45"></div>
                </div>
                {/* Step 5 */}
                <div className="flex flex-col items-center gap-3 group">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-wine-gold to-black flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                        <span className="text-2xl">🧠</span>
                    </div>
                    <span className="text-sm font-mono text-wine-gold font-bold">Model</span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-tech-dark text-gray-300 font-sans selection:bg-tech-purple selection:text-white pb-20 relative">

            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-[60]">
                <div
                    className="h-full bg-gradient-to-r from-wine-gold to-tech-purple transition-all duration-100 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-tech-dark/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-white hover:text-tech-purple transition-colors">
                    <FiArrowLeft className="text-xl" />
                    <span className="font-semibold tracking-wide">Back to Presentation</span>
                </Link>
                <div className="text-sm text-gray-500 font-mono hidden md:block">FINAL_PROJECT_REPORT.md</div>
            </nav>

            <div className="max-w-[1400px] mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Fixed Sidebar ToC (Desktop only) */}
                    <div ref={sidebarRef} className="fixed top-28 left-8 w-64 hidden lg:block z-40 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-tech-purple/50">
                        <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 px-4">Contents</h5>
                        <nav className="flex flex-col space-y-1">
                            {toc.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    className={`
                                        block py-2 px-4 text-sm transition-all duration-300 border-l-2
                                        ${activeId === item.id
                                            ? 'border-tech-purple text-tech-purple bg-tech-purple/5 font-medium translate-x-1'
                                            : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-700'}
                                        ${item.level === 3 ? 'ml-4 text-xs' : ''}
                                    `}
                                >
                                    {item.text}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Spacer Column (keeps main content pushed right) */}
                    <aside className="hidden lg:block lg:col-span-3"></aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        <article className="prose prose-invert prose-lg max-w-none break-words
                  prose-headings:font-display prose-headings:font-bold prose-headings:tracking-wide prose-headings:scroll-mt-32
                  
                  prose-h1:text-3xl sm:prose-h1:text-5xl lg:prose-h1:text-6xl prose-h1:leading-snug prose-h1:mb-12 prose-h1:text-transparent prose-h1:bg-clip-text prose-h1:bg-gradient-to-r prose-h1:from-wine-gold prose-h1:via-white prose-h1:to-tech-purple
                  
                  prose-h2:text-2xl sm:prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:text-white prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-white/10
                  
                  prose-h3:text-xl md:prose-h3:text-2xl prose-h3:text-tech-blue prose-h3:mt-10 prose-h3:mb-4 prose-h3:font-normal
                  
                  prose-p:text-gray-300 prose-p:text-base sm:prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
                  
                  prose-li:text-gray-300 prose-li:text-base sm:prose-li:text-lg prose-li:marker:text-tech-purple
                  
                  prose-strong:text-white prose-strong:font-bold
                  
                  prose-a:text-tech-blue prose-a:no-underline hover:prose-a:text-tech-purple hover:prose-a:underline transition-colors
                  
                  prose-blockquote:border-l-4 prose-blockquote:border-wine-gold prose-blockquote:bg-gradient-to-r prose-blockquote:from-wine-gold/10 prose-blockquote:to-transparent prose-blockquote:px-6 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:italic prose-blockquote:text-wine-white prose-blockquote:not-italic
                  
                  prose-code:text-wine-gold prose-code:bg-black/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:border prose-code:border-white/10
                  
                  prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-white/10 prose-img:my-8 prose-img:w-full
                  ">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkMath]}
                                rehypePlugins={[rehypeRaw, rehypeKatex, rehypeSlug]}
                                components={{
                                    img: ({ node, src, ...props }) => (
                                        <img
                                            src={transformImageUri(src)}
                                            {...props}
                                            className="w-full h-auto rounded-xl shadow-2xl border border-white/10 hover:shadow-tech-purple/20 transition-all duration-500"
                                        />
                                    ),
                                    table: ({ node, children, ...props }) => (
                                        <div className="overflow-x-auto my-8 rounded-xl border border-white/10 shadow-lg bg-white/5">
                                            <table {...props} className="w-full text-left border-collapse text-sm min-w-max">
                                                {children}
                                            </table>
                                        </div>
                                    ),
                                    blockquote: ({ node, children, ...props }) => {
                                        // Detect if this is the Pipeline block
                                        // The AST node for the pipeline blockquote will have paragraph children containing the text.
                                        // We can check the node itself.
                                        // Or better, checking the raw text content of the children if practical.

                                        // Robust check: Flatten children to string
                                        const getText = (child) => {
                                            if (typeof child === 'string') return child;
                                            if (Array.isArray(child)) return child.map(getText).join('');
                                            if (child?.props?.children) return getText(child.props.children);
                                            return '';
                                        };
                                        const textContent = getText(children);

                                        if (textContent.includes("Pipeline") && textContent.includes("Load Data")) {
                                            return <PipelineVisual />;
                                        }

                                        return <blockquote {...props}>{children}</blockquote>;
                                    },
                                    tr: ({ node, children, ...props }) => {
                                        // Check if this row is the "Detailed" Optimal row
                                        // Using AST node traversal is safer than React Children for content check
                                        const rowText = node?.children?.map(td =>
                                            td.children?.map(child => child.value || '').join('')
                                        ).join(' ') || '';

                                        // Check for key identifying text from the specific row
                                        if (rowText.includes("Optimal") && rowText.includes("Realistic imbalance")) {
                                            return <tr {...props} className="bg-wine-gold/10 shadow-[inset_0_0_20px_rgba(212,175,55,0.1)] border-l-2 border-wine-gold transition-all hover:bg-wine-gold/20 backdrop-blur-sm">{children}</tr>;
                                        }
                                        return <tr {...props} className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">{children}</tr>
                                    },
                                    p: ({ node, children, ...props }) => {
                                        // Pipeline interception
                                        // The pipeline in MD is inside a blockquote: > **Pipeline:** 
                                        // But let's see if we can catch it here or in blockquote.
                                        // Actually, let's just REPLACE the pipeline text in MD with a custom component placeholder <PipelineVisual /> 
                                        // and use rehype-raw to render it? No, react-markdown won't render React components from HTML string.

                                        // Best way: Map a specific paragraph text to the component.
                                        const text = String(children?.[0] || '');
                                        if (Array.isArray(children)) {
                                            // Deep check
                                        }

                                        return <p {...props}>{children}</p>;
                                    }
                                }}
                            >
                                {content}
                            </ReactMarkdown>

                            {/* Injected Pipeline Visual - manual placement if component replacement is too hard? 
                                No, we want it in flow. 
                                Strategy: We will replace the Markdown Pipeline text with a unique string like ":::PIPELINE_VISUAL:::"
                                and then write a custom remark plugin OR just a custom component for 'p' that checks for strictly that string.
                            */}
                        </article>
                    </main>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 p-4 bg-line-gold bg-wine-gold text-black rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-50 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
                aria-label="Back to Top"
            >
                <FiArrowLeft className="text-xl rotate-90" />
            </button>
        </div>
    );
}

export default ReportPage;
