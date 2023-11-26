import { defineStore } from 'pinia';
import axios from 'axios';

export const useCountryStore = defineStore('country', {
    state: () => ({
        countries: [],
    }),
    getters: {
        getCountryByCode: (state) => (code) => {
            return state.countries.find((country) => country.iso_3166_1_a2 === code);
        },
    },
    actions: {
        async loadCountries() {
            try {
                const response = await axios.get('/BD/countries.json');
                this.countries = response.data;
            } catch (error) {
                console.error('Failed to load countries:', error);
            }
        },
    },
});
