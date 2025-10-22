// 补偿标准管理页面的JavaScript代码
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面功能
    console.log('Initializing compensation standards management page');
    
    // 初始化标签页切换功能
    initTabs();
    
    // 初始化筛选功能
    initFilters();
    
    // 初始化表格操作
    initTableActions();
    
    // 初始化分页功能
    initPagination();
    
    // 初始化新增标准功能
    initAddStandard();
    
    // 初始化上传功能
    initUploadFunction();
    
    // 初始化高级筛选功能
    initAdvancedFilter();
    
    // 初始化公式配置功能
    initFormulaConfig();
});

// 全局函数：初始化标准清单标签页的功能
// 已移至文件末尾，避免重复定义

// 全局函数：初始化标准管理标签页的功能
// 标准管理标签页已被删除，此函数为空
function initStandardManagementFunctions() {
    console.log('标准管理标签页已被删除');
}

// 初始化标签页切换功能
function initTabs() {
    // 标签页切换功能已在HTML中实现，这里不再重复初始化
    // 但保留此函数以确保其他依赖它的功能正常工作
    console.log('Tabs initialization handled in HTML');
}

// 初始化标准清单标签页的功能（已移至全局函数）

// 显示新增标准页面
function showAddStandardPage() {
    // 隐藏标准清单页面
    const standardListPage = document.getElementById('tab-content-standard-list');
    if (standardListPage) {
        standardListPage.classList.add('hidden');
    }
    
    // 显示新增标准页面
    const addStandardPage = document.getElementById('add-standard-page');
    if (addStandardPage) {
        addStandardPage.classList.remove('hidden');
    }
}

// 显示标准清单页面
function showStandardListPage() {
    // 隐藏新增标准页面
    const addStandardPage = document.getElementById('add-standard-page');
    if (addStandardPage) {
        addStandardPage.classList.add('hidden');
    }
    
    // 显示标准清单页面
    const standardListPage = document.getElementById('tab-content-standard-list');
    if (standardListPage) {
        standardListPage.classList.remove('hidden');
    }
}

// 保存标准
function saveStandard() {
    // 获取表单数据
    const region = document.getElementById('add-standard-region').value;
    const type = document.getElementById('add-standard-type').value;
    const specification = document.getElementById('add-standard-specification').value;
    const amount = document.getElementById('add-standard-amount').value;
    const unit = document.getElementById('add-standard-unit').value;
    const category = document.getElementById('add-standard-category').value;
    const date = document.getElementById('add-standard-date').value;
    const status = document.getElementById('add-standard-status').value;
    
    // 简单验证
    if (!region || !type || !amount || !category || !unit || !date || !status) {
        showNotification('请填写所有必填字段', 'error');
        return;
    }
    
    // 这里可以实现保存逻辑
    showNotification('补偿标准已保存', 'success');
    
    // 清空表单
    document.getElementById('add-standard-region').value = '';
    document.getElementById('add-standard-type').value = '';
    document.getElementById('add-standard-specification').value = '';
    document.getElementById('add-standard-amount').value = '';
    document.getElementById('add-standard-category').value = '';
    document.getElementById('add-standard-unit').value = '';
    document.getElementById('add-standard-date').value = '';
    document.getElementById('add-standard-status').value = '现行';
    
    // 返回列表页面
    showStandardListPage();
}

