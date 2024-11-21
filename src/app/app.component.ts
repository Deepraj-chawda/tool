import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fraudtool';
  toastr: ToastrService = inject(ToastrService);
  authService : AuthService = inject(AuthService);
  router : Router = inject(Router);

  // ngOnInit() {
  //   this.authService.autoLogin();
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd)
  //   ).subscribe((event: NavigationEnd) => {
  //     window.scrollTo(0, 0);
  //   });
  // }

  onDeactivate() {
    document.body.scrollTop = 0;
  }
}
