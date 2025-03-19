<template>
    <div class="filter-nav">
      <div class="search-container">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Rechercher un job..."
          @input="handleSearch"
        >
      </div>
      <div class="filter-buttons">
        <button @click="setFilter('all')">Tous</button>
        <button @click="setFilter('recent')">Récents</button>
      </div>
    </div>
  </template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['filter-change', 'search'])

const searchQuery = ref('')

const setFilter = (filter) => {
  emit('filter-change', filter)
}

const handleSearch = () => {
  emit('search', searchQuery.value)
}
</script>

<style scoped>
.filter-nav {
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid #e9ecef;
}

.search-container {
  width: 100%;
}

.search-container input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: white;
  color: #333;
}

.search-container input::placeholder {
  color: #6c757d;
}

.search-container input:focus {
  outline: none;
  border-color: #1976D2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  background-color: white;
}

.filter-buttons {
  display: flex;
  gap: 0.8rem;
}

button {
  padding: 0.6rem 1.2rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  color: #495057;
}

button:hover {
  background-color: #f8f9fa;
  border-color: #1976D2;
  color: #1976D2;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

button:active {
  transform: translateY(0);
}
</style>
