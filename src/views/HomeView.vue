

<template>
  <div class="app-layout">
    <!-- MOBILE MENU TOGGLE -->
    <button class="hamburger" @click="toggleMenu">☰</button>

    <!-- LEFT SIDEBAR -->
    <aside :class="['sidebar-left', { open: isMenuOpen }]">
      <div class="logo">🌱 <span>AgriPulse</span></div>
      <nav class="menu">
        <button @click="currentView = 'chat'" :class="{active: currentView==='chat'}">💬 Chat</button>
        <button @click="currentView = 'speech'" :class="{active: currentView==='speech'}">🎤 Speech</button>
        <button @click="currentView = 'profile'" :class="{active: currentView==='profile'}">👤 Profile</button>
        <button @click="currentView = 'history'" :class="{active: currentView==='history'}">📚History</button>
        <button @click="currentView = 'weather'" :class="{active: currentView==='weather'}">☁️Weather</button>
        <button @click="logout">Log out</button>
      </nav>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="main-content">
      <component :is="currentViewComponent" :session-id="sessionId" @continue-session="continueSessionFromHistory" @session-ended="clearSession"/>
    </main>

    <!-- RIGHT SIDEBAR (PROFILE INFO) -->
<aside class="sidebar-right">
  <div class="profile-card">
    <div class="profile-header">
      <img
        :src="user.profile_picture_url || defaultImage"
        alt="Profile"
        class="profile-avatar"
      />
      <div class="profile-info">
        <h3>{{ user.full_name }}</h3>
        <p class="user-type">{{ user.user_type }} | {{ user.county_name }}</p>
      </div>
    </div>
    <div class="profile-details">
      <p class="email">{{ user.email }}</p>
      <p class="lang">Language: {{ user.language_preference }}</p>
    </div>
  </div>

  <!-- Weather Card -->
  <div class="weather-card" v-if="weather">
    <div v-if="loading">Loading weather...</div>
    <div v-else>
      
      <h4>{{ weather.location }}</h4>
      <p class="temp">{{ weather.temperature }}°C</p>
      <small>{{ weather.description }}</small>
    </div>
  </div>
</aside>


  </div>
</template>

<script>
import TextChat from './TextChat.vue'
import ChatHistory from '@/components/chat/ChatHistory.vue'
import SpeechText from './SpeechText.vue'
import ProfileView from './ProfileView.vue'
import WeatherView from './WeatherView.vue'

import { getProfile } from '@/services/profileService'
import { logoutUser } from '@/services/AuthService'
import { getWeather } from '@/services/WeatherService'

export default {
  components:{
    TextChat,
    ChatHistory,
    SpeechText,
    ProfileView,
    WeatherView,

  },
  data() {
    return {
      currentView: 'chat',
      isMenuOpen: false,
      user:{},
      sessionId: null,
      defautImage: "/default-profile.png",
      
    }
  },
  async mounted(){
    try{
      const res = await getProfile();
      this.user=res.data;
    }catch(err){
      console.error("Error fetching user",err)
    }
    try{
      const res = await getWeather();
      this.weather=res.data;
    }catch(err){
      console.error("Error fetching weather data",err)
    }
  },
  computed: {
    currentViewComponent() {
      const map = {
        chat: 'TextChat',
        speech: 'SpeechText',
        profile: 'ProfileView',
        history: 'ChatHistory',
        weather: 'WeatherView'
      }
      return map[this.currentView]
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
    },
    closeMenu(){
      this.isMenuOpen=false
    },
    logout() {
      logoutUser()
      
    },
    continueSessionFromHistory(sessionId){
      this.sessionId=sessionId
      this.currentView='chat'
    },
    clearSession(){
      this.sessionId=null
    }
  }
}
</script>

<style >
/* Global Reset */
* { margin: 0; padding: 0; box-sizing: border-box;  }

body {
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background: #0f0f0f;
  color: #fff;
  width:100vw;
 
  
  

}

.app-layout {
  display: grid;
  grid-template-columns: 240px 1fr 300px;
  min-height: 100vh;
}

/* Left Sidebar */
.sidebar-left {
  background: #0f172a;
 
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #333;
  transition: left 0.3s ease;
  z-index: 1000;
  left: -250px;
}

.logo {
  font-size: 1.4rem;
  font-weight: bold;
  color: #00ff95;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 2px;
  animation: pulse 2s infinite;
}

.menu button {
  display: block;
  width: 100%;
  background: none;
  border: none;
  color: white;
  text-align: left;
  padding: 12px;
  font-size: 1rem;
  margin-bottom: 10px;
  border-radius: 8px;
  transition: 0.3s;
  cursor: pointer;
  font-weight: bold;
}
.menu button:hover,
.menu button.active {
  background: wheat;
  color: black;
}

/* Main Content */
.main-content {
  padding: 30px;
  background: #121212;
 
}

/* Right Sidebar */
.sidebar-right {
  background: #0f172a;
  padding: 20px;
}

.profile-card {
  background-color: #00ff95; /* Soft mint green card */
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: left;
  font-family: 'Segoe UI', sans-serif;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #4CAF50;
}

.profile-info h3 {
  margin: 0;
  font-size: 1.2rem;
  color: black; /* Deep green */
}

.user-type {
  font-size: 0.9rem;
  color: #2E8B57; /* Muted green */
}

.profile-details {
  margin-top: 10px;
  font-size: 0.9rem;
  color: black;
}

.email {
  font-weight: bold;
}

.lang {
  color: rgb(45, 41, 41);
  font-style: italic;
}
.weather-card {
  background: linear-gradient(135deg, #d8f3dc, #b7e4c7);
  border-radius: 12px;
  padding: 12px;
  text-align: center;
}

.weather-icon {
  width: 40px;
  height: 40px;
}
.temp {
  font-size: 18px;
  font-weight: bold;
  color: #2d6a4f;
}


/* Hamburger for Mobile */
.hamburger {
  display: none;
  position: fixed;
  top: 17px;
  left: 17px;
  width:150px;
  height: 45px;
  background: rgb(33, 31, 31, 0.2);
  color: white;
  border: none;
  padding: 10px 14px;
  font-size: 1.5rem;
  border-radius: 0px;
  cursor: pointer;
  z-index: 1001;
}

/* RESPONSIVENESS */

/* Tablet */
@media (max-width: 1024px) {
  .app-layout {
    grid-template-columns: 80px 1fr;
  }
  .sidebar-right {
    display: none;
  }
  .sidebar-left {
    align-items: center;
  }
  .menu button {
    text-align: center;
    font-size: 1.2rem;
  }
}

/* Mobile */
@media (max-width: 768px) {

  body{
    position: auto;
  }


  .app-layout {
    grid-template-columns: 1fr;
  }
  .sidebar-left {
    position: fixed;
    top: 0;
    left: -250px;
    width: 220px;
    height: 100%;
    background: #0f172a;
    z-index: 1000;
    transition: left 0.3s ease;
  }
  .sidebar-left.open {
    left: 0;
  }
  .hamburger {
    display: block;
  }
}
</style>


