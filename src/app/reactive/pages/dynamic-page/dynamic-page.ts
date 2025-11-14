import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './dynamic-page.html',
  styleUrl: './dynamic-page.css',
})
export class DynamicPage {
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  dynamicForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoritesGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ], Validators.minLength(2))
  });

  newFavorite = new FormControl('', Validators.required);
  //newFavorite = this.fb.control('', Validators.required);

  //Getter: Obtener el FormArray
  get favoritesGames() {
    return this.dynamicForm.get('favoritesGames') as FormArray;
  }

  onAddToFavorites() {
    //Si el control no es valido, no agregamos
    if (this.newFavorite.invalid) return;
    //Obtenemos el valor del nuevo juego
    const newGame = this.newFavorite.value;
    //Agregamos un nuevo FormControl al FormArray
    this.favoritesGames.push(this.fb.control(newGame, Validators.required));
    //Reseteamos el input
    this.newFavorite.reset();
  }

  // Eliminar un item del FormArray por su indice
  onRemoveFavorite(index: number) {
    //Eliminamos el control en la posición indicada
    this.favoritesGames.removeAt(index);
  }

  onSubmit() {
    //El método markAllAsTouched() recorre todos los controles
    //del formulario (y sus subgrupos, si los hay) y los marca como “touched” (tocados).
    this.dynamicForm.markAllAsTouched();
  }

}
