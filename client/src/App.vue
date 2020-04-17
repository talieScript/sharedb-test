<template>
  <v-app>
    <v-btn @click="menu = !menu" class="hambuger-btn" icon color="black">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-navigation-drawer
      v-model="menu"
      absolute
      temporary
    >
      <v-list-item>

      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-item
          v-for="item in []"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <fake-snapshot-form />
  </v-app>
</template>

<script>
import connection from '../connection'
import FakeSnapshotForm from './components/FakeSnapshotForm.vue';

export default {
  name: 'App',
  data() {
    return {
      results: '',
      idMatch: {},
      menu: true,
    }
  },
  components: {
    FakeSnapshotForm,
  },
  mounted () {
    const update = () => {
      this.idMatch = query.results.map(e => e).reduce((a, t) => ({ ...a, [t.data.uid]: { sid: t.id } }), {})
      this.results = query.results.map(e => e.data)
      console.log(this.results)
    }
    const query = connection.createSubscribeQuery('forms', { $sort: { uid: -1 } })
    query.on('ready', update)
    query.on('changed', update)
  },
  methods: {
    updateName (text, id) {
      id = this.idMatch[id].sid
      text = text.target.value
      var op = [ { p: [ 'name' ], oi: text } ]
      connection.get('forms', id).submitOp(op, function (err) {
        if (err) {
          console.error(err)
        }
      })
    },
  }
};
</script>

<style scoped>
.hambuger-btn {
  position: absolute;
  top: 20px;
  left: 20px;
}
</style>
