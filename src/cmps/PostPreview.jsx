import { utilService } from "../services/util.service";
import { useNavigate } from "react-router"

import blogDefault from "../assets/images/blog_default.png"

export function PostPreview({ post }) {

    const navigate = useNavigate()

    return (
        <article onClick={() => navigate(post._id)} className="post-card">

            <div className="post-image">
                <img src={post.imageUrl || blogDefault} alt={post.title} />
            </div>

            <div className="post-content">

                <div className="post-meta">
                    <p className="post-date">
                        {utilService.getTimeStamp(post.createdAtTimestamp, false)}
                    </p>

                    <div className="post-views-share">
                        <div className="post-views">
                            <div className="views-num">{post.views}</div>
                            <i className="fa-regular fa-eye" style={{color: "rgb(255, 255, 255)"}}></i></div>

                        <button className="post-share">
                            <i className="fa-solid fa-share" style={{color: "rgb(255, 255, 255)"}}></i>
                        </button>
                    </div>
                </div>

                <div className="post-text">
                    <h2 className="post-title">
                        {post.title}
                    </h2>

                    <p className="post-preview">
                        {post.previewContent}
                    </p>
                </div>

            </div>

        </article>
    )
}