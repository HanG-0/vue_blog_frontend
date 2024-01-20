<template>
    <Header></Header>
    <div>
        <el-container>
            <el-header>
                <router-link to="/blogs">
                    <img class="logo" src="../assets/background.jpg"
                         style="height: 80%; margin-top: 20px">
                </router-link>
                <h2>Welcome to EZ-Blog</h2>
            </el-header>
            <el-main>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                         class="demo-ruleForm">
                    <el-form-item label="Username" prop="username">
                        <el-input type="text" maxlength="12" v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="Password" prop="password">
                        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">Login</el-button>
                        <el-button @click="resetForm('ruleForm')">Reset</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>

<script>

    // import Header from "../components/header.vue";
    import Header from "@/components/header.vue";

    export default {
        name: "LoginView",
        components: {Header},
        // components: () => import("../App.vue"),
        // components: {
        //     Header
        // },
        data() {
            return {
                ruleForm: {
                    username: 'cossky',
                    password: '123456',
                },
                rules: {
                    username: [
                        { required: true, message: 'Please input your username:', trigger: 'blur' },
                        { min: 3, max: 15, message: 'Your username must be between 3 to 15 characters!', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please input your password:', trigger: 'change' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                const _this = this
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 提交逻辑
                        this.$axios.post('http://localhost:8080/login', this.ruleForm).then((res) => {
                            const token = res.headers['authorization']
                            _this.$store.commit('SET_TOKEN', token)
                            _this.$store.commit('SET_USERINFO', res.data.data)
                            _this.$router.push("/blogs")
                        }).catch(error => {
                            console.error(error)
                        })
                    } else {
                        console.log('Errors occurred!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            this.$notify({
                title: 'EZ-Blog Demo',
                message: 'Hello World! :D',
                duration: 1000
            });
        }
    }
    import HelloWorld from './Test.vue'
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #b3ccb2;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #e3ffdc;
        color: #333;
        text-align: center;
        line-height: 160px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    /*.logo {*/
    /*    height: 80%;*/
    /*    margin-top: 0px;*/
    /*}*/

    .demo-ruleForm {
        max-width: 500px;
        margin: 0 auto;
    }

</style>