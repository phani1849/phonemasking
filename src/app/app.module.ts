import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PhoneMaskDirective } from './phone-mask.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeterialModule } from './meterial/meterial.module';
import { SortByPipe } from './sort-by.pipe';
import { SortingExampleComponent } from './sorting-example/sorting-example.component';
import { PhoneMaskingExampleComponent } from './phone-masking-example/phone-masking-example.component';
import { AppRoutingModule } from './app-routing.module';
import { DrawerPanelsComponent } from './sorting-example/drawer-panels/drawer-panels.component';
import { DrawerTitleComponent } from './sorting-example/drawer-title/drawer-title.component';
import { DatePickerMaskingComponent } from './date-picker-masking/date-picker-masking.component';
import { NgxMaskModule} from 'ngx-mask';
import { PhoneMaskingDirectiveComponent } from './phone-masking-directive/phone-masking-directive.component';
import { MaskDirective } from './mask.directive'


@NgModule({
  imports: [
    BrowserModule, 
    NgxMaskModule.forRoot({}),
    FormsModule, 
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    MeterialModule,
    AppRoutingModule
  ],
  declarations: [AppComponent, 
    PhoneMaskDirective,
    SortByPipe,
    SortingExampleComponent,
    PhoneMaskingExampleComponent,
    DrawerPanelsComponent,
    DrawerTitleComponent,
    DatePickerMaskingComponent,
    PhoneMaskingDirectiveComponent,
    MaskDirective
  ],  
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}
