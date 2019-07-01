<template>
	<div class="cart" >
		<table :style="{height:home_first_height+'px'}" v-if="cart.length" ref="table">
			<tbody>
				<tr>
					<th class="th_chk"><div><input type="checkbox" @change="selectAll" id="selectAll" v-model="isAll"/><label for="selectAll">全选</label></div></th>
					<th class="th_item"></th>
					<th class="th_info">书籍类别</th>
					<th class="th_price">单价</th>
					<th class="th_amount">数量</th>
					<th class="th_sum">金额</th>
					<th class="th_op">操作</th>
				</tr>
				<tr v-for="(single,index) in cart">
					<td class="td_chk"><input type="checkbox" v-model="single.completed" name="singlecheck"/></td>
					<td class="td_item">
						<div>
							<img v-image-preview :src="require('@/assets/pics/'+single.isbn+'.jpg')" alt="single"/><p>{{single.title}}</p>
						</div>
					</td>
					<td class="td_info">
						<p>{{single.category}}<br/></p>
					</td>
					<td class="td_price">
						￥{{parseFloat(single.price).toFixed(2)}}
					</td>
					<td class="td_amount">
						<div>
							<span class="subtract" @click="changeNumSub(index)" :class="{disabled:single.num<=1}">-</span>
							<input type="text" class="input_num" :value="single.num" disabled/>
							<span class="add" @click="changeNumAdd(index)" :class="{disabled:single.num>=8}">+</span>
						</div>	
					</td>
					<td class="td_sum">￥{{parseFloat(single.num*single.price).toFixed(2)}}</td>
					<td class="td_op"><span @click="remove(index)">删除</span></td>
				</tr>
			</tbody>
			<div class="t_foot">
				<p>
					已选<span>{{selectedSum}}</span>件
				</p>
				<p>共<span>{{priceSum}}</span>元</p>
				<p><button>结算</button></p>
			</div>
		</table>
		<div v-if="!cart.length" :style="{height:home_first_height+'px'}">
			<p class="empty">你的购物车空空如也</p>
		</div>
	</div>
	
