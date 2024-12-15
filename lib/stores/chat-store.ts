"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChatMessage {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  type: 'text' | 'voice' | 'image';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatStore {
  messages: ChatMessage[];
  sendMessage: (message: { recipientId: string; content: string; type: string }) => void;
  markAsRead: (messageId: string) => void;
  deleteMessage: (messageId: string) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: [],
      sendMessage: (message) => set((state) => ({
        messages: [...state.messages, {
          id: crypto.randomUUID(),
          senderId: 'me',
          recipientId: message.recipientId,
          content: message.content,
          type: message.type as 'text' | 'voice' | 'image',
          timestamp: new Date().toISOString(),
          status: 'sent'
        }]
      })),
      markAsRead: (messageId) => set((state) => ({
        messages: state.messages.map(msg =>
          msg.id === messageId ? { ...msg, status: 'read' } : msg
        )
      })),
      deleteMessage: (messageId) => set((state) => ({
        messages: state.messages.filter(msg => msg.id !== messageId)
      }))
    }),
    {
      name: 'chat-storage',
      version: 1,
    }
  )
);