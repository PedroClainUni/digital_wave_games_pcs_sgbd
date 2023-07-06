import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Address } from '../models/address.model';
import { PostAddressDTO } from '../models/dto/address/postAddress.dto';
import { PutAddressDTO } from '../models/dto/address/putAddres.dto';
@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private http: HttpClient) { }

  getAddressesByClient(clientId: number) {
    return this.http.get<Address[]>(`${environment.baseUrl}/clients/user/${clientId}/addresses`)
  }
  updateAddress(putAddressDTO: PutAddressDTO) {
    return this.http.put<void>(`${environment.baseUrl}/clients/user/address`, putAddressDTO).subscribe();
  }
  deleteAddress(clientId: number, addressId: number) {
    return this.http.delete<void>(`${environment.baseUrl}/clients/user/${clientId}/address/${addressId}`).subscribe();
  }
  createAddress(postAddressDTO: PostAddressDTO) {
    return this.http.post<number[]>(`${environment.baseUrl}/clients/user/address`, postAddressDTO).subscribe();
  }
}
