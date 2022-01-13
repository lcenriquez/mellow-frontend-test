import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [{id: 1, name: 'Luis', age: 28},{id: 2, name: 'Greg', age: 35},{id: 3, name: 'Tony', age: 49}];
  lastId = this.users[this.users.length-1].id;

  constructor() { }

  getUsers() {
    return this.users;
  }

  showUser(id: number) {
    let [ user ] = this.users.filter(user => user.id === id);
    return user;
  }

  createUser(name: string, age: number) {
    this.lastId += 1;
    let user = {id: this.lastId, name, age};
    this.users.push(user);
    return user;
  }

  updateUser(id: number, name: string, age: number) {
    let user = this.users.find(user => user.id === id);
    if(user) {
      user.name = name;
      user.age = age
    }
    return user;
  }

  destroyUser(id: number) {
    let user = this.users.find(user => user.id === id);
    if(user) {
      this.lastId -= 1;
      this.users = this.users.filter(user => user.id !== id);
    }
    return user;
  }
}