// 初始化筛选功能
function initFilters() {
    // 标准管理筛选功能
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
    const searchBtn = document.querySelector('#filter-section .bg-red-500.hover\\:bg-red-600');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
    }
    
    // 重置按钮功能
    const resetBtn = document.querySelector('#filter-section .bg-gray-500.hover\\:bg-gray-600');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            resetFilters();
        });
    }
    
    // 标准清单筛选功能
    const filterToggleList = document.getElementById('toggle-filters-list');
    const filterSectionList = document.getElementById('filter-section-list');
    const filterArrowList = document.getElementById('filter-arrow-list');
    
    // 筛选区域折叠/展开功能
    if (filterToggleList && filterSectionList && filterArrowList) {
        filterToggleList.addEventListener('click', function() {
            filterSectionList.classList.toggle('hidden');
            filterArrowList.classList.toggle('rotate-180');
            
            const textSpan = filterToggleList.querySelector('span');
            if (filterSectionList.classList.contains('hidden')) {
                textSpan.textContent = '展开筛选';
            } else {
                textSpan.textContent = '收起筛选';
            }
        });
    }
    
    // 标准清单搜索按钮功能
    const searchBtnList = filterSectionList ? filterSectionList.querySelector('.bg-red-500.hover\\:bg-red-600') : null;
    if (searchBtnList) {
        searchBtnList.addEventListener('click', function() {
            performSearchList();
        });
    }
    
    // 标准清单重置按钮功能
    const resetBtnList = filterSectionList ? filterSectionList.querySelector('.bg-gray-500.hover\\:bg-gray-600') : null;
    if (resetBtnList) {
        resetBtnList.addEventListener('click', function() {
            resetFiltersList();
        });
    }
}

// 执行搜索
function performSearch() {
    // 获取筛选条件
    const standardNameInput = document.querySelector('#filter-section input[placeholder="请输入标准名称"]');
    const regionSelect = document.querySelector('#filter-section select:nth-of-type(1)'); // 适用区域下拉框
    const typeSelect = document.querySelector('#filter-section select:nth-of-type(2)'); // 标准类型下拉框
    const statusSelect = document.querySelector('#filter-section select:nth-of-type(3)'); // 状态下拉框
    
    const searchCriteria = {
        name: standardNameInput ? standardNameInput.value : '',
        region: regionSelect ? regionSelect.value : '',
        type: typeSelect ? typeSelect.value : '',
        status: statusSelect ? statusSelect.value : ''
    };
    
    console.log('Performing search with criteria:', searchCriteria);
    
    // 这里可以实现搜索逻辑
    // 模拟搜索延迟
    showNotification('搜索完成', 'success');
}

// 执行标准清单搜索
function performSearchList() {
    // 获取筛选条件
    const filterSectionList = document.getElementById('filter-section-list');
    if (!filterSectionList) return;
    
    const regionSelect = filterSectionList.querySelector('select:nth-of-type(1)'); // 区域下拉框
    const typeSelect = filterSectionList.querySelector('select:nth-of-type(2)'); // 土地/房屋类型下拉框
    const standardTypeSelect = filterSectionList.querySelector('select:nth-of-type(3)'); // 标准类型下拉框
    
    const searchCriteria = {
        region: regionSelect ? regionSelect.value : '',
        type: typeSelect ? typeSelect.value : '',
        standardType: standardTypeSelect ? standardTypeSelect.value : ''
    };
    
    console.log('Performing list search with criteria:', searchCriteria);
    
    // 这里可以实现搜索逻辑
    // 模拟搜索延迟
    showNotification('搜索完成', 'success');
}

// 重置筛选条件
function resetFilters() {
    const standardNameInput = document.querySelector('#filter-section input[placeholder="请输入标准名称"]');
    const selectElements = document.querySelectorAll('#filter-section select');
    
    if (standardNameInput) {
        standardNameInput.value = '';
    }
    
    selectElements.forEach(select => {
        select.value = select.options[0].value;
    });
    
    console.log('Filters reset');
    showNotification('筛选条件已重置', 'info');
}

// 重置标准清单筛选条件
function resetFiltersList() {
    const filterSectionList = document.getElementById('filter-section-list');
    if (!filterSectionList) return;
    
    const selectElements = filterSectionList.querySelectorAll('select');
    
    selectElements.forEach(select => {
        select.value = select.options[0].value;
    });
    
    console.log('List filters reset');
    showNotification('筛选条件已重置', 'info');
}

