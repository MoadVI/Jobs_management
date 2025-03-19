<template>
  <div class="job-detail-container">
    <div v-if="job" class="job-detail">
      <h2>{{ job.titre }}</h2>
      <div class="meta-info">
        <span class="salary">{{ job.salaire }}</span>
        <span class="date">Posté le: {{ formatDate(job['date de création']) }}</span>
        <span class="experience">{{ job['année d’expériences'] }} ans d'expérience</span>
      </div>
      
      <h3>Description du poste</h3>
      <p class="description">{{ job.description }}</p>
      
      <div class="actions">
        <button @click="handleEdit" class="edit-btn">Modifier l'offre</button>
        <button @click="handleDelete" class="delete-btn">Supprimer l'offre</button>
      </div>
    </div>
    <div v-else class="not-found">
      <h2>Offre d'emploi non trouvée</h2>
      <router-link to="/">Retour à la liste</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useJobStore } from '@/stores/jobStore'

const route = useRoute()
const router = useRouter()
const store = useJobStore()
const job = ref(null)

onMounted(() => {
  const jobId = parseInt(route.params.id)
  job.value = store.jobs.value.find(j => j.id === jobId)
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fr-FR', options)
}

const handleEdit = () => {
  router.push(`/jobs/edit?id=${job.value.id}`)
}

const handleDelete = () => {
  if (confirm('Êtes-vous sûr de vouloir supprimer définitivement cette offre ?')) {
    store.deleteJob(job.value.id)
    router.push('/')
  }
}
</script>

<style scoped>
.job-detail-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
}

.job-detail {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.meta-info {
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
  color: #666;
}

.description {
  line-height: 1.6;
  margin: 1.5rem 0;
}

.actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
}

.not-found {
  text-align: center;
  padding: 4rem;
}
</style>