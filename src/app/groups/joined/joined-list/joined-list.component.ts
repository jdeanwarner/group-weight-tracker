import { Group } from 'src/app/shared/group';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-joined-list',
  templateUrl: './joined-list.component.html',
  styleUrls: ['./joined-list.component.scss'],
})
export class JoinedListComponent implements OnInit {

  @Input() groups: Group[];

  constructor() { }

  ngOnInit() {}

}
