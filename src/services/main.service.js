import { httpService } from "./http.service"

export const mainService = {
    query,
    queryAdmin,
    getById,
    remove,
    save,
    getEmptyObj,
    incrementViews,
    incrementLikes,
    addComment,
    removeComment,
    addReply,
    updateReply,
    removeReply,
}

async function query(type) {
    return httpService.get(`post/${type}`)
}
async function queryAdmin(type) {
    return httpService.get(`post/${type}/admin`)
}

async function getById(type, id) {
    return httpService.get(`post/${type}/${id}`)
}

async function remove(type, id) {
    return httpService.delete(`post/${type}/${id}`)
}

async function save(type, obj) {
    var savedObj
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

async function incrementViews(type, id) {
    return httpService.put(`stats/views/${type}/${id}`)
}
async function incrementLikes(type, id) {
    return httpService.put(`stats/likes/${type}/${id}`)
}
async function incrementShares(type, id) {
    return httpService.put(`stats/shares/${type}/${id}`)
}


function getEmptyObj(type) {
    if (type === 'blog') {
        return {
            title: '',
            imageUrl: '',
            previewContent: '',
            content: '',
        }
    } else if (type === 'recipes') {
        return {
            title: '',
            imageUrl: '',
            previewContent: '',
            content: '',
        }
    }
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
    }, {
        image: '123',
        title: 'ניקוי רעלים',
        subtitle: 'תכנית ליווי אישית לניקוי רעלים',
        details: `"סור מרע ועשה טוב" לגוף ולנפש.
לסלק את הפסולת שמקיפה אותנו מבפנים ומבחוץ ולמלא את הגוף באנרגיה מחודשת.`,
        meetings: `3 מפגשים פרונטליים/בזום, מידע ותוכן, זמינות טלפונית לאורך רוב שעות היום, התאמה אישית לתזונה, פעילות גופנית.`,
        duration: '3 שבועות.',
        cost: 500,
    }, {
        image: '123',
        title: 'ניקוי רעלים',
        subtitle: 'תכנית ליווי אישית לניקוי רעלים',
        details: `"סור מרע ועשה טוב" לגוף ולנפש.
לסלק את הפסולת שמקיפה אותנו מבפנים ומבחוץ ולמלא את הגוף באנרגיה מחודשת.`,
        meetings: `3 מפגשים פרונטליים/בזום, מידע ותוכן, זמינות טלפונית לאורך רוב שעות היום, התאמה אישית לתזונה, פעילות גופנית.`,
        duration: '3 שבועות.',
        cost: 500,
    }, {
        image: '123',
        title: 'ניקוי רעלים',
        subtitle: 'תכנית ליווי אישית לניקוי רעלים',
        details: `"סור מרע ועשה טוב" לגוף ולנפש.
לסלק את הפסולת שמקיפה אותנו מבפנים ומבחוץ ולמלא את הגוף באנרגיה מחודשת.`,
        meetings: `3 מפגשים פרונטליים/בזום, מידע ותוכן, זמינות טלפונית לאורך רוב שעות היום, התאמה אישית לתזונה, פעילות גופנית.`,
        duration: '3 שבועות.',
        cost: 500,
    }, {
        image: '123',
        title: 'ניקוי רעלים',
        subtitle: 'תכנית ליווי אישית לניקוי רעלים',
        details: `"סור מרע ועשה טוב" לגוף ולנפש.
לסלק את הפסולת שמקיפה אותנו מבפנים ומבחוץ ולמלא את הגוף באנרגיה מחודשת.`,
        meetings: `3 מפגשים פרונטליים/בזום, מידע ותוכן, זמינות טלפונית לאורך רוב שעות היום, התאמה אישית לתזונה, פעילות גופנית.`,
        duration: '3 שבועות.',
        cost: 500,
    }, {
        image: '123',
        title: 'ניקוי רעלים',
        subtitle: 'תכנית ליווי אישית לניקוי רעלים',
        details: `"סור מרע ועשה טוב" לגוף ולנפש.
לסלק את הפסולת שמקיפה אותנו מבפנים ומבחוץ ולמלא את הגוף באנרגיה מחודשת.`,
        meetings: `3 מפגשים פרונטליים/בזום, מידע ותוכן, זמינות טלפונית לאורך רוב שעות היום, התאמה אישית לתזונה, פעילות גופנית.`,
        duration: '3 שבועות.',
        cost: 500,
    },
]