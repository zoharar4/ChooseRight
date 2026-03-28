import imageCompression from "browser-image-compression";

export const imageService = {
    compressForPreview,
    compressForUpload,
    compressImagePair
}

async function compressForPreview(file) {
    const options = { maxWidthOrHeight: 600, maxSizeMB: 0.15, useWebWorker: true };
    const compressedFile = await imageCompression(file, options);
    return await _fileToBase64(compressedFile);
}

async function compressForUpload(file) {
    const options = { maxWidthOrHeight: 1200, maxSizeMB: 0.4, useWebWorker: true };
    return await imageCompression(file, options);
}

async function _fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// הפונקציה הראשית שלך
export async function compressImagePair(file) {
    const [preview, fullFile] = await Promise.all([
        compressForPreview(file),
        compressForUpload(file)
    ]);
    const fullBase64 = await _fileToBase64(fullFile);

    return [preview, fullBase64];
}