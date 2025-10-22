// 通用Chart.js工具库
console.log('ChartUtils文件加载');

// 缓存已创建的图表实例
const chartInstances = new Map();

/**
 * 检查Chart.js是否已加载
 * @returns {boolean} Chart.js是否可用
 */
function checkChartJs() {
    const isAvailable = typeof Chart !== 'undefined' && Chart !== null;
    console.log('检查Chart.js是否可用:', isAvailable);
    if (isAvailable) {
        console.log('Chart.js版本:', Chart.version || '未知');
    }
    return isAvailable;
}

/**
 * 创建图表状态指示器
 * @param {string} chartId - 图表ID
 * @param {string} status - 初始状态 ('loading', 'success', 'error')
 * @param {string} message - 状态消息
 */
function createChartStatusIndicator(chartId, status = 'loading', message = '') {
    console.log(`创建状态指示器 for ${chartId}, status: ${status}`);
    
    // 首先尝试获取图表canvas元素
    const canvas = document.getElementById(chartId);
    if (!canvas) {
        console.warn(`Canvas element with id ${chartId} not found`);
        return;
    }

    const container = canvas.parentElement;
    if (!container) {
        console.warn(`Container for canvas ${chartId} not found`);
        return;
    }

    // 设置容器为相对定位
    container.style.position = 'relative';

    // 检查是否已经存在状态指示器
    let indicator = document.getElementById(`status-${chartId}`);
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = `status-${chartId}`;
        indicator.className = 'absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10 rounded-lg transition-opacity duration-300';
        container.appendChild(indicator);
    }

    updateChartStatusIndicator(chartId, status, message);
}

/**
 * 更新图表状态指示器
 * @param {string} chartId - 图表ID
 * @param {string} status - 状态 ('loading', 'success', 'error')
 * @param {string} message - 状态消息
 * @param {number} autoHide - 自动隐藏延迟（毫秒），0表示不自动隐藏
 */
function updateChartStatusIndicator(chartId, status, message = '', autoHide = 0) {
    console.log(`更新状态指示器 for ${chartId}, status: ${status}, message: ${message}`);
    
    const indicator = document.getElementById(`status-${chartId}`);
    if (!indicator) {
        console.warn(`Status indicator for chart ${chartId} not found`);
        return;
    }

    // 设置状态样式和内容
    switch (status) {
        case 'loading':
            indicator.innerHTML = `
                <div class="flex flex-col items-center">
                    <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                    <span class="text-gray-700">${message || '图表加载中...'}</span>
                </div>
            `;
            indicator.classList.remove('opacity-0');
            break;
        case 'success':
            indicator.innerHTML = `
                <div class="flex flex-col items-center">
                    <i class="fas fa-check-circle text-green-500 text-2xl mb-2"></i>
                    <span class="text-gray-700">${message || '图表加载成功'}</span>
                </div>
            `;
            // 成功状态自动隐藏
            if (autoHide > 0) {
                setTimeout(() => {
                    indicator.style.opacity = '0';
                    setTimeout(() => {
                        if (indicator.parentNode) {
                            indicator.parentNode.removeChild(indicator);
                        }
                    }, 300);
                }, autoHide);
            }
            break;
        case 'error':
            indicator.innerHTML = `
                <div class="flex flex-col items-center">
                    <i class="fas fa-exclamation-circle text-red-500 text-2xl mb-2"></i>
                    <span class="text-gray-700">${message || '图表加载失败'}</span>
                    <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm" onclick="location.reload()">
                        刷新页面
                    </button>
                </div>
            `;
            indicator.classList.remove('opacity-0');
            break;
        default:
            console.error(`Unknown status: ${status}`);
            return;
    }
}

/**
 * 创建图表刷新按钮
 * @param {string} chartId - 图表ID
 * @param {function} refreshCallback - 刷新回调函数
 */
