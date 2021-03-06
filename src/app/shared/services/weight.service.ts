import { WeightEntry } from '../weight-entry';
import { Injectable } from '@angular/core';
import { DocumentReference, AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { take, switchMap, map } from 'rxjs/operators';
import { User } from '../user';
import { UserOwned } from '../user-owned';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { INIT_DATA } from '../init-data';
import { Group } from '../group';

@Injectable({
  providedIn: 'root'
})
export class WeightService {

  constructor(private db: AngularFirestore, private userAuth: AuthService) { }

  async makeUserOwnedSetRequest<T extends UserOwned>(userObj: T, func: (userObj: T) => Promise<DocumentReference>):
    Promise<DocumentReference> {
    const user = await this.userAuth.user$.pipe(take(1)).toPromise();
    return func({ ...userObj, uid: user.uid });
  }

  makeUserOwnedGetRequest(func: (user: User) => Observable<any>): Observable<any> {
    return this.userAuth.user$.pipe(
      take(1),
      switchMap((user: User) => func(user))
    );
  }

  getWeightEntries(): Observable<WeightEntry[]> {
    const request = (user: User) => this.db.collection<WeightEntry>('weightEntries', ref =>
      ref.where('uid', '==', user.uid)
        .orderBy('date', 'asc')).snapshotChanges()
    .pipe(
      map((actions: DocumentChangeAction<WeightEntry>[]) => {
        return actions.map((a: DocumentChangeAction<WeightEntry>) => {
          const data: WeightEntry = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

    return this.makeUserOwnedGetRequest(request);
  }

  getWeightEntriesForUser(userId: string): Observable<WeightEntry[]> {
    return this.db.collection<WeightEntry>('weightEntries', ref =>
      ref.where('uid', '==', userId)
        .orderBy('date', 'asc')).snapshotChanges()
    .pipe(
      map((actions: DocumentChangeAction<WeightEntry>[]) => {
        return actions.map((a: DocumentChangeAction<WeightEntry>) => {
          const data: WeightEntry = a.payload.doc.data();
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getWeightEntriesForGroup(users: string[]): Observable<WeightEntry[]> {
    return this.db.collection<WeightEntry>('weightEntries', ref =>
      ref.where('uid', 'in', users)
        .orderBy('date', 'asc')).valueChanges();
  }

  countWeightEntriesForGroup(users: string[]): Observable<number> {
    return this.db.collection<WeightEntry>('weightEntries', ref =>
      ref.where('uid', 'in', users)
        .orderBy('date', 'asc')).get().pipe(
          map(snapshot => snapshot.size)
        );
  }

  insertWeightEntry(weight: WeightEntry): Promise<DocumentReference> {
    const request = (w: WeightEntry) => this.db.collection('weightEntries').add(w);
    return this.makeUserOwnedSetRequest(weight, request);
  }

  updateWeightEntry(entry: WeightEntry): Promise<void> {
    console.log(entry);
    return this.db.collection('weightEntries').doc(entry.id).set(entry);
  }

  deleteWeightEntry(id: string): Promise<void> {
    return this.db.collection('weightEntries').doc(id).delete();
  }

  loadInitData() {
      const initData: { date: string, value: string, uid: string}[] = INIT_DATA;
      let batch = this.db.firestore.batch();
      let commitCount = 1;
      initData.forEach((data: { date: string, value: string, uid: string}, index) => {
        if ( (index / commitCount) > 499) {
          batch.commit();
          batch = this.db.firestore.batch();
          commitCount++;
        }

        const entry: WeightEntry = {
          id: this.db.createId(),
          uid: data.uid,
          date: firestore.Timestamp.fromDate(new Date(data.date)),
          value: +data.value
        };
        batch.set(this.db.collection('weightEntries').doc(entry.id).ref, entry);
      });
      console.log('committing');
      batch.commit();
  }
}
