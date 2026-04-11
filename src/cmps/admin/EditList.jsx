import { useState, useMemo } from "react"
import { utilService } from "../../services/util.service"
import { Loading } from "../Loading"

const COLUMN_ICONS = {
    views: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ),
    comments: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    ),
    likes: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    ),
}

export function EditList({ data, columns, actions, timeFormat, isId }) {

    const [sortKey, setSortKey] = useState('date')
    const [sortDir, setSortDir] = useState('desc')

    function getTimeStr(item) {
        const time = new Date(item.createdAtTimestamp)
        if (timeFormat === "hour") {
            let str = `${time.getHours()}:${time.getMinutes().toString().padStart(2, 0)} | `
            str += utilService.getTimeStamp(time, true)
            return str
        } else {
            return utilService.getTimeStamp(time, timeFormat === "nums")
        }
    }

    function handleSort(col) {
        if (!col.sortable) return
        if (sortKey === col.key) {
            setSortDir(prev => prev === 'asc' ? 'desc' : 'asc')
        } else {
            setSortKey(col.key)
            setSortDir('desc')
        }
    }

    const sortedData = useMemo(() => {
        if (!data) return []
        const sortCol = columns.find(c => c.key === sortKey)
        if (!sortCol?.sortField) return data
        return [...data].sort((a, b) => {
            const aVal = sortCol.sortField(a)
            const bVal = sortCol.sortField(b)
            if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
            if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
            return 0
        })
    }, [data, sortKey, sortDir, columns])

    function renderColHeader(col) {
        if (COLUMN_ICONS[col.key]) return COLUMN_ICONS[col.key]
        if (col.label) return col.label
        return <i className={col.icon} style={{ color: col.clr }}></i>
    }

    function getSortIndicator(col) {
        if (!col.sortable) return null
        if (sortKey !== col.key) return <span className="sort-indicator inactive">↕</span>
        return <span className="sort-indicator active">{sortDir === 'asc' ? '↑' : '↓'}</span>
    }

    if (!data) return <Loading isForPage />

    return (
        <table className="admin-table">
            <thead>
                <tr>
                    <th className="col-num">#</th>
                    {columns.map(col => (
                        <th
                            key={col.key}
                            className={col.sortable ? 'sortable-col' : ''}
                            onClick={() => handleSort(col)}
                        >
                            <span className="th-inner">
                                {renderColHeader(col)}
                                {getSortIndicator(col)}
                            </span>
                        </th>
                    ))}
                    {actions && <th>פעולות</th>}
                    {isId && <th>ID</th>}
                </tr>
            </thead>

            <tbody>
                {sortedData.map((item, idx) => (
                    <tr key={item._id}>
                        <td className="col-num">{idx + 1}</td>
                        {columns.map(col => (
                            <td key={col.key}>
                                {col.render
                                    ? col.render(item, { getTimeStr })
                                    : item[col.field]}
                            </td>
                        ))}
                        {actions && (
                            <td>
                                {actions.view && (
                                    <button className="view-btn" onClick={() => actions.view(item)} title="צפייה">
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </button>
                                )}
                                {actions.edit && (
                                    <button className="edit-btn" onClick={() => actions.edit(item)} title="עריכה">
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                )}
                                {actions.remove && (
                                    <button className="delete-btn" onClick={() => actions.remove(item._id)} title="מחיקה">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                )}
                                {actions.comments && (
                                    <button className="comments-btn" onClick={() => actions.comments(item)} title="תגובות">
                                        <i className="fa-solid fa-comment"></i>
                                    </button>
                                )}
                            </td>
                        )}
                        {isId && <td className="col-id">{item._id.slice(-6)}</td>}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
