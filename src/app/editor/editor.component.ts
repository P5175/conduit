import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Card } from 'src/model/card.model';

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

  addtag(temp: string) {
    //  console.log(this.tagContainer.nativeElement);
    //  console.log(temp);

    const tag = document.createElement('span');
tag.ondblclick=()=>this.removetag(tag);

    tag.innerText = temp;
    this.tagContainer.nativeElement.appendChild(tag);
  }
removetag(tag:HTMLElement){
const tagtext=tag.innerText;
this.card.tags=this.card.tags.filter((t)=>t!==tagtext);
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
    // event.preventdefault();
    if (event.key === "Enter" && this.smalltag.trim() != "") {
      if (this.card.tags.includes(this.smalltag.trim())) {
        this.articleForm.get('tags')?.reset();
      } else {

        this.card.tags.push(this.smalltag.trim());

        this.addtag(this.smalltag?.trim());
        this.articleForm.get('tags')?.reset();
      }


    }
    if (event.key === "Enter" && this.smalltag?.trim() == "") {
      this.articleForm.get('tags')?.reset();
    }
    console.log(this.card.tags);


  }


}

