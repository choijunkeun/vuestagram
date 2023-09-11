import {createStore} from "vuex";
import axios from "axios";

const store = createStore({
    state() {
        return {
            // state 보관하면 모든 컴포넌트에서 사용 가능
            name: 'kim',
            age: 20,
            likes: 30,
            likeCheck: false,
            more: {},
        }
    },

    mutations: {   // state 수정방법 정의하는곳
        nameChange(state) {
            state.name = 'park';
        },
        ageChange(state, payload) {
            state.age++;
            state.age += payload;
        },
        likeClick(state) {
            if (!state.likeCheck) {
                state.likes++;
                state.likeCheck = true;
            } else {
                state.likes--;
                state.likeCheck = false;
            }
        },

        setMore(state, data) {
            state.more = data;
        }

    },
    actions: { // ajax 요청 하는곳
        getData(context) {
            axios.get('https://codingapple1.github.io/vue/more0.json')
                .then((a) => {
                    context.commit('setMore', a.data);
                });
        },
    },

})

export default store;