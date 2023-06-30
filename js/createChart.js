// JavaScript Document
function bar(chart, root) {

	var color = d3.scale.category20();

	svg = d3.select(chart).append("svg")
		.attr("height", '120px')
		.attr("width", '100%')
		.attr("style", "padding-bottom:10px");

	g = svg.selectAll("a")
		.data(root).enter()
		.append("g")
		.attr("class", function (d) { return d.size; });

	g.append("rect")
		.attr("class", "bar")
		.attr("x", function (d, i) { return 12 + i * 90; })
		.attr("y", function (d) { return 85 - d.size })
		.attr("height", function (d) { return d.size; })
		.attr("width", 70)
		.attr("fill", function (d) { return color(d.name); });

	g.append("text")
		.attr("x", function (d, i) { return 27 + i * 90; })
		.attr("y", function (d) { return 85 - d.size - 5; })
		.text(function (d) { return d.size + "%"; });

	g.append("text")
		.attr("x", function (d, i) { return 30 + i * 90 - (d.name.length - 2) * 5; })
		.attr("y", 100)
		.attr("style", "text-align:center")
		.text(function (d) { return d.name; });

	g.append("title")
		.attr("style", "text-align:center")
		.text(function (d) { return d.name + ":" + d.size + "%"; });

}

function bubble(chart, root, height) {
	svg = d3.select(chart).append("svg")
		.attr("height", height)
		.attr("width", '100%');

	var bubble = d3.layout.pack()
		.sort(null)
		.size([640, height])
		.padding(2);
	var color = d3.scale.category20c();


	var node = svg.selectAll(".node")
		.data(bubble.nodes(classes(root))
			.filter(function (d) { return !d.children; }))
		.enter().append("g")
		.attr("class", "node")
		.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

	node.append("title")
		.text(function (d) { return d.className + ": " + d.value + "%"; });

	node.append("circle")
		.attr("r", function (d) { return d.r; })
		.style("fill", function (d) { return color(d.className); });

	node.append("text")
		.attr("dy", ".3em")
		.style("text-anchor", "middle")
		.text(function (d) { return d.className.substring(0, d.r / 3); });



	function classes(root) {
		var classes = [];

		function recurse(name, node) {
			if (node.children) node.children.forEach(function (child) { recurse(node.name, child); });
			else classes.push({ packageName: name, className: node.name, value: node.size });
		}

		recurse(null, root);
		return { children: classes };
	}
}

function treemap(chart, root, height) {

	var width = 420;

	var color = d3.scale.category20c();

	var treemap = d3.layout.treemap()
		.size([width, height])
		.sticky(true)
		.value(function (d) { return d.size; });

	var svg = d3.select(chart).append("svg")
		.attr("width", width)
		.attr("height", height);

	var node = svg.selectAll(".node")
		.data(treemap.nodes(root).filter(function (d) { return !d.children; }))
		.enter().append("g")
		.attr("class", "node")

	node.append("rect")
		.attr("x", function (d) { return d.x + "px"; })
		.attr("y", function (d) { return d.y + "px"; })
		.attr("width", function (d) { return d.dx - 2 + "px"; })
		.attr("height", function (d) { return d.dy - 2 + "px"; })
		.style("fill", function (d) { return color(d.name); });

	node.append("text")
		.text(function (d) { return d.children ? null : d.name; })
		.attr("x", function (d) { return d.x + 5 + "px"; })
		.attr("y", function (d) { return d.y + 15 + "px"; });

	node.append("title")
		.text(function (d) { return d.name + ": " + d.size + "%"; });

}


function pie(chart, root, width, height) {

	var radius = Math.min(width, height) / 2;

	var color = d3.scale.category20();

	var pie = d3.layout.pie()
		.value(function (d) { return d.value; })
		.sort(null);

	var arc = d3.svg.arc()
		.innerRadius(radius - 100)
		.outerRadius(radius - 20);

	var svg = d3.select(chart).append("svg")
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var g = svg.selectAll(".arc")
		.data(pie(root))
		.enter().append("g")
		.attr("class", "arc");

	g.append("path")
		.attr("d", arc)
		.style("fill", function (d) { return color(d.data.name); });

	g.append("text")
		.attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
		.attr("dy", ".35em")
		.style("text-anchor", "middle")
		.text(function (d) { return d.data.name; });
	g.append("title")
		.text(function (d) { return d.value + "%"; })


}

function bar2(chart, root) {

	color = d3.scale.category20();

	svg = d3.select(chart).append("svg")
		.attr("width", 420)
		.attr("height", 40);

	g = svg.selectAll(".g")
		.data(root).enter()
		.append("g");

	g.append("rect")
		.attr("x", function (d) { return 4.2 * d.x; })
		.attr("width", function (d) { return 4.2 * d.size - 3; })
		.attr("height", 30)
		.attr("fill", function (d) { return color(d.name); });

	g.append("title")
		.text(function (d) { return d.name + ":" + d.size + "%"; });

}

