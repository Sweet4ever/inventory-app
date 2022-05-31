import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CurrentUserService } from '../current-user.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public users:any;

  constructor(private angularFirestore: AngularFirestore, private currentUser: CurrentUserService, private router: Router) { }

  signup(){
    let password = <HTMLInputElement>document.querySelector("#signuppassword");
    let confirmed = <HTMLInputElement>document.querySelector("#confirmedpassword");
    let email =  <HTMLInputElement>document.querySelector("#signupemail");
    if(password.value == confirmed.value){
      this.angularFirestore.collection("users").add({
        'email': email.value,
        'password': password.value,
      });
    }else{
      alert("passwords does not match")
    }
  }

  signin(){
    let password = <HTMLInputElement>document.querySelector("#signinpassword");
    let email =  <HTMLInputElement>document.querySelector("#signinemail");
    this.users.forEach((user: { email: string; password: string; id: string; }) => {
      if(user.email == email.value){
        if(user.password == password.value){
          this.currentUser.setCurrentUser(user.email, user.password, user.id);
          this.router.navigate(['/category'])
        }
      }
    });
  }

  getUsersList() {
    return this.angularFirestore.collection('users')
                                .valueChanges({idField: 'id'})
                                .subscribe((usersData: any[]) => {this.users = usersData});
  }

  ngOnInit(): void {
    this.getUsersList();
  }

}
