import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { CountryService } from '../../services/country-service';
import { Country } from '../../interfaces/country-interface';

@Component({
  selector: 'app-country-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './country-page.html',
  styleUrl: './country-page.css',
})
export class CountryPage {
  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal(this.countryService.region);
  countryByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  countryForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });
}
