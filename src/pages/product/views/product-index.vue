<template>
	<div class="main">
		<div v-wechat-title="$route.meta.title"></div>
		<!-- 用户信息 -->
        <div class="weui-tab" id="tab">
            <div class="weui-navbar">
                <div class="weui-navbar__item" @click="tabNav()">产品介绍</div>
                <div class="weui-navbar__item" @click="tabNav()">复习课程</div>
            </div>
            <div class="weui-tab__panel">
                <div class="weui-tab__content" style="display: block">
                    <div class="wrap">
                        <div class="typeTitle">
                            <img src="./img/remai.png" alt="">
                            <span>热卖产品</span>
                        </div>
                        <div class="product-wrap"  >
                            <!--<template v-for="(item,index) in productList">
                                <div class="left">
                                    <div  class="product-item" @click="goDetail()">
                                        <div class="productImg small">
                                            <img src="./img/product1.png" alt="">
                                        </div>
                                        <div class="productTitle">容亿学学前计算机基础知识培训</div>
                                        <div class="productPrice">￥ 599.00</div>
                                    </div>
                                    <div  class="product-item" @click="goDetail()">
                                        <div class="productImg">
                                            <img src="./img/product2.png" alt="">
                                        </div>
                                        <div class="productTitle">容亿学学前计算机基础知识培训</div>
                                        <div class="productPrice">￥ 599.00</div>
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="product-item" @click="goDetail()">
                                        <div class="productImg">
                                            <img src="./img/product2.png" alt="">
                                        </div>
                                        <div class="productTitle">容亿学学前计算机基础知识培训</div>
                                        <div class="productPrice">￥ 599.00</div>
                                    </div>
                                    <div class="product-item" @click="goDetail()">
                                        <div class="productImg">
                                            <img src="./img/product2.png" alt="">
                                        </div>
                                        <div class="productTitle">容亿学学前计算机基础知识培训</div>
                                        <div class="productPrice">￥ 599.00</div>
                                    </div>
                                </div>
                            </template>-->
                            <div class="product-item" @click="goDetail('/productDetail?id='+item.id+'&brandName='+item.goodsBrand.brandName+'&categoryName='+item.goodsCategory.categoryName)" v-for="(item,index) in productList" :key="index">
                                <div class="productImg">
                                    <img v-if="item.coverImg" :src="item.coverImg" alt="">
                                    <img v-if="!item.coverImg" src="./img/icon_empty_1.png" alt="">
                                </div>
                                <div class="productTitle">{{item.goodsName}}</div>
                                <!--<div class="productPrice">￥ 599.00</div>-->
                                <div class="productTitle">{{item.goodsDescirbe}}</div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="weui-tab__content">
                    <div class="wrap">
                        <div class="cha">
                            <div>
                                A系列
                                <input type="radio" name="record" @click="chaxun('showA')"  checked>
                            </div>
                            <div>
                                B系列
                                <input type="radio" name="record"  @click="chaxun('showB')" >
                            </div>
                            <div>
                                C列
                                <input type="radio" name="record"  @click="chaxun('showC')" >
                            </div>
                        </div>
                        <div v-show="showA" class="">
                            <table  cellpadding="0" cellspacing="1" >
                                <tr>
                                    <td class="pad2">上学期</td>
                                </tr>
                                <tr>
                                    <td class="pad1">第一阶段</td>
                                </tr>
                                <tr>
                                    <td>Apple 1-1 介绍新朋友</td>
                                </tr>
                                <tr>
                                    <td>Apple 1-2 我们是朋友</td>
                                </tr>
                                <tr>
                                    <td>Apple 1-3 太阳和星星</td>
                                </tr>
                                <tr>
                                    <td>Apple 1-4 小飞机的探险</td>
                                </tr>
                                <tr>
                                    <td>Apple 1-5 喜欢冰淇淋</td>
                                </tr>
                                <tr>
                                    <td>Apple 1-6 爷爷的椅子</td>
                                </tr>
                                <tr>
                                    <td>Apple 1-7 幸福的家</td>
                                </tr>
                                <tr>
                                    <td>Apple 1-8（活动课）韩国 瓦屋</td>
                                </tr>
                                <tr>
                                    <td class="pad1">第二阶段</td>
                                </tr>
                                <tr>
                                    <td>Apple 2-1 神奇的眼镜</td>
                                </tr>
                                <tr>
                                    <td>Apple 2-2 咔擦咔擦剪刀</td>
                                </tr>
                                <tr>
                                    <td>Apple 2-3 叮铃铃，坐上自行车</td>
                                </tr>
                                <tr>
                                    <td>Apple 2-4 好吃，好吃 做果汁</td>
                                </tr>
                                <tr>
                                    <td>Apple 2-5 毛毛虫</td>
                                </tr>
                                <tr>
                                    <td>Apple 2-6 小长颈鹿的午饭时间</td>
                                </tr>
                                <tr>
                                    <td>Apple 2-7 猴子的香蕉</td>
                                </tr>
                                <tr>
                                    <td>Apple 2-8（活动课）happy together</td>
                                </tr>
                                <tr >
                                    <td class="pad1">选修阶段</td>
                                </tr>
                                <tr>
                                    <td>Apple 3-1 欢乐的游乐场--跷跷板</td>
                                </tr>
                                <tr>
                                    <td>Apple 3-2 好玩的游乐场-旋转教具</td>
                                </tr>
                                <tr>
                                    <td>Apple 3-3 好玩的游乐园--梦幻岛</td>
                                </tr>
                                <tr>
                                    <td>Apple 3-4 往水里扑通跳</td>
                                </tr>
                                <tr>
                                    <td>Apple 3-5 准备比赛</td>
                                </tr>
                                <tr>
                                    <td>Apple 3-6 嗨呦!举重选手</td>
                                </tr>
                                <tr>
                                    <td>Apple 3-7 好吃的披萨</td>
                                </tr>
                                <tr>
                                    <td>Apple 3-8（活动课）Happy Together荷兰</td>
                                </tr>
                                <tr >
                                    <td class="pad2">下学期</td>
                                </tr>
                                <tr >
                                    <td class="pad1">第一阶段</td>
                                </tr>
                                <tr>
                                    <td>Apple 4-1 打扫干净</td>
                                </tr>
                                <tr>
                                    <td>Apple 4-2 蚂蚁和蟋蟀</td>
                                </tr>
                                <tr>
                                    <td>Apple 4-3 韩国的传统游戏-投壶</td>
                                </tr>
                                <tr>
                                    <td>Apple 4-4 秋天天空上的红蜻蜓</td>
                                </tr>
                                <tr>
                                    <td>Apple 4-5 我是摄影家</td>
                                </tr>
                                <tr>
                                    <td>Apple 4-6 汽车轰隆轰隆响</td>
                                </tr>
                                <tr>
                                    <td>Apple 4-7 钓鱼</td>
                                </tr>
                                <tr>
                                    <td>Apple 4-8（活动课）挪威的海盗</td>
                                </tr>
                                <tr>
                                    <td class="pad1">第二阶段</td>
                                </tr>
                                <tr>
                                    <td>Apple 5-1 更快、更高</td>
                                </tr>
                                <tr>
                                    <td>Apple 5-2 河马的收音机</td>
                                </tr>
                                <tr>
                                    <td>Apple 5-3 是谁的自行车</td>
                                </tr>
                                <tr>
                                    <td>Apple 5-4 安全的滑</td>
                                </tr>
                                <tr>
                                    <td>Apple 5-5 交通标志牌</td>
                                </tr>
                                <tr>
                                    <td>Apple 5-6 身体不舒服，去医院</td>
                                </tr>
                                <tr>
                                    <td>Apple 5-7 小蜗牛的家</td>
                                </tr>
                                <tr>
                                    <td>Apple 5-8（活动课）天下无敌的坦克</td>
                                </tr>
                                <tr>
                                    <td class="pad1">选修阶段</td>
                                </tr>
                                <tr>
                                    <td>Apple 6-1 传统游戏--抽陀螺</td>
                                </tr>
                                <tr>
                                    <td>Apple 6-2 勇敢的勇敢的救护队--直升飞机</td>
                                </tr>
                                <tr>
                                    <td>Apple 6-3 匹诺曹的谎话</td>
                                </tr>
                                <tr>
                                    <td>Apple 6-4 念魔法的咒文</td>
                                </tr>
                                <tr>
                                    <td>Apple 6-5 咚咚咚咚！演奏架子鼓</td>
                                </tr>
                                <tr>
                                    <td>Apple 6-6 弗拉门戈</td>
                                </tr>
                                <tr>
                                    <td>Apple 6-7 照亮夜海</td>
                                </tr>
                                <tr>
                                    <td>Apple 6-8（活动课）泰姬陵</td>
                                </tr>
                            </table>
                        </div>
                        <div v-show="showB" class="">
                            <table  cellpadding="0" cellspacing="1" >
                                <tr>
                                    <td class="pad2">上学期</td>
                                </tr>
                                <tr>
                                    <td class="pad1">第一阶段</td>
                                </tr>
                                <tr>
                                    <td>Bread 1-1 介绍新朋友</td>
                                </tr>
                                <tr>
                                    <td>Bread 1-2 人类的起源</td>
                                </tr>
                                <tr>
                                    <td>Bread 1-3 小草发芽了</td>
                                </tr>
                                <tr>
                                    <td>Bread 1-4 转吧！纸风车</td>
                                </tr>
                                <tr>
                                    <td>Bread 1-5 种什么好呢？</td>
                                </tr>
                                <tr>
                                    <td>Bread 1-6 开了彩虹色的花</td>
                                </tr>
                                <tr>
                                    <td>Bread 1-7 蝴蝶在跳舞</td>
                                </tr>
                                <tr>
                                    <td>Bread 1-8（活动课）比萨斜塔</td>
                                </tr>
                                <tr>
                                    <td class="pad1">第二阶段</td>
                                </tr>
                                <tr>
                                    <td>Bread 2-1 好玩的数字游戏</td>
                                </tr>
                                <tr>
                                    <td>Bread 2-2 旋转木马</td>
                                </tr>
                                <tr>
                                    <td>Bread 2-3 大西瓜</td>
                                </tr>
                                <tr>
                                    <td>Bread 2-4 小红帽和狼</td>
                                </tr>
                                <tr>
                                    <td>Bread 2-5 老虎的生日派对</td>
                                </tr>
                                <tr>
                                    <td>Bread 2-6 一群蚂蚁</td>
                                </tr>
                                <tr>
                                    <td>Bread 2-7 海底的胡同网</td>
                                </tr>
                                <tr>
                                    <td>Bread 2-8（活动课）飞行在天空中的篮子</td>
                                </tr>
                                <tr >
                                    <td class="pad1">选修阶段</td>
                                </tr>
                                <tr>
                                    <td>Bread 3-1 蔬菜国的三兄弟</td>
                                </tr>
                                <tr>
                                    <td>Bread 3-2 酷酷的太阳镜</td>
                                </tr>
                                <tr>
                                    <td>Bread 3-3 小风轻轻的吹</td>
                                </tr>
                                <tr>
                                    <td>Bread 3-4 深深的蓝海里</td>
                                </tr>
                                <tr>
                                    <td>Bread 3-5 在跳舞的鱿鱼</td>
                                </tr>
                                <tr>
                                    <td>Bread 3-6 毒针的霸主蝎子</td>
                                </tr>
                                <tr>
                                    <td>Bread 3-7 蜜蜂的信号</td>
                                </tr>
                                <tr>
                                    <td>Bread 3-8（活动课）不会飞的鸟</td>
                                </tr>
                                <tr >
                                    <td class="pad2">下学期</td>
                                </tr>
                                <tr >
                                    <td class="pad1">第一阶段</td>
                                </tr>
                                <tr>
                                    <td>Bread 4-1 呱呱！呱呱！青蛙</td>
                                </tr>
                                <tr>
                                    <td>Bread 4-2 狮子和老鼠</td>
                                </tr>
                                <tr>
                                    <td>Bread 4-3 狮子和老鼠</td>
                                </tr>
                                <tr>
                                    <td>Bread 4-4 甲壳虫</td>
                                </tr>
                                <tr>
                                    <td>Bread 4-5 兔子</td>
                                </tr>
                                <tr>
                                    <td>Bread 4-6 乌龟</td>
                                </tr>
                                <tr>
                                    <td>Bread 4-7 轻轻摇尾巴</td>
                                </tr>
                                <tr>
                                    <td>Bread 4-8（活动课）丑小鸭</td>
                                </tr>
                                <tr>
                                    <td class="pad1">第二阶段</td>
                                </tr>
                                <tr>
                                    <td>Bread 5-1 无影塔</td>
                                </tr>
                                <tr>
                                    <td>Bread 5-2 神奇的木马</td>
                                </tr>
                                <tr>
                                    <td>Bread 5-3 红豆粥奶奶和老虎</td>
                                </tr>
                                <tr>
                                    <td>Bread 5-4 恐龙时代</td>
                                </tr>
                                <tr>
                                    <td>Bread 5-5 快乐的冬天</td>
                                </tr>
                                <tr>
                                    <td>Bread 5-6 挂袜子</td>
                                </tr>
                                <tr>
                                    <td>Bread 5-7 拜托圣诞节</td>
                                </tr>
                                <tr>
                                    <td>Bread 5-8（活动课）圣诞快乐</td>
                                </tr>
                                <tr>
                                    <td class="pad1">选修阶段</td>
                                </tr>
                                <tr>
                                    <td>Bread 6-1 战斗陀螺</td>
                                </tr>
                                <tr>
                                    <td>Bread 6-2 cycling自行车赛</td>
                                </tr>
                                <tr>
                                    <td>Bread 6-3 打扮我</td>
                                </tr>
                                <tr>
                                    <td>Bread 6-4 动听的旋律</td>
                                </tr>
                                <tr>
                                    <td>Bread 6-5 梵高的卧室</td>
                                </tr>
                                <tr>
                                    <td>Bread 6-6 照亮胡同的路灯</td>
                                </tr>
                                <tr>
                                    <td>Bread 6-7 嗖嗖的滑板车</td>
                                </tr>
                                <tr>
                                    <td>Bread 6-8（活动课）在雪上滑</td>
                                </tr>
                            </table>
                        </div>
                        <div v-show="showC" class="">
                            <table  cellpadding="0" cellspacing="1" >
                                <tr>
                                    <td class="pad2">上学期</td>
                                </tr>
                                <tr>
                                    <td class="pad1">第一阶段</td>
                                </tr>
                                <tr>
                                    <td>Candy 1-1 介绍新朋友</td>
                                </tr>
                                <tr>
                                    <td>Candy 1-2 方方正正的正方形先生</td>
                                </tr>
                                <tr>
                                    <td>Candy 1-3 皇帝的宝座</td>
                                </tr>
                                <tr>
                                    <td>Candy 1-4 大声说话</td>
                                </tr>
                                <tr>
                                    <td>Candy 1-5 在礼品盒里</td>
                                </tr>
                                <tr>
                                    <td>Candy 1-6 搬一下重东西</td>
                                </tr>
                                <tr>
                                    <td>Candy 1-7 飞的很远很远</td>
                                </tr>
                                <tr>
                                    <td>Candy 1-8 民族的瑰宝</td>
                                </tr>
                                <tr>
                                    <td class="pad1">第二阶段</td>
                                </tr>
                                <tr>
                                    <td>Candy 2-1 去市场</td>
                                </tr>
                                <tr>
                                    <td>Candy 2-2 叮铃铃，叮铃铃，来电话了</td>
                                </tr>
                                <tr>
                                    <td>Candy 2-3 美丽的星座</td>
                                </tr>
                                <tr>
                                    <td>Candy 2-4 周游宇宙</td>
                                </tr>
                                <tr>
                                    <td>Candy 2-5 勇敢的三角形</td>
                                </tr>
                                <tr>
                                    <td>Candy 2-6 找出海里的宝物</td>
                                </tr>
                                <tr>
                                    <td>Candy 2-7 左爬爬，右爬爬</td>
                                </tr>
                                <tr>
                                    <td>Candy 2-8（活动课）哥伦布发现了新大陆</td>
                                </tr>
                                <tr >
                                    <td class="pad1">选修阶段</td>
                                </tr>
                                <tr>
                                    <td>Candy 3-1 机械原理-齿轮</td>
                                </tr>
                                <tr>
                                    <td>Candy 3-2 机械原理-天平</td>
                                </tr>
                                <tr>
                                    <td>candy 3-3 机械原理-托盘秤</td>
                                </tr>
                                <tr>
                                    <td>Candy 3-4 机械原理-定滑轮</td>
                                </tr>
                                <tr>
                                    <td>Candy 3-5 滑板车</td>
                                </tr>
                                <tr>
                                    <td>Candy 3-6 心惊胆战的空中秋千</td>
                                </tr>
                                <tr>
                                    <td>Candy 3-7 高个子绅士</td>
                                </tr>
                                <tr>
                                    <td>Candy 3-8 Happy Together-调色板城</td>
                                </tr>
                                <tr >
                                    <td class="pad2">下学期</td>
                                </tr>
                                <tr >
                                    <td class="pad1">第一阶段</td>
                                </tr>
                                <tr>
                                    <td>Candy 4-1 喜欢草莓</td>
                                </tr>
                                <tr>
                                    <td>Candy 4-2 好玩的游乐场</td>
                                </tr>
                                <tr>
                                    <td>Candy 4-3 旋转木马</td>
                                </tr>
                                <tr>
                                    <td>Candy 4-4 无人机</td>
                                </tr>
                                <tr>
                                    <td>Candy 4-5 传新消息</td>
                                </tr>
                                <tr>
                                    <td>Candy 4-6 月球探测船</td>
                                </tr>
                                <tr>
                                    <td>Candy 4-7 来地球的外星人</td>
                                </tr>
                                <tr>
                                    <td>Candy 4-8（活动课）坐火箭去宇宙</td>
                                </tr>
                                <tr>
                                    <td class="pad1">第二阶段</td>
                                </tr>
                                <tr>
                                    <td>Candy 5-1 如果整个世界装满汽车</td>
                                </tr>
                                <tr>
                                    <td>Candy 5-2 圈圈旋转</td>
                                </tr>
                                <tr>
                                    <td>Candy 5-3 赛车小朋友</td>
                                </tr>
                                <tr>
                                    <td>Candy 5-4 咚咚咚</td>
                                </tr>
                                <tr>
                                    <td>Candy 5-5 一根胡萝卜</td>
                                </tr>
                                <tr>
                                    <td>Candy 5-6 消防能手大象</td>
                                </tr>
                                <tr>
                                    <td>Candy 5-7 海盗旗帜</td>
                                </tr>
                                <tr>
                                    <td>Candy 5-8（活动课）世界最初的汽油车</td>
                                </tr>
                                <tr>
                                    <td class="pad1">选修阶段</td>
                                </tr>
                                <tr>
                                    <td>Candy 6-1 如果在黑暗里看书</td>
                                </tr>
                                <tr>
                                    <td>Candy 6-2 聪明的电脑博士</td>
                                </tr>
                                <tr>
                                    <td>Candy 6-3 旋转椅子</td>
                                </tr>
                                <tr>
                                    <td>Candy 6-4 机器人的胳膊</td>
                                </tr>
                                <tr>
                                    <td>Candy 6-5 能看的更远</td>
                                </tr>
                                <tr>
                                    <td>Candy 6-6 灰姑娘的舞蹈会</td>
                                </tr>
                                <tr>
                                    <td>Candy 6-7 KTX</td>
                                </tr>
                                <tr>
                                    <td>Candy 6-8（活动课）请保护</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="typeTitle">
            <img src="./img/remai.png" alt="">
            <span>热卖产品</span>
        </div>
        <div class="product-wrap"  >
            &lt;!&ndash;<template v-for="(item,index) in productList">
                <div class="left">
                    <div  class="product-item" @click="goDetail()">
                        <div class="productImg small">
                            <img src="./img/product1.png" alt="">
                        </div>
                        <div class="productTitle">容亿学学前计算机基础知识培训</div>
                        <div class="productPrice">￥ 599.00</div>
                    </div>
                    <div  class="product-item" @click="goDetail()">
                        <div class="productImg">
                            <img src="./img/product2.png" alt="">
                        </div>
                        <div class="productTitle">容亿学学前计算机基础知识培训</div>
                        <div class="productPrice">￥ 599.00</div>
                    </div>
                </div>
                <div class="right">
                    <div class="product-item" @click="goDetail()">
                        <div class="productImg">
                            <img src="./img/product2.png" alt="">
                        </div>
                        <div class="productTitle">容亿学学前计算机基础知识培训</div>
                        <div class="productPrice">￥ 599.00</div>
                    </div>
                    <div class="product-item" @click="goDetail()">
                        <div class="productImg">
                            <img src="./img/product2.png" alt="">
                        </div>
                        <div class="productTitle">容亿学学前计算机基础知识培训</div>
                        <div class="productPrice">￥ 599.00</div>
                    </div>
                </div>
            </template>&ndash;&gt;
            <div class="product-item" @click="goDetail('/productDetail?id='+item.id+'&brandName='+item.goodsBrand.brandName+'&categoryName='+item.goodsCategory.categoryName)" v-for="(item,index) in productList" :key="index">
                <div class="productImg">
                    <img v-if="item.coverImg" :src="item.coverImg" alt="">
                    <img v-if="!item.coverImg" src="./img/icon_empty_1.png" alt="">
                </div>
                <div class="productTitle">{{item.goodsName}}</div>
                &lt;!&ndash;<div class="productPrice">￥ 599.00</div>&ndash;&gt;
                <div class="productTitle">{{item.goodsDescirbe}}</div>

            </div>
        </div>-->
	</div>
