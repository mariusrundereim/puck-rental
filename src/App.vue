<script setup lang="ts">
import Navbar from "./components/layout/Navbar.vue";
import Footer from "./components/layout/Footer.vue";
import BookingForm from "./components/booking/BookingForm.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-grow">
      <!-- <BookingForm /> -->
      <router-view />
    </main>
    <Footer />
  </div>
</template>
