<template>
  <div id="HeaderOne">
    <v-layout row wrap>
      <v-flex
        xs12
        sm12
        md6
      >
        <v-card color="grey lighten-4" flat >
          <v-toolbar class="elevation-0">
            <v-btn icon @click="goHome">
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>{{newsTitle}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: "HeaderOne",
    props:['newsTitle'],
    data(){
      return{
        class:"elevation-0"

      }
    },
    methods:{
      goHome(){
        this.$router.go(-1);//返回上一层
      }
    },
    mounted() {
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
 .theme--light.v-toolbar
  background #FFFFFF
</style>
