import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AdminLogin } from '../cmps/admin/AdminLogin'
import { EditList } from '../cmps/admin/EditList'
import { Loading } from '../cmps/Loading'
import { useUser } from '../context/UserContext'
import { adminConfig } from '../services/admin.config'
import { mainService } from '../services/main.service'
import { utilService } from '../services/util.service'

export function AdminPage() {
    const { user, logout, isLoading: isUserLoading } = useUser()
    const [itemList, setItemList] = useState(null)
    const [type, setType] = useState(utilService.loadFromStorage('edit-type') || 'blog')
    const [timeFormat, setTimeFormat] = useState(utilService.loadFromStorage('time-format') || 'txt')
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) return
        loadData()
    }, [type, user])

    async function loadData() {
        setItemList(null)
        try {
            const list = await mainService.query(type, { full: true })
            setItemList(list)
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
    if (!user) return <AdminLogin />

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
        </div>
    )
}
