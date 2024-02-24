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

const inputErrors = ref({
  firstName: "",
  lastName: "",
  description: "",
  hourlyRate: "",
  areas: "",
});

const resetInputErrors = () => {
  inputErrors.value = {
    firstName: "",
    lastName: "",
    description: "",
    hourlyRate: "",
    areas: "",
  };
};

const handleRateChange = (event) => {
  const value = Number(event.target.value);
  formData.value.hourlyRate = value;
};

const handleCheckBoxChange = (event) => {
  const id = event.target.id;
  const isChecked = event.target.checked;

  if (isChecked) {
    formData.value.areas.val = [id, ...formData.value.areas];
  }
};

const validateInput = (id, val, text) => {
  if (typeof val === "string") {
    if (
      formData.value[id].length < 4 ||
      formData.value[id] === null ||
      formData.value[id] === ""
    ) {
      inputErrors.value[id] = `${text} should be at least 4 characters long`;
      return false;
    }
  }

  if (typeof val === "number" || typeof val === "object") {
    if (formData.value[id] < 0 || !formData.value[id]) {
      inputErrors.value[id] = `${text} must be at least 10 Euros an hour`;
      return false;
    }
  }

  resetInputErrors();
  return true;
};

const handleOnBlur = (event) => {
  // get the parentNode, label inner text, input id, input value;
  const parentNode = event.target.parentNode;
  const inputLabel = event.target.previousElementSibling.innerText;
  const id = event.target.id;
  const value = formData.value[id];
  // validate the input
  const isValid = validateInput(id, value, inputLabel);
  // check validation and necessary class lists;
  if (!isValid) {
    // if invalid => add invalid class list and return from function;
    parentNode.classList.add("invalid");
    return;
  }
  parentNode.classList.remove("invalid");
};

const handleSubmit = () => {
  if (formData.value.areas.length === 0) {
    inputErrors.value.areas =
      "You to choose at least one of the areas of expertise";
    return;
  }
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
        <p v-if="inputErrors.firstName.length > 0">
          {{ inputErrors.firstName }}
        </p>
      </div>
      <div class="form-control">
        <label for="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          v-model.trim="formData.lastName"
          @blur="handleOnBlur"
        />
        <p v-if="inputErrors.lastName.length > 0">
          {{ inputErrors.lastName }}
        </p>
      </div>
      <div class="form-control">
        <label for="description">Description</label>
        <textarea
          id="description"
          rows="5"
          v-model.trim="formData.description"
          @blur="handleOnBlur"
        />
        <p v-if="inputErrors.description.length > 0">
          {{ inputErrors.description }}
        </p>
      </div>
      <div class="form-control">
        <label for="hourlyRate">Hourly Rate</label>
        <input
          id="hourlyRate"
          type="number"
          :value="formData.hourlyRate"
          @change="handleRateChange"
          @blur="handleOnBlur"
        />
        <p v-if="inputErrors.hourlyRate > 0">
          {{ inputErrors.hourlyRate }}
        </p>
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
      <p v-if="inputErrors.areas.length > 0" style="color: red">
        {{ inputErrors.areas }}
      </p>
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

.invalid label,
.invalid p {
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
