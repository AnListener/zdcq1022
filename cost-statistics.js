document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面功能
    console.log('Initializing cost statistics page');
    
    // 全局图表对象容器
    window.costCharts = {
        compositionChart: null,
        trendChart: null
    };
    
    // 检查Chart.js是否已加载
    function checkChartJs() {
        if (typeof Chart === 'undefined') {
            console.error('Chart.js is not loaded. Attempting to load...');
            
            // 创建状态指示器显示加载中
            createChartStatusIndicator('chartStatus', 'loading');
            
            // 尝试重新加载Chart.js
            try {
                // 假设已经在HTML中引入了Chart.js，这里只是检查
                setTimeout(() => {
                    if (typeof Chart === 'undefined') {
                        console.error('Failed to load Chart.js after timeout');
                        updateChartStatusIndicator('chartStatus', 'error');
                        return false;
                    }
                    updateChartStatusIndicator('chartStatus', 'success');
                    return true;
                }, 2000);
            } catch (error) {
                console.error('Error while trying to reload Chart.js:', error);
                updateChartStatusIndicator('chartStatus', 'error');
                return false;
            }
            return false;
        }
        return true;
    }

    // 创建全局图表状态指示器
    function createChartStatusIndicator(id, status = 'loading') {
        // 移除旧的指示器
        const oldIndicator = document.getElementById(id);
        if (oldIndicator) {
            oldIndicator.remove();
        }
        
        // 创建新的指示器
        const indicator = document.createElement('div');
        indicator.id = id;
        indicator.className = 'fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg transition-opacity duration-300';
        
        // 设置指示器内容
        if (status === 'loading') {
            indicator.innerHTML = '<i class="fas fa-circle-notch fa-spin text-blue-500"></i><span class="text-blue-600">图表加载中...</span>';
        } else if (status === 'error') {
            indicator.innerHTML = '<i class="fas fa-exclamation-circle text-red-500"></i><span class="text-red-600">图表加载失败</span>';
        } else if (status === 'success') {
            indicator.innerHTML = '<i class="fas fa-check-circle text-green-500"></i><span class="text-green-600">图表加载成功</span>';
        }
        
        // 添加到文档中
        document.body.appendChild(indicator);
        
        // 成功状态下3秒后自动隐藏
        if (status === 'success') {
            setTimeout(() => {
                if (document.getElementById(id)) {
                    document.getElementById(id).classList.add('opacity-0');
                    setTimeout(() => {
                        const el = document.getElementById(id);
                        if (el) el.remove();
                    }, 300);
                }
            }, 3000);
        }
    }

    // 更新全局图表状态指示器
    function updateChartStatusIndicator(id, status) {
        const indicator = document.getElementById(id);
        if (!indicator) return;
        
        if (status === 'success') {
            indicator.innerHTML = '<i class="fas fa-check-circle text-green-500"></i><span class="text-green-600">图表加载成功</span>';
            indicator.querySelector('i').className = 'fas fa-check-circle text-green-500';
            indicator.querySelector('span').className = 'text-green-600';
            
            // 3秒后自动隐藏
            setTimeout(() => {
                indicator.classList.add('opacity-0');
                setTimeout(() => {
                    indicator.remove();
                }, 300);
            }, 3000);
        } else if (status === 'error') {
            indicator.innerHTML = '<i class="fas fa-exclamation-circle text-red-500"></i><span class="text-red-600">图表加载失败</span>';
            indicator.querySelector('i').className = 'fas fa-exclamation-circle text-red-500';
            indicator.querySelector('span').className = 'text-red-600';
        } else if (status === 'loading') {
            indicator.innerHTML = '<i class="fas fa-circle-notch fa-spin text-blue-500"></i><span class="text-blue-600">图表加载中...</span>';
            indicator.querySelector('i').className = 'fas fa-circle-notch fa-spin text-blue-500';
            indicator.querySelector('span').className = 'text-blue-600';
        }
    }
    
    // 创建所有图表的刷新按钮
    function createRefreshButtons() {
        // 为费用构成图表创建刷新按钮
        const compositionChartContainer = document.getElementById('costCompositionChart')?.parentElement;
        if (compositionChartContainer) {
            createChartRefreshButton(compositionChartContainer, function() {
                initCostCompositionChart();
            });
        }
        
        // 为费用趋势图表创建刷新按钮
        const trendChartContainer = document.getElementById('costTrendChart')?.parentElement;
        if (trendChartContainer) {
            createChartRefreshButton(trendChartContainer, function() {
                initCostTrendChart();
            });
        }
    }
    
    // 为单个图表创建刷新按钮
    function createChartRefreshButton(chartContainer, refreshCallback) {
        // 检查是否已存在刷新按钮
        let refreshButton = chartContainer.querySelector('.chart-refresh-button');
        if (!refreshButton) {
            // 设置容器为相对定位
            chartContainer.style.position = 'relative';
            
            refreshButton = document.createElement('button');
            refreshButton.className = 'chart-refresh-button absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors z-20';
            refreshButton.innerHTML = '<i class="fas fa-sync-alt text-blue-500"></i>';
            refreshButton.title = '刷新图表';
            chartContainer.appendChild(refreshButton);
            
            // 添加点击事件
            refreshButton.addEventListener('click', function() {
                console.log('Refresh button clicked for chart container');
                
                // 添加旋转动画
                const icon = this.querySelector('i');
                icon.classList.add('fa-spin');
                
                // 禁用按钮防止重复点击
                this.disabled = true;
                
                // 调用刷新回调
                if (typeof refreshCallback === 'function') {
                    try {
                        refreshCallback();
                        console.log('Chart refresh callback executed successfully');
                    } catch (error) {
                        console.error('Error during chart refresh:', error);
                    }
                }
                
                // 2秒后恢复按钮状态
                setTimeout(() => {
                    icon.classList.remove('fa-spin');
                    this.disabled = false;
                }, 2000);
            });
        }
        return refreshButton;
    }
    
    // 初始化费用构成统计图表
    function initCostCompositionChart() {
        const chartCanvas = document.getElementById('costCompositionChart');
        if (!chartCanvas) {
            console.error('Canvas element for cost composition chart not found');
            updateChartStatusIndicator('chartStatus', 'error');
            return;
        }
        
        // 获取容器并设置相对定位
        const chartContainer = chartCanvas.parentElement;
        if (chartContainer) {
            chartContainer.style.position = 'relative';
        }
        
        try {
            // 销毁已存在的图表
            if (window.costCharts.compositionChart) {
                console.log('Destroying existing cost composition chart');
                window.costCharts.compositionChart.destroy();
            }
            
            const ctx = chartCanvas.getContext('2d');
            
            // 设置图表尺寸
            const container = chartCanvas.parentElement;
            const width = container.clientWidth;
            const height = 300;
            chartCanvas.width = width;
            chartCanvas.height = height;
            
            // 图表数据
            const chartData = {
                labels: ['房屋补偿', '土地补偿', '搬迁奖励', '临时安置费', '其他费用'],
                datasets: [{
                    data: [65, 20, 8, 5, 2],
                    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            };
            
            // 图表配置
            const chartConfig = {
                type: 'doughnut',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                font: {
                                    size: 12
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.formattedValue || '';
                                    return `${label}: ${value}%`;
                                }
                            }
                        }
                    },
                    cutout: '65%'
                }
            };
            
            // 创建图表
            window.costCharts.compositionChart = new Chart(ctx, chartConfig);
            console.log('Cost composition chart created successfully');
        } catch (error) {
            console.error('Error initializing cost composition chart:', error);
            updateChartStatusIndicator('chartStatus', 'error');
        }
    }
    
    // 初始化费用趋势统计图表
    function initCostTrendChart() {
        const chartCanvas = document.getElementById('costTrendChart');
        if (!chartCanvas) {
            console.error('Canvas element for cost trend chart not found');
            updateChartStatusIndicator('chartStatus', 'error');
            return;
        }
        
        // 获取容器并设置相对定位
        const chartContainer = chartCanvas.parentElement;
        if (chartContainer) {
            chartContainer.style.position = 'relative';
        }
        
        try {
            // 销毁已存在的图表
            if (window.costCharts.trendChart) {
                console.log('Destroying existing cost trend chart');
                window.costCharts.trendChart.destroy();
            }
            
            // 图表数据
            const chartData = {
                labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
                datasets: [{
                    label: '房屋补偿',
                    data: [120, 150, 180, 200, 210, 230],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.1
                }, {
                    label: '土地补偿',
                    data: [80, 90, 100, 110, 120, 130],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.1
                }, {
                    label: '其他费用',
                    data: [30, 35, 40, 45, 50, 55],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.1
                }]
            };
            
            // 图表配置
            const chartConfig = {
                type: 'line',
                data: chartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                padding: 20,
                                font: {
                                    size: 12
                                }
                            }
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                            callbacks: {
                                label: function(context) {
                                    const label = context.dataset.label || '';
                                    const value = context.formattedValue || '';
                                    return `${label}: ${value}万元`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '金额（万元）'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: '月份'
                            }
                        }
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    }
                }
            };
            
            // 创建图表
            window.costCharts.trendChart = new Chart(chartCanvas, chartConfig);
            console.log('Cost trend chart created successfully');
        } catch (error) {
            console.error('Error initializing cost trend chart:', error);
            updateChartStatusIndicator('chartStatus', 'error');
        }
    }
    
    // 销毁单个图表
    function destroyChart(chartInstance) {
        if (chartInstance && typeof chartInstance.destroy === 'function') {
            try {
                chartInstance.destroy();
                console.log('Chart destroyed successfully');
            } catch (error) {
                console.error('Error destroying chart:', error);
            }
        }
    }

    // 销毁所有图表
    function destroyAllCharts() {
        console.log('Destroying all charts');
        
        // 销毁费用构成图表
        if (window.costCharts && window.costCharts.compositionChart) {
            destroyChart(window.costCharts.compositionChart);
            window.costCharts.compositionChart = null;
        }
        
        // 销毁费用趋势图表
        if (window.costCharts && window.costCharts.trendChart) {
            destroyChart(window.costCharts.trendChart);
            window.costCharts.trendChart = null;
        }
        
        console.log('All charts destroyed');
    }

    // 初始化所有图表
    function initAllCharts() {
        console.log('Initializing all charts');
        
        // 检查Chart.js是否已加载
        if (!checkChartJs()) {
            console.log('Chart.js not loaded, trying to load...');
            
            // 创建全局状态指示器
            createChartStatusIndicator('chartStatus', 'loading');
            
            // 尝试从本地加载Chart.js
            try {
                const script = document.createElement('script');
                script.src = './libs/chartjs/Chart.min.js';
                script.onload = function() {
                    console.log('Chart.js loaded successfully from local path');
                    updateChartStatusIndicator('chartStatus', 'success');
                    
                    // 重新初始化所有图表
                    setTimeout(() => {
                        initCostCompositionChart();
                        initCostTrendChart();
                        createRefreshButtons();
                    }, 100);
                };
                script.onerror = function() {
                    console.error('Failed to load Chart.js from local path');
                    updateChartStatusIndicator('chartStatus', 'error');
                    
                    // 在图表容器中显示错误信息
                    const chartContainers = document.querySelectorAll('.chart-container');
                    chartContainers.forEach(container => {
                        container.innerHTML = '<div class="text-center p-8 text-red-500">图表加载失败，请刷新页面重试</div>';
                    });
                };
                document.head.appendChild(script);
            } catch (error) {
                console.error('Error while trying to load Chart.js:', error);
                updateChartStatusIndicator('chartStatus', 'error');
            }
            
            return;
        }
        
        // 创建全局状态指示器
        createChartStatusIndicator('chartStatus', 'loading');
        
        try {
            // 初始化所有图表
            initCostCompositionChart();
            initCostTrendChart();
            
            // 创建所有图表的刷新按钮
            createRefreshButtons();
            
            // 更新状态指示器
            setTimeout(() => {
                updateChartStatusIndicator('chartStatus', 'success');
            }, 500);
            
        } catch (error) {
            console.error('Error initializing charts:', error);
            updateChartStatusIndicator('chartStatus', 'error');
        }
    }

    // 处理响应式
    function handleResponsive() {
        // 监听窗口大小变化，重新绘制图表
        window.addEventListener('resize', function() {
            console.log('Window resize detected, resizing charts');
            
            // 重新调整费用构成图表大小
            if (window.costCharts && window.costCharts.compositionChart) {
                try {
                    window.costCharts.compositionChart.resize();
                } catch (error) {
                    console.error('Error resizing cost composition chart:', error);
                }
            }
            
            // 重新调整费用趋势图表大小
            if (window.costCharts && window.costCharts.trendChart) {
                try {
                    window.costCharts.trendChart.resize();
                } catch (error) {
                    console.error('Error resizing cost trend chart:', error);
                }
            }
        });
        
        // 页面卸载前销毁所有图表
        window.addEventListener('beforeunload', function() {
            console.log('Page unload detected, destroying all charts');
            destroyAllCharts();
        });
    }

    // 初始化页面
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOMContentLoaded event fired');
        
        // 初始化所有图表
        initAllCharts();
        
        // 处理响应式
        handleResponsive();
    });
});