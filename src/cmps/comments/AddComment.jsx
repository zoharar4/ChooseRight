import { useState } from "react"
import { Loading } from "../Loading"

export function AddComment({ onAddComment }) {
    const [isLoading, setIsLoading] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const [comment, setComment] = useState({ name: "", content: "" })

    function handleChange({ target }) {
        const { name, value } = target
        setComment(prev => ({ ...prev, [name]: value }))
    }

    async function onSubmit(ev) {
        ev.preventDefault()
        if (isLoading || isSent) return
        if (!comment.name.trim() || !comment.content.trim()) return

        setIsLoading(true)
        await onAddComment(comment)
        setIsLoading(false)
        setIsSent(true)
    }

    return (
        <div className="add-comment">

            {(isLoading && !isSent) &&
                <div className="loading-cover-form">
                    <Loading isTxt={false} />
                </div>
            }
            {isSent &&
                <div className="loading-cover-form">
                    <i className="fa-solid fa-check fa-2xl" style={{ color: "rgb(47, 192, 47)", fontSize: '50px' }}></i>
                </div>
            }

            <h3>הוסף תגובה</h3>

            <form onSubmit={onSubmit}>

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

                <button>שלח תגובה</button>

            </form>

        </div>
    )
}