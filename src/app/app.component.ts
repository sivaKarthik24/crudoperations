import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  url=''
  incomeTab=['Salary',"Bonus","Cash","Check","Others"]
  expenseTab=["Food","Grocery","Bills","Recharges","Education","Travel"]
  selected = new FormControl(0);
  incomeFlag=false;
  static curruser: string;
  expenseFlag=false;
  summaryFlag=false;
  selectedVal: any;
  myuser:any
  selectedIncome='Salary'
  selectedExpense='Food'
  my2user:any;
  duplica: number;
  currency: string;
  icurrency: string;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.getUsers();
    this.currency='INR'
    this.icurrency='INR'
    this.logFlag=true;
    this.loginflag=true;
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    for(let k=0;k<i;k++){
      if(localStorage.getItem(keys[k])[0]!='d')
      {
      let new_obj=JSON.parse(localStorage.getItem(keys[k]))
      
      this.userService.addUser(new_obj);
      }
    }

    // this.users=(values);
    
    // console.log(this.users)
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
    var strongpassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
    var validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var password="^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
    var mediumpassword="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
    if(user.firstName.match(validate)){
      if(user.lastName.match(strongpassword)){
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
              user.totalExpense=user.totalIncome=user.expenseCount=user.IncomeCount=0
              alert('signed in sucessfully');
            }
            
            this.userForm = false;
            this.loginflag=true;
            
          }
          
          }
        } 
        else if(user.lastName.match(mediumpassword)){
          alert('password is medium')
        }
        else if(user.lastName.match(password))
          alert('password is week')
        else{
          alert('password is week')
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
    this.incomeFlag=false;
    this.expenseFlag=false;
    this.summaryFlag=false
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
    
    if(this.curruser.sixthName===undefined ||  this.curruser.sixthName===null){
      if(this.curruser.fourthName!=undefined &&this.curruser.fifthName!=undefined){
        this.probar=66.66
      }
      else if(this.curruser.fourthName===undefined && this.curruser.fifthName!=undefined){
        this.probar=33.33;
      }
      else if(this.curruser.fourthName!=undefined && this.curruser.fifthName===undefined){
        this.probar=33.33;
      }
      else{
        this.probar=0;
      }
    }
    else{
      if(this.curruser.fourthName!=undefined &&this.curruser.fifthName!=undefined){
        this.probar=100
      }
      else if(this.curruser.fourthName===undefined && this.curruser.fifthName!=undefined){
        this.probar=66.66;
      }
      else if(this.curruser.fourthName!=undefined && this.curruser.fifthName===undefined){
        this.probar=66.66;
      }
      else{
        this.probar=33.33;
      }
    }

  }
  removeUser(user: User) {
    this.userService.deleteUser(user);
    let i = localStorage.length;
    while (i-- > 0) {
      
        let key = localStorage.key(i);
        if(localStorage.getItem(key)[0]!='d'){
            console.log(JSON.parse(localStorage.getItem(key)))
            if (JSON.parse(localStorage.getItem(key)).firstName === user.firstName) {
                localStorage.removeItem(key);
            }
        }
  }
    
   
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
    console.log('val',this.users)
    for(let i=0;i<allUsers.length;i++){
    let my_obj=JSON.stringify(allUsers[i]);
    localStorage.setItem ('myObj'+i.toString(), my_obj);
    //let new_obj=JSON.parse(localStorage.getItem("myObj"))
    }
    
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
      if(this.curruser.sixthName===undefined ||  this.curruser.sixthName===null){
      if(this.curruser.fourthName!=undefined &&this.curruser.fifthName!=undefined){
        this.probar=66.66
      }
      else if(this.curruser.fourthName===undefined && this.curruser.fifthName!=undefined){
        this.probar=33.33;
      }
      else if(this.curruser.fourthName!=undefined && this.curruser.fifthName===undefined){
        this.probar=33.33;
      }
      else{
        this.probar=0;
      }
    }
    else{
      if(this.curruser.fourthName!=undefined &&this.curruser.fifthName!=undefined){
        this.probar=100
      }
      else if(this.curruser.fourthName===undefined && this.curruser.fifthName!=undefined){
        this.probar=66.66;
      }
      else if(this.curruser.fourthName!=undefined && this.curruser.fifthName===undefined){
        this.probar=66.66;
      }
      else{
        this.probar=33.33;
      }
    }
  }
    else{
      alert('user not found')
    }
  }
}
readURL(input) 
{
    
  // let bannerImage = document.getElementById('bannerImg');
  // let imgData = this.getBase64Image(bannerImage);
  // localStorage.setItem("imgData", imgData);
  // var dataImage = localStorage.getItem('imgData');
  // document.getElementById('tableBanner').setAttribute( 'src','data:image/png;base64,'+dataImage)
  console.log(input)
  
}
sample(){
  document.querySelector('#bannerImg').addEventListener("change",function(){
    const reader=new FileReader();
    //reader.readAsDataURL(this.files[0]);
    reader.addEventListener("load",()=>{
      
      localStorage.setItem("recent-img",reader.result as string)
    })
    reader.readAsDataURL(this.files[0]);
  })
  const recentImageDataUrl=localStorage.getItem("recent-img")
  this.curruser.sixthName=recentImageDataUrl
  document.querySelector('#imgPreview').setAttribute("src",recentImageDataUrl)
  // document.addEventListener("DOMContentLoaded",()=>{
  //   const recentImageDataUrl=localStorage.getItem("recent-img")
  //   // const img=new Image()
  //   // img.src=recentImageDataUrl
  //   // if(recentImageDataUrl){
  //   //   document.querySelector('#imgPreview').setAttribute("src",img.src)
  //   // }
  //   console.log('st',recentImageDataUrl)
  // })
  // if(event.target.file){
  //   var reader=new FileReader()
  //   reader.readAsDataURL(event.target.file[0]);
  //   reader.onload=(event:any)=>{
  //     this.url=(event.target.result)
  //   }
  // }
}
income(){
this.incomeFlag=true;
  this.userpresentFlag=false;
  this.expenseFlag=false;
  this.summaryFlag=false;

  this.myuser={}
  
}
usdConverter(){
  if(this.currency=='INR'){
    this.currency='USD'
    this.my2user[this.selectedExpense]=this.my2user[this.selectedExpense]/81
  }
  
  else{
    this.currency='INR'
    this.my2user[this.selectedExpense]=this.my2user[this.selectedExpense]*81
  }
}
incomeusdConverter(){
  if(this.icurrency=='INR'){
    this.icurrency='USD'
    this.myuser[this.selectedIncome]=this.myuser[this.selectedIncome]/81
  }
  
  else{
    this.icurrency='INR'
    this.myuser[this.selectedIncome]=this.myuser[this.selectedIncome]*81
  }
}
expense(){
  this.userpresentFlag=false;
  this.incomeFlag=false;
  this.expenseFlag=true;
  this.summaryFlag=false;
  this.my2user={}

}

