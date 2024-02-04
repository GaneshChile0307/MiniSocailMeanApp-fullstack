import { Component } from "@angular/core";
import { MatButtonModule, } from '@angular/material/button';
import {MatInputModule} from "@angular/material/input"
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthService } from "../auth.service";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  standalone: true,
  imports:[MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    CommonModule,],
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent {
  isLoading = false;

  constructor(public authService: AuthService) {}

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email, form.value.password);
  }
}
