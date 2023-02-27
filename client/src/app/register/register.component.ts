import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  userForm: FormGroup = this.formBuilder.group({
    name: '',
    password: ''
  });

  constructor(private formBuilder:FormBuilder, private service:UserService, private router:Router){}

  ngOnInit(): void {
  }

  onSubmit():void{
    this.saveUser();
    this.userForm.reset();
  }

  public saveUser():void{
    this.service.registerUser(this.userForm.value).subscribe({
      next: result => {
      localStorage.setItem('TOKEN', JSON.stringify({token:result.token, username: result.username}));
      this.service.isLoggedIn=true;
      this.service.user = {name: result.username};
      this.router.navigateByUrl('/');
    },
    error: error => alert(`Failed to Register User: \n\n  ${error.error.message}`)});
  }
}

