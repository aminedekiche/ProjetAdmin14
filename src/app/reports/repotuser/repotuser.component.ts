import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-repotuser',
  templateUrl: './repotuser.component.html',
  styleUrl: './repotuser.component.css'
})


export class RepotuserComponent implements OnInit {

  users : any[]=[];
  datedebut : string ='15/10/1985';
  datefin : string ='15/10/1985';
 
  constructor( private userservice: UserService, private route: Router, private dialogref:MatDialog) { }  
  
  ngOnInit(): void {
    this.getAllusers();
  }

  getAllusers(){
    this.userservice.getAllUsersservice().subscribe(
      {
      
        next: (result) => {
          this.users = result;

          },
          error: (Response) =>{
            console.log(Response);
            alert("erreur get list");
          }
        
      }
    )
  }

}
