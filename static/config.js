
const api = "http://192.168.5.41:9090/api";
window.g = {
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
  news: {
    List: api+"/news", // ,
    info: api+"/news/info",
    Classify:api+"/newsCategory",
  },
};
