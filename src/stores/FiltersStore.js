import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useCoachesStore } from "./coachesStore";

export const useFiltersStore = defineStore("filters", () => {
  const coachesStore = useCoachesStore();
  
  const activeFilters = ref(coachesStore.areasMap);

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
