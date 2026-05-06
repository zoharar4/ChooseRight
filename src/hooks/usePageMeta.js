import { useEffect } from 'react'

const SITE_NAME = 'לבחור נכון'
const DEFAULT_DESCRIPTION = 'לבחור נכון — שמרית בן עמי. ליווי אישי ומקצועי לבריאות טבעית, איזון אורח חיים ושינוי הרגלים.'
const MAX_DESCRIPTION = 160

export function usePageMeta({ title, description, image, type = 'website' } = {}) {
    useEffect(() => {
        const fullTitle = title ? `${title} - ${SITE_NAME}` : SITE_NAME
        document.title = fullTitle

        const cleanDesc = clean(description) || DEFAULT_DESCRIPTION
        const absImage = toAbsolute(image) || `${window.location.origin}/logo.png`
        const url = window.location.href

        setMeta('name', 'description', cleanDesc)
        setMeta('property', 'og:title', fullTitle)
        setMeta('property', 'og:description', cleanDesc)
        setMeta('property', 'og:image', absImage)
        setMeta('property', 'og:url', url)
        setMeta('property', 'og:type', type)
        setMeta('property', 'og:site_name', SITE_NAME)
        setMeta('property', 'og:locale', 'he_IL')
        setMeta('name', 'twitter:card', 'summary_large_image')
        setMeta('name', 'twitter:title', fullTitle)
        setMeta('name', 'twitter:description', cleanDesc)
        setMeta('name', 'twitter:image', absImage)
    }, [title, description, image, type])
}

function setMeta(attr, key, content) {
    if (!content) return
    let el = document.head.querySelector(`meta[${attr}="${key}"]`)
    if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
    }
    el.setAttribute('content', content)
}

function clean(text) {
    if (!text) return ''
    const div = document.createElement('div')
    div.innerHTML = text
    const stripped = (div.textContent || '').replace(/\s+/g, ' ').trim()
    return stripped.length > MAX_DESCRIPTION
        ? stripped.slice(0, MAX_DESCRIPTION - 1).trim() + '…'
        : stripped
}

function toAbsolute(url) {
    if (!url) return ''
    if (/^https?:\/\//.test(url)) return url
    if (url.startsWith('//')) return `https:${url}`
    if (url.startsWith('/')) return `${window.location.origin}${url}`
    return `${window.location.origin}/${url}`
}
