import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PutUserDTO } from '../models/dto/user/putUser.dto';
import { ChangePasswordDTO } from '../models/dto/user/changePassword.dto';
import { UserInfo } from '../models/userInfo.model';
import { ApiResponse } from '../models/dto/apiResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient) { }

  getByEmail(email: string): any {
    return this.http.get<ApiResponse<UserInfo>>(`${environment.baseUrl}/users/email/${email}`)
  }
  update(putUserDTO: PutUserDTO) {
    return this.http.put<void>(`${environment.baseUrl}/clients/user/infos`, putUserDTO).subscribe();
  }
  changePassword(changePasswordDTO: ChangePasswordDTO) {
    return this.http.post<boolean>(`${environment.baseUrl}/clients/change-password`, changePasswordDTO);
  }
}
