<template>
  <div class="landing-page">

    <section class="hero">
      <div class="hero-content">
        <h1>Empowering African Farmers with AI & Smart Agri‑Tech</h1>
        <p>Your smart assistant for better yields, weather insights, and modern farming tips.</p>
        <p><i>From soil health to market insights—real‑time, voice‑driven, and future‑ready.</i></p>
        <button class="cta-btn" @click="goToRegister" style="width: 40%;">Get Started</button>
      </div>
    </section>

     <section class="why-farme" style="width:100vw;">
      <h4 class="section-title">Why AgriPulse?</h4>
      <div class="why-scroll">
        <div class="why-card">
          <img src="@/assets/aiicon.jpg" alt="AI Crop Advisor" />
          <h5>AI Crop Advisor</h5>
          <p>Get personalized crop recommendations and management tips powered by AI.</p>
        </div>
        <div class="why-card">
          <img src="@/assets/icons/climate.png" alt="Climate‑Smart Forecasts" />
          <h5>Climate‑Smart Forecasts</h5>
          <p>Stay ahead of the weather with forecasts tailored to your farm's needs.</p>
        </div>
        <div class="why-card">
          <img src="@/assets/icons/pest.jpg" alt="Pest & Disease Detection" />
          <h5>Pest & Disease Detection</h5>
          <p>Identify and manage pests and diseases quickly with our detection tools.</p>
        </div>
        <div class="why-card">
          <img src="@/assets/icons/micro.png" alt="Voice + Local Languages" />
          <h5>Voice + Local Languages</h5>
          <p>Access all features easily with voice commands and support for local languages.</p>
        </div>
        <div class="why-card">
          <img src="@/assets/icons/market.png" alt="Direct Market Access" />
          <h5>Direct Market Access</h5>
          <p>Connect directly with buyers and sellers to get the best prices for your produce.</p>
        </div>
      </div>
    </section>

    <section class="core-platform" style="width: 100vw;">
    <h4 class="section-title">Knowledge is Immense Power!</h4>

    <!-- AI Tools Hub -->
    <div class="feature-block reverse">
      <div class="feature-image">
        <img src="@/assets/icons/ai.jpg" alt="AI Tools Hub" />
      </div>
      <div class="feature-text">
        <h5>AI Tools Hub</h5>
        <ul>
          <li><strong>Inquiries:</strong>Use your language of choice to get answers to any question</li>
          <li><strong>Advice:</strong>Get agricultural advice from our AI agents in any language</li>
          <li><strong>Disease Detector:</strong> Upload a photo of your crop for instant disease diagnosis.</li>
          <li><strong>Soil Analysis:</strong> Detailed soil health reports using satellite and sensor data.</li>
          <li><strong>Yield Predictions:</strong> Machine‑learning forecasts of your crop yields.</li>
        </ul>
        <router-link to="\auth\register" class="learn-more">Learn More →</router-link>
      </div>
    </div>

    <!-- Farmer Marketplace -->
    <div class="feature-block">
      <div class="feature-image">
        <img src="@/assets/icons/market.jpg" alt="Farmer Marketplace" />
      </div>
      <div class="feature-text">
        <h5>Farmer Marketplace</h5>
        <ul>
          <li><strong>Buy Inputs:</strong> Seeds, fertilizers, and more from trusted suppliers.</li>
          <li><strong>Sell Harvest:</strong> Compare real‑time prices to maximize profit.</li>
          <li><strong>Logistics:</strong> Arrange pickup and delivery seamlessly.</li>
        </ul>
        <router-link to="\auth\register" class="learn-more">Learn More →</router-link>
      </div>
    </div>

    <!-- Knowledge Hub -->
    <div class="feature-block reverse">
      <div class="feature-image">
        <img src="@/assets/icons/know.jpg" alt="Knowledge Hub" />
      </div>
      <div class="feature-text">
        <h5>Knowledge Hub</h5>
        <ul>
          <li><strong>Expert Tutorials:</strong> Video and text guides on best practices.</li>
          <li><strong>Peer Forum:</strong> Ask questions and share experiences with fellow farmers.</li>
          <li><strong>Localized Guides:</strong> Word‑specific farming manuals for your region.</li>
        </ul>
        <router-link to="\auth\register" class="learn-more">Learn More →</router-link>
        
      </div>
    </div>

    <div class="feature-block">
      <div class="feature-image">
        <img src="@/assets/icons/weather.webp" alt="Weather & Alerts" />
      </div>
      <div class="feature-text">
        <h5>Weather & Alerts</h5>
        <ul>
          <li><strong>Current Conditions:</strong> See real-time weather data for your farm's location.</li>
          <li><strong>Forecasts:</strong> Get accurate weather predictions for the next 7 days.</li>
          <li><strong>Alerts:</strong> Receive notifications for severe weather events that could affect your crops.</li>
        </ul>
        <router-link to="\auth\register" class="learn-more">Learn More →</router-link>
      </div>
    </div>

    <button class="cta-btn" style="width: 40%;" @click="goToRegister">Get Started</button>

  </section>

    <section class="roadmap" style="width: 100vw;">
    <h4 class="section-title">Coming Soon: Next‑Gen Farming</h4>
    <div class="timeline">
      <div v-for="(item, i) in roadmap" :key="i" :class="['timeline-item', i % 2 === 0 ? 'left' : 'right']">
        <div class="node">
          <div class="pulse"></div>
          <img :src="item.icon" alt="" />
        </div>
        <div class="card">
          <span class="date">{{ item.quarter }}</span>
          <h5>{{ item.title }}</h5>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </div>
    <button class="cta-btn" style="width: 40%;" @click="goToRegister">Join Us</button>
  </section>

  <section class="testimonials" style="width: 100vw;">
    <h4 class="section-title">Hear from Our Farmers</h4>
    <div class="testimonials-grid">
      <div class="testimonial-card" v-for="(t, i) in testimonials" :key="i">
        <img :src="t.photo" alt="" class="photo" />
        <h5>{{ t.name }}</h5>
        <div class="rating">
          <span v-for="n in 5" :key="n" class="star">★</span>
        </div>
        <p class="quote">“{{ t.quote }}”</p>
      </div>
    </div>
    <div class="stats-bar">
      <div class="stat"><strong>1k+</strong> Farmers</div>
      <div class="stat"><strong>8+</strong> Regions</div>
      <div class="stat"><strong>99%</strong> Satisfaction</div>
    </div>
  </section>

  <section class="cta-section" style="width: 100vw; margin-bottom: -30px;">
    <div class="cta-overlay"></div>
    <div class="cta-content">
      <h2>Ready to Farm Smarter? Join AgriPulse Today.</h2>
      <div class="cta-buttons">
        <button class="btn-primary" @click="goToRegister">Sign Up Free</button>
        <button class="btn-secondary" @click="goToRegister">Contact Sales</button>
      </div>
    </div>
  </section>

  </div>
