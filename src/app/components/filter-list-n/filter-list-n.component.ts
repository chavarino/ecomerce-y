import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FiltroAccion } from '../../interfaces/filtro-accion';

@Component({
  selector: 'app-filter-list-n',
  templateUrl: './filter-list-n.component.html',
  styleUrls: ['./filter-list-n.component.scss']
})
export class FilterListNComponent implements OnInit {

  constructor() { }

  @Input()
  titulo:string = "";

  

  @Input() selectList : FiltroAccion[]= [];

  @Output() filterSelect = new EventEmitter<FiltroAccion>();

  
  filterSelected : FiltroAccion = {} as FiltroAccion;

  selectFilter(f :FiltroAccion)
  {
    this.filterSelected = f;
    this.filterSelect.emit(f);
  }


  isSelectedFilter(f:FiltroAccion)
  {
    return this.filterSelected ===f;
  }
  ngOnInit(): void {
  }

}
