import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";
import { toastSuccessNotify, toastErrorNotify } from "./toastNotify";

// TODO: Replace the following with your app's Firebase project configuration

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Authentication
export const createUser = async (email, password, navigate, displayName) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    toastSuccessNotify("Registered successfully!");
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    navigate("/");
    console.log(userCredential);
  } catch (err) {
    console.log(err);
    toastErrorNotify(err.message);
  }
};

export const signIn = async (email, password, navigate) => {
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/");
    toastSuccessNotify("Logged in successfully!");
    console.log(userCredential);
  } catch (err) {
    console.log(err);
    toastErrorNotify(err.message);
  }
};

export const logOut = () => {
  signOut(auth);
};

export const signUpProvider = (navigate) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

// Blog
export const AddBlog = (info) => {
  const db = getDatabase(app);
  const blogRef = ref(db, "blogs/");
  const newBlogRef = push(blogRef);
  set(newBlogRef, {
    title: info.title,
    image: info.image,
    content: info.content,
    comment: info.comment,
    like: info.like,
    author: info.author,
    date: info.date,
  });
};

export const useFetch = () => {
  const [isLoading, setIsLoading] = useState();
  const [blogList, setBlogList] = useState();

  useEffect(() => {
    const db = getDatabase(app);
    const blogRef = ref(db, "blogs/");
    onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      const blogArray = [];

      for (let id in data) {
        blogArray.push({ id, ...data[id] });
      }
      setBlogList(blogArray);
      setIsLoading(false);
    });
  }, []);
  return { isLoading, blogList };
};

export const DeleteBlog = (id) => {
  const db = getDatabase(app);
  remove(ref(db, "blogs/" + id));
};

export const UpdateBlogCard = (info) => {
  const db = getDatabase(app);
  const updates = {};
  updates["blogs/" + info.id] = info;
  return update(ref(db), updates);
};


export const LikeBlog = (currentUser, info) => {
  const db = getDatabase(app);
  if(currentUser){
    if(!Object.values(info).includes(currentUser.email)){
      console.log(Object.values(info.author));
      // console.log(currentUser);
      // const db = getDatabase(app);
    const updates={}
    updates["blogs/"+info.id]={
        ...info,
        like: info.like + 1,
        color:true,
        author:[...info.author,currentUser.email]
      }
    return update(ref(db),updates)
    }
    else{
      // toastErrorNotify("You have already clicked")
      const updates={}
      updates["blogs/"+info.id]={
          ...info,
          like: info.like - 1,
          color:false,
          // usersId:[...blog.usersId,blog.id]
          usersId:[(info.author).filter((item)=>item!==currentUser.email)]
        }
        return update(ref(db),updates)
    }
}}