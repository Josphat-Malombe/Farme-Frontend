<template>
  <footer class="footer" >
    <!-- Curved Divider -->
    <div class="footer-divider" ></div>

    <div class="footer-container" >
      <!-- Brand & Tagline -->
      <div class="footer-section">
        <div class="footer-logo">🌱<span>AgriPulse</span></div>
        <p class="tagline">AI‑Driven Agri‑Tech for the Next Generation of Farmers</p>
      </div>

      <!-- Quick Links -->
      <div class="footer-section">
        <h6>Explore</h6>
        <ul class="links">
          <li><a href="#">Home</a></li>
          <router-link to="\auth\register">Sign Up</router-link>
          <li><a href="#">Support</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Marketplace</a></li>
          <li><a href="#">Knowledge Hub</a></li>
          <li><a href="https://quantumripple.co.ke/">Parent Company</a></li>
          
        </ul>
      </div>

      <!-- Newsletter & Social -->
       <div class="footer-section glass-box">
        <h6>Stay Connected</h6>
        <form class="newsletter" @submit.prevent="subscribe">
          <input type="email" placeholder="Enter your email" v-model="email" required />
          <button type="submit">Subscribe</button>
        </form>
        <div class="social">
          <a href="#"><img src="@/assets/icons/facebook.jpg" alt="Facebook" /></a>
          <a href="#"><img src="@/assets/icons/x.png" alt="Twitter" /></a>
          <a href="#"><img src="@/assets/icons/whatsapp.png" alt="WhatsApp" /></a>
          <a href="#"><img src="@/assets/icons/youtube.png" alt="YouTube" /></a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      © 2025 <span>AgriPulse</span>. All rights reserved.
    </div>
    
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
  data() {
    return { email: "" };
  },
  methods: {
    subscribe() {
      alert(`Subscribed: ${this.email}`);
      this.email = "";
    }
  }
};
</script>

<style scoped>


.footer {
  background: linear-gradient(135deg, #0f172a, #1a1f35);
  color: #fff;
  position: relative;
  padding: 50px 20px 20px ;
  width: 102vw;
  overflow: hidden;
  margin-left: 13px; 
}

/* Curved Divider */
.footer-divider {
  position: absolute;
  top: -100px;
  width: 100vw;
  height: 100px;
  background: #0f172a;
  border-radius: 50% 50% 0 0;
  margin: 0;
}

/* Container */
.footer-container {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  max-width: 1200px;
  margin: auto;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}

/* Sections */
.footer-section h6 {
  font-size: 1.1rem;
  color: #00ff95;
  margin-bottom: 12px;
}

.footer-logo {
  font-size: 2rem;
  font-weight: bold;
  color: #00ff95;
  font-family: 'Orbitron', sans-serif;
  margin-bottom: 10px;
}

.tagline {
  font-size: 0.95rem;
  color: #ccc;
  line-height: 1.4;
}

.links {
  list-style: none;
  padding: 0;
}
.links li {
  margin: 8px 0;
}
.links a {
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.3s, text-shadow 0.3s;
}
.links a:hover {
  color: #00ff95;
  text-shadow: 0 0 10px #00ff95;
}

/* Newsletter */
.newsletter {
  display: flex;
  margin-bottom: 15px;
}
.newsletter input {
  flex: 1;
  padding: 10px;
  border: none;
  background: #1e293b;
  color: #fff;
  border-radius: 8px 0 0 8px;
}
.newsletter button {
  background: #00ff95;
  color: #000;
  padding: 10px 16px;
  border: none;
  border-radius: 0 8px 8px 0;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}
.newsletter button:hover {
  background: #00ffaa;
  transform: scale(1.1);
}

/* Social Icons */
.social {
  display: flex;
  gap: 16px;
}
.social img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  padding: 5px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.social img:hover {
  transform: scale(1.2);
  box-shadow: 0 0 15px #00ff95;
}

/* Footer bottom */
.footer-bottom {
  text-align: center;
  margin-top: 25px;
  font-size: 0.85rem;
  color: #aaa;
}
.footer-bottom span {
  color: #00ff95;
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>

