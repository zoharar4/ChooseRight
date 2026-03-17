
import { imageService } from "../services/image.service";


export function EditForm({ type, objToEdit, setObjToEdit }) {

    function handleChange({ target }) {
        const inputId = target.id

        setObjToEdit(prev => ({ ...prev, [inputId]: target.value }))
    }

    async function handleImageChange(ev) {
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

                    <input onChange={handleImageChange} type="file" id="imageUrl" accept="image/*" />
                    {objToEdit.imageUrl && <img src={objToEdit.imageUrl} style={{ width: "200px" }} />}
                </>
            }
            {/* {type === 'recipes' &&
                <>
                    <label htmlFor="title">כותרת:</label>
                    <input onChange={handleChange} value={objToEdit.title} type="text" id="title" />

                    <label htmlFor="previewContent">טקסט מקדים:</label>
                    <input onChange={handleChange} value={objToEdit.previewContent} type="text" id="previewContent" />

                    <input onChange={handleImageChange} type="file" id="imageUrl" accept="image/*" />
                    {objToEdit.imageUrl && <img src={objToEdit.imageUrl} style={{ width: "200px" }} />}
                </>
            } */}
        </form>
    )
}