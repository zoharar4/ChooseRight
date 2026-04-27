import { httpService } from "./http.service"
import { plansService } from "./plans.service"
import { utilService } from "./util.service"

export const mainService = {
    query,
    getById,
    getStats,
    remove,
    save,
    incrementViews,
    incrementLikes,
    addComment,
    removeComment,
    likeComment,
    addReply,
    updateReply,
    removeReply,
    likeReply,
    getRecentComments,
}

async function query(type, options = {}) {
    if (type === 'plans') return await plansService.query()
    const { limit, page, full } = options

    const params = new URLSearchParams()

    if (limit) params.append("limit", limit)
    if (page) params.append("page", page)
    if (full) params.append("full", true)

    const queryString = params.toString()

    const url = `post/${type}${queryString ? `?${queryString}` : ""}`
    const res = await httpService.get(url)
    utilService.devLog(`Query ${type} — ${res.length} items`, res)
    return res
}

async function getById(type, id) {
    if (type === 'plans') return await plansService.getById(id)
    const res = await httpService.get(`post/${type}/${id}`)
    utilService.devLog(`GetById ${type}/${id}`, res)
    return res
}

async function remove(type, id) {
    utilService.devLog(`Remove ${type}/${id} — sending`)
    if (type === 'plans') return await plansService.remove(id)
    const res = await httpService.delete(`post/${type}/${id}`)
    utilService.devLog(`Remove ${type}/${id} — done`, res)
    return res
}

async function save(type, obj) {
    const isUpdate = !!obj._id
    utilService.devLog(`Save ${type} — before ${isUpdate ? 'update' : 'create'}`, obj)
    if (type === 'plans') return await plansService.save(obj)
    let savedObj
    if (isUpdate) {
        savedObj = await httpService.put(`post/${type}/${obj._id}`, obj)
    } else {
        savedObj = await httpService.post(`post/${type}`, obj)
    }
    utilService.devLog(`Save ${type} — after ${isUpdate ? 'update' : 'create'}`, savedObj)
    return savedObj
}

async function addComment(type, id, comment) {
    utilService.devLog(`Add comment to ${type}/${id} — sending`, comment)
    const res = await httpService.post(`post/${type}/${id}/comments`, comment)
    utilService.devLog(`Add comment to ${type}/${id} — done`, res)
    return res
}

async function removeComment(type, id, commentId) {
    utilService.devLog(`Remove comment ${commentId} from ${type}/${id}`)
    const res = await httpService.delete(`post/${type}/${id}/comments/${commentId}`)
    utilService.devLog(`Remove comment ${commentId} — done`, res)
    return res
}

async function addReply(type, id, commentId, reply) {
    utilService.devLog(`Add reply to ${type}/${id}/comment/${commentId} — sending`, reply)
    const res = await httpService.post(`post/${type}/${id}/comments/${commentId}/replies`, reply)
    utilService.devLog(`Add reply — done`, res)
    return res
}
async function updateReply(type, id, commentId, replyId) {
    utilService.devLog(`Update reply ${replyId} in ${type}/${id}`)
    return httpService.put(`post/${type}/${id}/comments/${commentId}/replies/${replyId}`)
}

async function removeReply(type, id, commentId, replyId) {
    utilService.devLog(`Remove reply ${replyId} from ${type}/${id}/comment/${commentId}`)
    const res = await httpService.delete(`post/${type}/${id}/comments/${commentId}/replies/${replyId}`)
    utilService.devLog(`Remove reply ${replyId} — done`, res)
    return res
}

async function getStats(type, id) {
    return httpService.get(`stats/${type}/${id}`)
}

async function getRecentComments(limit = 20) {
    const res = await httpService.get('comments/recent', { limit })
    utilService.devLog(`Recent comments — ${res.length} items`, res)
    return res
}

async function likeComment(type, postId, commentId) {
    return httpService.put(`post/${type}/${postId}/comments/${commentId}/like`)
}

async function likeReply(type, postId, commentId, replyId) {
    return httpService.put(`post/${type}/${postId}/comments/${commentId}/replies/${replyId}/like`)
}

async function incrementViews(type, id) {
    return httpService.put(`stats/views/${type}/${id}`)
}
async function incrementLikes(type, id) {
    return httpService.put(`stats/likes/${type}/${id}`)
}


export const plans = [
    {
        image: '123',
        title: 'ניקוי רעלים',
        subtitle: 'תכנית ליווי אישית לניקוי רעלים',
        details: `"סור מרע ועשה טוב" לגוף ולנפש.
לסלק את הפסולת שמקיפה אותנו מבפנים ומבחוץ ולמלא את הגוף באנרגיה מחודשת.`,
        meetings: `3 מפגשים פרונטליים/בזום, מידע ותוכן, זמינות טלפונית לאורך רוב שעות היום, התאמה אישית לתזונה, פעילות גופנית.`,
        duration: '3 שבועות.',
        cost: 500,
    }
]