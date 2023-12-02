import {CanMatchFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";

export const adminGuard: CanMatchFn = (route, state) => {

  const currentUserRole = inject(AuthService).connectedUser?.role;

  if (currentUserRole === 'ADMIN')
    return true;

  inject(Router).navigate(['/manufacture/planning']);
  return false;
};
