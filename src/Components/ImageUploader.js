import React, { useState } from 'react'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import { storage, db } from '../firebase'
import '../ImageUploader.css'

function ImageUploader({username}) {
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState(null)
    const [progress, setProgress] =useState(0)
    
    const handleChange = (e) =>
    {
        if (e.target.files[0]){
              setImage(e.target.files[0])
    }
}

    const handleUpload = () =>
    {
      
      //how to push the selected file to firebase storage , it is uploading the file
    if(image){
        const uploadTask = storage.ref(`/images/${ image.name }`).put(image)
        uploadTask.on(
            "state_Changed",
            (snapshot) =>
            {  //this piece ofcode gives you that bar UI to see the upload ratio 
                //progress function here...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            (error) =>
            {
                //error function ...
                console.log(error)
                alert(error.message)
            },
            () =>
              {
                //complete function...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL() //this gives a download link which we will provide in the imageURL value of the object
                    .then(url =>
                            { //add listener after putting refernce of the image
                                //post the image insidew database -> in the imageURL field as value
                                db.collection('posts').add({
                                    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    caption: caption,
                                    imageURL: url,
                                    username: username
                                })
                                
                                setProgress(0)
                                setImage(null);
                                setCaption('')
                            }
                        
                        )
              },
        
        )  
      
    } else {
       alert('Please select a file to upload!')
}
   
        
     
    
    }



    return (
        <div className="image-upload">
            {/* What I want to do here */}
        {/* progress bar */}
         <progress className="imageUpload__progress" value={progress} max={100} />
            {/* An Image uploader  // input type-> files*/}
            <input type="file"  onChange={handleChange}/>
         
            {/* caption..... */}
            <input type="text" 
                placeholder="Enter a caption..."
                onChange={(e) => setCaption(e.target.value)}
            />
            {/* upload Button */}
            <Button onClick={handleUpload}>Upload</Button>
   
        </div>
    )
}

export default ImageUploader
