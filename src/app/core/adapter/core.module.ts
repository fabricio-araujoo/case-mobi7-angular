import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpAdapterService } from './http-adapter/http-adapter.service';
import { MapAdapterService } from './map-adapter/map-adapter.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    // Adapters
    HttpAdapterService,
    MapAdapterService,
  ],
})
export class CoreModule {}
