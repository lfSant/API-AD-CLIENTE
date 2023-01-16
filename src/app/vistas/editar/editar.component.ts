import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaProductosI } from 'src/app/modelos/listaproductos.interface';
import { Producto } from 'src/app/modelos/producto.interface';
import { ApiService } from 'src/app/servicios/api/api.service';
import { ProductoCl } from 'src/app/modelos/producto';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css'],
})
export class EditarComponent implements OnInit {

  datosProducto: ProductoCl = new ProductoCl();


  constructor(private router: Router, private activaterouter: ActivatedRoute, private api:ApiService) {

  }

   //crea una lista de tipo any
   productos: Producto []= [];



  editarFor = new FormGroup({
    idProducto: new FormControl(''),
     codigoBarra: new FormControl(''),
     nombre:  new FormControl(''),
     marca:  new FormControl(''),
     categoria:  new FormControl(''),
     precio:  new FormControl(''),

     });



  ngOnInit(): void {



    let productoid= this.activaterouter.snapshot.paramMap.get('id');
    let token = this.getToken();
    this.api.getSingleProducto(productoid).subscribe(data => {
      console.log(data.response);
      let response: ListaProductosI = data;
      this.productos = response.response;



    })

  }

  getToken(){
    return localStorage.getItem('token');
  }
}
