import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  amine = false;
  public Username = '';

  constructor() { }


}
