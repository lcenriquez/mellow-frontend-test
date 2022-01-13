import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  user = {} as any;
  userId: string = '';

  constructor(private service: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.userId = data['id'];
    })
    this.deleteUser(+this.userId)
  }

  deleteUser(id: number) {
    if(window.confirm("Are you sure you want to delete this user?")) {
      this.user = this.service.destroyUser(id);
    }
    this.router.navigateByUrl('/users');
  }
}
