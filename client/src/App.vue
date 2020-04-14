<template>
  <div id="app">
    {{ results }} <br>
        <input type="text"
           name="words"
           text
           v-on:keyup='updateName($event, results.uid)'
           v-model="results.name">
  </div>
</template>

<script>
import connection from '../connection'

export default {
  name: 'App',
  data() {
    return {
      results: '',
      idMatch: {}
    }
  },
  mounted () {
    const update = () => {
      this.idMatch = query.results.map(e => e).reduce((a, t) => ({ ...a, [t.data.uid]: { sid: t.id } }), {})
      this.results = query.results.map(e => e.data)
    }
    const query = connection.createSubscribeQuery('players', { $sort: { uid: -1 } })
    query.on('ready', update)
    query.on('changed', update)
  },
  methods: {
    updateName (text, id) {
      id = this.idMatch[id].sid
      text = text.target.value
      var op = [ { p: [ 'name' ], oi: text } ]
      connection.get('players', id).submitOp(op, function (err) {
        if (err) {
          console.error(err)
        }
      })
  },
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
