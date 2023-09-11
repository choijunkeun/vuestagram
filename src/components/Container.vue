<template>
    <div>
        <div v-if="step == 0">
            <Post :posts="posts[i]" v-for="(a,i) in posts" :key="i"/>
        </div>


        <!-- 필터선택페이지 -->
        <div v-if="step == 1">
            <div :class="filterName" class="upload-image" :style="`background-image: url(${url})`"></div>
            <div class="filters">
                <FilterBox :url="url" :filter="filter"
                           v-for="filter in filterData" :key="filter">
<!--                    <template v-slot:a> <p>{{filter}} 1</p> </template>-->
<!--                    <template v-slot:b> <p>{{filter}} 2</p> </template>-->
                    <!-- v-slot:default 로 부모가 자식데이터 사용 가능.                   -->
<!--                    <template v-slot:default="작명"> {{작명.msg}} </template>-->
                </FilterBox>
            </div>
        </div>

        <!-- 글작성페이지 -->
        <div v-if="step == 2">
            <div :class="filterName" class="upload-image" :style="`background-image: url(${url})`"></div>
            <div class="write">
                <textarea @input="$emit('write', $event.target.value)" class="write-box">write!</textarea>
            </div>
        </div>

        <div v-if="step == 3">
            <MyPage :one="1" />
        </div>


    </div>
</template>

<script>

import Post from '@/components/Post.vue';
import FilterBox from "@/components/FilterBox.vue";
import filterData from "@/assets/FilterData";
import MyPage from "@/components/MyPage.vue";

export default {
    components: {
        MyPage,
        Post,
        FilterBox
    },
    data() {
        return {
            filterData : filterData,
        }
    },
    props: {
        posts: Array,
        step: Number,
        url : String,
        filterName : String,
    },

}
</script>


<style>
.upload-image {
    width: 100%;
    height: 450px;
    background: cornflowerblue;
    background-size: cover;
}

.filters {
    overflow-x: scroll;
    white-space: nowrap;
}

.filter-1 {
    width: 100px;
    height: 100px;
    background-color: cornflowerblue;
    margin: 10px 10px 10px auto;
    padding: 8px;
    display: inline-block;
    color: white;
    background-size: cover;
}

.filters::-webkit-scrollbar {
    height: 5px;
}

.filters::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.filters::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
}

.filters::-webkit-scrollbar-thumb:hover {
    background: #555;
}

.write-box {
    border: none;
    width: 90%;
    height: 100px;
    padding: 15px;
    margin: auto;
    display: block;
    outline: none;
}
</style>