import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { ELEMENT_DATA, PeriodicElement} from './meterial-model';
import { MatPaginator, MatSort, MatTable, MatTableDataSource, MatTooltip } from '@angular/material';


@Component({
  selector: 'app-meterial-datatable-resize',
  templateUrl: './meterial-datatable-resize.component.html',
  styleUrls: ['./meterial-datatable-resize.component.scss']
})
export class MeterialDatatableResizeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { read: ElementRef, static: false }) private matTableRef: ElementRef;
  
  @ViewChild('tooltip',{ static: false }) tooltip: MatTooltip
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }
  displayedColumns: string[] = [];
  public dataSource = new MatTableDataSource<PeriodicElement>();
  
  columns: any[] = [
    { field: 'position', width: 100},
    { field: 'name', width: 350},
    { field: 'weight', width: 250},
    { field: 'symbol', width: 100}
  ];
  toolTipTexts:string[] = [];

  pressed = false;
  currentResizeIndex: number;
  startX: number;
  startWidth: number;
  isResizingRight: boolean;
  resizableMousemove: () => void;
  resizableMouseup: () => void;

  constructor(
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.dataSource.data = ELEMENT_DATA;
    this.setDisplayedColumns();
  }

  setTableProp(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data.forEach(( column,index) => {
      if(!this.toolTipTexts[index] || this.toolTipTexts[index] != ""){
        this.toolTipTexts[index] = "";
      }
    });
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

  ngAfterViewInit() {   
    this.setTableProp();
  }

  setTableResize(tableWidth: number) {
    let totWidth = 0;
    this.columns.forEach(( column) => {
      totWidth += column.width;
    });
    const scale = (tableWidth - 5) / totWidth;
    this.columns.forEach(( column) => {
      column.width *= scale;
      this.setColumnWidth(column);
    });
  }
  setPageData(){
    this.setTableProp();
  }

  setDisplayedColumns() {
    this.columns.forEach(( column, index) => {
      column.index = index;
      this.displayedColumns[index] = column.field;
    });
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    this.setTableProp();
  }

  onResizeColumn(event: any, index: number) {
    this.checkResizing(event, index);
    this.currentResizeIndex = index;
    this.pressed = true;
    this.startX = event.pageX;
    this.startWidth = event.target.clientWidth;
    event.preventDefault();
    this.mouseMove(index);
  }

  private checkResizing(event, index) {
    const cellData = this.getCellData(index);
    if ( ( index === 0 ) || ( Math.abs(event.pageX - cellData.right) < cellData.width / 2 &&  index !== this.columns.length - 1 ) ) {
      this.isResizingRight = true;
    } else {
      this.isResizingRight = false;
    }
  }

  private getCellData(index: number) {
    const headerRow = this.matTableRef.nativeElement.children[0];
    const cell = headerRow.children[index];
    return cell.getBoundingClientRect();
  }

  mouseMove(index: number) {
    this.resizableMousemove = this.renderer.listen('document', 'mousemove', (event) => {
      if (this.pressed && event.buttons ) {
        const dx = (this.isResizingRight) ? (event.pageX - this.startX) : (-event.pageX + this.startX);
        const width = this.startWidth + dx;
        if ( this.currentResizeIndex === index && width > 50 ) {
          this.setColumnWidthChanges(index, width);
        }
      }
    });
    this.resizableMouseup = this.renderer.listen('document', 'mouseup', (event) => {
      if (this.pressed) {
        this.pressed = false;
        this.currentResizeIndex = -1;
        this.resizableMousemove();
        this.resizableMouseup();
      }
    });
  }

  setColumnWidthChanges(index: number, width: number) {
    const orgWidth = this.columns[index].width;
    const dx = width - orgWidth;
    if ( dx !== 0 ) {
      const j = ( this.isResizingRight ) ? index + 1 : index - 1;
      const newWidth = this.columns[j].width - dx;
      if ( newWidth > 50 ) {
          this.columns[index].width = width;
          this.setColumnWidth(this.columns[index]);
          this.columns[j].width = newWidth;
          this.setColumnWidth(this.columns[j]);
        }
    }
  }

  setColumnWidth(column: any) {
    const columnEls = Array.from( document.getElementsByClassName('mat-column-' + column.field) );
    columnEls.forEach(( el: HTMLDivElement,index ) => {
      if(column.width <= 58){
        console.log(column);
        console.log(index);
        let newstr = el.innerHTML.trim();
        this.toolTipTexts[index] = newstr;
      }else{
        this.toolTipTexts[index] = "";
      }
      el.style.width = column.width + 'px';
    });
  }
}
