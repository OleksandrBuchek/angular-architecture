import { InjectionToken, Signal } from '@angular/core';

export const POLYMORPHEUS_CONTEXT = new InjectionToken<Record<string, Signal<any>>>('POLYMORPHEUS_CONTEXT');
