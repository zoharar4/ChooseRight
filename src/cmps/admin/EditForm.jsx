import { useRef, useState, forwardRef, useImperativeHandle } from "react"
import { imageService } from "../../services/image.service"

const formConfig = {
    blog: [
        { field: "title", label: "כותרת", type: "text", required: true },
        { field: "previewContent", label: "תוכן מקדים", type: "text", required: true }
    ],
    recipes: [
        { field: "title", label: "כותרת", type: "text", required: true },
        { field: "previewContent", label: "תוכן מקדים", type: "text", required: true }
    ],
    plans: [
        { field: "title", label: "כותרת", type: "text", required: true }
    ]
}

export const EditForm = forwardRef(function EditForm({ type, objToEdit, setObjToEdit }, ref) {

    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef(null)
    const uploadPromiseRef = useRef(null)
    const latestImageRef = useRef(null)

    function handleChange({ target }) {
        const { id, value } = target
        setObjToEdit(prev => ({ ...prev, [id]: value }))
    }

    async function processFile(file) {
        if (!file) return

        const promise = (async () => {
            try {
                const [preview, fullImage] = await imageService.compressImagePair(file)
                const imageData = [preview, fullImage]

                latestImageRef.current = imageData

                setObjToEdit(prev => ({
                    ...prev,
                    imageUrl: imageData
                }))

            } catch (err) {
                console.error("cant compress file:", err)
            }
        })()

        uploadPromiseRef.current = promise

        try {
            await promise
        } finally {
            uploadPromiseRef.current = null
        }
    }

    function handleFile({ target }) {
        const file = target.files[0]
        processFile(file)
    }

    function handleDrop(ev) {
        ev.preventDefault()
        setIsDragging(false)
        const file = ev.dataTransfer.files[0]
        processFile(file)
    }

    useImperativeHandle(ref, () => ({
        async waitForImageUpload() {
            if (uploadPromiseRef.current) {
                await uploadPromiseRef.current
            }
        },

        // 🔥 זה החדש — מביא תמיד את הדאטה העדכני
        getLatestImage() {
            return latestImageRef.current
        }
    }))

    return (
        <div className="edit-form" >

            {formConfig[type]?.map(({ field, label, type: inputType, required }) => (
                <div className="input-container" key={field}>
                    <label htmlFor={field}>
                        {label}{required && " *"}
                    </label>

                    <input
                        id={field}
                        type={inputType}
                        required={required}
                        value={objToEdit[field] || ""}
                        onChange={handleChange}
                    />
                </div>
            ))}

            <div
                className={`upload-box ${isDragging ? "dragging" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                        setIsDragging(false)
                    }
                }}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    hidden
                />

                {!objToEdit.imageUrl?.[1] ? (
                    <p>גרור תמונה לכאן או לחץ לבחירה</p>
                ) : (
                    <img src={objToEdit.imageUrl[1]} alt="preview" />
                )}
            </div>
        </div>
    )
})