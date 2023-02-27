import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private basepath: string = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<any>{
    return this.http.get(this.basepath);
  }

  public getProduct(productId: string): Observable<any>{
    return this.http.get(this.basepath+`/${productId}`);
  }

  public addProduct(product:any): Observable<any>{
    return this.http.post(this.basepath, product);
  }

  public deleteProduct(productId:string): Observable<any>{
    return this.http.delete(this.basepath+`/${productId}`);
  }

  public putProduct(productId:string, product:any): Observable<any>{
    return this.http.put(this.basepath+`/${productId}`, product);
  }

}
