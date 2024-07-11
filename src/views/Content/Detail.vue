<template>
  <div class="layui-container">
    <!-- 导航区域 -->
    <Panel />

    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8 content detail">
        <div class="fly-panel detail-box">
          <!-- 帖子标题 -->
          <h1>{{ page.title }}</h1>

          <!-- 帖子的标签 -->
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-if="page.catalog === 'ask'"
            >提问</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'share'"
            >分享</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'advise'"
            >建议</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'discuss'"
            >交流</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else-if="page.catalog === 'logs'"
            >动态</span>
            <span
              class="layui-badge layui-bg-green fly-detail-column"
              v-else
            >公告</span>

            <span
              class="layui-badge"
              style="background-color: #999;"
              v-if="page.isEnd === '0'"
            >未结</span>
            <span
              class="layui-badge"
              style="background-color: #5FB878;"
              v-else
            >已结</span>

            <span
              class="layui-badge layui-bg-black"
              v-if="page.isTop === '1'"
            >置顶</span>

            <span
              class="layui-badge layui-bg-red"
              v-for="(tag, index) in page.tags"
              :key="'tags' + index"
              :class="tag.class"
            >{{ tag.name }}</span>

            <div class="fly-admin-box" data-id="123">
              <span
                class="layui-btn layui-btn-xs jie-admin"
                type="del"
              >删除</span>

              <span
                class="layui-btn layui-btn-xs jie-admin"
                type="set"
                field="stick"
                rank="1"
              >置顶</span>
              <!-- <span
                class="layui-btn layui-btn-xs jie-admin"
                type="set"
                field="stick"
                rank="0"
                style="background-color:#ccc;"
              >取消置顶</span> -->

              <span
                class="layui-btn layui-btn-xs jie-admin"
                type="set"
                field="status"
                rank="1"
              >加精</span>
              <!-- <span
                class="layui-btn layui-btn-xs jie-admin"
                type="set"
                field="status"
                rank="0"
                style="background-color:#ccc;"
              >取消加精</span> -->
            </div>

            <span class="fly-list-nums">
              <a href="#comment">
                <i class="iconfont" title="回答">&#xe60c;</i> {{ page.answer }}
              </a>
              <i class="iconfont" title="人气">&#xe60b;</i> {{ page.reads }}
            </span>
          </div>

          <!-- 作者信息 -->
          <div class="detail-about">
            <a class="fly-avatar" href="../user/home.html">
              <img
                :src="page.user?.pic || '@/assets/img/bear-200-200.jpg'"
              />
            </a>
            <div class="fly-detail-user">
              <a href="../user/home.html" class="fly-link">
                <cite>{{ page.user?.name || 'test name' }} </cite>
                <i class="iconfont icon-renzheng" title="认证信息："></i>&nbsp;
                <i
                  class="layui-badge fly-badge-vip"
                  v-if="page.user?.isVip && page.user.isVip !== '0'"
                >VIP{{ page.user.isVip }}</i>
              </a>
              <span>{{ page.created | momentDate }}</span>
            </div>
            <div class="detail-hits">
              <span
                style="padding-right: 10px; color: #FF7200"
              >
                悬赏：{{ page.fav }} 积分
              </span>
            </div>
          </div>

          <!-- 编辑和收藏按钮 -->
          <div class="layui-btn-container fly-detail-admin pt1">
            <a href class="layui-btn layui-btn-sm jie-admin">编辑</a>
            <a href class="layui-btn layui-btn-sm jie-admin-collect">收藏</a>
          </div>

          <!-- 当前帖子内容 -->
          <div class="detail-body photos mt1" v-html="page.content"></div>
        </div>

        <!-- 回帖相关的内容 -->
        <div class="fly-panel detail-box" id="flyReply">
          <!-- 回帖标识 -->
          <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
            <legend>回帖</legend>
          </fieldset>

          <!-- 评论列表 -->
          <ul class="jieda" id="jieda">
            <li
              class="jieda-daan"
              v-for="(item, index) in comments"
              :key="item._id"
            >
              <div class="detail-about detail-about-reply">
                <a class="fly-avatar" href>
                  <img
                    :src="item.cuid?.pic || '@/assets/img/bear-200-200.jpg'"
                  />
                </a>
                <div class="fly-detail-user">
                  <a href class="fly-link">
                    <cite>{{ item.cuid?.name || 'test name' }} </cite>
                    <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>&nbsp;
                    <i
                      class="layui-badge fly-badge-vip"
                      v-if="item.cuid?.isVip && item.cuid.isVip !== '0'"
                    >VIP{{ item.cuid.isVip }}</i>
                  </a>

                  <span v-if="index === 0">(楼主)</span>
                  <!--
                    <span style="color:#5FB878">(管理员)</span>
                    <span style="color:#FF9E3F">（社区之光）</span>
                    <span style="color:#999">（该号已被封）</span>
                  -->
                </div>

                <div class="detail-hits">
                  <span>{{ item.created | momentDate }}</span>
                </div>

                <!-- <i class="iconfont icon-caina" title="最佳答案"></i> -->
              </div>

              <div class="detail-body jieda-body photos" v-html="item.content"></div>

              <!-- :class="[item.handed === '1' ? 'zanok' : '']" -->
              <div class="jieda-reply">
                <span
                  class="jieda-zan"
                  type="zan"
                  :class="[item.hands ? 'zanok' : '']"
                >
                  <i class="iconfont icon-zan"></i>
                  <em>{{ item.hands }}</em>
                </span>
                <span type="reply">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>
                <div class="jieda-admin">
                  <span type="edit">编辑</span>
                  <span type="del">删除</span>
                  <!-- <span class="jieda-accept" type="accept">采纳</span> -->
                </div>
              </div>
            </li>

            <!-- 无数据时 -->
            <li class="fly-none" v-if="!comments.length">消灭零回复</li>
          </ul>

          <!-- 分页组件 -->
          <pagination
            showType="icon"
            :hasSelect="true"
            :total="total"
            :currPage="currPage"
            :pageSize="pageSize"
            @changeCurrentPage="handleChangePage"
            @changePageSize="handleChangePageSize"
          />

          <!-- 书写评论区域 -->
          <div class="layui-form layui-form-pane">
            <form>
              <Editor @changeContent="handleChangeContent" />

              <!-- 验证码 -->
              <div class="layui-form-item">
                <validation-provider
                  name="code"
                  ref="codefield"
                  rules="required|code:6"
                  v-slot="{errors}"
                >
                  <div class="layui-row">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        name="code"
                        v-model="code"
                        placeholder="请输入验证码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class>
                      <span
                        class="svg"
                        style="color: #c00;"
                        @click="_getCaptcha()"
                        v-html="svg"
                      ></span>
                    </div>
                  </div>
                  <div class="layui-form-mid">
                    <span style="color: #c00;">{{ errors[0] }}</span>
                  </div>
                </validation-provider>
              </div>

              <!-- 提交评论按钮 -->
              <div class="layui-form-item">
                <button
                  class="layui-btn"
                  type="button"
                  @click="submit"
                >提交回复</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="layui-col-md4">
        <HotList></HotList>
        <Ads></Ads>
        <Links></Links>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from '@/components/sidebar/HotList'
