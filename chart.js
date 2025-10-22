// 简化版Chart.js模拟库 - 用于CDN加载失败时的备用
// 模拟Chart.js v3.9.1的核心功能

console.log('本地Chart.js文件加载');

// Chart类构造函数
class Chart {
    constructor(ctx, config) {
        console.log('创建Chart实例');
        
        // 保存配置参数
        this.ctx = ctx;
        this.config = config || {};
        this.type = this.config.type || 'bar';
        this.data = this.config.data || { labels: [], datasets: [] };
        this.options = this.config.options || {};
        
        // 添加版本信息
        this.version = '3.9.1-local';
        
        // 初始化图表
        this.render();
    }
    
    render() {
        const ctx = this.ctx;
        if (!ctx) {
            console.error('Chart渲染失败：无效的绘图上下文');
            return;
        }
        
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        
        // 清空画布
        ctx.clearRect(0, 0, width, height);
        
        // 根据图表类型绘制
        try {
            switch(this.type) {
                case 'bar':
                    this.drawBarChart();
                    break;
                case 'line':
                    this.drawLineChart();
                    break;
                case 'pie':
                    this.drawPieChart();
                    break;
                case 'doughnut':
                    this.drawDoughnutChart();
                    break;
                default:
                    this.drawPlaceholder();
            }
        } catch (error) {
            console.error('图表渲染出错:', error);
            this.drawPlaceholder();
        }
    }
    
    drawBarChart() {
        const ctx = this.ctx;
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const data = this.data;
        const datasets = data.datasets;
        const labels = data.labels;
        
        if (!datasets || !labels || datasets.length === 0) {
            this.drawPlaceholder();
            return;
        }
        
        // 绘制背景
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, width, height);
        
        // 绘制坐标轴
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(50, 20);
        ctx.lineTo(50, height - 30);
        ctx.lineTo(width - 20, height - 30);
        ctx.stroke();
        
        // 绘制占位柱状图
        const barCount = Math.min(labels.length, datasets[0].data.length);
        if (barCount === 0) {
            this.drawPlaceholder();
            return;
        }
        
        const barWidth = (width - 100) / barCount * 0.6;
        const barSpacing = (width - 100) / barCount * 0.4;
        
        // 获取数据最大值用于比例计算
        let maxValue = 0;
        for (let i = 0; i < datasets.length; i++) {
            if (datasets[i].data) {
                const datasetMax = Math.max(...datasets[i].data);
                maxValue = Math.max(maxValue, datasetMax);
            }
        }
        
        if (maxValue === 0) maxValue = 1; // 避免除零错误
        
        for (let i = 0; i < barCount; i++) {
            const value = datasets[0].data[i];
            const barHeight = (value / maxValue) * (height - 80);
            const x = 60 + i * (barWidth + barSpacing);
            const y = height - 30 - barHeight;
            
            // 绘制柱子
            ctx.fillStyle = datasets[0].backgroundColor || '#3b82f6';
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // 绘制边框
            ctx.strokeStyle = datasets[0].borderColor || '#2563eb';
            ctx.lineWidth = datasets[0].borderWidth || 1;
            ctx.strokeRect(x, y, barWidth, barHeight);
        }
        
