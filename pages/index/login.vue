<template>
	<view class="page">
		<view class="back"></view>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-custom" :isBack="false">
		</cu-custom>

		<!-- 登录窗口 -->
		<view id="backBox">
			<!-- Logo -->
			<view id="logoBox">
				<view>
					<image id="logo" src="/static/icon/logo.png"></image>
				</view>
				<view>SUDO</view>
				<view>登录</view>
			</view>
			<view id="loginBox">
				<view class="inputBox">
					<view>
						<image class="loginIcon" src="/static/icon/username.png"></image>
					</view>
					<input type="text" placeholder="请输入手机号" placeholder-style="color:#A5A5A5" v-model="username" @input="checkLoginPermit()"/>
				</view>
				<view class="line"></view>
				<view class="inputBox">
					<view>
						<image class="loginIcon" src="/static/icon/password.png"></image>
					</view>
					<input type="password" placeholder="请输入密码" placeholder-style="color:#A5A5A5" v-model="password" @input="checkLoginPermit()"/>
				</view>
				<view class="line"></view>
				<navigator id="forgetPassword">忘记密码？</navigator>
				<view id="btnBox">
					<button class="btn" @tap="login" v-bind:disabled="dis_login">登录</button>
					<button class="btn" @tap="register">注册</button>
				</view>
        <view id="versionBox">Version: {{ version }}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: '',
        version: this.globalVersion,
				dis_login: true       // 没填写手机号和密码时，不允许点击登录
			}
		},
		methods: {
			checkLoginPermit() {
				if(this.username != '' && this.password != '')
					this.dis_login = false;
				else
					this.dis_login = true;
			},
			login() {
				uni.request({
					method: "POST",
					url: this.requestURL + "/accounts/login",
					dataType: "json",
					header:{
						'content-type': 'application/x-www-form-urlencoded'
					},
					data:{
						"username": this.username,
						"password": this.password
					},
					success: (res) =>{
						let response = res.data;
						console.log(response);
						if(response.success) {			// 登录成功时，记录下token，并跳转到首页。并且下次打开app时，不再进入登录页面
							uni.setStorage({
								key: "token",
								data: response.data,
							});
							uni.setStorage({
								key: "isLogin",
								data: true
							});
							uni.setStorage({
								key: "username",
								data: this.username
							});
							uni.switchTab({
								url: "index"
							});
						}
						else {							// 登录失败时，弹窗提示
							uni.showModal({
								title: "失败",
								content: response.errMsg
							});
						}
					},
					fail() {
						uni.showModal({
							title: "登录失败",
							content: "请检查网络连接"
						});
					}
				});
			},
			register() {
				uni.navigateTo({
					url: './register'
				});
			}
		}
	}
</script>

<style>
	#backBox {
		z-index: 1;
		position: absolute;
		width: 100%;
		height: 100%;
    background: linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0) 40%, white 40%,white 100%);
	}

	#logoBox {
		margin-top: 100rpx;
		text-align: center;
		font-size: 40rpx;
		color: #FFFFFF;
	}

	#logo {
		width: 167rpx;
		height: 167rpx;
		border-radius: 50%;
		box-shadow: 0rpx 5rpx 5rpx #444444;
	}

	#loginBox {
		z-index: 2;
		position: relative;
		top: 50rpx;
		width: 90%;
		height: 600rpx;
		margin-left: 5%;
		padding-top: 2rpx;
		background-color: #FAEBEC;
		border-radius: 40rpx;
		box-shadow: 0rpx 5rpx 10rpx #AAAAAA;
	}

	.inputBox {
		display: flex;
		align-items: center;
		width: 80%;
		margin-left: 10%;
		margin-top: 60rpx;
	}

	.loginIcon {
		width: 46rpx;
		height: 46rpx;
		margin: 20rpx;
	}

	#forgetPassword {
		position: absolute;
		right: 80rpx;
		margin-top: 40rpx;
		font-size: 24rpx;
		color: #096FFA;
	}

	#btnBox {
		display: flex;
		justify-content: space-around;
		margin-top: 140rpx;
	}

  #versionBox {
    margin: 20rpx 40rpx;
    font-size: 30rpx;
    color: #35312E;
  }

	.btn {
		width: 200rpx;
		height: 80rpx;
		background-color: #ED5941;
		border-radius: 40rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		box-shadow: 0rpx 0rpx 10rpx #AAAAAA;
	}

	.line {
		width: 70%;
		margin-left: 15%;
		height: 1rpx;
		background: #AAAAAA;
	}
</style>
