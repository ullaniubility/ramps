<template>
    <van-overlay :show="show">
        <div class="wrapper">
            <van-loading type="spinner" size="24px" />
        </div>
    </van-overlay>
</template>
<script setup>
const show = true
</script>
<style lang="scss" scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>