<script setup lang="ts">
import { ref } from "vue";

const isMenuOpen = ref(false);
const items = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Vehicle Fleet", to: "/fleet" },
  { label: "Locations", to: "/locations" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <router-link to="/" class="text-2xl font-bold text-primary">
          CarRental
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex space-x-8">
          <router-link
            v-for="item in items"
            :key="item.label"
            :to="item.to"
            class="text-gray-700 hover:text-primary transition-colors duration-200"
          >
            {{ item.label }}
          </router-link>
        </div>

        <!-- Auth Buttons -->
        <div class="hidden md:flex items-center space-x-4">
          <router-link to="/auth">
            <button
              class="px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md transition-colors duration-200"
            >
              Login
            </button>
          </router-link>
          <router-link to="/auth?mode=register">
            <button
              class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200"
            >
              Register
            </button>
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
        >
          <svg
            class="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-if="!isMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-show="isMenuOpen" class="md:hidden" @click="isMenuOpen = false">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            v-for="item in items"
            :key="item.label"
            :to="item.to"
            class="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            {{ item.label }}
          </router-link>

          <!-- Mobile Auth Buttons -->
          <div class="mt-4 space-y-2 px-3">
            <router-link to="/auth" class="block">
              <button
                class="w-full px-4 py-2 text-gray-700 hover:text-primary hover:bg-gray-100 rounded-md transition-colors duration-200"
              >
                Login
              </button>
            </router-link>
            <router-link to="/auth?mode=register" class="block">
              <button
                class="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-200"
              >
                Register
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
