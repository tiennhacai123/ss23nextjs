<template>
  <v-dialog v-model="localIsOpen" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="text-h6">Thêm mới học sinh</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="newStudent.student_name"
            label="Tên sinh viên"
            :rules="[rules.required]"
            required
          />
          <v-text-field
            v-model="newStudent.email"
            label="Email"
            :rules="[rules.email]"
            required
          />
          <v-text-field v-model="newStudent.address" label="Địa chỉ" />
          <v-text-field
            v-model="newStudent.phone"
            label="Số điện thoại"
            :rules="[rules.phone]"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="green darken-1" text @click="submit">Thêm</v-btn>
        <v-btn color="red darken-1" text @click="close">Hủy</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from "vue";
import axios from "axios";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["update:isOpen", "close", "updated"]);

const localIsOpen = ref(props.isOpen);

watch(
  () => props.isOpen,
  (newVal) => {
    localIsOpen.value = newVal;
  }
);

watch(localIsOpen, (newVal) => {
  emit("update:isOpen", newVal);
});

const newStudent = ref({
  student_name: "",
  email: "",
  address: "",
  phone: "",
});

const rules = {
  required: (value) => !!value || "Trường này là bắt buộc!",
  email: (value) => {
    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
    return emailPattern.test(value) || "Email không hợp lệ!";
  },
  phone: (value) => {
    const phonePattern = /^[0-9]{10,12}$/;
    return phonePattern.test(value) || "Số điện thoại không hợp lệ!";
  },
};

const submit = async () => {
  try {
    await axios.post("http://localhost:3000/students", newStudent.value);
    emit("close");
    newStudent.value = {};
  } catch (error) {
    console.error("Error adding student:", error);
  }
  emit("updated");
};

const close = () => {
  emit("close");
  localIsOpen.value = false; // Close the dialog
};
</script>

<style scoped></style>
