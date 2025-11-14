import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { CountryService } from '../../services/country-service';
import { Country } from '../../interfaces/country-interface';
import { switchMap, tap } from 'rxjs';

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

  onFormChanged = effect((onCleanup) => {
    const regionSubscription = this.onRegionChanged();

    onCleanup(() => {
      regionSubscription.unsubscribe();
      console.log('Limpiado')
    })
  });

  onRegionChanged() {
    return this.countryForm.get('region')!.valueChanges
      .pipe(
        tap((region) => this.countryForm.get('country')!.setValue('')),
        tap((region) => this.countryForm.get('border')!.setValue('')),
        tap((region) => {
          this.borders.set([]);
          this.countryByRegion.set([]);
        }),
        switchMap(region => this.countryService.getCountriesByRegion(region!))
      )
      .subscribe(countries => {
        console.log(countries);
        this.countryByRegion.set(countries);
      });
  }


}
