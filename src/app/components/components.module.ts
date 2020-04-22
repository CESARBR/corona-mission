import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides/slides.component';
import { LogoComponent } from './logo/logo.component';
import { CallComponent } from './call/call.component';



@NgModule({
  declarations: [SlidesComponent, LogoComponent, CallComponent],
  exports:[SlidesComponent, LogoComponent, CallComponent],
  entryComponents: [CallComponent],
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ComponentsModule { }
