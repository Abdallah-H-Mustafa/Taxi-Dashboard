export type IVRVoice = 'alice' | 'man' | 'woman';

export interface IVRAction {
  type: 'menu' | 'booking' | 'status' | 'forward';
  message: string;
  options?: {
    [key: string]: {
      action: string;
      value?: string;
    };
  };
}

export interface IVRConfig {
  language: string;
  voice: IVRVoice;
  defaultGreeting: string;
  actions: IVRAction[];
  bookingFlow: {
    enabled: boolean;
    confirmationRequired: boolean;
    collectPickupFirst: boolean;
    messages: {
      pickupPrompt: string;
      dropoffPrompt: string;
      confirmationPrompt: string;
      etaMessage: string;
    };
  };
  forwardingNumbers: string[];
  operatingHours: {
    enabled: boolean;
    timezone: string;
    schedule: {
      [key: string]: {
        start: string;
        end: string;
      };
    };
  };
}