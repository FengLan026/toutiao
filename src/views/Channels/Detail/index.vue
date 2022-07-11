<template>
  <div>
    <!-- 顶部 -->
    <HeaderBackBar />
    <!-- 内容 -->
    <div class="container">
      <h3 class="art_title">{{ artDetail.title }}</h3>
      <van-row class="aut_info">
        <van-col span="3">
          <van-image
            round
            width="35px"
            height="35px"
            fit="cover"
            :src="artDetail.aut_photo"
          />
        </van-col>
        <van-col class="aut-name" span="8">
          <p>{{ artDetail.aut_name }}</p>
          <p>{{ artDetail.pubdate }}</p>
        </van-col>
        <van-col span="4" offset="6">
          <van-button
            class="followBtn"
            round
            size="mini"
            icon="plus"
            type="primary"
          >
            关注
          </van-button>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24">
          <div ref="artContent" class="artContent"></div>
        </van-col>
      </van-row>
    </div>
    <!-- 评论列表 -->
    <div class="comm-list">
      <div class="comm-item" v-for="item in commDate" :key="item.com_id">
        <van-image
          class="comm-img"
          round
          width="36px"
          height="36px"
          :src="item.aut_photo"
        />
        <div class="comm-title">
          <span class="comm-name">
            {{ item.aut_name }}
          </span>
          <span class="comm-like">
            <van-icon size="18" name="good-job-o" />
            {{ item.like_count }}
          </span>
        </div>
        <div class="comm-content">{{ item.content }}</div>
        <div class="comm-footer">
          <span class="comm-time">{{ item.pubdate }}</span>
          <van-button round class="comm-reply" type="default">
            {{ item.reply_count }}回复
          </van-button>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <van-tabbar class="footer-bar">
      <!-- 发布评论 -->
      <van-tabbar-item class="input-item">
        <van-form @submit="onSubmit" class="input-card">
          <van-field border v-model="commContent" placeholder="写评论" />
        </van-form>
      </van-tabbar-item>
      <!-- 评论 -->
      <van-tabbar-item class="icon">
        <van-icon
          class="iconfont icon-pinglun"
          :badge="artDetail.read_count"
          size="22"
        />
      </van-tabbar-item>
      <!-- 收藏 -->
      <van-tabbar-item class="icon" @click="collectionBtn">
        <template v-slot:icon>
          <van-icon
            v-if="chooseColl"
            class="iconfont icon-shoucangxuanzhong"
            size="22"
          />
          <van-icon v-else class="iconfont icon-shoucang" size="22" />
        </template>
      </van-tabbar-item>
      <!-- 分享 -->
      <van-tabbar-item class="icon">
        <template v-slot:icon>
          <van-icon class="iconfont icon-fenxiang" size="22" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {
  getArticlesDetail,
  getArticleComments,
  getSubComments,
  addCollection,
  delCollection,
} from "@/api/channels";
export default {
  name: "ArtDetail",
  // 离开页面触发
  beforeRouteLeave(to, from, next) {
    // 是否更改收藏
    if (this.isColl != this.chooseColl) {
      if (this.chooseColl) {
        // 收藏文章
        addCollection(parseInt(this.id));
      } else {
        // 取消收藏文章
        delCollection(this.id);
      }
    }
    next();
  },
  data() {
    return {
      id: this.$route.query.id,
      artDetail: {},
      commDate: [],
      commContent: "",
      chooseColl: false,
      isColl: false,
    };
  },
  mounted() {
    // 获取文章详情
    this.getArticlesDetail();
  },
  methods: {
    // 获取文章详情
    async getArticlesDetail() {
      const res = await getArticlesDetail(this.id);
      this.artDetail = res;
      this.$nextTick(() => {
        this.$refs.artContent.innerHTML = this.artDetail.content;
      });
      this.getArticleComments();
      this.isColl = this.chooseColl = this.artDetail.is_collected;
    },
    onSubmit() {
      this.commText = "";
    },
    // 获取文章评论
    async getArticleComments() {
      const data = {
        source: this.id,
        limit: this.artDetail.read_count,
      };
      const res = await getArticleComments(data);
      this.commDate = res.results;
    },
    // 收藏
    collectionBtn() {
      this.chooseColl = !this.chooseColl;
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 375px;
  padding: 0 15px;
  box-sizing: border-box;
  .art_title {
    padding: 10px 0;
  }
  .aut_info {
    .aut-name {
      font-size: 12px;
      padding-top: 6px;
    }
    .followBtn {
      width: 85px;
      height: 30px;
      font-size: 14px;
    }
  }
  .artContent {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 80px;
    font-size: 16px;
    word-break: break-all;
    /deep/pre {
      width: 100%;
      word-break: break-all;
      white-space: pre-wrap;
    }
    /deep/ img {
      width: 100%;
    }
    // /deep/ code {
    //   word-break: break-all;
    // }
  }
}
.comm-list {
  width: 100%;
  background-color: #fff;
  margin-bottom: 60px;
  .comm-item {
    position: relative;
    width: 100%;
    padding: 20px;
    padding-left: 60px;
    .comm-img {
      position: absolute;
      left: 15px;
    }
    .comm-title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 18px;
      .comm-name {
        font-size: 14px;
        color: #406599;
      }
      .comm-like {
        font-size: 10px;
      }
    }
    .comm-content {
      font-size: 16px;
      line-height: 25px;
      margin: 16px 0;
    }
    .comm-footer {
      font-size: 10px;
      .comm-reply {
        height: 25px;
        font-size: 12px;
        line-height: 25px;
        padding: 0 10px;
        background-color: #f4f5f6;
        vertical-align: middle;
        margin-left: 14px;
      }
    }
  }
}
.footer-bar {
  box-sizing: border-box;
  width: 375px;
  padding: 0 12px;
  .input-item {
    .input-card {
      width: 200px;
      text-indent: 1em;
      .van-field {
        border-radius: 12px;
        border: 1px solid #f2f2f2;
        padding: 0;
        /deep/.van-field__control {
          text-indent: 1em;
        }
      }
    }
  }
  .iconfont {
    flex: 1;
  }
}
</style>
