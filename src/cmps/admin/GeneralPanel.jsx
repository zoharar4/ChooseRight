import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { mainService } from '../../services/main.service'
import { utilService } from '../../services/util.service'
import { Loading } from '../Loading'

export function GeneralPanel({ type, id }) {
    const navigate = useNavigate()
    const [item, setItem] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        mainService.getById(type, id)
            .then(res => {
                utilService.devLog(`General loaded — ${type}/${id}`, res)
                setItem(res)
            })
            .catch(err => {
                console.error(err)
                navigate('/admin')
            })
    }, [type, id])

    async function onDelete() {
        if (isDeleting) return
        if (!confirm('האם את/ה בטוח שברצונך למחוק?')) return
        setIsDeleting(true)
        try {
            await mainService.remove(type, id)
            utilService.devLog(`Item deleted — ${type}/${id}`)
            navigate('/admin')
        } catch (err) {
            alert('שגיאה במחיקה')
            console.error(err)
            setIsDeleting(false)
        }
    }

    if (!item) return <Loading isForPage />

    const created = new Date(item.createdAtTimestamp || item.createdAt)
    const formattedDate = created.toLocaleDateString('he-IL', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })
    const formattedTime = created.toLocaleTimeString('he-IL', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
    })

    return (
        <div className="general-panel">
            <div className="general-info">
                <div className="info-row">
                    <label>שם</label>
                    <div className="info-value">{item.title}</div>
                </div>

                {item.previewContent && (
                    <div className="info-row">
                        <label>תיאור</label>
                        <div
                            className="info-value info-html"
                            dangerouslySetInnerHTML={{ __html: item.previewContent }}
                        />
                    </div>
                )}

                <div className="info-row">
                    <label>נוצר</label>
                    <div className="info-value">
                        {formattedDate}
                        <span className="info-time">{formattedTime}</span>
                    </div>
                </div>

                <div className="info-row">
                    <label>Id</label>
                    <div className="info-value">
                        {item._id}
                    </div>
                </div>

                <div className="info-stats">
                    <div className="info-stat">
                        <i className="fa-solid fa-eye" style={{ color: 'rgb(76, 109, 135)' }}></i>
                        <span className="info-stat-num">{item.views || 0}</span>
                        <span className="info-stat-label">צפיות</span>
                    </div>
                    <div className="info-stat">
                        <i className="fa-solid fa-heart" style={{ color: 'rgb(155, 35, 53)' }}></i>
                        <span className="info-stat-num">{item.likes || 0}</span>
                        <span className="info-stat-label">לייקים</span>
                    </div>
                    {type !== 'plans' && (
                        <div className="info-stat">
                            <i className="fa-solid fa-comment" style={{ color: 'rgb(82, 121, 111)' }}></i>
                            <span className="info-stat-num">{item.comments?.length || 0}</span>
                            <span className="info-stat-label">תגובות</span>
                        </div>
                    )}
                </div>
            </div>

            <button className="general-delete-btn" onClick={onDelete} disabled={isDeleting}>
                {isDeleting ? <Loading isTxt={false} /> : (
                    <>
                        <i className="fa-solid fa-trash"></i>
                        <span>מחק</span>
                    </>
                )}
            </button>
        </div>
    )
}
