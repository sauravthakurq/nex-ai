import { db } from './index';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  limit,
} from 'firebase/firestore';

export interface FeaturedClassroom {
  classroomData?: unknown;
  id: string;
  topic: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  createdAt: number;
}

export const CLASSROOMS_COLLECTION = 'classrooms';

export async function saveFeaturedClassroom(data: FeaturedClassroom) {
  try {
    const docRef = doc(db, CLASSROOMS_COLLECTION, data.id);
    await setDoc(
      docRef,
      {
        ...data,
        createdAt: data.createdAt || Date.now(),
        _serverTimestamp: serverTimestamp(), // To allow backend sorting if needed
      },
      { merge: true },
    );
    console.log('Saved featured classroom:', data.id);
  } catch (error) {
    console.error('Error saving featured classroom:', error);
  }
}

export function subscribeToFeaturedClassrooms(callback: (classrooms: FeaturedClassroom[]) => void) {
  const q = query(collection(db, CLASSROOMS_COLLECTION), orderBy('createdAt', 'desc'), limit(50));

  return onSnapshot(
    q,
    (snapshot) => {
      const classrooms: FeaturedClassroom[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data() as FeaturedClassroom;
        classrooms.push(data);
      });
      callback(classrooms);
    },
    (error) => {
      console.error('Error subscribing to featured classrooms:', error);
    },
  );
}

export async function getFeaturedClassrooms(): Promise<FeaturedClassroom[]> {
  try {
    const q = query(collection(db, CLASSROOMS_COLLECTION), orderBy('createdAt', 'desc'), limit(50));
    const snapshot = await getDocs(q);
    const classrooms: FeaturedClassroom[] = [];
    snapshot.forEach((doc) => {
      classrooms.push(doc.data() as FeaturedClassroom);
    });
    return classrooms;
  } catch (error) {
    console.error('Error fetching featured classrooms:', error);
    return [];
  }
}

export async function getClassroomById(id: string): Promise<FeaturedClassroom | null> {
  try {
    const docRef = doc(db, CLASSROOMS_COLLECTION, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as FeaturedClassroom;
    }
    return null;
  } catch (error) {
    console.error('Error fetching classroom by id:', error);
    return null;
  }
}
