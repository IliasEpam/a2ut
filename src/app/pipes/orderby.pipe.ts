import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {
  transform(array: object[], sortConfig: string): object[] {
    if (array && array.length) {
        var x: number, y: number;
        return array.sort(function(a, b){ 
            if (sortConfig === 'az') return new Date(a['date']).getTime() - new Date(b['date']).getTime();
            if (sortConfig === 'za') return new Date(b['date']).getTime() - new Date(a['date']).getTime();
        });
    }
  }
}