        // 绘制标签
        ctx.fillStyle = '#64748b';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        for (let i = 0; i < labels.length; i++) {
            const x = 60 + i * (barWidth + barSpacing) + barWidth / 2;
            ctx.fillText(labels[i], x, height - 10);
        }
    }
    
    drawLineChart() {
        const ctx = this.ctx;
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const data = this.data;
        const datasets = data.datasets;
        const labels = data.labels;
        
        if (!datasets || !labels || datasets.length === 0) {
            this.drawPlaceholder();
            return;
        }
        
        // 绘制背景
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, width, height);
        
        // 绘制坐标轴
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(50, 20);
        ctx.lineTo(50, height - 30);
        ctx.lineTo(width - 20, height - 30);
        ctx.stroke();
        
        // 绘制线条
        for (let d = 0; d < datasets.length; d++) {
            const dataset = datasets[d];
            if (!dataset.data || dataset.data.length === 0) continue;
            
            const points = [];
            
            // 计算点位置
            for (let i = 0; i < dataset.data.length && i < labels.length; i++) {
                const x = 60 + (i / (labels.length - 1 || 1)) * (width - 100);
                
                // 计算y坐标
                let y;
                if (dataset.data.length === 1) {
                    y = height - 60; // 单个数据点居中显示
                } else {
                    const maxValue = Math.max(...dataset.data);
                    const minValue = Math.min(...dataset.data);
                    const range = maxValue - minValue || 1;
                    y = height - 30 - ((dataset.data[i] - minValue) / range) * (height - 80);
                }
                
                points.push({x, y});
            }
            
            // 绘制线条
            if (points.length > 0) {
                ctx.beginPath();
                ctx.strokeStyle = dataset.borderColor || '#3b82f6';
                ctx.lineWidth = dataset.borderWidth || 2;
                
                for (let i = 0; i < points.length; i++) {
                    if (i === 0) {
                        ctx.moveTo(points[i].x, points[i].y);
                    } else {
                        ctx.lineTo(points[i].x, points[i].y);
                    }
                }
                ctx.stroke();
                
                // 绘制数据点
                ctx.fillStyle = dataset.pointBackgroundColor || dataset.borderColor || '#3b82f6';
                for (let i = 0; i < points.length; i++) {
                    ctx.beginPath();
                    ctx.arc(points[i].x, points[i].y, 4, 0, 2 * Math.PI);
                    ctx.fill();
                }
            }
        }
    }
    
    drawPieChart() {
        this.drawDoughnutChart(0);
    }
    
    drawDoughnutChart(innerRadiusRatio = 0.6) {
        const ctx = this.ctx;
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        const data = this.data;
        const datasets = data.datasets;
        
        if (!datasets || !datasets[0] || !datasets[0].data || datasets[0].data.length === 0) {
            this.drawPlaceholder();
            return;
        }
        
        const values = datasets[0].data;
        const colors = datasets[0].backgroundColor;
        const labels = data.labels;
        const total = values.reduce((a, b) => a + b, 0);
        
        if (total === 0) {
            this.drawPlaceholder();
            return;
        }
        
        // 绘制背景
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, width, height);
        
        // 计算圆心和半径
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 30;
        const innerRadius = radius * innerRadiusRatio;
        
        // 绘制扇形
        let startAngle = -Math.PI / 2;
        for (let i = 0; i < values.length; i++) {
            const sliceAngle = (values[i] / total) * 2 * Math.PI;
            const endAngle = startAngle + sliceAngle;
            
            // 绘制扇形
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = (colors && colors[i]) || this.getDefaultColor(i);
            ctx.fill();
            
            // 如果是环形图，绘制内圆
            if (this.type === 'doughnut' && innerRadiusRatio > 0) {
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, innerRadius, startAngle, endAngle);
                ctx.closePath();
                ctx.fillStyle = '#f8fafc';
                ctx.fill();
            }
            
            startAngle = endAngle;
        }
        
        // 绘制标签
        if (labels) {
            ctx.fillStyle = '#64748b';
            ctx.font = '12px Arial';
            ctx.textAlign = 'left';
            for (let i = 0; i < Math.min(labels.length, 10); i++) { // 限制显示10个标签
                const y = 20 + i * 20;
                const percentage = Math.round((values[i] / total) * 100);
                ctx.fillText(`${labels[i]}: ${percentage}%`, 20, y);
            }
        }
    }
    
    getDefaultColor(index) {
        const colors = [
            '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
            '#06b6d4', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'
        ];
        return colors[index % colors.length];
    }
    
    drawPlaceholder() {
        const ctx = this.ctx;
        const width = ctx.canvas.width;
        const height = ctx.canvas.height;
        
        // 绘制背景
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, width, height);
        
        // 绘制占位文本
        ctx.fillStyle = '#94a3b8';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('图表占位符 (本地Chart.js模式)', width / 2, height / 2);
        ctx.font = '12px Arial';
        ctx.fillText('请检查网络连接或刷新页面', width / 2, height / 2 + 30);
    }
    
    update() {
        this.render();
    }
    
    destroy() {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        }
    }
    
    resize() {
        // 重新渲染图表以适应新尺寸
        this.render();
    }
}

// 创建全局Chart对象
window.Chart = Chart;
console.log('Chart对象已创建并赋值给window.Chart');

// 添加register方法以保持兼容性
Chart.register = function() {
    // 空实现，用于兼容Chart.js的插件系统
    console.log('Chart.register 被调用');
    return Chart;
};

// 标记为本地模式
Chart.isLocalMode = true;

// 导出用于ES模块环境
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Chart;
}

console.log('本地Chart.js文件加载完成');