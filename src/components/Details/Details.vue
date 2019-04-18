<template>
    <div id="Details">
      <HeaderOne :newsTitle="title"></HeaderOne>
<!--      详情内容-->
      <div class="commentDateils">
        <v-layout class="DetailsContent">
          <v-flex xs12 sm6 offset-sm3>
            <h3 class="titleH3 mb-0">{{list.newsTitle}}</h3>
            <v-layout>
              <v-flex  xs6>
                <v-card-text class="px-0">{{list.newsUpdateTime}}</v-card-text>
              </v-flex>
              <v-flex  xs6>
                <v-card-text class="right">赞：{{list.newsPraiseCount}}</v-card-text>
              </v-flex>
            </v-layout>
            <v-img
              :src="src"
            ></v-img>
            <p> {{ list.newsContent }} </p>
          </v-flex>
        </v-layout>
        <!--      评论-->
        <v-layout class="NewsTitle">
          <v-flex xs12 order-lg2>
            <h2 class="titleH3 mb-0">
<!--              <v-btn icon>-->
<!--                <v-icon>favorite</v-icon>-->
<!--              </v-btn>-->
              | 热门评论</h2>
          </v-flex>
        </v-layout>
        <v-layout class="comment" v-for="item in findList">
<!--          <v-flex xs2 order-lg2>-->
<!--            <v-img-->
<!--              :src="src"-->
<!--            ></v-img>-->
<!--          </v-flex>-->
          <v-flex xs12>
            <h3 class="comtThree">{{item.newsUserId}}</h3>
            <p class="comtFor">{{item.newsDiscussInfo}}</p>
          </v-flex>
        </v-layout>
      </div>
<!--      输入评论-->
      <div class="pinglun">
        <v-toolbar
          color="red"
          dark
        >
          <v-layout class="comment">
            <v-flex xs8 >
              <v-text-field
                flat
                label="我来说两句"
                solo-inverted
                v-model="comment"
              >
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="dot">
               <span class="fabu"  @click="fabuChange">发布</span>
            </v-flex>
            <v-flex xs2 class="praise" @click="pinglun">
              <v-icon>favorite_bord</v-icon>
              <p style="text-align: center">点赞</p>
            </v-flex>
<!--            <v-flex xs2 class="praise" @click="report">-->
<!--              <v-icon>send</v-icon>-->
<!--              <p style="text-align: center">举报</p>-->
<!--            </v-flex>-->
          </v-layout>
        </v-toolbar>
      </div>
<!--      -->

    </div>
</template>

<script>
    import Header from "../Header/Header";
    import Carousels from "../Carousels/Carousels";
    import HeaderOne from "../Header/HeaderOne";
    import Axios from "axios";
    import storage from "../../../static/storage/storage";
    export default {
        name: "Details",
      components: {HeaderOne, Carousels, Header},
      data(){
          return{
            title:"详情",
            list:[],
            isPrais:false,
            findList:[],
            dialog: false,
            comment:"",
            src:require("../../../static/bj.jpg"),
            commtTitle:"用户昵称",
            commtDtait:"4555555555555555555555555555555555555ash; I'll be in your neighborhood doing errands this weekend. "
          }
        },
        methods:{
            //获取详情
            details(aid){
              let param ={
                params:{
                  id:aid
                }
              };
              const api = window.g.news.info;
              Axios.get(api,param).then((res)=>{
                this.list=res.data.records[0];
              },(err)=>{
                console.log(err)
              })
            },
            //查询评论（
            find(){
              var aid=this.$route.params.id;
              let param ={
                params:{
                  newsInfoId:aid,
                }
              };
              const api = window.g.find;
              Axios.get(api,param).then((res)=>{
                this.findList = res.data.records;
              },(err)=>{
                console.log(err)
              })
            },
            //提交评论
            fabuChange(){
              const userId = storage.get("user");
              console.log(this.list.id+"=====");
              console.log(this.comment+"___________");
              const param = new URLSearchParams();
                    param.append("newsUserId",userId.id);
                    param.append("newsInfoId",this.list.id);
                    param.append("newsDiscussInfo",this.comment);
              const api = window.g.commine;
              Axios.post(api,param).then((res)=>{
                this.find();
                // console.log(res);
              },(err)=>{
                console.log(err)
              })
            },
           //点赞
           pinglun(){

              if(this.isPrais === false){
                var aid=this.$route.params.id;
                const userId = storage.get("user");
                let param ={
                  params:{
                    id:aid,
                    userId:userId.id,
                  }
                };
                const api = window.g.newsPraise;
                Axios.get(api,param).then((res)=>{
                  console.log(res)
                },(err)=>{
                  console.log(err)
                })
              }else {
                this.reduceNewsPraise()
              }
           },
          //取消
          reduceNewsPraise(){
             var aid = this.$route.params.id;
             const userid = storage.get("user");
             let param = {
                 params:{
                   id:aid,
                   userid:userid.id,
                 }
             };
            const api = window.g.reduceNewsPraise;
            Axios.get(api,param).then((res)=>{
              console.log(res+"----")
            },(err)=>{
              console.log(err)
            })
          },
        //  是否点赞
          isPraise(){
            var aid=this.$route.params.id;
            const userId = storage.get("user");
            let param ={
              params:{
                newsId:aid,
                userId:userId.id,
              }
            };
            const api = window.g.isPraise;
            Axios.get(api,param).then((res)=>{
              console.log(res);
              this.isPrais=res.data.data;
            },(err)=>{
              console.log(err)
            })
          },
        //   举报
          report(){
            const userId = storage.get("user");
            var aid=this.$route.params.id;
             const param = new URLSearchParams();
                   param.append("reportContent");
                   param.append("reportNewsId",aid);
                   param.append("reportUserId",userId.id);
            Axios.post(api).then((res)=>{
              console.log(res)
            },(err)=>{
              console.log(err)
            })
          }
        },
        mounted() {
          const aid = this.$route.params.id;
          this.details(aid);
          this.find();
          this.isPraise();
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" >
  .commentDateils
   padding 3%
   margin-bottom 65px
  .DetailsContent .v-image
   height 150px
  /*.dialogModel .v-dialog__content*/
  /* background #00000087*/
  & .titleH3
   font-weight bold
   font-size 18px
  & .v-image__image
     width 100%
  & h3
    margin 2% 0%
  & p
    line-height 25px
    text-align left
    font-size 14px
    margin 3% 0%
  .right
    text-align right
  .banner .v-carousel
   height 180px !important
/*  评论*/
  .NewsTitle
   margin 3% 0% 5% 0%
  .comment .v-image
   width 40px
   height 40px
   border-radius 100%
  & .comtThree
    font-weight bold
  .comment
    padding 2% 0% 0% 0%
  .comment .comtFor
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 2
      line-height 20px
      color #505050
      overflow hidden
  & .v-input__slot
    margin-bottom 0px
  & .praise
    padding-left 6%
    padding-top 1%
  .praise .v-icon
    color #FFFFFF !important

  & .dot
    background #FFFFFF
    line-height 48px
    height: 48px;
    text-align center
  & .fabu
    color red
  .pinglun
    position fixed
    bottom 0px
    width 100%

</style>
