import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-manage-group',
  templateUrl: './manage-group.page.html',
  styleUrls: ['./manage-group.page.scss'],
})
export class ManageGroupPage implements OnInit {

  formGroup: FormGroup = new FormGroup({
    name: new FormControl(),
    users: new FormArray([])
  });

  constructor() { }

  ngOnInit() {
  }

}
