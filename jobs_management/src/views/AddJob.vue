<template>
  <div class="form-container">
    <h2>Nouvelle offre d'emploi</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Titre du poste *</label>
        <input v-model="newJob.titre" required>
      </div>
      
      <div class="form-group">
        <label>Description *</label>
        <textarea v-model="newJob.description" rows="5" required></textarea>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label>Salaire annuel *</label>
          <input v-model="newJob.salaire" required>
        </div>
        
        <div class="form-group">
          <label>Date de publication *</label>
          <input type="date" v-model="newJob['date de création']" required>
        </div>
      </div>
      
      <div class="form-group">
        <label>Expérience requise (années) *</label>
        <input type="number" v-model="newJob['année d’expériences']" min="0" required>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="submit-btn">Publier l'offre</button>
        <router-link to="/" class="cancel-btn">Annuler</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useJobStore } from '@/stores/jobStore'
import { useRouter } from 'vue-router'

const store = useJobStore()
const router = useRouter()

const newJob = ref({
  titre: '',
  description: '',
  salaire: '',
  'date de création': new Date().toISOString().split('T')[0],
  'année d’expériences': 0
})

const handleSubmit = () => {
  store.addJob({ 
    ...newJob.value,
    id: Date.now()
  })
  
  router.push('/')
}
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input, textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.form-actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.submit-btn {
  background: #42b983;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  padding: 0.8rem 1.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
}
</style>