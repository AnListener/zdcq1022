// 导入费用项页面的JavaScript功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const cancelBtn = document.getElementById('cancel-btn');
    const nextBtn = document.getElementById('next-btn');
    const fileInput = document.getElementById('file-input');
    
    // 绑定取消按钮事件
    cancelBtn.addEventListener('click', function() {
        if (confirm('确定要取消导入吗？')) {
            window.history.back();
        }
    });
    
    // 绑定下一步按钮事件
    nextBtn.addEventListener('click', function() {
        // 这里应该处理文件上传和数据映射
        showNotification('开始处理文件...', 'info');
        
        // 模拟处理过程
        setTimeout(function() {
            window.location.href = 'map-cost-items.html';
        }, 1500);
    });
    
    // 绑定文件选择事件
    fileInput.addEventListener('change', function() {
        handleFileSelect(this.files);
    });
    
    // 绑定拖拽上传事件
    const dropArea = document.querySelector('.border-2.border-dashed');
    if (dropArea) {
        dropArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('border-indigo-500');
        });
        
        dropArea.addEventListener('dragleave', function() {
            this.classList.remove('border-indigo-500');
        });
        
        dropArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('border-indigo-500');
            handleFileSelect(e.dataTransfer.files);
        });
        
        // 点击上传区域时触发文件选择
        dropArea.addEventListener('click', function() {
            fileInput.click();
        });
    }
});

// 处理文件选择
function handleFileSelect(files) {
    if (files.length === 0) return;
    
    const file = files[0];
    const fileName = file.name;
    const fileSize = (file.size / 1024 / 1024).toFixed(2); // 转换为MB
    
    // 验证文件类型
    if (!fileName.endsWith('.xlsx') && !fileName.endsWith('.xls')) {
        showNotification('请上传 Excel 文件 (.xlsx, .xls)', 'error');
        return;
    }
    
    // 验证文件大小
    if (file.size > 10 * 1024 * 1024) { // 10MB
        showNotification('文件大小不能超过 10MB', 'error');
        return;
    }
    
    // 显示文件信息
    showNotification(`已选择文件: ${fileName} (${fileSize}MB)`, 'success');
    
    // 启用下一步按钮
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.classList.remove('opacity-50');
    }
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