</template>
<script type="text/javascript">
	import {mapGetters} from 'vuex'
	export default {
		data(){
			return {
				cart:[
          {
            "title": "世界全史(全12卷)",
            "price": 566,
            "priced": 2695,
            "author": "秦川　主编",
            "publisher": "中国戏剧出版社",
            "isbn": "9787104027430",
            "category": "文集",
            "content": "16开精装，中国戏剧出版社出版全书共12卷，分为通史、野史、秘史、艳史四大版块，《世界通史》共6卷，《世界野史》、《世界秘史》、《世界艳史》各2卷采用文字为主，图片配合的方式，全书体系明了，内容翔实，生动有趣，有很强的可读性读者能从中得到丰富的历史知识，了解形形色色的历史人物，从多个侧面理解世界历史",
            "picture": "D://pics//9787104027430.jpg"

          },
          {
            "title": "中国20世纪全史(全10卷)",
            "price": 400.7,
            "priced": 598,
            "author": "胡绳武,戴鞍钢",
            "publisher": "中国青年出版社",
            "isbn": "7500642644",
            "category": "外国散文",
            "content": "32开精装，中国青年出版社由书籍设计大师吕敬人领衔设计装帧是目前国内第壹部全景式详述二十世纪中国百年风云，尤其是中国共产党八十年奋斗历程的多卷本大型史书丛书共分十卷，全面记述了中国从辛亥革命到改革开放的历史，书中不仅吸收了学术界的zui新研究成果，而且许多珍贵的史料是diyi次同读者见面具有较强的史料性及可读性，对于了解中国20世纪的风风雨雨，成败得失具有重要的启迪作用",
            "picture": "D://pics//7500642644.jpg"
          },
          {
            "title": "史记(文白对照全注全译)(6册)",
            "price": 356,
            "priced": 1695,
            "author": "司马迁",
            "publisher": "北京燕山出版社",
            "isbn": "7540218320",
            "category": "文学",
            "content": "16开红色锦缎精装，北京燕山出版社出版内容丰富：举凡政治、军事、经济、社会、文化、艺术、天文律历、山川地理、风土人情，无所不包阅读价值：本书以全新的形式诠释中华史学经典，探索华夏传统文化的起源、形成与发展的漫漫长路装帧精美：采用精美红色锦缎装裱，书脊文字采用美国金料镭射烫金。华丽典雅，具有收藏价值",
            "picture": "D://pics//7540218320.jpg"
          },
          {
            "title": "读二十五史蠡述（全三册）",
            "price": 324,
            "priced": 720,
            "author": "李澄宇",
            "publisher": "国家图书馆出版社",
            "isbn": "7501327297",
            "category": "文集",
            "content": "32开布面精装，国家图书馆出版社出版李澄宇是兼著名诗人、古文学大家、史学大家、楹联大家于一身的国学大师，曾创办《岳阳日报》本书是《历代正史研究文献丛刊》之一，包含着历代正史的多种研究资料，是中国古代史、史学史、学术史及文献学等领域的重要文献参考（1882——1955），字洞庭；幼名李旦，字吉初；学名李寰，字瀛北；笔名李洞庭（后来“洞庭”成为他的字）、李秋水；谱名昌旦；今湖南岳阳筻口镇沙南新村山上周家岭人，他是兼著名诗人、古文学大家、史学大家、楹联大家于一身的国学大师。李澄宇为清末秀才，入岳阳书院。清废科举，入湖南省陆军速成学校。后从名儒吴獬，为入室弟子。李澄宇参加了中国著名的文学社团南社、新南社、南社湘集、船山学社。李澄宇与傅熊湘、谢晋、姚大愿、姚大慈并称“湘中五子”；李澄宇（又名李洞庭）与彭一湖并誉为“洞庭一湖”；傅熊湘、柳亚子评价李澄宇和姚大慈的诗为“姚醇李俊”。1911年辛亥革命，岳阳光复，李澄宇创办了《岳阳日报》；1913年，李澄宇在北京创办了《京都报》。民国初，李澄宇积功授陆军少将，后在湖南省政府任秘书、秘书长多年，又在各大学任中文系教授数年；解放后，李澄宇任湖南文物保护委员会委员、湖南文史馆馆员。李澄宇一生从军、从政、从教，著作等身。《读二十五史蠡述》含：《读史记蠡述》、《读汉书蠡述》、《读后汉书蠡述》、《读三国志蠡述》、《读晋书蠡述》、《读宋书蠡述》、《读南齐书蠡述》、《读梁书蠡述》、《读陈书蠡述》、《读魏书蠡述》、《读北齐书蠡述》、《读周书蠡述》、《读隋书蠡述》、《读南史蠡述》、《读北史蠡述》、《读旧唐书蠡述》、《读新唐书蠡述》、《读旧五代史蠡述》、《读新五代史蠡述》、《读宋史蠡述》、《读辽史蠡述》、《读金史蠡述》、《读元史蠡述》、《读新元史蠡述》、《读明史蠡述》共25种74卷。",
            "picture": "D://pics//7501327297.jpg"
          },
          {
            "title": "鸿雪因缘图记-一函三册",
            "price": 258,
            "priced": 300,
            "author": "麟庆",
            "publisher": "国家图书馆出版社",
            "isbn": "9787501346882",
            "category": "文集",
            "content": "12开函套装，国家图书馆出版社2011年1版1印一九八四年，北京古籍出版社据原刻影印，三十二开，一图裂为两面。此次国家图书馆出版社据道光版精印出版，将使这部珍贵谱书为雅俗所共赏，在更大范围流传二百四十图所作山水屋木、人物走兽、舟车桥梁，包罗万象，纤毫毕具，精美异常，具有文学、历史、绘画、民俗、建筑的研究价值本书内容丰富，概况起来有四个方面：名胜游记、京都纪事、官场见闻、满汉旧俗郑振铎《中国古代木刻画史略》注录此书，称其“以图来记叙自己生平，刻得很精彩，可考见当时的生活实况。《鸿雪因缘图记》凡三集，卷帙冣为浩瀚。”《鸿雪因缘图记》出自清朝内务府旗人完颜氏麟庆之手。完颜氏，是清朝内务府世家中非同凡响的一个家族，而麟庆编撰《鸿雪因缘图记》，又是一部体例独创的谱书。这两者之间，实际有着千丝万缕的联系。正因为如此，评价《鸿雪因缘图记》，不能不从麟庆的家世说起。麟庆曾经宦游大江南北，加以性好山水，所至之地皆不废登临，留心考察，见闻宏广，并将自己所历所闻所见一一详加记录，复请当时著名画家汪英福(春泉)、陈鉴(朗斋)、汪圻(甸卿)等人按题绘成游历图，以期使生平雪泥鸿爪之印痕藉以长久保留。“鸿雪”二字正是出于苏东坡诗“人生到处知何似，应是飞鸿踏雪泥。泥上偶然留指爪，鸿飞那复记东西。”是书以图文相副相成的形式，实录其所至所闻的各地山川、古迹、风土、民俗、风俗、河防、水利、盐务等等，保存和反映了道光年间广阔的社会风貌。清道光十八年(1828)，麟庆门生王国佐曾将《图记》初、二集付之剞劂，因“图帙缜密，未得镌手，故只刊记文，未刊图画。”至麟庆殁后三年(1849)，其子崇实、崇厚始在扬州觅得良工，将包括初、二、三集全部图画文字内容的《图记》刻板印行，刻工十分精美。《鸿雪因缘图记》所载240图，内涵涉及山水屋木、人物走兽、舟车桥梁，包罗万象，纤毫毕具。郑振铎《中国古代木刻画史略》著录此书，称其“以图来记叙自己生平，刻得很精彩，可考见当时的生活实况。《鸿雪因缘图记》凡三集，卷帙zui为浩瀚。”",
            "picture": "D://pics//9787501346882.jpg"
          }
        ]
			}
		},
		computed:{
			selectedSum(){
				return this.cart.filter(function(e){
					return e.completed
				}).length
			},
			priceSum(){
				//浮点数加法
				var floatMul=function(m,n,sum){
					var _m=m.split('.')
					var _n=n.split('.')
					var maxFloatNum=Math.max(parseInt(_m[1].length),parseInt(_n[1].length))
					console.log(maxFloatNum)
					var multiple=(parseFloat(m)*Math.pow(10,maxFloatNum)+parseFloat(n)*Math.pow(10,maxFloatNum))/Math.pow(10,maxFloatNum)
					return multiple.toFixed(sum)
				}
				var sum='0.00';
				this.cart.filter(function(e){
					return e.completed
				}).forEach(function(n){
					sum=floatMul(sum,parseFloat(n.num*n.price).toFixed(2),2)
				})
				return sum
			},
			//点击单个选择到全部选到时，会将全选按钮一起带动
			isAll:{
        get: function () {
          return this.cart.every(function (e) {
            return e.completed
          })
        },
        set: function () {

          }

      },
			home_first_height:function(){
				var a= parseInt(800)-200
				return a<389?389:a
			},
		},
		methods:{
			selectAll(){
				
				//依靠isAll
				if(this.isAll){
					this.cart.forEach(function(e){
						e.completed=false
					})
				}else{
					this.cart.forEach(function(e){
						e.completed=true
					})
				}
			},
			changeNumSub(index){
				
				if(this.cart[index].num>1){
					this.$store.dispatch('changeNumSub',index)
				}
				
			},
			changeNumAdd(index){
				if(this.cart[index].num<8){
					this.$store.dispatch('changeNumAdd',index);
				}	
			},
			remove(index){
				this.$store.dispatch('remove',index)
			}
			
		},
		created(){
			this.cart.forEach(function(e){
					e.completed=false
          e.num=1
			});
			this.$store.dispatch('changeShow','')
      console.log("chenggongjiaru",this.cart);
		},
	}
