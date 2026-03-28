
import postDefault from "../assets/images/post_default.png"
export function ImageBasic({ src, alt }) {


    return (
        <img src={src || postDefault} onError={(ev) => { ev.target.onerror = null; ev.target.src = postDefault }} alt={alt} loading="lazy" />
    )
}