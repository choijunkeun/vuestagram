<template>
    <div style="padding : 10px">
        <h4>팔로워</h4>
        <input @input="search($event.target.value)" placeholder="?" />
        <div class="post-header" v-for="(a,i) in follower" :key="i">
            <div class="profile" :style="`background-image:url(${a.image})`"></div>
            <span class="profile-name"> {{a.name}} </span>
        </div>
    </div>
</template>
<script>
import {computed, onMounted, ref, toRefs, watch} from "vue";
import axios from "axios";
import {useStore} from 'vuex';

export default {
    props: {
        one : Number,
        two : Number,
    },

    // 컴포넌트 만들기 전에 이거부터 실행해주세요랑 비슷함
    setup(props) {
        // ref랑 reactive랑 같름
        let follower = ref([]);
        let followerOriginal = ref([]);
        // let test = reactive({ name : 'choi'});

        // let { one } = toRefs(props);

        // watch(one, () => {
        //
        // });

        // let result = computed(() => {
        //     return follower.value.length;
        // });
        //
        // let store = useStore();

        onMounted(()=> {    // Lifecycle Hook쓰려면 OnMounted안에 이런식으로,
            axios.get('/follower.json').then((a)=> {
                follower.value = a.data;
                followerOriginal.value = [...a.data];
            })

        })

        function search(검색어) {
            let newFollower = followerOriginal.value.filter((a) => {
                return a.name.indexOf(검색어) != -1;
            });
            follower.value = [...newFollower];
        }
        return {follower, search}
    },

    data() {
        return {

        }
    }
}
</script>


<!-- scoped있으면 여기서만 해당됨,-->
<style scoped>

</style>