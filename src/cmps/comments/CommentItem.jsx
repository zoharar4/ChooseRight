import { useState } from "react";
import { mainService } from "../../services/main.service";
import { utilService } from "../../services/util.service";
import { CommentContent } from "./CommentContent";



export function CommentItem({ comment, post, setPost }) {
    const [isReplying, setIsReplying] = useState(false)

    function toggleReply() {
        setIsReplying(prev => !prev)
    }

    async function onReply(replyData) {
        try {
            const res = await mainService.addReply(post._id, comment._id, replyData)
            setPost(prev => {
                const updatedComments = prev.comments.map(c => {
                    if (c._id === comment._id) {
                        return {
                            ...c,
                            replies: [...c.replies, res]
                        }
                    }
                    return c
                })

                return { ...prev, comments: updatedComments }
            })

        } catch (err) {
            console.error(err)
        }


        setIsReplying(false)
    }

    return (
        <li key={comment._id} className="comment">

            <div className="comment-header">
                <span className="comment-name">{comment.name}</span>
                <span className="comment-time">
                    {utilService.getTimeStamp(comment.createdAtTimestamp)}
                </span>
            </div>

            <CommentContent />
            {/* <CommentContent content={comment.content} /> */}

            <div className="comment-actions">

                <button className="comment-reply">
                    <i className="fa-solid fa-reply"></i>
                </button>

                <button className="comment-like">
                    <i className="fa-regular fa-heart"></i>
                    <span>{comment.likes || 0}</span>
                </button>

            </div>

            {comment.replies && comment.replies.length > 0 &&
                <ul className="replies-list">

                    {comment.replies.map(reply =>
                        <li key={reply._id} className="reply">

                            <div className="comment-header">
                                <span className="comment-name">{reply.name}</span>
                                <span className="comment-time">
                                    {utilService.getTimeStamp(reply.createdAtTimestamp)}
                                </span>
                            </div>

                            <p className="comment-content">{reply.content}</p>

                        </li>
                    )}

                </ul>
            }

        </li>)
}