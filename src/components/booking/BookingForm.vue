<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import Calendar from "primevue/calendar";
import AutoComplete from "primevue/autocomplete";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";

const schema = yup.object({
  pickupLocation: yup.string().required("Pickup location is required"),
  dropoffLocation: yup.string().required("Drop-off location is required"),
  pickupDate: yup.date().required("Pickup date is required"),
  dropoffDate: yup.date().required("Drop-off date is required"),
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

const onSubmit = handleSubmit((values) => {
  console.log("Form submitted:", values);
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-6">Book Your Car</h2>

    <form @submit="onSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Pickup Location</label
          >
          <AutoComplete
            v-model="values.pickupLocation"
            :suggestions="locations"
            class="w-full"
            placeholder="Enter pickup location"
          />
          <small class="text-red-500">{{ errors.pickupLocation }}</small>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Drop-off Location</label
          >
          <AutoComplete
            v-model="values.dropoffLocation"
            :suggestions="locations"
            class="w-full"
            placeholder="Enter drop-off location"
          />
          <small class="text-red-500">{{ errors.dropoffLocation }}</small>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Pickup Date & Time</label
          >
          <Calendar
            v-model="values.pickupDate"
            showTime
            class="w-full"
            :minDate="new Date()"
          />
          <small class="text-red-500">{{ errors.pickupDate }}</small>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Drop-off Date & Time</label
          >
          <Calendar
            v-model="values.dropoffDate"
            showTime
            class="w-full"
            :minDate="values.pickupDate || new Date()"
          />
          <small class="text-red-500">{{ errors.dropoffDate }}</small>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Driver's Age</label
          >
          <InputNumber
            v-model="values.driverAge"
            class="w-full"
            :min="18"
            placeholder="Enter your age"
          />
          <small class="text-red-500">{{ errors.driverAge }}</small>
        </div>
      </div>

      <div class="flex items-center">
        <input
          type="checkbox"
          v-model="values.hasLicense"
          class="h-4 w-4 text-primary border-gray-300 rounded"
        />
        <label class="ml-2 block text-sm text-gray-700">
          I confirm that I have a valid driver's license
        </label>
      </div>
      <small class="text-red-500">{{ errors.hasLicense }}</small>

      <Button type="submit" label="Search Available Vehicles" class="w-full" />
    </form>
  </div>
</template>
