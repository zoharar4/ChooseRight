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

function stripHtml(html) {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || ''
}

export function AiDiffView({ type, oldObj, newObj, variant = 'new' }) {
    const fields = FIELDS_BY_TYPE[type] || []

    return (
        <div className={`ai-diff-view variant-${variant}`}>
            {fields.map(({ field, isHtml }) => {
                const rawBefore = String(oldObj?.[field] ?? '')
                const rawAfter  = String(newObj?.[field] ?? '')
                if (rawBefore === rawAfter) return null

                const before = isHtml ? stripHtml(rawBefore) : rawBefore
                const after  = isHtml ? stripHtml(rawAfter)  : rawAfter
                const parts  = diffWords(before, after, segmenter ? { intlSegmenter: segmenter } : undefined)

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
