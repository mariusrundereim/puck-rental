<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Menu from "primevue/menu";

const menu = ref();
const items = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Vehicle Fleet", to: "/fleet" },
  { label: "Locations", to: "/locations" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];
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
            class="text-gray-700 hover:text-primary transition-colors"
          >
            {{ item.label }}
          </router-link>
        </div>

        <div class="flex items-center space-x-4">
          <router-link to="/auth">
            <Button label="Login" class="p-button-text" />
          </router-link>
          <router-link to="/auth?mode=register">
            <Button label="Register" />
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <Button
            icon="pi pi-bars"
            @click="(event) => menu.toggle(event)"
            class="p-button-text"
          />
          <Menu ref="menu" :model="items" :popup="true" />
        </div>
      </div>
    </div>
  </nav>
</template>
