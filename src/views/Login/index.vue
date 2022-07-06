<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录" />
    <van-form ref="loginForm" @submit="onSubmit" :show-error-message="false">
      <van-field
        class="form-item"
        v-model="user.mobile"
        name="mobile"
        type="number"
        maxlength="11"
        placeholder="请输入手机号"
        :rules="loginRules.mobile"
      >
        <template v-slot:left-icon>
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>
      <van-field
        class="form-item"
        v-model="user.code"
        name="code"
        maxlength="6"
        placeholder="请输入验证码"
        :rules="loginRules.code"
      >
        <template v-slot:left-icon>
          <i class="iconfont icon-yanzhengma"></i>
        </template>
        <template v-slot:right-icon>
          <van-count-down
            v-if="showTime"
            :time="60 * 1000"
            format="ss"
            @finish="showTime = false"
          />
          <van-button
            v-else
            class="verify-btn"
            native-type="button"
            @click="onSendSms"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 27px 14px 0">
        <van-button
          class="login-btn"
          block
          color="#6db4fb"
          type="info"
          native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <div class="footer">
      <a src="#">隐私条款</a>
    </div>
  </div>
</template>

<script>
import { validMobile } from "@/utils/validate";
import { mapActions } from "vuex";
import { getSmsCode } from "@/api/user";
export default {
  data() {
    const validateMobile = (value) => {
      return validMobile(value);
    };
    return {
      user: {
        mobile: "13988888888",
        code: "246810",
      },
      loginRules: {
        mobile: [
          { required: true, trigger: "blur", message: "手机号不能为空" },
          {
            trigger: "blur",
            validator: validateMobile,
            message: "手机格式错误",
          },
        ],
        code: [
          { required: true, trigger: "blur", message: "验证码不能为空" },
          { trigger: "blur", pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },
      showTime: false,
    };
  },
  methods: {
    ...mapActions(["user/login"]),
    async onSubmit() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, // 禁止背景点击
        duration: 0, // 持续时间 如果是0 则持续展示
      });
      try {
        await this["user/login"](this.user);
        this.$toast.success("登录成功");
        this.$router.push("/");
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail("手机号或者验证码错误");
        } else {
          this.$toast.fail("登录失败, 请稍后重试");
        }
      }
    },
    async onSendSms() {
      try {
        // 校验手机号
        await this.$refs.loginForm.validate("mobile");
      } catch (error) {
        return this.$toast.fail(error);
      }
      // 显示倒计时
      this.showTime = true;
      // 请求验证码
      try {
        await getSmsCode(this.user.mobile);
        this.$toast("发送成功");
      } catch (error) {
        this.$toast("发送失败, 请稍后重试");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-btn {
  height: 44px;
  border-radius: 5px;
}
.verify-btn {
  height: 23px;
  font-size: 11px;
  line-height: 23px;
  border-radius: 12px;
  background-color: #ededed;
  color: #666666;
}
.iconfont {
  font-size: 19px;
  color: #666666;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding-bottom: 27px;
  display: flex;
  justify-content: center;
  font-size: 13px;
  line-height: 18px;
  color: #666666;
}
.form-item {
  height: 45px;
  display: flex;
  align-items: center;
}
</style>
