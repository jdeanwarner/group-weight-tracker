import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/shared/user';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {

  @Output() nameChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() userAdded: EventEmitter<User> = new EventEmitter<User>();

  @Input() users: User[];

  formGroup: FormGroup = new FormGroup({
    userType: new FormControl(),
    displayName: new FormControl()
  });

  showSearchResults = false;

  constructor() { }

  ngOnInit() {}

  onUserNameChange() {
    const name = this.formGroup.get('displayName').value;
    if (name) {
      this.showSearchResults = true;
      this.nameChanged.emit(name);
    }
  }

  onUserSelected(user: User) {
    if (user) {
      this.userAdded.emit(user);
    }
  }

  addAnonUser() {
    const name = this.formGroup.get('displayName').value;
    if (name) {
      this.onUserSelected({ displayName: name } as User);
    }
  }

  cancel() {
    this.userAdded.emit(null);
  }

}
