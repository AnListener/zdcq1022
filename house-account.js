// 房屋台账页面的JavaScript代码
// 导入公共功能模块
import { initFilterToggle, initStatsToggle, initRegionTreeToggle, initTreeNodeToggle, selectTreeNode, selectSubTreeNode, initModalClose } from './common/common-functions.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing house account page functionality');
    
    // 初始化公共功能
    initFilterToggle('collapse-filter-btn', 'filter-section', 'filter-arrow');
    initStatsToggle('toggle-stats', 'stats-section', 'stats-arrow');
    initRegionTreeToggle('region-tree-toggle', '.region-tree-container');
    initTreeNodeToggle();
    
    // 将公共函数暴露到全局作用域，以支持HTML中直接调用
    window.selectTreeNode = selectTreeNode;
    window.selectSubTreeNode = selectSubTreeNode;
    
    // 新增、导入、预览等按钮功能
    const addHouseBtn = document.getElementById('add-house-btn');
    
    // 点击新增按钮在主内容区内打开新增页面
    if (addHouseBtn) {
        addHouseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // 在主内容区内打开房屋新增页面
            window.parent.loadPage('/account/new-house-form.html');
        });
    }
    
    const importHouseBtn = document.getElementById('import-house-btn');
    const importHouseModal = document.getElementById('import-house-modal');
    const cancelImportHouse = document.querySelectorAll('#import-house-modal button[id="cancel-import-house"]');
    const confirmImportHouse = document.getElementById('confirm-import-house');
    const fileInputHouse = document.getElementById('file-upload-house');
    
    const reportPreviewBtn = document.getElementById('preview-report-btn');
    const reportPreviewModal = document.getElementById('report-preview-modal');
    const closeReportPreview = document.getElementById('close-report-preview');
    
    const exportHouseBtn = document.getElementById('export-house-btn');
    const exportHouseModal = document.getElementById('export-house-modal');
    const cancelExportHouse = document.querySelectorAll('#export-house-modal button[id="cancel-export-house"]');
    const confirmExportHouse = document.getElementById('confirm-export-house');
    
    // 隐藏新增房屋模态框相关代码已移除，改用新页面方式
    
    // 显示导入房屋模态框
    if (importHouseBtn && importHouseModal) {
        importHouseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            importHouseModal.classList.remove('hidden');
        });
    }
    
    // 隐藏导入房屋模态框 - 处理多个取消按钮
    if (cancelImportHouse && importHouseModal) {
        cancelImportHouse.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                importHouseModal.classList.add('hidden');
                // 重置文件输入
                if (fileInputHouse) {
                    fileInputHouse.value = '';
                }
            });
        });
    }
    
    // 确认导入房屋数据
    if (confirmImportHouse && importHouseModal) {
        confirmImportHouse.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (fileInputHouse && fileInputHouse.files.length === 0) {
                alert('请选择要导入的文件。');
                return;
            }
            
            // 显示导入过程中的加载状态
            const importLoader = document.getElementById('import-loader');
            const importButtonText = confirmImportHouse.innerHTML;
            
            if (importLoader) {
                importLoader.classList.remove('hidden');
            }
            confirmImportHouse.disabled = true;
            confirmImportHouse.innerHTML = '导入中...';
            
            // 模拟导入过程
            setTimeout(function() {
                // 恢复按钮状态
                if (importLoader) {
                    importLoader.classList.add('hidden');
                }
                confirmImportHouse.disabled = false;
                confirmImportHouse.innerHTML = importButtonText;
                
                // 隐藏模态框并显示成功消息
                importHouseModal.classList.add('hidden');
                showNotification('房屋数据导入成功！', 'success');
                
                // 重置文件输入
                if (fileInputHouse) {
                    fileInputHouse.value = '';
                }
                
                // 可以在这里添加刷新数据的逻辑
                refreshHouseData();
            }, 1500);
        });
    }
    
    // 显示导出房屋模态框
    if (exportHouseBtn && exportHouseModal) {
        exportHouseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            exportHouseModal.classList.remove('hidden');
        });
    }
    
    // 隐藏导出房屋模态框 - 处理多个取消按钮
    if (cancelExportHouse && exportHouseModal) {
        cancelExportHouse.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                exportHouseModal.classList.add('hidden');
            });
        });
    }
    
    // 确认导出房屋数据
    if (confirmExportHouse && exportHouseModal) {
        confirmExportHouse.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取导出格式和范围
            const exportFormat = document.querySelector('#export-house-modal select')?.value || 'excel';
            const exportRange = document.querySelector('#export-house-modal input[name="export-range"]:checked')?.value || 'all';
            
            console.log(`Exporting houses in ${exportFormat} format, range: ${exportRange}`);
            
            // 显示导出过程中的加载状态
            const exportLoader = document.getElementById('export-loader');
            const exportButtonText = confirmExportHouse.innerHTML;
            
            if (exportLoader) {
                exportLoader.classList.remove('hidden');
            }
            confirmExportHouse.disabled = true;
            confirmExportHouse.innerHTML = '导出中...';
            
            // 模拟导出过程
            setTimeout(function() {
                // 恢复按钮状态
                if (exportLoader) {
                    exportLoader.classList.add('hidden');
                }
                confirmExportHouse.disabled = false;
                confirmExportHouse.innerHTML = exportButtonText;
                
                // 隐藏模态框并显示成功消息
                exportHouseModal.classList.add('hidden');
                showNotification('房屋数据导出成功！', 'success');
            }, 1500);
        });
    }
    
    // 显示报告预览模态框
    if (reportPreviewBtn && reportPreviewModal) {
        reportPreviewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            reportPreviewModal.classList.remove('hidden');
        });
    }
    
    // 隐藏报告预览模态框
    if (closeReportPreview && reportPreviewModal) {
        closeReportPreview.addEventListener('click', function(e) {
            e.preventDefault();
            reportPreviewModal.classList.add('hidden');
        });
    }
    
    // 报告预览中的下载PDF功能
    const downloadPdfBtn = document.querySelector('#report-preview-modal button:has(.fa-download)');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Downloading PDF report');
            showNotification('PDF报告下载中，请稍候...');
            
            // 模拟下载过程
            setTimeout(function() {
                showNotification('PDF报告下载完成！', 'success');
            }, 1500);
        });
    }
    
    // 报告预览中的打印功能
    const printReportBtn = document.querySelector('#report-preview-modal button:has(.fa-print)');
    if (printReportBtn) {
        printReportBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Printing report');
            showNotification('即将打开打印对话框...');
            // 实际项目中可以使用window.print()来触发打印
        });
    }
    
    // 查看、编辑、删除按钮功能
    const viewButtons = document.querySelectorAll('.view-house-btn');
    const editButtons = document.querySelectorAll('.edit-house-btn');
    const deleteButtons = document.querySelectorAll('.delete-house-btn');
    
    // 批量删除功能
    const batchDeleteBtn = document.getElementById('batch-delete-btn');
    const checkboxAll = document.querySelector('thead input[type="checkbox"]');
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    const selectedCountEl = document.getElementById('selected-count');
    
    // 查看功能
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const houseId = this.getAttribute('data-id');
            console.log('Viewing house with ID:', houseId);
            // 在主内容区内打开房屋查看页面
            window.parent.loadPage('/account/view-house-form.html?id=' + houseId);
        });
    });
    
    // 编辑功能
    editButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const houseId = this.getAttribute('data-id');
            console.log('Editing house with ID:', houseId);
            // 在主内容区内打开房屋编辑页面
            window.parent.loadPage('/account/edit-house-form.html?id=' + houseId);
        });
    });
    
    // 删除功能
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const houseId = this.getAttribute('data-id');
            
            if (confirm('确定要删除这条房屋记录吗？此操作不可撤销。')) {
                console.log('Deleting house with ID:', houseId);
                // 移除该行
                this.closest('tr').remove();
                // 更新批量删除按钮状态
                updateBatchDeleteButton();
                // 显示成功消息
                showNotification('房屋记录已删除！', 'success');
            }
        });
    });
    
    // 全选/取消全选
    if (checkboxAll) {
        checkboxAll.addEventListener('change', function() {
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            updateBatchDeleteButton();
            updateSelectedCount();
        });
    }
    
    // 单个复选框变化时更新全选状态
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSelectAllCheckbox();
            updateBatchDeleteButton();
            updateSelectedCount();
        });
    });
    
    // 批量删除功能
    if (batchDeleteBtn) {
        batchDeleteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const selectedIds = [];
            
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const row = checkbox.closest('tr');
                    const houseId = row.querySelector('.delete-house-btn')?.getAttribute('data-id');
                    if (houseId) {
                        selectedIds.push(houseId);
                    }
                }
            });
            
            if (selectedIds.length === 0) {
                showNotification('请至少选择一条记录进行删除。', 'error');
                return;
            }
            
            if (confirm(`确定要删除选中的 ${selectedIds.length} 条房屋记录吗？此操作不可撤销。`)) {
                console.log('Batch deleting houses with IDs:', selectedIds);
                // 移除选中行
                checkboxes.forEach(checkbox => {
                    if (checkbox.checked) {
                        checkbox.closest('tr').remove();
                    }
                });
                // 更新全选复选框状态
                if (checkboxAll) {
                    checkboxAll.checked = false;
                }
                // 更新批量删除按钮状态
                updateBatchDeleteButton();
                updateSelectedCount();
                // 显示成功消息
                showNotification(`已成功删除 ${selectedIds.length} 条房屋记录！`, 'success');
            }
        });
    }
    
    // 辅助函数：更新全选复选框状态
    function updateSelectAllCheckbox() {
        if (!checkboxAll) return;
        
        let allChecked = true;
        let anyChecked = false;
        
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                allChecked = false;
            } else {
                anyChecked = true;
            }
        });
        
        checkboxAll.checked = allChecked;
        checkboxAll.indeterminate = anyChecked && !allChecked;
    }
    
    // 辅助函数：更新批量删除按钮状态
    function updateBatchDeleteButton() {
        if (!batchDeleteBtn) return;
        
        let anyChecked = false;
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                anyChecked = true;
            }
        });
        
        if (anyChecked) {
            batchDeleteBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            batchDeleteBtn.disabled = false;
        } else {
            batchDeleteBtn.classList.add('opacity-50', 'cursor-not-allowed');
            batchDeleteBtn.disabled = true;
        }
    }
    
    // 辅助函数：更新选中数量显示
    function updateSelectedCount() {
        if (!selectedCountEl) return;
        
        let count = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                count++;
            }
        });
        
        selectedCountEl.textContent = count;
    }
    
    // 辅助函数：显示通知消息
    function showNotification(message, type = 'info') {
        // 检查是否已存在通知元素
        let notification = document.getElementById('notification');
        if (!notification) {
            // 创建通知元素
            notification = document.createElement('div');
            notification.id = 'notification';
            notification.className = 'fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full';
            document.body.appendChild(notification);
        }
        
        // 设置通知样式和内容
        notification.textContent = message;
        
        // 移除之前的类型类
        notification.classList.remove('bg-green-500', 'bg-red-500', 'bg-blue-500', 'text-white');
        
        // 根据类型设置不同的背景颜色
        if (type === 'success') {
            notification.classList.add('bg-green-500', 'text-white');
        } else if (type === 'error') {
            notification.classList.add('bg-red-500', 'text-white');
        } else {
            notification.classList.add('bg-blue-500', 'text-white');
        }
        
        // 显示通知
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 10);
        
        // 3秒后隐藏通知
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            // 动画完成后移除元素
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // 辅助函数：刷新房屋数据（在导入、删除等操作后调用）
    function refreshHouseData() {
        console.log('Refreshing house data');
        // 实际项目中可以在这里重新请求数据并更新表格
        showNotification('数据已刷新！', 'success');
    }
    
    // 初始化分页功能
    const pageButtons = document.querySelectorAll('.pagination button');
    if (pageButtons.length > 0) {
        pageButtons.forEach(button => {
            if (!button.classList.contains('pagination-prev') && !button.classList.contains('pagination-next')) {
                button.addEventListener('click', function() {
                    // 移除所有页码按钮的活跃状态
                    pageButtons.forEach(btn => {
                        if (!btn.classList.contains('pagination-prev') && !btn.classList.contains('pagination-next')) {
                            btn.classList.remove('bg-blue-500', 'text-white');
                            btn.classList.add('border', 'border-gray-300', 'hover:bg-gray-100');
                        }
                    });
                    
                    // 设置当前页码按钮为活跃状态
                    this.classList.remove('border', 'border-gray-300', 'hover:bg-gray-100');
                    this.classList.add('bg-blue-500', 'text-white');
                    
                    // 在实际项目中，这里应该根据选择的页码加载对应的数据
                    console.log('Loading page:', this.textContent);
                    showNotification(`正在加载第 ${this.textContent} 页数据...`);
                });
            }
        });
        
        // 上一页、下一页按钮功能
        const prevPageBtn = document.querySelector('.pagination button:first-child');
        const nextPageBtn = document.querySelector('.pagination button:last-child');
        const currentPageBtn = document.querySelector('.pagination button.bg-blue-500');
        
        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', function() {
                console.log('Go to previous page');
                // 找到当前激活的页码
                const activePage = document.querySelector('.pagination button.bg-blue-500');
                if (activePage && activePage.previousElementSibling && 
                    !activePage.previousElementSibling.classList.contains('pagination-prev')) {
                    activePage.previousElementSibling.click();
                } else {
                    showNotification('已经是第一页了！', 'info');
                }
            });
        }
        
        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', function() {
                console.log('Go to next page');
                // 找到当前激活的页码
                const activePage = document.querySelector('.pagination button.bg-blue-500');
                if (activePage && activePage.nextElementSibling && 
                    !activePage.nextElementSibling.classList.contains('pagination-next')) {
                    activePage.nextElementSibling.click();
                } else {
                    showNotification('已经是最后一页了！', 'info');
                }
            });
        }
    }
    
    // 初始化批量删除按钮状态
    updateBatchDeleteButton();
    updateSelectedCount();
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // 关闭导入模态框
            if (importHouseModal && !importHouseModal.classList.contains('hidden')) {
                if (fileInputHouse) {
                    fileInputHouse.value = '';
                }
                importHouseModal.classList.add('hidden');
            }
            
            // 关闭导出模态框
            if (exportHouseModal && !exportHouseModal.classList.contains('hidden')) {
                exportHouseModal.classList.add('hidden');
            }
            
            // 关闭报告预览模态框
            if (reportPreviewModal && !reportPreviewModal.classList.contains('hidden')) {
                reportPreviewModal.classList.add('hidden');
            }
        }
    });
    
    // 点击模态框外部关闭模态框
    const modals = [importHouseModal, exportHouseModal, reportPreviewModal];
    modals.forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.classList.add('hidden');
                    // 重置文件输入
                    if (modal.id === 'import-house-modal' && fileInputHouse) {
                        fileInputHouse.value = '';
                    }
                }
            });
        }
    });
    
    // 搜索功能
    const searchBtn = document.querySelector('#filter-section button:has(.fa-search)');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const houseNumber = document.querySelector('#filter-section input[placeholder="请输入房屋编号"]')?.value || '';
            const ownerName = document.querySelector('#filter-section input[placeholder="请输入权属人"]')?.value || '';
            const region = document.querySelector('#filter-section select')?.value || '';
            const status = document.querySelectorAll('#filter-section select')[1]?.value || '';
            
            console.log(`Searching houses with filters: number=${houseNumber}, owner=${ownerName}, region=${region}, status=${status}`);
            showNotification('正在搜索数据...');
            
            // 模拟搜索过程
            setTimeout(() => {
                showNotification('搜索完成！', 'success');
            }, 1000);
        });
    }
    
    // 重置筛选条件
    const resetBtn = document.querySelector('#filter-section button:contains("重置")');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            const filterInputs = document.querySelectorAll('#filter-section input, #filter-section select');
            filterInputs.forEach(input => {
                input.value = '';
            });
            
            console.log('Reset filters');
            showNotification('筛选条件已重置！', 'info');
        });
    }
});