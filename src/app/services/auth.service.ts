import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard = false;
    constructor(
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
    ) { }

  login(email, password){
      this.afAuth.signInWithEmailAndPassword(email, password).then(logRef =>{
        this.toastr.success('Logged In Successfully');
        this.router.navigate(['/']);
        this.loggedIn.next(true);
        this.loadUser();
        this.isLoggedInGuard = true;
      })
      .catch(e =>{
        this.toastr.warning(e);
      })
  }
  
  loadUser(){
    this.afAuth.authState.subscribe(user =>{
    localStorage.setItem('user', JSON.stringify(user));
    })
  }

  logOut(){
    this.afAuth.signOut().then(()=>{
      this.toastr.success("User logged out successfully");
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.router.navigate(['/login']);
    })
  }

  isLoggedIn(){
    return this.loggedIn.asObservable();
  }
}
