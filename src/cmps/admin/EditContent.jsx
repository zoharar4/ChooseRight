import { Editor } from '@tinymce/tinymce-react';
import { httpService } from '../../services/http.service';
import { imageService } from '../../services/image.service';

export function EditContent({ existingContent, setObjToEdit, editorRef }) {

    return (
        <div style={{ maxWidth: "1200px", margin: "40px auto" }}>
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                apiKey='iqxzkr9ifunefme17b1zef5elj8dxqlxmlj58673thmle8om'
                value={existingContent}
                onEditorChange={(newContent) => {
                    setObjToEdit(obj => ({ ...obj, content: newContent }))
                }}

                init={{
                    height: 500,
                    menubar: true,
                    directionality: 'rtl',
                    onboarding: false,
                    plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount'],
                    toolbar: `undo redo | formatselect | bold italic underline strikethrough |alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | forecolor backcolor | removeformat | code | fullscreen | ltr rtl`,
                    automatic_uploads: true,
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
    );
}