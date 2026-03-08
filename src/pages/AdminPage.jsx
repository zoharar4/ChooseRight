import { useEffect, useState } from "react";
import { EditContent } from "../cmps/EditContent.jsx";
import { actions } from "../../store/actions.js";
import { mainService } from "../services/main.service.js";
import { EditForm } from "../cmps/EditForm.jsx";
import { EditList } from "../cmps/EditList.jsx";

export function AdminPage() {
    const [objToEdit, setObjToEdit] = useState(null)
    const [itemList, setitemList] = useState([])
    const [timeFormat, setTimeFormat] = useState("txt")
    const formatOpt = ["nums", "txt", "hour"]
    const [type, setType] = useState('blog')

    useEffect(() => {
        if (!type) return
        loadData()
    }, [type])
    useEffect(() => {
       console.log('objToEdit:',objToEdit)
    }, [objToEdit])

    async function loadData() {
        try {
            const list = await mainService.query(type)
            setitemList(list)
            console.log('list:', list)
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function onSave() {
        try {
            await actions.save(type, objToEdit)
            alert("Saved")
            loadData()
            setObjToEdit(mainService.getEmptyObj(type))
        } catch (err) {
            alert("ERROR:  cannot save data")
            console.log('err:', err)
        }
    }

    async function onRemove(id) {
        try {
            await actions.remove(type, id)
            alert("Deleted")
            loadData()
        } catch (err) {
            alert("ERROR:  cannot delete data")
            console.log('err:', err)
        }
    }

    async function onEdit(id) {
        try {
            const item = await mainService.getById(type, id)
            console.log(item)
            setObjToEdit(item)
        } catch (err) {
            alert("ERROR:  cannot get item by id", id)
            console.log('err:', err)
        }
    }


    function onAdd() {
        // const emptyObj = getEmptyObj(type)
        setObjToEdit({imageUrl:''})
    }

    function handleChange({ target }) {
        setType(target.value)
    }

    function getTypeText() {
        if (type === 'blog') return "בלוג"
        else if (type === 'recipes') return "מתכונים"
        return "תכניות"
    }

    function handleChangeFormat() {
        setTimeFormat(prev => {
            const currentIndex = formatOpt.indexOf(prev)
            const nextIndex = (currentIndex + 1) % formatOpt.length
            return formatOpt[nextIndex]
        })
    }

    return (
        <div className="admin-page">
            {!objToEdit
                ?
                <>
                    <div style={{ display: 'flex' }}>
                        <select value={type} onChange={handleChange} name="edit-type" id="edit-type">
                            <option value="blog">בלוג</option>
                            <option value="recipes">מתכונים</option>
                            <option value="plans">תכניות</option>
                        </select>
                        <button onClick={onAdd}>הוספה</button>
                        <button onClick={handleChangeFormat}>פורמט זמן</button>
                    </div>

                    <EditList array={itemList} onRemove={onRemove} onEdit={onEdit} timeFormat={timeFormat} type={type} />
                    {/* {itemList &&
                        <div className="list">
                            {itemList.map((item, idx) => {
                                return (
                                )
                            })}
                        </div>
                    } */}
                </>
                :
                <>
                    <div>
                        <h2>{getTypeText()} :</h2>
                        <button onClick={() => setObjToEdit(null)}>חזור</button>
                    </div>

                    <EditForm type={type} objToEdit={objToEdit} setObjToEdit={setObjToEdit} />
                    <EditContent existingContent={objToEdit?.content} setObjToEdit={setObjToEdit} onSave={onSave} />
                </>
            }
        </div>
    )
}