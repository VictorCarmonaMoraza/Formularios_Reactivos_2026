import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';
//Crearemos metodo estaticos
export class FormUtils {


  static getTextError(errors: ValidationErrors) {
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

  static isValdField(form: FormGroup, fieldname: string): boolean | null {
    //verificamos que el campo tenga errores y que haya sido tocado
    return (!!form.controls[fieldname].errors && form.controls[fieldname].touched)
  }

  static getFieldErrors(form: FormGroup, fieldname: string): string | null {
    //Verificamos que el campo exista
    if (!form.controls[fieldname]) return null;

    const errors = form.controls[fieldname].errors ?? {};

    return FormUtils.getTextError(errors)
  }

  //Valida si los cmapos del formArray no tienen errores y han sido tocados
  static isValidFielArray(formArray: FormArray, index: number) {
    return (formArray.controls[index].errors && formArray.controls[index].touched);
  }

  //Obtiene los errores de un campo dentro de un FormArray
  static getFieldErrorInArray(formArray: FormArray, index: number): string | null {
    //Verificamos que el campo exista
    if (formArray.controls.length == 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    //Metodo utilizado para obtener los errores de un campo
    return FormUtils.getTextError(errors)

  }
}
