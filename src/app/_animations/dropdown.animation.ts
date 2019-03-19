import {
  trigger,
  animate,
  transition,
  style,
  query,
  state
} from '@angular/animations';

export const dropdownAnimation = trigger('dropdownAnimation', [
  state(
    'open',
    style({
      transform: 'scale(1)',
      opacity: 1
    })
  ),
  state(
    'closed',
    style({
      transform: 'scale(0)',
      opacity: 0
    })
  ),
  transition('open => closed', [animate('0.3s')]),
  transition('closed => open', [animate('0.3s')])
]);
