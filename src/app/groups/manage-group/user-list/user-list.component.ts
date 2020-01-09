import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() ownerChanged: EventEmitter<string> = new EventEmitter<string>();

  @Input() users: User[];
  @Input() owners: string[];

  constructor() { }

  ngOnInit() {}

  deleteItem(index: number) {
    this.delete.emit(index);
  }

  isOwner(user: User) {
    return this.owners.includes(user.uid);
  }

  ownershipChanged(user: User) {
    this.ownerChanged.emit(user.uid);
  }

}
