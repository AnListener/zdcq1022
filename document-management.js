// 征拆资料管理模块JavaScript

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面功能
    initPageFunctions();
});

/**
 * 初始化页面功能
 */
function initPageFunctions() {
    // 初始化筛选区域展开/折叠功能
    initFilterToggle();
    
    // 初始化分类导航交互
    initCategoryNavigation();
    
    // 初始化按钮事件
    initButtonEvents();
    
    // 初始化表格操作功能
    initTableOperations();
    
    // 初始化分页功能
    initPagination();
    
    // 初始化快速访问功能
    initQuickAccess();
}

/**
 * 初始化筛选区域展开/折叠功能
 */
function initFilterToggle() {
    const toggleButton = document.getElementById('toggle-filters');
    const filterSection = document.getElementById('filter-section');
    const filterArrow = document.getElementById('filter-arrow');
    
    toggleButton.addEventListener('click', function() {
        const isVisible = filterSection.style.maxHeight && filterSection.style.maxHeight !== '0px';
        
        if (isVisible) {
            // 折叠筛选区域
            filterSection.style.maxHeight = '0px';
            filterSection.style.marginBottom = '0px';
            filterSection.style.overflow = 'hidden';
            filterArrow.style.transform = 'rotate(180deg)';
        } else {
            // 展开筛选区域
            filterSection.style.maxHeight = filterSection.scrollHeight + 'px';
            filterSection.style.marginBottom = '24px';
            filterArrow.style.transform = 'rotate(0deg)';
        }
    });
    
    // 初始状态保持展开
    filterSection.style.maxHeight = filterSection.scrollHeight + 'px';
}

/**
 * 初始化分类导航交互
 */
function initCategoryNavigation() {
    const categoryItems = document.querySelectorAll('.lg\:w-1\/4 .flex.items-center');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除所有项目的选中状态
            categoryItems.forEach(cat => {
                cat.classList.remove('bg-blue-50');
                cat.classList.add('hover:bg-gray-100');
            });
            
            // 添加当前项目的选中状态
            this.classList.add('bg-blue-50');
            this.classList.remove('hover:bg-gray-100');
            
            // 模拟加载对应分类的资料
            const categoryName = this.querySelector('span').textContent;
            loadCategoryDocuments(categoryName);
        });
    });
}

/**
 * 加载特定分类的资料
 * @param {string} categoryName - 分类名称
 */
function loadCategoryDocuments(categoryName) {
    // 这里模拟加载数据，实际应从后端获取
    console.log(`加载分类: ${categoryName} 的资料`);
    
    // 显示加载状态
    showLoadingState();
    
    // 模拟网络延迟
    setTimeout(function() {
        // 恢复原始数据或根据分类显示不同数据
        hideLoadingState();
        
        // 可以在这里根据分类筛选表格数据
        // 实际应用中应替换为真实的数据加载逻辑
    }, 500);
}

/**
 * 初始化按钮事件
 */
function initButtonEvents() {
    // 新增资料按钮
    const addDocumentBtn = document.querySelector('button:has(.fa-plus)');
    addDocumentBtn.addEventListener('click', function() {
        showAddDocumentModal();
    });
    
    // 批量上传按钮
    const batchUploadBtn = document.querySelector('button:has(.fa-upload)');
    batchUploadBtn.addEventListener('click', function() {
        showBatchUploadModal();
    });
    
    // 新建分类按钮
    const newCategoryBtn = document.querySelector('button:has(.fa-folder-plus)');
    newCategoryBtn.addEventListener('click', function() {
        showNewCategoryModal();
    });
    
    // 删除所选按钮
    const deleteSelectedBtn = document.querySelector('button:has(.fa-trash)');
    deleteSelectedBtn.addEventListener('click', function() {
        deleteSelectedDocuments();
    });
    
    // 下载所选按钮
    const downloadSelectedBtn = document.querySelector('button:has(.fa-download)');
    downloadSelectedBtn.addEventListener('click', function() {
        downloadSelectedDocuments();
    });
    
    // 分享按钮
    const shareBtn = document.querySelector('button:has(.fa-share-alt)');
    shareBtn.addEventListener('click', function() {
        showShareModal();
    });
    
    // 搜索按钮
    const searchBtn = document.querySelector('button:has(.fa-search)');
    searchBtn.addEventListener('click', function() {
        performSearch();
    });
    
    // 重置按钮
    const resetBtn = document.querySelector('button:has(.fa-redo)');
    resetBtn.addEventListener('click', function() {
        resetSearchFilters();
    });
    
    // 视图切换按钮
    const listViewBtn = document.querySelector('button:has(.fa-list)');
    const gridViewBtn = document.querySelector('button:has(.fa-th-large)');
    
    listViewBtn.addEventListener('click', function() {
        switchToTableView();
        listViewBtn.classList.add('bg-blue-50', 'text-blue-500');
        listViewBtn.classList.remove('text-gray-500');
        gridViewBtn.classList.remove('bg-blue-50', 'text-blue-500');
        gridViewBtn.classList.add('text-gray-500');
    });
    
    gridViewBtn.addEventListener('click', function() {
        switchToGridView();
        gridViewBtn.classList.add('bg-blue-50', 'text-blue-500');
        gridViewBtn.classList.remove('text-gray-500');
        listViewBtn.classList.remove('bg-blue-50', 'text-blue-500');
        listViewBtn.classList.add('text-gray-500');
    });
}

