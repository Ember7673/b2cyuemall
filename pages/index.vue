<template>
  <section>
    <!-- header -->
    <div class="header-wrap">
        <HeaderBar :logo="storeLogo" class="header-top"></HeaderBar>
        <el-carousel height="680px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.urlAddr" alt=""> 
          </el-carousel-item>
        </el-carousel>
        <Searchbar class="header-search"></Searchbar>
    </div>
    <!-- destination -->
    <div class="destination-wrap container">
      <IndexTitle :title="'全球100+旅拍目的地'" :EnTitle="'global travel destinations'"></IndexTitle>
      <div class="dst-wrap">
        <DstList :title="'热门：'" :dstList="localCityList"></DstList>
        <DstList :title="'国内：'" :dstList="localCityList"></DstList>
        <DstList :title="'亚洲：'" :dstList="AsiaCityList"></DstList>
        <DstList :title="'欧洲：'" :dstList="EuropeCityList"></DstList>
        <DstList :title="'大洋洲：'" :dstList="AustraliaCityList"></DstList>
        <DstList v-show="AmericaCityList.length" :title="'北美：'" :dstList="AmericaCityList"></DstList>
      </div>
      <IndexNav></IndexNav>
    </div>
    <!-- ad1 -->
    <div class="ad-box">
      <div class="part1">
        <div class="part1-1">
          <div class="part-1-1-1">
            <img src="../assets/img/ad1-1.jpg" alt="">
          </div>
          <div class="part-1-1-2">
            <img src="../assets/img/ad1-2.jpg" alt="">
          </div>
        </div>
        <div class="part1-2">
          <div class="part-1-2-1">
            <img src="../assets/img/ad1-4.jpg" alt="">
          </div>
          <div class="part-1-2-2">
            <img src="../assets/img/ad1-5.jpg" alt="">
          </div>
          <div class="part-1-2-3">
            <img src="../assets/img/ad1-6.jpg" alt="">
          </div>
        </div>
      </div>
      <div class="part2">
        <img src="../assets/img/ad1-3.jpg" alt="">
      </div>
    </div>
    <!-- warelist -->
    <div class="container-fluid">
      <!-- 本地拍 -->
      <ShowHeader :showData="showHeader.localPhoto"></ShowHeader>
      <ShowRows :span="3" :gutter="10" :showData="wareList" :mapping="wareMapping"></ShowRows>
      <!-- 特别推荐 -->
      <ShowHeader :showData="showHeader.recommendPhoto"></ShowHeader>
      <ShowRows :span="3" :gutter="10" :showData="recommendList" :mapping="wareMapping"></ShowRows>
      <!-- 亚洲拍 -->
      <ShowHeader :showData="showHeader.asiaPhoto"></ShowHeader>
      <ShowRows :span="3" :gutter="10" :showData="wareList" :mapping="wareMapping"></ShowRows>
    </div>
    <!-- map -->
    <div>
      <img src="../assets/img/map.jpg" class="responsive-img">
    </div>
    <!-- show -->
    <div class="container-fluid"> 
      <ShowHeader :showData="showHeader.photoShow"></ShowHeader>
      <ShowRows :span="2" :gutter="10" :showData="showList" :mapping="showMapping"></ShowRows>
    </div>
    <!-- ad2 -->
    <div>
      <img src="../assets/img/ad.jpg" class="responsive-img">
    </div>
    <!-- 12项高端定制旅游 -->
    <div class="travel-wrap">
      <div class="container"> 
        <IndexTitle :title="'12项高端定制旅游'" :EnTitle="'global travel destinations'"></IndexTitle>
        <div class="content">
          <ul class="travel-list clearfix">
            <li class="icon" v-for="index in 12"></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { findStoreByPcDoMain, findmerchantStoreBystoreId, bannerList, dstCityByContinent, 
    wareList, recommendWare, warelistByContinent } from '@/api'
  import HeaderBar from '@/components/HeaderBar'
  import Searchbar from '@/components/searchBar'
  import IndexTitle from './index/components/indexTitle'
  import DstList from './index/components/destinationList.vue'
  import IndexNav from './index/components/indexNav'
  import ShowHeader from './index/components/showHeader'
  import ShowRows from './index/components/showRows'
  export default {
    name: "index",
    components: {
      HeaderBar,
      Searchbar,
      IndexTitle,
      IndexNav,
      ShowHeader,
      ShowRows,
      DstList,
    },
    data() {
      return {
        providerId: '',
        storeLogo: '',
        kindCode: '',
        localCityList: [],
        AsiaCityList: [],
        EuropeCityList: [],
        AustraliaCityList: [],
        AmericaCityList: [],
        bannerList: [],
        dstCityList: [],
        dstCityCode: '',
        localDstCity: [],
        abroadDstCity: [],
        recommendList: [],
        wareList: [],
        wareMapping: {
          id: 'id',
          name: 'wareName',
          imgUrl: 'mainImg',
        },
        showMapping: {
          id: 'id',
          name: 'intro',
          imgUrl: 'imgUrl',
          desc: 'name',
        },
        showHeader: {
          localPhoto: {
            title: '本地拍',
            moreUrl: '/local',
            headerBg: '/static/image/Localfilm.png'
          },
          recommendPhoto: {
            title: '特别推荐（旅游+摄影）',
            moreUrl: '/recommend',
            headerBg: '/static/image/Journeytake.png'
          },
          asiaPhoto: {
            title: '亚洲拍',
            moreUrl: '/Asiaphoto',
            headerBg: '/static/image/Asiashooting.png',
          },
          photoShow: {
            title: '客片展示',
            moreUrl: '/show',
            headerBg: '/static/image/Samplesshow.png',
          }
        },
        showList: [
          { id: 207, name: '巴黎', englishName: 'Paris', url: 'Paris', region: 'oversea', 
            imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095254612761.jpg', intro: '浪漫之都',
            recommend: true, },
          { id: 218, name: '京都', englishName: 'Kyoto', url: 'Kyoto', region: 'oversea', 
            imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095296051782.jpg', intro: '日本京都',
            recommend: true, },
          { id: 210, name: '悉尼', englishName: 'Sydney', url: 'Sydney', region: 'oversea', 
            imgUrl: 'http://fileserver.yueshijue.com/fileService/uploads/2017/11/17/15109115747544.jpg', intro: '异域风情，澳洲之旅',
            recommend: true,
          },
          { id: 206, name: '罗马', englishName: 'Rome', url: 'Rome', region: 'oversea', 
            imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097793509155.jpg', intro: '罗马假日',
            recommend: true, },
          { id: 201, name: '巴厘岛', englishName: 'Bali', url: 'Bali', region: 'oversea',
            imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097791012752.jpg', intro: '度假胜地，天堂巴厘岛',
            recommend: true, },
          { id: 216, name: '马尔代夫', englishName: 'Maldives', url: 'Maldives', region: 'oversea', 
            imgUrl: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/04/415097797423675.jpg', intro: '度假天堂',
            recommend: true, },
        ],
      }
    },
    methods: {
      getStore() {
        findStoreByPcDoMain().then(res => {
          if(res.data.status === 1) {
            this.providerId = '29';
            sessionStorage.setItem('providerId', this.providerId)
            this.getMerchantStoreInfo()
            this.getBannerList()
            this.getDstCityList()
            this.getLocalCityList()
            this.getAsiaCityList()
            this.getEuropeCityList()
            this.getAustraliaCityList()
            this.getAmericaCityList()
            // this.kindCode = 'trip-T';
            this.getWareList()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getMerchantStoreInfo() {
        let data = {
          id: this.providerId
        }
        findmerchantStoreBystoreId(data).then(res => {
          if(res.data.status === 1) {
            let storeInfo = res.data.data;
            this.storeLogo = storeInfo.storeLogo;
            // sessionStorage.setItem('storeLogo', storeInfo.storeLogo)
            document.title = storeInfo.storeName;
          }
        })
      },
      getBannerList() {
        this.loading = true;
        let data = {
          merchantId: this.providerId
        }
        bannerList(data).then(res => {
          this.loading = false;
          if(res.data.status === 1) {
            this.bannerList = res.data.data;
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          console.log(err)
          this.loading = false;
        })
      },
      getDstCityList( ) {
        let params = {
          storeId: this.providerId,
          continent: '100-101',
        }
        dstCityByContinent(params).then(res => {
          if(res.data.status === 1) {
            this.dstCityList = res.data.data;
            // console.log(this.dstCityList)
            this.dstCityCode = this.dstCityList[0].dstCityCode;
            this.localDstCity = this.dstCityList.filter(city => city.mergerName)
            this.abroadDstCity = this.dstCityList.filter(city => !city.mergerName)
            this.getRecommendWare()
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getLocalCityList() {
        let params = {
          storeId: this.providerId,
          continent: '100-101',
        }
        dstCityByContinent(params).then(res => {
          if(res.data.status === 1) {
            this.localCityList = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getAsiaCityList() {
        let params = {
          storeId: this.providerId,
          continent: '100',
        }
        dstCityByContinent(params).then(res => {
          if(res.data.status === 1) {
            this.AsiaCityList = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getEuropeCityList() {
        let params = {
          storeId: this.providerId,
          continent: '300',
        }
        dstCityByContinent(params).then(res => {
          if(res.data.status === 1) {
            this.EuropeCityList = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getAustraliaCityList() {
        let params = {
          storeId: this.providerId,
          continent: '400',
        }
        dstCityByContinent(params).then(res => {
          if(res.data.status === 1) {
            this.AustraliaCityList = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getAmericaCityList() {
        let params = {
          storeId: this.providerId,
          continent: '400-101',
        }
        dstCityByContinent(params).then(res => {
          if(res.data.status === 1) {
            this.AmericaCityList = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      dstCityClick(cityCode) {
        this.dstCityCode = cityCode;
        this.getRecommendWare();
      },
      getRecommendWare() {
        let data = {
          dstCityCode: this.dstCityCode,
          providerId: this.providerId,
        }
        recommendWare(data).then(res => {
          if(res.data.status === 1) {
            this.recommendList = res.data.data;
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      getWareList() {
        let data = {
          // kindCode: this.kindCode,
          storeId: this.providerId,
          continent: '100-101',
        }
        warelistByContinent(data).then(res => {
          if(res.data.status === 1){
            this.wareList = res.data.data;
          }
        })
      },
    },
    created() {
      this.getStore()
    }
  }
</script>

<style lang="scss" scoped>
  $color: #19A9E8;
  .header-wrap {
    position: relative;
    .header-top {
      display: flex;
      justify-content: center;
      position: absolute;
      top: 30px;
      left: 50%;
      margin-left: -600px;
      z-index: 99;
    }
    .header-search {
      position: absolute;
      bottom: 50px;
      z-index: 99;
      width: 700px;
      left: 50%;
      margin-left: -350px;
    }
  }
  .container-fluid {
    margin: 50px;
  }
  .destination-wrap {
    margin-top: 80px;
    .dst-wrap {
      margin: 30px 0;
    }
  }
  .ad-box {
    display: flex;
    width: 100%;
    margin: 80px 0;
    .part1-1, .part1-2 {
      display: flex;
    }
    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }
  .travel-wrap {
    background: #d0d0d0;
    .travel-list {
      margin: 50px 0;
      li {
        float: left;
        width: 191px;
        height: 200px;
        margin: 10px 10px 0 0;
        transition: all .3s;
        &:hover {
          transform: scale(1.03);
        }
        &:nth-child(6n) {
          margin-right: 0;
        }
        &:nth-child(1) {
          background-position: 0 -260px;
        }
        &:nth-child(2) {
          background-position: -191px -260px;
        }
        &:nth-child(3) {
          background-position: -383px -260px;
        }
        &:nth-child(4) {
          background-position: -575px -260px;
        }
        &:nth-child(5) {
          background-position: -767px -260px;
        }
        &:nth-child(6) {
          background-position: -959px -260px;
        }
        &:nth-child(7) {
          background-position: 0 -460px;
        }
        &:nth-child(8) {
          background-position: -191px -460px;
        }
        &:nth-child(9) {
          background-position: -383px -460px;
        }
        &:nth-child(10) {
          background-position: -575px -460px;
        }
        &:nth-child(11) {
          background-position: -767px -460px;
        }
        &:nth-child(12) {
          background-position: -959px -460px;
        }
      }
    }
  }
</style>
