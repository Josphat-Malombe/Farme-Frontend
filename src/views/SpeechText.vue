
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
        <div class="message-content">
          {{ msg.content }}
          <audio v-if="msg.audio" :src="msg.audio" controls></audio>
        </div>
      </div>
    </div>

    <!-- Fixed Input Bar -->
    <div class="input-bar">
      <div class="input-wrapper">
        <button
          @click="toggleRecording"
          :class="{ recording: isRecording }"
          :disabled="loading"
          class="record-btn"
        >
          {{ isRecording ? 'Stop Recording' : 'Start Recording' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { sendVoiceMessage, getHistory } from '../services/aiService';

export default {
  props: ['sessionId'],
  data() {
    return {
     
      messages: [],
      loading: false,
      isRecording: false,
      mediaRecorder: null,
      audioChunks: [],
    };
  },
  async mounted() {
    if (this.sessionId) {
      await this.loadSession(this.sessionId);
    }
  },
  methods: {
    async loadSession(sessionId) {
      try {
        const res = await getHistory(sessionId);
        this.messages = res.data;
        this.$nextTick(() => this.scrollToBottom());
      } catch (err) {
        console.log('Failed to load session messages!');
        this.messages.push({
          role: 'agent',
          content: 'Error: Could not load chat history.',
        });
      }
    },
    async toggleRecording() {
      if (!this.isRecording) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          this.mediaRecorder = new MediaRecorder(stream);
          this.audioChunks = [];
          this.mediaRecorder.ondataavailable = (event) => {
            this.audioChunks.push(event.data);
          };
          this.mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
            await this.sendVoiceMessage(audioBlob);
          };
          this.mediaRecorder.start();
          this.isRecording = true;
        } catch (err) {
          console.error('Error accessing microphone:', err);
          this.messages.push({
            role: 'agent',
            content: 'Error: Microphone access denied. Please allow microphone access.',
          });
          this.$nextTick(() => this.scrollToBottom());
        }
      } else {
        this.mediaRecorder.stop();
        this.isRecording = false;
      }
    },
    async sendVoiceMessage(audioBlob) {
      this.loading = true;
      try {
        const res = await sendVoiceMessage(this.sessionId ??null, audioBlob);
        this.messages.push({ role: 'user', content: res.data.transcription, audio: res.data.farmer_audio });
        this.messages.push({
          role: 'agent',
          content: res.data.ai_text,
          audio: res.data.ai_audio,
        });
        this.$nextTick(() => this.scrollToBottom());
      } catch (err) {
        console.error('Error sending voice message:', err);
        this.messages.push({
          role: 'user',
          content: 'Error: Could not process voice message.',
        });
        this.$nextTick(() => this.scrollToBottom());
      } finally {
        this.loading = false;
      }
    },
    scrollToBottom() {
      const box = this.$refs.messagesBox;
      if (box) {
        box.scrollTo({
          top: box.scrollHeight,
          behavior: 'smooth',
        });
      }
    },
  },
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
.chat-header {
  padding: 20px;
  background: linear-gradient(135deg, rgba(0, 31, 63, 0.8), rgba(0, 0, 0, 0.8));
  text-align: center;
  font-weight: 600;
  border-bottom: 1px solid #333;
  margin:-25px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 80px;
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

.message-content audio {
  margin-top: 8px;
  max-width: 100%;
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

.record-btn {
  flex: 1;
  background: #00ff99;
  border: none;
  border-radius: 24px;
  padding: 10px 12px;
  color: #000;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
}

.record-btn.recording {
  background: #ff4d4d;
}

.record-btn:hover {
  background: #00cc88;
  transform: scale(1.1);
}

.record-btn:active {
  transform: scale(0.95);
}

.record-btn:disabled {
  background: #555;
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
   .chat-container{
    width: 100vw;
    position: fixed;
    height: 100vh;
  }
  .message {
    max-width: 90%;
  }
  .record-btn {
    font-size: 0.95rem;
    padding: 8px 10px;
  }
  .input-bar {
    padding: 8px 12px;
  }
  .messages {
    padding-bottom: 60px;
  }
}
</style>
