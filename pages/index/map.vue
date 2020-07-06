<template>
  <view class="page">
    <!-- 导航栏 -->
    <cu-custom bgColor="bg-custom" :isBack="true">
      <block slot="backText"><text @tap="back">返回</text></block>
      <block slot="content">地图</block>
    </cu-custom>

    <!-- 搜索框 -->
    <view id="searchBox"><input type="text" placeholder="请输入要搜索的地址" v-model="searchMsg" /></view>

    <!-- 地图 -->
    <view class="map_container" :style="mapContBotm">
      <map class="map" id="map" :longitude="longitude" :latitude="latitude" scale="14" :markers="markers" @markertap="makertap"></map>
    </view>

    <!-- 地址信息 -->
    <view class="map_text" :style="mapTxtHeight">
      <view @click="tabhospital(index)" class="uni-flex" v-for="(item, index) in textData" :key="index" style="border-bottom:1px solid #E4E4E4;min-height:100px;height:auto">
        <view class="uni-flex-item">
          <text class="h1">{{ item.name }}</text>
          <text>
            {{ item.distance ? (item.distance > 1000 ? item.distance / 1000 + '公里' : item.distance + '米') : '' }}{{ item.address != '' ? '&nbsp;|&nbsp;' + item.address : '' }}
          </text>
        </view>
        <text v-show="item.tel[0]">电话：{{ item.tel }}</text>
      </view>
    </view>
  </view>
</template>

<script>
// import util from "../../../common/util.js";
import amap from '../../libs/amap-wx.js';
var markersData = [];
var poisData = [];
export default {
  data() {
    return {
      amapPlugin: null,
      key: '76172d35fda90a812e8db30b79085c91',
      markers: [{}, {}, {}],
      poisdatas: [{}, {}, {}],
      title: 'map',
      latitude: '',
      longitude: '',
      textData: [],
      mapContBotm: '',
      mapTxtHeight: '',
      searchMsg: ''
    };
  },
  onLoad() {
    var that = this;
    this.amapPlugin = new amap.AMapWX({
      //初始化
      key: this.key
    });
    this.amapPlugin.getRegeo({
      //我的位置
      iconPath: '/static/icon/position.png',
      iconWidth: 48,
      iconHeight: 48,
      success: function(data) {
        that.latitude = data[0].latitude;
        that.longitude = data[0].longitude;
      }
    });

    var params = {
      iconPathSelected: '/static/icon/position.png',
      iconPath: '/static/icon/position.png',
      success: function(data) {
        markersData = data.markers;
        poisData = data.poisData;

        if (markersData.length > 0) {
          that.markers = markersData;
          that.textData = poisData;
          that.mapContBotm = 'bottom:400px';
          that.mapTxtHeight = 'height:400px';
        } else {
          uni.getLocation({
            type: 'gcj02',
            geocode: true,
            success: function(res) {
              that.latitude = res.latitude;
              that.longitude = res.longitude;
            },
            fail: function(res) {
              console.log(res);
            }
          });
          that.textData = [
            {
              name: '抱歉，未找到结果',
              address: ''
            }
          ];
        }
      },
      fail: function(info) {
        console.log(info);
      }
    };
    params.querykeywords = this.searchMsg; // 查询内容
    this.amapPlugin.getPoiAround(params);
  },
  watch: {
    searchMsg(val) {
      var that = this;
      this.amapPlugin = new amap.AMapWX({
        //初始化
        key: this.key
      });
      this.amapPlugin.getRegeo({
        //我的位置
        iconPath: '/static/icon/position.png',
        iconWidth: 48,
        iconHeight: 48,
        success: function(data) {
          that.latitude = data[0].latitude;
          that.longitude = data[0].longitude;
        }
      });

      var params = {
        iconPathSelected: '/static/icon/position.png',
        iconPath: '/static/icon/position.png',
        success: function(data) {
          markersData = data.markers;
          poisData = data.poisData;

          if (markersData.length > 0) {
            that.markers = markersData;
            that.textData = poisData;
            that.mapContBotm = 'bottom:400px';
            that.mapTxtHeight = 'height:400px';
          } else {
            uni.getLocation({
              type: 'gcj02',
              geocode: true,
              success: function(res) {
                that.latitude = res.latitude;
                that.longitude = res.longitude;
              },
              fail: function(res) {
                console.log(res);
              }
            });
            that.textData = [
              {
                name: '抱歉，未找到结果',
                address: ''
              }
            ];
          }
        },
        fail: function(info) {
          console.log(info);
        }
      };
      params.querykeywords = this.searchMsg; // 查询内容
      this.amapPlugin.getPoiAround(params);
    }
  },
  onShow() {},
  methods: {
    back() {
      uni.switchTab({
        url: 'resource'
      });
    },
    makertap: function(e) {
      var id = e.markerId;
      var that = this;
      that.showMarkerInfo(poisData, id);
      that.changeMarkerColor(markersData, id);
    },
    showMarkerInfo: function(data, i) {
      var that = this;
      that.textData = [
        {
          name: data[i].name,
          address: data[i].address,
          distance: data[i].distance,
          tel: data[i].tel
        }
      ];
      that.mapContBotm = 'bottom:80px';
      that.mapTxtHeight = 'height:80px';
    },
    changeMarkerColor: function(data, i) {
      var that = this;
      var markers = [];
      for (var j = 0; j < data.length; j++) {
        if (j == i) {
          data[j].iconPath = '../../static/icon/position.png'; //如：..­/..­/img/marker_checked.png
        } else {
          data[j].iconPath = '../../static/icon/position.png'; //如：..­/..­/img/marker.png
        }
        markers.push({
          id: data[j].id,
          latitude: data[j].latitude,
          longitude: data[j].longitude,
          iconPath: data[j].iconPath,
          width: data[j].width,
          height: data[j].height
        });
      }
      that.markers = markers;
    },
    phonecall: function(e) {
      if (JSON.stringify(e) == '' || JSON.stringify(e) == '[]') {
        util.showTip('抱歉，未查询到此医院的电话');
      } else {
        uni.makePhoneCall({
          phoneNumber: e
        });
      }
    },
    tabhospital(e) {
      var id = e;
      var that = this;
      that.showMarkerInfo(poisData, id);
      that.changeMarkerColor(markersData, id);
    }
  }
};
</script>

<style scoped>
#searchBox {
  width: 100%;
  height: 60rpx;
  z-index: 999;
  position: fixed;
  background-color: #ffffff;
  top: 160rpx;
  padding-top: 10rpx;
  padding-left: 30rpx;
  border-radius: 30rpx;
}

.content {
  padding: 0;
}
.map_container {
  position: absolute;
  top: 240rpx;
  bottom: 200rpx;
  left: 0;
  right: 0;
}
.map {
  width: 100%;
  height: 100%;
}
.map_text {
  z-index: 999;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40%;
  background: #fff;
  padding: 0 30rpx;
  overflow-y: scroll;
}
text {
  margin: 6rpx 0;
  display: block;
  font-size: 24rpx;
}
.h1 {
  margin: 30rpx 0;
  font-size: 30rpx;
}
</style>
