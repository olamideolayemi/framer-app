import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBxQPE2vuzLqKKVjnKJmKygEUR2AU5neTc',
	authDomain: 'framer-app-6e2ea.firebaseapp.com',
	projectId: 'framer-app-6e2ea',
	storageBucket: 'framer-app-6e2ea.firebasestorage.app',
	messagingSenderId: '1034356502834',
	appId: '1:1034356502834:web:6019933a2cb4130e66a72b',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, storage };
