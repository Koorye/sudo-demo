<template>
	<view class="page">
		<view class="back"></view>
		<!-- 导航栏 -->
		<cu-custom bgColor="bg-custom" :isBack="true">
			<block slot="backText"><text id="backBtn">返回</text></block>
			<block slot="content">身份认证</block>
		</cu-custom>
		<view id="topBox">
			<view id="topTitle">认证信息</view>
			<view id="state">{{state}}</view>
		</view>
		<view id="blank"></view>
		<!-- 认证信息 -->
		<view class="content">
			<view class="row">
				<text class="tit">省</text>
				<input class="input" type="text" v-model="province" placeholder="请输入所在省" placeholder-style="color:#A5A5A5" v-bind:disabled="dis_update" @input="checkSubmitPermit()"/>
			</view>
			<view class="row">
				<text class="tit">市</text>
				<input class="input" type="text" v-model="city" placeholder="请输入所在市" placeholder-style="color:#A5A5A5" v-bind:disabled="dis_update" @input="checkSubmitPermit()"/>
			</view>
			<view class="row">
				<text class="tit">区</text>
				<input class="input" type="text" v-model="district" placeholder="请输入所在区" placeholder-style="color:#A5A5A5" v-bind:disabled="dis_update" @input="checkSubmitPermit()"/>
			</view>
			<view class="row">
				<text class="tit">小区</text>
				<input class="input" type="text" v-model="block" placeholder="请输入所在小区" placeholder-style="color:#A5A5A5" v-bind:disabled="dis_update" @input="checkSubmitPermit()"/>
			</view>
			<view class="row">
				<text class="tit">楼号</text>
				<input class="input" type="text" v-model="houseNo" placeholder="请输入楼号" placeholder-style="color:#A5A5A5" v-bind:disabled="dis_update" @input="checkSubmitPermit()"/>
			</view>
			<view class="row">
				<text class="tit">楼层</text>
				<input class="input" type="text" v-model="floor" placeholder="请输入楼层号" placeholder-style="color:#A5A5A5" v-bind:disabled="dis_update" @input="checkSubmitPermit()"/>
			</view>
			<view class="row">
				<text class="tit">房号</text>
				<input class="input" type="text" v-model="roomNo" placeholder="请输入房间号" placeholder-style="color:#A5A5A5" v-bind:disabled="dis_update" @input="checkSubmitPermit()"/>
			</view>
		</view>
		<view>
			<button class="update" @tap="update" v-if="dis_update">修改信息</button>
			<button class="submit" @tap="submit" v-if="!dis_update" v-bind:disabled="dis_submit">提交</button>
			<button class="cancel" @tap="cancel" v-if="!dis_update">取消</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dis_update: true,	//默认不允许修改，点击修改按钮后才能修改
				dis_submit:true,
				username: '',
				token: '',
				state: '未认证',
				province: '',		//省
				city: '',			//市
				district: '',		//区
				block: '',			//小区
				houseNo: '',		//楼号
				floor: '',			//楼层
				roomNo: ''			//房号
			}
		},
		onLoad() {
			let _this = this;
			uni.getStorage({
				key: "username",
				success(res) {
					_this.username = res.data;
				}
			});
			uni.getStorage({
				key: "token",
				success(res) {
					_this.token = res.data;
				}
			});
			uni.request({
				method: "GET",
				url: _this.requestURL + "/auths/users/" + _this.username,
				dataType: "json",
				header:{
					'content-type': 'application/json',
					'token': _this.token
				},
				success(res) {
					let response = res.data;
					console.log(response);
					if(response.success) {
						_this.state = response.data.state;
						_this.province = response.data.province;
						_this.city = response.data.city;
						_this.district = response.data.district;
						_this.block = response.data.block;
						_this.houseNo = response.data.houseNo;
						_this.floor = response.data.floor;
						_this.roomNo = response.data.roomNo;
					}
					else {
						uni.showModal({
							title: "获取失败",
							content: "请重试"
						});
					}
				},
				fail() {
					uni.showModal({
						title: "获取失败",
						content: "请检查网络连接"
					});
				}
			});
		},
		methods: {
			checkSubmitPermit() {
				if(this.province != '' && this.city != '' && this.district != '' && this.block != '' && this.houseNo != '' && this.floor != '' && this.roomNo != '')
					this.dis_submit = false;
				else
					this.dis_submit = true;
			},
			update() {
				this.dis_update = false;	
			},
			cancel() {
				this.dis_update = true;
				uni.redirectTo({
					url: "./authentication"
				});
			},
			submit() {
				var _this = this;
				
				uni.request({
					method: "POST",
					url: _this.requestURL + "/auths",
					dataType: "json",
					header:{
						'content-type': 'application/x-www-form-urlencoded',
						'token': _this.token
					},
					data: {
						"username": _this.username,
						"province": _this.province,
						"city": _this.city,
						"district": _this.district,
						"block": _this.block,
						"houseNo": _this.houseNo,
						"floor": _this.floor,
						"roomNo": _this.roomNo
					},
					success(res) {
						var response = res.data;
						console.log(response);
						if(response.success) {
							console.log(response)
							uni.showToast({
								title: '提交成功',
								icon: 'none',
								duration: 1000
							});
							uni.redirectTo({
								url: "./authentication"
							})
						}
						else {
							uni.showModal({
								title: "提交失败",
								content: response.errMsg
							});
						}
					},
					fail() {
						uni.showModal({
							title: "提交失败",
							content: "请检查网络连接"
						});
					}
				});
			}
		}
	}
</script>

<style>
  .back {
     background: #FFFFFF;
  }
  
	#topBox {
		z-index: 999;
		width: 100%;
		padding-left: 5%;
		padding-top: 40rpx;
		display: flex;
		color: #ED5941;
		font-size: 40rpx;
		position: fixed;
		background-color: #FFFFFF;
	}
	
	#topTitle {
		font-size: 40rpx;
		font-weight: bold;
	}
	
	#blank {
		height: 160rpx;
	}
	
	#state {
		text-align: center;
		margin-left: 55%;
		padding-top: 8rpx;
		width: 140rpx;
		height: 60rpx;
		color: #FFFFFF;
		background-color: #ED5941;
		border-radius: 24rpx;
		font-size: 34rpx;
	}
	
	 .row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;
	}
	
	.tit {
		flex-shrink: 0;
		width: 120upx;
		font-size: 30upx;
	}
	
	.input {
		flex: 1;
		font-size: 30upx;
	}
	
	.update {
		margin-top: 60rpx;
		width: 400rpx;
		height: 80rpx;
		background-color: #ED5941;
		border-radius: 40rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		box-shadow: 0rpx 0rpx 10rpx #AAAAAA;
	}
	
	.submit {
		margin-top: 60rpx;
		margin-left: 15%;
		width: 200rpx;
		height: 80rpx;
		background-color: #ED5941;
		border-radius: 40rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		box-shadow: 0rpx 0rpx 10rpx #AAAAAA;
		float:left;
	}
	
	.cancel {
		margin-top: 60rpx;
		margin-right: 15%;
		width: 200rpx;
		height: 80rpx;
		background-color: #FFFFFF;
		border-radius: 40rpx;
		font-size: 32rpx;
		color: #ED5941;
		box-shadow: 0rpx 0rpx 10rpx #AAAAAA;
		float:right;
	}
</style>
