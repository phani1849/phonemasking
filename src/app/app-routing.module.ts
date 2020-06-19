import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SortingExampleComponent } from './sorting-example/sorting-example.component';
import { PhoneMaskingExampleComponent } from './phone-masking-example/phone-masking-example.component';


const routes: Routes = [
  { path: 'phonemask', component: PhoneMaskingExampleComponent },
  { path: 'sorting', component: SortingExampleComponent },
  { path: '',   redirectTo: '/phonemask', pathMatch: 'full' },
  { path: '**', component:  PhoneMaskingExampleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
