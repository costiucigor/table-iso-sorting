<script setup>
import { ref, computed } from 'vue';
import { useCountryStore } from '@/stores/store';
import CTable from "@/components/CTable.vue";
import { useRouter } from 'vue-router';

const countryStore = useCountryStore();
const router = useRouter();
const itemsPerPage = ref(10);

const selectedCountry = ref('');

const uniqueCountries = computed(() => [...new Set(countryStore.countries.map(country => country))]);

const updateFilter = () => {
  router.push({ name: 'Home', query: getQuery() });
};

const getQuery = () => selectedCountry.value !== '' ? { country: selectedCountry.value } : undefined;
</script>

<template>
  <div class="table-wrapper">
    <div class="table">
      <div class="select-wrapper">
        <div class="country-filter">
          <label for="countryFilter">Select Country:</label>
          <select v-model="selectedCountry" id="countryFilter" @change="updateFilter">
            <option value="">All Countries</option>
            <option v-for="country in uniqueCountries" :key="country.id" :value="country.iso_3166_1_a2">
              {{ country.name }}
            </option>
          </select>
        </div>
        <div class="items">
          <label for="itemsPerPage">Items per page:</label>
          <select v-model="itemsPerPage" id="itemsPerPage">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      <CTable :itemsPerPage="itemsPerPage"></CTable>
    </div>
  </div>
</template>

<style scoped>
.country-filter {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
}

.items {
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
}
.select-wrapper {
  display: flex;
  flex-direction: row;
  gap: 430px;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
  margin-left: 10px;
}

.table {
  border: 1px black solid;
}

.table-wrapper {
  margin-top: 20px;
}
</style>