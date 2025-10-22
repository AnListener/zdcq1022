// 审计台账页面的JavaScript代码
// 导入公共功能模块
import { initFilterToggle, initStatsToggle, initRegionTreeToggle, initTreeNodeToggle, selectTreeNode, selectSubTreeNode, initModalClose } from './common/common-functions.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing audit account page functionality');
    
    // 初始化公共功能
    initFilterToggle('toggle-filters', 'filter-section', 'filter-arrow');
    initStatsToggle('toggle-stats', 'stats-section', 'stats-arrow');
    initRegionTreeToggle('region-tree-toggle', '.region-tree-container');
    initTreeNodeToggle();
    
    // 将公共函数暴露到全局作用域，以支持HTML中直接调用
    window.selectTreeNode = selectTreeNode;
    window.selectSubTreeNode = selectSubTreeNode;
    
    // 新增、导入、预览等按钮功能
    const addAuditBtn = document.getElementById('add-audit-btn');
    const addAuditModal = document.getElementById('add-audit-modal');
    const cancelAddAudit = document.getElementById('cancel-add-audit');
    const addAuditForm = document.getElementById('add-audit-form');
    
    const importAuditBtn = document.getElementById('import-audit-btn');
    const importAuditModal = document.getElementById('import-audit-modal');
    const cancelImportAudit = document.getElementById('cancel-import-audit');
    
    const reportPreviewBtn = document.getElementById('preview-report-btn');
    const reportPreviewModal = document.getElementById('report-preview-modal');
    const closeReportPreview = document.getElementById('close-report-preview');
    
    // 显示新增审计模态框
    if (addAuditBtn && addAuditModal) {
        addAuditBtn.addEventListener('click', function(e) {
            e.preventDefault();
            addAuditModal.classList.remove('hidden');
        });
    }
    
    // 隐藏新增审计模态框
    if (cancelAddAudit && addAuditModal) {
        cancelAddAudit.addEventListener('click', function(e) {
            e.preventDefault();
            if (addAuditForm) {
                addAuditForm.reset();
            }
            addAuditModal.classList.add('hidden');
        });
    }
    
    // 显示导入审计模态框
    if (importAuditBtn && importAuditModal) {
        importAuditBtn.addEventListener('click', function(e) {
            e.preventDefault();
            importAuditModal.classList.remove('hidden');
        });
    }
    
    // 隐藏导入审计模态框
    if (cancelImportAudit && importAuditModal) {
        cancelImportAudit.addEventListener('click', function(e) {
            e.preventDefault();
            importAuditModal.classList.add('hidden');
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
    
    // 表单提交事件
    if (addAuditForm) {
        addAuditForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(addAuditForm);
            const auditData = {};
            for (let [key, value] of formData.entries()) {
                auditData[key] = value;
            }
            
            console.log('Audit data to save:', auditData);
            
            // 重置表单并关闭模态框
            addAuditForm.reset();
            addAuditModal.classList.add('hidden');
            
            // 显示成功消息
            alert('审计信息保存成功！');
        });
    }
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (addAuditModal && !addAuditModal.classList.contains('hidden')) {
                if (addAuditForm) {
                    addAuditForm.reset();
                }
                addAuditModal.classList.add('hidden');
            }
            
            if (importAuditModal && !importAuditModal.classList.contains('hidden')) {
                importAuditModal.classList.add('hidden');
            }
            
            if (reportPreviewModal && !reportPreviewModal.classList.contains('hidden')) {
                reportPreviewModal.classList.add('hidden');
            }
        }
    });
});