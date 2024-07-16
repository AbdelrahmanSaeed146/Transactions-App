import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustmoersComponent } from './custmoers/custmoers.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CustmoersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Route_Task_1';
}
