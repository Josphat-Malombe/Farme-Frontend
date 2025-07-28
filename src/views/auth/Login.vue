

<template>
  <div class="container" >
    <div class="form-card">
      <div class="logo">🌱 <span>AgriPulse</span></div>
      

      <form @submit.prevent="login">
        <input
          v-model="username"
          type="text"
          placeholder="Phone Number"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        />

        <button type="submit" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="signup-text">
        Don't have an account?
        <router-link to="/auth/register">Register</router-link>
      </p>

      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { loginUser } from '@/services/AuthService'


export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      error: ''
    }
  },
  methods: {
    async login() {
      this.loading = true
      this.error = ''
      try {
        const payload = {
          phone_number: this.username,
          password: this.password
        }
        const response = await loginUser(payload)
        localStorage.setItem('access',  response.data.access);
        localStorage.setItem('refresh', response.data.refresh);

        this.$router.push({ name: 'home' })
      } catch (err) {
        this.error = err.response?.data?.detail || 'Invalid credentials'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* Full-page dark background */
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

/* Dark Glass Card */
.form-card {
  background: #0b1428;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  color: #fff;
  text-align: center;
}

/* Title and subtitle */
.form-card h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #f5f5f5;
}
.subtitle {
  font-size: 0.95rem;
  color: #bbb;
  margin-bottom: 20px;
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

/* Signup text */
.signup-text {
  margin-top: 20px;
  font-size: 0.95rem;
  color: #ccc;
}

.signup-text a {
  color: #00ff99;
  font-weight: bold;
  text-decoration: none;
}

.signup-text a:hover {
  text-decoration: underline;
}

/* Error message */
.error-msg {
  color: #ff4d4d;
  margin-top: 15px;
  font-size: 0.9rem;
}
.logo {
  font-size: 1.4rem;
  font-weight: bold;
  color: #00ff95;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 2px;
  animation: pulse 2s infinite;
}

/* Mobile responsive */
@media (max-width: 500px) {
  .form-card {
    padding: 20px;
  }
}
</style>
