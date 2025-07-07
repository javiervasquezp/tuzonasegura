import { AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnInit {
  //@Input("count") count:number=0;
  @Input("pagecount") pagecount:number=0;
  @Output() pageHandler = new EventEmitter();
  cantidadBotones:number = 0;
  paginaPosition:number = 0;
  ListPag:any=[];
  private _count:number=0;
  @Input()
  set count(value: number) { 
    this.ListPag=[];
    this._count = value;     
    let result= this._count/this.pagecount;
    this.cantidadBotones = Math.ceil(result);
    console.log(this._count);
    if(this._count !=0){
    if(this.cantidadBotones<=3){
      for(let i=0;i<this.cantidadBotones;i++)
      {
        this.ListPag.push(i);
      }
    } 
    else{ 
      for(let i=0;i<3;i++)
      {
        this.ListPag.push(i);
      }
    }
  }
  else {
    this.cantidadBotones=1;
  }
  }
  constructor() { }

  ngOnInit(): void {
    
  }
  onClickHandler(page:number): void {
    this.paginaPosition=page;
		this.pageHandler.emit(page);
	}
  onClickInicio(){
    //this.paginaPosition=0;
    let position=0;
    let isListaboton = this.isListaData(position);     
    if(!isListaboton){
      this.ListPag=[];
      if(this.cantidadBotones<=3){
        for(let i=0;i<this.cantidadBotones;i++)
        {
          this.ListPag.push(i);
        }
      } 
      else{ 
        for(let i=0;i<3;i++)
        {
          this.ListPag.push(i);
        }
      }
    }
    this.onClickHandler(position);
  }
  onClickSiguiente(){
    let position=this.paginaPosition+1;
    let isListaboton = this.isListaData(position);     
    if(!isListaboton){
      this.ListPag=[];
      for(let i=position-2;i<this.cantidadBotones;i++)
      {
        this.ListPag.push(i);
      }
    }
    this.onClickHandler(position);
  }
  onClickAnterior(){
    let position=this.paginaPosition-1;
    let isListaboton = this.isListaData(position);     
    if(!isListaboton){
      this.ListPag=[];
      if(position==0){
        if(this.cantidadBotones<=3){
          for(let i=0;i<this.cantidadBotones;i++)
          {
            this.ListPag.push(i);
          }
        } 
        else{ 
          for(let i=0;i<3;i++)
          {
            this.ListPag.push(i);
          }
        }
      }
      else {  
        for(let i=position-2;i<this.cantidadBotones;i++)
        {
          this.ListPag.push(i);
        }
      }
     
    }
    this.onClickHandler(position);
  }
  onClickFinal(){
    let position=this.cantidadBotones-1;
    let isListaboton = this.isListaData(position);     
    if(!isListaboton){
      this.ListPag=[];
      for(let i=position-2;i<this.cantidadBotones;i++)
      {
        this.ListPag.push(i);
      }
    }
    this.onClickHandler(position);
  }
  isListaData(position:number):boolean{
    let isListaboton = false;
    this.ListPag.forEach((element: any,index:number) => {
      if(position==element){
        isListaboton=true;
      }
    });
    return isListaboton;
  }

}
