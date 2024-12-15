"use client";

// Browser-compatible Twilio client
class TwilioClient {
  private static instance: TwilioClient;
  private accountSid: string | null = null;
  private authToken: string | null = null;
  private initialized = false;

  private constructor() {}

  static getInstance(): TwilioClient {
    if (!TwilioClient.instance) {
      TwilioClient.instance = new TwilioClient();
    }
    return TwilioClient.instance;
  }

  initialize(accountSid: string, authToken: string) {
    this.accountSid = accountSid;
    this.authToken = authToken;
    this.initialized = true;
    localStorage.setItem('twilio_credentials', JSON.stringify({ accountSid, authToken }));
  }

  isInitialized(): boolean {
    if (!this.initialized) {
      const stored = localStorage.getItem('twilio_credentials');
      if (stored) {
        const { accountSid, authToken } = JSON.parse(stored);
        this.initialize(accountSid, authToken);
      }
    }
    return this.initialized;
  }

  async setupIVR(phoneNumber: string, config: any) {
    if (!this.isInitialized()) throw new Error('Twilio client not initialized');

    try {
      // In browser environment, we'll make API calls to our backend
      const response = await fetch('/api/twilio/setup-ivr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          config,
          accountSid: this.accountSid,
          authToken: this.authToken
        })
      });

      if (!response.ok) throw new Error('Failed to setup IVR');
      return true;
    } catch (error) {
      console.error('Error setting up IVR:', error);
      throw error;
    }
  }

  async getPhoneNumbers() {
    if (!this.isInitialized()) throw new Error('Twilio client not initialized');

    try {
      // In browser environment, we'll make API calls to our backend
      const response = await fetch('/api/twilio/phone-numbers', {
        headers: {
          'Authorization': `Basic ${btoa(`${this.accountSid}:${this.authToken}`)}`,
        }
      });

      if (!response.ok) throw new Error('Failed to fetch phone numbers');
      return await response.json();
    } catch (error) {
      console.error('Error fetching phone numbers:', error);
      throw error;
    }
  }
}

export const twilioClient = TwilioClient.getInstance();