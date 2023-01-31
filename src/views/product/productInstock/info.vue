<template>
	<div class="divBox">
		<el-button icon="el-icon-arrow-left" size="mini" class="pan-back-btn mb20" @click="back">返回</el-button>
		<el-card class="box-card">
			<div class="title">单据详情</div>
			<el-row style="margin-top: 20px;" :gutter="20">
				<el-col v-bind="grid2">
					<div>订单号：{{tableData.order_sn}}
					</div>
				</el-col>

				<el-col :span="10">
					<div>类型：{{tableData.type}}
					</div>
				</el-col>
			</el-row>
			<el-row style="margin-top: 20px;" :gutter="20">
				<el-col :span="10">
					<div>子类型：{{tableData.stype}}
					</div>
				</el-col>

				<el-col :span="10">
					<div>数量：{{tableData.stock}}
					</div>
				</el-col>
			</el-row>
			<el-row style="margin-top: 20px;" :gutter="20">
				<el-col :span="10">
					<div>价格：{{tableData.price}}
					</div>
				</el-col>
				<el-col :span="10">
					<div>备注：{{tableData.note}}
					</div>
				</el-col>
			</el-row>
			<div class="title" style="margin-top: 30px;">商品清单</div>
			<el-table v-loading="listLoading" :data="tableData.detail" style="width: 100%" size="small"
				highlight-current-row>
				<el-table-column prop="product_id" label="ID" min-width="60" />
				<el-table-column label="商品图" min-width="80">
					<template slot-scope="scope">
						<div class="demo-image__preview">
							<el-image :src="scope.row.image" :preview-src-list="[scope.row.image]" />
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="store_name" min-width="200" label="商品名称"></el-table-column>

				<el-table-column prop="price" min-width="100" label="单价"></el-table-column>

				<el-table-column prop="stock" min-width="100" label="数量"></el-table-column>
				<el-table-column min-width="100" label="过期时间" v-if="tableData._type==1">
					<template slot-scope="scope">
						<div v-if="new Date(scope.row.exp_time).getTime()<=new Date().getTime()" style="color: red;">
							{{scope.row.exp_time}}
						</div>
						<div v-else>
							{{scope.row.exp_time}}
						</div>
					</template>
				</el-table-column>
			</el-table>

		</el-card>
	</div>
</template>

<script>
	import {
		roterPre
	} from '@/settings'
	export default {
		data() {
			return {
				listLoading: false,
				roterPre: roterPre,
				numTotal: '',
				orderTotal: '',
				payTotal: '',
				tableData: {

				},
				grid2: {
					xl: 10,
					lg: 12,
					md: 12,
					sm: 24,
					xs: 24
				},
			};
		},
		mounted() {
			this.tableData = this.$route.params
			this.tableData.detail = JSON.parse(this.tableData.detail)
		},

		methods: {

			// 返回
			back() {
				this.$store.dispatch('tagsView/delView', this.$route)
				this.$router.go(-1)
			},
			total() {
				let numTotal = 0
				let orderTotal = 0
				let payTotal = 0
				for (let item in this.tableData.data) {

					let _num = parseInt(this.tableData.data[item].stock) || 0;
					let _price = _num * this.tableData.data[item].price;
					numTotal += _num;
					orderTotal += _price;
					payTotal += _price;
				}
				this.orderTotal = orderTotal
				this.numTotal = numTotal
				this.payTotal = payTotal
			},

		}
	};
</script>

<style scoped lang="scss">
	.red {
		color: #f00;
	}

	.bold {
		font-weight: bold;
	}

	.grid-input {
		width: 40%;
	}

	.grid-content {
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.foot {
		margin-top: 20px;
	}

	.elinput {
		width: 60%;
	}

	.title {
		margin-bottom: 16px;
		color: #17233d;
		font-weight: 700;
		font-size: 20px;
	}

	.description-term {
		font-size: 16px !important;
	}

	.description {
		&-term {
			display: table-cell;
			padding-bottom: 10px;
			line-height: 20px;
			width: 50%;
			font-size: 12px;
		}
	}

	.logistics {
		align-items: center;
		padding: 10px 0px;

		.logistics_img {
			width: 45px;
			height: 45px;
			margin-right: 12px;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.logistics_cent {
			span {
				display: block;
				font-size: 12px;
			}
		}
	}

	.trees-coadd {
		width: 100%;
		height: 400px;
		border-radius: 4px;
		overflow: hidden;

		.scollhide {
			width: 100%;
			height: 100%;
			overflow: auto;
			margin-left: 18px;
			padding: 10px 0 10px 0;
			box-sizing: border-box;

			.content {
				font-size: 12px;
			}

			.time {
				font-size: 12px;
				color: #2d8cf0;
			}
		}
	}

	.scollhide::-webkit-scrollbar {
		display: none;
		/* Chrome Safari */
	}

	.modalbox {
		/deep/.el-dialog {
			min-width: 550px;
		}
	}

	.selWidth {
		width: 350px !important;
	}

	.seachTiele {
		margin: 0 0 15px;
		line-height: 35px;
	}

	.fa {
		color: #0a6aa1;
		display: block;
	}

	.sheng {
		color: #ff0000;
		display: block;
	}

	.ml20 {
		margin-left: 20px;
	}

	.box-container {
		overflow: hidden;
	}

	.box-container .list {
		float: left;
		line-height: 40px;
	}

	.box-container .sp {
		width: 50%;
	}

	.box-container .sp3 {
		width: 33.3333%;
	}

	.box-container .sp100 {
		width: 100%;
	}

	.box-container .list .name {
		display: inline-block;
		width: 150px;
		text-align: right;
		color: #606266;
	}

	.box-container .list .blue {
		color: #1890ff;
	}
</style>
