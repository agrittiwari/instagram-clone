import React from 'react'
import '../post.css'
import Avatar from '@material-ui/core/Avatar';
import { useEffect, useState } from 'react'
import {db} from '../firebase'
import Button from '@material-ui/core/Button'
import firebase from 'firebase'



function Post({ user, postId, imageURL, username, caption })
{
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        let unsubscribe;
       if(postId){
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection("comments")
                .orderBy("timeStamp", 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()))
                }
                )
  }
        return () =>
        {
            unsubscribe()
        } 
      
    }, [postId])

    const postComment = (e) =>
    {
        e.preventDefault()
     console.log('clicked!')
            db.collection('posts').doc(postId).collection('comments').add({
                username: user.displayName,
                text: comment,
                timeStamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        
        console.log(`posted to db ${comments}..`)
        setComment('')
        
}

    return (
        <div className="post">
            <div className="post__header">
            <Avatar className='post__avatar' alt="AgritTiwari " src="/static/images/avar/1.jpg"/>
           <h1>{username}</h1>
            </div>
            {/* Header -> avatar + username */}
            
            <img className="post__image" src={imageURL} alt="" />
            {/* Image */}
            {/* like Functionality */}
             <h3 className="post__text"><strong>{username}: </strong>{caption}</h3>
            {/* username + caption */}



            <div className="posted__comments">
                {console.log(`Rendering data/comments ${comments.comment}`)}
                {comments.map((comment) =>
                (<p key={comment.id}>
                    <strong>{ comment.username}</strong>
                    &nbsp;{comment.text}
                </p>)
                )}
            </div>
{user && <form className="comment-section">
                <input type="text" placeholder="your comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                <Button type="submit" disabled={!comment} onClick={postComment}>Post</Button>
            </form> }

            
        </div>
    )
}

export default Post
