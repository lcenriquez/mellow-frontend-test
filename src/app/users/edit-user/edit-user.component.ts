import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user = {} as any;
  userId: string = '';
  editUserForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private service: UserService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.userId = data['id'];
    })
    if(this.userId !== '') {
      this.user = this.service.showUser(+this.userId);
      this.editUserForm = this.formBuilder.group({
        'name': new FormControl(this.user.name),
        'age': new FormControl(this.user.age)
      });
    }
  }

  updateUser() {
    let id = this.user.id;
    let name = this.editUserForm.value.name;
    let age = +this.editUserForm.value.age;
    let updatedUser = this.service.updateUser(id, name, age);
    if(updatedUser) {
      let sbRef = this._snackBar.open('User updated successfully. Redirecting...', 'Ok', {
        duration: 3000
      });
      sbRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/users');
      });
    }
  }

}
