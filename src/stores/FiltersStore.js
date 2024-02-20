import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useFiltersStore = defineStore("filters", () => {
  const activeFilters = ref({
    frontend: true,
    backend: true,
    career: true,
  });

  function updateActiveFilters(inputId, isActive) {
    activeFilters.value = {
      ...activeFilters.value,
      [inputId]: isActive,
    };
  }

  return {
    activeFilters,
    updateActiveFilters,
  };
});
