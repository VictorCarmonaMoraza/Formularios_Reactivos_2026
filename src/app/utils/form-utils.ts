import { AbstractControl, FormArray, FormGroup, ValidationErrors } from '@angular/forms';
//Crearemos metodo estaticos
export class FormUtils {

  //Expresiones regulares para validaciones
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';
  static passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$';


  static getTextError(errors: ValidationErrors) {

    console.log(errors);

    //


    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El valor mínimo es ${errors['min'].min}`;
        case 'email':
          return `El valor ingresado no es un correo electronico válido`;
        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return 'El valor ingresado no luce como un correo electrónico válido';
          }
          return 'Error de patron contra expresion regular';
        default:
          return 'Error de validacion no controlado';
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

  static isFieldOneEqualFieldTwo(field: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return (field1Value === field2Value) ? null : {
        passwordsNotEqual: true
      }
    }
  }

}
