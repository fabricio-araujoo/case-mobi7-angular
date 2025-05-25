import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ICONS } from './icon';

@Component({
  selector: 'app-icon',
  imports: [MatIconModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit {
  private readonly sanitizer = inject(DomSanitizer);

  @Input({ required: true }) name!: string;
  @Input() size?: number = 16;

  safeSvg!: SafeHtml;

  ngOnInit() {
    const svg = this.getSvgByName(this.name);

    this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  private getSvgByName(name: string): string {
    return ICONS[name] || '<!-- empty -->';
  }
}
