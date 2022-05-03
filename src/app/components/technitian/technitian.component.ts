import { Component, OnInit } from '@angular/core';
import { Technitian } from 'src/app/models/technitian';
import { TechnitianService } from 'src/app/services/technitian.service';

@Component({
  selector: 'app-technitian',
  templateUrl: './technitian.component.html',
  styleUrls: ['./technitian.component.css']
})
export class TechnitianComponent implements OnInit {


  public technicians:Technitian[]=[];
  constructor( private techService:TechnitianService) {   }

  ngOnInit(): void {
    this.techService.getTechnicians().subscribe((response)=>{
      this.technicians=response;
    })

  }

}
