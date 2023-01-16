import { Component, OnInit } from '@angular/core';
import { Alert } from 'selenium-webdriver';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  users: User[];
  userForm: boolean;
  isNewUser: boolean;
  newUser: any = {};
  editUserForm: boolean;
  editedUser: any = {};
  flag: boolean=false
  userpresentFlag=false;
  logFlag: boolean;
  userExits: boolean;
  currentUser: any;
  userPage: boolean;
  signupFlag: boolean;
  loginflag: boolean;
  loginForm: boolean;
  addFlag: boolean;
  dob:Date;
  phn: number;
  probar: number;
  curruser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.getUsers();
    this.logFlag=true;
    this.loginflag=true;
    
  }

  getUsers(): User[] {
    return this.userService.getUsersFromData();
  }

  showEditUserForm(user: User) {
    if (!user) {
      this.userForm = false;
      return;
    }
    this.editUserForm = true;
    this.editedUser = user;
  }

  showAddUserForm() {
    // resets form if edited user
    if (this.users.length) {
      this.newUser = {};
    }
    this.userForm = true;
    this.isNewUser = true;
    this.loginForm=false;

  }
  showloginForm(){
    if (this.users.length) {
      this.newUser = {};
    }
    this.userForm = false;
    this.isNewUser = true;
    this.loginForm=true;
  }

  saveUser(user: User) {
    
    var validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var password=/(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/;
    if(user.firstName.match(validate)){
      if(!user.lastName.match(password)){
        alert('password is weak')
        return;
      }
      
      let allUsers=this.getUsers()
    this.userExits=false;
    this.signupFlag=false;
    let realName='';
    let realPassword='';
    
    if(user.firstName!='admin@gmail.com'  && user.lastName===user.thirdName){
    for(let i=0;i<allUsers.length;i++){
      if(user.firstName===allUsers[i].firstName)
      {
        this.userExits=true;
        realName=allUsers[i].firstName;
        realPassword=allUsers[i].lastName;
      }
    }
  }
  else if(user.firstName!='admin@gmail.com'){
    alert('password mismatch')
    return;
  }
  else if(user.firstName==='admin@gmail.com')  {
    alert('Email already exists')
    return;
  }
    if(this.userExits===true){
      
    alert('Email already exists')
    return;
    }
    else{
      
      if(user.firstName==='admin@gmail.com')
      {
        if(user.lastName==='admin'){
        this.flag=true;
        this.userForm=false;
        this.logFlag=false;
        }
      }
      else{
        if (this.isNewUser) {
          // add a new user
          this.userService.addUser(user);
          alert('signed in sucessfully');
        }
        
        this.userForm = false;
        this.loginflag=true;
        
      }
      
      }
    }
    else{
      alert('enter valid email address')
    }
    
  }
  signedup() {
    this.signupFlag=true;
    
  }
  userloggingout(){
    this.logFlag=true;
    
    this.userPage=false;
  }
  loggingout(){
    this.flag=false;
    this.logFlag=true;
    this.loginflag=true
    this.userpresentFlag=false;
  }
  loginPage(mail){
    this.currentUser=mail;
    this.logFlag=false;
    this.userForm=false;
    this.userPage=true;
  }
  updateUser() {
    this.userService.updateUser(this.editedUser);
    this.editUserForm = false;
    this.editedUser = {};
    
  }
  additionalsave() {
    
    
    this.userService.updateUser(this.editedUser);
    this.editUserForm = false;
    this.editedUser = {};
    
   
    
    this.addFlag=false
    this.dob=this.curruser.fourthName
    this.phn=this.curruser.fifthName
    this.userService.deleteUser(this.curruser);
    this.userService.addUser(this.curruser);
    console.log(this.curruser)
    
    
    if(this.curruser.fourthName!=undefined &&this.curruser.fifthName!=undefined){
      this.probar=100
    }
    else if(this.curruser.fourthName===undefined && this.curruser.fifthName!=undefined){
      this.probar=50;
    }
    else if(this.curruser.fourthName!=undefined && this.curruser.fifthName===undefined){
      this.probar=50;
    }
    else{
      this.probar=0;
    }

  }
  removeUser(user: User) {
    this.userService.deleteUser(user);
  }

  cancelEdits() {
    this.editedUser = {};
    this.editUserForm = false;
  }
  editbutton(){
    
     this.addFlag=true;
     
    
  }
  cancelNewUser() {
    this.newUser = {};
    this.userForm = false;
  }
  validate(user:User){
    let allUsers=this.getUsers()
    console.log('all',allUsers)
    if(user.firstName==='admin@gmail.com'){
      if(user.lastName==='admin'){
        this.flag=true;
        this.loginForm=false;
        this.loginflag=false
        this.logFlag=false;
      }
      else{
        alert('User Already there')
      }
    }
    else{
    let userpresent=false;
    
    for(let i=0;i<allUsers.length;i++){
      if(user.firstName===allUsers[i].firstName && user.lastName===allUsers[i].lastName)
      {
        userpresent=true;
        this.curruser=allUsers[i]
      }
    }
    
    if(userpresent){
      this.userpresentFlag=true;
      this.logFlag=false;
      this.loginflag=false;
      this.userForm=false;
      this.loginForm=false;
      
      console.log(this.curruser)
      if(this.curruser.fourthName!=undefined &&this.curruser.fifthName!=undefined){
        this.probar=100
      }
      else if(this.curruser.fourthName===undefined && this.curruser.fifthName!=undefined){
        this.probar=50;
      }
      else if(this.curruser.fourthName!=undefined && this.curruser.fifthName===undefined){
        this.probar=50;
      }
      else{
        this.probar=0;
      }
    }
    else{
      alert('user not found')
    }
  }
}

}
