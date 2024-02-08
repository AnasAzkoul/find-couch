import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCoachesStore = defineStore("coaches", () => {
  const coaches = ref([]);

  return {
    coaches,
  };
});
