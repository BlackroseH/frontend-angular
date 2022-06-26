import {FormGroup} from "@angular/forms";


export function Mustmatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['Mustmatch']) {
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ Mustmatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };

}
