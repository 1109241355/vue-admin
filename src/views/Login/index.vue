<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="ment-tab">
        <li
          :class="{'current':isActive==item.current}"
          @click="toggleMneu(item)"
          v-for="item in mentTab"
          :key="item.id"
        >{{item.txt}}</li>
      </ul>
      <!--表单-->
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        class="login-from"
        size="medium"
      >
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input type="test" v-model="ruleForm2.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input
            type="test"
            v-model="ruleForm2.password"
            auto-complete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
				<el-form-item prop="passwords" class="item-form" v-show ="model==='register'">
          <label>重复密码</label>
          <el-input
            type="test"
            v-model="ruleForm2.passwords"
            auto-complete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model.number="ruleForm2.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" minlength="6" maxlength="20">验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" class="block login-btn" @click="submitForm('ruleForm2')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { goulv, youxiang,mima,vscode } from "@/utils/validate";
export default {
  name: "login",
  data() {
    //验证邮箱
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (youxiang(value)) {//
        callback(new Error("邮箱格式有误"));
      } else {
        callback();
      }
    };
    //验证密码
    var validatePassword = (rule, value, callback) => {
      //过滤后的数据
      this.ruleForm2.password = goulv(value);
      value = this.ruleForm2.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (mima(value)) {
        callback(new Error("密码为6至20位数字和字母"));
      } else {
        callback();
      }
		};
		//验证重复密码
		var validatePasswords = (rule, value, callback) => {
			//如果模块值为login,直接通过
			if(this.model==='login'){callback();}
      //过滤后的数据
      this.ruleForm2.passwords = goulv(value);
      value = this.ruleForm2.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
		};
    //验证验证码
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (vscode(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
    };
    return {
      mentTab: [
        { txt: "登录", current: true , type:"login"},
        { txt: "注册", current: false , type:"register"}
			],
			//模块值
			model:'login',
			isActive: true,
			//表单数据
      ruleForm2: {
        username: "",
				password: "",
				passwords:"",
        code: ""
      },
      rules2: {
        username: [{ validator: validateUsername, trigger: "blur" }],
				password: [{ validator: validatePassword, trigger: "blur" }],
				passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {},
  //写函数的地方
  methods: {
    //数据驱动视图渲染
    //js操作DOM元素
    toggleMneu(data) {
      this.mentTab.forEach(elem => {
        elem.current = false;
      });
			data.current = true;
			this.model=data.type;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scope>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.ment-tab {
  text-align: center;
  li {
    display: inline-block;

    width: 88px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background: rgba(0, 0, 0, 0.1);
  }
}
.login-from {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
}
.item-from {
  margin-bottom: 13px;
}
.block {
  display: block;
  width: 100%;
}
.login-btn {
  margin-top: 19px;
}
</style>
