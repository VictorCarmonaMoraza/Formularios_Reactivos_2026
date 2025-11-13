import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.html',
  styleUrl: './basic-page.css',
})
export class BasicPage {

  //private  para que no se pueda modificar desde fuera de la clase
  private fb = inject(FormBuilder);

  //Forma 1 de formularios (RECOMENDADA)
  basicForm = this.fb.group({
    name: ['',/**Validadores sincronos */[],/**Validadores asincronos */[]],
    price: [0],
    inStorage: [0],
  })

  //Fomra 2 de formularios
  basicForm2 = new FormGroup({
    name: new FormControl('',/**Validadores sincronos */[],/**Validadores asincronos */[]),
    price: new FormControl(0),
    inStorage: new FormControl(0),
  })
}
