import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Card } from 'src/model/card.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  @ViewChild('tagContainer') tagContainer!:ElementRef;
  articleForm;
  smalltag = "";
  cardId = 1;
  card: Card = {
    cardId: 0,
    authorId: 0,
    title: '',
    description: '',
    tags: [],
    date: '',
    likes: 0
  }
  constructor(private formbuilder: FormBuilder) {
    this.articleForm = this.formbuilder.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      tags: [""]
    })
  };

addtag(){
  for(let i=0;i<this.card.tags.length;i++){
const tag=document.createElement('span').innerText=this.card.tags[i];
this.tagContainer.nativeElement.appendChild(tag);
  }
}

  
  onSubmit() {
    this.card.cardId = this.cardId;
    this.card.authorId = Number(localStorage.getItem('userid'));
    this.card.title = this.articleForm.value.title ?? "";
    this.card.description = this.articleForm.value.description ?? "";
    this.card.date = new Date().toISOString();

    this.cardId++;
  }

  enter(event: any) {
    // console.log(event);

    if (event.key === "Enter" && this.smalltag.trim() != "") {

      this.card.tags.push(this.smalltag.trim());
      this.articleForm.get('tags')?.reset();
    this.addtag();

    }
    if (event.key === "Enter" && this.smalltag?.trim() == "") {
      this.articleForm.get('tags')?.reset();
    }
    console.log(this.card.tags);


  }


}
