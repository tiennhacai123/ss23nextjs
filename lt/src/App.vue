<template>
  <div>
    <h2>API Axios</h2>
    <ul v-for="user in users" :key="user.id">
      <li>{{ user.id }}</li>
      <li>{{ user.name }}</li>
      <li>
        <span><button @click="deleteUser(user.id)">Delete</button></span>
        <span><button @click="updateUser(user.id)">Update</button></span>
      </li>
    </ul>

    <input type="text" name="" id="" v-model="inputValue">
    <button @click="addUser">Them user</button>

    <select name="" id="" @change="handleChange">
      <option value="ASD">A-Z</option>
      <option value="DESC">Z-A</option>
    </select>

    <!-- <input type="text" name="" id="" v-model="inputValue" />
    <button @click="findByNameUser">Tim kiem</button> -->
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
// ham lay tat ca users

const users = ref([]);
const inputValue = ref("");
const getUsers = async () => {
  let res = await axios.get("http://localhost:3000/users");
  console.log(res.data);
  users.value = res.data;
};
onMounted(() => {
  getUsers();
});
const addUser = async () => {
  let newUser = {
    name: inputValue.value,
  };
  await axios.post("http://localhost:3000/users", newUser);
  getUsers();
};

const deleteUser = async (id) => {
  await axios.delete(`http://localhost:3000/users/${id}`);
  getUsers();
};

const updateUser = async (id) => {
  const updatePeople = {
    name: "tien dep trai",
  };
  await axios.patch(`http://localhost:3000/users/${id}`, updatePeople);
  getUsers();
};
// PATCH la cập nhạt 1 hoặc nhiều trường,
//Put là cập nhật toàn bộ

const handleChange = async (event) => {
  console.log("gia tri chon", event.target.value);
  //viet API de sap xep users
  let data = await axios.get(
    `http://localhost:3000/users?_sort=name&_order=${event.target.value}`
  );
  console.log(data);
  users.value = data.data;
};

const findByNameUser = async () => {
  console.log(inputValue.value);
  // API tim kiem
  const res = await axios.get(
`http://localhost:3000/users?name_like=${inputValue.value}`
);
  console.log(res.data);
};
</script>

<style></style>
