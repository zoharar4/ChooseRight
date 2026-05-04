import { useState } from 'react'
import { aiService } from '../../services/ai.service'
import { AiDiffView } from './AiDiffView'

export function AiChatPanel({ type, getLiveObj, onApply, onClose }) {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [isSending, setIsSending] = useState(false)
    const [selected, setSelected] = useState(null) // { oldObj, newObj }

    async function handleSend() {
        if (!input.trim() || isSending) return
        const text = input.trim()
        const liveObj = getLiveObj()
        const userMsg = { role: 'user', content: text }

        setMessages(prev => [...prev, userMsg])
        setInput('')
        setIsSending(true)

        try {
            const { obj: improvedObj, message: assistantMsg } = await aiService.improve(type, liveObj, text, messages)
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: assistantMsg,
                improvedObj,
                baseObj: liveObj,
            }])
            setSelected({ oldObj: liveObj, newObj: improvedObj })
        } catch (err) {
            console.error(err)
            const fakeImproved = { ...liveObj, title: '123' }
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'שגיאה',
                improvedObj: fakeImproved,
                baseObj: liveObj,
                error: true,
            }])
            setSelected({ oldObj: liveObj, newObj: fakeImproved })
        } finally {
            setIsSending(false)
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <aside className="ai-chat-panel">
            <div className="ai-chat-side">
                <header className="ai-chat-header">
                    <h3>שפר עם AI</h3>
                    <button onClick={onClose}>×</button>
                </header>

                <div className="ai-chat-thread">
                    {messages.map((m, i) => (
                        <div key={i} className={`ai-chat-msg ${m.role}`}>
                            <div className="ai-chat-bubble">{m.content}</div>
                            {m.improvedObj && (
                                <div className="ai-chat-msg-actions">
                                    <button onClick={() => setSelected({ oldObj: m.baseObj, newObj: m.improvedObj })}>
                                        צפייה
                                    </button>
                                    <button onClick={() => onApply(m.improvedObj)}>
                                        החל שינויים
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <footer className="ai-chat-input-row">
                    <textarea
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="כתוב הוראה ל-AI…"
                        rows={2}
                        disabled={isSending}
                    />
                    <button onClick={handleSend} disabled={isSending || !input.trim()}>
                        {isSending ? '...' : 'שלח'}
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
        </aside>
    )
}
