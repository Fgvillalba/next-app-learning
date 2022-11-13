import {initializeApp} from 'firebase/app'
import {GithubAuthProvider, getAuth, signInWithPopup, onAuthStateChanged} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCQe_GkHfNW9jomu6tfrNIh_A0htvg0pl0",
  authDomain: "nexter-71d26.firebaseapp.com",
  projectId: "nexter-71d26",
  storageBucket: "nexter-71d26.appspot.com",
  messagingSenderId: "44345703366",
  appId: "1:44345703366:web:777a0a45a45c3bccf450c7",
  measurementId: "G-CB0SCJHCED"
};

const app = initializeApp(firebaseConfig)

export const loginWithGitHub = () => {
  const githubProvider = new GithubAuthProvider()
  const auth = getAuth(app)
  return signInWithPopup(auth, githubProvider)
    .then(user => {
      const {_tokenResponse} = user
      const {screenName, photoUrl, email} = _tokenResponse
      return {
        avatar: photoUrl,
        userName: screenName,
        email
      }
  })
}
