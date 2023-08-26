// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkidVYXiIXv6Im9Ax8uN_DNSskXTvz6EE",
  authDomain: "mindful-cortex-391509.firebaseapp.com",
  projectId: "mindful-cortex-391509",
  storageBucket: "mindful-cortex-391509.appspot.com",
  messagingSenderId: "566694609310",
  appId: "1:566694609310:web:f1092c0afededd6882168f",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export { db }
