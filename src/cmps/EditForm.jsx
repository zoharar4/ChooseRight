
export function EditForm({ type, objToEdit, setObjToEdit }) {

    function handleChange({ target }) {
        const inputId = target.id

        setObjToEdit(prev => ({ ...prev, [inputId]: target.value }))
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