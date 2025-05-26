import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreModule } from './core/adapter/core.module';
import { HeaderComponent } from './shared/layout/header/header.component';
import { MainComponent } from './shared/layout/main/main.component';

@Component({
  selector: 'app-root',
  imports: [CoreModule, RouterOutlet, HeaderComponent, MainComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'case-mobi7-angular';
}
