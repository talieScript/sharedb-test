<template>
    <v-form>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Vessel Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Vessel Name"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
</template>

<script lang="ts">
    import Vue from 'vue'

    export default Vue.extend({
        name: 'fake-snapshot-form'
    })
</script>

<style scoped>

</style>