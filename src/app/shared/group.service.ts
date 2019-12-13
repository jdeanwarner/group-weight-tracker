import { Group } from './group';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from './user';
import { map, take, switchMap } from 'rxjs/operators';
import { UserOwned } from './user-owned';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private db: AngularFirestore, private userAuth: AuthService) { }

  makeUserOwnedSetRequest<T extends UserOwned>(userObj: T, func: (userObj: T) => Promise<DocumentReference>): Promise<DocumentReference> {
    return this.userAuth.user$.pipe(
        take(1)
      )
      .toPromise()
      .then((user: User) => func({ ...userObj, uid: user.uid }));
  }

  makeUserOwnedGetRequest(func: (user: User) => Observable<any>): Observable<any> {
    return this.userAuth.user$.pipe(
      take(1),
      switchMap((user: User) => func(user))
    );
  }

  getGroups(): Observable<Group[]> {
    const request = (user: User) => this.db.collection<Group>('groups', ref =>
      ref.where('uid', '==', user.uid)
        .orderBy('date', 'asc')).snapshotChanges()
    .pipe(
      map((actions: DocumentChangeAction<Group>[]) => {
        return actions.map((a: DocumentChangeAction<Group>) => {
          const data: Group = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

    return this.makeUserOwnedGetRequest(request);
  }

  insertGroup(group: Group): Promise<DocumentReference> {
    return this.db.collection('groups').add(group);
  }

  updateGroup(entry: Group): Promise<void> {
    return this.db.collection('groups').doc(entry.id).set(entry);
  }

  deleteGroup(id: string): Promise<void> {
    return this.db.collection('groups').doc(id).delete();
  }
}
