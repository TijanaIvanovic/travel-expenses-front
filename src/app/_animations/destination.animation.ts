import {
  trigger,
  animate,
  transition,
  style,
  query,
  state
} from '@angular/animations';

export const newDestinationAnimation = trigger('newDestinationAnimation', [
  state(
    'open',
    style({
      width: '100%',
      opacity: 1
    })
  ),
  state(
    'closed',
    style({
      width: '0',
      opacity: 0
    })
  ),
  transition('open => closed', [animate('0.4s')]),
  transition('closed => open', [animate('0.4s')])
]);

export const destinationAnimation = trigger('destinationAnimation', [
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

export const destinationDimAnimation = trigger('destinationDimAnimation', [
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
