
import postDefault from "../assets/images/post_default.png"
export function ImageBasic({ src, alt, className }) {


    return (
        <img src={src || postDefault}
            onError={(ev) => { ev.target.onerror = null; ev.target.src = postDefault }}
            alt={alt}
            loading="lazy"
            className={`blur-load ${className ? className : ''}`}
            onLoad={(e) => e.currentTarget.classList.add("loaded")} />
    )
}