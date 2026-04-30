import { useEffect, useState } from "react"
import { PostPreview } from "./PostPreview"
import { mainService } from "../services/main.service"
import { useNavigate } from "react-router"
import { Loading } from "./Loading"

export function BlockPreview({ type }) {
    const [items, setItems] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadItems()
    }, [type])

    async function loadItems() {
        try {
            const res = await mainService.query(type, { limit: 3 })
            console.log('block preview res:',res)
            setItems(res.data)
        } catch (err) {
            console.error("Failed loading previews", err)
        }
    }

    const isBlog = type === 'blog'

    return (
        <section className={`block-preview-section block-preview--${type}`}>
            <div className="container">
                <div className="preview-header">
                    <div className="preview-header-text">
                        <span className="section-label">{isBlog ? 'מהבלוג שלי' : 'מהמטבח שלי'}</span>
                        <h2 className="section-title">{isBlog ? 'פוסטים אחרונים' : 'מתכונים אחרונים'}</h2>
                    </div>
                    <button className="btn-outline" onClick={() => navigate('/' + type)}>
                        ראו הכל ← 


                    </button>
                </div>

                <div className="post-list-home">
                    {!items
                        ? <Loading isForPage={false} />
                        : items.map((item, idx) => (
                            <PostPreview post={item} key={item._id || idx} isHome type={type} />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
