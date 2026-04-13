import { httpService } from "./http.service"
import { plansService } from "./plans.service"

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
    return httpService.get(url)
}

async function getById(type, id) {
    if (type === 'plans') return await plansService.getById(id)
    return httpService.get(`post/${type}/${id}`)
}

async function remove(type, id) {
    if (type === 'plans') return await plansService.remove(id)
    return httpService.delete(`post/${type}/${id}`)
}

async function save(type, obj) {
    if (type === 'plans') return await plansService.save(obj)
    let savedObj
    if (obj._id) {
        savedObj = await httpService.put(`post/${type}/${obj._id}`, obj)
    } else {
        savedObj = await httpService.post(`post/${type}`, obj)
    }
    return savedObj
}

async function addComment(type, id, comment) {
    return httpService.post(`post/${type}/${id}/comments`, comment)
}

async function removeComment(type, id, commentId) {
    return httpService.delete(`post/${type}/${id}/comments/${commentId}`)
}

async function addReply(type, id, commentId, reply) {
    return httpService.post(`post/${type}/${id}/comments/${commentId}/replies`, reply)
}
async function updateReply(type, id, commentId, replyId) {
    return httpService.put(`post/${type}/${id}/comments/${commentId}/replies/${replyId}`)
}

async function removeReply(type, id, commentId, replyId) {
    return httpService.delete(`post/${type}/${id}/comments/${commentId}/replies/${replyId}`)
}

async function getStats(type, id) {
    return httpService.get(`stats/${type}/${id}`)
}

async function getRecentComments(limit = 20) {
    return httpService.get('comments/recent', { limit })
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