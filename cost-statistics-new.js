// 确保在DOM加载完成后执行
 document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing cost statistics page');
    
    // 全局图表对象
    window.costCharts = window.costCharts || {};
    
    /**
     * 等待ChartUtils加载完成
     */
    function waitForChartUtils() {
        return new Promise((resolve, reject) => {
            const checkInterval = setInterval(() => {
                if (window.ChartUtils) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
            
            // 设置超时时间
            setTimeout(() => {
                clearInterval(checkInterval);
                reject(new Error('ChartUtils加载超时'));
            }, 5000);
        });
    }
    
    // 初始化费用构成统计图表
    function initCostCompositionChart() {
        try {
            const chartId = 'costCompositionChart';
            
            if (window.ChartUtils) {
                window.ChartUtils.updateChartStatusIndicator(chartId + '-status', 'loading', '正在加载费用构成统计图表...');
            }
            
            // 设置图表环境
            const setupResult = window.ChartUtils.setupChartEnvironment(chartId, window.costCharts, 'compositionChart');
            if (!setupResult) {
                if (window.ChartUtils) {
                    window.ChartUtils.updateChartStatusIndicator(chartId + '-status', 'error', '图表环境设置失败');
                }
                return;
            }
            
            const { ctx } = setupResult;
            
            // 创建图表
            window.costCharts.compositionChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['房屋补偿', '土地补偿', '附着物补偿', '搬迁奖励', '其他费用'],
                    datasets: [{
                        data: [45, 30, 15, 7, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                            'rgba(75, 192, 192, 0.8)',
                            'rgba(153, 102, 255, 0.8)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
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
            
            if (window.ChartUtils) {
                window.ChartUtils.updateChartStatusIndicator(chartId + '-status', 'success', '费用构成统计图表初始化成功', 2000);
            }
            console.log('费用构成统计图表初始化成功');
        } catch (error) {
            console.error('初始化费用构成统计图表时出错:', error);
            if (window.ChartUtils) {
                window.ChartUtils.updateChartStatusIndicator('costCompositionChart-status', 'error', '图表加载失败，请点击刷新按钮重试');
            }
        }
    }
    
    // 初始化费用趋势图表
    function initCostTrendChart() {
        try {
            const chartId = 'costTrendChart';
            
            if (window.ChartUtils) {
                window.ChartUtils.updateChartStatusIndicator(chartId + '-status', 'loading', '正在加载费用趋势图表...');
            }
            
            // 设置图表环境
            const setupResult = window.ChartUtils.setupChartEnvironment(chartId, window.costCharts, 'trendChart');
            if (!setupResult) {
                if (window.ChartUtils) {
                    window.ChartUtils.updateChartStatusIndicator(chartId + '-status', 'error', '图表环境设置失败');
                }
                return;
            }
            
            const { ctx } = setupResult;
            
            // 创建图表
            window.costCharts.trendChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
                    datasets: [{
                        label: '总费用(万元)',
                        data: [1200, 1900, 3000, 2500, 2700, 3500, 4000, 4500, 5000],
                        backgroundColor: 'rgba(54, 162, 235, 0.8)',
                        borderColor: 'rgba(54, 162, 235, 1)',
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
                                text: '费用(万元)'
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
                                    return context.dataset.label + ': ' + context.raw + '万元';
                                }
                            }
                        }
                    }
                }
            });
            
            if (window.ChartUtils) {
                window.ChartUtils.updateChartStatusIndicator(chartId + '-status', 'success', '费用趋势图表初始化成功', 2000);
            }
            console.log('费用趋势图表初始化成功');
        } catch (error) {
            console.error('初始化费用趋势图表时出错:', error);
            if (window.ChartUtils) {
                window.ChartUtils.updateChartStatusIndicator('costTrendChart-status', 'error', '图表加载失败，请点击刷新按钮重试');
            }
        }
    }
    
    // 创建所有图表的刷新按钮
    function createRefreshButtons() {
        if (window.ChartUtils) {
            window.ChartUtils.createRefreshButton('costCompositionChart', initCostCompositionChart);
            window.ChartUtils.createRefreshButton('costTrendChart', initCostTrendChart);
        }
    }
    
    // 销毁所有图表实例
    function destroyAllCharts() {
        if (window.ChartUtils) {
            window.ChartUtils.destroyChart(window.costCharts.compositionChart);
            window.ChartUtils.destroyChart(window.costCharts.trendChart);
        }
        window.costCharts = {};
    }
    
    // 初始化所有图表
    function initAllCharts() {
        console.log('Starting to initialize all charts');
        
        // 检查Chart.js是否加载成功
        if (window.ChartUtils && !window.ChartUtils.checkChartJs()) {
            console.error('Chart.js is not available, cannot initialize charts');
            return;
        }
        
        // 创建状态指示器 - 修复ID
        if (window.ChartUtils) {
            window.ChartUtils.createChartStatusIndicator('costCompositionChart');
            window.ChartUtils.createChartStatusIndicator('costTrendChart');
        }
        
        // 初始化图表
        initCostCompositionChart();
        initCostTrendChart();
        
        // 创建刷新按钮
        createRefreshButtons();
        
        console.log('Chart initialization process completed');
    }
    
    // 处理窗口大小变化
    function handleResponsive() {
        if (window.ChartUtils) {
            // 使用防抖函数来避免频繁重绘图表
            const debouncedResize = window.ChartUtils.debounce(function() {
                console.log('Window resized, updating charts');
                
                // 销毁所有图表
                destroyAllCharts();
                
                // 重新初始化所有图表
                initAllCharts();
            }, 300);
            
            // 添加窗口大小变化监听器
            window.addEventListener('resize', debouncedResize);
            
            // 在页面卸载前移除监听器
            window.addEventListener('beforeunload', function() {
                window.removeEventListener('resize', debouncedResize);
                destroyAllCharts();
            });
        }
    }
    
    // 页面初始化主函数
    function initPage() {
        try {
            // 等待ChartUtils加载完成
            waitForChartUtils().then(() => {
                console.log('ChartUtils加载完成，开始初始化图表');
                initAllCharts();
                handleResponsive();
            }).catch(error => {
                console.error('ChartUtils加载失败:', error);
                // 即使ChartUtils加载失败，也尝试初始化图表
                initAllCharts();
                handleResponsive();
            });
            
            console.log('费用统计页面初始化流程已启动');
        } catch (error) {
            console.error('初始化页面时出错:', error);
            if (window.ChartUtils) {
                window.ChartUtils.updateChartStatusIndicator('costCompositionChart-status', 'error', '页面初始化失败');
                window.ChartUtils.updateChartStatusIndicator('costTrendChart-status', 'error', '页面初始化失败');
            }
        }
    }
    
    // 开始初始化页面
    initPage();
});