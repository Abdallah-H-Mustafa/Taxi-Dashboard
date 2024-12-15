"use client";

import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface Caller {
  name: string;
  phone: string;
  reason?: string;
}

export function useVoIP() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [currentCaller, setCurrentCaller] = useState<Caller | undefined>();

  // Simulate incoming call
  const simulateIncomingCall = useCallback((caller: Caller) => {
    setCurrentCaller(caller);
    setIsCallActive(true);
    // Play ringtone
    const audio = new Audio('/sounds/ringtone.mp3');
    audio.loop = true;
    audio.play().catch(() => {
      // Handle autoplay restrictions
      console.log('Autoplay prevented');
    });
    
    // Show notification
    toast.info(`Incoming call from ${caller.name}`, {
      duration: 10000,
      action: {
        label: "Answer",
        onClick: () => setIsCallActive(true)
      }
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const endCall = useCallback(() => {
    setIsCallActive(false);
    setCurrentCaller(undefined);
  }, []);

  return {
    isCallActive,
    currentCaller,
    simulateIncomingCall,
    endCall,
    setIsCallActive
  };
}