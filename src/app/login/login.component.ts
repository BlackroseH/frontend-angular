import { Component, OnInit } from '@angular/core';
import{ FormBuilder,FormGroup,Validators } from '@angular/forms';
import  {DataService} from '../service/data.service'
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import {timeout} from "rxjs";
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {


  miform: FormGroup;
  data: any;
  token:any;

  constructor(
    public fb: FormBuilder,
    private dataService: DataService,
    private router: Router,

    private toastr: ToastrService
    ) {
        this.miform = this.fb.group({
          email: [null, [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],

        });
      }

      ngOnInit(): void {
      }

      submitl() {
        if (this.miform.invalid) {
          return;
        }

        this.dataService.loginUser(this.miform.value).subscribe(data => {
          // Entra aquí con respuesta del servicio correcta código http 200
          // @ts-ignore
          var t=data;
          // @ts-ignore
          this.token=data.data.token
          // @ts-ignore
          this.toastr.success(data.message);

          localStorage.setItem('token',this.token);
          this.router.navigate(['/']);

    }, err => {
      // Entra aquí si el servicio entrega un código http de error EJ: 404,
      500
      console.log(err.error.message)
      this.toastr.error(err.error.message);

    })

  }






}