import Ads from '@/components/sidebar/Ads'
import Links from '@/components/sidebar/Links'
import Panel from '@/views/Home/components/Panel.vue'
import Editor from '@/components/contents/Editor.vue'
import pagination from '@/components/pagination'

import CodeMix from '@/mixins/code'
import { escapeHtml } from '@/utils/escapeHtml'

import { getDetail } from '@/api/content'
import { getComments, addComment } from '@/api/comments'

export default {
  name: 'DetailCom',
  mixins: [CodeMix],
  props: ['tid'],
  components: {
    HotList,
    Ads,
    Links,
    Editor,
    Panel,
    pagination
  },
  data () {
    return {
      currPage: 1,
      total: 0,
      pageSize: 10,
      page: {},
      comments: [],
      content: ''
    }
  },
  mounted () {
    // console.log(this.$route.params.tid)
    this.getPostDetail()
    this.getCommentList()
  },
  methods: {
    handleChangePage (page) {
      this.currPage = page
    },
    handleChangePageSize (pageSize) {
      this.pageSize = pageSize
    },
    getPostDetail () {
      getDetail(this.tid).then(res => {
        if (res.code === 200) {
          if (res.data.content?.trim()) {
            res.data.content = escapeHtml(res.data.content)
          } else {
            res.data.content = '空空如也'
          }
          this.page = res.data
        }
      })
    },
    getCommentList () {
      getComments(this.tid).then(res => {
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
        }
      })
    },
    handleChangeContent (contentValue) {
      if (contentValue.trim()) {
        this.content = contentValue
      }
    },
    async submit () {
      const { valid } = await this.$refs.codefield.validate()
      if (!valid) {
        this.$pop('请先输入验证码', 'shake')
        return
      }

      const isLogin = this.$store.state.userInfo.token
      if (!isLogin) {
        this.$pop('请先进行登录', 'shake')
        return
      }

      if (!this.content.trim()) {
        this.$pop('请输入评论内容', 'shake')
        return
      }

      const res = await addComment({
        content: this.content,
        code: this.code,
        sid: this.$store.state.sid,
        tid: this.tid
      })
      console.log(res)
      if (res.code === 200) {
        this.$pop('发表评论成功')
      } else if (res.code === 401) {
        this.$pop(res.msg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fly-detail-admin {
  text-align: right;
  border-top: 1px dotted #eaeaea;
  background: #f8f8f8;
}

.fly-detail-info {
  span {
    margin-right: 5px;
  }
}

.jieda-body {
  margin: 25px 0 20px !important;
  min-height: 0;
  line-height: 24px;
  font-size: 14px;
}
</style>
