<template>
	<view class="page">
		<view class="back"></view>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-custom" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">SUDO</block>
			<block slot="right">
				<navigator url="search">
					<image id="searchBtn" src="/static/icon/search.png">
				</navigator>
			</block>
		</cu-custom>

		<!-- 轮播图 -->
		<swiper class="card-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
		 indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in swiperList" :key="index" :class="cardCur==index?'cur':''">
				<view class="swiper-item">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</view>
			</swiper-item>
		</swiper>

		<!-- 党建表格 -->
		<view>
			<view class="titleBox">
				<text>社区党建</text>
			</view>
			<view class="iconTable">
				<view class="iconBox">
					<image class="iconIndex" src="/static/icon/history2.png"></image>
					<view>我党历史</view>
				</view>
				<view class="iconBox">
					<image class="iconIndex" src="/static/icon/guide.png"></image>
					<view>会议指示</view>
				</view>
				<view class="iconBox">
					<image class="iconIndex" src="/static/icon/meeting.png"></image>
					<view>支部会议</view>
				</view>
			</view>
			<view class="iconTable">
				<view class="iconBox">
					<image class="iconIndex" src="/static/icon/infomation.png">
						<view>党建信息</view>
				</view>
				<view class="iconBox">
					<image class="iconIndex" src="/static/icon/activity.png">
						<view>党建活动</view>
				</view>
				<view class="iconBox">
					<image class="iconIndex" src="/static/icon/giveback.png">
						<view>反馈意见</view>
				</view>
			</view>
		</view>

		<!-- 通知栏 -->
		<view id="msgBar">
			<view class="titleBox">
				<text>通知送达</text>
			</view>
			<view class="msgBox">
				<image class="danger" src="/static/icon/danger.png">
					<view>
						<view class="titleMsg">体温监测通知</view>
						<view class="contentMsg">maecenas volutpat, odio eget imperdiet</view>
						<view class="dateMsg">4.20 12:00</view>
					</view>
			</view>
			<view class="msgBox">
				<image class="danger" src="/static/icon/danger.png">
					<view>
						<view class="titleMsg">体温监测通知</view>
						<view class="contentMsg">maecenas volutpat, odio eget imperdiet</view>
						<view class="dateMsg">4.20 12:00</view>
					</view>
			</view>
			<view class="msgBox">
				<image class="danger" src="/static/icon/danger.png">
					<view>
						<view class="titleMsg">体温监测通知</view>
						<view class="contentMsg">maecenas volutpat, odio eget imperdiet</view>
						<view class="dateMsg">4.20 12:00</view>
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 轮播图片列表
				swiperList: [{
					id: 0,
					type: 'image',
					url: '/static/img/index_01.jpg'
				}, {
					id: 1,
					type: 'image',
					url: '/static/img/index_02.jpg'
				}, {
					id: 2,
					type: 'image',
					url: '/static/img/index_03.jpg'
				}, {
					id: 3,
					type: 'image',
					url: '/static/img/index_04.jpg'
				}],
				dotStyle: false,
				towerStart: 0,
				direction: ''
			}
		},
		onLoad() {				// 进入首页时，判断是否已登录，若未登录，跳到登录页。
			uni.getStorage({
				key: "isLogin",
				success(res) {
					if(res.data == false) {
						uni.redirectTo({
							url: "./login"
						});
					}
				},
				fail() {
					uni.redirectTo({
						url: "./login"
					});
				}
			});
		}
	}
</script>

<style>
	#searchBtn {
		margin-top: 6rpx;
		margin-right: 25rpx;
		width: 40rpx;
		height: 40rpx;
	}

	.content {
		align-items: center;
	}

	.titleBox {
		width: 240rpx;
		height: 80rpx;
		background-color: #F5D46B;
		border-radius: 30rpx;
		text-align: center;
		padding-top: 18rpx;
		font-weight: bold;
		font-size: 35rpx;
		font: Adobe Heiti Std R;
		margin-bottom: 30rpx;
		margin-left: 20rpx;
		box-shadow: -10rpx 10rpx 5rpx #DDDDDD;
	}

	.iconTable {
		display: flex;
		justify-content: space-around;
		margin: 30rpx;
	}

	.iconBox {
		color: #CD3A44;
		text-align: center;
		font-size: 30rpx;
	}

	.iconIndex {
		width: 150rpx;
		height: 150rpx;
		padding: 30rpx;
		border-radius: 50%;
		background-color: #CD3A44;
		color: #FFFFFF;
		box-shadow: -10rpx 10rpx 5rpx #DDDDDD;
		margin-bottom: 20rpx;
	}

	.msgBox {
		display: flex;
		background-color: #FAEBEC;
		color: #35312E;
		margin: 30rpx;
		padding: 5rpx;
		border-top-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
		box-shadow: -10rpx 10rpx 5rpx #DDDDDD;
	}

	.iconDanger {
		font-size: 100rpx;
		color: #CD3A44;
		margin: 5rpx;
	}

	.titleMsg {
		font-weight: bold;
		font-size: 30rpx;
		margin: 5rpx;
	}

	.contentMsg {
		font-weight: bold;
		font-size: 25rpx;
		margin: 5rpx;
	}

	.dateMsg {
		font-size: 20rpx;
		color: #9A9A9A;
	}

	.danger {
		height: 100rpx;
		width: 100rpx;
		margin-right: 30rpx;
	}
</style>
