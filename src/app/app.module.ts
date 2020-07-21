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
import { MaskDirective } from './mask.directive';
import { FormValidationsComponent } from './form-validations/form-validations.component';
import { MeterialDatatableResizeComponent } from './meterial-datatable-resize/meterial-datatable-resize.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {A11yModule} from '@angular/cdk/a11y';
import { InputMaskDirective } from './input-mask/input-mask.directive';


@NgModule({
  imports: [
    BrowserModule, 
    NgxMaskModule.forRoot({}),
    FormsModule, 
    ReactiveFormsModule, 
    BrowserAnimationsModule,
    MeterialModule,
    AppRoutingModule,
    DragDropModule,
    ScrollingModule,
    CdkTableModule,
    CdkTreeModule,
    A11yModule
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
    MaskDirective,
    FormValidationsComponent,
    MeterialDatatableResizeComponent,
    InputMaskDirective
  ],  
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

}
