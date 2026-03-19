
import { useState } from "react";
import { imageService } from "../../services/image.service";


export function EditForm({ type, objToEdit, setObjToEdit }) {

    const [isDragging, setIsDragging] = useState(false)


    function handleChange({ target }) {
        const inputId = target.id
        setObjToEdit(prev => ({ ...prev, [inputId]: target.value }))
    }

    async function handleFile(ev) {
        ev.preventDefault()
        const file = ev.target.files[0]
        if (!file) return

        setObjToEdit(prev => ({ ...prev, imageUrl: '' }))

        try {
            const imageUrl = await imageService.compressForPreview(file, true)
            setObjToEdit(prev => ({ ...prev, imageUrl }))
        } catch (err) {
            console.error('cant compress file:', err)
        }
    }

    function handleDrop(ev) {
        ev.preventDefault()
        setIsDragging(false)

        const file = ev.dataTransfer.files[0]
        handleFile(file)
    }

    function onSubmit(ev) {
        ev.preventDefault()
    }

    return (
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: 'column', gap: '8px' }}>
            {(type === 'blog' || type === 'recipes') &&
                <>
                    <label htmlFor="title">כותרת:</label>
                    <input onChange={handleChange} value={objToEdit.title} type="text" id="title" />

                    <label htmlFor="previewContent">טקסט מקדים:</label>
                    <input onChange={handleChange} value={objToEdit.previewContent} type="text" id="previewContent" />

                    <div
                        className={`upload-box ${isDragging ? "dragging" : ""}`}
                        onDragOver={(e) => {
                            e.preventDefault()
                            setIsDragging(true)
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById("fileInput").click()}
                    >
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleFile}
                            hidden
                        />

                        {!objToEdit.imageUrl ? (
                            <p>גרור תמונה לכאן או לחץ לבחירה</p>
                        ) : (
                            <img src={objToEdit.imageUrl} />
                        )}
                    </div>
                </>
            }
        </form>
    )
}