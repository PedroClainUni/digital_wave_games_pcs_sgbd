import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientEditDTO } from '../../shared/models/dto/user/admClientEdit.dto';

export interface Client {
  name: string;
  email: string;
  contactEmail: string;
  tel1: string;
  tel2: string;
}

const clients: Client[] = [
  { name: 'Cliente 6', email: "cliente6@exemplo.com", contactEmail: "cliente6contato@exemplo.com", tel1: '4567-8123', tel2: '0112-1391' },
  { name: 'Cliente 1', email: "cliente1@exemplo.com", contactEmail: "cliente1contato@exemplo.com", tel1: '1234-5678', tel2: '9101-1213' },
  { name: 'Cliente 3', email: "cliente3@exemplo.com", contactEmail: "cliente3contato@exemplo.com", tel1: '7812-3456', tel2: '1391-0112' },
  { name: 'Cliente 4', email: "cliente4@exemplo.com", contactEmail: "cliente4contato@exemplo.com", tel1: '6781-2345', tel2: '1213-9101' },
  { name: 'Cliente 2', email: "cliente2@exemplo.com", contactEmail: "cliente2contato@exemplo.com", tel1: '8123-4567', tel2: '3910-1121' },
  { name: 'Cliente 5', email: "cliente5@exemplo.com", contactEmail: "cliente5contato@exemplo.com", tel1: '5678-1234', tel2: '1121-3910' },
];

@Component({
  selector: 'app-clients-management',
  templateUrl: './clients-management.component.html',
  styleUrls: ['./clients-management.component.scss']
})
export class ClientsManagementComponent implements OnInit {

  public hintColor = 'ffffff';

  displayedColumns: string[] = ['name', 'email', 'contact-email', 'tel-1', 'tel-2'];
  dataSource = new MatTableDataSource(clients);

  public editClientFormGroup: FormGroup;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private formBuilder: FormBuilder
  ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  ngOnInit(): void {
    let MOBILE_PATTERN = /(?:(^\+\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\d{4,5})(\d{4})/;

    this.editClientFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactEmail: ['', [Validators.required, Validators.email]],
      tel1: ['', [Validators.required, Validators.pattern(MOBILE_PATTERN)]],
      tel2: ['', [Validators.required, Validators.pattern(MOBILE_PATTERN)]]
    })
  }

  public editUser(): void {
    if (this.isFormValid()) {
      const editClient: ClientEditDTO = {
        username: this.editClientFormGroup.get('username').value,
        email: this.editClientFormGroup.get('email').value,
        contactEmail: this.editClientFormGroup.get('contactEmail').value,
        tel1: this.toNumber(this.editClientFormGroup.get('tel1').value),
        tel2: this.editClientFormGroup.get('tel2').value,
      }
      console.log(editClient);
    }
  }

  private isFormValid(): boolean {
    return this.editClientFormGroup.valid;
  }

  private toNumber(str): string {
    return str
      .replace(/\D/g, '')
      .replace(/(?:(^\+\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\d{4,5})(\d{4})/,
        (fullMatch, country, ddd, dddWithZero, prefixTel, suffixTel) => {
          if (country) return `${country} (${ddd || dddWithZero}) ${prefixTel}-${suffixTel}`;
          if (ddd || dddWithZero) return `(${ddd || dddWithZero}) ${prefixTel}-${suffixTel}`;
          if (prefixTel && suffixTel) return `${prefixTel}-${suffixTel}`;
          return str;
        }
        )
  }
}
