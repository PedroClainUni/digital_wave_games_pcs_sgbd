import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewAddressComponent } from './new-address/new-address.component';
import { MatAccordion } from '@angular/material/expansion';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AddressService } from 'src/app/shared/services/address.service';
import { AddressDTO } from 'src/app/shared/models/dto/address.dto';
import { Address } from 'src/app/shared/models/address.model';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private authenticationService: AuthenticationService,
              private addressService: AddressService,
              private matDialog: MatDialog,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.username = this.authenticationService.getUsername();
    this.userId = parseInt(this.authenticationService.getUserId());
    this.addressService.getAddressesByClient(this.userId).subscribe(as => {
      as.forEach(a => {
        const addressForm = this.formBuilder.group({
          id: a.id,
          postalCode: [a.postalCode, Validators.required],
          city: [a.city, Validators.required],
          state: [a.state, Validators.required],
          district: [a.district, Validators.required],
          number: [a.number, Validators.required],
          additionalInfo: a.additionalInfo,
          street: [a.street, Validators.required],
          cep: a.cep
        })
        this.addressFormArray.push(addressForm);
      })
    })


    this.userService.getByEmail(this.username).subscribe(u => {
      this.mainInfosFormGroup.controls['name'].setValue(u.name);
      this.mainInfosFormGroup.controls['username'].setValue(u.username);
      this.mainInfosFormGroup.controls['email'].setValue(u.email)
      this.contactFormGroup.controls['tel'].setValue(u.tel);
      this.contactFormGroup.controls['phone1'].setValue(u.cel2);
      this.contactFormGroup.controls['phone2'].setValue(u.cel1);
      this.contactFormGroup.controls['secondaryEmail'].setValue(u.secondaryEmail);
    })
  }

  openAddressDialog(): void {
    let dialogRef = this.matDialog.open(NewAddressComponent, {
      width: '50%'
    });
  }

  public removeAddress(index: number) {
    const address = this.addressFormArray.controls[index];
    this.addressService.deleteAddress(this.userId, address['controls'].id.value);
    this.addressFormArray.removeAt(index);
    this.notificationService.success("Endereço removido com sucesso!");
  }

  public updateAddress(index: number) {
    this.addressService.updateAddress({
      id: this.addressFormArray.controls[index]['controls'].id.value,
      city: this.addressFormArray.controls[index]['controls'].city.value,
      cep: null,
      district: this.addressFormArray.controls[index]['controls'].district.value,
      number: this.addressFormArray.controls[index]['controls'].number.value,
      additionalInfo: this.addressFormArray.controls[index]['controls'].additionalInfo.value,
      postalCode: this.addressFormArray.controls[index]['controls'].postalCode.value,
      state: this.addressFormArray.controls[index]['controls'].state.value,
      street: this.addressFormArray.controls[index]['controls'].street.value
    })
    this.notificationService.success("Endereço atualizado com sucesso!");
  }

  public update() {
    this.userService.update({
      email: this.mainInfosFormGroup.controls['email'].value,
      name: this.mainInfosFormGroup.controls['name'].value,
      username: this.mainInfosFormGroup.controls['username'].value,
      secondaryEmail: this.contactFormGroup.controls['secondaryEmail'].value,
      id: this.userId,
      phone1: this.contactFormGroup.controls['tel'].value,
      phone2: this.contactFormGroup.controls['phone1'].value,
      phone3: this.contactFormGroup.controls['phone2'].value,
    })
  }

  public changePassword() {
    if (this.passwordFormGroup.controls['new'].value !== this.passwordFormGroup.controls['repeat'].value) {
      this.notificationService.error("As senhas devem ser iguais.");
      return;
    }
    this.userService.changePassword({
      newPass: this.passwordFormGroup.controls['new'].value,
      oldPass: this.passwordFormGroup.controls['old'].value,
      username: this.username
    }).subscribe(e => {
      e ? this.notificationService.success("Senha atualizada com sucesso!") : this.notificationService.error("Senha atual incorreta!");
    })
  }

  get addressFormArray() {
    return this.addressFormGroup.controls['addresses'] as FormArray;
  }

  public addressFormGroup = this.formBuilder.group({
    addresses: this.formBuilder.array([])
  })
  public mainInfosFormGroup: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required]
  });
  public contactFormGroup: FormGroup = this.formBuilder.group({
    tel: '',
    phone1: '',
    phone2: '',
    secondaryEmail: ''
  })
  public passwordFormGroup: FormGroup = this.formBuilder.group({
    old: '',
    new: '',
    repeat: ''
  })

  username: string;
  userId: number;

}
