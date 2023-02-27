import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{

  productForm: FormGroup = this.formBuilder.group({
    name: '',
    description: ''
  });

  constructor(private formBuilder:FormBuilder, private service:ProductService, private router:Router){}

  ngOnInit(): void {
  }

  onSubmit():void{
    this.saveProduct();
    this.productForm.reset();
  }

  public saveProduct():void{
    this.service.addProduct(this.productForm.value).subscribe({
      next: result => {
        alert('New Product added');
        this.router.navigateByUrl('/');
      },
      error: error => alert(`Failed to create product: \n\n  ${error.error.message}`)});

  }
}
