
export const myUtilService = {
    makeId,
    makeLorem,
    getTimeStamp,
    saveToStorage,
    loadFromStorage,
    removeFromStorage,
    sortBy,
    getRandomIntInclusive,
    debounce,
    animateCSS,
}

//Make text

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ["the", "silent", "wind", "moved", "across", "the", "open", "field", "under", "soft", "morning", "light", "i", "walked", "toward", "the", "far", "hills", "with", "a", "clear", "mind", "and", "steady", "steps", "every", "shadow", "felt", "like", "a", "memory", "waiting", "to", "be", "named", "again", "and", "again", "the", "ground", "carried", "the", "warm", "touch", "of", "yesterday", "while", "the", "air", "held", "the", "promise", "of", "tomorrow", "we", "followed", "a", "narrow", "path", "that", "twisted", "through", "quiet", "grass", "and", "low", "stone", "nothing", "seemed", "fixed", "everything", "shifted", "like", "water", "under", "a", "passing", "cloud", "the", "world", "moved", "with", "soft", "rhythms", "and", "we", "moved", "with", "it", "without", "fear", "each", "moment", "opened", "into", "another", "moment", "like", "pages", "turning", "in", "a", "slow", "book", "the", "air", "tasted", "bright", "and", "the", "ground", "felt", "steady", "under", "careful", "steps", "i", "heard", "voices", "from", "far", "places", "echoing", "through", "the", "moving", "light", "we", "carried", "stories", "in", "our", "hands", "collecting", "them", "piece", "by", "piece", "from", "strangers", "every", "story", "changed", "by", "the", "time", "it", "reached", "us", "shifting", "like", "dust", "in", "a", "soft", "breeze", "the", "land", "spread", "wide", "before", "us", "open", "and", "quiet", "like", "a", "slow", "breath", "we", "walked", "together", "with", "steady", "intent", "following", "lines", "drawn", "by", "old", "choices", "the", "sky", "shifted"
        , "colors", "while", "the", "earth", "held", "its", "calm", "shape", "beneath", "our", "feet", "i", "found", "comfort", "in", "the", "simple", "movement", "forward", "without", "questions", "or", "fear", "we", "shared", "words", "between", "steps", "small", "thoughts", "carried", "like", "stones", "in", "a", "pocket", "the", "road", "continued", "beyond", "sight", "inviting", "us", "to", "move", "farther", "into", "quiet", "distance", "we", "held", "onto", "our", "purpose", "letting", "the", "wind", "guide", "our", "pace", "and", "our", "breath", "each", "step", "followed", "the", "next", "with", "soft", "certainty", "like", "notes", "in", "a", "slow", "song", "the", "morning", "grew", "wide", "and", "bright", "as", "we", "moved", "through", "open", "space", "and", "gentle", "light", "i", "felt", "the", "quiet", "strength", "of", "the", "day", "rising", "inside", "me", "without", "effort", "we", "continued", "forward", "carrying", "simple", "stories", "toward", "places", "not", "yet", "seen", "the", "land", "and", "sky", "spoke", "in", "silent", "phrases", "while", "we", "listened", "with", "tired", "but", "honest", "hearts", "we", "moved", "toward", "new", "shapes", "new", "moments", "new", "paths", "with", "open", "steps", "and", "clear", "eyes"]
    const signs = ['!', '.', '?', ':', ',']
    var txt = ''
    var lastSign = 0
    while (size > 0) {
        lastSign++
        size--
        txt += words[Math.floor(Math.random() * words.length)]
        if (lastSign > 5 && lastSign < size - 5 && Math.random() > 0.5) {
            lastSign = 0
            txt += signs[Math.floor(Math.random() * signs.length)] + ' '
        } else {
            txt += ' '
        }
    }
    txt += '.'
    console.log('txt:', txt)
    return txt
}

function getTimeStamp(time) {
    const sentAt = new Date(time)
    const timeDiff = new Date() - sentAt
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    if (timeDiff < 86400000) {
        const hour = sentAt.getHours()
        const AMPM = hour >= 12 ? 'PM' : 'AM'

        return `${hour}:${sentAt.getMinutes().toString().padStart(2, 0)} ${AMPM}`
    } else if (timeDiff < 31622400000) {

        return `${months[sentAt.getMonth()]} ${sentAt.getDate() + 1}`
    } else {
        return `${sentAt.getMonth()}/${sentAt.getDate()}/${sentAt.getFullYear().toString().slice(2, 4)}`
    }

}


//LocalStorage

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function removeFromStorage(key) {
    localStorage.removeItem(key)
}


//Sorting

function sortBy(array, isFromA, key) { //key is not neccesery if not obj. 
    const sortedArray = [...array]

    sortedArray.sort((a, b) => {
        const itemA = key ? a[key] : a
        const itemB = key ? b[key] : b

        if (typeof itemA === 'number' && typeof itemB === 'number') {
            return isFromA ? itemA - itemB : itemB - itemA
        }

        return isFromA ? String(itemA).localeCompare(String(itemB)) : String(itemB).localeCompare(String(itemA))
    })
    return sortedArray
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function animateCSS(el, animation, options = {}) {
    const { isRemoveClass = true } = options

    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`
        el.classList.add(`${prefix}animated`, animationName)

        function handleAnimationEnd(event) {
            event.stopPropagation()
            if (isRemoveClass) {
                el.classList.remove(`${prefix}animated`, animationName)
            }
            resolve('Animation ended')
        }

        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}

function debounce(func, delay) {
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}