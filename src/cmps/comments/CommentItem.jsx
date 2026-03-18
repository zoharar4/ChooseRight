import { useState } from "react";
import { mainService } from "../../services/main.service";
import { utilService } from "../../services/util.service";
import { CommentContent } from "./CommentContent";
import { AddComment } from "./AddComment";



export function CommentItem({ comment, postId, setPost, type }) {
    const [isReplying, setIsReplying] = useState(false)

    function toggleReply() {
        setIsReplying(prev => !prev)
    }

    async function onReply(replyData) {
        try {
            console.log('post,comment,replyData:', postId, comment, replyData)
            const res = await mainService.addReply(type, postId, comment._id, replyData)
            setPost(prev => {
                const updatedComments = prev.comments.map(c => {
                    if (c._id === comment._id) {
                        return { ...c, replies: [...c.replies, res] }
                    }
                    return c
                })

                return { ...prev, comments: updatedComments }
            })

        } catch (err) {
            console.error(err)
        }

        setTimeout(() => {
            setIsReplying(false)
        }, 1200)
    }

    return (
        <li className="comment">

            <div className="comment-header">
                <span className="comment-name">{comment.name}</span>

                <span className="comment-time">
                    {utilService.getTimeStamp(comment.createdAtTimestamp)}
                </span>
            </div>

            <CommentContent content={comment.content} />

            <div className="comment-actions">

                <button onClick={toggleReply} className="comment-reply">
                    <i className="fa-solid fa-reply"></i>
                </button>

                <button className="comment-like">
                    <i className="fa-regular fa-heart"></i>
                    <span>{comment.likes || 0}</span>
                </button>

            </div>

            {isReplying &&
                <AddComment
                    isReply
                    onSubmit={onReply}
                    onCancel={() => setIsReplying(false)}
                />
            }


            {comment.replies && comment.replies.length > 0 &&
                <ul className="replies-list">

                    {comment.replies.map(reply =>
                        <li key={reply?._id} className="reply">

                            <div className="comment-header">
                                <span className="comment-name">{reply?.name || 'asff'}</span>
                                <span className="comment-time">
                                    {utilService.getTimeStamp(reply?.createdAtTimestamp || 170000000)}
                                </span>
                            </div>

                            <p className="comment-content">{reply.content}</p>

                        </li>
                    )}

                </ul>
            }

        </li>)
}