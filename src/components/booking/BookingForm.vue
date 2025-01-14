<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";

const schema = yup.object({
  pickupLocation: yup.string().required("Pickup location is required"),
  dropoffLocation: yup.string().required("Drop-off location is required"),
  pickupDate: yup.date().required("Pickup date is required"),
  pickupTime: yup.string().required("Pickup time is required"),
  dropoffDate: yup.date().required("Drop-off date is required"),
  dropoffTime: yup.string().required("Drop-off time is required"),
  driverAge: yup
    .number()
    .min(18, "Must be at least 18 years old")
    .required("Age is required"),
  hasLicense: yup.boolean().oneOf([true], "Valid driver's license is required"),
});

const { handleSubmit, values, errors } = useForm({
  validationSchema: schema,
});

const locations = ref([
  "JFK Airport",
  "LaGuardia Airport",
  "Manhattan Downtown",
  "Brooklyn",
  "Queens",
]);

const filteredLocations = ref([]);

const filterLocations = (event: string, field: string) => {
  if (!event) {
    filteredLocations.value = [];
    return;
  }
  filteredLocations.value = locations.value.filter((location) =>
    location.toLowerCase().includes(event.toLowerCase())
  );
};

const onSubmit = handleSubmit((values) => {
  console.log("Form submitted:", values);
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-6">Book Your Car</h2>
    <form @submit="onSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Pickup Location -->
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Pickup Location
          </label>
          <input
            type="text"
            v-model="values.pickupLocation"
            @input="(event) => filterLocations(event.target.value, 'pickup')"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter pickup location"
          />
          <div
            v-if="filteredLocations.length"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
          >
            <div
              v-for="location in filteredLocations"
              :key="location"
              @click="values.pickupLocation = location"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {{ location }}
            </div>
          </div>
          <small class="text-red-500">{{ errors.pickupLocation }}</small>
        </div>

        <!-- Dropoff Location -->
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Drop-off Location
          </label>
          <input
            type="text"
            v-model="values.dropoffLocation"
            @input="(event) => filterLocations(event.target.value, 'dropoff')"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter drop-off location"
          />
          <div
            v-if="filteredLocations.length"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
          >
            <div
              v-for="location in filteredLocations"
              :key="location"
              @click="values.dropoffLocation = location"
              class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {{ location }}
            </div>
          </div>
          <small class="text-red-500">{{ errors.dropoffLocation }}</small>
        </div>

        <!-- Pickup Date & Time -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Pickup Date & Time
          </label>
          <div class="flex gap-2">
            <input
              type="date"
              v-model="values.pickupDate"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="time"
              v-model="values.pickupTime"
              min="09:00"
              max="18:00"
              class="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <small class="text-red-500">{{ errors.pickupDate }}</small>
        </div>

        <!-- Dropoff Date & Time -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Drop-off Date & Time
          </label>
          <div class="flex gap-2">
            <input
              type="date"
              v-model="values.dropoffDate"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="time"
              v-model="values.dropoffTime"
              min="09:00"
              max="18:00"
              class="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <small class="text-red-500">{{ errors.dropoffDate }}</small>
        </div>

        <!-- Driver's Age -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Driver's Age
          </label>
          <input
            type="number"
            v-model="values.driverAge"
            min="18"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your age"
          />
          <small class="text-red-500">{{ errors.driverAge }}</small>
        </div>
      </div>

      <!-- License Checkbox -->
      <div class="flex items-center">
        <input
          type="checkbox"
          v-model="values.hasLicense"
          class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label class="ml-2 block text-sm text-gray-700">
          I confirm that I have a valid driver's license
        </label>
      </div>
      <small class="text-red-500">{{ errors.hasLicense }}</small>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Søk på tilgjengelige biler
      </button>
    </form>
  </div>
</template>
