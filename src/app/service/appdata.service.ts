import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppdataService {
  landmark = new Landmark();
  landmarksByCountry: any;
  isMultiple = false;
  constructor() { }
}

class Landmark{
  idx: number = 0;
  name: string = '';
  country: string = '';
  detail: string = '';
  url: string = '';
}
