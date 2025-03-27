import { FormElement } from "./form-element.model";


/**
 * Inteface representing the data for the template dialog component.
 */
export interface DialogData {
  title: string;
  messages: string[];
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  formElements?: FormElement[];
}
