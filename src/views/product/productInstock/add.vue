<template>
	<div class="divBox">
		<el-button icon="el-icon-arrow-left" size="mini" class="pan-back-btn mb20" @click="back">返回</el-button>
		<el-card class="box-card">
			<div class="title">商品列表</div>
			<el-button @click="add()">选择商品</el-button>
			<el-table v-loading="listLoading" :data="tableData.data" style="width: 100%" size="small"
				highlight-current-row>
				<el-table-column prop="product_id" label="ID" min-width="60" />
				<el-table-column label="商品图" min-width="80">
					<template slot-scope="scope">
						<div class="demo-image__preview">
							<el-image :src="scope.row.image" :preview-src-list="[scope.row.image]" />
						</div>
					</template>
				</el-table-column>
				<!-- <el-table-column prop="cart_info.product.store_name" label="商品名称" min-width="200" /> -->
				<el-table-column min-width="150" label="商品名称">
					<template slot-scope="{ row }">
						<el-input class="elinput" :disabled="true" v-model="row.store_name"></el-input>
					</template>
				</el-table-column>

				<el-table-column min-width="100" label="单价">
					<template slot-scope="{ row }">
						<el-input class="elinput" :value='parseInt(row.price)' placeholder="请输入单价" :disabled="true"
							@input="total"></el-input>
					</template>
				</el-table-column>

				<el-table-column min-width="100" label="数量">
					<template slot-scope="{ row }">
						<el-input class="elinput" maxlength="5" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
							v-model="row.stock" placeholder="请输入数量" @input="total(row.price,row.stock)">
						</el-input>
					</template>
				</el-table-column>
				<el-table-column min-width="150" label="过期时间" v-if="this.$route.query.type==1">
					<template slot-scope="{ row }">
						<el-date-picker v-model="row.exp_time" value='yyyy-MM-dd' value-format='yyyy-MM-dd' type="date" placeholder="选择日期">
						</el-date-picker>
					</template>
				</el-table-column>
				<el-table-column min-width="100" label="小计">
					<template slot-scope="{ row }">
						<el-input class="elinput" :disabled="true" :value='parseInt(row.price*row.stock)'
							@input="total(row.price,row.stock)">
						</el-input>
					</template>
				</el-table-column>

				<el-table-column label="操作" min-width="60">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="deleteGoods(scope.row.product_id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="foot" style="margin: 20px 0;">
				<el-row type="flex" class="row-bg" justify="end">
					<el-col :span="4">
						<div class="grid-content">总金额：<el-input @input="totalSum()" :disabled="true" class="grid-input"
								v-model="orderTotal"></el-input>
						</div>
					</el-col>

					<el-col :span="4">
						<div class="grid-content">总数量：<el-input :disabled="true" class="grid-input" v-model="numTotal">
							</el-input>
						</div>
					</el-col>
				</el-row>
				<el-row type="flex" class="row-bg" justify="space-between" style="margin-top: 20px;" :gutter="20">
					<el-col :span="10">
						<div class="grid-content">类型：
							<el-select v-model="stype" placeholder="请选择" style="width: 500px;" clearable>
								<el-option v-for="(item,index) in merCateList" :key="item" :label="item"
									:value="item" />
							</el-select>
						</div>
					</el-col>
					<!-- <el-col :span="7" v-if="this.$route.query.type==1">
						<div class="grid-content">过期时间：
							<el-date-picker v-model="time" value='yyyy-MM-dd HH:mm:ss' value-format='yyyy-MM-dd HH:mm:ss' type="datetime" placeholder="选择日期">
							</el-date-picker>
						</div>
					</el-col> -->
					<el-col :span="10">
						<div class="grid-content">备注：<el-input style="width: 500px;" v-model="note"></el-input>
						</div>
					</el-col>

					<el-col :span="3">
						<el-button type="primary" @click="sub()" :loading="loadingBtn" :disabled='loadingBtn'>确认添加</el-button>
					</el-col>
				</el-row>
			</div>
			<!-- <div class="block">
        <el-pagination :page-sizes="[5,10 ,20, 0]" :page-size="tableFrom.limit" :current-page="tableFrom.page"
          layout="total, sizes, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange"
          @current-change="pageChange" />
      </div> -->
		</el-card>

		<goods-list ref="goodsList" @getProduct="getProduct" />
	</div>
