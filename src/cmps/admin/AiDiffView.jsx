import { useState } from 'react'
import { diffWords } from 'diff'

const FIELDS_BY_TYPE = {
    blog:    [{ field: 'title', isHtml: false }, { field: 'previewContent', isHtml: false }, { field: 'content', isHtml: true }],
    recipes: [{ field: 'title', isHtml: false }, { field: 'previewContent', isHtml: false }, { field: 'content', isHtml: true }],
    plans:   [{ field: 'title', isHtml: false }, { field: 'previewContent', isHtml: true  }, { field: 'content', isHtml: true }, { field: 'price', isHtml: false }, { field: 'duration', isHtml: false }],
}

// Hebrew letters are not in \w, so jsdiff's default tokenizer treats every
// Hebrew character as its own token (char-level diff). Intl.Segmenter gives
// true word boundaries for any language.
const segmenter = typeof Intl !== 'undefined' && Intl.Segmenter
    ? new Intl.Segmenter('he', { granularity: 'word' })
    : null

const BLOCK_TAGS = new Set([
    'P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
    'LI', 'UL', 'OL', 'TR', 'BLOCKQUOTE', 'PRE',
    'SECTION', 'ARTICLE', 'HEADER', 'FOOTER',
])

// textContent collapses block boundaries, gluing words from sibling <p>s
// together. Walk the tree and insert \n around block elements / on <br>.
function htmlToText(html) {
    const root = document.createElement('div')
    root.innerHTML = html
    let out = ''
    const walk = node => {
        if (node.nodeType === 3) { out += node.textContent; return }
        if (node.nodeType !== 1) return
        const tag = node.tagName
        if (tag === 'BR') { out += '\n'; return }
        const isBlock = BLOCK_TAGS.has(tag)
        if (isBlock && out && !out.endsWith('\n')) out += '\n'
        for (const child of node.childNodes) walk(child)
        if (isBlock && !out.endsWith('\n')) out += '\n'
    }
    walk(root)
    return out.replace(/\n{3,}/g, '\n\n').trim()
}

function TextDiffBody({ before, after }) {
    const parts = diffWords(before, after, segmenter ? { intlSegmenter: segmenter } : undefined)
    return (
        <div className="ai-diff-body is-text-diff">
            {parts.map((p, i) => (
                <span key={i} className={p.added ? 'ins' : p.removed ? 'del' : ''}>{p.value}</span>
            ))}
        </div>
    )
}

function HtmlField({ field, oldHtml, newHtml, sourceHtml }) {
    const [showDiff, setShowDiff] = useState(false)
    return (
        <div className="ai-diff-field">
            <div className="ai-diff-field-head">
                <div className="ai-diff-label">{field}</div>
                <button
                    type="button"
                    className={`ai-diff-toggle${showDiff ? ' is-on' : ''}`}
                    onClick={() => setShowDiff(v => !v)}
                >
                    {showDiff ? 'תצוגה' : 'הצג שינויים'}
                </button>
            </div>
            {showDiff
                ? <TextDiffBody before={htmlToText(oldHtml)} after={htmlToText(newHtml)} />
                : <div className="ai-diff-body is-html" dangerouslySetInnerHTML={{ __html: sourceHtml }} />}
        </div>
    )
}

export function AiDiffView({ type, oldObj, newObj, variant = 'new' }) {
    const fields = FIELDS_BY_TYPE[type] || []
    const source = variant === 'old' ? oldObj : newObj

    return (
        <div className={`ai-diff-view variant-${variant}`}>
            {fields.map(({ field, isHtml }) => {
                const rawBefore = String(oldObj?.[field] ?? '')
                const rawAfter  = String(newObj?.[field] ?? '')
                if (rawBefore === rawAfter) return null

                if (isHtml) {
                    return (
                        <HtmlField
                            key={field}
                            field={field}
                            oldHtml={rawBefore}
                            newHtml={rawAfter}
                            sourceHtml={String(source?.[field] ?? '')}
                        />
                    )
                }

                const parts = diffWords(rawBefore, rawAfter, segmenter ? { intlSegmenter: segmenter } : undefined)
                return (
                    <div className="ai-diff-field" key={field}>
                        <div className="ai-diff-label">{field}</div>
                        <div className="ai-diff-body">
                            {parts.map((p, i) => (
                                <span key={i} className={p.added ? 'ins' : p.removed ? 'del' : ''}>{p.value}</span>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
