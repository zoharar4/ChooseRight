import { useEffect, useState } from 'react'
import { Loading } from '../Loading'
import { backupService } from '../../services/backup.service'
import { utilService } from '../../services/util.service'

export function VersionsPanel({ type, itemId, onClose, onRestored }) {
    const [versions, setVersions] = useState(null)
    const [restoringId, setRestoringId] = useState(null)

    useEffect(() => {
        backupService.getVersions(type, itemId)
            .then(setVersions)
            .catch(() => setVersions([]))
    }, [type, itemId])

    async function handleRestore(backupId) {
        if (restoringId) return
        if (!confirm('לשחזר גרסה זו? המצב הנוכחי יישמר כגרסה.')) return
        setRestoringId(backupId)
        try {
            await backupService.restore(backupId)
            utilService.devLog(`Version restored — ${backupId}`)
            onRestored()
            onClose()
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
                    <h3>גרסאות קודמות</h3>
                    <button className="rc-close-btn" onClick={onClose} title="סגור">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>

                <div className="recent-comments-list">
                    {!versions ? (
                        <Loading />
                    ) : !versions.length ? (
                        <p className="rc-empty">אין גרסאות קודמות</p>
                    ) : (
                        versions.map(ver => (
                            <div key={ver._id} className="rc-item backup-item">
                                <div className="rc-item-top">
                                    <span className="rc-name">{ver.data.title}</span>
                                    <span className="rc-time">
                                        {utilService.getTimeStamp(new Date(ver.createdAt).getTime())}
                                    </span>
                                </div>
                                {ver.data.previewContent && (
                                    <p className="rc-content">{ver.data.previewContent.replace(/<[^>]*>/g, '')}</p>
                                )}
                                <button
                                    className="backup-restore-btn"
                                    onClick={() => handleRestore(ver._id)}
                                    disabled={restoringId === ver._id}
                                >
                                    {restoringId === ver._id ? (
                                        <Loading isTxt={false} />
                                    ) : (
                                        <>
                                            <i className="fa-solid fa-rotate-left"></i>
                                            שחזר גרסה
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