</template>

<script>
	import goodsList from "./goodsList.vue";
	import {
		orderLstDetailApi,
		deleteGoodsApi,
		updateJxssApi,
		productLstApi,
		addGoodsApi,
		categoryTypeApi
	} from "@/api/order";
	import {
		roterPre
	} from '@/settings'
	export default {
		components: {
			goodsList
		},
		data() {
			return {
				note: '',
				delArr: [],
				dialogFormVisible: false,
				formLabelWidth: '120px',
				updateId: '',
				loading: false,
				listLoading: false,
				loadingBtn: false,
				tableData: {
					data: [],
					total: 0
				},
				roterPre: roterPre,

				value: true,
				numTotal: '',
				orderTotal: '',
				payTotal: '',
				checkArr: [],
				stype: '',
				merCateList: [],
				timeArr: ''
			};
		},
		mounted() {
			this.updateId = this.$route.params.id;
			this.getCategorySelect()
		},

		methods: {
			inputF(e){
				console.log('$forceUpdate',e);
				this.$forceUpdate()
			},
			changeDate(row,e){
				console.log(row,e);
			},
			// 商户分类；
			getCategorySelect() {
				categoryTypeApi({
						type: this.$route.query.type
					})
					.then((res) => {
						this.merCateList = res.data;
					})
					.catch((res) => {
						this.$message.error(res.message);
					});
			},
			add() {
				this.$refs.goodsList.dialogVisible = true;
			},
			getProduct(data) {
				for (let val in data) {
					data[val].stock = 0
					let tmp = data[val].product_id + data[val].unique;
					if (this.checkArr.indexOf(tmp) == -1) {
						this.checkArr.push(tmp);
						console.log(tmp);
						this.tableData.data.push(data[val])
						this.total()
					}
				}

			},

			sub() {
				let str = []
				this.tableData.data.forEach(item => {
					let strs = {
						product_id: item.product_id,
						image: item.image,
						store_name: item.store_name,
						stock: item.stock,
						unique: item.unique,
						price: item.price,
						exp_time: item.exp_time
					}
					str.push(strs)
				})
				if (str.length <= 0) {
					return this.$message.error('请选择商品')
				}
				console.log(this.stype);
				if (this.stype == '') {
					return this.$message.error('请选择类型')
				}
				console.log(this.time);
				let data = {
					detail: JSON.stringify(str),
					note: this.note,
					type: this.$route.query.type,
					stype: this.merCateList.indexOf(this.stype),
					price: this.orderTotal,
				}
				this.loadingBtn = true
				updateJxssApi(0, data).then(res => {
					this.$message.success(res.message)
					this.loadingBtn = false
					this.$store.dispatch('tagsView/delView', this.$route)
					this.$router.go(-1)
					// setTimeout(() => {
						
					// 	// this.$router.push({
					// 	//   path: `${roterPre}/order/list`
					// 	// })
					// }, 500)
				}).catch(res => {
					this.loadingBtn = false
					this.$message.error(res.message)
				})
			},
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
			totalSum() {
				// this.payTotal = Number(this.orderTotal)
			},


			//删除-行内删
			deleteGoods(product_id) {
				if (this.tableData.data.length == 1) {
					this.$alert("至少保留一件商品");
					return;
				}
				let that = this
				this.$confirm('是否删除此商品?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {

					for (let item in this.tableData.data) {
						if (product_id == this.tableData.data[item].product_id) {
							this.tableData.data.splice(item, 1);
							this.delArr.push({
								"product_id": product_id
							});
							this.total();
							return;
						}
					}

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
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
