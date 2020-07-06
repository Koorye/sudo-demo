<template>
	<view class="page">
		<view class="back"></view>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-custom" :isBack="true">
			<block slot="backText"><text id="backBtn" @tap="toIndex">返回</text></block>
			<block slot="content">TODO</block>
		</cu-custom>
	</view>
</template>

<script>
	export default {
		methods: {
			toIndex() {
				uni.switchTab({
					url: "index",
					fail(err) {
						console.log(err);
					}
				})
			}
		}
	}
</script>

<style>
	#backBtn{
		margin: 10rpx;
	}
	
	.cat {
		margin: 10%;
		width: 80%;
		height: 600rpx;
	}
</style>
