import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Technitian } from '../models/technitian';

@Injectable({
  providedIn: 'root'
})
export class TechnitianService {

  private readonly url:String="https://automobiliuregistracija-default-rtdb.europe-west1.firebasedatabase.app/"; 

  constructor(private http:HttpClient) { 

  }


  public addNewTechnician(tecnician:Technitian){
    return this.http.post<{name:string}>(this.url+"/technician.json",tecnician);
  }

  public getTechnicians(){
    return this.http.get<{[key:string]:Technitian}>(this.url+"/technician.json").pipe(map((respons)=>{
      const technicians:Technitian[]=[];
      for(let key in respons){
        technicians.push({...respons[key],id:key})
      }
      return technicians;
    }))
  }

  public isCityAvailable(city:String){
    return this.http.get<number|null>(this.url+"/cities/"+city+".json").pipe(
      map((respons)=>{
        if (respons==null || respons==0){
          return false;
        }else{
        
          return true;
        }
      }));
  }

  public decreaseCityPlaces(city:string){
    return this.http.patch(this.url+"/cities.json", {[city]:0});
  }
}
