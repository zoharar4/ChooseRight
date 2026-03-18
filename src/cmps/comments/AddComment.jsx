import { useState } from "react"
import { Loading } from "../Loading"

export function AddComment({ onSubmit, onCancel, isReply }) {

    const [isLoading, setIsLoading] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const [comment, setComment] = useState({ name: "", content: "" })

    function handleChange({ target }) {
        const { name, value } = target
        setComment(prev => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        if (isLoading || isSent) return
        if (!comment.name.trim() || !comment.content.trim()) return

        setIsLoading(true)
        await onSubmit(comment)
        setIsLoading(false)
        setIsSent(true)
    }

    return (
        <div className="add-comment slide-open">
            <h3>הוסף תגובה</h3>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="שם"
                    value={comment.name}
                    onChange={handleChange}
                />

                <textarea
                    name="content"
                    placeholder="כתוב תגובה..."
                    value={comment.content}
                    onChange={handleChange}
                />

                <button type="submit" className="send-btn" disabled={isLoading || isSent}>שלח תגובה</button>
                <button type="button" className="cancel-btn" onClick={() => { onCancel() }} >
                    ביטול
                </button>

                {(isLoading || isSent) &&
                    <div className={`overlay-comment-form`} >
                        {isSent ?
                            <i className="fa-solid fa-check fa-2xl" style={{ color: "rgb(47, 192, 47)", fontSize: '50px' }}></i> :
                            <Loading isTxt={false} />
                        }
                    </div>
                }
            </form>

        </div>
    )
}
