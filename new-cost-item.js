// 新增费用项页面的JavaScript代码
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面功能
    console.log('Initializing new cost item page');
    
    // 初始化表单验证
    initFormValidation();
    
    // 初始化按钮事件
    initButtonEvents();
});

// 初始化表单验证
function initFormValidation() {
    // 费用分类选择联动效果
    const categorySelect = document.getElementById('cost-category');
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            // 根据选择的费用分类自动填充相关字段（示例）
            const selectedCategory = this.value;
            console.log('Selected category:', selectedCategory);
            
            // 这里可以添加根据费用分类自动填充其他字段的逻辑
            // 例如：根据不同的费用分类，预设一些默认值或显示/隐藏某些字段
        });
    }
}

// 初始化按钮事件
function initButtonEvents() {
    // 取消按钮事件
    const cancelBtn = document.getElementById('cancel-btn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            // 确认是否取消
            if (confirm('确定要取消新增费用项吗？未保存的数据将会丢失。')) {
                // 返回到集团费用项管理页面
                window.location.href = 'group-cost-items.html';
            }
        });
    }
    
    // 保存按钮事件
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            // 表单验证
            if (validateForm()) {
                // 保存数据
                saveCostItem();
            }
        });
    }
}

// 表单验证
function validateForm() {
    // 获取表单字段
    const name = document.getElementById('cost-item-name').value.trim();
    const category = document.getElementById('cost-category').value;
    const designCost = document.getElementById('design-total-cost').value.trim();
    const reviewCost = document.getElementById('review-total-cost').value.trim();
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
    
    // 验证金额格式
    if (isNaN(designCost) || parseFloat(designCost) <= 0) {
        showNotification('设计总费用必须为大于0的数字', 'error');
        return false;
    }
    
    if (isNaN(reviewCost) || parseFloat(reviewCost) <= 0) {
        showNotification('工可报审稿总费用必须为大于0的数字', 'error');
        return false;
    }
    
    return true;
}

// 保存费用项
function saveCostItem() {
    // 获取表单数据
    const costItemData = {
        name: document.getElementById('cost-item-name').value.trim(),
        category: document.getElementById('cost-category').value,
        designTotalCost: document.getElementById('design-total-cost').value.trim(),
        reviewTotalCost: document.getElementById('review-total-cost').value.trim(),
        totalArea: document.getElementById('total-area').value.trim(),
        status: document.getElementById('status').value,
        description: document.getElementById('cost-item-description').value.trim()
    };
    
    // 这里可以实现保存逻辑
    console.log('Saving cost item:', costItemData);
    
    // 显示保存成功的通知
    showNotification('费用项保存成功', 'success');
    
    // 模拟保存过程，实际项目中应该调用后端API
    setTimeout(function() {
        // 保存成功后返回到集团费用项管理页面
        window.location.href = 'group-cost-items.html';
    }, 1000);
}

// 显示通知消息
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg text-white z-50 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        type === 'warning' ? 'bg-yellow-500' : 
        'bg-blue-500'
    }`;
    notification.textContent = message;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}