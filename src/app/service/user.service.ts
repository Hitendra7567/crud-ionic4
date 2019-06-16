import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: any = [];

  constructor(
    public storage: Storage,
    public toastController: ToastController
  ) {

  }

  getUsers() {
    this.storage.get('users').then(val => {
      if (val != null || val != '') {
        this.users = val;
      }
    });
  }

  addUser(data) {
    this.storage.get('users').then(val => {
      if (val != null || val != undefined) {
        this.users = val;
      }

      this.users.push(data);
      this.storage.set('users', this.users);
      this.showToast('User Added');
    });
  }

  deleteUser(index) {
    this.users.splice(index, 1);
    this.storage.set('users', this.users);
    this.showToast('User Deleted');
  }

  editUser(data, index) {
    this.users[index] = data;
    this.storage.set('users', this.users);
    this.showToast('User Updated');
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }
}
