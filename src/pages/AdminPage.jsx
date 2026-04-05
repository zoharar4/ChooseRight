import { useEffect, useRef, useState } from "react";
import { EditContent } from "../cmps/admin/EditContent.jsx";
import { mainService } from "../services/main.service.js";
import { EditForm } from "../cmps/admin/EditForm.jsx";
import { EditList } from "../cmps/admin/EditList.jsx";
import { utilService } from "../services/util.service.js";
import { useNavigate } from "react-router";
import { adminConfig } from "../services/admin.config.js";
import { Loading } from "../cmps/Loading.jsx";

export function AdminPage() {
    const [objToEdit, setObjToEdit] = useState(null)
    const [itemList, setitemList] = useState(null)
    const [type, setType] = useState(utilService.loadFromStorage('edit-type') || 'blog')

    const [isSaving, setIsSaving] = useState(false)
    const [timeFormat, setTimeFormat] = useState(utilService.loadFromStorage('time-format') || 'txt')
    const editorRef = useRef()
    const editFormRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        loadData()
    }, [type])
    useEffect(() => {
        console.log('objToEdit:', objToEdit)
    }, [objToEdit])
    useEffect(() => {
        console.log('itemList:', itemList)
    }, [itemList])


    async function loadData() {
        try {
            const list = await mainService.query(type, { full: true })
            setitemList(list)
        } catch (err) {
            setitemList([])
            console.log('err:', err)
        }
    }

    async function onSave() {
        if (isSaving) return

        try {
            setIsSaving(true)

            if (editFormRef.current) await editFormRef.current.waitForImageUpload()
            if (editorRef.current) await editorRef.current.uploadImages()

            const content = editorRef.current ? editorRef.current.getContent() : objToEdit.content
            let objToSave = { ...objToEdit, content }

            const latestImage = editFormRef.current?.getLatestImage()
            if (latestImage) objToSave.imageUrl = latestImage

            await mainService.save(type, objToSave)
            alert("Saved")
            loadData()
            setObjToEdit(adminConfig.emptyObj[type])

        } catch (err) {
            alert("ERROR: cannot save")
            console.error(err)
        } finally {
            setIsSaving(false)
        }
    }

    async function onRemove(id) {
        if (!confirm("האם את/ה בטוח?")) return
        try {
            await mainService.remove(type, id)
            alert("Deleted")
        } catch (err) {
            alert("ERROR:  cannot delete data \n", err)
            console.log('err:', err)
        } finally {
            loadData()
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
        setObjToEdit(adminConfig.emptyObj[type])
    }

    function handleChange({ target }) {
        if (target.value === type) return
        setitemList(null)
        setType(target.value)
        utilService.saveToStorage('edit-type', target.value)
    }

    function handleChangeFormat() {
        setTimeFormat(prev => {
            const formatOpt = adminConfig.formatOpt
            const nextIndex = (formatOpt.indexOf(prev) + 1) % formatOpt.length
            utilService.saveToStorage('time-format', formatOpt[nextIndex])
            return formatOpt[nextIndex]
        })
    }

    const config = adminConfig[type]
    const actions = config.actions({
        onEdit,
        onRemove,
        navigate,
        type
    })

    return (
        <div className="admin-page page">
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

                    <EditList data={itemList} columns={config.columns} actions={actions} timeFormat={timeFormat} isId={config.id} />
                </>
                :
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h2 style={{ margin: 0 }}>{adminConfig.typeText[type]} :</h2>
                        <button onClick={() => setObjToEdit(null)}>חזור</button>
                    </div>

                    <EditForm type={type} objToEdit={objToEdit} setObjToEdit={setObjToEdit} ref={editFormRef} />
                    {type === "plans" &&
                        <EditContent existingContent={objToEdit?.previewContent} setObjToEdit={setObjToEdit} editorRef={editorRef} isPreview />
                    }
                    <EditContent existingContent={objToEdit?.content} setObjToEdit={setObjToEdit} editorRef={editorRef} />
                    <button onClick={onSave} disabled={isSaving}>
                        {isSaving ?
                            <Loading isTxt={false} />
                            :
                            'Save'
                        }
                    </button>
                </>
            }
        </div>
    )
}