import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private userForm: FormGroup;
  imgURL: any;
  userList: boolean = true;
  name: any;
  mobile: any;
  email: any;
  isEditMode: boolean = false;
  index: any;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService
  ) {
    this.userService.getUsers();
    this.userForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      profile: new FormControl('')
    });
  }
  addUser() {
    if (this.isEditMode) {
      this.userService.editUser(this.userForm.value, this.index);
    } else {
      this.userService.addUser(this.userForm.value);
    }

    this.userForm.reset();
    this.imgURL = '';
  }

  changeListener(event) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.userForm.value.profile = this.imgURL;
    }
  }

  delete(index) {
    this.userService.deleteUser(index);
  }

  edit(data, index) {
    this.index = index;
    this.isEditMode = true;
    this.userList = false;
    this.userForm.value.name = data.name;
    this.userForm.value.mobile = data.mobile;
    this.userForm.value.email = data.email;
    this.imgURL = data.profile;
    this.name = data.name;
    this.mobile = data.mobile;
    this.email = data.email;
  }

  change() {
    this.userList = !this.userList;
    if (this.userList) {
      this.isEditMode = false;
    }
  }
}
