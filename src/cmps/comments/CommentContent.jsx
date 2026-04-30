import { useState } from "react"

export function CommentContent({ content = "אין תוכן לתגובה." }) {

    const [isExpanded, setIsExpanded] = useState(false)

    const limit = 220

    if (content.length <= limit) {
        return <p className="comment-content">{content}</p>
    }

    return (
        <p className="comment-content">
            {isExpanded ? content : content.slice(0, limit) + "... "}
            <button
                className="read-more-btn"
                onClick={() => setIsExpanded(prev => !prev)}
            >
                {isExpanded ? "פחות" : "עוד"}
            </button>
        </p>
    )
}