import { Component } from '@angular/core';
import jsonData from '../../../assets/landmark.json'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppdataService } from '../../service/appdata.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landmarks',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatInputModule
  ],
  templateUrl: './landmarks.component.html',
  styleUrl: './landmarks.component.scss'
})

export class LandmarksComponent {

  landmarks = jsonData;
  landmark: any;
  countrySet = new Set<string>();
  countries : any;
  country = '';
  landmarksByCountry = new Array<any>();
  landmarksByName = new Array<any>();
  isMultiple = false;

  constructor (private router : Router, private data : AppdataService){
    // console.log(jsonData)

    //1
    this.landmark = this.landmarks[0];
    this.landmarks.forEach(element => {
      this.countrySet.add(element.country);
    });
    this.countries = Array.from(this.countrySet);
    console.log(this.countries);

    //2
    this.landmarksByCountry = this.data.landmarksByCountry;
    this.isMultiple = this.data.isMultiple;
    this.landmark = this.data.landmark;

    if(this.landmark.idx == 0){
      this.landmark = this.landmarks[0];
    }
  }

  Search(id : any){
    this.isMultiple = false;
    for (let index = 0; index < this.landmarks.length; index++){
      if (this.landmarks[index].idx == id){
        this.landmark = this.landmarks[index];
        break;
      }
    }
  }
  SearchName(name: string) {
    this.landmarksByCountry = this.landmarks.filter(element =>
      element.name.toLowerCase().includes(name.toLowerCase())
    );
    this.isMultiple = this.landmarksByCountry.length > 1;
    this.landmark = this.landmarksByCountry[0] || null;
  }

  searchByCountry(){
    this.isMultiple = true;
    this.landmarksByCountry = new Array<any>();
    this.landmarks.forEach(element => {
      if (element.country == this.country){
        this.landmarksByCountry.push(element);
      }
    });
    this.landmark = this.landmarksByCountry[0];
  }

  selectCountry(selectedLandmark: any){
    this.data.landmark = selectedLandmark;
    this.data.landmarksByCountry = this.landmarksByCountry;
    this.data.isMultiple = this.isMultiple;

    this.router.navigateByUrl('/show');
  }
}
