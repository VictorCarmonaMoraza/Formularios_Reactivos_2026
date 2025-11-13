import { FormGroup } from '@angular/forms';
//Crearemos metodo estaticos
export class FormUtils {

  static isValdField(form: FormGroup, fieldname: string): boolean | null {
    //verificamos que el campo tenga errores y que haya sido tocado
    return (!!form.controls[fieldname].errors && form.controls[fieldname].touched)
  }

  static getFieldErrors(form: FormGroup, fieldname: string): string | null {
    //Verificamos que el campo exista
    if (!form.controls[fieldname]) return null;

    const errors = form.controls[fieldname].errors ?? {};

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
