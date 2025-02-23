<script setup lang="ts">
defineProps<{ item: { id: number; name: string; quantity: number } }>();
const emit = defineEmits(["edit-item", "delete-item"]);
</script>

<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>{{ item.name }} ({{ item.quantity }})</span>
    <div>
      <button class="btn btn-warning btn-sm me-2" @click="emit('edit-item', item)">Edit</button>
      <button class="btn btn-danger btn-sm" @click="emit('delete-item', item.id)">Delete</button>
    </div>
  </li>
</template>
