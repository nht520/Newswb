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
              :src="newsImg(list.newsImgUrl)"
            ></v-img>
            <p> {{ list.newsContent }} </p>
          </v-flex>
        </v-layout>
<!--        赞举报-->
        <v-layout class="report" >
          <v-flex flex xs3 offset-xs7  @click="pinglun" >
            <v-icon class="praIse" :class="yanse">favorite</v-icon>
            {{praise}}
          </v-flex>
          <v-flex flex xs2  >
            <v-icon>favorite</v-icon>
            <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on }">
              <v-btn class="inform" color="writh" dark v-on="on">举报</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">请输入你的不满</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                    <v-text-field
                      v-model="dissatisfied"
                      label="请输入你的不满"
                    ></v-text-field>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="dialog = false">关闭</v-btn>
                <v-btn color="blue darken-1" flat @click="dialogSubmit">提交</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
            <h3 class="comtThree">{{item.userName}}</h3>
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
            <v-flex xs12 >
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
            yanse:"gray",
            list:[],
            isPrais:false,
            findList:[],
            dialog: false,
            dissatisfied:"",
            praise:"",
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
            //img地址拼接
            newsImg(url){
              return (window.g.urlImg+"/"+url);
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
                console.log("+++++++++++++")
                console.log(res)
                this.findList = res.data.records;
              },(err)=>{
                console.log(err)
              })
            },
            //提交评论
            fabuChange(){
              const userId = storage.get("user");
              const param = new URLSearchParams();
                    param.append("newsUserId",userId.id);
                    param.append("newsInfoId",this.list.id);
                    param.append("newsDiscussInfo",this.comment);
              const api = window.g.commine;
              this.comment= undefined;
              Axios.post(api,param).then((res)=>{
                this.find();
                // console.log(res);
              },(err)=>{
                console.log(err)
              })
            },
           //举报
          dialogSubmit(){
              const userId = storage.get("user");
              const newsId = this.$route.params.id;
              const api = window.g.newsReport;
              const prams= new URLSearchParams();
                    prams.append("reportContent",this.dissatisfied);
                    prams.append("reportNewsId",newsId);
                    prams.append("reportUserId",userId.id);
                    Axios.post(api,prams).then((res)=>{
                       if (res.data.status === "ok"){
                         this.dialog = false
                       }
                    }).catch((err)=>{
                       console.log(err);
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
                  this.isPraise();
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
              this.isPraise();
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
              if ( res.data.data === true){
                  this.yanse="redGray";
                  this.praise="取消"
              }else {
                this.yanse="gray";
                this.praise="点赞"
              }
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
  .headline
   font-size 18px !important
  .inform
    margin 0 !important
    min-width 0 !important
    padding 0 !important
    height 0 !important
    color #212121 !important
    box-shadow none !important
    vertical-align initial
  .titleH3
   font-weight bold
   font-size 18px
  .inform .v-image__image
     width 100%
  .inform h3
    margin 2% 0%
  .DetailsContent p
    line-height 25px
    text-align left
    font-size 14px
    margin 3% 0%
  .report .v-icon
    font-size 17px
  .gray
    color #cccccc
  .redGray
    color #f00 !important
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
  .comtFor
      display -webkit-box
      -webkit-box-orient vertical
      -webkit-line-clamp 2
      line-height 20px
      margin 3% 0%
      color #000000
      overflow hidden
  .comment .v-input__slot
    margin-bottom 0px
  .comment  .praise
    padding-left 6%
    padding-top 1%
  .praise .v-icon
    color #FFFFFF !important
  .comment  .dot
    background #FFFFFF
    line-height 48px
    height: 48px;
    text-align center
  .comment  .fabu
    color red
  .pinglun
    position fixed
    bottom 0px
    width 100%

</style>
