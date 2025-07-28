<template>
  <div class="session-list-container">
    <h3 class="session-list-header">
      <i class="fas fa-history session-list-icon"></i> Chat History
    </h3>
    <ul class="session-items">
      <li
        v-for="session in sessions"
        :key="session.id"
        class="session-item"
      >
        <div class="session-info">
          <span class="session-title">{{ session.title }}</span>
          <span class="session-date">{{ formatDate(session.created_at) }}</span>
        </div>
        <div class="session-actions">
          <button @click="continueSession(session.id)" class="action-button continue-button">
            <i class="fas fa-play"></i> Continue
          </button>
          <button @click="deleteSession(session.id)" class="action-button delete-button">
            <i class="fas fa-trash-alt"></i> Delete
          </button>
        </div>
      </li>
      <li v-if="sessions.length === 0" class="no-sessions-message">
        No chat sessions found. Start a new conversation!
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/services/api'; // Ensure this path is correct for your project

export default {
  name: 'SessionList',
  data() {
    return {
      sessions: []
    };
  },
  async mounted() {
    await this.fetchSessions();
  },
  methods: {
    async fetchSessions() {
      try {
        const res = await api.get('/display/session/');
        
        this.sessions = res.data; 
      } catch (err) {
        console.error('Error loading sessions:', err);
        // Implement user-friendly error display here (e.g., a toast notification)
      }
    },
    continueSession(sessionId) {
      this.$router.push({name:'chat',params:{ sessionId}});
    },
    async deleteSession(sessionId) {
      if (confirm('Are you sure you want to delete this session?')) {
        try {
          await api.delete(`/display/session/${sessionId}`);
          this.sessions = this.sessions.filter(session => session.id !== sessionId);
          console.log(`Session ${sessionId} deleted.`); // For debugging
          // Optionally, emit an event or show a success message
        } catch (err) {
          console.error(`Error deleting session ${sessionId}:`, err);
          // Implement user-friendly error display here
        }
      }
    },
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      try {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      } catch (e) {
        console.error("Invalid date string:", dateString, e);
        return 'Invalid Date';
      }
    }
  }
};
</script>

<style scoped>
/* Existing styles from previous version */
.session-list-container {
  padding: 20px;
  background-color: #282c34; /* Darker background for modern feel */
  color: #e0e0e0; /* Light grey text for contrast */
  border-radius: 8px; /* Slightly rounded corners */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3); /* Soft shadow for depth */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern font */
}

.session-list-header {
  font-size: 1.8em; /* Larger, more prominent heading */
  color: #00ff95; 
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1); /* Subtle separator */
  padding-bottom: 15px;
}

.session-list-icon {
  margin-right: 10px;
  color: #00ff95; /* Icon color matches header */
}

.session-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.session-item {
  display: flex;
  justify-content: space-between; /* Distribute content and actions */
  align-items: center;
  padding: 12px 15px;
  margin-bottom: 8px;
  background-color: #3a3f47; /* Slightly lighter background for each item */
  border-radius: 5px;
  /* Removed cursor: pointer; from here as the entire item is no longer clickable for navigation */
  transition: background-color 0.2s ease, transform 0.2s ease; /* Smooth transitions */
}

.session-item:hover {
  background-color: #4a515c; /* Darker on hover */
  transform: translateY(-2px); /* Slight lift effect */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); /* Subtle hover shadow */
}

.session-item:active {
  background-color: #5a626c; /* Even darker on click */
  transform: translateY(0); /* Remove lift on click */
}

.session-info {
  display: flex;
  flex-direction: column; /* Stack title and date */
  flex-grow: 1; /* Allow info to take available space */
  margin-right: 15px; /* Space between info and buttons */
  overflow: hidden; /* Prevent text overflow */
}

.session-title {
  font-weight: 500;
  color: #f8f8f2; /* Brighter text for titles */
  white-space: nowrap; /* Prevent title from wrapping */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Add ellipsis for long titles */
  margin-bottom: 4px; /* Space between title and date */
}

.session-date {
  
  font-size: 0.85em;
  color: #9da5b4; 
}

.session-actions {
  display: flex;
  gap: 10px; /* Space between buttons */
  flex-shrink: 0; /* Prevent actions from shrinking */
}

.action-button {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 5px; /* Space between icon and text */
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.action-button i {
  font-size: 0.9em; /* Adjust icon size */
}

.continue-button {
  background-color: #00ff95; /* Accent color for continue */
  color: #282c34; /* Dark text for contrast */
}

.continue-button:hover {
  background-color: #4dc2ea; /* Slightly darker blue on hover */
  transform: translateY(-1px);
}

.continue-button:active {
  background-color: #3aa6d2;
  transform: translateY(0);
}

.delete-button {
  background-color: #dc3545; /* Red for delete */
  color: #fff;
}

.delete-button:hover {
  background-color: #c82333; /* Darker red on hover */
  transform: translateY(-1px);
}

.delete-button:active {
  background-color: #b01c2a;
  transform: translateY(0);
}

.no-sessions-message {
  text-align: center;
  color: #9da5b4;
  padding: 20px;
  font-style: italic;
}

@media (max-width: 768px) {
  .session-list-container{
    width: 100vw;
    height: 100vh;
  }
}
</style>