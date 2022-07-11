<template>
  <div>
    <header-bcak-bar />
    <van-form @submit="onSubmit" label-align="center">
      <van-field v-model="userInfo.mobile" type="tel" label="手机号" disabled />
      <van-field
        v-model="userInfo.name"
        name="用户名"
        label="用户名"
        placeholder="用户名"
      />
      <van-field name="sex" label="性别">
        <template #input>
          <van-radio-group v-model="userInfo.gender" direction="horizontal">
            <van-radio name="0">男</van-radio>
            <van-radio name="1">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="uploader" label="修改头像">
        <template #input>
          <van-uploader
            v-model="uploader"
            :max-count="1"
            :max-size="500 * 1024"
          />
        </template>
      </van-field>
      <van-field
        readonly
        clickable
        name="calendar"
        :value="value"
        label="生日"
        placeholder="点击选择日期"
        @click="showCalendar = true"
      />
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="showCalendar = false"
        v-show="showCalendar"
        :formatter="formatter"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getPersonInfo, editPersonInfo } from "@/api/user";
import HeaderBcakBar from "@/components/HeaderBackBar.vue";
export default {
  components: { HeaderBcakBar },
  data() {
    return {
      userInfo: {},
      editInfo: {},
      rules: {
        name: [],
      },
      uploader: [{ url: "" }],
      value: "",
      showCalendar: false,
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
    };
  },
  created() {
    this.getPersonInfo();
  },
  methods: {
    async getPersonInfo() {
      const res = await getPersonInfo();
      this.userInfo = res;
      // 性别标识符转换为字符串
      this.userInfo.gender = res.gender + "";
      this.uploader[0].url = this.userInfo.photo;
      this.value = this.userInfo.birthday;
    },
    async onSubmit() {
      const editInfo = {
        name: this.userInfo.name,
        gender: this.userInfo.gender,
        birthday: this.value,
        intro: this.userInfo.intro,
      };
      await editPersonInfo(editInfo);
      this.$toast.success("修改成功");
    },
    onConfirm(date) {
      this.value = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      this.showCalendar = false;
    },
    formatter(type, val) {
      if (type === "year") {
        return val + "年";
      }
      if (type === "month") {
        return val + "月";
      }
      if (type === "day") {
        return val + "日";
      }
      return val;
    },
  },
};
</script>

<style>
</style>
