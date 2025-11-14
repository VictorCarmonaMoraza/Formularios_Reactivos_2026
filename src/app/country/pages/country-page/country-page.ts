import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { CountryService } from '../../services/country-service';
import { Country } from '../../interfaces/country-interface';
import { filter, switchMap, tap } from 'rxjs';

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
    const countrySubscription = this.onCountryChanged();

    onCleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
      console.log('Limpiado')
    })
  });

  //Cuando cambia el valor de region
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
        //Ordenamos los paises por nombre
        countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        //respuesta
        this.countryByRegion.set(countries);
      });
  }

  //Cuando el country cambia
  onCountryChanged() {
    return this.countryForm.get('country')!.valueChanges
      .pipe(
        //Limpiamos los border
        tap(() => this.countryForm.get('border')!.setValue('')),
        //Filtramos los valores nulos o vacios
        filter((value) => value!.length > 0),
        switchMap(alphaCode => this.countryService.getCountryByAlphaCode(alphaCode ?? '')),
        switchMap(country => this.countryService.getCountrieNamesByCodeArray(country.borders))
      )
      .subscribe(borders => {
        console.log(borders);
        //Ordenamos los borders por nombre
        borders.sort((a, b) => a.name.common.localeCompare(b.name.common));
        this.borders.set(borders);
      });
  }


}
