// 协议台账页面的JavaScript代码
// 导入公共功能模块
import { initFilterToggle, initStatsToggle, initRegionTreeToggle, initTreeNodeToggle, selectTreeNode, selectSubTreeNode, initModalClose } from './common/common-functions.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing agreement account page functionality');
    
    // 初始化公共功能
    initFilterToggle('toggle-filters', 'filter-section', 'filter-arrow');
    initStatsToggle('toggle-stats', 'stats-section', 'stats-arrow');
    initRegionTreeToggle('region-tree-toggle', '.region-tree-container');
    initTreeNodeToggle();
    
    // 将公共函数暴露到全局作用域，以支持HTML中直接调用
    window.selectTreeNode = selectTreeNode;
    window.selectSubTreeNode = selectSubTreeNode;
    
    // 新增、导入、预览等按钮功能
    const addAgreementBtn = document.getElementById('add-agreement-btn');
    const addAgreementModal = document.getElementById('add-agreement-modal');
    const cancelAddAgreement = document.getElementById('cancel-add-agreement');
    const addAgreementForm = document.getElementById('add-agreement-form');
    
    const importAgreementBtn = document.getElementById('import-agreement-btn');
    const importAgreementModal = document.getElementById('import-agreement-modal');
    const cancelImportAgreement = document.getElementById('cancel-import-agreement');
    
    const reportPreviewBtn = document.getElementById('preview-report-btn');
    const reportPreviewModal = document.getElementById('report-preview-modal');
    const closeReportPreview = document.getElementById('close-report-preview');
    
    // 显示新增协议模态框
    if (addAgreementBtn && addAgreementModal) {
        addAgreementBtn.addEventListener('click', function(e) {
            e.preventDefault();
            addAgreementModal.classList.remove('hidden');
        });
    }
    
    // 隐藏新增协议模态框
    if (cancelAddAgreement && addAgreementModal) {
        cancelAddAgreement.addEventListener('click', function(e) {
            e.preventDefault();
            if (addAgreementForm) {
                addAgreementForm.reset();
            }
            addAgreementModal.classList.add('hidden');
        });
    }
    
    // 显示导入协议模态框
    if (importAgreementBtn && importAgreementModal) {
        importAgreementBtn.addEventListener('click', function(e) {
            e.preventDefault();
            importAgreementModal.classList.remove('hidden');
        });
    }
    
    // 隐藏导入协议模态框
    if (cancelImportAgreement && importAgreementModal) {
        cancelImportAgreement.addEventListener('click', function(e) {
            e.preventDefault();
            importAgreementModal.classList.add('hidden');
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
    if (addAgreementForm) {
        addAgreementForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(addAgreementForm);
            const agreementData = {};
            for (let [key, value] of formData.entries()) {
                agreementData[key] = value;
            }
            
            console.log('Agreement data to save:', agreementData);
            
            // 重置表单并关闭模态框
            addAgreementForm.reset();
            addAgreementModal.classList.add('hidden');
            
            // 显示成功消息
            alert('协议信息保存成功！');
        });
    }
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (addAgreementModal && !addAgreementModal.classList.contains('hidden')) {
                if (addAgreementForm) {
                    addAgreementForm.reset();
                }
                addAgreementModal.classList.add('hidden');
            }
            
            if (importAgreementModal && !importAgreementModal.classList.contains('hidden')) {
                importAgreementModal.classList.add('hidden');
            }
            
            if (reportPreviewModal && !reportPreviewModal.classList.contains('hidden')) {
                reportPreviewModal.classList.add('hidden');
            }
        }
    });
});