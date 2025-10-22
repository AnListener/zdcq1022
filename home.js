// 首页的JavaScript代码
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面功能
    console.log('Initializing home page with ECharts');
    
    // 检查ECharts是否已加载
    if (typeof echarts === 'undefined') {
        console.warn('ECharts not loaded');
        // 尝试重新加载ECharts
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js';
        script.onload = function() {
            console.log('ECharts reloaded successfully');
            initCharts();
        };
        document.head.appendChild(script);
        return;
    }
    
    initCharts();
});

function initCharts() {
    // 初始化项目进度统计图表
    initProjectProgressChart();
    
    // 初始化费用分布图表
    initCostDistributionChart();
    
    console.log('Home page initialized with ECharts functionality');
    
    // 添加一个小延迟后触发一次重绘，确保图表正确显示
    setTimeout(function() {
        window.dispatchEvent(new Event('resize'));
    }, 100);
}

// 初始化项目进度统计图表
function initProjectProgressChart() {
    // 获取项目进度图表的容器
    const projectProgressChartContainer = document.getElementById('projectProgressChart');
    if (!projectProgressChartContainer) {
        console.warn('Project progress chart container not found');
        return;
    }
    
    // 创建ECharts实例
    const projectProgressChart = echarts.init(projectProgressChartContainer);
    
    // 设置项目进度图表的配置
    const projectProgressOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        // 增加图表内边距，优化显示效果
        grid: {
            left: '5%',
            right: '5%',
            bottom: '15%', // 增加底部边距，为x轴标签留出更多空间
            top: '10%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['GZ-2023-001', 'GZ-2023-002', 'GZ-2023-003', 'GZ-2023-004', 'GZ-2023-005', 'GZ-2023-006'],
            axisLabel: {
                interval: 0,
                rotate: 45, // 增加旋转角度，使标签更易读
                color: '#666',
                fontSize: 11 // 调整字体大小
            }
        },
        yAxis: {
            type: 'value',
            name: '完成率(%)',
            min: 0,
            max: 100,
            axisLabel: {
                formatter: '{value}%',
                color: '#666'
            }
        },
        series: [
            {
                name: '完成率',
                type: 'bar',
                // 调整柱子宽度，避免过于拥挤
                barWidth: '60%',
                data: [85, 72, 90, 68, 78, 95],
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {offset: 0, color: '#3b82f6'},
                        {offset: 1, color: '#2563eb'}
                    ])
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {offset: 0, color: '#60a5fa'},
                            {offset: 1, color: '#3b82f6'}
                        ])
                    }
                },
                label: {
                    show: true,
                    position: 'top',
                    formatter: '{c}%',
                    color: '#666',
                    fontSize: 10 // 调整标签字体大小
                }
            }
        ]
    };
    
    // 设置图表配置
    projectProgressChart.setOption(projectProgressOption);
    
    // 添加响应式处理
    window.addEventListener('resize', function() {
        projectProgressChart.resize();
    });
}

// 初始化费用分布图表
function initCostDistributionChart() {
    // 获取费用分布图表的容器
    const costDistributionChartContainer = document.getElementById('costDistributionChart');
    if (!costDistributionChartContainer) {
        console.warn('Cost distribution chart container not found');
        return;
    }
    
    // 创建ECharts实例
    const costDistributionChart = echarts.init(costDistributionChartContainer);
    
    // 设置费用分布图表的配置
    const costDistributionOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        // 将图例改为水平方向并放在底部，节省空间
        legend: {
            orient: 'horizontal',
            bottom: 10,
            left: 'center',
            data: ['房屋补偿', '土地补偿', '青苗补偿', '附着物补偿', '其他费用'],
            textStyle: {
                fontSize: 11 // 调整图例字体大小
            }
        },
        series: [
            {
                name: '费用分布',
                type: 'pie',
                // 调整饼图大小，使其占据更多空间
                radius: ['30%', '70%'],
                center: ['50%', '45%'], // 调整饼图位置
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    {value: 1250, name: '房屋补偿', itemStyle: {color: '#3b82f6'}},
                    {value: 870, name: '土地补偿', itemStyle: {color: '#10b981'}},
                    {value: 320, name: '青苗补偿', itemStyle: {color: '#f59e0b'}},
                    {value: 280, name: '附着物补偿', itemStyle: {color: '#8b5cf6'}},
                    {value: 150, name: '其他费用', itemStyle: {color: '#ef4444'}}
                ]
            }
        ]
    };
    
    // 设置图表配置
    costDistributionChart.setOption(costDistributionOption);
    
    // 添加响应式处理
    window.addEventListener('resize', function() {
        costDistributionChart.resize();
    });
}