import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { first } from 'rxjs';
import { Card } from 'src/model/card.model';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent {
  @ViewChild('tagContainer', { static: true }) tagContainer!: ElementRef<HTMLDivElement>;
  articleForm;
  smalltag = "";
  cardId = 1;
  card: Card = {
    cardId: 0,
    authorName:'',
    authorId: 0,
    title: '',
    description: '',
    tags: [],
    date: '',
    likes: 0
  }
  constructor(private formbuilder: FormBuilder,private dataservice:DataService,private router:Router) {
    this.articleForm = this.formbuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      tags: [""]
    });
    this.dataservice.cardid$.subscribe(val=>this.cardId=val)

  };

  addtag(temp: string) {
    //  console.log(this.tagContainer.nativeElement);
    //  console.log(temp);

    const tag = document.createElement('span');
tag.ondblclick=()=>this.removetag(tag);

    tag.innerText = temp;
    this.tagContainer.nativeElement.appendChild(tag);
  }
removetag(tag:HTMLElement){
tag.remove();


console.log(this.card.tags);

}


  onSubmit() {
    // console.log("called");
    
    this.card.cardId = this.cardId;
    this.card.authorId = Number(localStorage.getItem('userid'));
    this.card.title = this.articleForm.value.title ?? "";
    this.card.description = this.articleForm.value.description ?? "";
    this.card.date = new Date().toISOString();
    this.card.authorName=localStorage.getItem('username') ?? "";
// console.log(this.card.authorName);'
this.dataservice.onSubmitArticle(this.card);
this.tagContainer.nativeElement.innerHTML="";
this.articleForm.reset();
this.card={
  cardId: 0,
  authorName:'',
  authorId: 0,
  title: '',
  description: '',
  tags: [],
  date: '',
  likes: 0
}
    
    this.cardId++;
this.dataservice.cardid$.next(this.cardId);
this.router.navigateByUrl("");
   }

  enter(event: any) {
    // console.log(event);
    
    if (event.key === "Enter" && this.smalltag.trim() != "") {
      event.preventDefault();
      if (this.card.tags.includes(this.smalltag.trim())) {
        this.articleForm.get('tags')?.reset();
      } else {

        this.card.tags.push(this.smalltag.trim());

        this.addtag(this.smalltag?.trim());
        this.articleForm.get('tags')?.reset();
      }


    }
    if (event.key === "Enter" && this.smalltag?.trim() == "") {
      event.preventDefault();
      this.articleForm.get('tags')?.reset();
    }
    // console.log(this.card.tags);

    const tag = document.createElement('span');
   
    


}

}