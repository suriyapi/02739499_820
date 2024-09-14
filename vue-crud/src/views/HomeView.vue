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
        <q-btn icon="mode_edit" @click="onEdit(props.row.customer_id)"/>
        <q-btn icon="delete" @click="onDelete(props.row.customer_id)"/>
      </q-td>

    </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';

const columns = ref([
  
  { name: 'customer_id', align: 'left', label: 'customer_id', field: 'customer_id', sortable: true },
  { name: 'first_name', align: 'left', label: 'first_name', field: 'first_name', sortable: true },
  { name: 'last_name', align: 'left', label: 'last_name', field: 'last_name', sortable: true },
  { name: 'email', align: 'left', label: 'email', field: 'email', sortable: true },
  { name: 'address', align: 'left', label: 'address', field: 'address', sortable: true },
  { name: 'phone_number', align: 'left', label: 'phone_number', field: 'phone_number', sortable: true },
  { name: 'actions', align: 'left', label: 'id', field: 'id', sortable: true }
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
  router.push('/update/'+id)
}

const onDelete = (id) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "DELETE",  // ใช้ DELETE method
    headers: myHeaders,
    redirect: "follow"
  };

  fetch(`http://localhost:8800/api/v1/customers/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      alert(result.message)
      console.log(result)
      if (result.status === 'ok') {
        // ถ้าลบสำเร็จ ให้รีเฟรชหรือไปยังเส้นทางอื่น
        router.push('/')
      }
      fetchData()
    })
    .catch((error) => console.error('Error:', error));
};


const onCreate = () => {
  router.push('/create')
}
</script>