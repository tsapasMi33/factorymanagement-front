import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";

export const packerGuard: CanActivateFn = (route, state) => {

  const currentUserRole = inject(AuthService).connectedUser?.role;

  if (currentUserRole === 'ADMIN' || currentUserRole === 'PACKER')
    return true;

  inject(Router).navigate(['/manufacture/planning'])
  return false;
};
