import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:any[],filterstring:string,searchText:any ):any {
    const returnArray=[];
    if(value.length===0 || filterstring==''||searchText==='')
    {
         return value;
    }
    for(const item of value)
    {
      if(item[searchText]===filterstring)
      {
        returnArray.push(item);
      }
    }
   return returnArray;
  }

}
