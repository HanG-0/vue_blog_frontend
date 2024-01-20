<template>
    <Header></Header>
    <div class="block">
        <el-timeline>
            <el-timeline-item v-bind:timestamp="blog.created" placement="top" v-for="blog in blogs">
                <el-card>
                    <h4><router-link :to="{name: 'BlogDetail', params: {blogId: blog.id}}">{{blog.title}}</router-link></h4>
                    <p>{{blog.description}}</p>
                </el-card>
            </el-timeline-item>
        </el-timeline>

        <el-pagination
                class="m-page"
                background
                layout="prev, pager, next"
                :total="1000">
        </el-pagination>

    </div>
</template>

<script>
    // import Header from "@/components/header.vue";
    import Header from "@/components/header.vue";

    export default {
        name: "BlogsView",
        components: {Header},
        data() {
            return {
                blogs: {},
                currentPage: 1,
                total: 0,
                pageSize: 5
            }
        },
        methods: {
            page(currentPage) {
                const _this = this
                this.$axios.get('http://localhost:8080/blogs?currentPage=' + currentPage).then((res) => {
                    console.log(res.data.data.records)
                    _this.blogs = res.data.data.records
                    _this.currentPage = res.data.data.current
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.size
                })
            }
        },
        mounted() {
            this.page(1);
        }
    }

</script>

<style scoped>
    .m-page {
        margin: 0 auto;
        text-align: center;
    }

</style>