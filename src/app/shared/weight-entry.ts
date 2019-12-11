import { UserOwned } from './user-owned';
import { firestore } from 'firebase';

export interface WeightEntry extends UserOwned {
    id: string;
    date: firestore.Timestamp;
    value: number;
}
