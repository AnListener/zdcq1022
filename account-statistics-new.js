// 确保在DOM加载完成后执行
(function() {
    console.log('账户统计模块使用新架构初始化');
    
    // 全局图表对象容器
    window.accountCharts = {
        typeChart: null,
        growthChart: null
    };
    
    // 等待ChartUtils加载完成
    async function waitForChartUtils() {
        const maxRetries = 5;
        const retryInterval = 500;
        let retries = 0;
        
        return new Promise((resolve, reject) => {
            const checkChartUtils = () => {
                if (window.ChartUtils) {
                    resolve(window.ChartUtils);
                } else if (retries >= maxRetries) {
                    reject(new Error('ChartUtils failed to load after multiple attempts'));
                } else {
                    retries++;
                    setTimeout(checkChartUtils, retryInterval);
                }
            };
            
            checkChartUtils();
        });
    }
    
    // 移除自定义debounce函数，直接使用ChartUtils.debounce

    // 初始化账户类型统计图表
    function initAccountTypeChart(chartUtils) {
        try {
            const chartId = 'accountTypeChart';
            
            // 使用ChartUtils设置图表环境
            const chartInfo = chartUtils.setupChartEnvironment(chartId, window.accountCharts, 'typeChart');
            
            if (!chartInfo) {
                console.error('Failed to setup chart environment for account type chart');
                return;
            }
            
            const { ctx } = chartInfo;
            
            // 销毁现有图表
            if (window.accountCharts.typeChart) {
                window.accountCharts.typeChart.destroy();
                window.accountCharts.typeChart = null;
                console.log('Existing account type chart destroyed');
            }
            
            // 提取数据
            const labels = ['土地账户', '房屋账户', '安置账户', '补偿账户', '其他账户'];
            const data = [12, 19, 3, 5, 2];
            
            // 设置背景颜色
            const backgroundColor = [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)'
            ];
            
            const borderColor = [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ];
            
            // 创建图表
            window.accountCharts.typeChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '账户数量',
                        data: data,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
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
                                text: '账户数量'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: '账户类型'
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    let label = context.dataset.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += context.parsed.y + ' 个';
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });
            
            console.log('Account type chart initialized successfully');
            chartUtils.updateChartStatusIndicator('chartStatus', 'success', '账户类型统计图表初始化成功', 2000);
        } catch (error) {
            console.error('Error initializing account type chart:', error);
            if (window.ChartUtils) {
                window.ChartUtils.updateChartStatusIndicator('chartStatus', 'error', '账户类型统计图表加载失败');
            }
        }
    }

    // 初始化账户增长趋势图表
    function initAccountGrowthChart(chartUtils) {
        try {
            const chartId = 'accountGrowthChart';
            
            // 使用ChartUtils设置图表环境
            const chartInfo = chartUtils.setupChartEnvironment(chartId, window.accountCharts, 'growthChart');
            
            if (!chartInfo) {
                console.error('Failed to setup chart environment for account growth chart');
                return;
            }
            
            const { ctx } = chartInfo;
            
            // 销毁现有图表
            if (window.accountCharts.growthChart) {
                window.accountCharts.growthChart.destroy();
                window.accountCharts.growthChart = null;
                console.log('Existing account growth chart destroyed');
            }
            
            // 创建图表
            window.accountCharts.growthChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    datasets: [{
                        label: '征收台账',
                        data: [60, 65, 72, 80, 88, 95, 103, 110, 118, 125, 133, 140],
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: '补偿台账',
                        data: [65, 72, 80, 88, 95, 103, 110, 118, 125, 133, 140, 148],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: '协议台账',
                        data: [75, 82, 90, 98, 105, 112, 120, 128, 135, 142, 150, 158],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.1)',
                        tension: 0.3,
                        fill: true
                    }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '新增数量'
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
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        }
                    },
                    interaction: {
                        mode: 'nearest',
                        axis: 'x',
                        intersect: false
                    }
                }
            });
            
            console.log('Account growth chart initialized successfully');
            chartUtils.updateChartStatusIndicator('chartStatus', 'success', '账户增长趋势图表初始化成功', 2000);
        } catch (error) {
            console.error('Error initializing account growth chart:', error);
            if (window.ChartUtils) {
                window.ChartUtils.updateChartStatusIndicator('chartStatus', 'error', '账户增长趋势图表加载失败');
            }
        }
    }

    // 为所有详情按钮添加点击事件处理
    function initButtonListeners() {
        try {
            const detailButtons = document.querySelectorAll('button');
            detailButtons.forEach(button => {
                button.addEventListener('click', function() {
                    console.log('Detail button clicked:', this.textContent);
                    // 在实际项目中，这里会导航到相应的统计详情页面
                    // 简单的提示信息
                    alert('即将跳转到相应的详情页');
                });
            });
        } catch (error) {
            console.error('Error adding button event listeners:', error);
        }
    }
    
    // 销毁单个图表
    function destroyChart(chartName) {
        if (window.accountCharts && window.accountCharts[chartName]) {
            if (window.ChartUtils) {
                const success = window.ChartUtils.destroyChart(window.accountCharts[chartName]);
                if (success) {
                    window.accountCharts[chartName] = null;
                    console.log(`Chart ${chartName} destroyed successfully`);
                }
            } else {
                try {
                    window.accountCharts[chartName].destroy();
                    window.accountCharts[chartName] = null;
                    console.log(`Chart ${chartName} destroyed successfully`);
                } catch (error) {
                    console.error(`Error destroying chart ${chartName}:`, error);
                }
            }
        }
    }
    
    // 销毁所有图表
    function destroyAllCharts() {
        console.log('Destroying all charts...');
        
        // 遍历window.accountCharts对象的所有属性
        if (window.accountCharts) {
            Object.keys(window.accountCharts).forEach(chartName => {
                destroyChart(chartName);
            });
        }
        
        console.log('All charts destroyed');
    }
    
    // 处理窗口大小变化事件
    function handleResponsive() {
        // 获取ChartUtils
        if (window.ChartUtils) {
            // 使用ChartUtils.debounce处理窗口大小变化
            const resizeHandler = window.ChartUtils.debounce(() => {
                if (window.accountCharts.typeChart) {
                    window.accountCharts.typeChart.resize();
                }
                if (window.accountCharts.growthChart) {
                    window.accountCharts.growthChart.resize();
                }
            }, 250);
            
            // 添加窗口大小变化事件监听
            window.addEventListener('resize', resizeHandler);
            
            // 页面卸载前清理资源
            window.addEventListener('beforeunload', function() {
                window.removeEventListener('resize', resizeHandler);
                destroyAllCharts();
            });
        }
    }

    // 初始化所有图表
    async function initAllCharts() {
        console.log('Initializing all charts...');
        
        try {
            // 等待ChartUtils加载完成
            const chartUtils = await waitForChartUtils();
            
            // 创建全局状态指示器 - 为每个图表创建独立的状态指示器
            chartUtils.createChartStatusIndicator('accountTypeChart', 'loading');
            chartUtils.createChartStatusIndicator('accountGrowthChart', 'loading');
            
            // 检查Chart.js是否已加载
            if (typeof Chart !== 'undefined') {
                try {
                    // 初始化各个图表
                    initAccountTypeChart(chartUtils);
                    initAccountGrowthChart(chartUtils);
                    
                    // 创建图表刷新按钮
                    chartUtils.createRefreshButton('accountTypeChart', () => {
                        initAccountTypeChart(chartUtils);
                    });
                    
                    chartUtils.createRefreshButton('accountGrowthChart', () => {
                        initAccountGrowthChart(chartUtils);
                    });
                    
                    // 更新状态为成功
                    chartUtils.updateChartStatusIndicator('accountTypeChart', 'success');
                    chartUtils.updateChartStatusIndicator('accountGrowthChart', 'success');
                    console.log('All charts initialized successfully');
                } catch (error) {
                    console.error('Error initializing charts:', error);
                    chartUtils.updateChartStatusIndicator('accountTypeChart', 'error');
                    chartUtils.updateChartStatusIndicator('accountGrowthChart', 'error');
                }
            } else {
                console.error('Chart.js is not available. Charts cannot be initialized.');
                chartUtils.updateChartStatusIndicator('accountTypeChart', 'error');
                chartUtils.updateChartStatusIndicator('accountGrowthChart', 'error');
            }
        } catch (error) {
            console.error('Error during chart initialization:', error);
            // 如果ChartUtils加载失败，尝试直接创建错误指示器
            if (!document.getElementById('accountTypeChart') && !document.getElementById('accountGrowthChart')) {
                const indicator = document.createElement('div');
                indicator.id = 'chartStatus';
                indicator.className = 'fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg';
                indicator.innerHTML = '<i class="fas fa-exclamation-circle text-red-500"></i><span class="text-red-600">图表工具加载失败</span>';
                document.body.appendChild(indicator);
            }
        }
    }
    
    // 页面初始化主函数
    async function initPage() {
        try {
            // 初始化图表
            await initAllCharts();
            
            // 初始化按钮事件监听
            initButtonListeners();
            
            // 设置响应式处理
            handleResponsive();
        } catch (error) {
            console.error('Error during page initialization:', error);
        }
    }

    // 页面加载完成后初始化
    document.addEventListener('DOMContentLoaded', async () => {
        await initPage();
    });
})();