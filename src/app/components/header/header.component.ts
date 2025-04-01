import { Component } from '@angular/core';
import { VignetteComponent } from "./vignette/vignette.component";

@Component({
  selector: 'app-header',
  imports: [VignetteComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {

}
