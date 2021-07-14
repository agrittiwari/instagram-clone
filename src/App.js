import { useState, useEffect } from 'react'
import './App.css';
import Post from './Components/Post'
import { db,auth } from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input'
import ImageUploader from './Components/ImageUploader';


function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App()
{
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  
  
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)


  const [username, setUsername] = useState('')
  const [email, setEmail] =useState('')
 const [password, setPassword]=useState('') 
  const [user, setUser] = useState(null)
 
  
  useEffect(() =>
  {
    const unsubscribe = auth.onAuthStateChanged((authUser) =>
    {
      if (authUser) {
        //....user logged In
        console.log(authUser)
        setUser(authUser)
 

      } else {
        //user logged out...
      setUser(null)
      }
    })

    return () =>
    {
  //perform some cleanup action
unsubscribe()
    }


  },[user, username])
  
  useEffect(() =>
  {
    db.collection('posts').orderBy('timeStamp', 'desc').onSnapshot(snapshot =>
    {
      // console.dir(snapshot.size)
      // snapshot.docs.map((i) => console.dir(i.id))
      //every time a new post added, this code fires
      setPosts(snapshot.docs.map(doc => ({
        post: doc.data(),
        id: doc.id,
      })))
    })
  }, [])

  const signUp = (e) =>
  {
    e.preventDefault()
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) =>
      {
        authUser.user.updateProfile({
        displayName: username
      })
    })  
      .catch(err => alert(err.message))
    setOpen(false)
  }


  const signIn = (e) =>
  {
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
      .catch((err) => alert(err.message))
    
    setOpenSignIn(false)
  }


  
  return (
    <div className="app">
      
       {/*SignUp modal  */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        >
        {/* The real piece of UI of modal */}
        <div style={modalStyle} className={classes.paper}>
          <center> <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="header-image" />
         
          </center>
         
          <form className="app__signup">
            <Input type="text" placeholder="username" value={username}
              onChange={(e) => setUsername(e.target.value)} />
            <Input placeholder="email" type="text" value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="password" type="text" value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" onClick={signUp} > Sign Up</Button>
          </form>
          
        </div>
      </Modal>
     
     {/* login modal */}
     <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        >
        {/* The real piece of UI of modal */}
        <div style={modalStyle} className={classes.paper}>
          <center> <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="header-image" />
         
          </center>
         
          <form className="app__signup">
            <Input placeholder="email" type="text" value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="password" type="text" value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" onClick={signIn}>Login</Button>
          </form>
          
        </div>
      </Modal>
     
      

      <div className="app__header">
          <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app__header-image" />
      
       {user ? (<Button onClick={() => auth.signOut()}>Logout</Button>) :
        (<div>
          <Button onClick={() => setOpen(true)}>SignUP</Button>
          <Button onClick={() => setOpenSignIn(true)}>Login</Button>
        </div>
    )
     } 
      </div>
     
    
      
      {/* Header */}
      <div className="feed">
       
          {posts.map(({ post, id }) => <Post key={id} user={user} postId={id} caption={post.caption} username={post.username} imageURL={post.imageURL} />)}
    
     
      </div>
      
        {/* posts */}
        {/* posts */}

        {user?.displayName ? <ImageUploader username={ user.displayName}/> : <h1>Login to upload</h1>
      }
    
    </div>
  );
}

export default App;
