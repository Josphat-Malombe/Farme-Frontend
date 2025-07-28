<template>
  <div class="main-layout">
    <HeaderComponent class="header" />
    <main class="main-content">
      <router-view />
    </main>
  </div>
  <FooterComponent/>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";


export default {
  name: "MainLayout",
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.main-content {
  flex: 1;
  padding-top: 80px; /* same as header height */
}
</style>

