<template>
	<view id="backBox" class="page">
		<view class="back"></view>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-custom" :isBack="false">
		</cu-custom>

		<!-- 顶部栏 -->
		<view id="top">
			<!-- 个人信息 -->
			<view id="info">
				<view id="idBox">
					<view>
						<image id="sculpture" :src="userSculpture"></image>
					</view>
					<view id="userID">{{userID}}</view>
				</view>
				<view></view>
				<view id="editBtn">编辑 ></view>
			</view>

			<!-- 功能区 -->
			<view id="functionTable">
				<view class="functionBox">
					<image class="functionImg" src="/static/icon/right.png"></image>
					<view>权益中心</view>
				</view>
				<view class="functionBox">
					<image class="functionImg" src="/static/icon/bill.png"></image>
					<view>物业账单</view>
				</view>
				<view class="functionBox">
					<image class="functionImg" src="/static/icon/star.png"></image>
					<view>收藏</view>
				</view>
			</view>
		</view>

		<!-- 选项区 -->
		<view class="optionBox">
			<view class="option">
				<view>
					<image class="optionImg" src="/static/icon/my_activity.png"></image>
				</view>
				<view class="optionText">我的活动</view>
				<view class="optionMark"> > </view>
			</view>
			<view class="line"></view>
			<view class="option" @tap="toAuthentication">
				<view>
					<image class="optionImg" src="../../static/icon/verify.png"></image>
				</view>
				<view class="optionText">身份验证</view>
				<view class="optionMark"> > </view>
			</view>
			<view class="line"></view>
			<view class="option">
				<view>
					<image class="optionImg" src="/static/icon/about.png"></image>
				</view>
				<view class="optionText">关于SODU社达</view>
				<view class="optionMark"> > </view>
			</view>
			<view class="line"></view>
			<button class="btn" @tap="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userID: this.globalUserID,
				token: '',
				userSculpture: this.globalUserSculptrue
			}
		},
		onLoad() {
			let _this = this;
			uni.getStorage({
				key: "username",
				success(res) {
					_this.userID = res.data;
				}
			});
			uni.getStorage({
				key: "token",
				success(res) {
					_this.token = res.data;
				}
			});
		},
		methods: {
			toAuthentication() {
				uni.navigateTo({
					url: "authentication"
				});
			},
			logout() {
				console.log(this.token);
				uni.request({
					method: "GET",
					url: this.requestURL + "/accounts/logout",
					dataType: "json",
					header:{
						'content-type': 'application/x-www-form-urlencoded',
						'token': this.token
					},
					success(res) {
						let response = res.data;
						if(response.success) {
							uni.setStorage({
								key: "isLogin",
								data: false
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
  #backBox{
    z-index: 1;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0) 34%, white 34%, white 100%);
  }
  
	#top {
		width: 100%;
		height: 300rpx;
		z-index: 1;
		position: absolute;
	}

	#info {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	#idBox {
		display: flex;
		align-items: center;
	}

	#sculpture {
		width: 133rpx;
		height: 133rpx;
		margin: 33rpx;
	}

	#userID {
		font-size: 40rpx;
		font-weight: bold;
		color: #FFFFFF;
	}

	#editBtn {
		margin-right: 40rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: #FFFFFF;
	}

	#functionTable {
		z-index: 2;
		position: relative;
		top: 20rpx;
		background-color: #FFFFFF;
		width: 90%;
		margin-left: 5%;
		padding: 40rpx;
		border-radius: 50rpx;
		display: flex;
		justify-content: space-around;
		box-shadow: 0rpx 10rpx 10rpx #DDDDDD;
	}

	.functionBox {
		width: 133rpx;
		text-align: center;
		font-size: 27rpx;
		font-weight: bold;
		color: #ED5941;
	}

	.functionImg {
		width: 133rpx;
		height: 133rpx;
		padding: 20rpx;
		border: 4rpx solid #ED5941;
		border-radius: 50%;
		box-shadow: 0rpx 0rpx 15rpx #AAAAAA;
		margin-bottom: 10rpx;
	}

	.optionBox {
		margin-top: 600rpx;
		margin-left: 5%;
		width: 90%;
	}

	.option {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 70rpx;
		margin-bottom: 5rpx;
	}

	.optionImg {
		width: 46rpx;
		height: 46rpx;
		margin-right: 16rpx;
	}

	.optionText {
		margin-right: auto;
		margin-bottom: 12rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #35312E;
	}

	.optionMark {
		font-size: 32rpx;
		color: #35312E;
	}

	.line {
		width: 100%;
		height: 1rpx;
		background: #AAAAAA;
	}
	
	.btn {
		margin: 120rpx auto;
		width: 400rpx;
		height: 80rpx;
    border: 4rpx solid #ED5941;
		border-radius: 20rpx;
		font-size: 32rpx;
    font-weight: bold;
		color: #ED5941;
		box-shadow: 0rpx 0rpx 10rpx #AAAAAA;
	}
</style>
