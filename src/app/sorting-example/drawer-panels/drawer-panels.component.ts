import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drawer-panels',
  templateUrl: './drawer-panels.component.html',
  styleUrls: ['./drawer-panels.component.scss']
})
export class DrawerPanelsComponent implements OnInit {
  @Input() assignableData: Object;
  @Input() sortByValue: string;
  @Input() orderByValue: string;
  constructor() { }

  ngOnInit() {

  }

}
