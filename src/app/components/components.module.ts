import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides/slides.component';
import { StartComponent } from './start/start.component';
import { LogoComponent } from './logo/logo.component';
import { CallComponent } from './call/call.component';



@NgModule({
  declarations: [SlidesComponent, StartComponent, LogoComponent, CallComponent],
  exports:[SlidesComponent, StartComponent, LogoComponent, CallComponent],
  entryComponents: [CallComponent],
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ComponentsModule { }
