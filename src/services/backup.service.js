import { httpService } from './http.service'
import { utilService } from './util.service'

export const backupService = {
    getVersionCounts,
    getVersions,
    getDeleted,
    getDeletedComments,
    restore,
}

async function getVersionCounts(type) {
    const res = await httpService.get(`backup/version-counts/${type}`)
    utilService.devLog(`Version counts for ${type}`, res)
    return res
}

async function getVersions(type, id) {
    const res = await httpService.get(`backup/versions/${type}/${id}`)
    utilService.devLog(`Versions for ${type}/${id} — ${res.length} versions`, res)
    return res
}

async function getDeleted(type) {
    const res = await httpService.get(`backup/deleted/${type}`)
    utilService.devLog(`Deleted items for ${type} — ${res.length} items`, res)
    return res
}

async function getDeletedComments(type, postId) {
    const res = await httpService.get(`backup/deleted-comments/${type}/${postId}`)
    utilService.devLog(`Deleted comments for ${type}/${postId} — ${res.length} comments`, res)
    return res
}

async function restore(backupId) {
    utilService.devLog(`Restore backup ${backupId} — sending`)
    const res = await httpService.post(`backup/restore/${backupId}`)
    utilService.devLog(`Restore backup ${backupId} — done`, res)
    return res
}
