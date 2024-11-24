import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  signinForm: FormGroup;
  showPassword = false;
  authService : AuthService = inject(AuthService);
  toastr : ToastrService = inject(ToastrService);
  router : Router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      console.log(this.signinForm.value);
    }

    if (this.signinForm.valid) {
      const email = this.signinForm.value.email;
      const password = this.signinForm.value.password;

      this.authService.login(email, password).subscribe({
        next : (res) => {
          console.log(res);
          localStorage.setItem('user', JSON.stringify(res))

          this.toastr.success("Login success");
          this.router.navigate(['/metadata']);
        },
        error: (err) => {
          this.toastr.error("Invalid credentials");
        }
      })
    } else {
      this.toastr.error("Please provide a valid credential details");
    }

  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
