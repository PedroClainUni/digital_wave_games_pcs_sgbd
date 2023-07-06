import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public progress: number = 0;

  constructor(
    public authenticationService: AuthenticationService,
    public loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    this.loaderService.isLoading.subscribe((loading) => {
      this.progress = 0;
      if (loading) {
        setInterval(() => this.manageProgress(), 100);
      }
    });
  }

  public logout(): void {
    this.authenticationService.logout();
  }

  manageProgress() {
    this.progress = this.progress + 20;
  }
}
