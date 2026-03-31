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
        console.log('loading type:', type)
        try {
            const res = await mainService.query(type, { limit: 3 })
            setItems(res.data)
        } catch (err) {
            console.error("Failed loading previews", err)
        }
    }

    return (
        <section className="home-post-block">
            <div className="top-container">
                <h2>{type === 'blog' ? 'פוסטים אחרונים' : "מתכונים אחרונים"}</h2>
                <span onClick={() => navigate('/' + type)}>הצג הכל</span>
            </div>
            <div className="post-list-home">
                {!items
                    ?
                    <Loading isForPage={false} />
                    :
                    // {
                    items.map((item, idx) => (
                        <PostPreview post={item} key={item._id || idx} isHome type={type} />
                    ))
                    // }
                }
            </div>
        </section>
    )
}