function bullet(chart, root) {
	var g = d3.select(chart).selectAll(".svg")
		.data(root)
		.enter().append("svg")
		.attr("width", 420)
		.attr("height", 40)
		.append("g");

	g.append("rect")
		.attr("x", 0)
		.attr("y", 5)
		.attr("width", 140)
		.attr("height", 30)
		.attr("fill", "#ccc");

	g.append("rect")
		.attr("x", 140)
		.attr("y", 5)
		.attr("width", 140)
		.attr("height", 30)
		.attr("fill", "#ddd");

	g.append("rect")
		.attr("x", 280)
		.attr("y", 5)
		.attr("width", 140)
		.attr("height", 30)
		.attr("fill", "#eee");
	//上面三个是背景，下面是要动起来的：		
	g.append("rect")
		.attr("x", 0)
		.attr("y", 15)
		.attr("width", function (d) { return 140 * d.size; })
		.attr("height", 10)
		.attr("fill", "steelblue");

	g.append("line")
		.attr("x1", function (d) { return 140 * d.size - 3; })
		.attr("y1", 10)
		.attr("x2", function (d) { return 140 * d.size - 3; })
		.attr("y2", 30)
		.attr("stroke-width", 2)
		.attr("stroke", "black");

	g.append("title")
		.text(function (d) { return d.name + ":" + d.size; });




}




//draw
var data1 = [{ "name": "学术", "size": 56.3 },
{ "name": "市场营销", "size": 49.6 },
{ "name": "网络", "size": 44.4 },
{ "name": "金融", "size": 25.2 },
{ "name": "零售业", "size": 20.7 },
{ "name": "电信业", "size": 18.5 },
{ "name": "科技", "size": 17.8 }];

bar("#chart1", data1);

var data2 = [{ "name": "保险", "size": 8.9 },
{ "name": "政府", "size": 7.4 },
{ "name": "娱乐业", "size": 4.4 },
{ "name": "制造业", "size": 4.4 },
{ "name": "非营利", "size": 4.4 },
{ "name": "军事安全事业", "size": 3.7 },
{ "name": "制药", "size": 3.7 }];

bar("#chart2", data2);

var data3 = {
	"children":
		[{ "name": "聚类分析", "size": 80.3 },
		{ "name": "回归分析", "size": 73.7 },
		{ "name": "决策树", "size": 61.3 },
		{ "name": "时间序列", "size": 60.6 },
		{ "name": "关联规则", "size": 58.4 },
		{ "name": "因子分析", "size": 56.2 },
		{ "name": "文本挖掘", "size": 56.2 },
		{ "name": "社交网络分析", "size": 51.1 },
		{ "name": "贝叶斯", "size": 50.4 },
		{ "name": "异常监测", "size": 42.3 },
		{ "name": "神经网络法", "size": 42.3 },
		{ "name": "支持向量机", "size": 37.2 },
		{ "name": "规则归纳法", "size": 35.0 },
		{ "name": "链接分析", "size": 28.5 },
		{ "name": "遗传进化算法", "size": 25.5 },
		{ "name": "专有算法", "size": 20.4 },
		{ "name": "生存分析", "size": 19.0 },
		{ "name": "集成模型", "size": 16.1 },
		{ "name": "随机森林法", "size": 15.3 },
		{ "name": "多元自适应回归样条法", "size": 15.3 },
		{ "name": "增量模型法", "size": 13.9 }]
}

bubble("#chart3", data3, 600);

var data4 = {
	"children":
		[{ "name": "数字", "size": 78.8 },
		{ "name": "文本", "size": 61.3 },
		{ "name": "互联网数据", "size": 48.2 },
		{ "name": "分类", "size": 45.3 },
		{ "name": "社交网络", "size": 38.0 },
		{ "name": "时序", "size": 36.5 },
		{ "name": "调查数据", "size": 26.3 },
		{ "name": "纵向数据", "size": 15.3 },
		{ "name": "点击流", "size": 14.6 },
		{ "name": "图像", "size": 13.1 },
		{ "name": "空间数据", "size": 10.2 },
		{ "name": "声音", "size": 2.2 }]
}

bubble("#chart4", data4, 500);

var data5 = {
	"children":
		[{ "name": "几秒，几分钟", "size": 9.5 },
		{ "name": "几小时", "size": 31.4 },
		{ "name": "几天", "size": 43.1 },
		{ "name": "几个星期", "size": 8.8 },
		{ "name": "几个月", "size": 5.8 },
		{ "name": "一年或更久", "size": 1.5 }]
}

