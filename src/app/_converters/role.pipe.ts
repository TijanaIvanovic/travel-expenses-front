import { PipeTransform, Pipe } from '@angular/core';

@Pipe({name: 'role'})
export class RolePipe implements PipeTransform{
    transform(id: number) {
        let role = '';
        if(id === 1){
            role = 'admin';
        }else if(id === 2){
            role = 'user';
        }
        return role;
    }

}