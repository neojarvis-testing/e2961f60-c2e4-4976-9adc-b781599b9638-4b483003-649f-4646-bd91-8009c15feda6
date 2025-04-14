import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  loading: boolean = false; // Loading state
  success: boolean = false; // Success state
  error409: boolean = false; // Error state for 409 Conflict

  user: User = { email: "", password: "", username: "", mobileNumber: "", userRole: "" };

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.registrationForm = this.fb.group({
      email: fb.control("", [Validators.required, Validators.email]),
      password: fb.control("", [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$')]),
      confirmPassword :fb.control("",[Validators.required,Validators.minLength(8)]),
      username: fb.control("", Validators.required),
      mobileNumber: fb.control("", [Validators.required, Validators.pattern('[0-9]{10}$')]),
      userRole: fb.control("", Validators.required)
    },{validators:this.passwordMatchValidators});
  }
  passwordMatchValidators(registrationForm:FormGroup){
    return registrationForm.get('password').value === registrationForm.get('confirmPassword').value ? null:{mismatch:true}
  }

  ngOnInit(): void {}

  addRegister() {
    if (this.registrationForm.valid) {
      this.loading = true; 
      this.success = false;
      this.error409 = false;

      this.authService.register(this.registrationForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          this.success = true; // Show success icon
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error: (error) => {
          this.loading = false;
          if (error.status === 409) {
            this.error409 = true; 
          }
        }
      });
    }
  }
}
