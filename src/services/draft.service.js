const STORAGE_KEY = 'admin-drafts'

function getAll() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
        return []
    }
}

function saveAll(drafts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts))
}

// Strips imageUrl to avoid saving large base64 data
function save(type, id, data) {
    const { imageUrl, ...safeData } = data
    const key = `${type}-${id}`
    const drafts = getAll()
    const idx = drafts.findIndex(d => d.key === key)

    const draft = {
        key,
        type,
        id,
        title: data.title || '(ללא כותרת)',
        savedAt: Date.now(),
        data: safeData,
    }

    if (idx >= 0) drafts[idx] = draft
    else drafts.push(draft)

    saveAll(drafts)
}

function get(type, id) {
    return getAll().find(d => d.key === `${type}-${id}`) || null
}

function remove(type, id) {
    saveAll(getAll().filter(d => d.key !== `${type}-${id}`))
}

export const draftService = { getAll, save, get, remove }
