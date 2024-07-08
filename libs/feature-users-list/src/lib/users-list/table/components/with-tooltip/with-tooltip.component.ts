import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { PolymorpheusOutletComponent } from '@shared/ui-polymorpheus-outlet';
import {
  createPolymorpheusComponent,
  partial,
  PolymorpheusContent,
  WithPolymorpheusContent,
} from '@shared/util-polymorpheus-content';

export type TooltipDirection = Extract<TooltipPosition, 'before' | 'after'>;

@Component({
  selector: 'with-tooltip',
  standalone: true,
  imports: [
    MatTooltipModule,
    PolymorpheusOutletComponent,
    MatIconModule,
    MatButtonModule,
  ],
  styleUrl: './with-tooltip.component.scss',
  templateUrl: './with-tooltip.component.html',
})
export class WithTooltipComponent<T> implements WithPolymorpheusContent<T> {
  public readonly content = input.required<PolymorpheusContent<T>>();
  public readonly text = input.required<string>();
  public readonly position = input<
    TooltipPosition,
    TooltipPosition | undefined
  >('above', {
    transform: (input) => input ?? 'above',
  });
  public readonly icon = input<string, string | undefined>('info', {
    transform: (input) => input ?? 'info',
  });
  public readonly direction = input<
    TooltipDirection,
    TooltipDirection | undefined
  >('before', {
    transform: (input) => input ?? 'before',
  });
}

export const createWithTooltipComponent =
  createPolymorpheusComponent(WithTooltipComponent);
export const createWithTooltipComponentPartial = partial(
  createWithTooltipComponent
);
