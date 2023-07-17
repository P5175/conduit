import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  articleForm;
  constructor(private formbuilder:FormBuilder){
  this.articleForm=this.formbuilder.group({
title:["",[Validators.required]],
description:["",[Validators.required]]
  })};
  get title() {
    return this.articleForm.get('title');
  }
  get description() {
    return this.articleForm.get('description');
  }
 
}
