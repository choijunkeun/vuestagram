<template>
    <div class="header">
        <ul class="header-button-left">
            <li>Cancel</li>
        </ul>
        <ul class="header-button-right">
            <li v-if="step == 1" @click="step++">Next</li>
            <li v-if="step == 2" @click="publish">발행</li>
        </ul>
        <img src="./assets/logo.png" class="logo"/>
    </div>

    <!-- state 수정은 절대 컴포넌트안에서 직접 하면 안됨   -->
<!--    <h4>이름 {{ $store.state.name }}</h4>-->
<!--    <button @click="$store.commit('nameChange')">이름변경버튼</button>-->
<!--    <h4>나이 {{ $store.state.age }}</h4>-->
<!--    <button @click="$store.commit('ageChange', 10)">증가버튼</button>-->
<!--    <button @click="ageChange(10)">증가버튼</button>-->

<!--    <p>{{ $store.state.more }}</p>-->
<!--    <button @click="$store.dispatch('getData')">더보기 버튼</button>-->


    <Container @write="writeContent = $event"
               :posts="posts"
               :step="step"
               :url="url"
               :filterName="filterName"/>
    <button @click="morePost">더보기</button>

<!--    <p> {{name}} </p>-->
<!--    <p> {{내이름}} </p>-->
<!--    <p> {{age}} </p>-->
<!--    <p> {{likes}} </p>-->

    <div class="footer">
        <ul class="footer-button-plus">
            <input @change="upload" type="file" id="file" class="inputfile"/>
            <label for="file" class="input-plus">+</label>
        </ul>
    </div>


<!--    <div v-if="step == 0">내용 0</div>-->
<!--    <div v-if="step == 1">내용 1</div>-->
<!--    <div v-if="step == 2">내용 2</div>-->
<!--    <button @click="step = 0">버튼 0</button>-->
<!--    <button @click="step = 1">버튼 1</button>-->
<!--    <button @click="step = 2">버튼 2</button>-->
<!--    <div style="margin-top : 500px"></div>-->


</template>

<script>
import axios from "axios";

import Container from './components/Container';
import posts from './assets/Posts';
import {mapMutations, mapState} from "vuex";

export default {
    name: 'App',
    data() {
        return {
            posts : posts,
            clickCount : 0,
            step : 3,
            url : '',
            writeContent : '',
            filterName : '',

            nowCnt : 0,
        }
    },

    mounted() {
        this.emitter.on('filterName', (a) => {
            this.filterName = a;
            console.log(a);
        });
    },

    components: {
        Container
    },

    computed : {
        // computed함수는 사용해도 실행되지않고 처음 실행하고 값을 간직함.
        // computed함수는 꼭 return이 있어야한다.
        // name() {
        //     return this.$store.state.name;
        // },
        // age() {
        //     return this.$store.state.age;
        // },

        ...mapState(['name', 'age', 'likes']),

        ...mapState({ 내이름 : 'name',}),    // name이란 state를 쓰는데 작명을 해서 쓰고 싶으면 이렇게



    },

    methods: {
        ...mapMutations(['ageChange','setMore', '좋아요']),

        morePost() {

            // axios.post('URL', {name : 'kim'}).then().catch();
            // then은 성공, catch는 실패 할 경우 실행할 코드


            axios.get(`https://codingapple1.github.io/vue/more${this.clickCount}.json`)
                .then((result) => {
                    // 요청 성공시 실행할 코드
                    this.posts.push(result.data);
                    this.clickCount++;

                }).catch(() =>{
                alert("더이상 게시물이 없습니다.");
            });
        },

        upload(e) {
            let file = e.target.files;
            console.log(file[0]);
            this.url = URL.createObjectURL(file[0]);
            this.step++;
        },

        publish() {
            let myPost = {
                name: "Kim Hyun",
                userImage: "https://picsum.photos/100?random=3",
                postImage: this.url,
                likes: 36,
                date: "May 15",
                liked: false,
                content: this.writeContent,
                filterName: this.filterName
            };
            this.posts.unshift(myPost);
            this.step = 0;
        }
    }
};
</script>

<style>
body {
    margin: 0;
}

ul {
    padding: 5px;
    list-style-type: none;
}

.logo {
    width: 22px;
    margin: auto;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 13px;
}

.header {
    width: 100%;
    height: 40px;
    background-color: white;
    padding-bottom: 8px;
    position: sticky;
    top: 0;
}

.header-button-left {
    color: skyblue;
    float: left;
    width: 50px;
    padding-left: 20px;
    cursor: pointer;
    margin-top: 10px;
}

.header-button-right {
    color: skyblue;
    float: right;
    width: 50px;
    cursor: pointer;
    margin-top: 10px;
}

.footer {
    width: 100%;
    position: sticky;
    bottom: 0;
    padding-bottom: 10px;
    background-color: white;
}

.footer-button-plus {
    width: 80px;
    margin: auto;
    text-align: center;
    cursor: pointer;
    font-size: 24px;
    padding-top: 12px;
}

.sample-box {
    width: 100%;
    height: 600px;
    background-color: bisque;
}

.inputfile {
    display: none;
}

.input-plus {
    cursor: pointer;
}

#app {
    box-sizing: border-box;
    font-family: "consolas";
    margin-top: 60px;
    width: 100%;
    max-width: 460px;
    margin: auto;
    position: relative;
    border-right: 1px solid #eee;
    border-left: 1px solid #eee;
}
</style>
