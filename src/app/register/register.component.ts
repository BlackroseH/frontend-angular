import { Component, OnInit } from '@angular/core';
import{ FormBuilder,FormGroup,Validators } from '@angular/forms';
import {Mustmatch} from '../confirmed.validator'
import  {DataService} from '../service/data.service'
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import {timeout} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']

})
export class RegisterComponent implements OnInit {


  form: FormGroup;
  data: any;

  constructor(
    public fb: FormBuilder,
    private dataService: DataService,

private toastr: ToastrService
  ) {
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

  ngOnInit(): void {
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.dataService.registerUser(this.form.value).subscribe(data => {
      // Entra aquí con respuesta del servicio correcta código http 200
      // @ts-ignore
      this.toastr.success(JSON.stringify(data.messages));


    }, err => {
      // Entra aquí si el servicio entrega un código http de error EJ: 404,
      500
      console.log(err.error.message)
      this.toastr.error(err.error.message);
    })

  }
}
