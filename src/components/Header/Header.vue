<template>
    <div id="Header">
      <v-layout row wrap>
        <v-flex
          xs12
          sm12
          md6
        >
          <v-card color="grey lighten-4" flat >
            <v-toolbar class="elevation-0" >
              <v-toolbar-side-icon></v-toolbar-side-icon>
              <v-toolbar-title>{{newsTitle}}</v-toolbar-title>
              <v-spacer></v-spacer>
<!--              <v-btn icon>-->
<!--                <v-icon>favorite</v-icon>-->
<!--              </v-btn>-->
              <v-btn icon>
                <v-icon @click="removerUsram">more_vert</v-icon>
              </v-btn>
            </v-toolbar>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
</template>

<script>
    import storage from "../../../static/storage/storage"
    export default {
        name: "Header",
        props:['newsTitle'],
        data(){
          return{
            class:"elevation-0"

          }
        },
        methods:{
          removerUsram(){
            storage.remove("user");
            this.$router.push({path:"/"})
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .theme--light.v-toolbar
    background #FFFFFF
</style>
