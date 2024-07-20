import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getToken, getMessaging } from "firebase/messaging";

const webkey = "AIzaSyCdbLlkYvz4YMw4wGsgSRyFNaLtjZYiRzQ";
const VAPID_KEY =
  "BBSg7J9BbG3skc7YR93aCHu9b1t7VM3hf6DTAveWgovdn_r1P71eR9OZBJvzdV1MF0sOSrAkPBbWTl2OatZe6sA";

const firebaseConfig = {
  apiKey: "AIzaSyA7xlM-2SyZtx9y5sCDPsTY1HoW1j4df8Y",
  authDomain: "testing-74c2e.firebaseapp.com",
  projectId: "testing-74c2e",
  storageBucket: "testing-74c2e.appspot.com",
  messagingSenderId: "100695366533",
  appId: "1:100695366533:web:88b2fb75c39d1fb43fc2ec",
  measurementId: "G-43JNBPQXRJ",
};

const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

let messaging: any = null;
if (typeof window !== "undefined") {
  messaging = getMessaging(app);
}

export { messaging, getToken, VAPID_KEY };
