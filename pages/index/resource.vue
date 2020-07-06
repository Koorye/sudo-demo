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
			<view class="functionTable">
				<view class="functionBox" @tap="toMap">
					<view>
						<image class="functionImg" src="/static/icon/government.png"></image>
					</view>
					<view>政务机构</view>
					<view class="tagBox" v-show="tags[0]">{{tags[0]}}</view>
				</view>
				<view class="functionBox">
					<view>
						<image class="functionImg" src="/static/icon/property.png"></image>
					</view>
					<view>物业</view>
					<view class="tagBox" v-show="tags[1]">{{tags[1]}}</view>
				</view>
				<view class="functionBox">
					<view>
						<image class="functionImg" src="/static/icon/neighborhood.png"></image>
					</view>
					<view>居委会</view>
					<view class="tagBox" v-show="tags[2]">{{tags[2]}}</view>
				</view>
			</view>
			<view class="functionTable">
				<view class="functionBox">
					<view>
						<image class="functionImg" src="/static/icon/market.png"></image>
					</view>
					<view>社区市场</view>
					<view class="tagBox" v-show="tags[3]">{{tags[3]}}</view>
				</view>
				<view class="functionBox">
					<view>
						<image class="functionImg" src="/static/icon/bank.png"></image>
					</view>
					<view>银行业务</view>
					<view class="tagBox" v-show="tags[4]">{{tags[4]}}</view>
				</view>
				<view class="functionBox">
					<view>
						<image class="functionImg" src="/static/icon/delivery.png"></image>
					</view>
					<view>快递</view>
					<view class="tagBox" v-show="tags[5]">{{tags[5]}}</view>
				</view>
			</view>
			<view class="functionTable">
				<view class="functionBox">
					<view>
						<image class="functionImg" src="/static/icon/trip.png"></image>
					</view>
					<view>旅游在线</view>
					<view class="tagBox" v-show="tags[6]">{{tags[6]}}</view>
				</view>
				<view class="functionBox">
					<view>
						<image class="functionImg" src="/static/icon/volunteer.png"></image>
					</view>
					<view>志愿服务</view>
					<view class="tagBox" v-show="tags[7]">{{tags[7]}}</view>
				</view>
				<view class="functionBox hidden">
					<view>
						<image class="functionImg" src="/static/icon.png"></image>
					</view>
					<view class="tagBox" v-show="tags[8]">{{tags[8]}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tags: [2, 1, 0, 0, 2, 0, 2, 0]
			}
		},methods:{
			toMap(){
				uni.redirectTo({
					url:"map"
				})
			}
		}
	}
</script>

<style>
	.tagBox {
		z-index: 2;
		position: relative;
		left: 130rpx;
		bottom: 190rpx;
		width: 46rpx;
		height: 46rpx;
		border-radius: 50%;
		background-color: #F5D46B;
		padding-top: 10rpx;
		font-size: 27rpx;
		color: #35312E;
	}

	.functionTable {
		display: flex;
		justify-content: space-around;
	}

	.functionBox {
		width: 200rpx;
		height: 200rpx;
		text-align: center;
		font-size: 27rpx;
		font-weight: bold;
		color: #CD3A44;
		margin-top: 60rpx;
	}

	.functionImg {
		z-index: 1;
		width: 150rpx;
		height: 150rpx;
		border: 4rpx solid #CD3A44;
		padding: 20rpx;
		border-radius: 50%;
		box-shadow: 0rpx 0rpx 15rpx #AAAAAA;
	}
</style>
