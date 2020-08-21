<template>
  <div id="contact">
    <!-- 联系人卡片 -->
    <van-contact-card
      :type="cardType"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="showList = true"
    />

    <!-- 联系人列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-contact-list
        v-model="chosenContactId"
        :list="list"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
      />
    </van-popup>

    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>

  </div>
</template>

<script>
  import { ContactCard, ContactList, ContactEdit ,Popup } from 'vant';

  const OK = 200;
  export default {
    data() {
      return {
        chosenContactId: null, //当前选中的联系人的id
        editingContact: {}, //填充编辑页的表单的
        showList: false, // 控制列表界面的显示与隐藏
        showEdit: false, // 控制编辑界面的显示与隐藏
        isEdit: false, //决定了删除按钮是否要显示 true:显示
        //代表初始时联系人的数据源
        list: []
      };
    },

    computed: {
      //决定了联系人卡片组件的渲染类型
      cardType() {
        return this.chosenContactId !== null ? 'edit' : 'add';
      },
      //决定了当前要展示的联系人
      currentContact() {
       /* 新增一个联系人 必须是先更新list 再更新id
        删除一个联系人 必须先更新id 再更新list*/
        const id = this.chosenContactId;
        return id !== null ? this.list.filter((item) => item.id === id)[0] : {};
      },
    },

    methods: {
      // 添加联系人
      onAdd() {
        //点击新增按钮时 将id填充到编辑页的表单内(当前存id的表单是隐藏的)
        //如果换成真正接口 此处的id是不需要提前设置的
        this.editingContact = {};
        //隐藏删除按钮
        this.isEdit = false;
        //将编辑页显示出来
        this.showEdit = true;
      },

      // 编辑联系人
      onEdit(item) {
        this.isEdit = true; //显示删除按钮
        this.showEdit = true; //显示编辑页
        this.editingContact = item;//将要编辑的联系人信息回显整个编辑页中
      },

      // 保存联系人 info:表单内容
      async onSave({name,tel,id}) {
        this.showEdit = false; //将编辑页隐藏起来
        this.showList = false; //将列表页隐藏起来

        //请求回来的数据
        let body ="";
        if (this.isEdit) {
          //修改联系人的逻辑
          // this.$http.contact.edit({name,tel,id})
          body = await this.$axios.put("/contact/edit",{name,tel,id	},{
            baseURL:"http://localhost:9000/api"
          })
          await this.updateList()

        } else {
          //新增联系人的逻辑  往数据库插入了一条数据 可是界面上的list并没有得到更新
          // this.$http.contact.new({name,tel})
          let data = new FormData();
          data.append("name",name)
          data.append("tel",tel)
          body = await this.$axios.post("/contact/new/form",data,{
            timeout:5000,
            baseURL:"http://localhost:9000/api"
          })
          //查询一下数据库 将最新的(包括其他系统对数据库的操作)列表渲染到界面上
          //list数组会得到更新
          //一定要先更新list 在更新id 不然会报错 可是这个错也不会影响具体的效果
          //this.list = 最新的list
          await this.updateList()
        }

        //body.data.id : 如果是新增操作 此处的id才是真正新被添加联系人的id
        this.chosenContactId = body.data.id; //将选中的id变为新增数据的id
      },

      // 删除联系人
      async onDelete(info) {
        this.showEdit = false; //隐藏编辑页

        //发请求
        await this.$axios.delete("/contact",{
          baseURL:"http://localhost:9000/api",
          params: {
            id: info.id
          }
        })

        //如果删除的是选中的那一条  那么选中id要置为nulll
        if (this.chosenContactId === info.id) {
          this.chosenContactId = null;
        }
        await this.updateList()
      },

      // 选中联系人
      onSelect() {
        this.showList = false; //把列表页面隐藏
      },

      //更新联系人列表
      async updateList(){
        const {data,code} = await this.$axios.get("/contactList",{
          baseURL:"http://localhost:9000/api"
        })
        if(code === OK)
          this.list = data
      }
    },

    components:{
      [ContactCard.name]:ContactCard,
      [ContactList.name]:ContactList,
      [ContactEdit.name]:ContactEdit,
      [Popup.name]:Popup
    },

    async mounted(){
      await this.updateList()
    }
  };
</script>

<style scoped>

</style>
