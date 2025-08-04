<template>
   
  <div class="chat-container">
    <!-- Chat Header -->
    <div class="chat-header">
      <h3>AI Assistant</h3> 
      
    </div>
   
    


    <!-- Scrollable Messages -->
    <div class="messages" ref="messagesBox">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['message', msg.role]"
      >
        <div class="message-content">{{ msg.content }}</div>
      </div>
    </div>

    <!-- Fixed Input Bar -->
    <form @submit.prevent="sendChat" class="input-bar">
      <div class="input-wrapper">
        <textarea
          v-model="newMessage"
          placeholder="Type your message..."
          class="chat-input"
          rows="1"
          @input="autoResize"
        ></textarea>
        <button type="submit" :disabled="loading" class="send-btn">
          <svg
            v-if="!loading"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
          <span v-if="loading" class="loading-dots">...</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { sendMessage,  getHistory, createSession } from '../services/aiService';
//import ChatHistory from '@/components/chat/ChatHistory.vue';

export default {
  props: {
    sessionId: {
      type: String,
      default: null
    }
  },
  data() {
    return { 
      internalSessionId: null,
      messages: [],
      newMessage: '',
      loading: false
    };
  },
  watch:{
    sessionId:{
      immediate:true,
      handler(newSessionId){
        if (newSessionId){
          this.internalSessionId=newSessionId
          this.loadSession(newSessionId)
        }else{
          this.messages=[]
          this.internalSessionId=null
        }
      }
    }
  },
  methods: {
    async createSession(){
      try{
        const res=await createSession()
        this.internalSessionId=res.data.id;
        console.log("new session created",this.internalSessionId)
      }
      catch (err) {
        console.log("failed to create session", err)

      }
    },
    async loadSession(sessionId){
      
      try{
        const res=await getHistory(sessionId)
        this.messages=res.data
        this.$nextTick(() => this.scrollToBottom());
      }catch(err){
        console.log('failed to load session messages!sorrey!!')
      }

    },
    async sendChat() {
      if (!this.newMessage.trim()) return;

      const question = this.newMessage;
      this.messages.push({ role: 'user', content: question });
      this.newMessage = '';
      this.loading = true;
      this.$nextTick(() => this.scrollToBottom());

      try {
        if(!this.internalSessionId){
          const res=await createSession();
          this.internalSessionId=res.data.id
          this.$emit('new-session', this.internalSessionId)
          
        }
       
        const res = await sendMessage(this.internalSessionId, question);
        this.messages.push({ role: 'agent', content: res.data.response });
        this.$nextTick(() => this.scrollToBottom());
      } catch (err) {
        console.error('Chat API error:', err.response?.status, err.response?.data);
        this.messages.push({ role: 'agent', content: 'Error: Could not reach AI.' });
      } finally {
        this.loading = false;
      }
    },
    scrollToBottom() {
      const box = this.$refs.messagesBox;
      if (box) {
        box.scrollTo({
          top: box.scrollHeight,
          behavior: 'smooth'
        });
      }
    },
    autoResize(e) {
      const el = e.target;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    },
    endSession(){
      this.$emit('session-ended')
    }
  }
};
</script>

<style scoped>

.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #161c29;
  color: #fff;
  margin-left: -20px;
  margin-right: -20px;
}

/* Header */
.chat-header {
  padding: 20px;
  background: linear-gradient(135deg, rgba(0, 31, 63, 0.8), rgba(0, 0, 0, 0.8));
  text-align: center;
  font-weight: 600;
  border-bottom: 1px solid #333;
  margin:-25px;
}

/* Messages Area */
.messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 80px; /* Space for sticky input bar */
  scroll-behavior: smooth;
}
.messages::-webkit-scrollbar {
  width: 6px;
}
.messages::-webkit-scrollbar-track {
  background: #1a1a1a;
}
.messages::-webkit-scrollbar-thumb {
  background: #00ff99;
  border-radius: 3px;
}
.message {
  max-width: 80%;
  padding: 0;
  border-radius: 12px;
  font-size: 1rem;
  line-height: 1.5;
}
.message-content {
  padding: 12px 14px;
  border-radius: 12px;
  max-height: 200px;
  overflow-y: auto;
  word-break: break-word;
}
.message-content::-webkit-scrollbar {
  width: 4px;
}
.message-content::-webkit-scrollbar-track {
  background: transparent;
}
.message-content::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 2px;
}
.user .message-content {
  background: #00ff99;
  color: #000;
}
.agent .message-content {
  background: #2a2a2a;
  color: #fff;
}
.user {
  align-self: flex-end;
}
.agent {
  align-self: flex-start;
}

/* Input Bar (Sticky at bottom) */
.input-bar {
  background: #181818;
  border-top: 1px solid #333;
  padding: 10px 16px;
  position: sticky;
  bottom: 0;
  z-index: 10;
}
.input-wrapper {
  display: flex;
  align-items: center;
  background: #1e1e1e;
  border-radius: 24px;
  padding: 6px 8px 6px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
}
.input-wrapper:focus-within {
  box-shadow: 0 2px 12px rgba(0, 255, 153, 0.4);
}
.chat-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 10px 12px;
  border-radius: 24px;
  color: #fff;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  resize: none;
  max-height: 120px;
  overflow-y: auto;
  line-height: 1.5;
}
.chat-input::-webkit-scrollbar {
  width: 4px;
}
.chat-input::-webkit-scrollbar-track {
  background: transparent;
}
.chat-input::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 2px;
}
.chat-input::placeholder {
  color: #666;
  opacity: 1;
}
.chat-input:focus {
  outline: none;
}
.send-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #00ff99;
  border: none;
  border-radius: 50%;
  color: #000;
  cursor: pointer;
  transition: all 0.2s ease;
}
.send-btn:hover {
  background: #00cc88;
  transform: scale(1.1);
}
.send-btn:active {
  transform: scale(0.95);
}
.send-btn:disabled {
  background: #555;
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}
.loading-dots {
  font-size: 0.9rem;
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  body{
    position: fixed;
  }
  .chat-container{
    width: 100vw;
    position: fixed;
    height: 100vh;
  }
  .chat-header{
    margin: -25px;
  }
  .message {
    max-width: 90%;
  }
  .chat-input {
    font-size: 0.95rem;
    padding: 8px 10px;
  }
  .send-btn {
    width: 32px;
    height: 32px;
  }
  .input-bar {
    padding: 8px 12px;
  }
  .messages {
    padding-bottom: 60px; /* Adjust for smaller screens */
  }
}
</style>