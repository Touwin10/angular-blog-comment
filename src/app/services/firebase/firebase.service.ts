import { Injectable } from '@angular/core';

import {
  AngularFirestore, DocumentChangeAction,
} from '@angular/fire/firestore';

import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map, take, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs: AngularFirestore) { }

  add(data: any, ref?: any): Promise<firebase.firestore.DocumentReference> {
    const timestamp = this.timestamp;
    const copyTrans = Object.assign({}, data);
    const data$ = JSON.parse(JSON.stringify(copyTrans));

    return this.afs.collection(ref).add({
      ...data$,
      updatedAt: timestamp,
      createdAt: timestamp,
    });
  }

  update<T>(ref: any, data: any): Promise<void> {
    return this.afs.doc(ref).update({
      ...data,
      updatedAt: this.timestamp,
    });
  }

  delete<T>(ref: any): Promise<void> {
    return this.afs.doc(ref).delete();
  }


  colWithIds$<T>(ref?: any, queryFn?): Observable<any[]> {
    return this.afs.collection<T>(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<T>[]) => {
          return actions.map((a: DocumentChangeAction<T>) => {
            const data: Object = a.payload.doc.data() as T;
            const docId = a.payload.doc.id;
            const docPath = a.payload.doc.ref.path;
            data['docPath'] = docPath;
            return { docId, docPath, ...data };
          });
        }),
        shareReplay(1)
      );
  }


  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }


}
