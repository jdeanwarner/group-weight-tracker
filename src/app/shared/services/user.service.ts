import { User } from '../user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Group } from '../group';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }


  getUsersByName(name: string): Observable<User[]> {
    return this.db.collection<User>('users', ref =>
      ref.where('displayName', '==', name)).snapshotChanges()
    .pipe(
      map((actions: DocumentChangeAction<User>[]) => {
        return actions.map((a: DocumentChangeAction<User>) => {
          return a.payload.doc.data();
        });
      })
    );
  }

  getGroupUsers(group: Group): Observable<User[]> {
    console.log(group);
    return this.db.collection<User>('users', ref =>
      ref.where('uid', 'in', group.users)).snapshotChanges()
    .pipe(
      map((actions: DocumentChangeAction<User>[]) => {
        console.log('returning users');
        return actions.map((a: DocumentChangeAction<User>) => {
          return a.payload.doc.data();
        });
      })
    );
  }

}