</template>

<script>



export default {
  name: "LandingPage",

  data() {
    return {
      roadmap: [
        {
          quarter: "Q1 ’26",
          title: "Drone Mapping & NDVI Analytics",
          desc: "Get detailed aerial views and vegetation health analytics of your farm.",
          icon: require("@/assets/icons/drone.jpg")
        },
        {
          quarter: "Q2 ’26",
          title: "Automated Irrigation Control",
          desc: "Manage your irrigation systems automatically for optimal water usage.",
          icon: require("@/assets/icons/irrigation.jpg")
        },
        {
          quarter: "Q3 ’26",
          title: "Blockchain Traceability",
          desc: "Ensure transparency and traceability of your produce from farm to table.",
          icon: require("@/assets/icons/block.jpg")
        },
        {
          quarter: "Q4 ’26",
          title: "AI‑Driven Pest Management",
          desc: "Use AI to predict and manage pest outbreaks before they happen.",
          icon: require("@/assets/icons/disease.jpg")
        }
      ],
      testimonials: [
        {
          photo: require('@/assets/john.webp'),
          name: 'John, Yatta Machakos',
          quote: 'I chat all day with the AI Agent. Very Kowledgeable and Intelligent. Its like we know each other'
        },
        {
          photo: require('@/assets/mary.avif'),
          name: 'Mary, Mwala Machakos ',
          quote: 'The weather App is quite an interesting one. Very accurate in predicting.'
        },
        {
          photo: require('@/assets/peter.webp'),
          name: 'Peter, Mavoko Machakos',
          quote: "The knowledge hub is a goldmine of information. I've learned so much from other farmers."
        }
      ]
    };
  },
  
  methods: {
    goToRegister() {
      this.$router.push("/auth/register");
    }
  }
};
</script>

