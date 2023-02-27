import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy{

  public user: any = {name: "", password: ""};
  public userId: string = "";

  editForm: FormGroup = this.formBuilder.group({
    name: '',
    password: ''
  });


  private routeSub: Subscription;

  constructor(private formBuilder:FormBuilder, private route: ActivatedRoute, private service:UserService, private router:Router){
    this.routeSub = Subscription.EMPTY;
  }
  ngOnInit(){
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.service.getUser(params['userId']).subscribe({
        next: (result : any)=> {
        this.user = result.data;
      },
      error: error => this.router.navigateByUrl('404')})
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onEdit():void{
    this.editUser();
    this.editForm.reset();
  }

  public editUser():void{
    this.editForm.value.name=this.userId;
    console.log(this.editForm.value)
    this.service.putUser(this.userId ,this.editForm.value).subscribe({
      next: result => alert(`Contraseña cambiada con exito`),
      error: error => alert(`Error al cambiar contraseña: \n\n  ${error.error.message}`)});
  }

  onDelete():void{
    this.service.deleteUser(this.userId).subscribe(result => {
      this.service.logout();
      this.router.navigateByUrl('/');
    })
  }
}
