import { useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'
import { CommentsPanel } from '../cmps/admin/CommentsPanel'
import { EditPanel } from '../cmps/admin/EditPanel'
import { GeneralPanel } from '../cmps/admin/GeneralPanel'
import { StatsPanel } from '../cmps/admin/StatsPanel'
import { ViewPanel } from '../cmps/admin/ViewPanel'
import { Loading } from '../cmps/Loading'
import { useUser } from '../context/UserContext'
import { adminConfig } from '../services/admin.config'
import { PlanDetails } from './PlanDetails'

const ALL_TABS = [
    { key: 'general',  label: 'כללי',        icon: 'fa-circle-info' },
    { key: 'edit',     label: 'עריכה',       icon: 'fa-pen' },
    { key: 'comments', label: 'תגובות',      icon: 'fa-comment' },
    { key: 'stats',    label: 'סטטיסטיקות',  icon: 'fa-chart-line' },
    { key: 'view',     label: 'צפייה',       icon: 'fa-eye' },
]

export function AdminItemPage() {
    const { type, id, tab } = useParams()
    const navigate = useNavigate()
    const location = useLocation()
    const { user, isLoading: isUserLoading } = useUser()

    useEffect(() => {
        if (isUserLoading) return
        if (!user) navigate('/admin', { state: { from: location.pathname }, replace: true })
    }, [user, isUserLoading])

    if (isUserLoading || !user) return <Loading isForPage />

    const isNew = id === 'new'
    const defaultTab = isNew ? 'edit' : 'general'
    const activeTab = tab || defaultTab

    const tabs = isNew
        ? ALL_TABS.filter(t => t.key === 'edit')
        : ALL_TABS.filter(t => !(t.key === 'comments' && type === 'plans'))

    function changeTab(key) {
        const url = key === defaultTab
            ? `/admin/${type}/${id}`
            : `/admin/${type}/${id}/${key}`
        navigate(url)
    }

    return (
        <div className="admin-item-page">
            <div className="admin-item-header">
                <h2>{adminConfig.typeText[type]}</h2>
                <button className="header-btn" onClick={() => navigate('/admin')} title="חזור לרשימה">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                </button>
            </div>

            {tabs.length > 1 && (
                <nav className="admin-tabs">
                    {tabs.map(t => (
                        <button
                            key={t.key}
                            className={`admin-tab${activeTab === t.key ? ' active' : ''}`}
                            onClick={() => changeTab(t.key)}
                        >
                            <i className={`fa-solid ${t.icon}`}></i>
                            <span>{t.label}</span>
                        </button>
                    ))}
                </nav>
            )}

            <div className="admin-tab-content">
                {activeTab === 'general'  && !isNew && <GeneralPanel type={type} id={id} />}
                {activeTab === 'edit'     && <EditPanel type={type} id={id} />}
                {activeTab === 'comments' && !isNew && type !== 'plans' && (
                    <CommentsPanel type={type} postId={id} />
                )}
                {activeTab === 'stats' && !isNew && <StatsPanel type={type} id={id} />}
                {activeTab === 'view'  && !isNew && (
                    type === 'plans' ? <PlanDetails /> : <ViewPanel type={type} id={id} />
                )}
            </div>
        </div>
    )
}
