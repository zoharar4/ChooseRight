import { useNavigate } from "react-router"

export function CTABanner({ content }) {
    const navigate = useNavigate()
    const { h, p, btns } = content

    return (
        <section className="cta-banner">
            <div className="container">
                <h2>{h}</h2>
                <p>{p}</p>
                <div className="cta-banner-btns">
                    {btns.map(({ txt, nav }, idx) => (
                        <button className={`${!idx ? 'btn-primary' : 'btn-outline'}`} onClick={() => navigate(nav)}>{txt}</button>
                    ))}
                </div>
            </div>
        </section>
    )
}