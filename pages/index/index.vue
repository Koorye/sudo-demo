<template>
	<view id="backBox">
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
		 :autoplay="true" interval="50000" duration="500" @change="cardSwiper" indicator-color="#8799a3"
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
			<view class="iconTable">
				<view class="iconBox">
					<image class="iconIndex" src="/static/icon/history2.png"></image>
					<view>我党历史</view>
				</view>
				<view class="iconBox">
					<image class="iconIndex" src="/static/icon/info.png"></image>
					<view>党建信息</view>
				</view>
				<view class="iconBox">
					<image class="iconIndex" src="/static/icon/meeting.png"></image>
					<view>支部会议</view>
				</view>
        <view class="iconBox">
        	<image class="iconIndex" src="/static/icon/feedback.png"></image>
        	<view>反馈意见</view>
        </view>
			</view>
		</view>

    <!-- 物业公告 -->
    <view class="announceBox">
      <view class="announceTitle">
        <view>物业</view>
        <view>公告</view>
      </view>
      <view class="verticalLine"></view>
      <view class="announceDetail">
        <view>提示：疫情防控提醒</view>
        <view class="hidden">hidden</view>
        <view> > </view>
      </view>
    </view>

		<!-- 通知栏 -->
		<view id="msgBar">
			<view class="titleBox">
				<text>通知送达</text>
			</view>
			<view class="msgBox">
				<image class="danger" src="/static/icon/notice.png">
					<view>
						<view class="titleMsg">体温监测通知</view>
						<view class="contentMsg">maecenas volutpat, odio eget imperdiet</view>
						<view class="dateMsg">4.20 12:00</view>
					</view>
			</view>
			<view class="msgBox">
				<image class="danger" src="/static/icon/notice.png">
					<view>
						<view class="titleMsg">体温监测通知</view>
						<view class="contentMsg">maecenas volutpat, odio eget imperdiet</view>
						<view class="dateMsg">4.20 12:00</view>
					</view>
			</view>
			<view class="msgBox">
				<image class="danger" src="/static/icon/notice.png">
					<view>
						<view class="titleMsg">体温监测通知</view>
						<view class="contentMsg">maecenas volutpat, odio eget imperdiet</view>
						<view class="dateMsg">4.20 12:00</view>
					</view>
			</view>
      <view class="msgBox">
      	<image class="danger" src="/static/icon/notice.png">
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
					url: '/static/img/index_01.jfif'
				}, {
					id: 3,
					type: 'image',
					url: '/static/img/index_02.jfif'
				}],
				dotStyle: false,
				towerStart: 0,
				direction: '',
				token: ''
			}
		},
		onLoad() {				// 进入首页时，判断是否已登录。
			var _this = this;
			uni.getStorage({
				key: "isLogin",
				success(res) {
					if(res.data == false) {   //若未登录，跳到登录页
						uni.redirectTo({
							url: "./login"
						});
					}
					else {		//如果登录了，还要判断token是否过期
						uni.getStorage({
							key: "token",
							success(res) {
								_this.token = res.data;
							}
						});
						uni.request({
							method: "POST",
							url: _this.requestURL + "/accounts/verifyToken",
							dataType: "json",
							header:{
								'content-type': 'application/x-www-form-urlencoded',
								'token': _this.token
							},
							success(res) {
								let response = res.data;
								if(response.success) {		//如果没过期，刷新token
									_this.token = response.data;
									uni.setStorage({
										key: "token",
										data: _this.token
									});
								}
								else {						//如果过期了，重新登录
									uni.setStorage({
										key: "isLogin",
										data: false
									});
									uni.redirectTo({
										url: "./login"
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
  #backBox{
    z-index: 1;
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0) 20%, white 20%, white 100%);
  }
  
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
		background-color: #0E8873;
    color: #FFFFFF;
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
		color: #F7AB50;
		text-align: center;
		font-size: 30rpx;
	}

	.iconIndex {
		width: 120rpx;
		height: 120rpx;
		padding: 30rpx;
		border-radius: 50%;
		background-color: #F7AB50;
		color: #FFFFFF;
		box-shadow: -10rpx 10rpx 5rpx #DDDDDD;
		margin-bottom: 20rpx;
	}

  .announceBox{
    height: 120rpx;
    width: 94%;
    margin: 20rpx 3%;
    padding: 3%;
    border-radius: 20rpx;
    display: flex;
    font-size: 36rpx;
    justify-content: space-between;
    align-items: center;
    color: #707070;
    background-color: #FFF4E0;
  }
  
  .announceDetail{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  
  .verticalLine{
    width: 2rpx;
    height: 60rpx;
    background: #707070;
  }

  .announceTitle{
    color: #F7AB50;
    font-weight: bold;
    font-size: 38rpx;
    border-right: #707070;
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
