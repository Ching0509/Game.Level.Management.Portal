<template>
  <header class="header">
    <div class="header-container">
      <router-link to="/game-level" class="logo-container">
        <img src="@/assets/icon.svg" alt="Game Level Logo" class="logo" />
        <span class="logo-text">Game Level Manager</span>
      </router-link>

      <nav class="nav-links">
        <router-link
          v-for="link in navigationLinks"
          :key="link.path"
          :to="link.path"
          class="nav-link"
          active-class="nav-link-active"
        >
          {{ link.name }}
        </router-link>
      </nav>

      <!-- Mobile menu button -->
      <button
        class="mobile-menu-btn"
        @click="toggleMenu"
        :class="{ 'is-active': isMenuOpen }"
        aria-label="Toggle menu"
      >
        <span class="menu-icon"></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <div class="mobile-menu" :class="{ 'is-open': isMenuOpen }">
      <router-link
        v-for="link in navigationLinks"
        :key="link.path"
        :to="link.path"
        class="mobile-nav-link"
        active-class="mobile-nav-link-active"
        @click="closeMenu"
      >
        {{ link.name }}
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "BaseHeader",
});

const isMenuOpen = ref(false);

const navigationLinks = [
  { name: "Demo", path: "/demo" },
  { name: "Game Level", path: "/game-level" },
  { name: "Adjust Level", path: "/adjust-game-level" },
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  document.body.style.overflow = isMenuOpen.value ? "hidden" : "";
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
};
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 2px solid var(--primary-color);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.2);
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.logo-container:hover {
  transform: scale(1.05);
}

.logo {
  width: 2.5rem;
  height: 2.5rem;
  filter: invert(1) drop-shadow(0 0 5px var(--primary-color));
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-color);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link-active {
  color: var(--primary-color);
  text-shadow: 0 0 10px var(--primary-color);
  background: rgba(255, 0, 255, 0.1);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1001;
}

.menu-icon {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--text-color);
  position: relative;
  transition: all 0.3s ease;
}

.menu-icon::before,
.menu-icon::after {
  content: "";
  position: absolute;
  width: 24px;
  height: 2px;
  background-color: var(--text-color);
  transition: all 0.3s ease;
}

.menu-icon::before {
  transform: translateY(-8px);
}

.menu-icon::after {
  transform: translateY(8px);
}

.mobile-menu-btn.is-active .menu-icon {
  background-color: transparent;
}

.mobile-menu-btn.is-active .menu-icon::before {
  transform: rotate(45deg);
}

.mobile-menu-btn.is-active .menu-icon::after {
  transform: rotate(-45deg);
}

.mobile-menu {
  display: none;
  height: fit-content;
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  padding: 1rem;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.mobile-nav-link {
  display: block;
  color: var(--text-color);
  text-decoration: none;
  padding: 1rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.mobile-nav-link:last-child {
  border-bottom: none;
}

.mobile-nav-link:hover,
.mobile-nav-link-active {
  color: var(--primary-color);
  background: rgba(255, 0, 255, 0.1);
}

.is-open {
  transform: translateX(0);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-menu {
    display: block;
  }

  .header-container {
    padding: 0.75rem 1rem;
  }

  .logo {
    width: 2rem;
    height: 2rem;
  }

  .logo-text {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .logo-text {
    display: none;
  }
}
</style>