</script>
<style>
	/*简直就是坑爹的table，火狐和chrome的thead不一样*/
	table{margin:0 auto; padding-bottom: 60px;position: relative;}
	tbody{width:1060px;display: block;margin:0;}
	tbody tr{border:1px solid #00BC9B;display:block;margin: 20px 0}
	tbody tr:first-child{border: none;}
	tbody td{height: 100px;display: inline-block;padding-top: 20px;}
	th{text-align: left;display: inline-block;padding-top: 20px;font-size: 12px;height: 40px;}
	label{font-size: 12px}
	.td_chk{width: 80px;}
	.td_chk input{display: inline-block;margin:0 10px;cursor: pointer;}
	.td_item{width: 300px;overflow: hidden;}
	.td_item img{width: 80px;height: 80px;}
	.td_item p{display: inline-block;width: 186px;font-size: 12px;overflow: hidden;    text-overflow: ellipsis;
    max-height: 36px;    color: #3c3c3c;;vertical-align: top;margin-left: 5px;cursor: pointer;}
	.td_item p:hover{color:#00BC9B;text-decoration: underline;}
	.td_info{width: 170px;}
	.td_info p{color:#9c9c9c;font-size: 12px;}
	.td_price,.td_sum{width: 120px;color: #3c3c3c;font-weight: 700; font-family: Verdana,Tahoma,arial;font-size: 12px;}
    .td_amount{width: 120px}
    .td_sum{color:#00BC9B;}
    .td_op{width: 120px;}
    .td_op span{cursor: pointer;font-size: 12px;}
    .td_op span:hover{color:#00BC9B;text-decoration: underline;}
	.th_chk{width: 80px;}
	.th_chk input{display: inline-block;margin:0 10px;cursor: pointer;}
	.th_item{width: 300px;}
	.th_info{width: 170px;}
	.th_price,.th_sum{width: 120px;}
	.th_amount{width: 120px}
	.th_op{width: 120px}
	.t_foot{border: 1px solid #00BC9B ;position: absolute;bottom: 3px;width:1060px;}
	.t_foot span{color:#00BC9B;}
	.t_foot p{display: inline-block;margin-right: 20px;width: 100px;text-align: center}
	.t_foot button{padding: 15px 30px;background:#00BC9B; border: none;cursor: pointer}
	.empty{width: 500px;height: 200px;font-size: 20px;text-align: center;border: 1px dashed #00BC9B;margin: 0 auto;padding-top: 100px}
	.disabled{color:#fff; cursor: not-allowed;background: #ededed;}
</style>
