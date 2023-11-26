<script setup>
import { computed, onMounted, ref, watch, defineProps } from 'vue';
import { useCountryStore } from '@/stores/store';
import { useRoute } from 'vue-router';

const props = defineProps(['itemsPerPage']);

const countryStore = useCountryStore();
const route = useRoute();

const currentPage = ref(1);

onMounted(() => {
  countryStore.loadCountries();
});

const filterFromQuery = computed(() => route.query.country);

const filteredCountries = computed(() => {
  return filterFromQuery.value
      ? countryStore.countries.filter((country) => country.iso_3166_1_a2 === filterFromQuery.value)
      : countryStore.countries;
});

const paginatedCountries = computed(() => {
  const startIndex = (currentPage.value - 1) * props.itemsPerPage;
  const endIndex = startIndex + props.itemsPerPage;
  return filteredCountries.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => Math.ceil(filteredCountries.value.length / props.itemsPerPage));

watch([filterFromQuery, props.itemsPerPage], () => {
  currentPage.value = 1;
});
</script>

<template>
  <table class="country-table">
    <thead>
    <tr>
      <th>Name</th>
      <th>ISO Code</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="country in paginatedCountries" :key="country.id">
      <td>{{ country.name }}</td>
      <td>{{ country.iso_3166_1_a2 }}</td>
    </tr>
    </tbody>
  </table>

  <div class="pagination">
    <button @click="currentPage--" :disabled="currentPage === 1">Previous</button>
    <span>{{ currentPage }}</span>
    <button @click="currentPage++" :disabled="currentPage === totalPages">Next</button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 300px;
  padding-bottom: 10px;
}

.pagination button {
  padding: 8px;
  background-color: dodgerblue;
  border: none;
  border-radius: 4px;
  color: white;
}
.country-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.country-table th,
.country-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.country-table th {
  background-color: #f2f2f2;
}

.pagination {
  margin-top: 10px;
}

.pagination button {
  margin-right: 5px;
  cursor: pointer;
}
</style>