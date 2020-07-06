<template>
	<view class="page">
		<view class="back"></view>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-custom" :isBack="true">
			<block slot="backText"><text id="backBtn" @tap="back">返回</text></block>
			<block slot="content">反馈</block>
		</cu-custom>

		<!-- 底端栏 -->
		<view id="feedbackBox">
			<input id="feedbackText" type="text" v-model="msg" placeholder="编辑发送内容" placeholder-style="color:#8F8F8F" />
			<view id="feedbackBtn" @tap="send">发送</view>
		</view>

		<!-- 聊天窗口 -->
		<view id="window" v-for="(item,index) in msgList" :key=index>
			<view class="userBox" v-if="item.isAdmin">
				<view>
					<image class="leftSculpture" src="/static/icon/sculptrue_man.png"></image>
				</view>
				<view class="leftMsgBox">{{item.msg}}</view>
			</view>
			<view class="userBox" v-if="!item.isAdmin">
				<view class="rightMsgBox">{{item.msg}}</view>
				<view>
					<image class="rightSculpture" src="/static/icon/sculptrue_boy.png"></image>
				</view>
			</view>
		</view>
		<view id="blank"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: '',
				msgList: [{
					msg: '您好，请问有什么问题？',
					isAdmin: true
				}]
			}
		},
		methods: {
			back() {
				uni.switchTab({
					url: "me"
				});
			},
			send() {
				let that = this;
				let msg = this.msg;
				if (msg) {
					this.msgList.push({
						msg: msg,
						isAdmin: false
					});
					setTimeout(function() {
						that.msgList.push({
							msg: '正在为您接入客服服务，请稍等。（后台服务尚未实现）',
							isAdmin: true
						});
					}, 1000);
					this.msg = '';
					uni.pageScrollTo({
						scrollTop: 999999
					})
				}
			}
		}
	}
</script>

<style>
	#backBtn {
		margin-bottom: 10rpx;
	}

	#window {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
	}

	.userBox {
		margin-top: 40rpx;
		width: 90%;
		margin-left: 5%;
		display: flex;
		align-items: center;
	}

	.leftSculpture {
		width: 120rpx;
		height: 120rpx;
	}

	.leftMsgBox {
		width: 500rpx;
		margin-left: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		background-color: #FAEBEC;
		border-radius: 40rpx;
		color: #35312E;
		word-wrap: break-word;
	}


	.rightMsgBox {
		width: 500rpx;
		margin-left: auto;
		margin-right: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		background-color: #FAEBEC;
		border-radius: 40rpx;
		color: #35312E;
		word-wrap: break-word;
	}

	.rightSculpture {
		width: 120rpx;
		height: 120rpx;
		margin-left: auto;
	}

	#feedbackBox {
		width: 100%;
		bottom: 0;
		background-color: #FFFFFF;
		z-index: 999;
		position: fixed;
		display: flex;
		align-items: center;
	}

	#feedbackText {
		width: 70%;
		height: 80rpx;
		margin-left: 5%;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
		padding-left: 30rpx;
		background-color: #FAEBEC;
		border: 2rpx solid #CD3A44;
		border-radius: 20rpx;
	}

	#feedbackBtn {
    margin-left: 30rpx;
    padding-top: 5rpx;
		width: 120rpx;
		height: 60rpx;
		background-color: #448ACA;
		border-radius: 20rpx;
		color: #FFFFFF;
		font-size: 34rpx;
    text-align: center;
	}

	#blank {
		height: 140rpx;
	}
</style>
