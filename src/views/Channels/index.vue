<template>
  <div>
    <div class="header">
      <van-search
        class="search-nav"
        shape="round"
        input-align="center"
        background="#3296fa"
        placeholder="搜索"
        @input="showIcon = false"
        @blur="showIcon = true"
      >
        <template v-slot:left-icon>
          <van-icon name="search" v-show="showIcon" />
        </template>
      </van-search>
    </div>
    <div class="container">
      <van-tabs v-model="active" @change="changeChannels(active)">
        <van-tab
          class="art-list"
          :title="item.name"
          v-for="item in channelsList"
          :key="item.id"
          :name="item.id"
        >
          <ArtCard :item="el" v-for="el in articlesList" :key="el.art_id" />
        </van-tab>
      </van-tabs>
      <i class="iconfont icon-gengduo" @click="showPopup" />
      <van-popup
        class="popup"
        closeable
        close-icon-position="top-left"
        v-model="isShowPopup"
        position="right"
        @close="setUserChannels"
        :style="{ width: '100%', height: '100%' }"
      >
        <div class="my-channels">
          <p>
            我的频道
            <van-button plain class="clearBtn" @click="clearBtn" type="danger">
              清除
            </van-button>
          </p>
          <van-button
            class="tag-item"
            type="default"
            v-for="item in myChannelsList"
            :key="item.id"
            size="small"
          >
            {{ item.name }}
          </van-button>
        </div>
        <div class="all-channels">
          <p>所有频道</p>
          <van-button
            class="tag-item"
            :class="{ active: findName(item.name) }"
            type="default"
            v-for="item in channelsList"
            :key="item.id"
            size="small"
            @click="addchannels(item)"
          >
            {{ item.name }}
            <template v-slot:icon>
              <i
                :class="[
                  'iconfont',
                  findName(item.name) ? 'icon-duigou' : 'icon-zengjia',
                ]"
              />
            </template>
          </van-button>
        </div>
      </van-popup>
    </div>
    <foot-nav-bar />
  </div>
</template>

<script>
import {
  getChannelsList,
  getArticlesList,
  setUserChannels,
} from "@/api/channels";
export default {
  name: "Channels",
  data() {
    return {
      showIcon: true, // 搜索框图表展示
      channelsList: [], // 频道列表数据
      myChannelsList: [], // 我的频道
      myChannelsStatus: [],
      active: "0", // 激活频道id
      articlesData: {
        channel_id: "0",
        timestamp: new Date().getTime(),
      },
      articlesList: "", // 文章列表数据
      isShowPopup: false, // 右侧弹层
    };
  },
  created() {
    // 初始化
    // 获取频道
    this.getChannelsList();
    // 获取当前频道文章
    this.getArticlesList(this.articlesData);
  },
  methods: {
    // 获取频道列表
    async getChannelsList() {
      const res = await getChannelsList();
      this.channelsList = res.channels;
    },
    // 获取频道文章列表
    async getArticlesList(data) {
      const res = await getArticlesList(data);
      this.articlesList = res.results;
    },
    async setUserChannels() {
      let data = [];
      for (let i = 0; i < this.myChannelsList.length; i++) {
        const el = this.myChannelsList[i];
        data.push({
          id: parseInt(el.id),
          seq: parseInt(i),
        });
      }
      await setUserChannels(data);
    },
    // 切换频道
    changeChannels(id) {
      // this.currentId = id;
      this.articlesData = {
        channel_id: id,
        timestamp: new Date().getTime(),
      };
      this.getArticlesList(this.articlesData);
    },
    // 展示弹层
    showPopup() {
      this.isShowPopup = true;
    },
    // 添加频道
    addchannels(item) {
      if (!this.myChannelsList.some((el) => el.name === item.name)) {
        if (this.myChannelsList.length >= 10)
          return this.$toast.fail("最多添加10个频道");
        this.myChannelsList.push(item);
      } else {
        const index = this.myChannelsList.findIndex(
          (el) => el.name === item.name
        );
        this.myChannelsList.splice(index, 1);
      }
    },
    // 清空频道
    clearBtn() {
      this.myChannelsList = [];
    },
    findName(name) {
      return this.myChannelsList.some((el) => el.name === name);
    },
  },
};
</script>

<style lang="less" scoped>
.search-nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 44px;
  padding: 0 50px;
  color: #fff;
  .van-search__content {
    background-color: #5babfb;
    text-align: center;
    /deep/.van-field__left-icon {
      position: absolute;
      left: 35%;
      .van-icon-search {
        color: #fff;
      }
    }
    /deep/.van-field__body {
      input {
        color: #fff;
      }
      /* 修改placeholder  */
      input::-webkit-input-placeholder {
        color: #fff;
        font-size: 14px;
        text-align: center;
      }
    }
  }
}
.container {
  position: relative;
  margin-top: 44px;
  box-sizing: border-box;
  .iconfont.icon-gengduo {
    position: absolute;
    top: 0;
    right: 0;
    width: 33px;
    z-index: 2;
    height: 40px;
    text-align: center;
    padding-top: 12px;
    background-color: #fff;
    font-size: 17px;
  }
  .popup {
    padding: 10px;
    p {
      margin: 20px 0;
      line-height: 40px;
      font-size: 16px;
    }
    .my-channels,
    .all-channels {
      margin-top: 40px;
    }
    .my-channels {
      height: 130px;

      .clearBtn {
        margin-top: 8px;
        float: right;
        height: 24px;
      }
    }
    .tag-item {
      margin: 6px;
      background-color: #f4f5f6;
    }
    .tag-item.active {
      color: #fff;
      background-color: #1989fa;
    }
  }
}
</style>
