import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HistoryComponent } from './history/history.component';


@NgModule({
  declarations: [
    AppComponent,
    
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
