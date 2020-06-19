import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drawer-title',
  templateUrl: './drawer-title.component.html',
  styleUrls: ['./drawer-title.component.scss']
})
export class DrawerTitleComponent implements OnInit {
  @Input() gridData: Object;
  @Input() sortByValue: string;
  @Input() orderByValue: string;
  constructor() { }

  ngOnInit() {
  }

}
