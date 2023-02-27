import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public products: any[] = [];
  constructor(private service: ProductService){
  }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts():void{
    this.service.getProducts().subscribe(result => {
      this.products = result.data;
    });
  }
}
