import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { EditContent } from '../cmps/admin/EditContent'
import { EditForm } from '../cmps/admin/EditForm'
import { Loading } from '../cmps/Loading'
import { adminConfig } from '../services/admin.config'
import { mainService } from '../services/main.service'

export function AdminEditPage() {
    const { type, id } = useParams()
    const navigate = useNavigate()

    const [objToEdit, setObjToEdit] = useState(null)
    const [isSaving, setIsSaving] = useState(false)

    const editFormRef = useRef()
    const mainEditorRef = useRef()
    const previewEditorRef = useRef()

    useEffect(() => {
        if (id === 'new') {
            setObjToEdit(adminConfig.emptyObj[type])
        } else {
            mainService.getById(type, id)
                .then(item => setObjToEdit(item))
                .catch(err => {
                    alert(`ERROR: cannot load item`)
                    console.error(err)
                    navigate('/admin')
                })
        }
    }, [type, id])

    async function onSave() {
        if (isSaving) return
        setIsSaving(true)
        try {
            // 1. Wait for cover image compression to finish
            if (editFormRef.current) await editFormRef.current.waitForImageUpload()

            // 2. Upload any pending inline images in the editors
            if (previewEditorRef.current) await previewEditorRef.current.uploadImages()
            if (mainEditorRef.current) await mainEditorRef.current.uploadImages()

            // 3. Get final content from editors (fallback to state if editor not mounted)
            const previewContent = previewEditorRef.current?.getContent() ?? objToEdit.previewContent
            const content = mainEditorRef.current?.getContent() ?? objToEdit.content

            let objToSave = { ...objToEdit, previewContent, content }

            const latestImage = editFormRef.current?.getLatestImage()
            if (latestImage) objToSave.imageUrl = latestImage

            await mainService.save(type, objToSave)
            alert('Saved')
            navigate('/admin')
        } catch (err) {
            alert('ERROR: cannot save')
            console.error(err)
        } finally {
            setIsSaving(false)
        }
    }

    if (!objToEdit) return <Loading isForPage />

    const isPlans = type === 'plans'

    return (
        <div className="admin-edit-page">
            <div className="edit-header">
                <h2>{adminConfig.typeText[type]}</h2>
                <button className="back-btn" onClick={() => navigate('/admin')} title="חזור לרשימה">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                </button>
            </div>

            <EditForm type={type} objToEdit={objToEdit} setObjToEdit={setObjToEdit} ref={editFormRef} />

            {isPlans && (
                <EditContent
                    ref={previewEditorRef}
                    existingContent={objToEdit.previewContent}
                    setObjToEdit={setObjToEdit}
                    isPreview
                />
            )}

            <EditContent
                ref={mainEditorRef}
                existingContent={objToEdit.content}
                setObjToEdit={setObjToEdit}
            />

            <button className="save-btn" onClick={onSave} disabled={isSaving} title="שמור">
                {isSaving ? <Loading isTxt={false} /> : <i className="fa-solid fa-floppy-disk"></i>}
            </button>
        </div>
    )
}
