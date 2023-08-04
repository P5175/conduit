import { AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  ngOnInit(): void {
   
    
    this.updateTotalPages();
    this.updateVisiblePages();
  }
  
  
  @Input() total = 100;
  @Input() page = 1;
  @Input() pageSize = 10;

 @Output()
 pageemit=new EventEmitter();
 @Output()
 pagesizeemit=new EventEmitter();

  public totalPages!: number;
  public visiblePages!: number[];
  public visibleRangeLength:number=5;
  pageSizes: number[] = [5, 10, 25, 50];

  

  public selectPage(page: number): void {
   this.page=page;
  this.pageemit.emit(page);
    this.updateVisiblePages();
    
  }

  public selectPageSize(pageSize: string): void {
   this.pageSize=+pageSize;
   this.pageemit.emit(1);
   this.pagesizeemit.emit(pageSize);
    this.updateTotalPages();
    this.updateVisiblePages();
    
  }

  private updateVisiblePages(): void {
    const length = Math.min(this.totalPages, this.visibleRangeLength);


    const startIndex = Math.max(
      Math.min(
        this.page - Math.ceil(length / 2),
        this.totalPages - length
      ),
      0
    );

    this.visiblePages = Array.from(
      new Array(length).keys(),
      (item) => item + startIndex + 1
    );
  }

  private updateTotalPages(): void {
    this.totalPages = Math.ceil(this.total / this.pageSize);
    
  }
}
