"use client";

import { IVRConfig, IVRAction } from '@/types/ivr';

export class TwiMLBuilder {
  private response: string[] = [];

  addGreeting(greeting: string, voice: string, language: string) {
    this.response.push(`<Say voice="${voice}" language="${language}">${greeting}</Say>`);
    return this;
  }

  addMenu(action: IVRAction) {
    this.response.push(`<Gather numDigits="1" action="/api/twilio/menu-action" method="POST">`);
    this.response.push(`<Say>${action.message}</Say>`);
    this.response.push('</Gather>');
    return this;
  }

  addBookingFlow(config: IVRConfig) {
    const { bookingFlow } = config;
    this.response.push(`<Gather input="speech dtmf" action="/api/twilio/booking" method="POST">`);
    this.response.push(`<Say>${bookingFlow.collectPickupFirst ? 
      bookingFlow.messages.pickupPrompt : 
      bookingFlow.messages.dropoffPrompt}</Say>`);
    this.response.push('</Gather>');
    return this;
  }

  addForward(phoneNumber: string) {
    this.response.push(`<Dial>${phoneNumber}</Dial>`);
    return this;
  }

  build() {
    return `<?xml version="1.0" encoding="UTF-8"?><Response>${this.response.join('')}</Response>`;
  }
}