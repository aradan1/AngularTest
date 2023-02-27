import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  public product= {name: "", description: ""}
  public productId: string = "";

  editForm: FormGroup = this.formBuilder.group({
    name: '',
    description: ''
  });

  private routeSub: Subscription;

  constructor(private formBuilder:FormBuilder, private route: ActivatedRoute, private service:ProductService, private router:Router){
    this.routeSub = Subscription.EMPTY;
  }

  ngOnInit(){
    this.routeSub = this.route.params.subscribe(params => {
      this.productId = params['productId'];
      this.service.getProduct(params['productId']).subscribe({
        next: (result : any)=> {
        this.product = result.data;
      },
      error: error => this.router.navigateByUrl('404')})
    })
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onEdit():void{
    this.editProduct();
    this.editForm.reset();
  }

  public editProduct():void{
    this.editForm.value.name=this.productId;
    console.log(this.editForm.value)
    this.service.putProduct(this.productId ,this.editForm.value).subscribe({
      next: result => {
        alert(`Descripcion cambiada con exito`);
        this.product= result.data;
      },
      error: error => alert(`Error al cambiar descripcion: \n\n  ${error.error.message}`)});
  }

  onDelete():void{
    this.service.deleteProduct(this.productId).subscribe();
    this.router.navigateByUrl('/');
  }
}
