<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Add a new employee</h3>
    <form action="" @submit.prevent="addEmployee">
      <div class="mb-6">
        <input class="input"
               autofocus autocomplete="off"
               placeholder="Type an arist name"
               v-model="newEmployee.last_name" />
      </div>
      <input type="submit" value="Add Employee" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green hover:bg-green-dark block w-full py-4 text-white items-center justify-center" />
    </form>

    <hr class="border border-grey-light my-6" />

    <ul class="list-reset mt-4">
      <li class="py-4" v-for="employee in employees" :key="employee.id" :employee="employee">

        <div class="flex items-center justify-between flex-wrap">
          <p class="block flex-1 font-mono font-semibold flex items-center ">
            <svg class="fill-current text-indigo w-6 h-6 mr-2" viewBox="0 0 20 20" width="20" height="20"><title>employee</title><path d="M15.75 8l-3.74-3.75a3.99 3.99 0 0 1 6.82-3.08A4 4 0 0 1 15.75 8zm-13.9 7.3l9.2-9.19 2.83 2.83-9.2 9.2-2.82-2.84zm-1.4 2.83l2.11-2.12 1.42 1.42-2.12 2.12-1.42-1.42zM10 15l2-2v7h-2v-5z"></path></svg>
            {{ employee.last_name }}
          </p>

          <button class="bg-tranparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
                  @click.prevent="editEmployee(employee)">Edit</button>

          <button class="bg-transprent text-sm hover:bg-red text-red hover:text-white no-underline font-bold py-2 px-4 rounded border border-red"
                  @click.prevent="removeEmployee(employee)">Delete</button>
        </div>

        <div v-if="employee == editedEmployee">
          <form action="" @submit.prevent="updateEmployee(employee)">
            <div class="mb-6 p-4 bg-white rounded border border-grey-light mt-4">
              <input class="input" v-model="employee.last_name" />
              <input type="submit" value="Update" class=" my-2 bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 rounded cursor-pointer">
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Employees',
  data () {
    return {
      employees: [],
      newEmployee: [],
      error: '',
      editedEmployee: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      axios
        .get('/api/v1/employees')
        .then(response => { this.employees = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addEmployee () {
      const value = this.newEmployee
      if (!value) {
        return
      }
      axios
        .post('http://localhost:3000/api/v1/employees/', { employee: { name: this.newEmployee.last_name } })
        .then(response => {
          this.employees.push(response.data)
          this.newEmployee = ''
        })
        .catch(error => this.setError(error, 'Cannot create employee'))
    },
    removeEmployee (employee) {
      axios
        .delete(`http://localhost:3000/api/v1/employees/${employee.id}`)
        .then(response => {
          this.employees.splice(this.employees.indexOf(employee), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete employee'))
    },
    editEmployee (employee) {
      this.editedEmployee = employee
    },
    updateEmployee (employee) {
      this.editedEmployee = ''
      axios
        .patch(`http://localhost:3000/api/v1/employees/${employee.id}`, { employees: { title: employee.last_name } })
        .catch(error => this.setError(error, 'Cannot update employee'))
    }
  }
}
</script>
