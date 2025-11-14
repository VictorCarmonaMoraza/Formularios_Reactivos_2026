import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.html',
  styleUrl: './switches-page.css',
})
export class SwitchesPage {

  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  public switchesForm = this.fb.group({
    gender: [, Validators.required],
    wantNotidications: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  })


  onSubmit() {
    this.switchesForm.markAllAsTouched();
    console.log(this.switchesForm.value);
  }
}
