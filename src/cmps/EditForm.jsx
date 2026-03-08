
import imageCompression from "browser-image-compression";


export function EditForm({ type, objToEdit, setObjToEdit }) {

    function handleChange({ target }) {
        const inputId = target.id

        setObjToEdit(prev => ({ ...prev, [inputId]: target.value }))
    }

    async function handleImageChange(ev) {
        const file = ev.target.files[0]

        if (!file) return

        const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1600,
            useWebWorker: true
        }

        const compressedFile = await imageCompression(file, options)

        console.log("original:", file.size)
        console.log("compressed:", compressedFile.size)

        const reader = new FileReader()
        reader.onloadend = () => {
            setObjToEdit(prev => ({
                ...prev, imageUrl: reader.result
            }))
        }
        
        reader.readAsDataURL(compressedFile)
    }

    function onSubmit(ev) {
        ev.preventDefault()
    }

    return (
        <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: 'column', gap: '8px' }}>
            {type === 'blog' &&
                <>
                    <label htmlFor="title">כותרת:</label>
                    <input onChange={handleChange} value={objToEdit.title} type="text" id="title" />

                    <label htmlFor="previewContent">טקסט מקדים:</label>
                    <input onChange={handleChange} value={objToEdit.previewContent} type="text" id="previewContent" />

                    <input onChange={handleImageChange} type="file" id="imageUrl" accept="image/*" />
                    {objToEdit.imageUrl && <img src={objToEdit.imageUrl} style={{ width: "200px" }} />}
                </>
            }
            {type === 'recipes' &&
                <>
                    <label htmlFor="title">כותרת:</label>
                    <input onChange={handleChange} value={objToEdit.title} type="text" id="title" />
                    <label htmlFor="previewContent">טקסט מקדים:</label>
                    <input onChange={handleChange} value={objToEdit.previewContent} type="text" id="previewContent" />
                </>
            }
        </form>
    )
}