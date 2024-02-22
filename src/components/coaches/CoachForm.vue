<script setup>
import { ref } from "vue";
import { useCoachesStore } from "../../stores/coachesStore";
import BaseButton from "../ui/BaseButton.vue";
import BaseCard from "../ui/BaseCard.vue";

const coachesStore = useCoachesStore();

const formData = ref({
  firstName: null,
  lastName: null,
  description: null,
  hourlyRate: null,
  areas: [],
});

const handleCheckBoxChange = (event) => {
  const id = event.target.id;
  const isChecked = event.target.checked;

  if (isChecked) {
    formData.value.areas = [id, ...formData.value.areas];
  }
};

const handleSubmit = () => {
  formData.value["id"] = new Date().toISOString();
  coachesStore.registerNewCoach(formData.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <BaseCard>
      <div class="form-control">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" v-model="formData.firstName" />
      </div>
      <div class="form-control">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" v-model="formData.lastName" />
      </div>
      <div class="form-control">
        <label for="desc">Description</label>
        <textarea id="desc" rows="5" v-model="formData.description" />
      </div>
      <div class="form-control">
        <label for="rate">Hourly Rate</label>
        <input id="rate" type="number" v-model="formData.hourlyRate" />
      </div>
      <div class="form-control">
        <h3>Areas of Expertise</h3>
      </div>
      <div
        v-for="area in coachesStore.areasArray"
        :key="area"
        @change="handleCheckBoxChange"
      >
        <input type="checkbox" :id="area" :value="area" />
        <label :for="area">{{ area }}</label>
      </div>

      <BaseButton>Join Now</BaseButton>
    </BaseCard>
  </form>
</template>

<style scoped>
/* form {
  max-width: 650px;
  margin: 0 auto;
  padding: 10px;
} */

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
