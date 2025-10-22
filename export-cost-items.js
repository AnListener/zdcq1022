// 导出费用项页面的JavaScript功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const cancelBtn = document.getElementById('cancel-btn');
    const exportBtn = document.getElementById('export-btn');
    
    // 绑定取消按钮事件
    cancelBtn.addEventListener('click', function() {
        if (confirm('确定要取消导出吗？')) {
            window.history.back();
        }
    });
    
    // 绑定导出按钮事件
    exportBtn.addEventListener('click', function() {
        exportCostItems();
    });
    
    // 绑定全选/取消全选事件
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // 如果是全选框，控制所有字段选择
            if (this.id === 'select-all') {
                const allCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all)');
                allCheckboxes.forEach(cb => {
                    cb.checked = this.checked;
                });
            }
        });
    });
});

// 导出费用项数据
function exportCostItems() {
    // 获取导出设置
    const exportSettings = getExportSettings();
    
    // 验证是否有选择导出字段
    const selectedFields = exportSettings.fields.filter(field => field.selected);
    if (selectedFields.length === 0) {
        showNotification('请至少选择一个导出字段', 'error');
        return;
    }
    
    // 显示导出进度
    showNotification('正在导出数据，请稍候...', 'info');
    
    // 模拟导出过程
    setTimeout(function() {
        // 生成文件名
        const fileName = `费用项数据_${new Date().toISOString().slice(0, 10)}.xlsx`;
        
        // 显示导出成功通知
        showNotification(`数据导出成功: ${fileName}`, 'success');
        
        // 模拟文件下载
        simulateFileDownload(fileName);
        
        // 2秒后返回列表页面
        setTimeout(function() {
            window.location.href = 'group-cost-items.html';
        }, 2000);
    }, 2000);
}

// 获取导出设置
function getExportSettings() {
    // 获取时间范围
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const startDate = dateInputs[0].value;
    const endDate = dateInputs[1].value;
    
    // 获取费用分类
    const categorySelect = document.querySelector('select:nth-of-type(1)');
    const category = categorySelect.value;
    
    // 获取状态
    const statusSelect = document.querySelector('select:nth-of-type(2)');
    const status = statusSelect.value;
    
    // 获取导出格式
    const formatSelect = document.querySelector('select:nth-of-type(3)');
    const format = formatSelect.value;
    
    // 获取字段选择
    const fieldCheckboxes = document.querySelectorAll('input[type="checkbox"]:not(#select-all)');
    const fields = Array.from(fieldCheckboxes).map(checkbox => ({
        name: checkbox.nextElementSibling.textContent,
        selected: checkbox.checked
    }));
    
    return {
        dateRange: { startDate, endDate },
        category,
        status,
        format,
        fields
    };
}

// 模拟文件下载
function simulateFileDownload(fileName) {
    // 创建一个临时的下载链接
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 显示通知
function showNotification(message, type) {
    const container = document.getElementById('notification-container');
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `px-6 py-4 rounded-lg shadow-lg mb-4 flex items-center transform transition-all duration-300 ease-in-out ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-500 text-white'
    }`;
    notification.innerHTML = `
        ${type === 'success' ? '<i class="fas fa-check-circle mr-2"></i>' : ''}
        ${type === 'error' ? '<i class="fas fa-exclamation-circle mr-2"></i>' : ''}
        <span>${message}</span>
    `;
    
    // 添加到容器
    container.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        notification.remove();
    }, 3000);
}