/**
 * 初始化表格操作功能
 */
function initTableOperations() {
    // 全选/取消全选
    const selectAllCheckbox = document.querySelector('thead input[type="checkbox"]');
    const itemCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    
    selectAllCheckbox.addEventListener('change', function() {
        const isChecked = this.checked;
        itemCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
    });
    
    // 单个资料的查看、下载、编辑、删除操作
    const viewButtons = document.querySelectorAll('button:has(.fa-eye)');
    const downloadButtons = document.querySelectorAll('button:has(.fa-download):not(.bg-green-500)');
    const editButtons = document.querySelectorAll('button:has(.fa-edit)');
    const deleteButtons = document.querySelectorAll('button:has(.fa-trash):not(.bg-red-500)');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const documentName = getDocumentName(this);
            viewDocument(documentName);
        });
    });
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const documentName = getDocumentName(this);
            downloadDocument(documentName);
        });
    });
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const documentName = getDocumentName(this);
            editDocument(documentName);
        });
    });
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const documentName = getDocumentName(this);
            deleteDocument(documentName);
        });
    });
}

/**
 * 从按钮获取对应文档名称
 * @param {HTMLElement} button - 操作按钮
 * @returns {string} 文档名称
 */
function getDocumentName(button) {
    // 查找最近的行
    const row = button.closest('tr');
    // 查找该行中的文档名称
    const nameElement = row.querySelector('.text-sm.font-medium.text-gray-900');
    return nameElement ? nameElement.textContent : '未知文档';
}

/**
 * 初始化分页功能
 */
function initPagination() {
    const paginationButtons = document.querySelectorAll('.pagination button');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有分页按钮的选中状态
            document.querySelectorAll('.pagination button').forEach(btn => {
                btn.classList.remove('bg-blue-50', 'text-blue-600');
                btn.classList.add('bg-white', 'text-gray-700');
            });
            
            // 添加当前分页按钮的选中状态
            if (this.textContent.trim() !== '上一页' && this.textContent.trim() !== '下一页' && this.textContent.trim() !== '...') {
                this.classList.add('bg-blue-50', 'text-blue-600');
                this.classList.remove('bg-white', 'text-gray-700');
                
                // 加载对应页码的数据
                const pageNum = parseInt(this.textContent.trim());
                loadPageData(pageNum);
            }
        });
    });
}

/**
 * 初始化快速访问功能
 */
function initQuickAccess() {
    const quickAccessButtons = document.querySelectorAll('.space-y-2 button');
    
    quickAccessButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accessType = this.querySelector('span').textContent;
            
            if (accessType === '最近访问') {
                loadRecentlyAccessed();
            } else if (accessType === '收藏夹') {
                loadFavorites();
            } else if (accessType === '回收站') {
                loadRecycleBin();
            }
        });
    });
}

/**
 * 显示新增资料模态框
 */
function showAddDocumentModal() {
    // 这里应该显示一个模态框用于上传单个资料
    console.log('显示新增资料模态框');
    alert('新增资料功能待实现');
}

/**
 * 显示批量上传模态框
 */
function showBatchUploadModal() {
    // 这里应该显示一个模态框用于批量上传资料
    console.log('显示批量上传模态框');
    alert('批量上传功能待实现');
}

/**
 * 显示新建分类模态框
 */
function showNewCategoryModal() {
    // 这里应该显示一个模态框用于新建分类
    console.log('显示新建分类模态框');
    alert('新建分类功能待实现');
}

/**
 * 删除所选文档
 */
function deleteSelectedDocuments() {
    const selectedCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
    
    if (selectedCheckboxes.length === 0) {
        alert('请选择要删除的文档');
        return;
    }
    
    if (confirm(`确定要删除选中的 ${selectedCheckboxes.length} 个文档吗？`)) {
        // 执行删除操作
        console.log(`删除 ${selectedCheckboxes.length} 个文档`);
        alert('删除操作待实现');
    }
}

/**
 * 下载所选文档
 */
