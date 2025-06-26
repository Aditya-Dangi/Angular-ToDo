import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueTimeStatus'
})
export class DueTimeStatusPipe implements PipeTransform {

  transform(dueTime: string | undefined): string {
    if(!dueTime) return '';

    const now = new Date();
    const[hours, minutes] = dueTime.split(':').map(Number);
    const due = new Date();

    due.setHours(hours, minutes, 0, 0);

    if(now > due){
      return 'Time Limit Exceeded at ' + dueTime;
    }else{
      return 'Due at: ' + dueTime;
    }
  }

}
