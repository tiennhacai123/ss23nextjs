<template>
  <div>
    <h3>Quản lý học sinh</h3>
    <v-btn @click="openModal" color="primary">Thêm mới học sinh</v-btn>
    <div class="table-container">
      <table class="custom-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sinh viên</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Lựa chọn</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="student.id">
            <td>{{ index + 1 }}</td>
            <td>{{ student.student_name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.address }}</td>
            <td>{{ student.phone }}</td>
            <td>
              <v-btn class="bg-warning">Edit</v-btn>
              <v-btn @click="deleteUser(user.id)" class="bg-error">Delete</v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <AddStudentModal :isOpen="isModalOpen" @close="closeModal" />
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import AddStudentModal from './components/AddStudentModal.vue'; 

const students = ref([]);
const isModalOpen = ref(false);

// Fetch student data
const getData = async () => {
  const data = await axios.get("http://localhost:3000/students");
  students.value = data.data;
};


const deleteUser = async (id) => {
  await axios.delete(`http://localhost:3000/students/${id}`);
  getData();
}
onMounted(() => {
  getData();
});

// Open modal
const openModal = () => {
  isModalOpen.value = true;
};

// Close modal
const closeModal = () => {
  isModalOpen.value = false;
};
</script>

<style>
.table-container {
  margin: 20px 0;
  overflow-x: auto;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.custom-table th,
.custom-table td {
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: left;
}

.custom-table th {
  background-color: #6200ea; 
  color: #fff; 
  font-weight: bold;
}

.custom-table tr:nth-child(even) {
  background-color: #f2f2f2; 
}

.custom-table tr:hover {
  background-color: #e0e0e0; 
}

.custom-table td {
  color: #333; 
}

.custom-table td .v-btn {
  margin-right: 5px;
}

</style>
