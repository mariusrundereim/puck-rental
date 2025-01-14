<script setup lang="ts">
import BookingForm from "../components/booking/BookingForm.vue";
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="relative bg-gray-900 h-[600px]">
      <div
        class="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50"
      >
        <div class="container mx-auto h-full flex items-center">
          <div class="max-w-2xl text-white">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">
              Start til bilreise her
            </h1>
            <p class="text-xl mb-8">
              Finn det perfekte kjøretøyet for din neste reise.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Booking Form Section -->
    <div class="container mx-auto -mt-32 px-4 relative z-10 mb-16">
      <BookingForm />
    </div>

    <!-- Features Section -->
    <div class="container mx-auto px-4 py-16">
      <h2 class="text-3xl font-bold text-center mb-12">Hvorfor velge oss</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <i class="pi pi-car text-4xl text-primary mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">Premium Fleet</h3>
          <p class="text-gray-600">
            Bredt utvalg av godt vedlikeholdte kjøretøy
          </p>
        </div>
        <div class="text-center">
          <i class="pi pi-clock text-4xl text-primary mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">24/7 Support</h3>
          <p class="text-gray-600">Døgnåpen kundestøtte</p>
        </div>
        <div class="text-center">
          <i class="pi pi-check-circle text-4xl text-primary mb-4"></i>
          <h3 class="text-xl font-semibold mb-2">Enkel Booking</h3>
          <p class="text-gray-600">Enkel og sikker reservasjonsprosess</p>
        </div>
      </div>
    </div>
  </div>
</template>