// 初始化上传功能
function initUploadFunction() {
    const uploadBtn = document.getElementById('upload-policy-btn');
    
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            showNotification('请选择要上传的政策文件', 'info');
            // 这里可以实现文件上传逻辑
            // 创建文件选择对话框
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.pdf,.doc,.docx,.xls,.xlsx';
            fileInput.multiple = true;
            
            fileInput.onchange = function(e) {
                const files = e.target.files;
                if (files.length > 0) {
                    showNotification(`已选择 ${files.length} 个文件，正在上传...`, 'info');
                    // 模拟上传过程
                    setTimeout(() => {
                        showNotification('文件上传成功', 'success');
                    }, 2000);
                }
            };
            
            fileInput.click();
        });
    }
}

// 显示新增标准模态框
function showAddStandardModal() {
    // 跳转到新增标准页面
    window.location.href = 'new-standard.html';
}

// 显示编辑标准模态框
function showEditStandardModal() {
    // 跳转到编辑标准页面
    window.location.href = 'edit-standard.html';
}

// 删除标准
function deleteStandard() {
    // 显示确认对话框
    if (confirm('确定要删除选中的补偿标准吗？此操作不可撤销。')) {
        showNotification('已删除补偿标准', 'success');
        // 这里可以实现删除逻辑
    }
}

// 初始化表格操作
function initTableActions() {
    // 全选复选框功能 - 政策文件管理标签页
    const selectAllCheckbox = document.querySelector('#tab-content-standard-management thead input[type="checkbox"]');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('#tab-content-standard-management tbody input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
        });
    }
    
    // 单个复选框功能 - 政策文件管理标签页
    const checkboxes = document.querySelectorAll('#tab-content-standard-management tbody input[type="checkbox"]');
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
    
    // 全选复选框功能 - 补偿标准清单标签页
    const selectAllCheckboxList = document.querySelector('#tab-content-standard-list thead input[type="checkbox"]');
    if (selectAllCheckboxList) {
        selectAllCheckboxList.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('#tab-content-standard-list tbody input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckboxList.checked;
            });
        });
    }
    
    // 单个复选框功能 - 补偿标准清单标签页
    const checkboxesList = document.querySelectorAll('#tab-content-standard-list tbody input[type="checkbox"]');
    checkboxesList.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            // 检查是否所有复选框都被选中
            const allChecked = Array.from(checkboxesList).every(cb => cb.checked);
            const anyChecked = Array.from(checkboxesList).some(cb => cb.checked);
            
            if (selectAllCheckboxList) {
                selectAllCheckboxList.checked = allChecked;
                selectAllCheckboxList.indeterminate = anyChecked && !allChecked;
            }
        });
    });
    
    // 查看按钮功能 - 政策文件管理标签页
    const viewButtons = document.querySelectorAll('#tab-content-standard-management button.text-blue-600');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            viewStandard();
        });
    });
    
    // 编辑按钮功能 - 政策文件管理标签页
    const editButtons = document.querySelectorAll('#tab-content-standard-management button.text-indigo-600');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            editStandard();
        });
    });
    
    // 版本按钮功能 - 政策文件管理标签页
    const versionButtons = document.querySelectorAll('#tab-content-standard-management button.text-purple-600');
    versionButtons.forEach(button => {
        button.addEventListener('click', function() {
            viewVersionHistory();
        });
    });
    
    // 废止按钮功能 - 政策文件管理标签页
    const废止Buttons = document.querySelectorAll('#tab-content-standard-management button.text-red-600:not([disabled])');
    废止Buttons.forEach(button => {
        button.addEventListener('click', function() {
            废止Standard();
        });
    });
    
    // 下载按钮功能 - 政策文件管理标签页
    const downloadButtons = document.querySelectorAll('#tab-content-standard-management button.text-green-600');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            downloadPolicyFile();
        });
    });
    
    // 查看按钮功能 - 补偿标准清单标签页
    const viewButtonsList = document.querySelectorAll('#tab-content-standard-list button.text-blue-600');
    viewButtonsList.forEach(button => {
        button.addEventListener('click', function() {
            viewStandardList();
        });
    });
    
    // 编辑按钮功能 - 补偿标准清单标签页
    const editButtonsList = document.querySelectorAll('#tab-content-standard-list button.text-indigo-600');
    editButtonsList.forEach(button => {
        button.addEventListener('click', function() {
            showEditStandardModal();
        });
    });
    
    // 删除按钮功能 - 补偿标准清单标签页
    const deleteButtonsList = document.querySelectorAll('#tab-content-standard-list button.text-red-600');
    deleteButtonsList.forEach(button => {
        button.addEventListener('click', function() {
            deleteStandard();
        });
    });
}

