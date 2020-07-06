<template>
  <view class="page">
    <view class="back"></view>
    <!-- 导航栏 -->
    <cu-custom bgColor="bg-custom" :isBack="false">
      <block slot="backText">返回</block>
      <block slot="content">选举投票</block>
    </cu-custom>

    <view id="msgBanner">
      <view><image id="bannerImg" src="/static/icon/volume.png"></image></view>
      <view>{{ bannerMsg }}</view>
    </view>

    <!-- 投票框 -->
    <view id="voteBox">
      <view id="voteMsgBox">
        <view>投票规则解析如下所示：</view>
        <view class="hidden"></view>
        <view id="videoBox">
          <view><image id="videoImg" src="/static/icon/videoPlay.png"></image></view>
          <view id="videoBtn">实时视频</view>
        </view>
      </view>
      <view><image id="video" src="/static/img/video.png"></image></view>
    </view>

    <!-- 我的投票 -->
    <view id="myVoteBox">
      <view id="myVoteTitle">票数情况：</view>
      <view>本场总票数为{{ totalNum }}票，您剩余{{ voteNum }}票；</view>
    </view>

    <!-- 投票头像 -->
    <view class="msgBox">可在如下选择候选人意向投票，点击左右候选人头像切换</view>
    <view id="peopleBox">
      <view class="sculptrueBox" v-for="(item, index) in peopleList" :key="item.id">
        <view v-if="index == 1">
          <view><image class="centerSculpture" :src="item.sculpture"></image></view>
          <view class="peopleVote">{{ item.name }}：{{ item.vote }}票</view>
        </view>
        <view v-if="index == 0" @tap="changeLeft"><image class="sculpture" :src="item.sculpture"></image></view>
        <view v-if="index == 2" @tap="changeRight"><image class="sculpture" :src="item.sculpture"></image></view>
      </view>
    </view>
    <view id="voteBtn" @tap="vote">投票</view>

    <!-- 投票人选 -->
    <view class="msgBox">本期投票明细如下：</view>
    <view class="listBox">
      <view class="peopleBox" v-for="(item, index) in peopleList" :key="item.id">
        <view class="nameBox">
          <view>意向人员：{{ item.name }}</view>
          <view class="hidden"></view>
          <view>当前状态：{{ item.status }}</view>
        </view>
        <view class="voteBox">投票票数：{{ item.vote }}</view>
        <view class="dateBox">
          <view>投票时间：{{ item.date }}</view>
        </view>
        <view class="line"></view>
      </view>
    </view>
    <view class="bottom"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      displayWidth: 0,
      onlineNum: 10,
      endDate: '2020-6-7 13:00:00',
      bannerMsg: '',
      totalNum: 2000,
      voteNum: 10,
      peopleList: [
        { id: 1, name: '张一敏', vote: 12, status: '等待开票', date: '2020-6-1 13:00:00', sculpture: '/static/img/image1.jpg' },
        { id: 2, name: '张凤祥', vote: 25, status: '等待开票', date: '2020-6-1 13:00:00', sculpture: '/static/img/image2.jpg' },
        { id: 3, name: '张锋', vote: 16, status: '等待开票', date: '2020-6-1 13:00:00', sculpture: '/static/img/image3.jpg' }
      ]
    };
  },
  created() {
    let msg = '欢迎投票，目前已有' + this.onlineNum + '个人参与，开票时间' + this.endDate;
    let that = this;
    let startPos = 0;
    setInterval(function() {
      that.bannerMsg = msg.substr(startPos, msg.length);
      ++startPos;
      if (startPos == msg.length) startPos = 0;
    }, 500);
  },
  methods: {
    changeLeft() {
      this.peopleList.unshift(this.peopleList[2]);
      this.peopleList.splice(3, 1);
    },
    changeRight() {
      this.peopleList.push(this.peopleList[0]);
      this.peopleList.splice(0, 1);
    },
    vote() {
      if (this.voteNum == 0) {
        uni.showModal({ content: '您的票数用光了哦' });
      } else {
        ++this.peopleList[1].vote;
        --this.voteNum;
        --this.totalNum;
      }
    }
  }
};
</script>

<style>
#msgBanner {
  z-index: 999;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60rpx;
  color: #fffdef;
  font-size: 24rpx;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
}

#bannerImg {
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}

#voteBox {
  margin-top: 40rpx;
  margin-left: 5%;
  width: 90%;
  border: 2rpx solid #aaaaaa;
  border-radius: 20rpx;
}
#voteMsgBox {
  display: flex;
  margin-top: 40rpx;
  justify-content: space-between;
  align-items: center;
  font-size: 30rpx;
  color: #35312e;
  margin-left: 30rpx;
}

#videoBox {
  display: flex;
  width: 200rpx;
  height: 60rpx;
  margin-right: 40rpx;
  border-radius: 24rpx;
  background-color: #faebec;
  border: 1rpx solid #cd3a44;
}

#videoImg {
  margin-top: 4rpx;
  margin-left: 10rpx;
  width: 50rpx;
  height: 50rpx;
}

#videoBtn {
  margin-left: 15rpx;
  margin-top: 15rpx;
  color: #35312e;
  font-size: 25rpx;
}

#video {
  margin-top: 20rpx;
  margin-left: 5%;
  margin-bottom: 20rpx;
  width: 90%;
  height: 420rpx;
}

#myVoteBox {
  width: 80%;
  margin-left: 10%;
  font-size: 30rpx;
}

#myVoteTitle {
  margin-top: 20rpx;
  margin-bottom: 10rpx;
  font-weight: bold;
  font-size: 30rpx;
}

.msgBox {
  margin-top: 40rpx;
  margin-bottom: 20rpx;
  margin-left: 50rpx;
  font-size: 26rpx;
  font-weight: bold;
  color: #0077aa;
}

#peopleBox {
  margin-left: 5%;
  width: 90%;
  display: flex;
  justify-content: space-between;
}

#voteBtn {
  margin-left: 20%;
  margin-bottom: 40rpx;
  width: 60%;
  height: 60rpx;
  padding-top: 10rpx;
  background-color: #cd3a44;
  text-align: center;
  font-size: 30rpx;
  font-weight: bold;
  border-radius: 10rpx;
  color: #ffffff;
}

.sculptrueBox {
  margin: 30rpx;
}

.centerSculpture {
  width: 200rpx;
  height: 200rpx;
  border-radius: 30rpx;
}

.sculpture {
  width: 150rpx;
  height: 150rpx;
  border-radius: 20rpx;
  margin-top: 20rpx;
}

.peopleVote {
  padding-top: 4rpx;
  font-size: 26rpx;
  text-align: center;
  color: #ffffff;
  height: 40rpx;
  border-radius: 14rpx;
  background-color: #0077aa;
}

.listBox {
  margin-left: 5%;
  width: 90%;
  border: 1rpx solid #cccccc;
  border-radius: 20rpx;
}

.nameBox {
  margin: 20rpx;
  display: flex;
  justify-content: space-between;
  font-size: 24rpx;
  color: #35312e;
}

.voteBox {
  margin-left: 20rpx;
  margin-top: 10rpx;
  color: #cd3a44;
  font-weight: bold;
}

.dateBox {
  margin-left: 20rpx;
  margin-top: 10rpx;
  font-size: 22rpx;
  color: #aaaaaa;
}

.line {
  width: 100%;
  border: 1rpx solid #cccccc;
  margin-top: 10rpx;
}

.bottom {
  height: 40rpx;
}
</style>
