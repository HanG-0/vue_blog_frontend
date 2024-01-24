<template>
    <div class="m-container">
        <Header></Header>
        <div class="m-content">
            <el-form ref="editForm" status-icon :model="editForm" :rules="rules" label-width="80px">
                <el-form-item label="Title" prop="title">
                    <el-input v-model="editForm.title" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="Abstraction" prop="description">
                    <el-input type="textarea" v-model="editForm.description"></el-input>
                </el-form-item>
                <el-form-item label="Content" prop="content">
<!--                    <mavon-editor v-model="editForm.content"/>-->
                    <el-input
                            type="textarea"
                            v-model="editForm.content"
                            resize="none"
                            rows="10"
                            autofocus
                    ></el-input>
                </el-form-item>
<!--                <el-radio-group v-model="radio1">-->
<!--                    <el-radio label="1" size="large">Public</el-radio>-->
<!--                    <el-radio label="2" size="large">Private</el-radio>-->
<!--                </el-radio-group>-->
                <p></p>
                <el-form-item class="button">
                    <el-button type="primary" @click="submitForm()">Create</el-button>
                    <el-button>Cancel</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import Header from "@/components/header"
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
    name: "BlogEditView",
    components: {
        Header,
        mavonEditor,
    },
    data() {
        return {
            editForm: {
                id: null,
                title: '',
                description: '',
                content: ''
            },
            rules: {
                title: [
                    {required: true, message: 'Add title:', trigger: 'blur'},
                    {min: 3, max: 50, message: 'Between 3 to 50 characters', trigger: 'blur'}
                ],
                description: [
                    {required: false, message: 'Add abstraction:', trigger: 'blur'}
                ],
                content: [
                    {required: true, message: 'Content'},
                    {min: 1, max: 500, message: 'No more than 500 characters'}
                ]
            }
        }
    },
    created() {
        const blogId = this.$route.params.blogId
        const _this = this
        if(blogId) {
            this.$axios.get('/blog/' + blogId).then((res) => {
                const blog = res.data.data
                _this.editForm.id = blog.id
                _this.editForm.title = blog.title
                _this.editForm.description = blog.description
                _this.editForm.content = blog.content
            });
        }
    },
    methods: {
        submitForm() {
            const _this = this
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.$axios.post('/blog/edit', this.editForm, {
                        headers: {
                            "Authorization": localStorage.getItem("token")
                        }
                    }).then((res) => {
                        _this.$alert('Success', '提示', {
                            confirmButtonText: 'Confirm',
                            callback: action => {
                                _this.$router.push("/blogs")
                            }
                        });
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
}
</script>

<style scoped>
    .button {
        margin: 0 auto;
        text-align: center;
    }
</style>