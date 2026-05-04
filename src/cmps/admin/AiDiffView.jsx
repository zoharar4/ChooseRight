import { diffWords } from 'diff'
import HtmlDiff from 'htmldiff-js'

const FIELDS_BY_TYPE = {
    blog:    [{ field: 'title', isHtml: false }, { field: 'previewContent', isHtml: false }, { field: 'content', isHtml: true }],
    recipes: [{ field: 'title', isHtml: false }, { field: 'previewContent', isHtml: false }, { field: 'content', isHtml: true }],
    plans:   [{ field: 'title', isHtml: false }, { field: 'previewContent', isHtml: true  }, { field: 'content', isHtml: true }, { field: 'price', isHtml: false }, { field: 'duration', isHtml: false }],
}

// variant: 'old' shows the original with removed words highlighted (red).
//          'new' shows the improved with added words highlighted (green).
// CSS hides the irrelevant ins/del per variant.
export function AiDiffView({ type, oldObj, newObj, variant = 'new' }) {
    const fields = FIELDS_BY_TYPE[type] || []
    console.log('oldObj:', oldObj)
    console.log('newObj:', newObj)

    return (
        <div className={`ai-diff-view variant-${variant}`}>
            {fields.map(({ field, isHtml }) => {
                const before = String(oldObj?.[field] ?? '')
                const after  = String(newObj?.[field] ?? '')
                if (before === after) return null

                return (
                    <div className="ai-diff-field" key={field}>
                        <div className="ai-diff-label">{field}</div>
                        {isHtml
                            ? <div className="ai-diff-body" dangerouslySetInnerHTML={{ __html: HtmlDiff.execute(before, after) }} />
                            : <div className="ai-diff-body">
                                {diffWords(before, after).map((p, i) => (
                                    <span key={i} className={p.added ? 'ins' : p.removed ? 'del' : ''}>{p.value}</span>
                                ))}
                              </div>
                        }
                    </div>
                )
            })}
        </div>
    )
}
