import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore,) { }

  datosUsuarios() {
    this.firestore.collection('Usuarios').valueChanges().subscribe((res) => {
      console.log('Colección ->', res)
    })
  }

  getDoc<tipo>(path: string, id: string) {
    return this.firestore.collection(path).doc<tipo>(id).valueChanges()
  }

  getCollection<tipo>(path){
    const userCollection: AngularFirestoreCollection<tipo> = this.firestore.collection<tipo>(path);
    return userCollection.valueChanges();
  }

  addDoc(path: string, id: string, data: any){
    return this.firestore.collection(path).doc(id).set(data);
  }

  addData(path: string, data: any){
    return this.firestore.collection(path).add(data);
  }

  updateData(path: string, id: string, data: any){
    return this.firestore.collection(path).doc(id).update(data);
  }
  

}
