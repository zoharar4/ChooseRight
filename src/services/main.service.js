import { httpService } from "./http.service"

export const mainService = {
    query,
    getById,
    remove,
    save,
    getEmptyObj,
    incrementViews,
    incrementLikes,
    addComment,
    addReply,
}

async function query(type) {
    return httpService.get(type)
}

async function getById(type, id) {
    return httpService.get(`${type}/${id}`)
}

async function remove(type, id) {
    return httpService.delete(`${type}/${id}`)
}

async function save(type, obj) {
    var savedObj
    if (obj._id) {
        savedObj = await httpService.put(`${type}/${obj._id}`, obj)
    } else {
        savedObj = await httpService.post(type, obj)
    }
    return savedObj
}

async function addComment(type, id, comment) {
    return httpService.post(`${type}/${id}/comment`, comment)
}

async function addReply(type, id, commentId, reply) {
    return httpService.post(`${type}/${id}/${commentId}/reply`, reply)
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