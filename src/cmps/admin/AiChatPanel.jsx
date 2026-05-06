import { useState } from 'react'
import { aiService } from '../../services/ai.service'
import { AiDiffView } from './AiDiffView'

export function AiChatPanel({ type, getLiveObj, onApply, onClose }) {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [selected, setSelected] = useState(null) // { oldObj, newObj }

    const lastAssistantIdx = findLastIndex(messages, m => m.role === 'assistant' && m.improvedObj)
    const hasPending = lastAssistantIdx !== -1 && messages[lastAssistantIdx].status === 'pending'
    const canSend = !isSending && !hasPending && input.trim()

    async function handleSend() {
        if (!canSend) return
        const text = input.trim()
        const liveObj = getLiveObj()
        const userMsg = { role: 'user', content: text }

        setMessages(prev => [...prev, userMsg])
        setInput('')
        setIsSending(true)

        try {
            const history = messages.map(({ role, content, status }) => (
                role === 'assistant' && status
                    ? { role, content, status }
                    : { role, content }
            ))
            const { obj: improvedObj, message: assistantMsg } = await aiService.improve(type, liveObj, text, history)
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: assistantMsg,
                improvedObj,
                baseObj: liveObj,
                status: 'pending',
            }])
            setSelected({ oldObj: liveObj, newObj: improvedObj })
        } catch (err) {
            console.error(err)
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'שגיאה',
                error: true,
            }])
        } finally {
            setIsSending(false)
        }
    }

    function handleApply(idx) {
        const msg = messages[idx]
        if (!msg?.improvedObj) return
        onApply(msg.improvedObj)
        setMessages(prev => prev.map((m, i) => i === idx ? { ...m, status: 'applied' } : m))
    }

    function handleReject(idx) {
        setMessages(prev => prev.map((m, i) => i === idx ? { ...m, status: 'rejected' } : m))
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <aside className="ai-chat-panel" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
            <div className="ai-chat-shell">
                <div className="ai-chat-side">
                    <header className="ai-chat-header">
                        <h3>שפר עם AI</h3>
                        <button className="ai-chat-close" onClick={onClose} aria-label="סגור">×</button>
                    </header>

                    <div className="ai-chat-thread">
                        {messages.map((m, i) => {
                            const isViewing = m.improvedObj && selected?.newObj === m.improvedObj
                            const isLatestPending = i === lastAssistantIdx && m.status === 'pending'
                            return (
                                <div key={i} className={`ai-chat-msg ${m.role}${m.error ? ' error' : ''}`}>
                                    <div className="ai-chat-bubble">{m.content}</div>
                                    {m.improvedObj && (
                                        <div className="ai-chat-msg-actions">
                                            <button
                                                className={isViewing ? 'is-viewing' : ''}
                                                onClick={() => setSelected({ oldObj: m.baseObj, newObj: m.improvedObj })}
                                            >
                                                {isViewing ? 'בצפייה' : 'צפייה'}
                                            </button>
                                            {isLatestPending && (
                                                <>
                                                    <button className="apply-btn" onClick={() => handleApply(i)}>
                                                        החל שינויים
                                                    </button>
                                                    <button className="reject-btn" onClick={() => handleReject(i)}>
                                                        דחה
                                                    </button>
                                                </>
                                            )}
                                            {m.status === 'applied' && (
                                                <span className="ai-chat-status-badge applied">הוחל ✓</span>
                                            )}
                                            {m.status === 'rejected' && (
                                                <span className="ai-chat-status-badge rejected">נדחה ✗</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}

                        {isSending && (
                            <div className="ai-chat-msg assistant">
                                <div className="ai-chat-bubble ai-chat-typing" aria-label="ה-AI מקליד">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        )}
                    </div>

                    <footer className="ai-chat-input-row">
                        <textarea
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={hasPending ? 'בחר "החל שינויים" או "דחה" כדי להמשיך…' : 'כתוב הוראה ל-AI…'}
                            rows={2}
                            disabled={isSending || hasPending}
                        />
                        <button onClick={handleSend} disabled={!canSend}>
                            שלח
                        </button>
                    </footer>
                </div>

                <div className="ai-diff-side">
                    <div className="ai-diff-pane ai-diff-pane-old">
                        <div className="ai-diff-pane-title">תוכן ישן</div>
                        {selected
                            ? <AiDiffView type={type} oldObj={selected.oldObj} newObj={selected.newObj} variant="old" />
                            : <div className="ai-diff-empty">אין מה להציג</div>}
                    </div>
                    <div className="ai-diff-pane ai-diff-pane-new">
                        <div className="ai-diff-pane-title">תוכן חדש</div>
                        {selected
                            ? <AiDiffView type={type} oldObj={selected.oldObj} newObj={selected.newObj} variant="new" />
                            : <div className="ai-diff-empty">אין מה להציג</div>}
                    </div>
                </div>
            </div>
        </aside>
    )
}

function findLastIndex(arr, predicate) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (predicate(arr[i])) return i
    }
    return -1
}