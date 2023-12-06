<template>
    <div class="drop-down-warp">
        <div class="drop-down" @click="onShowList">
            <img :src="showIcon" alt="">
            <span>{{ showVlue }}</span>
            <van-icon style="margin-left: 4px;" name="arrow-down" />
        </div>
        <div class="overlay" @click="onShowList" v-if="showList"></div>
        <transition name="van-fade">
            <div class="down-list" v-show="showList">
                <div @click="onDownClick(e)" v-for="(e, i) in props.dataList" :key="i"
                    :class="[e[props.option.value] === modelValue ? 'active' : '']" class="down-item">
                    {{ e[props.option.lable] }}
                </div>
            </div>
        </transition>
    </div>

</template>
<script setup>
const props = defineProps({
    modelValue: [Number, String],
    // 展示和值的字段
    option: {
        type: Object,
        default: () => {
            return {
                lable: 'lable',
                value: 'value',
                icon: 'icon'
            }
        }
    },
    // 下拉数据
    dataList: {
        type: Array,
        default: () => []
    }
})
const emit = defineEmits(['modelValue', , 'update:modelValue', 'change'])
const showList = ref(false)
const onShowList = () => {
    showList.value = !showList.value
}

// 展示内容
const showVlue = computed(() => {
    const val = props.dataList.filter(item => item[props.option.value] === props.modelValue)[0]
    return val[props.option.lable]
})

// 展示icon
const showIcon = computed(() => {
    const val = props.dataList.filter(item => item[props.option.value] === props.modelValue)[0]
    return val[props.option.icon]
})

const onDownClick = (e) => {
    onShowList()
    emit('update:modelValue', e[props.option.value])
    emit('change', e)
}
</script>
<style lang="scss">
.drop-down-warp {
    position: relative;

    .drop-down {
        cursor: pointer;
        width: 77px;
        height: 20px;
        padding: 5px;
        background: var(--van-theme-color);
        // background: var(--van-theme-color) url('@/assets/img/home_icon_bnb.png') no-repeat;
        // background-size: 20px 20px;
        // background-position: 5px 5px;
        // padding-left: 30px;
        border-radius: 5px 5px 5px 5px;
        color: #fff;
        font-size: 12px;
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &:active {
            opacity: .8;
        }

        img {
            width: 20px;
            height: 20px;
            margin-right: 6px;
        }
    }

    .overlay {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1;
    }

    .down-list {
        z-index: 2;
        position: absolute;
        left: -113px;
        top: 45px;
        background: #FFFFFF;
        box-shadow: 0px 10px 20px 0px rgba(167, 169, 187, 0.1);
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #F9F9F9;
        padding: 10px 0;

        .down-item {
            width: 198px;
            line-height: 30px;
            padding-left: 29px;
            box-sizing: border-box;
            font-size: 14px;

            &.active {
                background-color: #E7FFF5;
            }
        }
    }
}

@media (min-width: 820px) {
    .drop-down-warp {
        position: relative;

        .drop-down {
            cursor: pointer;
            width: 77px;
            height: 20px;
            padding: 5px;
            background: var(--van-theme-color);
            // background: var(--van-theme-color) url('@/assets/img/home_icon_bnb.png') no-repeat;
            // background-size: 20px 20px;
            // background-position: 5px 5px;
            // padding-left: 30px;
            border-radius: 5px 5px 5px 5px;
            color: #fff;
            font-size: 12px;
            line-height: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            &:active {
                opacity: .8;
            }

            img {
                width: 20px;
                height: 20px;
                margin-right: 6px;
            }
        }

        .overlay {
            position: fixed;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            z-index: 1;
        }

        .down-list {
            z-index: 2;
            position: absolute;
            left: -113px;
            top: 45px;
            background: #FFFFFF;
            box-shadow: 0px 10px 20px 0px rgba(167, 169, 187, 0.1);
            border-radius: 4px 4px 4px 4px;
            border: 1px solid #F9F9F9;
            padding: 10px 0;

            .down-item {
                width: 198px;
                line-height: 30px;
                padding-left: 29px;
                box-sizing: border-box;
                font-size: 14px;

                &.active {
                    background-color: #E7FFF5;
                }
            }
        }
    }
}
</style>