import { useNavigate } from "react-router";
import { utilService } from "../../services/util.service";
import { Loading } from "../Loading";


export function EditList({ data, columns, actions, timeFormat, type, isId }) {

    // function confirmRemove(id) {
    //     console.log('id:',id)
    //     const ans = confirm("האם את/ה בטוח?")
    //     if (ans) actions.remove?.(id)
    //     else alert("הפעולה בוטלה")
    // }

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
    if (!data) return (
        <Loading isForPage />
    )
    return (
        <table className="admin-table">
            <thead>
                <tr>
                    {columns.map(col => <th key={col.key}>{col.label || <i className={col.icon} style={{ color: col.clr }}></i>}</th>)}
                    {actions && <th>פעולות</th>}
                    {isId && <th key={'id'}>ID</th>}
                </tr>
            </thead>

            <tbody>
                {data.map(item => (
                    <tr key={item._id}>
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
                                    <button
                                        className="view-btn"
                                        onClick={() => actions.view(item)}
                                    >
                                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </button>
                                )}

                                {actions.edit && (
                                    <button
                                        className="edit-btn"
                                        onClick={() => actions.edit(item)}
                                    >
                                        עריכה
                                    </button>
                                )}

                                {actions.remove && (
                                    <button
                                        className="delete-btn"
                                        onClick={() => actions.remove(item._id)}
                                    >
                                        מחיקה
                                    </button>
                                )}

                                {actions.comments && (
                                    <button
                                        className="comments-btn"
                                        onClick={() => actions.comments(item)}
                                    >
                                        תגובות
                                    </button>
                                )}
                            </td>
                        )}
                        {isId &&
                            <td>{item._id.slice(-6)}</td>
                        }
                    </tr>
                ))}
            </tbody>
        </table>
    )
}