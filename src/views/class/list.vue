<template>
  <div class="home">
    <h1>统计总表</h1>
    <Button @click="fetchProductList" v-if="data1.length==0">get pro list</Button>
    <br />

    <div class="home__list">
      <Table :columns="columns1" :data="data1" border />
    </div>
       <Divider  />
    <Form ref="formInline" inline :label-width="130" >
      <FormItem label="runoob_author list" v-if="authorList.length">
        <Select   style="width:200px">
          <Option v-for=" (item,idx) of authorList" :key="idx" :value="item.runoob_count"  >{{ item.runoob_author }} - {{ item.runoob_count }}</Option>
  
        </Select>
        <Button>注册author号</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      proList: [],
      columns1: [
        {
          title: "runoob_author",
          key: "runoob_author"
        },
        {
          title: "runoob_count",
          key: "runoob_count"
        },

        {
          title: "runoob_title",
          key: "runoob_title"
        },
        {
          title: "runoob_id",
          key: "runoob_id"
        },
        {
          title: "submission_date",
          key: "submission_date"
        }
      ],
      data1: []
      ,
      authorList:[]
    };
  },
  methods: {
    fetchProductList() {
      let url = "/api/sql";
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.errono !== 0) {
            console.error("请求出差");
            return;
          }
          data.data = data.data.map(item => {
            // 2017-04-11
            // item.submission_date = item.submission_date.match(
            //   /^\s*(\d{4}-\d{2}-\d{2})/
            // )[0];
            return item;
          });

          this.data1 = data.data;
        });
    },
    getAuthorList() {
      let url = "/api/getAuthorList";
      fetch(url)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.errono !== 0) {
            console.error("请求出差");
            return;
          }
     

          this.authorList = data.data;
        });
    }
  },
  mounted() {
    this.fetchProductList();
    this.getAuthorList();
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 600px;
  padding: 20px;
  .home__list {
    em {
      margin-left: 8px;
    }
  }
}
</style>