import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {
  user=''
  incomeTab=['Salary',"Bonus","Cash","Check","Others"]
  constructor() { }
  
  ngOnInit(): void {
    
  }
  onChange(deviceValue) {
    console.log(deviceValue) 
  }
  income(){
    
    }
    expense(){
    
    }
    summary(){
    
    }
}
