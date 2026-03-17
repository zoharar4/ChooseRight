import { useEffect, useRef, useState } from "react";
import { EditContent } from "../cmps/EditContent.jsx";
import { actions } from "../../store/actions.js";
import { mainService } from "../services/main.service.js";
import { EditForm } from "../cmps/EditForm.jsx";
import { EditList } from "../cmps/EditList.jsx";

export function AdminPage() {
    const [objToEdit, setObjToEdit] = useState(null)
    const [itemList, setitemList] = useState([])
    const [timeFormat, setTimeFormat] = useState("txt")
    const [type, setType] = useState('blog')
    const editorRef = useRef()

    const formatOpt = ["nums", "txt", "hour"]

    useEffect(() => {
        if (!type) return
        loadData()
    }, [type])

    useEffect(() => {
        console.log('objToEdit:', objToEdit)
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
            // מחכים שכל התמונות בעורך הועלו לשרת
            if (editorRef.current) {
                await editorRef.current.uploadImages()
            }
            const content = editorRef.current ? editorRef.current.getContent() : objToEdit.content
            const objToSave = { ...objToEdit, content }
            await actions.save(type, objToSave)
            alert("Saved")
            loadData()
            setObjToEdit(mainService.getEmptyObj(type))
        } catch (err) {
            alert("ERROR:  cannot save data")
            console.error('err:', err)
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
            setObjToEdit(item)
        } catch (err) {
            alert("ERROR:  cannot get item by id", id)
            console.log('err:', err)
        }
    }


    function onAdd() {
        const emptyObj = mainService.getEmptyObj(type)
        setObjToEdit(emptyObj || {})
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
                    <div className="list-options">
                        <div className="right-options">
                            <select value={type} onChange={handleChange} name="edit-type" id="edit-type">
                                <option value="blog">בלוג</option>
                                <option value="recipes">מתכונים</option>
                                <option value="plans">תכניות</option>
                            </select>
                            <button onClick={handleChangeFormat}>פורמט זמן</button>
                        </div>

                        <div className="left-options">
                            <button className="add-btn" onClick={onAdd}><i className="fa-solid fa-plus fa-2xl" style={{ color: "rgb(255, 255, 255)" }}></i></button>
                        </div>

                    </div>

                    <EditList array={itemList} onRemove={onRemove} onEdit={onEdit} timeFormat={timeFormat} type={type} />
                </>
                :
                <>
                    <div>
                        <h2>{getTypeText()} :</h2>
                        <button onClick={() => setObjToEdit(null)}>חזור</button>
                    </div>

                    <EditForm type={type} objToEdit={objToEdit} setObjToEdit={setObjToEdit} />
                    <EditContent existingContent={objToEdit?.content} setObjToEdit={setObjToEdit} onSave={onSave} editorRef={editorRef} />
                    <button onClick={onSave} style={{ marginTop: "20px", padding: '4px 6px' }}>
                        Save
                    </button>
                </>
            }
        </div>
    )
}