import { useNavigate } from "react-router"
import image1 from "../assets/images/image1.jpeg"
import { ImageBasic } from "../cmps/ImageBasic"
import { siteConfig } from "../services/site.config"
import { CTABanner } from "../cmps/CTABanner"

export function AboutPage() {
    const navigate = useNavigate()
    const { heroLables, paragraphs } = siteConfig

    return (
        <div className="about-page">

            {/* ── Hero ── */}
            <section className="about-hero hero-section">
                <div className="about-hero-inner container">
                    <div className="about-photo-wrap">
                        <ImageBasic src={image1} className="about-hero-img" />
                    </div>
                    <div className="about-intro">
                        <span className="hero-label">{heroLables.about}</span>
                        <h1>שלום, אני שמרית —<br />כאן כדי לעזור לכם לבחור את הדרך</h1>
                        <p>{paragraphs.aboutIntro1}</p>
                        <p>{paragraphs.aboutIntro2}</p>
                        <p>{paragraphs.aboutIntro3}</p>
                        <p>{paragraphs.aboutIntro4}</p>

                        <button className="btn-primary" onClick={() => navigate("/contact")}>בואו נדבר</button>
                    </div>
                </div>
            </section>

            {/* ── Philosophy ── */}
            <section className="about-philosophy">
                <div className="container">
                    <div className="section-header">
                        <div className="section-label">{heroLables.about2}</div>
                        <h2 className="section-title">{paragraphs.aboutPhilosophy.h2}</h2>
                    </div>
                    <div className="philosophy-grid">
                        {paragraphs.aboutPhilosophy.cards.map((card, idx) => (
                            <div key={idx} className="philosophy-card">
                                <div className="philosophy-icon">{card.icon}</div>
                                <h3>{card.h3}</h3>
                                <p>{card.txt}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Credentials ── */}
            <section className="about-credentials">
                <div className="container">
                    <p style={{maxWidth: "600px"}}>{paragraphs.aboutIntro5}</p>
                    <div className="about-cred-list">
                        {paragraphs.aboutCredList.map((txt, idx) => <div key={idx} className="about-cred-item"><span className="cred-check">✓</span> {txt}</div>)}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <CTABanner content={siteConfig.ctaTxt.about} />
        </div>
    )
}
