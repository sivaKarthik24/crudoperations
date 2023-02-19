import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';
import HC_exporting from "highcharts/modules/exporting";
import HC_Data from "highcharts/modules/export-data";
import Accessbility from "highcharts/modules/accessibility";
HC_exporting(Highcharts);
HC_Data(Highcharts);
Accessbility(Highcharts);
// import { Router } from '@angular/router';

HighchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);
import { parse } from 'url';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @ViewChild("barChart", { static: false }) barChart: any;
  @Input() message;
  daily=[]
dailyFlag=false;
weeklyFlag=false
monthlyFlag=false

  weekly=[];
  dd: string;
  mm: string;
  yyyy: number;
  monthly=[]
  incomeExpenseFlag=false;
  cnt1=0
  cnt2=0
  constructor() { }

  ngOnInit(): void {
    
    this.dailyFlag=true;
    this.monthly=[];
    this.weekly=[];
    var today = new Date();
    this.dd = String(today.getDate()).padStart(2, '0');
    this.mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
   this.yyyy = today.getFullYear();

    
    
    var keys = Object.keys(localStorage),
        i = keys.length;
    let incomeArray=[]
    let expenseArray=[]
    for(let k=0;k<i;k++){
      if(localStorage.getItem(keys[k])[0]!='d')
      {
      let new_obj=JSON.parse(localStorage.getItem(keys[k]))
      if(new_obj.firstName===this.message){
        for(let i=0;i<new_obj.IncomeCount;i++){
          incomeArray.push(new_obj['income'+i.toString()])
          
        }
        for(let j=0;j<new_obj.expenseCount;j++){
          expenseArray.push(new_obj['expense'+j.toString()])
        }
      }
    }
    }
    console.log('i',incomeArray);
    console.log('j',expenseArray)
    
    let totalArray=[]
    
    for(let i=0;i<incomeArray.length;i++){
      let cate=''
      if(incomeArray[i].Check)cate='Check'
      if(incomeArray[i].Cash)cate='Cash'
      if(incomeArray[i].Salary)cate='Salary'
      if(incomeArray[i].Bonus)cate='Bonus'
      if(incomeArray[i].Others)cate=incomeArray[i].icustom
      
      let obj={date:incomeArray[i].income_dot,
      desc:incomeArray[i].eightName,
      amount:incomeArray[i].Check || incomeArray[i].Cash || incomeArray[i].Salary || incomeArray[i].Bonus || incomeArray[i].Others,
      sign:'+',num:0,category:cate}
      
      totalArray.push(obj)
      this.cnt1+=obj.amount
      
    }

    for(let i=0;i<expenseArray.length;i++){
      let cate=''
      if(expenseArray[i].Food)cate='Food'
      if(expenseArray[i].Grocery)cate='Grocery'
      if(expenseArray[i].Bills)cate='Bills'
      if(expenseArray[i].Education)cate='Education'
      if(expenseArray[i].Recharges)cate='Recharges'
      if(expenseArray[i].Travel)cate='Travel'
      if(expenseArray[i].Others)cate=expenseArray[i].ecustom
      let obj={date:expenseArray[i].expence_dot,
      desc:expenseArray[i].seventhName,
      amount:expenseArray[i].Food || expenseArray[i].Grocery || expenseArray[i].Bills || expenseArray[i].Recharges || expenseArray[i].Education || expenseArray[i].Travel || expenseArray[i].Others,
      sign:'-',num:1,category:cate}
      totalArray.push(obj)
      this.cnt2+=obj.amount
    }
    let newdate=[]
    totalArray.forEach(data => {
      newdate.push({ndate:data.date,dat:data})
      })
    
    let ndate=[]
    for(let k=0;k<newdate.length;k++){
      ndate.push(newdate[k].ndate)
    }
    ndate.sort(function (a, b) {
      // '01/03/2014'.split('/')
      // gives ["01", "03", "2014"]
      a = a.split('-');
      b = b.split('-');
      return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
  });
  ndate = ndate.filter(function(item, pos) {
    return ndate.indexOf(item) == pos;
})
  ndate.forEach(sin=>{
    newdate.forEach(doub=>{
      if(sin===doub.ndate){
        this.daily.push(doub.dat)
      }
    })
  })
  this.daily.reverse();
  
  }
  dailyT(){
    this.dailyFlag=true;
    this.weeklyFlag=false
    this.monthlyFlag=false
    this.incomeExpenseFlag=false
    let a=[]
    let b=[]
    this.daily.forEach(data=>{
      if(data.sign==='-'){
      a.push(data.category);
      b.push(data.amount)
      }
    })
    this.createChartColumn(a,b,'Daily')
  }
  weeklyT(){
    this.monthly=[];
    this.weekly=[];
    this.dailyFlag=false;
    this.incomeExpenseFlag=false
    this.weeklyFlag=true
    this.monthlyFlag=false
    
    this.daily.forEach(data=>{
      let b=data.date.split('-')
      if(parseInt(b[0])===this.yyyy && parseInt(b[1])===parseInt(this.mm)&& (parseInt(this.dd)-parseInt(b[2]))<=7){
        
        this.weekly.push(data);

      }
    })
    let a=[]
    let b=[]
    this.weekly.forEach(data=>{
      if(data.sign==='-'){
      a.push(data.category);
      b.push(data.amount)
      }
    })
    this.createChartColumn(a,b,'Weekly')

  }
  monthlyT(){
    this.monthly=[];
    this.weekly=[];
    this.dailyFlag=false;
    this.weeklyFlag=false
    this.monthlyFlag=true
    this.incomeExpenseFlag=false
    this.daily.forEach(data=>{
      let b=data.date.split('-')
        if(parseInt(b[0])===this.yyyy && parseInt(b[1])===parseInt(this.mm)){
          this.monthly.push(data)
        }
      

    })
    let a=[]
    let b=[]
    this.monthly.forEach(data=>{
      if(data.sign==='-'){
      a.push(data.category);
      b.push(data.amount)
      }
    })
    
    this.createChartColumn(a,b,'Monthly')
    
  }
  private createChartColumn(a,b,c): void {
    console.log(a,b);
    let date = new Date();
    const data: any[] = [];

   

    const chart = Highcharts.chart('chart-column' as any, {
      chart: {
        type: 'column',
      },
      title: {
        text: c+' Expense Chart',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        min: 0,
        title: undefined,
      },
      xAxis: {
        categories: a,
        
      },
      
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [{
        name: 'Amount',
        data:b
      }],
    } as any);
    
    
  }
  incomevsexpense(){
    this.incomeExpenseFlag=true;
    let a=[]
    let b=[]
    let c=[]
    let d=[]
    this.monthly.forEach(data=>{
      if(data.sign==='+'){
      a.push(data.category);
      b.push(data.amount);
      }
      if(data.sign==='-'){
        c.push(data.category);
        d.push(data.amount);
        }
    })
    this.inexp(a,b,c,d)
    const chart = Highcharts.chart('chart-month' as any, {
      chart: {
        type: 'bar',
      },
      title: {
        text:' Income vs Expense Monthly',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        min: 0,
        title: undefined,
      },
      xAxis: {
        categories: ['']
        
      },
      
      plotOptions: {
        bar: {
          stacking: 'normal',
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [{
        name: 'Income',
        data:[this.cnt1],color:'green'
      },
      {
        name: 'Expense',
        data:[this.cnt2],
        color:'red'
      }],
    } as any);
  }
  inexp(a,b,c,d){
    
    const chart = Highcharts.chart('chart-line' as any, {
      chart: {
        type: 'line',
      },
      title: {
        text:' Income Monthly',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: {
        
        title: undefined,
      },
      xAxis: {
        
        
      },
      
      plotOptions: {
        line: {
          // stacking: 'normal',
          dataLabels: {
            enabled: true,
          },
        },
      },
      series: [{
        name: 'Income',
        data:b,
        categories:a
      },
      {
        name: 'expense',
        data:d,
        categories:c
      },
    ]
    } as any);
  }
  
  
}
