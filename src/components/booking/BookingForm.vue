<script setup lang="ts">
import { ref, Ref } from "vue";
import { useForm } from "vee-validate";
import { onClickOutside } from "@vueuse/core";
import * as yup from "yup";

// Add these interfaces at the top of your script
interface FormValues {
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  driverAge: number | null;
  hasLicense: boolean;
}

const target: Ref<HTMLElement | null> = ref(null);
onClickOutside(target, (event) => console.log(event));

// Refs for input handling
const tempPickupInput: Ref<string> = ref("");
const tempDropoffInput: Ref<string> = ref("");

// Set initial values
const initialValues: FormValues = {
  pickupLocation: "",
  dropoffLocation: "",
  pickupDate: "",
  pickupTime: "",
  dropoffDate: "",
  dropoffTime: "",
  driverAge: null,
  hasLicense: false,
};

const schema = yup.object({
  pickupLocation: yup.string().required("Hentested er påkrevd"),
  dropoffLocation: yup.string().required("Leveringssted er påkrevd"),
  pickupDate: yup.string().required("Hentedato er påkrevd"),
  pickupTime: yup.string().required("Hentetid er påkrevd"),
  dropoffDate: yup.string().required("Leveringsdato er påkrevd"),
  dropoffTime: yup.string().required("Leveringstid er påkrevd"),
  driverAge: yup
    .number()
    .nullable()
    .min(18, "Du må være minst 18 år")
    .required("Alder er påkrevd"),
  hasLicense: yup.boolean().oneOf([true], "Gyldig førerkort er påkrevd"),
});

// Handle form submission
const { handleSubmit, values, errors, setFieldValue } = useForm({
  validationSchema: schema,
  initialValues,
});

const locations = ref([
  "Oslo Sentralstasjon",
  "Oslo Lufthavn",
  "Bergen Sentrum",
  "Trondheim Sentrum",
  "Stavanger Lufthavn",
  "Tromsø Sentrum",
  "Kristiansand Sentrum",
  "Fredrikstad Sentrum",
  "Drammen Sentrum",
  "Sandnes Sentrum",
  "Skien Sentrum",
  "Arendal Sentrum",
  "Molde Sentrum",
  "Hamar Sentrum",
  "Lillehammer Sentrum",
  "Gjøvik Sentrum",
  "Haugesund Sentrum",
  "Ålesund Sentrum",
  "Harstad Sentrum",
  "Bodø Sentrum",
  "Narvik Sentrum",
]);

const filteredPickupLocations: Ref<string[]> = ref([]);
const filteredDropoffLocations: Ref<string[]> = ref([]);

// Filter location
const filterLocations = (inputValue: string, field: "pickup" | "dropoff") => {
  if (field === "pickup") {
    tempPickupInput.value = inputValue;
  } else {
    tempDropoffInput.value = inputValue;
  }

  if (!inputValue) {
    if (field === "pickup") {
      filteredPickupLocations.value = [];
    } else {
      filteredDropoffLocations.value = [];
    }
    return;
  }

  const filtered = locations.value.filter((location) =>
    location.toLowerCase().includes(inputValue.toLowerCase())
  );

  if (field === "pickup") {
    filteredPickupLocations.value = filtered; // Issue
  } else {
    filteredDropoffLocations.value = filtered; // Issue
  }
};

const onSubmit = handleSubmit((values) => {
  console.log("Form submitted:", values);
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-2xl font-bold mb-6">Bestill Din Bil</h2>
    <form @submit="onSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Pickup Location -->
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Hentested
          </label>
          <input
            type="text"
            :value="tempPickupInput"
            @input="(event) => filterLocations((event.target as HTMLInputElement).value, 'pickup')"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Skriv inn hentested"
          />
          <div
            v-if="filteredPickupLocations.length"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
          >
            <div
              v-for="location in filteredPickupLocations"
              ef="target"
              :key="location"
              @click="
                () => {
                  setFieldValue('pickupLocation', location);
                  tempPickupInput = location;
                  filteredPickupLocations.value = []; // Issue
                }
              "
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
            Leveringssted
          </label>
          <input
            type="text"
            :value="tempDropoffInput"
            @input="(event) => filterLocations((event.target as HTMLInputElement).value, 'dropoff')"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Skriv inn leveringssted"
          />
          <div
            v-if="filteredDropoffLocations.length"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
          >
            <div
              v-for="location in filteredDropoffLocations"
              :key="location"
              @click="
                () => {
                  setFieldValue('dropoffLocation', location);
                  tempDropoffInput = location;
                  filteredDropoffLocations.value = []; // Issue
                }
              "
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
            Hentedato & Tid
          </label>
          <div class="flex gap-2">
            <input
              type="date"
              v-model="values.pickupDate"
              :min="new Date().toISOString().split('T')[0]"
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
            Leveringsdato & Tid
          </label>
          <div class="flex gap-2">
            <input
              type="date"
              v-model="values.dropoffDate"
              :min="values.pickupDate || new Date().toISOString().split('T')[0]"
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
            Sjåførens Alder
          </label>
          <input
            type="number"
            v-model="values.driverAge"
            min="18"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Skriv inn din alder"
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
          Jeg bekrefter at jeg har gyldig førerkort
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
