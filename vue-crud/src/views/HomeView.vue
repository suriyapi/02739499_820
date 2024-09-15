<template>
  <div class="q-pa-md">
    <div class="q-py-md">
        <q-btn icon="add" @click="onCreate"/>
    </div>
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn icon="edit" @click="onEdit(props.row.customer_id)"/>
        <q-btn icon="delete" @click="onDelete(props.row.customer_id)"/>
      </q-td>
    </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router';

const columns = ref([
  { name: 'customer_id', align: 'center', label: 'customer_id', field: 'customer_id', sortable: true },
  { name: 'first_name', align: 'center', label: 'first_name', field: 'first_name', sortable: true },
  { name: 'last_name', align: 'center', label: 'last_name', field: 'last_name', sortable: true },
  { name: 'email', align: 'center', label: 'email', field: 'email', sortable: true },
  { name: 'address', align: 'center', label: 'address', field: 'address', sortable: true },
  { name: 'phone_number', align: 'center', label: 'phone_number', field: 'phone_number', sortable: true },
  { name: 'actions', align: 'center', label: 'id', field: 'id', sortable: true }
])

const rows = ref([])

const fetchData = () => {
  fetch('http://localhost:8800/api/v1/customers')
    .then(res => res.json())
    .then(result => {
      rows.value = result
    })
}
fetchData()

const onEdit = (id) => {
  alert('Edit: ' + id)
}


const onDelete = (id) => {
  alert('Delete: ' + id)
}


const onCreate = () => {
  router.push('/create')
}
</script>
