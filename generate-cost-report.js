// 生成费用报表页面的JavaScript功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const cancelBtn = document.getElementById('cancel-btn');
    const nextBtn = document.getElementById('next-btn');
    
    // 绑定取消按钮事件
    cancelBtn.addEventListener('click', function() {
        if (confirm('确定要取消生成报表吗？')) {
            window.history.back();
        }
    });
    
    // 绑定下一步按钮事件
    nextBtn.addEventListener('click', function() {
        // 获取选中的报表类型
        const selectedReportType = document.querySelector('input[name="report-type"]:checked');
        if (!selectedReportType) {
            showNotification('请选择报表类型', 'error');
            return;
        }
        
        // 根据选中的报表类型跳转到相应的参数设置页面
        switch(selectedReportType.id) {
            case 'summary-report':
                window.location.href = 'set-summary-report-params.html';
                break;
            case 'detail-report':
                window.location.href = 'set-detail-report-params.html';
                break;
            case 'comparison-report':
                window.location.href = 'set-comparison-report-params.html';
                break;
            case 'trend-report':
                window.location.href = 'set-trend-report-params.html';
                break;
            default:
                showNotification('未知的报表类型', 'error');
        }
    });
    
    // 为报表类型选项添加点击事件
    const reportTypeOptions = document.querySelectorAll('input[name="report-type"]');
    reportTypeOptions.forEach(option => {
        option.addEventListener('change', function() {
            // 移除所有选项的选中样式
            document.querySelectorAll('.border-indigo-500').forEach(el => {
                el.classList.remove('border-indigo-500');
            });
            
            // 为选中的选项添加样式
            if (this.checked) {
                this.closest('.border').classList.add('border-indigo-500');
            }
        });
    });
});

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