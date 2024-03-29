import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useFiltersStore } from "./FiltersStore";

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
    {
      id: "c3",
      firstName: "Anas",
      lastName: "Azkoul",
      areas: ["frontend"],
      description:
        "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
      hourlyRate: 30,
    },
    {
      id: "c4",
      firstName: "Stefan",
      lastName: "Diks",
      areas: ["backend"],
      description:
        "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
      hourlyRate: 30,
    },
  ]);

  const hasCoaches = computed(() => {
    return coaches.value && coaches.value.length > 0;
  });

  const areasMap = computed(() => {
    const map = {};

    coaches.value.forEach((coach) => {
      coach.areas.forEach((area) => {
        if (!map[area]) {
          map[area] = true;
        }
      });
    });

    return map;
  });

  const areasArray = computed(() => {
    return Object.keys(areasMap.value);
  });

  const filteredCoaches = computed(() => {
    const filtersStore = useFiltersStore();
    const filterCoaches = coaches.value.filter((coach) => {
      const isIncluded = coach.areas.some(
        (area) => filtersStore.activeFilters[area]
      );
      return isIncluded && coach;
    });

    return filterCoaches;
  });

  function getCoachById(id) {
    return coaches.value.find((item) => item.id === id);
  }

  function registerNewCoach(data) {
    coaches.value = [data, ...coaches.value];
    console.log(coaches.value);
  }

  return {
    coaches,
    hasCoaches,
    areasArray,
    areasMap,
    filteredCoaches,
    getCoachById,
    registerNewCoach,
  };
});
