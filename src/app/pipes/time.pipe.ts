import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatTime'})
export class FormatTimePipe implements PipeTransform {
    transform(time: string): string {
        let timeInMinutes: number = Number(time);
        let formattedTime: string;
        if (timeInMinutes / 60 < 1) {
            formattedTime = timeInMinutes + ' min';
        } else if (timeInMinutes % 60 === 0) {
            formattedTime = timeInMinutes / 60 + ' h';
        } else {
            formattedTime = Math.floor(timeInMinutes / 60) + ' h ' + timeInMinutes % 60 + ' min';
        }
        return formattedTime;
    }
}