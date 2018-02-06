<template>
<div>
    <div class="container">
        <!-- 商品选择 -->
        <div class="prolist">
            <prolistTitle :prolistTitle ="prolistTitles" @removeTitle="handleRemove"></prolistTitle>
            <prolist :title="'产品类型'" :prolist="wareKind" :mapping="wareKindMapping" @item="showlistTitle1" :seleted-index="seletedIndex"></prolist>
            <prolist-servicetime :title="'服务时间'" @item="showlistTitle2"></prolist-servicetime>
            <prolist :title="'服务天数'" :prolist="serviceDatas" :mapping="tripDaysMapping" @item="showlistTitle3"></prolist>
            <prolist :title="'目的城市'" :prolist="dstCities" :mapping="dstCitiesMapping" @item="showlistTitle4"></prolist>
        </div>

        <!-- 销量 价格 -->
        <div class="pro-showList clearfix2">
            <ul class="clearfix2">
                <li class="fl" @click="saleSort = false">
                    销量(<span>↑</span>)
                </li>
                <li class="fl"  @click="saleSortFn">
                    价格(<span v-show="!saleSort">↑</span><span v-show="saleSort">↓</span>)
                </li>
            </ul>
            <pro-show-main :wares="wares"></pro-show-main>
        </div>
            

        <!-- 分页组件 -->
        <div class="pagination">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
            </el-pagination>
        </div>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
import { findStoreByPcDoMain, findmerchantStoreBystoreId, bannerList, dstCityByContinent, 
    wareList, recommendWare, warelistByContinent, datalist, findSrcAndDstListByWareKind } from '@/api'
import prolist from './product/components/prolist.vue'
import prolistTitle from './product/components/prolistTitle.vue'
import prolistServicetime from './product/components/prolistServicetime.vue'
import proShowMain from './product/components/proShowMain.vue'
import Footer from '@/components/Footer.vue'
export default {
components: {
    prolist,
    prolistTitle,
    prolistServicetime,
    proShowMain,
    Footer
},
data() {
    return{
        saleSort: false,
        providerId: '',
        datalist: [],
        wareKindMapping: {
            id: 'id',
            name: 'kindName'
        },
        dstCitiesMapping: {
            name: 'name'
        },
        tripDaysMapping: {
            name: 'kindName'
        },
        dates: [],
        prolistTitle: {},
        wareKind: [ 
            {id: 415057355555522, kindName: "全球旅拍"},
            {id: 415057355808314, kindName: "旅游"},
            {id: 715060598102532, kindName: "国内摄影"},
            {id: 715060598613714, kindName: "国外摄影"}
        ],
        serviceDatas: [ 
            {
                id: '0',
                kindName: '不限'
            },
            {
                id: '1',
                kindName: '1天'
            },
            {
                id: '2',
                kindName: '2天'
            },
            {
                id: '3',
                kindName: '3天'
            },
            {
                id: '4',
                kindName: '4天'
            },
            {
                id: '5',
                kindName: '5天'
            },
            {
                id: '6',
                kindName: '6天'
            },
            {
                id: '7',
                kindName: '7天'
            },
            {
                id: '8',
                kindName: '8天'
            },
            {
                id: '9',
                kindName: '9天'
            },
            {
                id: '10',
                kindName: '10天'
            },
            {
                id: '11',
                kindName: '11天'
            },

        ],
        dstCities: [
            {
                dstCityCode: 2724, mergerName: "中国,云南省-丽江市", name: "丽江", shortName: "丽江"
            },
            {
                dstCityCode: 481, mergerName: "中国,辽宁省-大连市", name: "大连", shortName: "大连"
            },
            {
                dstCityCode: 1387, mergerName: "中国,山东省-青岛市", name: "青岛", shortName: "青岛"
            },
            {
                dstCityCode: 1183, mergerName: "中国,福建省-厦门市", name: "厦门", shortName: "厦门"
            }
        ],
        wares: [
            {
                mainImg: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095049874271.jpg',
                wareName: '阿联酋迪拜旅拍婚纱摄影4天3晚套系（含摄影+旅游）',
                keyWords: ['阿联酋迪拜旅拍', '婚纱照','一价全包', '海外婚纱照'],
            },
            {
                mainImg: 'http://fileServer.yueshijue.com/fileService/uploads/2017/11/01/415095049874271.jpg',
                wareName: '阿联酋迪拜旅拍婚纱摄影4天3晚套系（含摄影+旅游）',
                keyWords: ['阿联酋迪拜旅拍', '婚纱照','一价全包', '海外婚纱照'],
            }
        ],
        productType: {},
        serviceData: {},
        serviceTime1: {},
        serviceTime2: {},
        dstCity: {},
        seletedIndex: 0
    }
},
methods: {
    getStore() {
        this.providerId = sessionStorage.getItem('providerId')
    },
    handleRemove(item) {
        console.log(item)
        this.seletedIndex = item.index
        console.log(this.seletedIndex)
    },
    showlistTitle1(data) {
        console.log(data)
        this.productType = {
            key: '产品类型',
            value: data[0].kindName,
            index: data[1]
        }
        console.log(this.productType)
    },
    showlistTitle2(data) {
        this.serviceTime1 = {
            key: '服务时间',
            value: data[0],
        }
        this.serviceTime2 = {
            key: '服务时间',
            value: data[1],
        }
    },
    showlistTitle3(data) {
        console.log(data)
        this.serviceData = {
            key: '服务天数',
            value: data[0].kindName,
            index: data[1]
        }
    },
    showlistTitle4(data) {
        this.dstCity = {
            key: '目的城市',
            value: data[0].name,
            index: data[1]
        }
    },
    saleSortFn() {
        this.saleSort = !this.saleSort;
        console.log(typeof(this.saleSort))
    }
},
computed: {
    prolistTitles() {
        const prolistTitle = {}
        prolistTitle.productType = this.productType.value ? this.productType : {}
        prolistTitle.serviceTime1 = this.serviceTime1.value ? this.serviceTime1 : {}
        prolistTitle.serviceTime2 = this.serviceTime2.value ? this.serviceTime2 : {}
        prolistTitle.serviceData = this.serviceData.value ? this.serviceData : {}
        prolistTitle.dstCity = this.dstCity.value ? this.dstCity : {}
        return prolistTitle;
    }
},
created() {
    this.getStore();
}

}
</script>

<style lang="scss" scoped>
.prolist{
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
}
.pro-showList{
    margin-top: 50px;
    ul{
        width: 900px;
        border-bottom: 1px solid #ccc;
        box-sizing: border-box;
        li{
            width: 90px;
            padding-bottom: 20px;
            text-align: center;
            font-size: 16px;
            color: #292929;
            font-weight: bold;
            cursor: pointer;
            margin-right: 20px;
            border-bottom: 3px solid #fff;
            &:hover{
                border-bottom: 3px solid #00a0e9;
            }
        }
    }
}
.pagination {
    padding: 30px 0;
}
</style>
