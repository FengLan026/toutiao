<template>
  <div>
    <div class="header">
      <van-row class="user-detail-bar" type="flex" justify="space-between">
        <van-col class="user-img-name">
          <van-image
            class="user-img"
            round
            width="75px"
            height="75px"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <span class="user-name">未来科技</span>
        </van-col>
        <van-col span="6">
          <van-button class="edit-btn" round type="default"
            >编辑资料</van-button
          >
        </van-col>
      </van-row>

      <van-tabbar class="user-info-bar" :fixed="false" :route="true">
        <van-tabbar-item>
          <p class="count">8</p>
          <p class="text">发布</p>
        </van-tabbar-item>
        <van-tabbar-item>
          <p class="count">1</p>
          <p class="text">关注</p>
        </van-tabbar-item>
        <van-tabbar-item>
          <p class="count">999</p>
          <p class="text">粉丝</p>
        </van-tabbar-item>
        <van-tabbar-item>
          <p class="count">999</p>
          <p class="text">获赞</p>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <div class="container">
      <van-grid class="record-bar" clickable :column-num="2">
        <van-grid-item class="record-bar-item" text="收藏" to="/">
          <template v-slot:icon>
            <i class="iconfont icon-shoucang"> </i>
          </template>
        </van-grid-item>
        <van-grid-item class="record-bar-item" text="历史">
          <template v-slot:icon>
            <i class="iconfont icon-lishi"> </i>
          </template>
        </van-grid-item>
      </van-grid>
      <van-cell class="list-item" title="消息通知" is-link />
      <van-cell class="list-item" title="人工智障" is-link />
      <van-button type="primary" block class="loginout-btn">
        退出登录
      </van-button>
    </div>
    <foot-nav-bar></foot-nav-bar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUserInfo } from "@/api/user";
import { getChannelsList } from "@/api/channels";
export default {
  data() {
    return {};
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const res = await getUserInfo();
      console.log(res);
    },
  },
  computed: {
    ...mapGetters(["token"]),
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 180px;
  position: relative;
  text-align: center;
  display: flex;
  .user-detail-bar {
    width: 100%;
    display: flex;
    align-items: center;
    padding-bottom: 64px;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
    .user-img-name {
      display: flex;
      align-items: center;
      padding-left: 16px;
      .user-img {
        border: 1px solid #fff;
      }
      .user-name {
        color: #fff;
        font-size: 15px;
        padding-left: 16px;
      }
    }
    .edit-btn {
      height: 17px;
      padding: 0 5px;
      font-size: 10px;
      line-height: 17px;
    }
  }
  .user-info-bar {
    position: absolute;
    bottom: 0;
    height: 64px;
    background-color: #3296fa;
    &::after {
      border: 0;
    }
    .van-tabbar-item {
      color: #fff;
      .count {
        margin: 0;
        font-size: 18px;
        line-height: 18px;
        font-weight: border;
      }
      .text {
        margin: 8px 0 14px;
        font-size: 12px;
        line-height: 12px;
      }
    }
  }
  .user-info-bar.van-tabbar-item--active {
    background-color: #3296fa;
  }
}
.container {
  .record-bar {
    height: 70px;
    margin-bottom: 5px;
    position: relative;
    color: #333;
    .record-bar-item {
      height: 100%;
      color: #333;
      font-size: 14px;
      .iconfont {
        font-size: 23px;
        color: #eb5253;
      }
    }
    .record-bar-item.van-tabbar-item--active {
      color: #333;
    }
    &::after {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1px;
      height: 50px;
      background: url("~@/assets/gradient-gray-line.png") no-repeat;
      background-size: contain;
    }
  }

  .list-item {
    height: 50px;
    font-size: 15px;
    color: #333333;
  }
  .loginout-btn {
    height: 52px;
    margin-top: 5px;
    font-size: 15px;
    line-height: 52px;
    color: #d86262;
    background-color: #fff;
    border: 0;
  }
}
</style>
