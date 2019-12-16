import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  @Input() users: User[];

  constructor() { }

  ngOnInit() {}

  deleteItem(index: number) {
    this.delete.emit(index);
  }

}
