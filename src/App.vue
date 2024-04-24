<template>
  <v-app>
    <v-main>
      <v-app-bar :elevation="2">
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click.stop="show = !show"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Escola</v-app-bar-title>
      </v-app-bar>
      <v-navigation-drawer v-model="show">
        <v-list-item link  @click="changeCurrentContent('Index')" title="Inicio"></v-list-item>
        <v-divider></v-divider>
        <v-list-item title="Cadastros"></v-list-item>
        <v-divider></v-divider>
        <v-list-item class="pl-10" link @click="changeCurrentContent('Students')" title="Alunos"></v-list-item>
        <!-- <v-list-item class="pl-10" link title="Professores"></v-list-item>
        <v-list-item class="pl-10" link title="Turmas"></v-list-item> -->
      </v-navigation-drawer>
      <div flex>
          <component :is="currentContent"></component>
      </div>

    </v-main>
  </v-app>
</template>

<script  lang="ts">
import { defineComponent } from 'vue'
import Index from './components/Index.vue'
import Students from './components/Students.vue'

export default defineComponent({

  data() {
    return {
      show: true,
      currentContent: 'Index'
    }
  },
  methods: {
    changeCurrentContent (current:string) {
        this.currentContent = current;
    }
  },
  components: {
    Index,
    Students
  }
})
</script>
