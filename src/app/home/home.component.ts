import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import  {DataService} from '../service/data.service'
import { ToastrService } from 'ngx-toastr';
import{ FormBuilder,FormGroup,Validators } from '@angular/forms';
import {Mustmatch} from "../confirmed.validator";
import {HttpClient} from '@angular/common/http';
import {User} from '../user/user';
import {Observable} from 'rxjs';
import {NgbModal, ModalDismissReasons} from 'ngx-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
userData:any;
token:any;
email:any;
data: any;
  form: FormGroup;
   users=<User[]>{}
  contact: Array<User> | undefined;

private _url ='http://127.0.0.1:8000/api/mostrar';

  constructor(private router: Router,
              private dataService: DataService,
              private toastr: ToastrService,
              public fb: FormBuilder,
              private http: HttpClient,
              ) {

    {
      {
        this.form = this.fb.group({
            name: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            tlf: [null, [Validators.required,Validators.maxLength(9)]],
            user: [null, [Validators.required]],
            dni: [null, [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            password_confirmation: ['', [Validators.required]]
          },

          {
            validator: Mustmatch('password', 'password_confirmation')
          });
      }
    }
  }

  ngOnInit(): void {
    this.token=localStorage.getItem('token')
    this.userData=jwt_decode(this.token);
    this.email=this.userData.email;

    this.getlist()

  }
logout(){
    localStorage.removeItem('token')
  this.router.navigate(['/login'])
}

  mostrarusu(): Observable<User[]> {
   return this.http.get<User[]>(this._url);
  }

  getlist() {
    this.mostrarusu().subscribe(data => {
      // Entra aquí con respuesta del servicio correcta código http 200
      // @ts-ignore


      this.contact=data;
      console.log(this.contact)


    }, err => {
      // Entra aquí si el servicio entrega un código http de error EJ: 404,
      500

      this.toastr.error(err.error.message);
    })
  }

  eliminar(id) {
    this.dataService.eliminarUser(id).subscribe(data => {
      // Entra aquí con respuesta del servicio correcta código http 200
      // @ts-ignore
      this.toastr.success(data.message);
      this.getlist();


    }, err => {
      // Entra aquí si el servicio entrega un código http de error EJ: 404,
      500

      this.toastr.error(err.error.message);
    })
  }

  modificar() {
// @ts-ignore
    var id=document.getElementById('mod').value;
    if (this.form.invalid) {
      return;
    }


    this.dataService.modificarUser(this.form.value,id).subscribe(data => {
      // Entra aquí con respuesta del servicio correcta código http 200
      // @ts-ignore
      this.toastr.success(JSON.stringify(data.messages));
      this.getlist()


    }, err => {
      // Entra aquí si el servicio entrega un código http de error EJ: 404,
      500
      console.log(err.error.message)
      this.toastr.error(err.error.message);
    })

  }
  displayStyle = "none";

  openPopup() {
    this.displayStyle = "block";


  }
  closePopup() {
    this.displayStyle = "none";
  }
}


