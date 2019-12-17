import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { Observable } from 'rxjs';
import { Group } from 'src/app/shared/group';

@Component({
  selector: 'app-joined',
  templateUrl: './joined.page.html',
  styleUrls: ['./joined.page.scss'],
})
export class JoinedPage implements OnInit {

  joinedGroups$: Observable<Group[]>;

  constructor(private store: Store<fromStore.GroupsState>) {
    this.joinedGroups$ = this.store.select(fromStore.getGroupsData);
  }

  ngOnInit() {
  }

}
