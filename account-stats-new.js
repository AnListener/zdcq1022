// 台账统计页面脚本
// 全局图表对象
window.accountCharts = window.accountCharts || {};

// 确保在DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('台账统计页面加载完成，开始初始化图表...');
    
    // 检查Chart.js是否已加载
    checkChartJs();
    
    // 添加窗口大小调整事件监听，确保图表响应式
    window.addEventListener('resize', function() {
        if (window.accountCharts.typeChart) {
            window.accountCharts.typeChart.resize();
        }
        if (window.accountCharts.growthChart) {
            window.accountCharts.growthChart.resize();
        }
    });
    
    console.log('图表初始化完成');
});

/**
 * 检查Chart.js是否已加载
 */
function checkChartJs() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js未加载成功，无法创建图表');
        
        // 创建图表状态指示器
        createChartStatusIndicator();
        
        // 尝试重新加载Chart.js
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() {
            console.log('Chart.js重新加载成功，版本：', Chart.version);
            updateChartStatusIndicator(true);
            initAllCharts();
        };
        script.onerror = function() {
            console.error('Chart.js重新加载失败');
            updateChartStatusIndicator(false, 'Chart.js加载失败');
        };
        document.body.appendChild(script);
        
        return false;
    }
    
    console.log('Chart.js加载成功，版本：', Chart.version);
    initAllCharts();
    return true;
}

/**
 * 初始化所有图表
 */
function initAllCharts() {
    try {
        // 初始化台账类型统计图表
        initAccountTypeChart();
        
        // 初始化台账增长趋势图表
        initAccountGrowthChart();
        
        // 创建刷新按钮
        createRefreshButtons();
    } catch (error) {
        console.error('初始化图表时发生错误:', error);
    }
}

/**
 * 创建图表状态指示器
 */
function createChartStatusIndicator() {
    const container = document.createElement('div');
    container.id = 'chart-status-indicator';
    container.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    container.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>图表加载中...';
    document.body.appendChild(container);
}

/**
 * 更新图表状态指示器
 */
function updateChartStatusIndicator(isSuccess, message) {
    const indicator = document.getElementById('chart-status-indicator');
    if (!indicator) return;
    
    if (isSuccess) {
        indicator.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        indicator.innerHTML = '<i class="fas fa-check-circle mr-2"></i>图表加载成功';
        
        // 3秒后自动隐藏
        setTimeout(() => {
            indicator.style.transition = 'opacity 0.5s ease';
            indicator.style.opacity = '0';
            setTimeout(() => indicator.remove(), 500);
        }, 3000);
    } else {
        indicator.className = 'fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
        indicator.innerHTML = `<i class="fas fa-exclamation-circle mr-2"></i>${message || '图表加载失败'}`;
    }
}

/**
 * 创建刷新按钮
 */
function createRefreshButtons() {
    // 为类型图表添加刷新按钮
    const typeChartContainer = document.getElementById('accountTypeChart')?.parentElement;
    if (typeChartContainer) {
        const refreshButton1 = createRefreshButton('刷新台账类型图表', () => {
            destroyChart('typeChart');
            initAccountTypeChart();
        });
        typeChartContainer.appendChild(refreshButton1);
    }
    
    // 为增长趋势图表添加刷新按钮
    const growthChartContainer = document.getElementById('accountGrowthChart')?.parentElement;
    if (growthChartContainer) {
        const refreshButton2 = createRefreshButton('刷新台账增长趋势图表', () => {
            destroyChart('growthChart');
            initAccountGrowthChart();
        });
        growthChartContainer.appendChild(refreshButton2);
    }
}

/**
 * 创建单个刷新按钮
 */
function createRefreshButton(tooltip, onClick) {
    const button = document.createElement('button');
    button.className = 'absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 px-3 py-1 rounded-full shadow-md transition-all duration-300 hover:text-blue-600 focus:outline-none';
    button.innerHTML = '<i class="fas fa-sync-alt"></i>';
    button.title = tooltip;
    button.onclick = onClick;
    button.style.position = 'absolute';
    return button;
}

/**
 * 销毁指定的图表
 */
function destroyChart(chartKey) {
    if (window.accountCharts[chartKey]) {
        window.accountCharts[chartKey].destroy();
        window.accountCharts[chartKey] = null;
        console.log(`图表 ${chartKey} 已销毁`);
    }
}

/**
 * 初始化各类台账数量统计图表
 */
function initAccountTypeChart() {
    try {
        const ctx = document.getElementById('accountTypeChart').getContext('2d');
        
        if (!ctx) {
            console.error('未找到accountTypeChart元素');
            return;
        }
        
        // 确保容器元素有相对定位，以便刷新按钮能正确定位
        const container = ctx.canvas.parentElement;
        if (container) {
            container.style.position = 'relative';
        }
        
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
    }
}

/**
 * 初始化台账月度增长趋势图表
 */
function initAccountGrowthChart() {
    try {
        const ctx = document.getElementById('accountGrowthChart').getContext('2d');
        
        if (!ctx) {
            console.error('未找到accountGrowthChart元素');
            return;
        }
        
        // 确保容器元素有相对定位，以便刷新按钮能正确定位
        const container = ctx.canvas.parentElement;
        if (container) {
            container.style.position = 'relative';
        }
        
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
    }
}