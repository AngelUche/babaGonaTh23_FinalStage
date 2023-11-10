import { app } from "./firebaseConfiguration";
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'


export const fireStoreTxtData=getFirestore(app)
export const FirebaseImageData=getStorage(app) 