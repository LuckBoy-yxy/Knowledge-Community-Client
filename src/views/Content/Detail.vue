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
            <RouterLink
             class="layui-btn layui-btn-sm jie-admin"
             :to="{ name: 'edit', params: { tid: tid, page } }"
             v-if="page.isEnd === '0'"
            >编辑</RouterLink>
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

                <i
                  class="iconfont icon-caina"
                  title="最佳答案"
                  v-if="item.isBest === '1'"
                ></i>
              </div>

              <!-- <div class="detail-body jieda-body photos" v-html="item.content"></div> -->
              <div
                class="detail-body jieda-body photos"
                v-richText="item.content"
              ></div>

              <!-- :class="[item.handed === '1' ? 'zanok' : '']" -->
              <div class="jieda-reply">
                <span
                  class="jieda-zan"
                  type="zan"
                  :class="[item.handed === '1' ? 'zanok' : '']"
                  @click="handleClickHand(item)"
                >
                  <i class="iconfont icon-zan"></i>
                  <em>{{ item.hands }}</em>
                </span>

                <span type="reply" @click="reply(item)">
                  <i class="iconfont icon-svgmoban53"></i>
                  回复
                </span>

                <div class="jieda-admin">
                  <span
                    v-if="page.isEnd === '0' && item.cuid?._id === user._id"
                    @click="edit(item)"
                  >编辑</span>
                  <!-- <span>删除</span> -->
                  <span
                    class="jieda-accept"
                    v-if="page.user?._id === user._id && page.isEnd === '0'"
                    @click="setBest(item)"
                  >采纳</span>
                </div>
              </div>
            </li>

            <!-- 无数据时 -->
            <li class="fly-none" v-if="!comments.length">消灭零回复</li>
          </ul>

          <!-- 分页组件 -->
          <pagination
            v-if="comments.length"
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
              <validation-observer ref="observer">
                <Editor
                  @changeContent="handleChangeContent"
                  :initContent="content"
                />

                <!-- 验证码 -->
                <div class="layui-form-item">
                  <validation-provider
                    name="code"
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
              </validation-observer>
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
import { scollToElem } from '@/utils/common'

import { getDetail } from '@/api/content'
import {
  getComments,
  addComment,
  updateComment,
  setBestComment,
  setHands
} from '@/api/comments'

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
      content: '',
      cid: '',
      currentComment: {}
    }
  },
  mounted () {
    // console.log(this.$route.params.tid)
    this.getPostDetail()
    this.getCommentList()
    // window.vue = scollToElem
  },
  methods: {
    handleChangePage (options) {
      this.currPage = options.page
      if (options.flag) this.getCommentList()
    },
    handleChangePageSize (pageSize) {
      this.pageSize = pageSize
      this.getCommentList()
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
      getComments({
        page: this.currPage - 1,
        pageSize: this.pageSize,
        tid: this.tid
      }).then(res => {
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
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
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
      if (this.$store.state.userInfo.status !== '0') {
        this.$pop('当前用户已经被禁言, 请联系管理员')
      }

      let res
      const user = this.$store.state.userInfo
      const cuid = {
        _id: user._id,
        name: user.name,
        pic: user.pic,
        isVip: user.isVip
      }
      if (typeof this.cid !== 'undefined' && this.cid !== '') {
        if (this.currentComment.content === this.content) {
          this.$pop('未检测到内容变化')
          return
        }

        updateComment({
          cid: this.cid,
          content: this.content,
          code: this.code,
          sid: this.$store.state.sid
        }).then(res => {
          if (res.code === 200) {
            this.$pop('更新评论成功')
            res.data.cuid = cuid
            this.comments.splice(this.comments.indexOf(this.currentComment), 1, res.data)
          }
        })
      } else {
        res = await addComment({
          content: this.content,
          code: this.code,
          sid: this.$store.state.sid,
          tid: this.tid
        })
        if (res.code === 200) {
          this.$pop('发表评论成功')
          res.data.cuid = cuid
          this.comments.push(res.data)
          this.total = this.comments.length + 1
        }
      }
      if (res.code === 401) {
        this.$pop(res.msg)
        return
      }
      this.code = ''
      this.content = ''
      // requestAnimationFrame(() => {
      //   this.$refs.observer && this.refs.observer.reset()
      // })
      this._getCaptcha()
    },
    edit (comment) {
      this.content = comment.content
      scollToElem('.layui-input-block', 1000, -70)
      document.getElementById('editContent').focus()
      this.cid = comment._id
      this.currentComment = comment
    },
    setBest (comment) {
      this.$confirm('确定将此评论采纳为最佳答案吗', () => {}, () => {
        setBestComment({
          tid: this.tid,
          cid: comment._id
        }).then(res => {
          if (res.code === 200) {
            comment.isBest = '1'
            this.page.isEnd = '1'
            this.$pop('采纳成功')
          } else {
            this.$pop(res.msg)
          }
        })
      })
    },
    handleClickHand (comment) {
      setHands({ cid: comment._id }).then(res => {
        if (res.code === 200) {
          comment.handed = '1'
          comment.hands++
          this.$pop('点赞成功')
        } else {
          this.$pop(res.msg, 'shake')
        }
      })
    },
    reply (comment) {
      const reg = /^@[\S]+/g
      if (this.content.trim()) {
        if (reg.test(this.content)) {
          this.content = this.content.replace(reg, `@${comment.cuid.name}`)
        } else {
          if (this.content.trim() !== '') {
            this.content = `@${comment.cuid.name} ${this.content}`
          }
        }
      } else {
        this.content = '@' + comment.cuid.name + ' '
      }
      scollToElem('.layui-input-block', 1000, -65)
      document.getElementById('editContent').focus()
    }
  },
  computed: {
    user () {
      return this.$store.state.userInfo
    }
  },
  watch: {
    tid (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getPostDetail()
        this.getCommentList()
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
