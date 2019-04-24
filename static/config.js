
const api = "http://23.105.214.157:9090/api";
const url = "http://192.168.5.2:9999/";
window.g = {
  imgapi:api,
  AXIOS_TIMEOUT: 10000,
  login:api+"/newsUser/login",
  register:api+"/newsUser/add",
  //添加评论
  commine:api+"/newsDiscuss/add",
  //查询评论
  find:api+"/newsDiscuss/find",
  //点赞：
  newsPraise:api+"/news/addNewsPraise",
  isPraise:api+"/newsPraise/isPraise",
  reduceNewsPraise:api+"/news/reduceNewsPraise",
  //举报
  newsReport:api+"/newsReport",
  urlImg:url+"img/news",
  news: {
    List: api+"/news", // ,
    info: api+"/news/info",
    Classify:api+"/newsCategory",
  },
};
