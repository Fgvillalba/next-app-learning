import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  query,
  getDocs,
} from "firebase/firestore"
import {
  GithubAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCQe_GkHfNW9jomu6tfrNIh_A0htvg0pl0",
  authDomain: "nexter-71d26.firebaseapp.com",
  projectId: "nexter-71d26",
  storageBucket: "nexter-71d26.appspot.com",
  messagingSenderId: "44345703366",
  appId: "1:44345703366:web:777a0a45a45c3bccf450c7",
  measurementId: "G-CB0SCJHCED",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const mapUserFromFirebaseAuthToUser = (userFromFirebase) => {
  const { displayName, email, photoURL, uid } = userFromFirebase
  return {
    avatar: photoURL,
    userName: displayName,
    email,
    id: uid,
  }
}

export const onUserStateChanged = (onChange) => {
  const auth = getAuth(app)
  return onAuthStateChanged(auth, (user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider()
  const auth = getAuth(app)
  console.log("loginWithgitHub")
  return signInWithPopup(auth, githubProvider) // se va ajecutar onAuthStateChanged
}

export const addNeuit = ({ avatar, content, userId, userName }) => {
  const now = Timestamp.fromDate(new Date())

  return addDoc(collection(db, "neuits"), {
    avatar,
    content,
    userId,
    userName,
    createdAt: now,
    likesCount: 0,
    sharedCount: 0,
  })
}

export const fetchLatestDevits = () => {
  const q = query(collection(db, "neuits"))
  return getDocs(q).then((snapshot) => {
    return snapshot.docs.map((doc) => {
      const data = doc.data()
      const id = doc.id
      return {
        id,
        ...data,
      }
    })
  })
}
