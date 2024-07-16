<template>
  <div>
    <div class="fly-home fly-panel" style="background-image: url();">
      <img
        :src="userInfo.pic ? userInfo.pic : '../../assets/img/bear-200-200.jpg'"
      />
      <i class="iconfont icon-renzheng" title="Imooc社区认证"></i>
      <h1>
        {{ userInfo.name }}
        <i
          v-if="userInfo.gender === '0'"
          class="iconfont icon-nan"
        >&nbsp;&nbsp;</i>
        <i
          v-else
          class="iconfont icon-nv"
        >&nbsp;&nbsp;</i>
        <i
          class="layui-badge fly-badge-vip"
        >
          {{ userInfo.isVip !== '0' ? `VIP${userInfo.isVip}` : '非VIP' }}
        </i>
        <!--
        <span style="color:#c00;">（管理员）</span>
        <span style="color:#5FB878;">（社区之光）</span>
        <span>（该号已被封）</span>
        -->
      </h1>

      <!-- <p style="padding: 10px 0; color: #5FB878;">认证信息: layui 作者</p> -->

      <p class="fly-home-info">
        <i class="iconfont icon-kiss" title="积分" ></i>
        <span style="color: #FF7200;">
          {{ userInfo.favs }}
        </span>
        <i class="iconfont icon-shijian"></i>
        <span>{{ userInfo.created | momentDate }} 加入</span>
        <i class="iconfont icon-chengshi"></i>
        <span>来自{{ userInfo.location || '中国' }}</span>
      </p>

      <p class="fly-home-sign">
        {{ userInfo.regmark ? '( ' + userInfo.regmark + ' )' : '( 加油 )'}}
      </p>

      <div class="fly-sns" data-user="">
        <a
          class="layui-btn layui-btn-primary fly-imActive"
          data-type="addFriend"
        >加为好友</a>
        <a
          class="layui-btn layui-btn-normal fly-imActive"
          data-type="chat"
        >发起会话</a>
      </div>
    </div>

    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md6 fly-home-jie">
          <div class="fly-panel">
            <h3 class="fly-panel-title">{{ userInfo.name }} 最近的提问</h3>
            <ul class="jie-row">
              <template v-if="postList.length">
                <li
                  v-for="item in postList"
                  :key="item._id"
                >
                  <!-- <div
                    class="fly-list-badge"
                    v-if="item.tags.length && item.tags[0].name !== ''"
                  >
                    <span
                      class="layui-badge"
                      v-for="(tag, index) in item.tags"
                      :key="'tag' + index"
                      :class="tag.class"
                    >{{ tag.name }}</span>
                  </div> -->
                  <span class="fly-jing">精</span>
                  <RouterLink
                    class="jie-title"
                    :to="{
                      name: 'detail',
                      params: {
                        tid: item._id
                      }
                    }"
                  >{{ item.title }}</RouterLink>
                  <i>{{ item.created | momentDate }}</i>
                  <em class="layui-hide-xs">{{ item.reads }}阅/{{ item.answer }}答</em>
                </li>
              </template>
              <template v-else>
                <div
                  class="fly-none"
                  style="min-height: 50px; padding:30px 0; height:auto;"
                >
                  <i style="font-size:14px;">没有发表任何求解</i>
                </div>
              </template>
            </ul>
          </div>
        </div>

        <div class="layui-col-md6 fly-home-da">
          <div class="fly-panel">
            <h3 class="fly-panel-title">{{ userInfo.name }} 最近的回答</h3>
            <ul class="home-jieda">
              <template v-if="commentList.length">
                <li
                  v-for="item in commentList"
                  :key="item._id"
                >
                  <p>
                    <span>{{ item.created | momentDate }}</span>
                    在
                    <RouterLink
                      :to="
                        item.tid ? {
                          name: 'detail',
                          params: {
                            tid: item.tid ? item.tid._id : ''
                          }
                        } : { name: 404 }
                      "
                    >{{ item.tid?.title || '(用户已删除该贴)' }}</RouterLink>
                    中回答：
                  </p>
                  <div
                    class="home-dacontent"
                    v-richText="item.content"
                  ></div>
                </li>
              </template>
              <template v-else>
                <div
                  class="fly-none"
                  style="min-height: 50px; padding:30px 0; height:auto;"
                >
                  <span>没有回答任何问题</span>
                </div>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, getPublicPostByUid, getCommentList } from '@/api/user'

export default {
  name: 'UserCom',
  props: ['uid'],
  data () {
    return {
      page: 1,
      pageSize: 20,
      userInfo: {},
      postList: [],
      commentList: []
    }
  },
  mounted () {
    this._getUserInfo()
    this.getPostList()
    this._getCommentList()
  },
  methods: {
    _getUserInfo () {
      getUserInfo({
        uid: this.uid
      }).then(res => {
        if (res.code === 200) {
          this.userInfo = res.data
        }
      })
    },
    getPostList () {
      getPublicPostByUid({
        page: this.page,
        pageSize: this.pageSize,
        uid: this.uid
      }).then(res => {
        if (res.code === 200) {
          this.postList = res.data
        }
      })
    },
    _getCommentList () {
      getCommentList({
        uid: this.uid,
        page: this.page,
        pageSize: 10
      }).then(res => {
        if (res.code === 200) {
          this.commentList = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
