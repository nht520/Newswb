<template>
    <div id="Layout">
      <Header :newsTitle="title"></Header>
<!--      新闻列表-->
      <v-tabs
        dark
        color="white"
        show-arrows
      >
        <v-tabs-slider color="red"></v-tabs-slider>
        <v-tab
          v-for="(item,key) in titleList"
          :key="key"
          :href="'#tab-' + key"
          @click="tabChange(key)"
        >
           {{ item.dcCategoryName}}
        </v-tab>
      </v-tabs>
<!---->
      <v-container grid-list-xl text-xs-center  v-for="(item,key) in list">
        <router-link  :to="`/Details/`+item.id"    tag="li" :key="key">
          <v-layout row wrap class="newsimg" >
              <v-flex xs4 class="newstitle">
                <v-img
                  :src="newsImg(item.newsImgUrl)"
                ></v-img>
              </v-flex>
              <v-flex xs8>
                <h2 class="newstitle">{{item.newsTitle}}</h2>
                <v-layout row wrap >
                  <v-flex xs8 >
                    <span class="left">{{item.newsUpdateTime}}</span>
                  </v-flex>
                  <v-flex xs4>
                    <span class="right">  赞：{{item.newsPraiseCount}}</span>
                  </v-flex>
                </v-layout>
              </v-flex>
          </v-layout>
        </router-link>
      </v-container>
    </div>
</template>
<script>
  import Axios from "axios";
  import Header from "./Header/Header";
    export default {
        name: "Layout",
      components: {Header},
      data() {
          return {
            title:"首页",
            titleList:[],
            categoryId:0,
            list:[ ],
          }
        },
      methods:{
          //img地址拼接
          newsImg(url){
            return (window.g.urlImg+"/"+url);
          },
          //获取详情
          tabChange(key){
            // console.log(api+"=============")
            const aid = this.titleList[key].id;
            let param ={
                params:{
                  categoryId:aid
                }
            };
            const api = window.g.news.List;
            Axios.get(api,param).then((res)=>{
              console.log(res);
              this.list = res.data.records;
            },(err)=>{
              console.log(err)
            })
          },
          //获取分类
          newsTitle(){
            const that = this;
            const api = window.g.news.Classify;
            Axios.get(api).then((res)=>{
              that.titleList = res.data.records;
            },(err)=>{
              console.log(err)
            })
          },
          tabChangeone(){
            // console.log(api+"=============")
            let param ={
              params:{
                categoryId:1
              }
            };
            const api = window.g.news.List;
            Axios.get(api,param).then((res)=>{
              // console.log(res);
              this.list = res.data.records;
            },(err)=>{
              console.log(err)
            })
          },
      },
      mounted() {

          this.newsTitle();
          this.tabChangeone();
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .v-tabs__item
     color #000000
  .v-tabs__item--active
     color #f00
     font-weight bold
  .theme--dark.v-icon
     color #000000
  .content
     padding 3%
  .left
     float left
     font-size 12px
  .right
     float right
     font-size 12px
  .dtaitls
    width 100%
    height auto
  .newstitle
    text-align left
    font-weight bold
    line-height 18px
    font-size 14px
    display -webkit-box
    -webkit-box-orient vertical
    -webkit-line-clamp 2
    overflow hidden
  .newstitle .v-image
      width 100%
      height 66px
      border-radius 3px
  .newstitle .left
    text-align left
    font-size 12px
  .newstitle .right
    text-align right
    font-size 12px
</style>
