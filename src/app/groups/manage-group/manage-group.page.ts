import { Group } from 'src/app/shared/group';
import { LoadUsersByName } from './../store/actions/user.actions';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromStore from '../store';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/user';


@Component({
  selector: 'app-manage-group',
  templateUrl: './manage-group.page.html',
  styleUrls: ['./manage-group.page.scss'],
})
export class ManageGroupPage implements OnInit {

  formGroup: FormGroup = new FormGroup({
    name: new FormControl()
  });

  userList: User[] = [];
  showAddUser = false;

  searchUsers$: Observable<User[]>;
  group$: Observable<Group>;
  groupUsers$: Observable<User[]>;

  constructor(private store: Store<fromStore.GroupsState>) {
    this.searchUsers$ = this.store.select(fromStore.getUserByNameData);
    this.group$ = this.store.select(fromStore.getSelectedGroup);
    this.groupUsers$ = this.store.select(fromStore.getAllGroupUsers);
  }

  ngOnInit() {
    this.groupUsers$.subscribe(groups => this.userList = groups);
  }

  onUserNameChange(name: string) {
    if (name) {
      this.store.dispatch(new LoadUsersByName(name));
    }
  }

  onUserAdded(user: User) {
    if (user) {
      this.userList.push(user);
    }
    this.showAddUser = false;
  }

  addUser() {
    this.showAddUser = true;
  }

  deleteUser(index: number) {
    this.userList.splice(index);
  }
}
