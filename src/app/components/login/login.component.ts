import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, PasswordModule, ButtonModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      // TODO: revert to '' or undefined
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated)
      this.router.navigateByUrl('home');
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm?.valid) {
      if (await this.authService.login(this.loginForm.value.email, this.loginForm.value.password)) {
        this.router.navigateByUrl('home');
      }
      else {
        // this.messageService.add({
        //   detail: 'Something went wrong.',
        //   summary: 'Oops!',
        //   severity: 'error'
        // });
        this.router.navigateByUrl('login');
      }
    } else {
      console.error('Form invalid');
    }
  }
}
