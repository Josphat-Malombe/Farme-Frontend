<template>
  <header class="header">
    <div class="logo">🌱 <span>AgriePulse</span></div>

    <!-- Navigation Links -->
    <nav :class="['nav-links', { active: menuOpen }]">
      <a href="#home" class="nav-item">Home</a>
      <a href="#features" class="nav-item">Features</a>
      <a href="#about" class="nav-item">About</a>
      <a href="#contact" class="nav-item">Contact</a>
    </nav>

    <!-- Glowing CTA -->
    <button class="cta-btn" @click="goToRegister">Get Started</button>

    <!-- Hamburger -->
    <div class="menu-icon" @click="toggleMenu">
      <div :class="{ open: menuOpen }" class="bar"></div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToRegister() {
      this.$router.push("/auth/register");
    },
  },
};
</script>

<style scoped>
/* Header Wrapper */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: linear-gradient(135deg, rgba(0, 31, 63, 0.8), rgba(0, 0, 0, 0.8));
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 255, 128, 0.3);
}

/* Logo */
.logo {
  font-size: 1.4rem;
  font-weight: bold;
  color: #00ff95;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 2px;
  animation: pulse 2s infinite;
}

/* Navigation */
.nav-links {
  display: flex;
  gap: 30px;
}

.nav-item {
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  position: relative;
  transition: color 0.3s ease, text-shadow 0.3s ease, transform 0.3s ease;
}

.nav-item::after {
  content: '';
  position: absolute;
  width: 0%;
  height: 2px;
  background: #00ff95;
  left: 0;
  bottom: -5px;
  transition: width 0.3s ease;
}

.nav-item:hover {
  color: #00ff95;
  text-shadow: 0 0 10px #00ff95;
  transform: scale(1.05);
}

.nav-item:hover::after {
  width: 100%;
}

/* CTA Button */
.cta-btn {
  background: linear-gradient(45deg, #00ff95, #00ffaa);
  color: #000;
  font-size: 1rem;
  font-weight: bold;
  padding:12px 10px 10px 20px ;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  box-shadow: 0 0 10px #00ff95, 0 0 10px #00ff95, 0 0 10px #00ff95;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
  width: 140px;
}

.cta-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px #00ffaa, 0 0 20px #00ffaa, 0 0 20px #00ffaa;
}

/* Hamburger Menu */
.menu-icon {
  display: none;
  cursor: pointer;
}

.bar,
.bar::before,
.bar::after {
  width: 30px;
  height: 3px;
  background: #00ff95;
  display: block;
  margin: 6px auto;
  transition: 0.3s;
}

.bar.open {
  transform: rotate(45deg);
}

.bar.open::before {
  transform: rotate(90deg);
  top: 0;
}

.bar.open::after {
  opacity: 0;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .nav-links {
    position: absolute;
    top: 70px;
    left: 0;
    background: rgba(0, 0, 0, 0.9);
    width: 100%;
    flex-direction: column;
    align-items: center;
    display: none;
  }

  .nav-links.active {
    display: flex;
    animation: fadeIn 0.3s ease-in-out;
  }

  .menu-icon {
    display: block;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0% {
    text-shadow: 0 0 5px #00ff95;
  }
  50% {
    text-shadow: 0 0 10px #00ff95, 0 0 20px #00ff95;
  }
  100% {
    text-shadow: 0 0 5px #00ff95;
  }
}
</style>
