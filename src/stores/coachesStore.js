import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCoachesStore = defineStore("coaches", () => {
  /** @type {{id:string, firstName: string, lastName: string, areas: string[], description: string, hourlyRate: number}[]} */

  const coaches = ref([
    {
      id: "c1",
      firstName: "Maximilian",
      lastName: "Schwarzmüller",
      areas: ["frontend", "backend", "career"],
      description:
        "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
      hourlyRate: 30,
    },
    {
      id: "c2",
      firstName: "Julie",
      lastName: "Jones",
      areas: ["frontend", "career"],
      description:
        "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
      hourlyRate: 30,
    },
  ]);

  const hasCoaches = computed(() => {
    return coaches.value && coaches.value.length > 0;
  });

  const getCoachById = (id) => {
    return coaches.value.find(item => item.id === id); 
  }

  return {
    coaches,
    hasCoaches,
    getCoachById
  };
});