summary(){
  this.userpresentFlag=false;
  this.incomeFlag=false;
  this.expenseFlag=false;
  this.summaryFlag=true;
}
profile(){
  this.userpresentFlag=true;
  this.incomeFlag=false;
  this.expenseFlag=false;
  this.summaryFlag=false;
}
onChangeIncome(deviceValue) {
  
  this.selectedIncome=(deviceValue) 
}
onChangeExpense(deviceValue) {
  
  this.selectedExpense=(deviceValue) 
}
incomesubmit(){
  let cou=this.curruser.IncomeCount
  this.curruser['income'+cou.toString()]=(this.myuser)
  if(this.curruser['Bonus']){
    this.curruser.bonus=this.curruser['Bonus']
  }
  if(this.curruser['Check']){
    this.curruser.check=this.curruser['Check']
  }
  if(this.curruser['Salary']){
    this.curruser.salary=this.curruser['Salary']
  }
  if(this.curruser['Cash']){
    this.curruser.cash=this.curruser['Cash']
  }
  if(this.curruser['Others']){
    this.curruser.others=this.curruser['Others']
  }
  
  this.curruser.IncomeCount++;
  let cnt=0;
  for(let key in this.myuser) {
    
      if (!key.startsWith('eig') && !key.startsWith('inco')) 
      cnt+=this.myuser[key]
      else{
        continue;
      }
  
}
this.curruser.totalIncome+=cnt;
this.summary()
 
}
expensesubmit(){
  
  
  let cou=this.curruser.expenseCount
  this.curruser['expense'+cou.toString()]=(this.my2user)
  console.log(this.curruser)
  if(this.curruser['Food']){
    this.curruser.food=this.curruser['Food']
  }
  if(this.curruser['Grocery']){
    this.curruser.grocery=this.curruser['Grocery']
  }
  if(this.curruser['Bills']){
    this.curruser.bills=this.curruser['Bills']
  }
  if(this.curruser['Recharges']){
    this.curruser.recharge=this.curruser['Recharges']
  }
  if(this.curruser["Eduaction"]){
    this.curruser.education=this.curruser['Education']
  }
  if(this.curruser["Travel"]){
    this.curruser.travel=this.curruser['Travel']
  }
  this.curruser.expenseCount++;
  let cnt=0;
  for(let key in this.my2user) {
    
    if (!key.startsWith('sev') && !key.startsWith('expen')) 
    cnt+=this.my2user[key]
    else{
      continue;
    }

  }
  this.curruser.totalExpense+=cnt;
  this.summary()
  }
}
