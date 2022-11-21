import { initializeApp } from "firebase/app"
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore"
import {
  GithubAuthProvider,
  getAuth,
  signInWithRedirect,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth"
import { getStorage, ref, uploadBytesResumable } from "firebase/storage"

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage()

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
    console.log(user)
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider()
  const auth = getAuth(app)
  return signInWithRedirect(auth, githubProvider) // se va ajecutar onAuthStateChanged
}

export const loginwithGoogle = () => {
  const googleProvider = new GoogleAuthProvider()
  const auth = getAuth(app)
  return signInWithRedirect(auth, googleProvider)
}

export const addNeuit = ({ avatar, content, userId, userName, img }) => {
  const now = Timestamp.fromDate(new Date())

  return addDoc(collection(db, "neuits"), {
    avatar,
    content,
    userId,
    userName,
    img,
    createdAt: now,
    likesCount: 0,
    sharedCount: 0,
  })
}

const mapNeuitFromFirebaseToNeuitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  }
}

export const listenLatestNeuits = (onChange) => {
  const q = query(
    collection(db, "neuits"),
    orderBy("createdAt", "desc"),
    limit(25)
  )
  return onSnapshot(q, (snapshot) => {
    const newNeuits = snapshot.docs.map((doc) => {
      return mapNeuitFromFirebaseToNeuitObject(doc)
    })
    onChange(newNeuits)
  })
}

// export const fetchLatestNeuits = () => {
//   const q = query(collection(db, "neuits"), orderBy("createdAt", "desc"))
//   return getDocs(q).then((snapshot) => {
//     return snapshot.docs.map((doc) => {
//       return mapNeuitFromFirebaseToNeuitObject(doc)
//     })
//   })
// }

export const uploadImage = (file) => {
  const fileRef = ref(storage, `images/${file.name}`)
  const task = uploadBytesResumable(fileRef, file)
  return task
}
