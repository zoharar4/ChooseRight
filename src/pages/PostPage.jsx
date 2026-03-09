import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { mainService } from "../services/main.service";


export function PostPage() {
    const { id } = useParams()
    const [post, setPost] = useState()

    useEffect(() => {
        loadPost()

        async function loadPost() {
            try {
                const postToSave = await mainService.getById("blog", id)
                setPost(postToSave)
            } catch (err) {
                console.log("Failed to load post", err)
            }
        }
    }, [id])

    useEffect(() => {
        updateViews()

        async function updateViews() {
            try {
               const trew = await mainService.incrementViews("blog", id)
                console.log('trew:',trew)
            } catch (err) {
                console.log('err:',err)
            }

        }
    }, [])

    return (
        <div className="post-page" >
            {post && (<div dangerouslySetInnerHTML={{ __html: post.content }}></div>)}
        </div>
    )

}