</template>

<script>
	import request from '../../../static/js/request';
	import result from '../../../static/js/result';

	export default {
		data() {
			return {
                productList:[],
                showA:true,
                showB:false,
                showC:false,
			}
		},
		mounted() {

		},
		created() {
            this.getList();
		},
		methods: {
            goDetail(url){
                this.$router.push(url);
            },
            async getList(){

                let params = {};
                let getListInfo = await request('/api/goods/spu/list',
                    'post',params,'application/x-www-form-urlencoded')
                // loading.hide()
                let res = result(getListInfo)
                console.log(res)
                // loading.hide()
                if(!res) return;
                console.log('返回结果',getListInfo)
                this.productList = getListInfo.data;

            },
            tabNav(){
                weui.tab('#tab',{
                    defaultIndex: 0,
                    onChange: function(index){
                        console.log(index);
                    }
                });
            },
            chaxun(e){
                console.log(e);
                if(e == 'showA'){
                    this.showA = true;
                    this.showB = false;
                    this.showC = false;
                }else if(e == 'showB'){
                    this.showB = true;
                    this.showA = false;
                    this.showC = false
                }else if(e == 'showC'){
                    this.showC = true;
                    this.showA = false;
                    this.showB = false;
                }
            }
		}
	}
</script>

<style lang="less" scoped>
	@import "~static/css/minxin.less";

	.main {
		width: 100%;

        box-sizing: border-box;
		position: relative;
        overflow-y: scroll;
        //padding: 0 30rem / @rootFontSize;
		top: 0;
		left: 0;
		input::-webkit-input-placeholder {
			color: #999;
		}
        .wrap{
            padding:40rem / @rootFontSize 30rem / @rootFontSize;
            .cha{
                display: flex;
                justify-content: space-between;
                height: 80rem / @rootFontSize;
                align-items: center;
                div{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    input{
                        margin-left: 10rem / @rootFontSize;
                    }
                }
            }
        }
        .typeTitle{
            margin-top: 20rem / @rootFontSize;
            margin-bottom: 20rem / @rootFontSize;
            img{
                width: 30rem / @rootFontSize;
                height: 40rem / @rootFontSize;
            }
            span{
                .font-dpr(14px);
                font-weight: bold;
                margin-left: 10rem / @rootFontSize;
            }
        }
        .product-wrap{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
           /* .one{
                height: 183px!important;
            }*/
            /*.left{
                width: 48%;
            }
            .right{
                width: 48%;
            }*/
            .product-item{
                box-shadow: 0 0 16rem/ @rootFontSize #bababa;
                border-radius: 8px;
                width: 48%;
                height: auto;
                padding-bottom: 5px;
                margin-bottom: 30rem / @rootFontSize;
                .small{
                    height: 290rem / @rootFontSize!important;
                }
                .productImg{
                    width: 100%;
                    height: 350rem / @rootFontSize;
                    margin-bottom: 5px;

                    img{
                        border-radius:8px 8px 0 0 ;
                        width: 100%;
                        height: 100%;
                    }
                }
                .productTitle{
                    margin-left: 10rem / @rootFontSize!important;
                    line-height: 14px;
                    margin-bottom: 5px;
                    display:-webkit-box;
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2;
                    overflow:hidden;
                }
                .productPrice{
                    color: #ff842c;
                }
            }
        }
        table{
            .font-dpr(14px);
            //text-align: center;
            width: 100%;
            height: auto;
            color: #998;
            tr{
                border: 1px solid #999;
                td{
                    padding-left: 90rem / @rootFontSize;
                    box-sizing: border-box;
                    height: 40rem / @rootFontSize;
                    line-height: 40rem / @rootFontSize;
                }
                .pad1{
                    padding-left: 60rem / @rootFontSize!important;
                }
                .pad2{
                    padding-left:30rem / @rootFontSize!important;
                }
            }

        }
	}
</style>