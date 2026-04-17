<template>
  <el-dialog
    title="新增收藏"
    :visible.sync="visible"
    width="500px"
    @close="handleCancel"
  >
    <el-form :model="form" label-width="80px">
      <el-form-item label="应用名称" required>
        <el-input v-model="form.name" placeholder="请输入应用名称"></el-input>
      </el-form-item>
      <el-form-item label="URL" required>
        <el-input v-model="form.url" placeholder="请输入URL地址"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          :class="{
            'avatar-uploader': true,
            disabledPic: disabled,
          }"
          ref="uploadFiles"
          :limit="1"
          accept=".jpg,.jpeg,.bmp,.png"
          name="file"
          :headers="headers"
          list-type="picture-card"
          :action="'#'"
          :file-list="fileListNo"
          :http-request="uploadFile"
          :before-upload="beforeUpload"
          :on-preview="handlePreview"
          :on-success="handleFileSuccess"
          :on-remove="handleRemove"
          :on-exceed="handleExceed"
          :auto-upload="true"
          v-loading="showLoading"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <div class="icon-upload-tip">图标格式支持jpg、jpeg、png，图片文件大小不超过100k</div>
      </el-form-item>
    </el-form>
    <el-dialog :modal-append-to-body="true" append-to-body :close-on-click-modal="false" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddFavoriteDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        icon: '',
        url: ''
      },
      // 图标上传相关
      fileListNo: [],
      dialogVisible: false,
      dialogImageUrl: '',
      disabled: false,
      showLoading: false,
      headers: {},
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.form);
      this.handleCancel();
    },
    handleCancel() {
      // 重置表单
      this.form = {
        name: '',
        icon: '',
        url: ''
      };
      this.fileListNo = [];
      this.$emit('close');
    },
    uploadFile(params) {
      const file = params.file

      const formData = new FormData()
      formData.append("file", file)

      // 这里应该调用实际的上传API
      // uploadFile1(formData).then(res=>{
      //   params.onSuccess(res)
      // }).catch(error=>{
      //   params.onError(error)
      // })
      
      // 模拟上传成功
      setTimeout(() => {
        const fileUrl = URL.createObjectURL(file);
        const mockResponse = {
          data: {
            originalName: file.name,
            link: fileUrl
          }
        };
        // 确保file对象有url属性
        file.url = fileUrl;
        params.onSuccess(mockResponse);
      }, 1000);
    },
    beforeUpload(file) {
      let acceptType = ['jpg','jpeg','png','PNG','bmp'];
      let extension = file.name.substring(file.name.lastIndexOf('.') + 1);
      if (-1 === acceptType.indexOf(extension)) {
        this.$message.warning('支持文件格式'+ acceptType +'！');
        return false;
      }
      if (file.size/1024 > 100) {
        this.$message.warning("当前文件超过100k，请修改！");
        return false;
      }
      return true;
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleFileSuccess(response, file, fileList) {
      this.disabled = true
      // 使用组件提供的fileList，而不是重新创建
      this.fileListNo = fileList;
      // 更新form中的icon
      this.form.icon = response.data.link||'';
      this.dialogImageUrl = response.data.link||'';
    },
    handleRemove(file, fileList) {
      this.disabled = false
      // 处理文件移除
      this.fileListNo = fileList;
      if (fileList.length === 0) {
        this.form.icon = '';
      }
    },
    handleExceed(){
      // console.log(456456, this.fileListNo)
      this.$message.warning('图片上传数量已上限！')
    },
  }
}
</script>

<style scoped>
/* 图标上传区域样式 */
.avatar-uploader {
  margin: 10px 0;
}

::v-deep .disabledPic .el-upload--picture-card {
    display: none !important;
  }
.icon-upload-tip {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}
</style>