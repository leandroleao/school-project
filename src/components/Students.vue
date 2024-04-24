<template>
  <content>
    <span class="text-h4 pa-5 d-inline-flex">Alunos</span>

    <v-btn class="float-right mt-5 mr-5" icon="mdi-plus" @click="isActive = true" color="surface-variant" size="small"
      variant="flat"></v-btn>

    <v-dialog v-model:="isActive" max-width="500">

      <v-card title="Adicionar Aluno">

        <v-card-actions>
          <v-spacer>
            <v-sheet class="mx-auto" width="300">
              <v-form @submit.prevent="onSubmit">
                <v-text-field v-model="formItems.name" :rules="[rules.required]" label="Nome"></v-text-field>
                <v-text-field v-model="formItems.email" :rules="[rules.required]" label="E-mail"></v-text-field>
                <v-text-field v-model="formItems.ra" :rules="[rules.required]" label="RA"></v-text-field>
                <v-text-field v-model="formItems.cpf" :rules="[rules.required]" label="CPF"></v-text-field>
                <component class="d-flex">
                  <v-btn class="mt-1 d-inline-flex flex-grow-1" type="submit"
                    @click.prevent="editCancel">Cancel</v-btn>
                  <v-btn class="mt-1 d-inline-flex flex-grow-1" type="submit">Submit</v-btn>
                </component>

              </v-form>
            </v-sheet>

          </v-spacer>
        </v-card-actions>
      </v-card>

    </v-dialog>

    <v-data-table-server v-model:items-per-page="itemsPerPage" :headers="headers" :items="serverItems"
      :items-length="totalItems" :loading="loading" item-value="name" @update:options="loadItems">
      <template v-slot:item.edit="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">
          mdi-pencil
        </v-icon>
      </template>
      <template v-slot:item.delete="{ item }">
        <v-icon size="small" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table-server>


    <v-dialog v-model:="deletedItemModal" max-width="500">
      <v-card class="mx-auto" max-width="450" :text="deletedItem.name + ' (' + deletedItem.ra + ')'"
        title="Deseja remover o aluno?">

        <template v-slot:actions>
          <v-btn height="48" @click="deletedItemCancel">
            Cancelar
          </v-btn>

          <v-btn :loading="loading" class="flex-grow-1" height="48" variant="tonal" @click="sendItemDelete">
            Apagar
          </v-btn>
        </template>
      </v-card>
    </v-dialog>


  </content>

</template>



<script>

import api from '../../server/api';

// const APIGET = {
//   async fetch({ page, itemsPerPage, sortBy }) {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         const start = (page - 1) * itemsPerPage
//         const end = start + itemsPerPage
//         const items = desserts.slice()

//         if (sortBy.length) {
//           const sortKey = sortBy[0].key
//           const sortOrder = sortBy[0].order
//           items.sort((a, b) => {
//             const aValue = a[sortKey]
//             const bValue = b[sortKey]
//             return sortOrder === 'desc' ? bValue - aValue : aValue - bValue
//           })
//         }

//         const paginated = items.slice(start, end)

//         resolve({ items: paginated, total: items.length })
//       }, 500)
//     })
//   },
// }

export default {
  data() {
    return {
      isActive: false,
      deletedItemModal: false,
      deletedItem: {},
      itemsPerPage: 5,
      students: [],
      serverItems: [],
      headers: [
        { title: 'ID', key: 'id', align: 'center' },
        { title: 'Name', key: 'name', align: 'end' },
        { title: 'E-mail', key: 'email', align: 'end' },
        { title: 'Registro Acadêmico', key: 'ra', align: 'end' },
        { title: 'CPF', key: 'cpf', align: 'end' },
        { title: 'Editar', key: 'edit', sortable: false, align: 'center' },
        { title: 'Apagar', key: 'delete', sortable: false, align: 'center' },
      ],
      rules: {
        required: value => !!value || 'Campo obrigatório',
      },
      formItems: {
        id: '',
        name: '',
        email: '',
        ra: '',
        cpf: ''
      }
    }
  },

  mounted() {
    this.loadItems();
  },

  methods: {

    onSubmit() {

      let _this = this;
      const insert = () => api.post('/api/insert',
        this.formItems)
        .then((res) => {
          _this.isActive = false;
          _this.loadItems();

        }).catch((error) => {
          console.log(error);
        });

      const edit = () => api.post('/api/edit',
        this.formItems)
        .then((res) => {
          console.log('res', res);
          _this.isActive = false;
          _this.loadItems();

        }).catch((error) => {
          console.log(error);
        });

      if (this.formItems.id) {
        console.log(this.formItems.id);
        edit();
      } else {
        insert();
      }
    },
    loadItems() {
      const std = () => api.get('api/students').then((res) => {

        this.serverItems = res.data.result
        this.totalItems = res.data.result.length
        this.loading = false
      }).catch((error) => {
        console.log(error);
      });

      std();
    },
    editItem(item) {
      this.formItems = JSON.parse(JSON.stringify(item));
      this.isActive = true;
    },
    editCancel(){
      this.formItems = {};
      this.isActive = false;
    },
    deleteItem(item) {
      this.deletedItemModal = true;
      this.deletedItem = JSON.parse(JSON.stringify(item));
    },
    deletedItemCancel() {
      this.deletedItemModal = false;
      this.deletedItem = {};
    },
    sendItemDelete() {
      
      let _this = this;

      const removeItem = () => api.post('/api/remove',
      _this.deletedItem)
        .then((res) => {
          console.log('res', res);
          _this.deletedItemModal = false;
          _this.deletedItem = {};
          _this.loadItems();

        }).catch((error) => {
          console.log(error);
        });

      removeItem();

    }
  },

}
</script>

<style></style>