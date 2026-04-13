import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Loading } from '../Loading'
import { mainService } from '../../services/main.service'
import { utilService } from '../../services/util.service'

const TYPE_LABEL = { blog: 'בלוג', recipes: 'מתכונים' }

export function RecentComments({ onClose }) {
    const [comments, setComments] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        mainService.getRecentComments(30)
            .then(setComments)
            .catch(() => setComments([]))
    }, [])

    function goToPost(comment) {
        onClose()
        navigate(`/${comment.postType}/${comment.postId}`)
    }

    return (
        <div className="recent-comments-overlay" onClick={onClose}>
            <div className="recent-comments-panel" onClick={e => e.stopPropagation()}>
                <div className="recent-comments-header">
                    <h3>תגובות אחרונות</h3>
                    <button className="rc-close-btn" onClick={onClose} title="סגור">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="recent-comments-list">
                    {!comments ? (
                        <Loading />
                    ) : !comments.length ? (
                        <p className="rc-empty">אין תגובות עדיין</p>
                    ) : (
                        comments.map(c => (
                            <div key={c._id} className="rc-item">
                                <div className="rc-item-top">
                                    <span className={`rc-type-badge rc-type-${c.postType}`}>
                                        {TYPE_LABEL[c.postType] || c.postType}
                                    </span>
                                    <span className="rc-name">{c.name}</span>
                                    <span className="rc-time">
                                        {utilService.getTimeStamp(new Date(c.createdAt).getTime())}
                                    </span>
                                </div>
                                <p className="rc-content">{c.content}</p>
                                <button className="rc-post-link" onClick={() => goToPost(c)}>
                                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    צפה בפוסט
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
