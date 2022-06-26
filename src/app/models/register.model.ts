export class Register {
  get password(): any {
    return this._password;
  }

  set password(value: any) {
    this._password = value;
  }
  name:any;
  user:any;
  email:any;
  tlf:any;
  dni:any;
  private _password:any;

}
