<script setup>
import { onBeforeMount, ref } from "vue";
import BaseCard from "../ui/BaseCard.vue";
import { useCoachesStore } from "../../stores/coachesStore";

const coachesStore = useCoachesStore();

const checkboxes = ref({});

const emits = defineEmits(["changeFilter"]);

onBeforeMount(() => {
  if (coachesStore.areasArray) {
    coachesStore.areasArray.forEach((area) => {
      checkboxes.value[area] = true;
    });
  }
});

const setFilter = (event) => {
  const inputId = event.target.id;
  const isActive = event.target.checked;
  const updatedFilters = {
    ...checkboxes.value,
    [inputId]: isActive,
  };
  checkboxes.value = updatedFilters;
  emits("changeFilter", checkboxes.value);
};
</script>

<template>
  <BaseCard>
    <h2>Find your coach</h2>
    <span
      class="filter-option"
      v-for="area in coachesStore.areasArray"
      :key="area"
    >
      <input type="checkbox" :id="area" checked @change="setFilter" />
      <label :for="area">{{ area }}</label>
    </span>
  </BaseCard>
</template>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