// 查看补偿标准详情 - 补偿标准清单
function viewStandardList() {
    // 跳转到标准详情页面
    window.location.href = 'standard-detail.html';
}

// 查看补偿标准详情
function viewStandard() {
    // 跳转到标准详情页面
    window.location.href = 'standard-detail.html';
}

// 编辑补偿标准
function editStandard() {
    showNotification('编辑补偿标准', 'info');
    // 这里可以实现编辑标准的逻辑
}

// 查看版本历史
function viewVersionHistory() {
    showNotification('查看版本历史', 'info');
    // 这里可以实现查看版本历史的逻辑
    // 显示版本历史模态框
    showVersionHistoryModal();
}

// 废止补偿标准
function 废止Standard() {
    // 显示确认对话框
    if (confirm('确定要废止该补偿标准吗？此操作不可撤销。')) {
        showNotification('已废止补偿标准', 'success');
        // 这里可以实现废止标准的逻辑
    }
}

// 下载政策文件
function downloadPolicyFile() {
    showNotification('正在下载政策文件...', 'info');
    // 这里可以实现文件下载逻辑
    setTimeout(() => {
        showNotification('文件下载完成', 'success');
    }, 1000);
}

// 初始化分页功能
function initPagination() {
    const paginationButtons = document.querySelectorAll('#tab-content-standard-management .px-3.py-1.rounded-lg:not(.bg-red-500)');
    
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

// 初始化新增标准功能
function initAddStandard() {
    const addStandardBtn = document.getElementById('add-standard-btn');
    
    if (addStandardBtn) {
        addStandardBtn.addEventListener('click', function() {
            showNotification('新增补偿标准', 'info');
            // 这里可以实现新增标准的逻辑
        });
    }
}

// 初始化高级筛选功能
function initAdvancedFilter() {
    // 功能已在initUploadFunction中实现，避免重复初始化
}

// 显示高级筛选模态框
function showAdvancedFilterModal() {
    // 检查模态框是否已存在
    if (document.querySelector('#advanced-filter-modal')) {
        document.querySelector('#advanced-filter-modal').remove();
    }
    
    // 创建模态框元素
    const modal = document.createElement('div');
    modal.id = 'advanced-filter-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto">
            <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-lg font-bold text-gray-800">高级筛选</h3>
                <button id="close-modal" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">生效日期范围（开始）</label>
                        <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">生效日期范围（结束）</label>
                        <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">创建人</label>
                        <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="请输入创建人">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">关键词</label>
                        <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="请输入关键词">
                    </div>
                </div>
                <div class="flex justify-end space-x-3">
                    <button id="reset-advanced-filter" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                        重置
                    </button>
                    <button id="apply-advanced-filter" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
                        应用筛选
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 添加关闭事件
    modal.querySelector('#close-modal').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // 添加应用筛选事件
    modal.querySelector('#apply-advanced-filter').addEventListener('click', function() {
        showNotification('高级筛选已应用', 'success');
        document.body.removeChild(modal);
    });
    
    // 添加重置事件
    modal.querySelector('#reset-advanced-filter').addEventListener('click', function() {
        const inputs = modal.querySelectorAll('input');
        inputs.forEach(input => {
            if (input.type === 'date') {
                input.value = '';
            } else {
                input.value = '';
            }
        });
        showNotification('筛选条件已重置', 'info');
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// 初始化公式配置功能
function initFormulaConfig() {
    // 功能已在initUploadFunction中实现，避免重复初始化
}

// 显示公式配置模态框
function showFormulaConfigModal() {
    // 检查模态框是否已存在
    if (document.querySelector('#formula-config-modal')) {
        document.querySelector('#formula-config-modal').remove();
    }
    
    // 创建模态框元素
    const modal = document.createElement('div');
    modal.id = 'formula-config-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto">
            <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 class="text-lg font-bold text-gray-800">计算公式配置</h3>
                <button id="close-formula-modal" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="p-6">
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-1">选择补偿类型</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" id="formula-compensation-type">
                        <option value="land">土地补偿</option>
                        <option value="house">房屋补偿</option>
                        <option value="attachment">附着物补偿</option>
                        <option value="seedling">青苗补偿</option>
                        <option value="temporary">临时安置</option>
                        <option value="relocation">搬迁补助</option>
                        <option value="business">停产停业</option>
                    </select>
                </div>
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-1">计算公式</label>
                    <textarea class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 h-32" id="formula-expression" placeholder="请输入计算公式，例如：area * unitPrice * adjustmentFactor"></textarea>
                </div>
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-1">公式描述</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" id="formula-description" placeholder="请输入公式描述，例如：土地补偿标准计算公式">
                </div>
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-1">适用区域</label>
                    <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" id="formula-region">
                        <option value="all">全部区域</option>
                        <option value="rongshui">融水苗族自治县</option>
                        <option value="luocheng">罗城仫佬族自治县</option>
                        <option value="liuzhou">柳州市</option>
                        <option value="guangxi">广西壮族自治区</option>
                    </select>
                </div>
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-1">参数说明</label>
                    <div class="bg-gray-50 p-4 rounded-lg">
                        <p class="text-sm text-gray-600">可用参数：</p>
                        <ul class="list-disc list-inside text-sm text-gray-600 mt-2">
                            <li><strong>area</strong>：补偿对象的面积（平方米/亩）</li>
                            <li><strong>unitPrice</strong>：单位面积的补偿金额（元/平方米或元/亩）</li>
                            <li><strong>adjustmentFactor</strong>：根据地区、时间等因素的调整系数</li>
                            <li><strong>structureLevel</strong>：房屋结构等级系数</li>
                            <li><strong>depreciationRate</strong>：折旧率</li>
                            <li><strong>locationFactor</strong>：地段系数</li>
                        </ul>
                        <p class="text-sm text-gray-600 mt-2">示例公式：</p>
                        <ul class="list-disc list-inside text-sm text-gray-600 mt-1">
                            <li>土地补偿：area * unitPrice * adjustmentFactor</li>
                            <li>房屋补偿：area * unitPrice * structureLevel * (1 - depreciationRate)</li>
                            <li>临时安置：area * unitPrice * locationFactor * months</li>
                        </ul>
                    </div>
                </div>
                <div class="mb-6">
                    <label class="block text-sm font-medium text-gray-700 mb-1">生效日期</label>
                    <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" id="formula-effective-date">
                </div>
                <div class="flex justify-end space-x-3">
                    <button id="reset-formula" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                        重置
                    </button>
                    <button id="save-formula" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
                        保存配置
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 设置默认生效日期为今天
    const today = new Date().toISOString().split('T')[0];
    modal.querySelector('#formula-effective-date').value = today;
    
    // 添加关闭事件
    modal.querySelector('#close-formula-modal').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // 添加保存事件
    modal.querySelector('#save-formula').addEventListener('click', function() {
        // 获取表单数据
        const compensationType = modal.querySelector('#formula-compensation-type').value;
        const expression = modal.querySelector('#formula-expression').value;
        const description = modal.querySelector('#formula-description').value;
        const region = modal.querySelector('#formula-region').value;
        const effectiveDate = modal.querySelector('#formula-effective-date').value;
        
        // 简单验证
        if (!expression) {
            showNotification('请输入计算公式', 'error');
            return;
        }
        
        // 这里可以实现保存逻辑
        console.log('保存公式配置:', { compensationType, expression, description, region, effectiveDate });
        showNotification('公式配置已保存', 'success');
        document.body.removeChild(modal);
    });
    
    // 添加重置事件
    modal.querySelector('#reset-formula').addEventListener('click', function() {
        const textarea = modal.querySelector('#formula-expression');
        const description = modal.querySelector('#formula-description');
        textarea.value = '';
        description.value = '';
        modal.querySelector('#formula-effective-date').value = today;
        showNotification('配置已重置', 'info');
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// 显示版本历史模态框
function showVersionHistoryModal() {
    // 这里可以实现跳转到版本历史页面的逻辑
    alert('查看版本历史');
}

// 初始化标准清单标签页的功能
function initStandardListFunctions() {
    // 为标准清单标签页的新增标准按钮添加事件监听器
    const addStandardListBtn = document.getElementById('add-standard-list-btn');
    if (addStandardListBtn) {
        addStandardListBtn.addEventListener('click', function() {
            showAddStandardPage();
        });
    }
    
    // 为标准清单表格上方的新增按钮添加事件监听器
    const tableAddBtn = document.getElementById('table-add-btn');
    if (tableAddBtn) {
        tableAddBtn.addEventListener('click', function() {
            showAddStandardPage();
        });
    }
    
    // 为标准清单表格上方的编辑按钮添加事件监听器
    const tableEditBtn = document.querySelector('#tab-content-standard-list .bg-green-500.hover\\:bg-green-600');
    if (tableEditBtn) {
        tableEditBtn.addEventListener('click', function() {
            showEditStandardModal();
        });
    }
    
    // 为标准清单表格上方的删除按钮添加事件监听器
    const tableDeleteBtn = document.querySelector('#tab-content-standard-list .bg-red-500.hover\\:bg-red-600:last-child');
    if (tableDeleteBtn) {
        tableDeleteBtn.addEventListener('click', function() {
            deleteStandard();
        });
    }
    
    // 为标准清单标签页的公式配置按钮添加事件监听器
    const formulaConfigBtn = document.getElementById('formula-config-btn');
    if (formulaConfigBtn) {
        formulaConfigBtn.addEventListener('click', function() {
            showFormulaConfigModal();
        });
    }
    
    // 为标准清单标签页的高级筛选按钮添加事件监听器
    const advancedFilterBtn = document.getElementById('advanced-filter-btn');
    if (advancedFilterBtn) {
        advancedFilterBtn.addEventListener('click', function() {
            showAdvancedFilterModal();
        });
    }
    
    // 为标准清单标签页的批量导入按钮添加事件监听器
    const bulkImportBtn = document.getElementById('bulk-import-btn');
    if (bulkImportBtn) {
        bulkImportBtn.addEventListener('click', function() {
            // 跳转到批量导入页面
            window.location.href = 'bulk-import-standards.html';
        });
    }
    
    // 为返回列表按钮添加事件监听器
    const backToListBtn = document.getElementById('back-to-list-btn');
    if (backToListBtn) {
        backToListBtn.addEventListener('click', function() {
            showStandardListPage();
        });
    }
    
    // 为取消按钮添加事件监听器
    const cancelAddBtn = document.getElementById('cancel-add-standard-page');
    if (cancelAddBtn) {
        cancelAddBtn.addEventListener('click', function() {
            showStandardListPage();
        });
    }
    
    // 为保存按钮添加事件监听器
    const saveAddBtn = document.getElementById('save-add-standard-page');
    if (saveAddBtn) {
        saveAddBtn.addEventListener('click', function() {
            saveStandard();
        });
    }
}

// 显示通知消息
function showNotification(message, type = 'info') {
    // 检查是否已存在相同的通知
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        if (notification.textContent === message) {
            notification.remove();
        }
    });
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg text-white z-50 notification ${
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