<style scoped>
html, body  {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100%;
  position: relative;
  
}
.landing-page {
  font-family: 'Poppins', sans-serif;
  color: #fff;
  background: #0f172a; /* dark futuristic bg */
  
}


.hero {
  height: 100vh;
  width: 100vw;
  background: url('@/assets/image1.avif') no-repeat center center; 
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  position: relative;
  
}

.hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 15px;
  color: #00ff95;
}

.cta-btn {
  margin-top: 20px;
  padding: 12px 24px;
  background: linear-gradient(45deg, #00ff95, #00ffaa);
  color: #000;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 0 15px #00ff95;
}

.why-farme {
  padding: 60px 20px;
  background: #111827;
  color: #fff;
  text-align: center;
}
.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #00ff95;
  margin-bottom: 20px;
}
.why-scroll {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
  scroll-snap-type: x mandatory;
}
.why-card {
  flex: 0 0 260px;
  background: #1e293b;
  border-radius: 12px;
  padding: 20px;
  scroll-snap-align: start;
  box-shadow: 0 5px 15px rgba(0, 255, 149, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.why-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0, 255, 149, 0.4);
}
.why-card img {
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
}
.why-card h5 {
  font-size: 1.1rem;
  color: #00ff95;
  margin-bottom: 10px;
}
.why-card p {
  font-size: 0.95rem;
  color: #d1d5db;
  line-height: 1.4;
}

