'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const result = await this.app.mysql.get('blog_content', {});
    this.ctx.body = result;
  }
  // 获取article表数据
  async getArticleList() {

    const sql = 'SELECT article.id as id,' +
   'article.title as title,' +
   'article.introduce as introduce,' +
   "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
   'article.view_count as view_count ,' +
   '.type.typeName as typeName ' +
   'FROM article LEFT JOIN type ON article.type_id = type.Id ORDER BY article.addTime DESC';

    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results,
    };
  }
  // 获取详情页数据
  async getArticleById() {
    // 先配置路由的动态传值，然后再接收值
    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    'article.article_content as article_content,' +
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
    'article.view_count as view_count ,' +
    'type.typeName as typeName ,' +
    'type.id as typeId ' +
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    'WHERE article.id=' + id;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }


  // 根据类别ID获得文章列表
  async getListById() {
    const id = this.ctx.params.id;
    const sql = `SELECT article.id as id,article.title as title,article.introduce as introduce,FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,article.view_count as view_count,
        type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = type.Id WHERE type_id=${id} ORDER BY article.addTime DESC`;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }


  async setListViewCountById() {
    const id = this.ctx.params.id;
    const sql = 'update article set view_count = (view_count + ?) where id = ?';
    const result = await this.app.mysql.query(sql, [ 1, id ]);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isScuccess: updateSuccess,
    };
  }
}

module.exports = HomeController;
