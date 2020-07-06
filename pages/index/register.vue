<template>
	<view class="page">
		<view class="back"></view>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-custom" :isBack="true">
			<block slot="backText"><text id="backBtn" @tap="back">返回</text></block>
		</cu-custom>

		<!-- 注册窗口 -->
		<view id="backBox">
			<!-- Logo -->
			<view id="logoBox">
				<view>
					<image id="logo" src="/static/icon/logo.png"></image>
				</view>
				<view>注册</view>
			</view>
			<view id="registerBox">
				<view class="inputBox">
					<view>
						<image class="registerIcon" src="/static/icon/username.png"></image>
					</view>
					<input type="text" placeholder="请输入手机号" placeholder-style="color:#A5A5A5" v-model="username" @input="checkRegisterPermit()"/>
					<button v-if="showSendCaptcha" class="sendCaptcha" @tap="sendCaptcha()">获取验证码</button>
				</view>
				<view class="line"></view>
				<view class="inputBox">
					<view>
						<image class="registerIcon" src="/static/icon/password.png"></image>
					</view>
					<input type="text" placeholder="请输入验证码" placeholder-style="color:#A5A5A5" v-model="captcha" @input="checkRegisterPermit()"/>
				</view>
				<view class="line"></view>
				<view class="inputBox">
					<view>
						<image class="registerIcon" src="/static/icon/password.png"></image>
					</view>
					<input type="password" placeholder="请输入密码" placeholder-style="color:#A5A5A5" v-model="password" @input="checkRegisterPermit()"/>
				</view>
				<view class="line"></view>
				<view class="inputBox">
					<view>
						<image class="registerIcon" src="/static/icon/password.png"></image>
					</view>
					<input type="password" placeholder="请确认密码" placeholder-style="color:#A5A5A5" v-model="verify" @input="checkRegisterPermit()"/>
				</view>
				<view class="line"></view>
				<button class="btn" @tap="register" v-bind:disabled="dis_register">注册</button>
				<view id="navBox">
					<navigator id="navBtn">已有账户点击登录</navigator>
					<navigator id="navBtn">注册须知</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				captcha: '',
				password: '',
				verify: '',
				dis_register: true,
				showSendCaptcha: false
			}
		},
		methods: {
			back() {
				uni.navigateBack();
			},
			checkRegisterPermit() {
				if(this.username != '')
					this.showSendCaptcha = true;	//输入电话号码后才展示发送验证码按钮
				else
					this.showSendCaptcha = false;
				if(this.username != '' && this.captcha != '' && this.password != '' && this.verify != '')		//所有信息都填写后，才能点击注册
					this.dis_register = false;
				else
					this.dis_register = true;
			},
			sendCaptcha() {							//获取验证码
				uni.showModal({
					title: "验证码",
					content: "0000"
				});
			},
			register() {
				if(this.password != this.verify) {
					uni.showToast({
						title: '两次输入密码不一致',
						icon: 'none',
						duration: 1000
					});
					return;
				}
				uni.request({
					method: "POST",
					url: this.requestURL + "/accounts/register",
					dataType: "json",
					header:{
						'content-type': 'application/x-www-form-urlencoded'
					},
					data:{
						"username": this.username,
						"code": this.captcha,
						"password": this.password
					},
					success(res) {
						let response = res.data;
						console.log(response);
						if(response.success) {
							uni.showToast({
								title: '注册成功',
								icon: 'none',
								duration: 1000
							});
							uni.redirectTo({
								url: "./login"
							});
						}
						else {
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

	#registerBox {
		z-index: 2;
		position: relative;
		top: 50rpx;
		width: 90%;
		height: 800rpx;
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
	
	.sendCaptcha {
		width: 40%;
		background-color: #CD3A44;
		border-radius: 40rpx;
		font-size: 25rpx;
		color: #FFFFFF;
		box-shadow: 0rpx 0rpx 10rpx #AAAAAA;
	}

	.registerIcon {
		width: 46rpx;
		height: 46rpx;
		margin: 20rpx;
	}


	.btn {
		margin-top: 60rpx;
		width: 400rpx;
		height: 80rpx;
		background-color: #CD3A44;
		border-radius: 40rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		box-shadow: 0rpx 0rpx 10rpx #AAAAAA;
	}

	#navBox {
		display: flex;
		width: 90%;
		margin-left: 5%;
		justify-content: space-between;
		margin-top: 40rpx;
	}

	#navBtn {
		margin-top: 40rpx;
		font-size: 24rpx;
		color: #096FFA;
	}

	.line {
		width: 70%;
		margin-left: 15%;
		height: 1rpx;
		background: #AAAAAA;
	}
</style>
