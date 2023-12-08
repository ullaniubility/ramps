<template>
    <div class="number-keyboard" :class="props.isDark === 'dark' ? 'dark' : ''">
        <div class="top">
            <slot name="header"></slot>
        </div>
        <div class="keyboard-warp">
            <div class="keyboard">
                <div class="key-item" @touchstart="onKeyClick(e)" v-for="e in 9" :key="e">{{ e }}</div>
                <div class="key-item" @touchstart="onKeyClick('.')">.</div>
                <div class="key-item" @touchstart="onKeyClick(0)">0</div>
                <div class="key-item" @touchstart="onKeyClick('del')">
                    <van-icon :name="props.isDark == 'dark' ? DeleteDark : Delete" class="icon-delete" />
                    <!-- <img src="@/assets/img/delete.png" alt=""> -->
                </div>
            </div>
        </div>

        <div class="bottom">
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script setup>
import Delete from '@/assets/svg/delete.svg'
import DeleteDark from '@/assets/svg/delete-dark.svg'

const props = defineProps({
    isDark: {
        type: String,
        default: 'light',
    }
})
const emit = defineEmits(['onKsysChange'])
const onKeyClick = (key) => {
    emit('onKsysChange', String(key))
}
</script>
<style lang="scss">
.number-keyboard {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;

    &.dark {
        --keyboard-bg: #191923;
        --color-text: #8C8CA1;
        --active-text: #1E1E2A;
    }

    --keyboard-bg:#F6F6F8;
    --active-text:#FFFFFF;
    --color-text:#737387;

    .keyboard-warp {
        display: flex;
        justify-content: center;

    }

    .keyboard {
        margin: auto;
        display: grid;
        grid-template-columns: 117px 117px 117px;
        grid-template-rows: 46px 46px 46px 46px;
        grid-gap: 7px;
        padding: 5px;

        .key-item {
            background-color: var(--keyboard-bg);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 6px;
            font-size: 25px;
            font-weight: 400;
            color: var(--color-text);

            img {
                width: 25px;
                height: 25px;
            }

            &:active {
                background-color: var(--active-text);
            }
        }
    }
}

@media (max-width: 400px) {
    .number-keyboard {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        .keyboard-warp {
            display: flex;
            justify-content: center;

        }

        .keyboard {
            margin: auto;
            display: grid;
            grid-template-columns: 100px 100px 100px;
            grid-template-rows: 40px 40px 40px 40px;
            grid-gap: 7px;
            padding: 5px;

            .key-item {
                background-color: var(--keyboard-bg);
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 6px;
                font-size: 25px;
                font-weight: 400;
                color: var(--color-text);

                img {
                    width: 25px;
                    height: 25px;
                }

                &:active {
                    background-color: var(--active-text);
                }
            }
        }
    }
}

@media (min-width: 575px) {
    .number-keyboard {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        .keyboard-warp {
            display: flex;
            justify-content: center;

        }

        .keyboard {
            margin: auto;
            display: grid;
            grid-template-columns: 150px 150px 150px;
            grid-template-rows: 50px 50px 50px 50px;
            grid-gap: 7px;
            padding: 5px;

            .key-item {
                background-color: var(--keyboard-bg);
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 6px;
                font-size: 25px;
                font-weight: 400;
                color: var(--color-text);

                img {
                    width: 25px;
                    height: 25px;
                }

                &:active {
                    background-color: var(--active-text);
                }
            }
        }
    }
}</style>
