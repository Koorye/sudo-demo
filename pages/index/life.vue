<template>
	<view class="page">
		<view class="back"></view>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-custom" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">SUDO生活</block>
		</cu-custom>
    
    <!-- 功能栏 -->
    <view id="functionBox">
      <view>
        <view>
          <image class="iconBox" src="/static/icon/education.png"></image>
        </view>
        <view>家庭教育</view>
      </view>
      <view>
        <view>
          <image class="iconBox" src="/static/icon/community2.png"></image>
        </view>
        <view>社区活动</view>
      </view>
      <view>
        <view>
          <image class="iconBox" src="/static/icon/fee.png"></image>
        </view>
        <view>线上地摊</view>
      </view>
      <view>
        <view>
          <image class="iconBox" src="/static/icon/pet.png"></image>
        </view>
        <view>爱宠交流</view>
      </view>
      <view>
        <view>
          <image class="iconBox" src="/static/icon/car.png"></image>
        </view>
        <view>爱车一族</view>
      </view>
    </view>

		<!-- 标题栏 -->
		<view id="topBox">
			<view id="topTitle">SUDO社圈</view>
			<view id="submitBtn" @tap="openSubmitModal">发布</view>
		</view>
		<view id="blank"></view>

		<!-- 发布模态框 -->
		<view id="modalBack"  v-show="showModal">
      <view id="submitModal">
        <textarea id="modalText" placeholder="请输入内容" v-model="modalMsg" />
        <view id="modalBtnBox">
          <button class="modalBtn" @tap="exitSubmitModal">退出</button>
          <button class="modalBtn" @tap="submitMsg">发布</button>
        </view>
      </view>
		</view>

		<!-- 社交信息 -->
		<view v-for="(item,index) in msgList" :key="index">
			<view class="infoBox" v-if="item.id!=''">
				<view>
					<image class="sculpture" :src="item.sculpture"></image>
				</view>
				<view class="textBox">
					<view class="userBox">
						<view class="userID">{{item.id}}</view>
						<view class="submitDate">{{item.date}}</view>
					</view>
					<view class="submitMsg">{{item.msg}}</view>
					<view>
						<image class="submitImg" v-if="item.img" :src="item.img"></image>
					</view>
				</view>
			</view>
			<view class="activityBox" v-if="item.id==''">
				<view class="titleBox">社区活动</view>
				<image class="activityImg" v-if="item.img" :src="item.img">
			</view>
			<view class="line"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showModal: false,
				modalMsg: '',
				msgList: [{
					id: "党建服务队",
					sculpture: "/static/icon/sculptrue_boy.png",
					date: "今天 12:00",
					msg: "Lorem ipsum dolor sit amet, Risus commodo viverra maecenas.",
					img: "/static/img/life_02.png"
				}, {
					id: "居民委员会",
					sculpture: "/static/icon/sculptrue_man.png",
					date: "今天 12:00",
					msg: "Lorem ipsum dolor sit amet, Risus commodo viverra maecenas.",
					img: "/static/img/life_01.png"
				}, {
					id: "",
					sculpture: "",
					date: "",
					msg: "",
					img: "/static/img/life_02.png"
				}]
			}
		},
		methods: {
			getTime() {
				let date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				let timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
				return timer;
			},
			openSubmitModal() {
				this.showModal = true;
			},
			exitSubmitModal() {
				this.showModal = false;
			},
			submitMsg() {
				if(this.modalMsg!=''){
				this.msgList.unshift({
					id: this.globalUserID,
					sculpture: this.globalUserSculptrue,
					date: this.getTime(),
					msg: this.modalMsg,
					img: "/static/img/life_01.png"
				});
				this.modalMsg = '';
				this.showModal = false;
				uni.showModal({
					content:'发布成功！'
				})
				}else{
					uni.showModal({
						content:'内容不可为空！'
					});
				}
			}
		}
	}
</script>

<style>
  .back{
    background: #FFFFFF;
  }
  
  #functionBox{
    z-index: 999;
    display: flex;
    position: fixed;
    background-color: #FFFFFF;
    width: 100%;
    justify-content: space-around;
    padding: 20rpx;
    font-weight: bold;
    font-size: 24rpx;
    text-align: center;
  }
  
  .iconBox{
    width: 100rpx;
    height: 100rpx;
  }
  
	#topBox {
    top: 270rpx;
		z-index: 999;
		width: 100%;
		padding-left: 5%;
		display: flex;
		color: #ED5941;
		font-size: 40rpx;
		position: fixed;
		background-color: #FFFFFF;
	}

	#topTitle {
		font-size: 40rpx;
	}

	#submitBtn {
		text-align: center;
		margin-left: 50%;
		padding-top: 8rpx;
		width: 120rpx;
		height: 60rpx;
		color: #FFFFFF;
		background-color: #ED5941;
		border-radius: 30rpx;
		font-size: 34rpx;
	}

	#blank {
		height: 240rpx;
	}

	#modalBack{
		z-index: 1000;
		position: fixed;
		top:0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.3);
	}
	
	#modalBtnBox {
		display: flex;
		justify-content: space-around;
	}

	#submitModal {
		z-index: 999;
		position: fixed;
		width: 90%;
		height: 500rpx;
		bottom: 100rpx;
		margin-left: 5%;
		background-color: #FAEBEC;
		border-radius: 50rpx;
	}

	#modalText {
		width: 90%;
		height: 320rpx;
		margin-left: 5%;
		margin-top: 40rpx;
		padding: 40rpx;
		background-color: #FFFFFF;
		border: 2rpx solid #CD3A44;
		border-radius: 20rpx;
	}

	.modalBtn {
		width: 200rpx;
		height: 80rpx;
		margin-top: 40rpx;
		color: #FFFFFF;
		background-color: #ED5941;
		border-radius: 20rpx;
	}

	.infoBox {
		width: 100%;
		display: flex;
	}

	.textBox {
		width: 100%;
	}

	.userBox {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.sculpture {
		width: 100rpx;
		height: 100rpx;
		margin: 20rpx;
	}

	.userID {
		font-size: 33rpx;
		color: #35312E;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.submitDate {
		font-size: 20rpx;
		color: #A5A5A5;
		margin-left: auto;
		margin-right: 40rpx;
	}

	.submitMsg {
		width: 500rpx;
		font-size: 33rpx;
		color: #35312E;
		margin-right: 80rpx;
		word-wrap: break-word; 
 	}

	.submitImg {
		margin: 20rpx;
		width: 266rpx;
		height: 200rpx;
	}

	.activityBox {
		margin: 40rpx;
	}

	.titleBox {
		background-color: #ED5941;
		height: 64rpx;
		width: 180rpx;
		text-align: center;
		padding-top: 10rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #FFFFFF;
		border-radius: 20rpx;
	}

	.activityImg {
		width: 440rpx;
		height: 330rpx;
		margin-top: 20rpx;
		margin-left: 120rpx;
	}

	.line {
		width: 90%;
		margin-left: 5%;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		height: 1rpx;
		background: #AAAAAA;
	}
</style>
