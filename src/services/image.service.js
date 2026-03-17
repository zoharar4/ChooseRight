import imageCompression from "browser-image-compression";

export const imageService = {
    compressForPreview,
    compressForUpload
}

async function compressForPreview(file) {
    const options = {
        maxWidthOrHeight: 600,
        maxSizeMB: 0.15,
        useWebWorker: true
    }
    const compressedFile = await imageCompression(file, options)

    return await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(compressedFile)
    })
}

async function compressForUpload(file) {
    const options = {
        maxWidthOrHeight: 1200,
        maxSizeMB: 0.4,
        useWebWorker: true
    }
    const res = await imageCompression(file, options)
    return res
}




