import { utilService } from "../services/util.service";


export function EditList({ array, type, onRemove, onEdit, timeFormat }) {

    function confirmRemove(id) {
        const ans = confirm("האם את/ה בטוח?")
        if (ans) onRemove(id)
        else alert("הפעולה בוטלה")
    }

    function getTimeStr(item) {
        const time = new Date(item.createdAtTimestamp)

        if (timeFormat === "hour") {
            let str = `${time.getHours()}:${time.getMinutes().toString().padStart(2, 0)} , `
            str += utilService.getTimeStamp(time, true)
            return str
        } else {
            return utilService.getTimeStamp(time, timeFormat === "nums")
        }
    }

    return (
        <table className="admin-table">
            {type === "blog" && (
                <>
                    <thead>
                        <tr>
                            <th>כותרת</th>
                            <th>צפיות</th>
                            <th>תגובות</th>
                            <th>תאריך הוספה</th>
                            <th>פעולות</th>
                            <th>ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {array.map(item => (
                            <tr key={item._id}>
                                <td>{item.title}</td>
                                <td>{item.views}</td>
                                <td>{item.comments.length}</td>
                                <td>{getTimeStr(item)}</td>

                                <td>
                                    <button className="edit-btn" onClick={() => onEdit(item._id)}>
                                        עריכה
                                    </button>

                                    <button className="delete-btn" onClick={() => confirmRemove(item._id)}>
                                        מחיקה
                                    </button>
                                </td>
                                <td>{item._id.slice(-6)}</td>
                            </tr>
                        ))}
                    </tbody>
                </>
            )}

            {type === "recipes" && (
                <>
                    <thead>
                        <tr>
                            <th>כותרת</th>
                            <th>צפיות</th>
                            <th>תגובות</th>
                            <th>תאריך הוספה</th>
                            <th>פעולות</th>
                            <th>ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {array.map(item => (
                            <tr key={item._id}>
                                <td>{item.title}</td>
                                <td>{item.views}</td>
                                <td>{item.comments.length}</td>
                                <td>{getTimeStr(item)}</td>

                                <td>
                                    <button onClick={() => onEdit(item._id)}>
                                        עריכה
                                    </button>

                                    <button onClick={() => confirmRemove(item._id)}>
                                        מחיקה
                                    </button>
                                </td>
                                <td>{item._id.slice(-6)}</td>
                            </tr>
                        ))}
                    </tbody>
                </>
            )}

            {type === "plans" && (
                <>
                    <thead>
                        <tr>
                            <th>כותרת</th>
                            <th>צפיות</th>
                            <th>תגובות</th>
                            <th>תאריך הוספה</th>
                            <th>פעולות</th>
                            <th>ID</th>
                        </tr>
                    </thead>

                    <tbody>
                        {array.map(item => (
                            <tr key={item._id}>
                                <td>{item.title}</td>
                                <td>{item.views}</td>
                                <td>{item.comments.length}</td>
                                <td>{getTimeStr(item)}</td>

                                <td>
                                    <button onClick={() => onEdit(item._id)}>
                                        עריכה
                                    </button>

                                    <button onClick={() => confirmRemove(item._id)}>
                                        מחיקה
                                    </button>
                                </td>
                                <td>{item._id.slice(-6)}</td>
                            </tr>
                        ))}
                    </tbody>
                </>
            )}
        </table >
    )
}