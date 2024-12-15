import { useState, useEffect } from 'react';  
import { ScrollArea } from '@/components/ui/scroll-area';  
import { Input } from '@/components/ui/input';  
import { Button } from '@/components/ui/button';  
import { Badge } from '@/components/ui/badge';  
import { Mic, Send, Image, Paperclip } from 'lucide-react';  
import { useChatStore } from '@/lib/stores/chat-store';  
import { useVoiceRecorder } from '@/lib/hooks/use-voice-recorder';  
  
export function ChatMessages() {  
  const [message, setMessage] = useState('');  
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(null);  
  const [isRecording, setIsRecording] = useState(false);  
  const { messages, sendMessage } = useChatStore();  
  const { startRecording, stopRecording } = useVoiceRecorder();  
  
  const handleSend = async () => {  
   if (!message.trim() || !selectedRecipient) return;  
  
   try {  
    await sendMessage({  
      recipientId: selectedRecipient,  
      content: message,  
      type: 'text',  
    });  
    setMessage('');  
   } catch (error) {  
    console.error('Error sending message:', error);  
   }  
  };  
  
  const handleVoiceMessage = async () => {  
   if (isRecording) {  
    try {  
      const audioBlob = await stopRecording();  
      if (audioBlob && selectedRecipient) {  
       await sendMessage({  
        recipientId: selectedRecipient,  
        content: URL.createObjectURL(audioBlob),  
        type: 'voice',  
       });  
      }  
    } catch (error) {  
      console.error('Error sending voice message:', error);  
    } finally {  
      setIsRecording(false);  
    }  
   } else {  
    startRecording();  
    setIsRecording(true);  
   }  
  };  
  
  useEffect(() => {  
   return async () => {  
    if (isRecording) {  
      try {  
       await stopRecording();  
      } catch (error) {  
       console.error('Error stopping recording:', error);  
      }  
    }  
   };  
  }, [isRecording]);  
  
  return (  
   <div className="flex h-full">  
    {/* Recipients List */}  
    <div className="w-64 border-r">  
      <ScrollArea className="h-full">  
       <div className="p-4 space-y-4">  
        {/* Add recipient list here */}  
        <div  
          className={`p-3 rounded-lg cursor-pointer ${  
           selectedRecipient === 'driver1' ? 'bg-accent' : 'hover:bg-muted'  
          }`}  
          onClick={() => setSelectedRecipient('driver1')}  
        >  
          <div className="font-medium">John Driver</div>  
          <div className="text-sm text-muted-foreground">Online</div>  
        </div>  
       </div>  
      </ScrollArea>  
    </div>  
  
    {/* Chat Area */}  
    <div className="flex-1 flex flex-col">  
      {/* Messages */}  
      <ScrollArea className="flex-1 p-4">  
       <div className="space-y-4">  
        {messages.map((msg, i) => (  
          <div  
           key={i}  
           className={`flex ${  
            msg.senderId === 'me' ? 'justify-end' : 'justify-start'  
           }`}  
          >  
           <div  
            className={`max-w-[70%] rounded-lg p-3 ${  
              msg.senderId === 'me'  
               ? 'bg-primary text-primary-foreground'  
               : 'bg-muted'  
            }`}  
           >  
            {msg.type === 'text' ? (  
              <p>{msg.content}</p>  
            ) : msg.type === 'voice' ? (  
              <audio src={msg.content} controls className="w-full" />  
            ) : null}  
            <div className="text-xs mt-1 opacity-70">  
              {new Date(msg.timestamp).toLocaleTimeString()}  
            </div>  
           </div>  
          </div>  
        ))}  
       </div>  
      </ScrollArea>  
  
      {/* Input Area */}  
      <div className="p-4 border-t">  
       <div className="flex items-center gap-2">  
        <Button variant="ghost" size="icon">  
          <Image className="h-5 w-5" />  
        </Button>  
        <Button variant="ghost" size="icon">  
          <Paperclip className="h-5 w-5" />  
        </Button>  
        <Input  
          placeholder="Type a message..."  
          value={message}  
          onChange={(e) => setMessage(e.target.value)}  
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}  
        />  
        <Button  
          variant="ghost"  
          size="icon"  
          className={isRecording ? "text-red-500" : ""}  
          onClick={handleVoiceMessage}  
        >  
          <Mic className="h-5 w-5" />  
        </Button>  
        <Button onClick={handleSend}>  
          <Send className="h-5 w-5" />  
        </Button>  
       </div>  
      </div>  
    </div>  
   </div>  
  );  
}
