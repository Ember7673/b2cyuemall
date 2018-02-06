<template>
    <div class="pro-row-service-time w">
        <h3 class="pro-title">{{title}}:</h3>
        <ul class="pro-list">
            <li>
                <a href="javascript:;" :class="isActive ? 'active' : ''" @click="active()">不限</a>
            </li>
            <li class="wdata">
                <el-date-picker
                v-model="value1"
                type="month"
                align="center"
                placeholder="最早时间"
                @change="select()">
                </el-date-picker>
                
            </li>
            <li class="wdata">
                <el-date-picker
                v-model="value2"
                type="month"
                placeholder="最晚时间"
                @change="select()">
                </el-date-picker>
            </li>
            <li>
                <button @click="confirm()">确定</button>
            </li>
            <li>
                <button @click="clear()">清空</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'prolistservicetime',
    data() {
        return{
            value1: '',
            value2: '',
            isActive: true,
            o: []
        }
    },
    created() {
    },
    methods: {
        select() {
            if(this.value1 !== '' || this.value2 !== ''){
                this.isActive = false;
            }

        },
        active() {
            this.value1 = '';
            this.value2 = '';
            this.isActive = true
        },
        confirm() {
            const v1 = new Date(this.value1);
            const early = v1.getFullYear() + '-' + (v1.getMonth()+1);
            const v2 = new Date(this.value2);
            const latter = v2.getFullYear() + '-' + (v2.getMonth()+1);
            if( this.value1 == '' || this.value2 == '' )
            return  this.$message('最早最晚时间不能为空')
                    this.value1 = '';
                    this.value2 = '';
                    this.isActive = true
            const v = v1 - v2;
            if( v > 0 )
            return  this.$message('最早时间要晚于最晚时间！')
           this.o[0] = early;
           this.o[1] = latter;
        //    console.log(this.o)
            this.$emit('item',this.o)
        },
        clear() {
            this.value1 = '';
            this.value2 = '';
            this.o = [];
            this.$emit('item',this.o)
            this.isActive = true;
        }
    },
     props: ['title'],
     
}
</script>

<style lang="scss" scoped>
.pro-row-service-time{
    display: flex;
    .pro-title{
        width: 70px;
        line-height: 30px;
        font-size: 14px;
        font-weight: normal;
        margin: 0;
    }
    .pro-list{
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        font-size: 14px;
        margin: 0;
        li{
            margin-left: 10px;
            margin-bottom: 15px;
            text-align: center;
            a{
                display: block;
                padding: 6px 10px;
                border: 1px solid #ccc;
                &:hover, &:active {
                    color: #fff;
                    background-color: #00a0e9;
                    border: 1px solid #00a0e9;
                }
            }
            .active{
                color: #fff;
                background-color: #00a0e9;
                border: 1px solid #00a0e9;
            }
            button{
                padding: 6px 10px;
                border: 1px solid #ccc;
                background-color: #fff;
            }
        }
    }   
}


</style>
