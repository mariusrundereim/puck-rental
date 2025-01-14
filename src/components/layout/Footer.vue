<script setup lang="ts">
import { ref } from "vue";
</script>

<template>
  <footer class="bg-gray-800 text-white">
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-lg font-bold">CarRental</p>
          <p class="text-sm">Rent a car with ease</p>
        </div>
        <div class="flex space-x-4">
          <a href="https://twitter.com" target="_blank">
            <i class="pi pi-twitter h-6 w-6"></i>
          </a>
          <a href="https://facebook.com" target="_blank">
            <i class="pi pi-facebook h-6 w-6"></i>
          </a>
          <a href="https://instagram.com" target="_blank">
            <i class="pi pi-instagram h-6 w-6"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
