//编辑审批原因管理
<template>
  <i-form ref="edit-approval" :model="editApproval" :rules="rulesApproval" :label-width="80">
    <i-form-item label="类型" prop="type">
      <i-select v-model="editApproval.type">
        <i-option label="退件" :value="374" :key="374"></i-option>
        <i-option label="拒绝" :value="375" :key="375"></i-option>
      </i-select>
    </i-form-item>
    <i-form-item label="一级" prop="first">
      <i-input v-model="editApproval.first"></i-input>
    </i-form-item>
    <i-form-item label="二级" prop="second">
      <i-input v-model="editApproval.second"></i-input>
    </i-form-item>
    <i-form-item label="CRC编码" prop="crc">
      <i-input v-model="editApproval.crc"></i-input>
    </i-form-item>
    <i-form-item label="详细内容" prop="detail">
      <i-input v-model="editApproval.detail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></i-input>
    </i-form-item>
  </i-form>

</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { Form } from 'iview';
import { Dependencies } from '~/core/decorator';
import { ApproveReasonService } from '~/services/manage-service/approve-reason.service';

@Component({
	components: {},
})
export default class AddApprovalReason extends Vue {
	@Dependencies(ApproveReasonService) private approveReasonService: ApproveReasonService;
	private editApproval: any = {};
	private rulesApproval: any = {};
	created() {
		this.rulesApproval = {
			type: [{ required: true, message: '请选择类型', trigger: 'change', type: 'number' }],
			first: [{ required: true, message: '请选择一级内容', trigger: 'change' }],
			second: [{ required: true, message: '请输入二级内容', trigger: 'blur' }],
			crc: [
				{ required: true, message: '请输入CRC编码', trigger: 'blur' },
				{ max: 20, message: '长度不能超过20个字符', trigger: 'blur' },
			],
			detail: [
				{ required: true, message: '请输入详细内容', trigger: 'blur' },
				{ max: 400, message: '长度不能超过400个字符', trigger: 'blur' },
			],
		};
	}
	//获取父组件的值
	rowParms(row) {
		this.editApproval = {
			type: (row.type = '退件' ? (this.editApproval = 374) : (this.editApproval = '375')),
			first: row.first,
			second: row.second,
			crc: row.crc,
			detail: row.detail,
			id: row.id,
		};
	}
	validFun() {
		let form = <Form>this.$refs['edit-approval'];
		form.validate(valid => {
			if (!valid) return false;
			this.approveReasonService.createApproveReason(this.editApproval).subscribe(
				val => {
					this.$emit('close');
					this.$Message.success('修改成功！');
				},
				({ msg }) => {
					this.$Message.error(msg);
				}
			);
		});
	}
}
</script>
