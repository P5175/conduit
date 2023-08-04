import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { first } from 'rxjs';
import { Card } from 'src/model/card.model';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  
})
export class EditorComponent implements OnInit {
  @ViewChild('tagContainer', { static: true }) tagContainer!: ElementRef<HTMLDivElement>;
  articleForm;
  smalltag = "";
  spanTemp: string[] = [];
  // cardId = 1;
  routeid:number=0;
  edit:boolean=false;
  card: Card = {
    id: 0,
    authorName: '',
    authorId: 0,
    title: '',
    description: '',
    tags: [],
    date: '',
    likes: 0
  }
  constructor(private formbuilder: FormBuilder, private dataservice: DataService, private router: Router,private activeroute:ActivatedRoute) {
    this.articleForm = this.formbuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      tags: [""]
    });
    // this.dataservice.cardid$.subscribe(val => this.cardId = val)

  }
  
  
  ngOnInit(): void {
    this.activeroute.paramMap.subscribe(params=>{
      this.routeid=Number(params.get('cardid'));
      if(this.routeid){
        this.edit=true;
      }else{
        this.edit=false;
      }
      console.log(this.edit);
      
    })
    
  }
;

  
  removetag(i:number) {
    // console.log(i);
    
    this.spanTemp.splice(i,1);


    // console.log(this.spanTemp);

  }


  onSubmit() {
    

   if(this.edit){
    this.card.id = this.routeid;
   }else{
    // this.card.id = this.cardId;
   }
    this.card.authorId = Number(localStorage.getItem('userid'));
    this.card.title = this.articleForm.value.title ?? "";
    this.card.description = this.articleForm.value.description ?? "";
    this.card.date = new Date().toISOString();
    this.card.tags=this.spanTemp;
    this.card.authorName = localStorage.getItem('username') ?? "";
   
    this.dataservice.onSubmitArticle(this.card,this.edit);
    // this.tagContainer.nativeElement.innerHTML = "";
    this.articleForm.reset();
    this.card = {
      id: 0,
      authorName: '',
      authorId: 0,
      title: '',
      description: '',
      tags: [],
      date: '',
      likes: 0
    }
   this.spanTemp=[];
   
  //  this.dataservice.cardid$.next(this.cardId);
    this.router.navigateByUrl("");
  }

  enter(event: any) {
    

    if (event.key === "Enter" && this.smalltag.trim() != "") {
      event.preventDefault();
      if (this.spanTemp.includes(this.smalltag.trim())) {
        this.articleForm.get('tags')?.reset();
      } else {

        this.spanTemp.push(this.smalltag.trim());

     console.log(this.spanTemp);
     
        this.articleForm.get('tags')?.reset();
      }


    }
    if (event.key === "Enter" && this.smalltag?.trim() == "") {
      event.preventDefault();
      this.articleForm.get('tags')?.reset();
    }


   




  }

}