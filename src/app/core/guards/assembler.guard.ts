import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";

export const assemblerGuard: CanActivateFn = (route, state) => {

  const currentUserRole = inject(AuthService).connectedUser?.role;

  if (currentUserRole === 'ADMIN' || currentUserRole === 'ASSEMBLER')
    return true;

  inject(Router).navigate(['/manufacture/planning'])
  return false;
};
