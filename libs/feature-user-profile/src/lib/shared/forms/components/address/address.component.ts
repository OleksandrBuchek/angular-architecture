/* eslint-disable @angular-eslint/component-selector */
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormFieldNameDirective,
  FormFieldWrapperComponent,
  FormGroupFacade,
  provideFormGroup,
} from '@shared/ui-polymorpheus-forms';
import { AddressForm, getAddressFormConfig } from './forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'address',
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldWrapperComponent, AsyncPipe, FormFieldNameDirective],
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideFormGroup(getAddressFormConfig)],
})
export class AddressComponent {
  readonly facade = inject<FormGroupFacade<AddressForm>>(FormGroupFacade);
}
