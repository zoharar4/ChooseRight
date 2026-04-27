import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { AdminLogin } from '../cmps/admin/AdminLogin'
import { DeletedItemsPanel } from '../cmps/admin/DeletedItemsPanel'
import { DraftsList } from '../cmps/admin/DraftsList'
import { EditList } from '../cmps/admin/EditList'
import { RecentComments } from '../cmps/admin/RecentComments'
import { Loading } from '../cmps/Loading'
import { useUser } from '../context/UserContext'
import { adminConfig } from '../services/admin.config'
import { backupService } from '../services/backup.service'
import { draftService } from '../services/draft.service'
import { mainService } from '../services/main.service'
import { utilService } from '../services/util.service'

export function AdminPage() {
    const { user, logout, isLoading: isUserLoading } = useUser()
    const location = useLocation()
    const [itemList, setItemList] = useState(null)
    const [type, setType] = useState(utilService.loadFromStorage('edit-type') || 'blog')
    const [timeFormat, setTimeFormat] = useState(utilService.loadFromStorage('time-format') || 'txt')
    const [showRecentComments, setShowRecentComments] = useState(false)
    const [showDrafts, setShowDrafts] = useState(false)
    const [showDeleted, setShowDeleted] = useState(false)
    const [draftCount, setDraftCount] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) return
        loadData()
    }, [type, user])

    useEffect(() => {
        setDraftCount(draftService.getAll().length)
    }, [])

    async function loadData() {
        setItemList(null)
        try {
            const [list, versionCounts] = await Promise.all([
                mainService.query(type, { full: true }),
                backupService.getVersionCounts(type).catch(() => ({})),
            ])
            const merged = list.map(item => ({
                ...item,
                versionCount: versionCounts[item._id] || 0,
            }))
            utilService.devLog(`Admin list loaded — ${type}`, { items: merged.length, versionCounts })
            setItemList(merged)
        } catch (err) {
            setItemList([])
            console.error('loadData error:', err)
        }
    }

    async function onRemove(id) {
        if (!confirm('האם את/ה בטוח?')) return
        try {
            await mainService.remove(type, id)
            alert('Deleted')
        } catch (err) {
            alert('ERROR: cannot delete data')
            console.error(err)
        } finally {
            loadData()
        }
    }

    function handleTypeChange({ target }) {
        if (target.value === type) return
        setType(target.value)
        utilService.saveToStorage('edit-type', target.value)
    }

    function handleFormatChange() {
        setTimeFormat(prev => {
            const { formatOpt } = adminConfig
            const next = formatOpt[(formatOpt.indexOf(prev) + 1) % formatOpt.length]
            utilService.saveToStorage('time-format', next)
            return next
        })
    }

    if (isUserLoading) return <Loading isForPage />
    if (!user) return <AdminLogin from={location.state?.from} />

    const config = adminConfig[type]
    const actions = config.actions({ onRemove, navigate, type })

    return (
        <div className="admin-page">
            <div className="list-options">
                <div className="right-options">
                    <select value={type} onChange={handleTypeChange} name="edit-type" id="edit-type">
                        <option value="blog">בלוג</option>
                        <option value="recipes">מתכונים</option>
                        <option value="plans">תכניות</option>
                    </select>
                    <button onClick={handleFormatChange} title="פורמט זמן" className="icon-btn">
                        <i className="fa-regular fa-clock"></i>
                    </button>
                    <button onClick={() => setShowRecentComments(true)} title="תגובות אחרונות" className="icon-btn">
                        <i className="fa-regular fa-comment"></i>
                    </button>
                    <button onClick={() => setShowDrafts(true)} title="טיוטות" className="icon-btn draft-icon-btn">
                        <i className="fa-solid fa-floppy-disk"></i>
                        {draftCount > 0 && <span className="draft-badge">{draftCount}</span>}
                    </button>
                    <button onClick={() => setShowDeleted(true)} title="פריטים שנמחקו" className="icon-btn">
                        <i className="fa-solid fa-trash-can-arrow-up"></i>
                    </button>
                </div>
                <div className="left-options">
                    <button className="icon-btn" onClick={logout} title="התנתק">
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                    <button className="add-btn" onClick={() => navigate(`/admin/edit/${type}/new`)} title="הוסף">
                        <i className="fa-solid fa-plus fa-2xl" style={{ color: 'white' }}></i>
                    </button>
                </div>
            </div>

            <EditList data={itemList} columns={config.columns} actions={actions} timeFormat={timeFormat} isId={config.id} />

            {showRecentComments && (
                <RecentComments onClose={() => setShowRecentComments(false)} />
            )}

            {showDrafts && (
                <DraftsList
                    onClose={() => setShowDrafts(false)}
                    onDraftDeleted={count => setDraftCount(count)}
                />
            )}

            {showDeleted && (
                <DeletedItemsPanel
                    type={type}
                    onClose={() => setShowDeleted(false)}
                    onRestored={loadData}
                />
            )}
        </div>
    )
}
