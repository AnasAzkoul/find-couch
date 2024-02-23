<script setup>
import { ref } from "vue";
import { useCoachesStore } from "../../stores/coachesStore";
import router from "../../router";
import BaseButton from "../ui/BaseButton.vue";
import BaseCard from "../ui/BaseCard.vue";

const coachesStore = useCoachesStore();

const formData = ref({
  firstName: "",
  lastName: "",
  description: "",
  hourlyRate: null,
  areas: [],
});

const handleCheckBoxChange = (event) => {
  const id = event.target.id;
  const isChecked = event.target.checked;

  if (isChecked) {
    formData.value.areas.val = [id, ...formData.value.areas];
  }
};

const validateInput = (id, value) => {
  if (typeof value === "string") {
    if (
      formData.value[id].length < 4 ||
      formData.value[id] === null ||
      formData.value[id] === ""
    ) {
      return false;
    }
  }

  if (typeof value === "number") {
    if (formData.value[id] < 0 || !formData.value[id]) {
      return false;
    }
  }

  return true;
};

const handleOnBlur = (event) => {
  const parentNode = event.target.parentNode;
  const isValid = validateInput(event.target.id, event.target.value);
  if (!isValid) {
    parentNode.classList.add("invalid");
    return;
  }
  parentNode.classList.remove("invalid");
};

const handleSubmit = () => {
  formData.value["id"] = new Date().toISOString();
  coachesStore.registerNewCoach(formData.value);
  router.replace("/coaches");
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <BaseCard>
      <div class="form-control">
        <label for="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          v-model.trim="formData.firstName"
          @blur="handleOnBlur"
        />
      </div>
      <div class="form-control">
        <label for="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          v-model.trim="formData.lastName"
          @blur="handleOnBlur"
        />
      </div>
      <div class="form-control">
        <label for="desc">Description</label>
        <textarea id="desc" rows="5" v-model.trim="formData.description" />
      </div>
      <div class="form-control">
        <label for="rate">Hourly Rate</label>
        <input id="rate" type="number" v-model.number="formData.hourlyRate" />
      </div>
      <div class="form-control">
        <h3>Areas of Expertise</h3>
      </div>
      <div v-for="area in coachesStore.areasArray" :key="area">
        <input
          type="checkbox"
          :id="area"
          :value="area"
          @change="handleCheckBoxChange"
        />
        <label :for="area">{{ area }}</label>
      </div>

      <BaseButton>Join Now</BaseButton>
    </BaseCard>
  </form>
</template>

<style scoped>
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
/* .valid label {
  color: green;
}

.valid input,
.valid textarea {
  border: 1px solid green;
} */
</style>
