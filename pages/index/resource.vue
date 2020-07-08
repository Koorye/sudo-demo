<template>
	<view class="page">
		<view class="back"></view>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-custom" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">SUDO</block>
		</cu-custom>

		<!-- 功能区 -->
		<view>
      <view class="functionBox">
        <view>< 全部服务</view>
        <!-- 搜索框 -->
        <view id="searchForm">
          <input id="searchText" type="text" placeholder="搜索" placeholder-style="color:#99999B" v-model="info" />
          <image id="searchBtn" src="/static/icon/search2.png"></image>
        </view>
      </view>
      
      <view class="titleBox">我要报修</view>
      <view class="functionRow">
        <view>
          <view>
            <image class="functionIcon" src="../../static/icon/repair.png"></image>
          </view>
          <view>我要维修</view>
        </view>
        <view>
          <view>
            <image class="functionIcon" src="../../static/icon/door.png"></image>
          </view>
          <view>门禁钥匙</view>
        </view>
        <view class="hidden">
          <view>
            <image class="functionIcon" src="../../static/icon/repair.png"></image>
          </view>
          <view>我要维修</view>
        </view>
      </view>
      <view class="titleBox">意见反馈</view>
      <view class="functionRow">
        <view @tap="toFeedBack">
          <view>
            <image class="functionIcon" src="../../static/icon/feedback2.png"></image>
          </view>
          <view>意见与反馈</view>
        </view>
        <view>
          <view>
            <image class="functionIcon" src="../../static/icon/consult.png"></image>
          </view>
          <view>我要咨询</view>
        </view>
        <view class="hidden">
          <view>
            <image class="functionIcon" src="../../static/icon/repair.png"></image>
          </view>
          <view>我要维修</view>
        </view>
      </view>
      <view class="titleBox">更多功能</view>
      <view class="functionRow">
        <view>
          <view>
            <image class="functionIcon" src="../../static/icon/environment2.png"></image>
          </view>
          <view>园区环境</view>
        </view>
        <view>
          <view>
            <image class="functionIcon" src="../../static/icon/customer.png"></image>
          </view>
          <view>访客通行</view>
        </view>
        <view>
          <view>
            <image class="functionIcon" src="../../static/icon/fee3.png"></image>
          </view>
          <view>我要缴费</view>
        </view>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: ''
			}
		},methods:{
			toFeedBack() {
				uni.navigateTo({
					url: "feedback"
				});
			}
		}
	}
</script>

<style>
  .back{
    background: #FFFFFF;
  }
  
  .functionBox{
    margin: 30rpx 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 40rpx;
  }
  
  #searchForm {
  	display: flex;
  	align-items: center;
  	width: 65%;
  	height: 60rpx;
  	padding: 30rpx;
    background-color: #FAEBEC;
  	border-radius: 40rpx;
  }
  
  #searchText {
  	width: 90%;
  	color: #99999B;
  	font-size: 32rpx;
  }
  
  #searchBtn {
  	width: 40rpx;
  	height: 40rpx;
  }
  
  .titleBox{
    margin: 40rpx 60rpx;
    color: #008873;
    font-size: 36rpx;
    font-weight: bold;
  }
  
  .functionRow{
    display: flex;
    justify-content: space-around;
    text-align: center;
    color: #99999B;
    font-weight: bold;
  }
  
  .functionIcon{
    height: 140rpx;
    width: 140rpx;
  }
</style>
