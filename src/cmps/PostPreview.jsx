import { utilService } from "../services/util.service";
import { useNavigate } from "react-router"

import { ImageBasic } from "./ImageBasic";

export function PostPreview({ post, isHome, type }) {
    const navigate = useNavigate()

    return (
        <article onClick={() => navigate(`/${type}/${post._id}`)} className="post-card">

            <div className="post-image">
                <ImageBasic src={post.imageUrl?.[0]} alt={post.title} />
            </div>

            <div className="post-content">

                <div className="post-meta">
                    <p className="post-date">
                        {utilService.getTimeStamp(post.createdAtTimestamp, false)}
                    </p>
                    <div className="post-views-share">
                        <div className="post-views">
                            <div className="views-num">{post.views}</div>
                            <i className="fa-regular fa-eye"></i>
                        </div>

                        {/* {!isHome && <button className="post-share">
                            <i className="fa-solid fa-share"></i>
                        </button>} */}
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