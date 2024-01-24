<template>
    <div class="m-content">
        <h3>Welcome to EZ-Blogs</h3>
        <div class="block">
            <div class="block"><el-avatar :size="150" :src="user.avatar"></el-avatar></div>
            <div>{{ user.username }}</div>
        </div>
        <div class="m-action">
            <el-link href="/blogs">Blogs</el-link>
            <el-divider direction="vertical"></el-divider>
            <span>

          <el-link type="success" href="/blog/add" :disabled="!hasLogin">Post</el-link>
        </span>
            <el-divider direction="vertical"></el-divider>
            <span v-show="!hasLogin">
          <el-link type="primary" href="/login">Login</el-link>
        </span>
            <span v-show="hasLogin">
          <el-link type="danger" @click="logout">Exit</el-link>
        </span>
        </div>
    </div>
</template>
<script>
export default {
    name: "Header",
    data() {
        return {
            hasLogin: false,
            user: {
                username: 'Tourist',
                avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
            },
            blogs: {},
            currentPage: 1,
            total: 0
        }
    },
    methods: {
        logout() {
            const _this = this
            this.$axios.get('/logout', {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }).then((res) => {
                _this.$store.commit('REMOVE_INFO')
                _this.$router.push('/login')
            });
        }
    },
    created() {
        if (this.$store.getters.getUser.username) {
            this.user.username = this.$store.getters.getUser.username
            this.user.avatar = this.$store.getters.getUser.avatar
            this.hasLogin = true
        }
    }
}
</script>

<style scoped>
    .m-content {
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
    }

    .m-action {
        margin: 10px 0;
    }

</style>
