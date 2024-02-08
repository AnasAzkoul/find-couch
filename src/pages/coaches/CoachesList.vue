<template>
  <section>Filter</section>
  <section>List of coaches</section>
</template>

<script setup>
import { useCoachesStore } from "../../stores/coachesStore";
import { storeToRefs } from "pinia";

const store = useCoachesStore();
const { coaches } = storeToRefs(store);
</script>
