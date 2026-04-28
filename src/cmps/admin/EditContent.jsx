import { forwardRef, useImperativeHandle, useRef } from 'react'
import { httpService } from '../../services/http.service'
import { imageService } from '../../services/image.service'
import { Editor } from '@tinymce/tinymce-react'

export const EditContent = forwardRef(function EditContent({ existingContent, setObjToEdit, isPreview }, ref) {
    const editorInstanceRef = useRef(null)

    useImperativeHandle(ref, () => ({
        async uploadImages() {
            if (editorInstanceRef.current) {
                await editorInstanceRef.current.uploadImages()
            }
        },
        getContent() {
            return editorInstanceRef.current?.getContent() ?? existingContent
        }
    }))

    return (
        <div>
            <p style={{ fontSize: '18px' }}>{isPreview ? 'מידע מקדים:' : 'תוכן:'}</p>
            <Editor
                onInit={(evt, editor) => { editorInstanceRef.current = editor }}
                apiKey='iqxzkr9ifunefme17b1zef5elj8dxqlxmlj58673thmle8om'
                value={existingContent}
                onEditorChange={(newContent) => {
                    const field = isPreview ? 'previewContent' : 'content'
                    setObjToEdit(obj => ({ ...obj, [field]: newContent }))
                }}
                init={{
                    height: 500,
                    menubar: true,
                    directionality: 'rtl',
                    onboarding: false,
                    plugins: [
                        "advlist", "autolink", "lists", "link", "charmap",
                        "preview", "anchor", "searchreplace", "visualblocks",
                        "code", "fullscreen", "insertdatetime", "table",
                        "help", "wordcount",
                        ...(isPreview ? [] : ["image", "media"])
                    ].join(" "),
                    toolbar: isPreview
                        ? `undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | removeformat | code | fullscreen | ltr rtl`
                        : `undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | forecolor backcolor | removeformat | code | fullscreen | ltr rtl`,
                    automatic_uploads: !isPreview,
                    images_upload_handler: async (blobInfo) => {
                        const file = new File(
                            [blobInfo.blob()],
                            blobInfo.filename(),
                            { type: blobInfo.blob().type }
                        )
                        const compressedBlob = await imageService.compressForUpload(file)

                        const formData = new FormData()
                        formData.append("file", compressedBlob, file.name)

                        const res = await httpService.post("upload/upload-image", formData)
                        return res.location
                    },
                    images_upload_credentials: true,
                    content_style: `
                        @font-face {
                            font-family: 'Rubik';
                            src: url('src/assets/fonts/Rubik-Regular.ttf') format('truetype');
                            font-weight: normal;
                        }
                        @font-face {
                            font-family: 'Rubik';
                            src: url('src/assets/fonts/Rubik-Bold.ttf') format('truetype');
                            font-weight: bold;
                        }
                        body {
                            font-family: Rubik, Arial, sans-serif;
                            font-size: 14pt;
                        }
                    `
                }}
            />
        </div>
    )
})
