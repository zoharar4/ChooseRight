import { useEffect, useState } from 'react'
import { mainService } from '../../services/main.service'
import { utilService } from '../../services/util.service'
import { CommentsSection } from '../comments/CommentsSection'
import { Loading } from '../Loading'
import { PostSection } from '../PostSection'

export function ViewPanel({ type, id }) {
    const [post, setPost] = useState(null)

    useEffect(() => {
        mainService.getById(type, id)
            .then(item => {
                utilService.devLog(`View loaded — ${type}/${id}`, item)
                setPost(item)
            })
            .catch(err => {
                console.error(err)
                setPost({})
            })
    }, [type, id])

    if (!post?._id) return <Loading isForPage />

    return (
        <div className="view-panel">
            <PostSection post={post} setPost={setPost} type={type} />
            <CommentsSection post={post} setPost={setPost} type={type} />
        </div>
    )
}
