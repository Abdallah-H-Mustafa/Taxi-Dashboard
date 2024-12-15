"use client";

import { IVRConfig } from '@/types/ivr';
import { TwiMLBuilder } from './twiml-builder';
import { useIVRStore } from '@/lib/stores/ivr-store';

export class IVRHandler {
  private config: IVRConfig;

  constructor(config: IVRConfig) {
    this.config = config;
  }

  handleIncomingCall() {
    const twiml = new TwiMLBuilder();
    
    return twiml
      .addGreeting(
        this.config.defaultGreeting,
        this.config.voice,
        this.config.language
      )
      .addMenu(this.config.actions[0])
      .build();
  }

  handleMenuAction(digit: string) {
    const action = this.config.actions[0].options?.[digit];
    if (!action) {
      return this.handleInvalidInput();
    }

    const twiml = new TwiMLBuilder();

    switch (action.action) {
      case 'booking':
        return twiml.addBookingFlow(this.config).build();
      case 'status':
        return this.handleTripStatus();
      case 'forward':
        return this.handleForward();
      default:
        return this.handleInvalidInput();
    }
  }

  private handleTripStatus() {
    const twiml = new TwiMLBuilder();
    return twiml
      .addGreeting('Please wait while I check your trip status', this.config.voice, this.config.language)
      .build();
  }

  private handleForward() {
    if (!this.config.forwardingNumbers.length) {
      return this.handleInvalidInput();
    }

    const twiml = new TwiMLBuilder();
    return twiml
      .addForward(this.config.forwardingNumbers[0])
      .build();
  }

  private handleInvalidInput() {
    const twiml = new TwiMLBuilder();
    return twiml
      .addGreeting('Invalid selection. Please try again.', this.config.voice, this.config.language)
      .addMenu(this.config.actions[0])
      .build();
  }
}