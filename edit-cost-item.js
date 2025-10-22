// 编辑费用项页面的JavaScript功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const cancelBtn = document.getElementById('cancel-btn');
    const saveBtn = document.getElementById('save-btn');
    const costCategory = document.getElementById('cost-category');
    
    // 绑定取消按钮事件
    cancelBtn.addEventListener('click', function() {
        if (confirm('确定要取消编辑吗？未保存的更改将会丢失。')) {
            window.history.back();
        }
    });
    
    // 绑定保存按钮事件
    saveBtn.addEventListener('click', function() {
        if (validateForm()) {
            saveCostItem();
        }
    });
    
    // 绑定费用分类选择事件
    costCategory.addEventListener('change', function() {
        handleCategoryChange(this.value);
    });
});

// 表单验证
function validateForm() {
    // 获取表单字段
    const name = document.getElementById('cost-item-name').value.trim();
    const category = document.getElementById('cost-category').value;
    const designCost = document.getElementById('design-total-cost').value.trim();
    const reviewCost = document.getElementById('review-total-cost').value.trim();
    const designArea = document.getElementById('design-area').value.trim();
    const status = document.getElementById('status').value;
    
    // 验证必填字段
    if (!name) {
        showNotification('请输入费用项名称', 'error');
        return false;
    }
    
    if (!category) {
        showNotification('请选择费用分类', 'error');
        return false;
    }
    
    if (!designCost) {
        showNotification('请输入设计总费用', 'error');
        return false;
    }
    
    if (!reviewCost) {
        showNotification('请输入工可报审稿总费用', 'error');
        return false;
    }
    
    if (!designArea) {
        showNotification('请输入总设计面积', 'error');
        return false;
    }
    
    if (!status) {
        showNotification('请选择状态', 'error');
        return false;
    }
    
    // 验证数值字段
    if (isNaN(designCost) || parseFloat(designCost) <= 0) {
        showNotification('设计总费用必须为大于0的数字', 'error');
        return false;
    }
    
    if (isNaN(reviewCost) || parseFloat(reviewCost) <= 0) {
        showNotification('工可报审稿总费用必须为大于0的数字', 'error');
        return false;
    }
    
    if (isNaN(designArea) || parseFloat(designArea) <= 0) {
        showNotification('总设计面积必须为大于0的数字', 'error');
        return false;
    }
    
    return true;
}

// 处理费用分类变化
function handleCategoryChange(category) {
    // 根据选择的费用分类自动填充相关字段
    // 这里可以根据实际业务需求进行扩展
    switch(category) {
        case '征地补偿':
            // 可以预填充一些默认值
            break;
        case '房屋拆迁':
            // 可以预填充一些默认值
            break;
        case '青苗补偿':
            // 可以预填充一些默认值
            break;
        default:
            // 清空相关字段或设置默认值
            break;
    }
}

// 保存费用项
function saveCostItem() {
    // 获取表单数据
    const costItemData = {
        name: document.getElementById('cost-item-name').value.trim(),
        category: document.getElementById('cost-category').value,
        designTotalCost: document.getElementById('design-total-cost').value.trim(),
        reviewTotalCost: document.getElementById('review-total-cost').value.trim(),
        designArea: document.getElementById('design-area').value.trim(),
        status: document.getElementById('status').value,
        remark: document.getElementById('remark').value.trim()
    };
    
    // 这里应该发送数据到服务器保存
    // 模拟保存过程
    console.log('保存费用项数据:', costItemData);
    
    // 显示保存成功的通知
    showNotification('费用项保存成功', 'success');
    
    // 延迟返回到列表页面
    setTimeout(function() {
        window.location.href = 'group-cost-items.html';
    }, 1500);
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