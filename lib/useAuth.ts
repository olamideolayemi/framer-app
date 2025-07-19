'use client';

import { useEffect, useState } from 'react';
import {
	onAuthStateChanged,
	signOut as firebaseSignOut,
	User,
} from 'firebase/auth';
import { auth } from './firebase';

export const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const signOut = async () => {
		await firebaseSignOut(auth);
		setUser(null);
	};

	return { user, loading, signOut };
};
