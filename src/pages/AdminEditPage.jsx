import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { EditContent } from '../cmps/admin/EditContent'
import { EditForm } from '../cmps/admin/EditForm'
import { Loading } from '../cmps/Loading'
import { adminConfig } from '../services/admin.config'
import { draftService } from '../services/draft.service'
import { mainService } from '../services/main.service'
import { utilService } from '../services/util.service'

export function AdminEditPage() {
    const { type, id } = useParams()
    const navigate = useNavigate()

    const [objToEdit, setObjToEdit] = useState(null)
    const [isSaving, setIsSaving] = useState(false)
    const [draftBanner, setDraftBanner] = useState(null) // draft object if restore available

    const editFormRef = useRef()
    const mainEditorRef = useRef()
    const previewEditorRef = useRef()
    const isDirtyRef = useRef(false)

    useEffect(() => {
        isDirtyRef.current = false
        if (id === 'new') {
            const empty = adminConfig.emptyObj[type]
            const draft = draftService.get(type, id)
            if (draft) setDraftBanner(draft)
            setObjToEdit(empty)
        } else {
            mainService.getById(type, id)
                .then(item => {
                    const draft = draftService.get(type, id)
                    if (draft && draft.savedAt > (item.updatedAt ? new Date(item.updatedAt).getTime() : 0)) {
                        setDraftBanner(draft)
                    }
                    setObjToEdit(item)
                })
                .catch(err => {
                    alert(`ERROR: cannot load item`)
                    console.error(err)
                    navigate('/admin')
                })
        }
    }, [type, id])

    // Auto-save draft when form data changes (debounced)
    useEffect(() => {
        if (!objToEdit || !isDirtyRef.current) return
        const timer = setTimeout(() => {
            draftService.save(type, id, objToEdit)
        }, 1500)
        return () => clearTimeout(timer)
    }, [objToEdit, type, id])

    // Wrap setObjToEdit to mark dirty on user changes
    function handleChange(updater) {
        isDirtyRef.current = true
        setObjToEdit(updater)
    }

    function restoreDraft() {
        setObjToEdit(prev => ({ ...prev, ...draftBanner.data }))
        setDraftBanner(null)
    }

    function discardDraft() {
        draftService.remove(type, id)
        setDraftBanner(null)
    }

    async function onSave() {
        if (isSaving) return
        setIsSaving(true)
        try {
            if (editFormRef.current) await editFormRef.current.waitForImageUpload()
            if (previewEditorRef.current) await previewEditorRef.current.uploadImages()
            if (mainEditorRef.current) await mainEditorRef.current.uploadImages()

            const previewContent = previewEditorRef.current?.getContent() ?? objToEdit.previewContent
            const content = mainEditorRef.current?.getContent() ?? objToEdit.content

            let objToSave = { ...objToEdit, previewContent, content }

            const latestImage = editFormRef.current?.getLatestImage()
            if (latestImage) objToSave.imageUrl = latestImage

            await mainService.save(type, objToSave)
            draftService.remove(type, id)
            isDirtyRef.current = false
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

            {draftBanner && (
                <div className="draft-restore-banner">
                    <i className="fa-solid fa-floppy-disk"></i>
                    <span>נמצאה טיוטה לא שמורה מ-{utilService.getTimeStamp(draftBanner.savedAt)}</span>
                    <div className="draft-banner-actions">
                        <button className="draft-restore-btn" onClick={restoreDraft}>שחזר</button>
                        <button className="draft-discard-btn" onClick={discardDraft}>מחק</button>
                    </div>
                </div>
            )}

            <EditForm type={type} objToEdit={objToEdit} setObjToEdit={handleChange} ref={editFormRef} />

            {isPlans && (
                <EditContent
                    ref={previewEditorRef}
                    existingContent={objToEdit.previewContent}
                    setObjToEdit={handleChange}
                    isPreview
                />
            )}

            <EditContent
                ref={mainEditorRef}
                existingContent={objToEdit.content}
                setObjToEdit={handleChange}
            />

            <button className="save-btn" onClick={onSave} disabled={isSaving} title="שמור">
                {isSaving ? <Loading isTxt={false} /> : <i className="fa-solid fa-floppy-disk"></i>}
            </button>
        </div>
    )
}
