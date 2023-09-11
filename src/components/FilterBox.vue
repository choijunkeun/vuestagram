<template>
    <div @click="fire" :class="filter + ' filter-item'" :style="`background-image: url(${this.url})`">
<!--        <slot name="a"></slot>-->
<!--        <slot name="b"></slot>-->

        <!-- 부모에게 전달 가능        -->
<!--        <slot :msg="msg"></slot>-->

    </div>
</template>

<script>
export default {
    name : 'Filterbox',

    methods : {
        fire() {
            this.emitter.emit('filterName', this.filter);
        }

    },
    data() {
        return {
            msg : 'hello',
        }
    },

    props : {
        url : String,
        filter : String,
    },

}
</script>
<style>
.filter-item {
    width: 100px;
    height: 100px;
    margin: 10px 10px 10px auto;
    padding: 8px;
    display: inline-block;
    color: white;
    background-size: cover;
    background-position: center;
}
</style>