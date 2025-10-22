// 确保在DOM加载完成后执行
 document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing demolition statistics page');
    
    // 全局图表对象
    let demolitionTypeChart = null;
    let demolitionTrendChart = null;
    
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
    
    // 初始化征拆物类型分布图表
    function initDemolitionTypeChart() {
        try {
            const chartId = 'demolitionTypeChart';
            window.ChartUtils.updateChartStatusIndicator(chartId, 'loading', '正在加载征拆物类型分布图表...');
            
            // 使用ChartUtils设置图表环境
            const ctx = window.ChartUtils.setupChartEnvironment(chartId);
            
            // 创建图表
            demolitionTypeChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['土地', '房屋', '附着物', '其他'],
                    datasets: [{
                        data: [58, 25, 15, 2],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    const total = context.dataset.data.reduce(function(a, b) { return a + b; }, 0);
                                    const percentage = Math.round((value / total) * 100);
                                    return label + ': ' + value + '%';
                                }
                            }
                        }
                    }
                }
            });
            
            window.ChartUtils.updateChartStatusIndicator(chartId, 'success');
        } catch (error) {
            console.error('初始化征拆物类型分布图表时出错:', error);
            window.ChartUtils.updateChartStatusIndicator('demolitionTypeChart', 'error', '图表加载失败，请点击刷新按钮重试');
        }
    }
    
    // 初始化征拆物月度变化趋势图表
    function initDemolitionTrendChart() {
        try {
            const chartId = 'demolitionTrendChart';
            window.ChartUtils.updateChartStatusIndicator(chartId, 'loading', '正在加载征拆物月度变化趋势图表...');
            
            // 使用ChartUtils设置图表环境
            const ctx = window.ChartUtils.setupChartEnvironment(chartId);
            
            // 创建图表
            demolitionTrendChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
                    datasets: [{
                        label: '土地(亩)',
                        data: [1200, 1500, 1800, 1600, 2000, 2200, 2500, 2800, 3000],
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.1)',
                        borderWidth: 2,
                        tension: 0.1,
                        fill: true
                    }, {
                        label: '房屋(㎡)',
                        data: [8000, 9000, 10000, 9500, 11000, 12000, 13000, 14000, 15000],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.1)',
                        borderWidth: 2,
                        tension: 0.1,
                        fill: true
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
                                text: '数量'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: '月份'
                            }
                        }
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': ' + context.raw;
                                }
                            }
                        }
                    }
                }
            });
            
            window.ChartUtils.updateChartStatusIndicator(chartId, 'success');
        } catch (error) {
            console.error('初始化征拆物月度变化趋势图表时出错:', error);
            window.ChartUtils.updateChartStatusIndicator('demolitionTrendChart', 'error', '图表加载失败，请点击刷新按钮重试');
        }
    }
    
    // 处理窗口大小变化事件
    function handleResponsive() {
        let resizeTimeout;
        const resizeHandler = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (demolitionTypeChart) demolitionTypeChart.resize();
                if (demolitionTrendChart) demolitionTrendChart.resize();
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
            chartUtils.createChartStatusIndicator('demolitionTypeChart');
            chartUtils.createChartStatusIndicator('demolitionTrendChart');
            
            // 初始化图表
            initDemolitionTypeChart();
            initDemolitionTrendChart();
            
            // 创建刷新按钮
            chartUtils.createRefreshButton('demolitionTypeChart', function() {
                initDemolitionTypeChart();
            });
            
            chartUtils.createRefreshButton('demolitionTrendChart', function() {
                initDemolitionTrendChart();
            });
            
            console.log('Chart initialization process completed');
            return true;
        } catch (error) {
            console.error('初始化图表时出错:', error);
            
            // 显示错误状态
            if (window.ChartUtils) {
                window.ChartUtils.updateChartStatusIndicator('demolitionTypeChart', 'error', '图表初始化失败，请刷新页面重试');
                window.ChartUtils.updateChartStatusIndicator('demolitionTrendChart', 'error', '图表初始化失败，请刷新页面重试');
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
            if (demolitionTypeChart) demolitionTypeChart.destroy();
            if (demolitionTrendChart) demolitionTrendChart.destroy();
        });
    }
    
    // 开始初始化页面
    initPage();
});