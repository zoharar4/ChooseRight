import { useEffect, useState } from 'react'
import { Loading } from '../Loading'
import { backupService } from '../../services/backup.service'
import { utilService } from '../../services/util.service'


export function DeletedItemsPanel({ type, onClose, onRestored }) {
    const [items, setItems] = useState(null)
    const [restoringId, setRestoringId] = useState(null)

    useEffect(() => {
        backupService.getDeleted(type)
            .then(setItems)
            .catch(() => setItems([]))
    }, [type])

    async function handleRestore(backupId) {
        if (restoringId) return
        setRestoringId(backupId)
        try {
            await backupService.restore(backupId)
            utilService.devLog(`Deleted item restored — ${backupId}`)
            setItems(prev => prev.filter(item => item._id !== backupId))
            onRestored()
        } catch (err) {
            alert('שגיאה בשחזור')
            console.error(err)
        } finally {
            setRestoringId(null)
        }
    }

    return (
        <div className="recent-comments-overlay" onClick={onClose}>
            <div className="recent-comments-panel" onClick={e => e.stopPropagation()}>
                <div className="recent-comments-header">
                    <h3>פריטים שנמחקו</h3>
                    <button className="rc-close-btn" onClick={onClose} title="סגור">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="recent-comments-list">
                    {!items ? (
                        <Loading />
                    ) : !items.length ? (
                        <p className="rc-empty">אין פריטים שנמחקו</p>
                    ) : (
                        items.map(item => (
                            <div key={item._id} className="rc-item backup-item">
                                <div className="rc-item-top">
                                    <span className="rc-name">{item.data.title}</span>
                                    <span className="rc-time">
                                        {utilService.getTimeStamp(new Date(item.createdAt).getTime())}
                                    </span>
                                </div>
                                {item.data.previewContent && (
                                    <p className="rc-content">{item.data.previewContent.replace(/<[^>]*>/g, '')}</p>
                                )}
                                <button
                                    className="backup-restore-btn"
                                    onClick={() => handleRestore(item._id)}
                                    disabled={restoringId === item._id}
                                >
                                    {restoringId === item._id ? (
                                        <Loading isTxt={false} />
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-rotate-left"></i>
                                            שחזר
                                        </>
                                    )}
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
