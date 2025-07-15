// src\app\directives\img-fallback.directive.ts

import { Directive, HostListener, Input, ElementRef } from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]',
})
export class ImgFallbackDirective {
  @Input() appImgFallback: string = '/assets/default.jpg';

  constructor(private readonly el: ElementRef<HTMLImageElement>) {}

  @HostListener('error')
  onError() {
    const element = this.el.nativeElement;
    if (element.src !== this.appImgFallback) {
      element.src = this.appImgFallback;
    }
  }
}
