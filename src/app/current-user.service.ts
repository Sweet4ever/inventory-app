import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  email: string;
  password: string;
  id: string;

  constructor() { 
    this.email = '';
    this.password = '';
    this.id = '';
  }

  getCurrentUser(){
    return {email: this.email, password: this.password, id: this.id}
  }
  setCurrentUser(email: string, password: string, id: string){
    this.email = email;
    this.password = password;
    this.id = id;
  }
}
