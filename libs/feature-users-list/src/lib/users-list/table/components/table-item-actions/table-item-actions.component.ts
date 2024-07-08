import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {
  createPolymorpheusComponent,
  partial,
} from '@shared/util-polymorpheus-content';
import { UIOption } from '@shared/util-types';

@Component({
  selector: 'table-item-actions',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './table-item-actions.component.html',
  styleUrl: './table-item-actions.component.scss',
})
export class TableItemActionsComponent<T = any> {
  public readonly items = input.required<
    Array<UIOption<T>>,
    Array<UIOption<T>> | undefined
  >({
    transform: (input) => input ?? [],
  });

  public readonly label = input.required<string>();

  public readonly onSelected = output<T>();
}

export const createTableItemActionsComponent = createPolymorpheusComponent(
  TableItemActionsComponent
);
export const createcreateTableItemActionsComponentPartial = partial(
  createTableItemActionsComponent
);
