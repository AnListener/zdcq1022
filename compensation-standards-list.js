// 补偿标准清单页面的JavaScript代码

// 区域树节点展开/折叠功能
function selectTreeNode(id) {
    const arrow = document.getElementById(id + '-arrow');
    const children = document.getElementById(id + '-children');
    
    if (arrow && children) {
        arrow.classList.toggle('rotate-180');
        children.style.display = children.style.display === 'none' ? 'block' : 'none';
    }
}

// 子区域节点选择功能
function selectSubTreeNode(parentId, childId) {
    // 这里可以添加选择子区域的逻辑
    console.log('Selected sub node:', parentId, childId);
}

document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面功能
    console.log('Initializing compensation standards list page');
    
    // 初始化区域树功能
    initRegionTree();
    
    // 初始化筛选功能
    initFilters();
    
    // 初始化表格操作
    initTableActions();
    
    // 初始化分页功能
    initPagination();
});

// 初始化筛选功能
function initFilters() {
    const filterToggle = document.getElementById('toggle-filters');
    const filterSection = document.getElementById('filter-section');
    const filterArrow = document.getElementById('filter-arrow');
    
    // 筛选区域折叠/展开功能
    if (filterToggle && filterSection && filterArrow) {
        filterToggle.addEventListener('click', function() {
            filterSection.classList.toggle('hidden');
            filterArrow.classList.toggle('rotate-180');
            
            const textSpan = filterToggle.querySelector('span');
            if (filterSection.classList.contains('hidden')) {
                textSpan.textContent = '展开筛选';
            } else {
                textSpan.textContent = '收起筛选';
            }
        });
    }
    
    // 搜索按钮功能
    const searchBtn = document.querySelector('.bg-red-500.hover\:bg-red-600:has(> i.fa-search)');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
    }
    
    // 重置按钮功能
    const resetBtn = document.querySelector('.bg-gray-500.hover\:bg-gray-600:has(> i.fa-redo)');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetFilters();
        });
    }
}

// 执行搜索
function performSearch() {
    // 获取筛选条件
    const regionSelect = document.querySelector('select:nth-of-type(1)'); // 区域下拉框
    const typeSelect = document.querySelector('select:nth-of-type(2)'); // 土地/房屋类型下拉框
    const standardTypeSelect = document.querySelector('select:nth-of-type(3)'); // 标准类型下拉框
    
    const searchCriteria = {
        region: regionSelect ? regionSelect.value : '',
        type: typeSelect ? typeSelect.value : '',
        standardType: standardTypeSelect ? standardTypeSelect.value : ''
    };
    
    console.log('Performing search with criteria:', searchCriteria);
    
    // 这里可以实现搜索逻辑
    // 模拟搜索延迟
    showNotification('搜索完成', 'success');
}

// 重置筛选条件
function resetFilters() {
    const selectElements = document.querySelectorAll('#filter-section select');
    
    selectElements.forEach(select => {
        select.value = select.options[0].value;
    });
    
    console.log('Filters reset');
    showNotification('筛选条件已重置', 'info');
}

// 初始化表格操作
function initTableActions() {
    // 详情按钮功能
    const detailButtons = document.querySelectorAll('button:has(> i.fa-eye)');
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            showStandardDetail();
        });
    });
}

// 显示标准详情
function showStandardDetail() {
    // 跳转到标准详情页面
    window.location.href = 'standard-detail.html';
}

// 初始化分页功能
function initPagination() {
    const paginationButtons = document.querySelectorAll('.px-3.py-1.rounded-lg:not(.bg-red-500)');
    
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

// 初始化区域树功能
function initRegionTree() {
    // 区域树折叠按钮
    const toggle = document.getElementById('region-tree-toggle');
    const container = document.querySelector('.region-tree-container');
    
    if (toggle && container) {
        toggle.addEventListener('click', function() {
            container.classList.toggle('region-tree-collapsed');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-chevron-left');
                icon.classList.toggle('fa-chevron-right');
            }
        });
    }
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
        notification.remove();
    }, 3000);
}