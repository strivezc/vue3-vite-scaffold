<template>
  <div class="app-container">
    <el-form
        :inline="true"
        class="form-border"
        autocomplete="on"
        :model="formData"
        onsubmit="return false"
    >
      <el-form-item label="代理商ID/名称" prop="keyword">
        <el-input
            v-model="formData.keyword"
            placeholder="代理商ID/名称"
            name="userInfo"
            class="input"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click="search" v-permission="'1100'"
        >查询</el-button
        >
        <el-button @click="clear" v-permission="'1100'">清空选项</el-button>
      </el-form-item>
    </el-form>
    <div class="pt20">
      <total-count :total="total"></total-count>
      <el-table v-loading="tableDataLoading" :data="tableData" border>
        <el-table-column align="center" label="代理商ID" prop="id"></el-table-column>
        <el-table-column align="center" label="名称" prop="userName"></el-table-column>
        <el-table-column align="center" label="代理城市" prop="registerTime"></el-table-column>
        <el-table-column align="center" label="成为代理日期" prop="completeTaskNum"></el-table-column>
        <el-table-column align="center" label="手机号码" prop="balance"></el-table-column>
        <el-table-column align="center" label="微信号" prop="withdrawalTotalAmount"></el-table-column>
        <el-table-column align="center" label="QQ" prop="withdrawalTotalAmount"></el-table-column>
        <el-table-column align="center" label="余额(元)" prop="withdrawalTotalAmount"></el-table-column>
        <el-table-column align="center" label="可使用金额(元)" prop="withdrawalTotalAmount"></el-table-column>
      </el-table>
      <pagination
          v-show="total > 0"
          :total="total"
          v-model:page="listQuery.currPage"
          v-model:limit="listQuery.pageSize"
          @pagination="getList"
      />
    </div>
  </div>
</template>

<script setup name="AgentManage">
const { proxy } = getCurrentInstance()

const state = reactive({
  formData: {
    startDate: '',
    endDate: '',
    accountStatus: '',
    keyword: ''
  },
  tableDataLoading: false,
  tableData: [],
  total: 0,
  showPermission1: false,
  listQuery: {
    currPage: 1,
    pageSize: 10
  }
})

const { formData, tableDataLoading, tableData, total, showPermission1, listQuery } = toRefs(state)

function search() {
  listQuery.value.currPage = 1
  getList()
}

function clear() {
  formData.value = {
    startDate: '',
    endDate: '',
    accountStatus: '',
    keyword: ''
  }
  listQuery.value.currPage = 1
  getList()
}

const getList = async () => {
  tableDataLoading.value = true
  try {
    const params = {
      ...formData.value,
      ...listQuery.value
    }
    const { data, totalCount, showPermission } = await proxy.$http.user.queryUserManageList(params)
    tableData.value = data
    total.value = totalCount
    showPermission1.value = showPermission
  } catch (e) {
    console.log(e, 'error')
  } finally {
    tableDataLoading.value = false
  }
}
search()
</script>

<style scoped lang="scss">
</style>
