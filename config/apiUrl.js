// const ipUrl = 'http://127.0.0.1:7001/default/'
const ipUrl = 'http://47.97.64.112:7001/default/'

const servicePath = {
    getArticleList: ipUrl + 'getArticleList',   // 首页文章列表接口
    getArticleById: ipUrl + 'getArticleById/',  // 文章详细页内容接口 ,需要接收参数
    getListById:ipUrl + 'getListById/',         // 根据类别ID获得文章列表  
    setListViewCountById: ipUrl + 'setListViewCountById/'   //设置文章浏览的次数
}

export default servicePath