/* hide scrollbar on WebKit */
.why-scroll::-webkit-scrollbar {
  display: none;
}
/* hide scrollbar on Firefox */
.why-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.core-platform {
  background: #0f172a;
  padding: 60px 20px;
  color: #fff;
}
.core-platform .section-title {
  text-align: center;
  font-size: 2rem;
  color: #00ff95;
  margin-bottom: 40px;
}
.feature-block {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 60px;
  flex-wrap: wrap;
  margin-left: 10px;
  margin-right: 60px;
}
.feature-block.reverse {
  flex-direction: row-reverse;
}
.feature-image img {
  width: 100%;
  max-width: 360px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 255, 149, 0.2);
}
.feature-text {
  flex: 1;
  max-width: 560px;
}
.feature-text h5 {
  font-size: 1.6rem;
  color: #00ff95;
  margin-bottom: 16px;
}
.feature-text ul {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}
.feature-text li {
  margin: 10px 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #d1d5db;
}
.learn-more {
  display: inline-block;
  color: #00ff95;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}
.learn-more:hover {
  color: #ffffff;
}
@media (max-width: 768px) {
  .feature-block,
  .feature-block.reverse {
    flex-direction: column;
    text-align: center;
  }
  .feature-block.reverse .feature-image,
  .feature-block .feature-image {
    order: 0;
  }
  .feature-text {
    max-width: 100%;
  }
}
.roadmap {
  position: relative;
  padding: 80px 20px;
  background: #0f172a;
  color: #fff;
  overflow: hidden;
}
.section-title {
  text-align: center;
  font-size: 2.5rem;
  color: #00ff95;
  margin-bottom: 60px;
  text-shadow: 0 0 8px #00ff95;
}
/* central spine */
.timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 40px;
}
.timeline::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #00ffaa, #00ff95);
  transform: translateX(-50%);
  box-shadow: 0 0 20px #00ff95;
}
/* each item */
.timeline-item {
  position: relative;
  width: 50%;
  padding: 20px 40px;
  box-sizing: border-box;
}
.timeline-item.left {
  left: 0;
  text-align: right;
}
.timeline-item.right {
  left: 50%;
  text-align: left;
}
/* node (circle + icon) */
.node {
  position: absolute;
  top: 20px;
  width: 48px;
  height: 48px;
  background: #0a0f14;
  border: 4px solid #00ff95;
  border-radius: 50%;
  box-shadow: 0 0 15px #00ff95;
  display: flex;
  align-items: center;
  justify-content: center;
}
.timeline-item.left .node {
  right: -24px;
}
.timeline-item.right .node {
  left: -24px;
}
/* pulsating halo */
.pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #00ff95;
  opacity: 0.4;
  animation: pulse 2s infinite;
}
.node img {
  position: relative;
  width: 24px;
  height: 24px;
  z-index: 1;
  filter: drop-shadow(0 0 5px #00ff95);
}
/* card content */
.card {
  background: #161925;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 255, 149, 0.2);
}
.card .date {
  font-size: 0.9rem;
  color: #94a3b8;
}
.card h5 {
  margin: 8px 0;
  color: #00ff95;
  font-size: 1.3rem;
}
.card p {
  font-size: 1rem;
  color: #d1d5db;
  line-height: 1.5;
}
/* animations */
@keyframes pulse {
  0% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.4); opacity: 0; }
  100% { transform: scale(1); opacity: 0.4; }
}
/* responsive */
@media (max-width: 768px) {
  .timeline-item,
  .timeline-item.right {
    width: 100%;
    left: 0 !important;
    text-align: left;
    padding-left: 80px;
    margin-bottom: 40px;
  }
  .timeline-item .node {
    left: 0 !important;
  }
}
.testimonials {
  background: #111827;
  color: #fff;
  padding: 60px 20px;
  text-align: center;
}
.section-title {
  font-size: 2rem;
  color: #00ff95;
  margin-bottom: 40px;
  text-shadow: 0 0 6px #00ff95;
}
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}
.testimonial-card {
  background: #1e293b;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 5px 15px rgba(0, 255, 149, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.testimonial-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0, 255, 149, 0.4);
}
.photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 16px;
  box-shadow: 0 0 10px #00ff95;
}
.testimonial-card h5 {
  font-size: 1.1rem;
  color: #00ff95;
  margin-bottom: 8px;
}
.rating {
  color: #ffd700;
  margin-bottom: 12px;
}
.star {
  font-size: 1.2rem;
  margin: 0 2px;
}
.quote {
  font-size: 0.95rem;
  color: #d1d5db;
  line-height: 1.5;
}
.stats-bar {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}
.stat {
  font-size: 1.2rem;
  color: #00ff95;
}
.stat strong {
  font-size: 1.6rem;
  display: block;
}
.cta-section {
  position: relative;
  background: url('@/assets/image4.jpg') no-repeat center center / cover;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
  color: #fff;
}
.cta-overlay {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
}
.cta-content {
  position: relative;
  text-align: center;
  z-index: 1;
  max-width: 800px;
  padding: 0 20px;
}
.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #00ff95;
  text-shadow: 0 0 8px #00ff95;
}
.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}
.btn-primary,
.btn-secondary {
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}
.btn-primary {
  background: linear-gradient(45deg, #00ff95, #00ffaa);
  color: #000;
  box-shadow: 0 0 15px #00ff95;
}
.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 0 25px #00ffaa;
}
.btn-secondary {
  background: transparent;
  color: #00ff95;
  border: 2px solid #00ff95;
  box-shadow: 0 0 10px rgba(0, 255, 149, 0.5);
}
.btn-secondary:hover {
  background: rgba(0, 255, 149, 0.1);
  box-shadow: 0 0 20px #00ff95;
}
@media (max-width: 600px) {
  .cta-content h2 {
    font-size: 1.8rem;
  }
  .cta-buttons {
    flex-direction: column;
  }
}
</style>