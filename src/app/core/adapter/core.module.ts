import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpAdapterService } from './http-adapter/http-adapter.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    // Adapters
    HttpAdapterService,
  ],
})
export class CoreModule {}
