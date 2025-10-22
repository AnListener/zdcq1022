// 集团费用项目页面的JavaScript代码
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面功能
    console.log('Initializing group cost items page');
    
    // 初始化筛选功能
    initFilters();
    
    // 初始化表格操作
    initTableActions();
    
    // 初始化分页功能
    initPagination();
});

// 初始化筛选功能
function initFilters() {
    // 筛选区域折叠功能
    const filterToggle = document.getElementById('toggle-filters');
    const filterSection = document.getElementById('filter-section');
    const filterArrow = document.getElementById('filter-arrow');
    
    if (filterToggle && filterSection && filterArrow) {
        filterToggle.addEventListener('click', function() {
            filterSection.classList.toggle('hidden');
            filterArrow.classList.toggle('rotate-180');
            
            const textSpan = filterToggle.querySelector('span');
            if (textSpan) {
                if (filterSection.classList.contains('hidden')) {
                    textSpan.textContent = '展开筛选';
                } else {
                    textSpan.textContent = '收起筛选';
                }
            }
        });
    }
    
    // 搜索按钮功能
    const searchBtn = document.querySelector('.bg-indigo-500.hover\\:bg-indigo-600');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
    }
    
    // 重置按钮功能
    const resetBtn = document.querySelector('.bg-gray-500.hover\\:bg-gray-600');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetFilters();
        });
    }
}

// 执行搜索
function performSearch() {
    // 获取筛选条件
    const costItemInput = document.querySelector('input[placeholder="请输入费用项名称"]');
    const projectInput = document.querySelector('input[placeholder="请输入关联项目"]');
    const categorySelect = document.querySelector('select:nth-of-type(1)'); // 费用分类下拉框
    const statusSelect = document.querySelector('select:nth-of-type(2)'); // 状态下拉框
    
    const searchCriteria = {
        costItem: costItemInput ? costItemInput.value : '',
        project: projectInput ? projectInput.value : '',
        category: categorySelect ? categorySelect.value : '',
        status: statusSelect ? statusSelect.value : ''
    };
    
    console.log('Performing search with criteria:', searchCriteria);
    
    // 这里可以实现搜索逻辑
    // 模拟搜索延迟
    showNotification('搜索完成', 'success');
}

// 重置筛选条件
function resetFilters() {
    const inputElements = document.querySelectorAll('#filter-section input');
    const selectElements = document.querySelectorAll('#filter-section select');
    
    inputElements.forEach(input => {
        input.value = '';
    });
    
    selectElements.forEach(select => {
        select.value = select.options[0].value;
    });
    
    console.log('Filters reset');
    showNotification('筛选条件已重置', 'info');
}

// 初始化表格操作
function initTableActions() {
    // 全选复选框功能
    const selectAllCheckbox = document.querySelector('thead input[type="checkbox"]');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });
    }
    
    // 单个复选框功能
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // 检查是否所有复选框都被选中
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            const anyChecked = Array.from(checkboxes).some(cb => cb.checked);
            
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = allChecked;
                selectAllCheckbox.indeterminate = anyChecked && !allChecked;
            }
        });
    });
    
    // 编辑按钮功能
    const editButtons = document.querySelectorAll('button.text-indigo-600');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            editCostItem();
        });
    });
    
    // 查看按钮功能
    const viewButtons = document.querySelectorAll('button.text-blue-600');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            viewCostItem();
        });
    });
    
    // 删除按钮功能
    const deleteButtons = document.querySelectorAll('button.text-red-600');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            deleteCostItem();
        });
    });
}

// 编辑费用项
function editCostItem() {
    // 跳转到编辑费用项页面
    window.location.href = 'edit-cost-item.html';
}

// 查看费用项详情
function viewCostItem() {
    showNotification('查看费用项详情功能已触发', 'info');
    // 这里可以实现查看费用项详情的逻辑
    // 例如：打开详情模态框
}

// 删除费用项
function deleteCostItem() {
    // 显示确认对话框
    if (confirm('确定要删除该费用项吗？此操作不可撤销。')) {
        showNotification('费用项已删除', 'success');
        // 这里可以实现删除费用项的逻辑
        // 例如：从表格中移除该行
        const deleteButton = event.target.closest('button');
        const row = deleteButton.closest('tr');
        if (row) {
            row.remove();
        }
    }
}

// 初始化分页功能
function initPagination() {
    const paginationButtons = document.querySelectorAll('.px-3.py-1.rounded-lg');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.querySelector('i.fa-chevron-left')) {
                // 上一页
                goToPreviousPage();
            } else if (this.querySelector('i.fa-chevron-right')) {
                // 下一页
                goToNextPage();
            } else {
                // 页码按钮
                const pageNumber = parseInt(this.textContent.trim());
                goToPage(pageNumber);
            }
        });
    });
}

// 跳转到指定页码
function goToPage(pageNumber) {
    console.log('Going to page:', pageNumber);
    showNotification(`已跳转到第 ${pageNumber} 页`, 'info');
}

// 上一页
function goToPreviousPage() {
    console.log('Going to previous page');
    showNotification('已跳转到上一页', 'info');
}

// 下一页
function goToNextPage() {
    console.log('Going to next page');
    showNotification('已跳转到下一页', 'info');
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