treemap("#chart5", data5, 300);

var data6 = {
	"children":
		[{ "name": "没有被实际应用", "size": 13.9 },
		{ "name": "几秒，几分钟", "size": 5.1 },
		{ "name": "几小时", "size": 11.7 },
		{ "name": "几天", "size": 25.5 },
		{ "name": "几个星期", "size": 24.8 },
		{ "name": "几个月", "size": 13.9 },
		{ "name": "一年或更久", "size": 5.1 }]
}

treemap("#chart6", data6, 300);

var data7 = [{ "name": "我们一般将文本挖掘合并进我们的分析", "value": 48.9 },
{ "name": "我们计划开始使用文本分析", "value": 25.5 },
{ "name": "我们没有任何使用文本分析的计划", "value": 25.5 }];

pie("#chart7", data7, 640, 400);

var data8 = {
	"children":
		[{ "name": "博客和其他社交网络", "size": 25.5 },
		{ "name": "网上论坛或评论网站", "size": 17.5 },
		{ "name": "顾客／市场调查", "size": 14.6 },
		{ "name": "新闻", "size": 8.0 },
		{ "name": "科学技术文献", "size": 7.3 },
		{ "name": "即时聊天纪录", "size": 5.1 },
		{ "name": "员工调查", "size": 3.6 },
		{ "name": "SMS信息", "size": 2.9 },
		{ "name": "医疗纪录", "size": 2.9 },
		{ "name": "呼叫中心纪录", "size": 2.9 },
		{ "name": "网站反馈", "size": 2.2 },
		{ "name": "电子邮件或其他邮件往来", "size": 1.5 },
		{ "name": "专利条款", "size": 0.7 },
		{ "name": "犯罪、法律、司法报告；证据资料", "size": 0.7 }]
}

bubble("#chart8", data8, 600);

var data9 = [{ "name": "本地电脑", "size": 36.5 },
{ "name": "本地服务器", "size": 33.6 },
{ "name": "笔记本电脑", "size": 31.4 },
{ "name": "电脑+服务器或云", "size": 26.3 },
{ "name": "中心服务器", "size": 24.1 },
{ "name": "云计算", "size": 19.0 },
{ "name": "笔记本+服务器或云", "size": 16.8 }];

bar("#chart9", data9);

var data10 = [{ "name": "从不", "size": 5.8, "x": 0 },
{ "name": "很少", "size": 19.0, "x": 5.8 },
{ "name": "有时", "size": 21.2, "x": 24.8 },
{ "name": "经常", "size": 38.7, "x": 46.0 },
{ "name": "总是", "size": 15.3, "x": 84.7 }];

var data11 = [{ "name": "从不", "size": 6.6, "x": 0.0 },
{ "name": "很少", "size": 15.3, "x": 6.6 },
{ "name": "有时", "size": 27.7, "x": 21.9 },
{ "name": "经常", "size": 38.0, "x": 49.6 },
{ "name": "总是", "size": 12.4, "x": 87.6 }];

var data12 = [{ "name": "从不", "size": 14.6, "x": 0.0 },
{ "name": "很少", "size": 18.2, "x": 14.6 },
{ "name": "有时", "size": 19.7, "x": 32.8 },
{ "name": "经常", "size": 34.3, "x": 52.6 },
{ "name": "总是", "size": 13.1, "x": 86.9 }];

bar2("#chart10", data10);
bar2("#chart11", data11);
bar2("#chart12", data12);

var data13 = [{ "name": "处理数据能力", "size": 2.31 },
{ "name": "支持多种数据库", "size": 2.28 },
{ "name": "处理海量数据", "size": 2.28 },
{ "name": "模型的质量和准确度", "size": 2.26 },
{ "name": "稳定性和可靠性", "size": 2.12 },
{ "name": "速度", "size": 2.08 },
{ "name": "自动执行重复工作", "size": 2.02 },
{ "name": "能否批处理", "size": '2.00' },
{ "name": "能调整算法选项", "size": 1.96 },
{ "name": "简明的输出", "size": 1.95 },
{ "name": "操作简易性", "size": '1.90' },
{ "name": "有我需要的分析技术", "size": 1.89 },
{ "name": "提供多种算法", "size": 1.83 },
{ "name": "完备的说明文档", "size": 1.82 },
{ "name": "边写代码的难易", "size": '1.70' },
{ "name": "协同工作的能力", "size": 1.69 },
{ "name": "上手的难易", "size": 1.65 },
{ "name": "用户界面", "size": 1.55 },
{ "name": "支持代码的能力", "size": 1.53 },
{ "name": "价格", "size": 1.42 },
{ "name": "安装和维护的难易", "size": 1.31 }];

bullet("#chart13", data13)