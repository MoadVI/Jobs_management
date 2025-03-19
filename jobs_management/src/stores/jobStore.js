import { ref } from 'vue'
import initialJobs from '@/assets/4-TP-Jobs-app.json'

const jobs = ref(initialJobs)

const addJob = (job) => {
  job.id = jobs.value.length ? Math.max(...jobs.value.map(j => j.id)) + 1 : 1
  jobs.value.push(job)
}

const deleteJob = (jobId) => {
  jobs.value = jobs.value.filter(job => job.id !== jobId)
}

const updateJob = (updatedJob) => {
  const index = jobs.value.findIndex(job => job.id === updatedJob.id)
  if (index !== -1) {
    jobs.value[index] = updatedJob
  }
}

export function useJobStore () {
  return { jobs, addJob, deleteJob, updateJob }
}