function createRefreshButton(chartId, refreshCallback) {
    console.log(`创建刷新按钮 for ${chartId}`);
    
    const canvas = document.getElementById(chartId);
    if (!canvas) {
        console.warn(`Canvas element with id ${chartId} not found`);
        return;
    }

    const container = canvas.parentElement;
    if (!container) {
        console.warn(`Container for canvas ${chartId} not found`);
        return;
    }

    // 设置容器为相对定位
    container.style.position = 'relative';

    // 检查是否已经存在刷新按钮
    let refreshButton = document.getElementById(`refresh-${chartId}`);
    if (!refreshButton) {
        refreshButton = document.createElement('button');
        refreshButton.id = `refresh-${chartId}`;
        refreshButton.className = 'absolute top-4 right-4 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all z-20';
        refreshButton.innerHTML = '<i class="fas fa-sync-alt text-gray-600"></i>';
        refreshButton.title = '刷新图表';
        container.appendChild(refreshButton);

        // 添加点击事件
        refreshButton.addEventListener('click', () => {
            console.log(`Refreshing chart: ${chartId}`);
            // 显示加载状态
            updateChartStatusIndicator(chartId, 'loading', '正在刷新图表...');
            // 执行刷新回调
            if (typeof refreshCallback === 'function') {
                try {
                    refreshCallback();
                } catch (error) {
                    console.error(`Error refreshing chart ${chartId}:`, error);
                    updateChartStatusIndicator(chartId, 'error', '图表刷新失败，请重试: ' + error.message);
                }
            }
        });
    }
}

/**
 * 销毁单个图表
 * @param {object} chartInstance - 图表实例
 */
function destroyChart(chartInstance) {
    if (chartInstance && typeof chartInstance.destroy === 'function') {
        try {
            chartInstance.destroy();
            console.log('图表销毁成功');
            return true;
        } catch (error) {
            console.error('Error destroying chart:', error);
        }
    }
    return false;
}

/**
 * 优化的图表创建函数，带有缓存和性能优化
 * @param {string} chartId - 图表ID
 * @param {object} config - 图表配置
 * @returns {object} 图表实例
 */
function createOptimizedChart(chartId, config) {
    // 销毁已存在的图表实例
    if (chartInstances.has(chartId)) {
        const existingChart = chartInstances.get(chartId);
        destroyChart(existingChart);
        chartInstances.delete(chartId);
    }
    
    // 获取canvas元素
    const canvas = document.getElementById(chartId);
    if (!canvas) {
        console.warn(`Canvas element with id ${chartId} not found`);
        return null;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error(`无法获取canvas ${chartId}的绘图上下文`);
        return null;
    }
    
    // 创建新图表
    const newChart = new Chart(ctx, config);
    
    // 缓存图表实例
    chartInstances.set(chartId, newChart);
    
    console.log(`图表 ${chartId} 创建成功`);
    return newChart;
}

/**
 * 获取已缓存的图表实例
 * @param {string} chartId - 图表ID
 * @returns {object|null} 图表实例或null
 */
function getChartInstance(chartId) {
    return chartInstances.get(chartId) || null;
}

/**
 * 创建防抖函数
 * @param {function} func - 要防抖的函数
 * @param {number} delay - 延迟时间（毫秒）
 * @returns {function} 防抖后的函数
 */
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * 初始化图表时的常见操作
 * @param {string} chartId - 图表ID
 * @param {object} chartObject - 存储图表实例的对象
 * @param {string} chartProperty - 图表对象中的属性名
 * @returns {object} 包含canvas、ctx和container的对象，如果初始化失败则返回null
 */
function setupChartEnvironment(chartId, chartObject, chartProperty) {
    console.log(`设置图表环境 for ${chartId}`);
    
    // 检查Chart.js是否已加载
    if (!checkChartJs()) {
        console.error('Chart.js is not available');
        return null;
    }

    const canvas = document.getElementById(chartId);
    if (!canvas) {
        console.error(`Canvas element with id ${chartId} not found`);
        return null;
    }

    const container = canvas.parentElement;
    if (!container) {
        console.error(`Container for canvas ${chartId} not found`);
        return null;
    }

    // 销毁已存在的图表
    if (chartObject && chartObject[chartProperty]) {
        destroyChart(chartObject[chartProperty]);
        chartObject[chartProperty] = null;
    }

    // 设置图表尺寸
    const width = container.clientWidth;
    const height = container.clientHeight || 300;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error(`Failed to get context for canvas ${chartId}`);
        return null;
    }

    return { canvas, ctx, container, width, height };
}

// 导出工具函数（在浏览器环境中作为全局函数使用）
window.ChartUtils = {
    checkChartJs,
    createChartStatusIndicator,
    updateChartStatusIndicator,
    createRefreshButton,
    // 添加别名以保持向后兼容
    createChartRefreshButton: createRefreshButton,
    destroyChart,
    debounce,
    setupChartEnvironment
};

console.log('ChartUtils对象已创建并赋值给window.ChartUtils');

console.log('ChartUtils文件加载完成');