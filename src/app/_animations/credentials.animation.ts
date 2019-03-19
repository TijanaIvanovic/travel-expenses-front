import {
  trigger,
  animate,
  transition,
  style,
  query,
  state
} from '@angular/animations';

export const formAnimation = trigger('formAnimation', [
  state(
    'open',
    style({
      transform: 'scale(1)',
      height: '100%',
      opacity: 1
    })
  ),
  state(
    'closed',
    style({
      transform: 'scale(0)',
      height: '0',
      opacity: 0
    })
  ),
  transition('open => closed', [animate('0.4s ease-in')]),
  transition('closed => open', [animate('0.4s ease-out')])
]);

export const infoDimAnimation = trigger('infoDimAnimation', [
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