function downloadSelectedDocuments() {
    const selectedCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
    
    if (selectedCheckboxes.length === 0) {
        alert('请选择要下载的文档');
        return;
    }
    
    console.log(`下载 ${selectedCheckboxes.length} 个文档`);
    alert('下载操作待实现');
}

/**
 * 显示分享模态框
 */
function showShareModal() {
    const selectedCheckboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
    
    if (selectedCheckboxes.length === 0) {
        alert('请选择要分享的文档');
        return;
    }
    
    console.log('显示分享模态框');
    alert('分享功能待实现');
}

/**
 * 执行搜索
 */
function performSearch() {
    const projectName = document.querySelector('select:first-child').value;
    const documentType = document.querySelector('select:nth-child(2)').value;
    const uploadDate = document.querySelector('input[type="date"]').value;
    const uploader = document.querySelector('input[type="text"]').value;
    
    console.log('执行搜索:', {
        projectName,
        documentType,
        uploadDate,
        uploader
    });
    
    showLoadingState();
    
    setTimeout(function() {
        hideLoadingState();
        // 实际应用中应替换为真实的搜索逻辑
        alert('搜索功能待实现');
    }, 500);
}

/**
 * 重置搜索筛选条件
 */
function resetSearchFilters() {
    document.querySelector('select:first-child').value = '全部项目';
    document.querySelector('select:nth-child(2)').value = '全部类型';
    document.querySelector('input[type="date"]').value = '';
    document.querySelector('input[type="text"]').value = '';
    
    console.log('重置搜索筛选条件');
}

/**
 * 查看文档
 * @param {string} documentName - 文档名称
 */
function viewDocument(documentName) {
    console.log(`查看文档: ${documentName}`);
    alert(`查看文档: ${documentName}`);
}

/**
 * 下载文档
 * @param {string} documentName - 文档名称
 */
function downloadDocument(documentName) {
    console.log(`下载文档: ${documentName}`);
    alert(`下载文档: ${documentName}`);
}

/**
 * 编辑文档
 * @param {string} documentName - 文档名称
 */
function editDocument(documentName) {
    console.log(`编辑文档: ${documentName}`);
    alert(`编辑文档: ${documentName}`);
}

/**
 * 删除文档
 * @param {string} documentName - 文档名称
 */
function deleteDocument(documentName) {
    if (confirm(`确定要删除文档 "${documentName}" 吗？`)) {
        console.log(`删除文档: ${documentName}`);
        alert(`删除文档: ${documentName}`);
    }
}

/**
 * 切换到表格视图
 */
function switchToTableView() {
    console.log('切换到表格视图');
    // 实际应用中应显示表格，隐藏网格
}

/**
 * 切换到网格视图
 */
function switchToGridView() {
    console.log('切换到网格视图');
    alert('网格视图待实现');
    // 实际应用中应显示网格，隐藏表格
}

/**
 * 加载页码数据
 * @param {number} pageNum - 页码
 */
function loadPageData(pageNum) {
    console.log(`加载页码: ${pageNum} 的数据`);
    
    showLoadingState();
    
    setTimeout(function() {
        hideLoadingState();
        // 实际应用中应替换为真实的分页数据加载逻辑
    }, 500);
}

/**
 * 加载最近访问的文档
 */
function loadRecentlyAccessed() {
    console.log('加载最近访问的文档');
    
    showLoadingState();
    
    setTimeout(function() {
        hideLoadingState();
        // 实际应用中应替换为真实的最近访问数据加载逻辑
        alert('加载最近访问功能待实现');
    }, 500);
}

/**
 * 加载收藏夹文档
 */
function loadFavorites() {
    console.log('加载收藏夹文档');
    
    showLoadingState();
    
    setTimeout(function() {
        hideLoadingState();
        // 实际应用中应替换为真实的收藏夹数据加载逻辑
        alert('加载收藏夹功能待实现');
    }, 500);
}

/**
 * 加载回收站文档
 */
function loadRecycleBin() {
    console.log('加载回收站文档');
    
    showLoadingState();
    
    setTimeout(function() {
        hideLoadingState();
        // 实际应用中应替换为真实的回收站数据加载逻辑
        alert('加载回收站功能待实现');
    }, 500);
}

/**
 * 显示加载状态
 */
function showLoadingState() {
    // 在实际应用中，这里应该显示一个加载动画
    const tableContainer = document.querySelector('.overflow-x-auto');
    if (tableContainer) {
        tableContainer.style.opacity = '0.5';
    }
}

/**
 * 隐藏加载状态
 */
function hideLoadingState() {
    const tableContainer = document.querySelector('.overflow-x-auto');
    if (tableContainer) {
        tableContainer.style.opacity = '1';
    }
}