<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}`">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="工具名称" prop="username">
        <el-input v-model="drawerProps.row!.username" placeholder="" clearable></el-input>
      </el-form-item>
      <el-form-item label="工具类型" prop="gender">
        <el-select v-model="drawerProps.row!.gender" placeholder="" clearable>
          <el-option v-for="item in genderType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="数量" prop="idCard">
        <el-input v-model="drawerProps.row!.idCard" placeholder="" clearable></el-input>
      </el-form-item>
      <el-form-item label="品牌" prop="email">
        <el-input v-model="drawerProps.row!.email" placeholder="" clearable></el-input>
      </el-form-item>
      <el-form-item label="选择时间" prop="time">
        <el-time-picker v-model="drawerProps.row!.time" placeholder="Pick a time" style="width: 100%" />
      </el-form-item>
      <el-form-item label="购买价格" prop="address">
        <el-input v-model="drawerProps.row!.address" placeholder="" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="address">
        <el-input v-model="drawerProps.row!.address" placeholder="" clearable type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";
import { genderType } from "@/utils/dict";
import { ElMessage, FormInstance } from "element-plus";
import { User } from "@/api/interface";
import UploadImg from "@/components/Upload/Img.vue";
import UploadImgs from "@/components/Upload/Imgs.vue";

const rules = reactive({
  avatar: [{ required: true, message: "请上传用户头像" }],
  photo: [{ required: true, message: "请上传用户照片" }],
  username: [{ required: true, message: "请填写用户姓名" }],
  gender: [{ required: true, message: "请选择性别" }],
  idCard: [{ required: true, message: "请填写身份证号" }],
  email: [{ required: true, message: "请填写邮箱" }],
  address: [{ required: true, message: "请填写居住地址" }]
});

interface DrawerProps {
  title: string;
  isView: boolean;
  row: Partial<User.ResUserList>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: "",
  row: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.row);
      ElMessage.success({ message: `${drawerProps.value.title}用户成功！` });
      drawerProps.value.getTableList!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  acceptParams
});
</script>
