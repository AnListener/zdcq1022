// 附着物台账页面的JavaScript代码
// 导入公共功能模块
import { initFilterToggle, initStatsToggle, initRegionTreeToggle, initTreeNodeToggle, selectTreeNode, selectSubTreeNode, initModalClose } from './common/common-functions.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing attached account page functionality');
    
    // 初始化公共功能
    initFilterToggle('toggle-filters', 'filter-section', 'filter-arrow');
    initStatsToggle('toggle-stats', 'stats-section', 'stats-arrow');
    initRegionTreeToggle('region-tree-toggle', '.region-tree-container');
    initTreeNodeToggle();
    
    // 将公共函数暴露到全局作用域，以支持HTML中直接调用
    window.selectTreeNode = selectTreeNode;
    window.selectSubTreeNode = selectSubTreeNode;
    
    // 新增、导入、预览等按钮功能
    const addAttachedBtn = document.getElementById('add-attached-btn');
    
    // 点击新增按钮在主内容区内打开新增页面
    if (addAttachedBtn) {
        addAttachedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // 在主内容区内打开附着物新增页面
            window.parent.loadPage('/account/new-attached-form.html');
        });
    }
    
    const importAttachedBtn = document.getElementById('import-attached-btn');
    const importAttachedModal = document.getElementById('import-attached-modal');
    const cancelImportAttached = document.getElementById('cancel-import-attached');
    const confirmImportAttached = document.getElementById('confirm-import-attached');
    const fileInputAttached = document.getElementById('file-upload-attached');
    
    const exportAttachedBtn = document.getElementById('export-attached-btn');
    const exportAttachedModal = document.getElementById('export-attached-modal');
    const cancelExportAttached = document.getElementById('cancel-export-attached');
    const confirmExportAttached = document.getElementById('confirm-export-attached');
    
    const reportPreviewBtn = document.getElementById('preview-report-btn');
    const reportPreviewModal = document.getElementById('report-preview-modal');
    const closeReportPreview = document.getElementById('close-report-preview');
    
    // 隐藏新增附属物模态框相关代码已移除，改用新页面方式
    
    // 显示导入附属物模态框
    if (importAttachedBtn && importAttachedModal) {
        importAttachedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            importAttachedModal.classList.remove('hidden');
        });
    }
    
    // 隐藏导入附属物模态框
    if (cancelImportAttached && importAttachedModal) {
        cancelImportAttached.addEventListener('click', function(e) {
            e.preventDefault();
            importAttachedModal.classList.add('hidden');
            // 重置文件输入
            if (fileInputAttached) {
                fileInputAttached.value = '';
            }
        });
    }
    
    // 确认导入附属物数据
    if (confirmImportAttached && importAttachedModal) {
        confirmImportAttached.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (fileInputAttached && fileInputAttached.files.length === 0) {
                alert('请选择要导入的文件。');
                return;
            }
            
            // 显示导入过程中的加载状态
            const importLoader = document.getElementById('import-loader');
            const importButtonText = confirmImportAttached.innerHTML;
            
            if (importLoader) {
                importLoader.classList.remove('hidden');
            }
            confirmImportAttached.disabled = true;
            confirmImportAttached.innerHTML = '导入中...';
            
            // 模拟导入过程
            setTimeout(function() {
                // 恢复按钮状态
                if (importLoader) {
                    importLoader.classList.add('hidden');
                }
                confirmImportAttached.disabled = false;
                confirmImportAttached.innerHTML = importButtonText;
                
                // 隐藏模态框并显示成功消息
                importAttachedModal.classList.add('hidden');
                alert('附着物数据导入成功！');
                
                // 重置文件输入
                if (fileInputAttached) {
                    fileInputAttached.value = '';
                }
            }, 1500);
        });
    }
    
    // 显示导出附属物模态框
    if (exportAttachedBtn && exportAttachedModal) {
        exportAttachedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            exportAttachedModal.classList.remove('hidden');
        });
    }
    
    // 隐藏导出附属物模态框
    if (cancelExportAttached && exportAttachedModal) {
        cancelExportAttached.addEventListener('click', function(e) {
            e.preventDefault();
            exportAttachedModal.classList.add('hidden');
        });
    }
    
    // 确认导出附属物数据
    if (confirmExportAttached && exportAttachedModal) {
        confirmExportAttached.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 显示导出过程中的加载状态
            const exportLoader = document.getElementById('export-loader');
            const exportButtonText = confirmExportAttached.innerHTML;
            
            if (exportLoader) {
                exportLoader.classList.remove('hidden');
            }
            confirmExportAttached.disabled = true;
            confirmExportAttached.innerHTML = '导出中...';
            
            // 模拟导出过程
            setTimeout(function() {
                // 恢复按钮状态
                if (exportLoader) {
                    exportLoader.classList.add('hidden');
                }
                confirmExportAttached.disabled = false;
                confirmExportAttached.innerHTML = exportButtonText;
                
                // 隐藏模态框并显示成功消息
                exportAttachedModal.classList.add('hidden');
                alert('附着物数据导出成功！');
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
    
    // 表单提交事件 - 检查是否存在相关元素
    const addAttachedForm = document.getElementById('add-attached-form');
    const addAttachedModal = document.getElementById('add-attached-modal');
    
    if (addAttachedForm) {
        addAttachedForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(addAttachedForm);
            const attachedData = {};
            for (let [key, value] of formData.entries()) {
                attachedData[key] = value;
            }
            
            console.log('Attached data to save:', attachedData);
            
            // 重置表单并关闭模态框
            addAttachedForm.reset();
            if (addAttachedModal) {
                addAttachedModal.classList.add('hidden');
            }
            
            // 显示成功消息
            alert('附属物信息保存成功！');
        });
    }
    
    // 查看、编辑、删除按钮功能
    const viewButtons = document.querySelectorAll('.view-attached-btn');
    const editButtons = document.querySelectorAll('.edit-attached-btn');
    const deleteButtons = document.querySelectorAll('.delete-attached-btn');
    
    // 批量删除功能
    const batchDeleteBtn = document.getElementById('batch-delete-btn');
    const checkboxAll = document.querySelector('thead input[type="checkbox"]');
    const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
    
    // 查看功能
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const attachedId = this.getAttribute('data-id');
            console.log('Viewing attached with ID:', attachedId);
            // 在主内容区内打开附着物查看页面
            window.parent.loadPage('/account/view-attached-form.html?id=' + attachedId);
        });
    });
    
    // 编辑功能
    editButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const attachedId = this.getAttribute('data-id');
            console.log('Editing attached with ID:', attachedId);
            // 在主内容区内打开附着物编辑页面
            window.parent.loadPage('/account/edit-attached-form.html?id=' + attachedId);
        });
    });
    
    // 删除功能
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const attachedId = this.getAttribute('data-id');
            
            if (confirm('确定要删除这条附着物记录吗？此操作不可撤销。')) {
                console.log('Deleting attached with ID:', attachedId);
                // 这里添加实际的删除逻辑
                alert('附着物记录已删除！');
                // 移除该行
                this.closest('tr').remove();
                // 更新批量删除按钮状态
                updateBatchDeleteButton();
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
        });
    }
    
    // 单个复选框变化时更新全选状态
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSelectAllCheckbox();
            updateBatchDeleteButton();
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
                    const attachedId = row.querySelector('.delete-attached-btn').getAttribute('data-id');
                    selectedIds.push(attachedId);
                }
            });
            
            if (selectedIds.length === 0) {
                alert('请至少选择一条记录进行删除。');
                return;
            }
            
            if (confirm(`确定要删除选中的 ${selectedIds.length} 条附着物记录吗？此操作不可撤销。`)) {
                console.log('Batch deleting attached items with IDs:', selectedIds);
                // 这里添加实际的批量删除逻辑
                alert('选中的附着物记录已删除！');
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
    
    // 初始化批量删除按钮状态
    updateBatchDeleteButton();
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (addAttachedModal && !addAttachedModal.classList.contains('hidden')) {
                if (addAttachedForm) {
                    addAttachedForm.reset();
                }
                addAttachedModal.classList.add('hidden');
            }
            
            if (importAttachedModal && !importAttachedModal.classList.contains('hidden')) {
                if (fileInputAttached) {
                    fileInputAttached.value = '';
                }
                importAttachedModal.classList.add('hidden');
            }
            
            if (exportAttachedModal && !exportAttachedModal.classList.contains('hidden')) {
                exportAttachedModal.classList.add('hidden');
            }
            
            if (reportPreviewModal && !reportPreviewModal.classList.contains('hidden')) {
                reportPreviewModal.classList.add('hidden');
            }
        }
    });
});