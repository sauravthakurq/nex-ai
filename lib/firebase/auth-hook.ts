import { useEffect, useState } from 'react';
import { auth, db } from './index';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useSettingsStore, SettingsState } from '@/lib/store/settings';

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // When auth changes, sync local Zustand settings store with Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Load user settings
        const docRef = doc(db, 'userSettings', currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const fireStoreSettings = docSnap.data();
          // Update the localized Zustand store with everything saved dynamically
          useSettingsStore.setState((state) => ({
            ...state,
            ...fireStoreSettings,
          }));
        } else {
          // If document doesn't exist but user logged in, create one with current store settings
          const currentStore = useSettingsStore.getState();
          // Filter out function methods from SettingsState
          const { setLanguage: _l, setTheme: _t, ...serializableStore } = currentStore as unknown as { [key: string]: unknown };
          const cleanStore = JSON.parse(JSON.stringify(serializableStore));
          await setDoc(docRef, cleanStore, { merge: true });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
}

// Global helper to push sync anywhere in the app
export const syncSettingsToFirebase = async (newSettingsPartial: Partial<SettingsState>) => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;
  const docRef = doc(db, 'userSettings', currentUser.uid);
  const cleanPartial = JSON.parse(JSON.stringify(newSettingsPartial));
  await setDoc(docRef, cleanPartial, { merge: true });
};