// 台账统计页面脚本
// 页面初始化
console.log('account-statistics.js loaded');

// 创建全局图表对象容器
window.accountCharts = {
    typeChart: null,
    growthChart: null
};

// 等待ChartUtils加载完成
async function waitForChartUtils() {
    return new Promise((resolve) => {
        if (window.ChartUtils) {
            resolve(window.ChartUtils);
            return;
        }
        
        const maxRetries = 10;
        let attempts = 0;
        
        const checkInterval = setInterval(() => {
            attempts++;
            
            if (window.ChartUtils || attempts >= maxRetries) {
                clearInterval(checkInterval);
                resolve(window.ChartUtils);
            }
        }, 300);
    });
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

/**
 * 初始化所有图表
 */
async function initAllCharts() {
    console.log('Initializing all charts');
    
    try {
        // 等待ChartUtils加载完成
        const chartUtils = await waitForChartUtils();
        
        if (!chartUtils) {
            console.error('ChartUtils is not available');
            return;
        }
        
        // 检查Chart.js是否加载成功
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not available, cannot initialize charts');
            chartUtils.updateChartStatusIndicator('chartStatus', 'error', 'Chart.js加载失败，请检查网络连接');
            return;
        }
        
        // 创建全局状态指示器
        chartUtils.createChartStatusIndicator('chartStatus', 'loading');
        
        // 更新全局状态指示器
        chartUtils.updateChartStatusIndicator('chartStatus', 'loading', '正在初始化图表...');
        
        // 初始化所有图表
        initAccountTypeChart();
        initAccountGrowthChart();
        
        // 创建所有图表的刷新按钮
        createRefreshButtons();
        
        // 更新状态指示器
        setTimeout(() => {
            chartUtils.updateChartStatusIndicator('chartStatus', 'success');
        }, 500);
        
    } catch (error) {
        console.error('Error initializing charts:', error);
        if (window.ChartUtils) {
            window.ChartUtils.updateChartStatusIndicator('chartStatus', 'error');
        }
    }
}

/**
 * 创建所有图表的刷新按钮
 */
function createRefreshButtons() {
    try {
        // 使用ChartUtils创建刷新按钮
        window.ChartUtils.createRefreshButton('accountTypeChart', function() {
            initAccountTypeChart();
        });
        
        window.ChartUtils.createRefreshButton('accountGrowthChart', function() {
            initAccountGrowthChart();
        });
        
        console.log('All chart refresh buttons created successfully');
    } catch (error) {
        console.error('Error creating chart refresh buttons:', error);
    }
}

/**
 * 处理响应式
 */
function handleResponsive() {
    // 使用自定义防抖函数处理窗口大小变化
    const resizeHandler = debounce(function() {
        console.log('Window resize detected, resizing charts');
        
        // 重新调整图表大小
        if (window.accountCharts && window.accountCharts.typeChart) {
            try {
                window.accountCharts.typeChart.resize();
            } catch (error) {
                console.error('Error resizing account type chart:', error);
            }
        }
        
        if (window.accountCharts && window.accountCharts.growthChart) {
            try {
                window.accountCharts.growthChart.resize();
            } catch (error) {
                console.error('Error resizing account growth chart:', error);
            }
        }
    }, 300);
    
    // 监听窗口大小变化
    window.addEventListener('resize', resizeHandler);
    
    // 页面卸载前清理资源
    window.addEventListener('beforeunload', function() {
        console.log('Page unload detected, destroying all charts');
        window.removeEventListener('resize', resizeHandler);
        
        // 销毁所有图表
        if (window.accountCharts) {
            if (window.accountCharts.typeChart) {
                window.ChartUtils.destroyChart(window.accountCharts.typeChart);
                window.accountCharts.typeChart = null;
            }
            if (window.accountCharts.growthChart) {
                window.ChartUtils.destroyChart(window.accountCharts.growthChart);
                window.accountCharts.growthChart = null;
            }
        }
    });
}

/**
 * 初始化页面
 */
function initPage() {
    console.log('Initializing account statistics page');
    
    // 初始化所有图表
    initAllCharts();
    
    // 处理响应式
    handleResponsive();
}

// 等待ChartUtils加载完成后初始化页面
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    
    initPage();
});

/**
 * 初始化各类台账数量统计图表
 */
function initAccountTypeChart() {
    try {
        // 使用ChartUtils设置图表环境
        const chartInfo = window.ChartUtils.setupChartEnvironment('accountTypeChart', window.accountCharts.typeChart);
        
        if (!chartInfo) {
            console.error('Failed to setup chart environment for accountTypeChart');
            return;
        }
        
        const { ctx, chartContainer } = chartInfo;
        
        // 从页面中提取数据
        const labels = ['征地台账', '房屋台账', '附着物台账', '协议台账', '结算台账', '审核台账'];
        const data = [1256, 842, 512, 965, 753, 621];
        const backgroundColors = [
            'rgba(54, 162, 235, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)'
        ];
        const borderColors = [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ];
        
        // 创建图表
        window.accountCharts.typeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '台账数量',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors,
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
                            text: '数量'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '台账类型'
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
                                return `数量: ${context.raw}`;
                            }
                        }
                    }
                }
            }
        });
        
        console.log('accountTypeChart创建成功');
    } catch (error) {
        console.error('创建accountTypeChart时发生错误:', error);
        window.ChartUtils.updateChartStatusIndicator('chartStatus', 'error');
    }
}

/**
 * 初始化台账月度增长趋势图表
 */
function initAccountGrowthChart() {
    try {
        // 使用ChartUtils设置图表环境
        const chartInfo = window.ChartUtils.setupChartEnvironment('accountGrowthChart', window.accountCharts.growthChart);
        
        if (!chartInfo) {
            console.error('Failed to setup chart environment for accountGrowthChart');
            return;
        }
        
        const { ctx, chartContainer } = chartInfo;
        
        // 生成月度数据
        const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
        
        // 创建图表
        window.accountCharts.growthChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [
                    {
                        label: '征地台账',
                        data: [85, 92, 105, 112, 128, 132, 145, 152, 165, 172, 185, 195],
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: '房屋台账',
                        data: [65, 72, 80, 88, 95, 102, 110, 118, 125, 132, 140, 148],
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
        
        console.log('accountGrowthChart创建成功');
    } catch (error) {
        console.error('创建accountGrowthChart时发生错误:', error);
        window.ChartUtils.updateChartStatusIndicator('chartStatus', 'error');
    }
}