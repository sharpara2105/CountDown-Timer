import { Component, OnInit } from '@angular/core';
import { exit } from 'process';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent{
  public toggleButton: boolean = false;
  public toggleValue: boolean = false;
  time;
  secondary_flag = true;
  stop_flag = false;
  timerId
  percentage:number;
  callTimer(value,counter) {
    let timerId = setInterval(function() {
      let dateTime= new Date();
      this.time = dateTime.toLocaleTimeString('it-IT');
      console.log(this.time);
      localStorage.setItem('curr_time',this.time);
      localStorage.setItem('counter',counter.toString());
      if (counter==60*parseInt(value.mins)) {
        clearInterval(timerId);
        alert('Count Down completed');
      }
      counter++;
      this.percentage = Math.floor((counter/(60*parseInt(value.mins)))*100)
        if (this.percentage <=100) {
          localStorage.setItem('percentage',this.percentage);
        console.log(this.percentage)
        }
    }, 1000);
    this.timerId=timerId
    
  }
  start(value):any {
    if ( this.stop_flag && this.secondary_flag ) {
      //start after stopping (resume operation):
      let temp = localStorage.getItem('counter');
      let counter = parseInt(temp)+1;
      this.callTimer(value,counter);
      
      }
      
    else if(this.secondary_flag && !this.stop_flag) {
      //start operation: 
      this.callTimer(value,0);
    
    }
    else if (this.stop_flag && !this.secondary_flag) {
      //Stop operation:
      clearInterval(this.timerId);
    }
    else{
      //reset operation:
      clearInterval(this.timerId);
      localStorage.removeItem('curr_time');
      localStorage.removeItem('percentage');
    }
    
  }
get countDown(): any {
    return localStorage.getItem('curr_time');
}
get cur_percentage(): any {
  return localStorage.getItem('percentage');
}

 
reset(f ) {
  f.resetForm();
  this.secondary_flag=false;
  this.stop_flag=false;
  this.start(f) 
  this.secondary_flag = true;
}
stop(f){
  this.secondary_flag=false;
  this.stop_flag = true;
  this.start(f)
  this.secondary_flag = true;
  
}
enable(){
  this.toggleButton = false
}

disable(){
  this.toggleButton = true
}
enableButton(){
  this.toggleValue = false
}

disableButton(){
  this.toggleValue = true
}

}
