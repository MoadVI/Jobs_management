<template>
  <div class="home">
    <div class="header">
      <h1>Emplois Disponibles</h1>
      <button @click="router.push('/jobs/add')" class="add-button">+ Ajouter un emploi</button>
    </div>
    
    <FilterNav @filter-change="updateFilter" @search="updateSearch" />
    
    <div class="job-list">
      <div v-for="job in filteredJobs" :key="job.id" class="job-item">
        <router-link :to="`/jobs/${job.id}`" class="job-link">
          <h3>{{ job.titre }}</h3>
          <p class="salary">{{ job.salaire }}</p>
          <p class="date">Posté le: {{ formatDate(job['date de création']) }}</p>
        </router-link>
        <div class="actions">
          <button @click="handleEdit(job.id)" class="edit-btn">Modifier</button>
          <button @click="handleDelete(job.id)" class="delete-btn">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useJobStore } from '@/stores/jobStore'
import FilterNav from '@/components/FilterNav.vue'

const router = useRouter()
const store = useJobStore()

const filter = ref('all')
const searchQuery = ref('')

const filteredJobs = computed(() => {
  let jobs = store.jobs.value

  if (filter.value === 'recent') {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - 7)
    jobs = jobs.filter(job => 
      new Date(job['date de création']) >= cutoffDate
    )
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    jobs = jobs.filter(job => 
      job.titre.toLowerCase().includes(query) ||
      job.salaire.toLowerCase().includes(query)
    )
  }

  return jobs
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

const updateFilter = (newFilter) => {
  filter.value = newFilter
}

const updateSearch = (query) => {
  searchQuery.value = query
}

const handleEdit = (jobId) => {
  router.push(`/jobs/edit?id=${jobId}`)
}

const handleDelete = (jobId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet emploi ?')) {
    store.deleteJob(jobId)
  }
}
</script>

<style scoped>
.home {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f8f9fa;
  min-height: 100vh;
  color: #333;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: #333;
  font-weight: 600;
}

.add-button {
  background: #4CAF50;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.add-button:hover {
  background: #45a049;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.job-list {
  display: grid;
  gap: 1.5rem;
}

.job-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid #e9ecef;
}

.job-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.1);
}

.job-link {
  text-decoration: none;
  color: inherit;
}

.job-link h3 {
  color: #333;
  margin-bottom: 0.5rem;
}

.salary {
  color: #2e7d32;
  font-weight: 600;
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.date {
  color: #6c757d;
  font-size: 0.9rem;
}

.actions {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

.edit-btn {
  background: #1976D2;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.edit-btn:hover {
  background: #1565C0;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.delete-btn {
  background: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  background: #c82333;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>

