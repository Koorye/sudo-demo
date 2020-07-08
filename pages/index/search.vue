<template>
	<view>
		<view class="back"></view>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-custom" :isBack="true">
			<navigator url="index">
				<block slot="backText">返回</block>
			</navigator>
			<block slot="content">搜索</block>
		</cu-custom>

		<!-- 搜索框 -->
		<view id="searchBox">
			<view id="searchTitle">SUDO</view>
			<view id="searchForm">
				<input id="searchText" type="text" placeholder="搜索" placeholder-style="color:#FFFFFF" v-model="info" />
				<image id="searchBtn" src="/static/icon/search.png"></image>
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
		}
	}
</script>

<style>
	#searchBox {
		width: 100%;
		height: 900rpx;
	}

	#searchTitle {
		padding-top: 400rpx;
		text-align: center;
		font-size: 67rpx;
		color: #FFFFFF;
	}

	#searchForm {
		display: flex;
		align-items: center;
		width: 90%;
		height: 80rpx;
		margin-top: 100rpx;
		margin-left: 5%;
		padding-left: 30rpx;
		border: 3rpx solid #FFFFFF;
		border-radius: 40rpx;
	}

	#searchText {
		width: 90%;
		color: #FFFFFF;
		font-size: 40rpx;
	}

	#searchBtn {
		width: 40rpx;
		height: 40rpx;
	}
</style>
