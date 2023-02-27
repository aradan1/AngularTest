import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{

  public user:any;

  constructor(private router:Router, private service:UserService){}

  ngOnInit(): void {
    const token = JSON.parse(localStorage.getItem("TOKEN") as string);
    if(token){
      console.log(token)
      this.user = {name: token.username};
    }
    this.router.events.subscribe(event => {
      if(event.constructor.name === "NavigationEnd"){
        this.user = this.service.user;
      }
    })
  }

}

