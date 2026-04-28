import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { adminConfig } from '../../services/admin.config'
import { draftService } from '../../services/draft.service'
import { mainService } from '../../services/main.service'
import { utilService } from '../../services/util.service'
import { Loading } from '../Loading'
import { EditContent } from './EditContent'
import { EditForm } from './EditForm'
import { VersionsPanel } from './VersionsPanel'

export function EditPanel({ type, id }) {
    const navigate = useNavigate()
    const [objToEdit, setObjToEdit] = useState(null)
    const [isSaving, setIsSaving] = useState(false)
    const [draftBanner, setDraftBanner] = useState(null)
    const [showVersions, setShowVersions] = useState(false)
    const [reloadKey, setReloadKey] = useState(0)

    const editFormRef = useRef()
    const mainEditorRef = useRef()
    const previewEditorRef = useRef()
    const isDirtyRef = useRef(false)

    const isNew = id === 'new'

    useEffect(() => {
        isDirtyRef.current = false
        if (isNew) {
            const empty = adminConfig.emptyObj[type]
            const draft = draftService.get(type, id)
            if (draft) {
                utilService.devLog(`Draft found for new ${type}`, draft)
                setDraftBanner(draft)
            }
            utilService.devLog(`Edit new ${type} — empty template`)
            setObjToEdit(empty)
        } else {
            mainService.getById(type, id)
                .then(item => {
                    utilService.devLog(`Edit item loaded — ${type}/${id}`, item)
                    const draft = draftService.get(type, id)
                    if (draft && draft.savedAt > (item.updatedAt ? new Date(item.updatedAt).getTime() : 0)) {
                        utilService.devLog(`Draft found for ${type}/${id}`, draft)
                        setDraftBanner(draft)
                    }
                    setObjToEdit(item)
                })
                .catch(err => {
                    alert('ERROR: cannot load item')
                    console.error(err)
                    navigate('/admin')
                })
        }
    }, [type, id, reloadKey])

    useEffect(() => {
        if (!objToEdit || !isDirtyRef.current) return
        const timer = setTimeout(() => {
            draftService.save(type, id, objToEdit)
        }, 1500)
        return () => clearTimeout(timer)
    }, [objToEdit, type, id])

    function handleChange(updater) {
        isDirtyRef.current = true
        setObjToEdit(updater)
    }

    function restoreDraft() {
        utilService.devLog(`Restore draft — ${type}/${id}`, draftBanner.data)
        setObjToEdit(prev => ({ ...prev, ...draftBanner.data }))
        setDraftBanner(null)
    }

    function discardDraft() {
        utilService.devLog(`Discard draft — ${type}/${id}`)
        draftService.remove(type, id)
        setDraftBanner(null)
    }

    function reloadAfterRestore() {
        utilService.devLog(`Reload edit panel after version restore — ${type}/${id}`)
        setObjToEdit(null)
        setReloadKey(k => k + 1)
    }

    function onImproveWithAi() {
        utilService.devLog(`AI improve clicked — ${type}/${id} (not implemented yet)`)
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

            utilService.devLog(`Save ${type} — before send`, objToSave)
            await mainService.save(type, objToSave)
            utilService.devLog(`Save ${type} — success`)
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
        <div className="edit-panel">
            {!isNew && (
                <div className="panel-options">
                    <button className="panel-option-btn" onClick={() => setShowVersions(true)} title="גרסאות קודמות">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                        <span>גרסאות קודמות</span>
                    </button>
                    <button className="panel-option-btn" onClick={onImproveWithAi} title="שפר עם AI">
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                        <span>שפר עם AI</span>
                    </button>
                </div>
            )}

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

            <EditForm
                key={`form-${reloadKey}`}
                type={type}
                objToEdit={objToEdit}
                setObjToEdit={handleChange}
                ref={editFormRef}
            />

            {isPlans && (
                <EditContent
                    key={`preview-${reloadKey}`}
                    ref={previewEditorRef}
                    existingContent={objToEdit.previewContent}
                    setObjToEdit={handleChange}
                    isPreview
                />
            )}

            <EditContent
                key={`main-${reloadKey}`}
                ref={mainEditorRef}
                existingContent={objToEdit.content}
                setObjToEdit={handleChange}
            />

            <button className="save-btn" onClick={onSave} disabled={isSaving} title="שמור">
                {isSaving ? <Loading isTxt={false} /> : <i className="fa-solid fa-floppy-disk"></i>}
            </button>

            {showVersions && (
                <VersionsPanel
                    type={type}
                    itemId={id}
                    onClose={() => setShowVersions(false)}
                    onRestored={reloadAfterRestore}
                />
            )}
        </div>
    )
}
