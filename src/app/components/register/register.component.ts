import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { confirmPasswordValidator } from '../../utils/validators';
import { AuthService } from '../../services/auth.service';
import { MessageService, ToastMessageOptions } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, PasswordModule, ButtonModule, InputTextModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent {
  registerForm: FormGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      email: [undefined, [Validators.required, Validators.email]],
      password: [undefined, [Validators.required, Validators.minLength(6)]],
      passwordConfirm: [undefined, [Validators.required]],
      displayName: [undefined, [Validators.required]],
    });
    this.registerForm.addValidators(confirmPasswordValidator);
  }

  async onSubmit(): Promise<void> {
    if (this.registerForm?.valid) {
      const data = this.registerForm.value;
      const response = await this.authService.register(data)
        .catch((err) => console.error(err));
      const message: ToastMessageOptions = {
        summary: 'Registered',
        severity: 'success',
        detail: response.message
      };
      this.messageService.add(message);
      if (await this.authService.login(data.email, data.password)) {
        this.router.navigateByUrl('home');
      }
      else {
        this.messageService.add({
          detail: 'Something went wrong.',
          summary: 'Oops!',
          severity: 'error'
        });
        this.router.navigateByUrl('login');
      }
    } else {
      console.log('Form Invalid');
    }
  }
}
