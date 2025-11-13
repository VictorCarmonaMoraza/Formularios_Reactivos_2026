import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  basicForm: FormGroup = this.fb.group({
    name: ['',/**Validadores sincronos */[Validators.required, Validators.minLength(3)],/**Validadores asincronos */[]],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.minLength(0)]],
  })

  //Fomra 2 de formularios
  // basicForm2 = new FormGroup({
  //   name: new FormControl('',/**Validadores sincronos */[],/**Validadores asincronos */[]),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // })

  isValdField(fieldname: string): boolean | null {
    return !!this.basicForm.controls[fieldname].errors
  }

  getFieldErrors(fieldname: string): string | null {
    //Verificamos que el campo exista
    if (!this.basicForm.controls[fieldname]) return null;

    const errors = this.basicForm.controls[fieldname].errors ?? {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El valor mínimo es ${errors['min'].min}`;
      }
    }
    return null;
  }
}
