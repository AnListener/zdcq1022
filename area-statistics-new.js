// 初始化页面功能
console.log('Initializing area statistics page');

// 全局图表对象
let areaLandChart = null;
let areaCompensationChart = null;

// 等待ChartUtils加载完成
function waitForChartUtils() {
    return new Promise((resolve) => {
        if (window.ChartUtils) {
            resolve(window.ChartUtils);
            return;
        }
        
        const interval = setInterval(() => {
            if (window.ChartUtils) {
                clearInterval(interval);
                resolve(window.ChartUtils);
            }
        }, 100);
    });
}

// 初始化地区征地面积统计图表
function initAreaLandChart() {
    try {
        const chartId = 'areaLandChart';
        window.ChartUtils.updateChartStatusIndicator(chartId, 'loading', '正在加载各地区征地面积分布图表...');
        
        // 使用ChartUtils设置图表环境
        const ctx = window.ChartUtils.setupChartEnvironment(chartId);
        
        // 创建图表
        areaLandChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['广州市', '深圳市', '珠海市', '佛山市', '东莞市', '其他地区'],
                datasets: [{
                    label: '征地面积（亩）',
                    data: [5260, 2860, 1850, 1770, 820, 1000],
                    backgroundColor: 'rgba(138, 43, 226, 0.8)',
                    borderColor: 'rgba(138, 43, 226, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '征地面积（亩）'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '地区'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '征地面积: ' + context.raw + '亩';
                            }
                        }
                    }
                }
            }
        });
        
        window.ChartUtils.updateChartStatusIndicator(chartId, 'success');
    } catch (error) {
        console.error('初始化地区征地面积统计图表时出错:', error);
        window.ChartUtils.updateChartStatusIndicator('areaLandChart', 'error', '图表加载失败，请点击刷新按钮重试');
    }
}

// 初始化地区补偿金额统计图表
function initAreaCompensationChart() {
    try {
        const chartId = 'areaCompensationChart';
        window.ChartUtils.updateChartStatusIndicator(chartId, 'loading', '正在加载各地区补偿金额分布图表...');
        
        // 使用ChartUtils设置图表环境
        const ctx = window.ChartUtils.setupChartEnvironment(chartId);
        
        // 创建图表
        areaCompensationChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['广州市', '深圳市', '珠海市', '佛山市', '东莞市', '其他地区'],
                datasets: [{
                    label: '补偿金额（万元）',
                    data: [22500, 15200, 8000, 6600, 5200, 3500],
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '补偿金额（万元）'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '地区'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '补偿金额: ' + context.raw + '万元';
                            }
                        }
                    }
                }
            }
        });
        
        window.ChartUtils.updateChartStatusIndicator(chartId, 'success');
    } catch (error) {
        console.error('初始化地区补偿金额统计图表时出错:', error);
        window.ChartUtils.updateChartStatusIndicator('areaCompensationChart', 'error', '图表加载失败，请点击刷新按钮重试');
    }
}

// 处理窗口大小变化事件
function handleResponsive() {
    let resizeTimeout;
    const resizeHandler = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (areaLandChart) areaLandChart.resize();
            if (areaCompensationChart) areaCompensationChart.resize();
        }, 300); // 添加300ms防抖
    };

    window.addEventListener('resize', resizeHandler);

    // 返回清理函数
    return () => {
        window.removeEventListener('resize', resizeHandler);
        clearTimeout(resizeTimeout);
    };
}

// 初始化所有图表
async function initAllCharts() {
    console.log('Starting to initialize all charts');
    
    try {
        // 等待ChartUtils加载完成
        const chartUtils = await waitForChartUtils();
        
        // 创建状态指示器
        chartUtils.createChartStatusIndicator('areaLandChart');
        chartUtils.createChartStatusIndicator('areaCompensationChart');
        
        // 初始化图表
        initAreaLandChart();
        initAreaCompensationChart();
        
        // 创建刷新按钮
        chartUtils.createRefreshButton('areaLandChart', function() {
            initAreaLandChart();
        });
        
        chartUtils.createRefreshButton('areaCompensationChart', function() {
            initAreaCompensationChart();
        });
        
        console.log('Chart initialization process completed');
        return true;
    } catch (error) {
        console.error('初始化图表时出错:', error);
        
        // 显示错误状态
        if (window.ChartUtils) {
            window.ChartUtils.updateChartStatusIndicator('areaLandChart', 'error', '图表初始化失败，请刷新页面重试');
            window.ChartUtils.updateChartStatusIndicator('areaCompensationChart', 'error', '图表初始化失败，请刷新页面重试');
        }
        return false;
    }
}

// 初始化页面
function initPage() {
    // 初始化图表
    initAllCharts();
    
    // 设置响应式处理
    const cleanupResponsive = handleResponsive();
    
    // 页面卸载前清理资源
    window.addEventListener('beforeunload', function() {
        cleanupResponsive();
        
        // 清理图表实例
        if (areaLandChart) areaLandChart.destroy();
        if (areaCompensationChart) areaCompensationChart.destroy();
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initPage();
});