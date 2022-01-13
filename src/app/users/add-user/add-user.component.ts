import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup = new FormGroup({});

  constructor(private service: UserService, private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      'name': new FormControl('',[Validators.required]),
      'age': new FormControl('', [Validators.required])
    });
  }

  createUser() {
    let name = this.addUserForm.value.name;
    let age = +this.addUserForm.value.age;
    let user = this.service.createUser(name, age);
    if(user) {
      this.addUserForm.disable(); //setValue({name: '',age:''})
      let sbRef = this._snackBar.open('User created successfully. Redirecting...', 'Ok', {
        duration: 3000
      });
      sbRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl(`/user/${user.id}`);
      });
    }
  }

}
