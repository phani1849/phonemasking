import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SortingExampleComponent } from './sorting-example/sorting-example.component';
import { PhoneMaskingExampleComponent } from './phone-masking-example/phone-masking-example.component';
import { DatePickerMaskingComponent } from './date-picker-masking/date-picker-masking.component';
import { PhoneMaskingDirectiveComponent } from './phone-masking-directive/phone-masking-directive.component';
import { FormValidationsComponent } from './form-validations/form-validations.component';
import { MeterialDatatableResizeComponent } from './meterial-datatable-resize/meterial-datatable-resize.component';


const routes: Routes = [
  { path: 'phonemask', component: PhoneMaskingExampleComponent },
  { path: 'sorting', component: SortingExampleComponent },
  {path: 'ngxmask', component: DatePickerMaskingComponent},
  {path: 'formvalidations', component: FormValidationsComponent},
  {path: 'mattable', component: MeterialDatatableResizeComponent},
  {path: 'datemasking', component: PhoneMaskingDirectiveComponent},
  { path: '',   redirectTo: '/phonemask', pathMatch: 'full' },
  { path: '**', component:  PhoneMaskingExampleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
