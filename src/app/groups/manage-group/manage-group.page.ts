import { Group } from 'src/app/shared/group';
import { LoadUsersByName } from './../store/actions/user.actions';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  group: Group;
  groupUsers$: Observable<User[]>;

  constructor(private store: Store<fromStore.GroupsState>) {
    this.searchUsers$ = this.store.select(fromStore.getUserByNameData);
    this.group$ = this.store.select(fromStore.getSelectedGroup);
    this.groupUsers$ = this.store.select(fromStore.getAllGroupUsers);
  }

  ngOnInit() {
    this.groupUsers$.subscribe(users => this.userList = users);
    this.group$.subscribe(group => {
      if (group) {
        this.group = group;
        this.formGroup.patchValue(group);
      }
    });
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
    this.userList.splice(index, 1);
  }

  ownerChanged(uid: string) {
    console.log(uid);
    if (this.group.owners.includes(uid)) {
      const index = this.group.owners.indexOf(uid);
      this.group.owners.splice(index, 1);
    } else {
      this.group.owners.push(uid);
    }
  }

  save() {
    this.group.name = this.formGroup.get('name').value;
    console.log(this.group);
  }
}
