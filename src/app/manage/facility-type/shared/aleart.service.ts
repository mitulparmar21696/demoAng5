import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable()
export class AleartService {

  constructor() {}

  showSuccess(message: string, title = 'Operation Successful') {
    return swal(title, message, 'success');
  }

  showError(message: string, title = 'Error', error?: any) {
    return swal(title, message, 'error');
  }

  showInfo(message: string, title = 'info') {
    return swal(title, message, 'info');
  }

  showWarning(message: string, title = 'Warning') {
    return swal(title, message, 'warning');
  }

  confirm(question) {
    return swal({
      title: 'AMT',
      type: 'warning',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: true,
      text: question
    });
  }

}
