import { Destination } from './../_models/destination.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {
  destination: Destination = new Destination();
  destinations: Destination[] = [];

  constructor() {}
}
