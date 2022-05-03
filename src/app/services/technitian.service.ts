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


  public addNewTechnician(technitian:Technitian){
    return this.http.post<{name:string}>(this.url+"/technitian.json",technitian);
  }

  public getTechnicians(){
    return this.http.get<{[key:string]:Technitian}>(this.url+"/technitian.json").pipe(map((response)=>{
      const technicians:Technitian[]=[];
      for(let key in response){
        technicians.push({...response[key],id:key})
      }
      return technicians;
    }))
  }
}
