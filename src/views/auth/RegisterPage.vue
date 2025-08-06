
<script>
import { registerUser } from '@/services/AuthService';
import api from '@/services/api'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      phone: '',
      county: '',
      constituency: '',
      ward: '',
      language: '',
      counties: [],
      constituencies: [],
      wards: [],
      languages: ['English','Swahili','Kamba'],
      error: '',
    };
  },
  async mounted(){
    try{
      const response=await api.get('/counties/');
      this.counties=response.data
    }catch (error){
      console.error('Failed to load counties')
    }
  },
  methods: {
     async onCountyChange() {
      this.constituency = '';
      this.ward = '';
      try {
        const response = await api.get(`/constituencies/?county=${this.county}`);
        this.constituencies = response.data;
        this.wards = [];
      } catch (error) {
        console.error('Failed to load constituencies', error);
      }
    },
    async onConstituencyChange() {
      this.ward = '';
      try {
        const response = await api.get(`/wards/?constituency=${this.constituency}`);
        this.wards = response.data;
      } catch (error) {
        console.error('Failed to load wards', error);
      }
    },
    async register() {
      try {
         const payload = {
             full_name: this.name,
             email: this.email,
             phone_number: this.phone,
             password: this.password,
             county: this.county,
             constituency: this.constituency,
             ward: this.ward,
             language_preference: this.language
         };

         const response = await registerUser(payload);

         if (response.status === 201 || response.status === 200) {
            alert('Registration successful!');
            this.$router.push({ name: 'login' });
        } else {
             alert('Registration failed!');
             console.error('Unexpected response:', response);
           }
        } 
        catch (error) {
         console.error('Error during registration:', error);

    
           if (error.response && error.response.data) {
              const errorData = error.response.data;

          if (typeof errorData === 'string') {
            this.error = errorData;
           } else if (typeof errorData === 'object') {
        
        const firstErrorKey = Object.keys(errorData)[0];
        const firstError = errorData[firstErrorKey];
        this.error = Array.isArray(firstError) ? firstError[0] : firstError;
      } else {
        this.error = 'Registration failed. Please try again.';
      }
    } else {
      this.error = 'Unable to connect to server. Please check your connection.';
      }
    }
  },
 }
}
</script>

<template>
  <div class="container">
    <div class="form-card">
      <div class="logo">🌱 AgriPulse</div>
      <h2>Create Account</h2>
      <form @submit.prevent="register">
        <input v-model="name" type="text" placeholder="Full Name" required>
        <input v-model="email" type="email" placeholder="Email Address" required>
        <input v-model="phone" type="tel" placeholder="Phone Number" required>

        <div class="three-cols">
  <select v-model="county" @change="onCountyChange" class="styled-select">
    <option value="">Select County</option>
    <option v-for="c in counties" :key="c.id" :value="c.id">{{ c.name }}</option>
  </select>

  <select v-model="constituency" @change="onConstituencyChange" class="styled-select">
    <option value="">Select Constituency</option>
    <option v-for="cc in constituencies" :key="cc.id" :value="cc.id">{{ cc.name }}</option>
  </select>

  <select v-model="ward" class="styled-select">
    <option value="">Select Ward</option>
    <option v-for="w in wards" :key="w.id" :value="w.id">{{ w.name }}</option>
  </select>
</div>

<select v-model="language" class="styled-select full-width">
  <option value="">Select Language</option>
  <option v-for="lang in languages" :key="lang" :value="lang">{{ lang }}</option>
</select>


        
        <input v-model="password" type="password" placeholder="Password" required>

        <button type="submit">Register</button>
      </form>
      <p class="login-text">
        Already have an account?
        <router-link to="/auth/login">Login</router-link>
      </p>
      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
    

  </div>
</template>

<style scoped>
/* Full-screen dark background with subtle gradient */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a, #0f172a);
  font-family: 'Segoe UI', Tahoma, sans-serif;
  padding: 20px;
  margin-left: 20px;
}

/* Elegant dark glass card */
.form-card {
  background: #0b1428;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 30px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  color: #fff;
  text-align: center;
}

/* Heading */
.form-card h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 25px;
  color: #f5f5f5;
}

/* Inputs */
.form-card input {
  width: 100%;
  padding: 14px;
  margin: 10px 0;
  border: none;
  border-radius: 8px;
  background: #242424;
  color: #fff;
  font-size: 1rem;
  transition: 0.3s ease;
}

.form-card input::placeholder {
  color: #aaa;
}

.form-card input:focus {
  outline: none;
  background: #2f2f2f;
  box-shadow: 0 0 8px #00ff99;
}

/* 3-column layout for location fields */
.three-cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.logo {
  font-size: 1.4rem;
  font-weight: bold;
  color: #00ff95;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 2px;
  animation: pulse 2s infinite;
}
/* Error message */
.error-msg {
  color: #ff4d4d;
  margin-top: 15px;
  font-size: 0.9rem;
}

/* Button */
button {
  width: 100%;
  padding: 14px;
  margin-top: 15px;
  background: linear-gradient(90deg, #00ff99, #00cc88);
  color: #000;
  font-size: 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 255, 153, 0.4);
}

/* Login link */
.login-text {
  margin-top: 20px;
  font-size: 0.95rem;
  color: #ccc;
}

.login-text a {
  color: #00ff99;
  font-weight: bold;
  text-decoration: none;
}

.login-text a:hover {
  text-decoration: underline;
}

.styled-select {
  width: 100%;
  padding: 14px;
  margin: 10px 0;
  border: none;
  color: #ccc;
  border-radius: 8px;
  background: #242424;
  font-size: 0.95rem;
  appearance: none; /* Removes default arrow */
  transition: 0.3s ease;
  cursor: pointer;
}

.styled-select:focus {
  outline: none;
  background: #2f2f2f;
  box-shadow: 0 0 8px #00ff99;
}

.styled-select option {
  background: #0b1428;
  color: #fff;
}

.full-width {
  width: 100%;
}

.three-cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

/* Mobile responsiveness */
@media (max-width: 500px) {
  .three-cols {
    grid-template-columns: 1fr;
  }
}

</style>
