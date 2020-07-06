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
					<input type="text" placeholder="请输入用户名" placeholder-style="color:#A5A5A5" v-model="username" />
				</view>
				<view class="line"></view>
				<view class="inputBox">
					<view>
						<image class="loginIcon" src="/static/icon/password.png"></image>
					</view>
					<input type="password" placeholder="请输入密码" placeholder-style="color:#A5A5A5" v-model="password" />
				</view>
				<view class="line"></view>
				<navigator id="forgetPassword">忘记密码？</navigator>
				<view id="btnBox">
					<button class="btn" @tap="login">登录</button>
					<button class="btn" @tap="register">注册</button>
				</view>
			</view>
		</view>
		<view id="demo">
			<view>测试版本，点击登录即可进入主页</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		methods: {
			login() {
				uni.switchTab({
					url: "index",
					fail(err) {
						console.log(err);
					}
				})
			},
			register() {
				uni.redirectTo({
					url: "register"
				})
			}
		}
	}
</script>

<style>
	#backBox {
		z-index: 1;
		position: absolute;
		width: 100%;
		height: 700rpx;
		background-color: #CD3A44;
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

	.btn {
		width: 200rpx;
		height: 80rpx;
		background-color: #CD3A44;
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

	#demo {
		margin-top: 1100rpx;
		text-align: center;
		font-size: 30rpx;
	}
</style>
