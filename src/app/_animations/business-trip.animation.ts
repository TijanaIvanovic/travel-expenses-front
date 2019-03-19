import {
  trigger,
  animate,
  transition,
  style,
  query,
  state
} from '@angular/animations';

export const businessTripAnimation = trigger('businessTripAnimation', [
  state(
    'open',
    style({
      transform: 'scale(1) translate(-50%,-50%)',
      opacity: 1
    })
  ),
  state(
    'closed',
    style({
      transform: 'scale(0) translate(-50%,-50%)',
      opacity: 0
    })
  ),
  transition('open => closed', [animate('0.4s ease-in')]),
  transition('closed => open', [animate('0.4s ease-out')])
]);

export const newBusinessTripAnimation = trigger('newBusinessTripAnimation', [
  state(
    'open',
    style({
      transform: 'scale(1) translate(-50%,-50%)',
      opacity: 1
    })
  ),
  state(
    'closed',
    style({
      transform: 'scale(0) translate(-50%,-50%)',
      opacity: 0
    })
  ),
  transition('open => closed', [animate('0.4s ease-in')]),
  transition('closed => open', [animate('0.4s ease-out')])
]);


export const employeeAnimation = trigger('employeeAnimation', [
  state(
    'open',
    style({
      opacity: 0.3
    })
  ),
  state(
    'closed',
    style({
      opacity: 1
    })
  ),
  transition('open => closed', [animate('0.4s ease-in')]),
  transition('closed => open', [animate('0.4s ease-out')])
]);
