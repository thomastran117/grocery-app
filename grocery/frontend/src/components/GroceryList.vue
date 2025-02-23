<script setup>
import { ref, onMounted } from "vue";
import GroceryItem from "./GroceryItem.vue";

const groceryList = ref([]);
const newItem = ref({ name: "", quantity: 1 });
const editingItem = ref(null);
const apiUrl = "http://localhost:5000/items";

const fetchItems = async () => {
  try {
    const response = await fetch(apiUrl);
    groceryList.value = await response.json();
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

const addItem = async () => {
  if (!newItem.value.name.trim()) return;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem.value),
    });
    const data = await response.json();
    groceryList.value.push(data);
    newItem.value = { name: "", quantity: 1 };
  } catch (error) {
    console.error("Error adding item:", error);
  }
};

const editItem = (item) => {
  editingItem.value = { ...item };
};

const updateItem = async () => {
  if (!editingItem.value) return;
  try {
    const response = await fetch(`${apiUrl}/${editingItem.value.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingItem.value),
    });
    const updatedItem = await response.json();
    
    const index = groceryList.value.findIndex(i => i.id === updatedItem.id);
    if (index !== -1) {
      groceryList.value[index] = updatedItem;
    }
    editingItem.value = null;
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

const deleteItem = async (id) => {
  try {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    groceryList.value = groceryList.value.filter(item => item.id !== id);
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

onMounted(fetchItems);
</script>

<template>
  <div class="app-container">
    <div class="content-box">
      <h1 class="text-center text-primary mb-4">Grocery List</h1>
      
      <div class="input-group mb-3">
        <input v-model="newItem.name" class="form-control" placeholder="Item Name" />
        <input v-model.number="newItem.quantity" type="number" min="1" class="form-control" placeholder="Quantity" />
        <button class="btn btn-primary" @click="addItem">Add Item</button>
      </div>
      
      <ul class="list-group">
        <GroceryItem 
          v-for="item in groceryList" 
          :key="item.id" 
          :item="item" 
          @edit-item="editItem" 
          @delete-item="deleteItem"
        />
      </ul>
      
      <div v-if="editingItem" class="edit-box">
        <h2 class="text-warning text-center">Edit Item</h2>
        <div class="input-group mb-3">
          <input v-model="editingItem.name" class="form-control" />
          <input v-model.number="editingItem.quantity" type="number" min="1" class="form-control" />
        </div>
        <div class="d-flex justify-content-between">
          <button class="btn btn-success" @click="updateItem">Save</button>
          <button class="btn btn-secondary" @click="editingItem = null">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  padding: 20px;
}

.content-box {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 12px;
  transition: 0.3s ease-in-out;
  background: #f8f9fa;
}
.list-group-item:hover {
  background: #dee2e6;
}

button {
  transition: 0.3s ease-in-out;
}
button:hover {
  opacity: 0.85;
}

.edit-box {
  background: #fff3cd;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}
</style>
