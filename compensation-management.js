// 补偿管理页面JavaScript代码
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面功能
    console.log('Initializing compensation management page');
    
    // 标签页切换功能
    initTabSwitching();
    
    // 左侧导航切换
    initNavSwitching();
    
    // 初始化按钮功能
    initButtonActions();
    
    // 初始化搜索功能
    initSearchFunction();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化地区选择
    initRegionSelection();
    
    // 初始化表格行悬停效果
    initTableRowHover();
    
    // 初始化清单展开/收起功能
    initExpandableLists();
});

// 初始化标签页切换
function initTabSwitching() {
    const tabPolicy = document.getElementById('tab-policy');
    const tabList = document.getElementById('tab-list');
    const policyContent = document.getElementById('policy-content');
    const listContent = document.getElementById('list-content');
    const btnAddPolicy = document.getElementById('btn-add-policy');
    const btnExport = document.getElementById('btn-export');
    
    if (tabPolicy && tabList) {
        // 标签页切换
        tabPolicy.addEventListener('click', function() {
            // 激活当前标签
            tabPolicy.classList.add('bg-primary', 'text-white');
            tabPolicy.classList.remove('text-gray-600', 'hover:bg-gray-50');
            // 取消激活其他标签
            tabList.classList.remove('bg-primary', 'text-white');
            tabList.classList.add('text-gray-600', 'hover:bg-gray-50');
            // 显示对应内容
            policyContent.classList.remove('hidden');
            listContent.classList.add('hidden');
            // 更新按钮文本
            if (btnAddPolicy && btnExport) {
                btnAddPolicy.innerHTML = '<i class="fas fa-plus mr-2"></i>新增政策';
                btnExport.innerHTML = '<i class="fas fa-download mr-2 text-gray-500"></i>导出报表';
            }
        });
        
        tabList.addEventListener('click', function() {
            // 激活当前标签
            tabList.classList.add('bg-primary', 'text-white');
            tabList.classList.remove('text-gray-600', 'hover:bg-gray-50');
            // 取消激活其他标签
            tabPolicy.classList.remove('bg-primary', 'text-white');
            tabPolicy.classList.add('text-gray-600', 'hover:bg-gray-50');
            // 显示对应内容
            listContent.classList.remove('hidden');
            policyContent.classList.add('hidden');
            // 更新按钮文本
            if (btnAddPolicy && btnExport) {
                btnAddPolicy.innerHTML = '<i class="fas fa-plus mr-2"></i>新增清单';
                btnExport.innerHTML = '<i class="fas fa-file-excel mr-2 text-gray-500"></i>导出清单';
            }
        });
    }
}

// 初始化左侧导航切换
function initNavSwitching() {
    const navPolicy = document.getElementById('nav-policy');
    const navList = document.getElementById('nav-list');
    const navStatistics = document.getElementById('nav-statistics');
    const tabPolicy = document.getElementById('tab-policy');
    const tabList = document.getElementById('tab-list');
    
    if (navPolicy) {
        navPolicy.addEventListener('click', function() {
            navPolicy.classList.add('bg-primary/10', 'text-primary');
            navPolicy.classList.remove('text-gray-700', 'hover:bg-gray-100');
            navPolicy.querySelector('i').classList.add('text-primary');
            navPolicy.querySelector('i').classList.remove('text-gray-400');
            
            if (navList) {
                navList.classList.remove('bg-primary/10', 'text-primary');
                navList.classList.add('text-gray-700', 'hover:bg-gray-100');
                navList.querySelector('i').classList.remove('text-primary');
                navList.querySelector('i').classList.add('text-gray-400');
            }
            
            if (navStatistics) {
                navStatistics.classList.remove('bg-primary/10', 'text-primary');
                navStatistics.classList.add('text-gray-700', 'hover:bg-gray-100');
                navStatistics.querySelector('i').classList.remove('text-primary');
                navStatistics.querySelector('i').classList.add('text-gray-400');
            }
            
            // 切换到对应标签
            if (tabPolicy) tabPolicy.click();
        });
    }
    
    if (navList) {
        navList.addEventListener('click', function() {
            navList.classList.add('bg-primary/10', 'text-primary');
            navList.classList.remove('text-gray-700', 'hover:bg-gray-100');
            navList.querySelector('i').classList.add('text-primary');
            navList.querySelector('i').classList.remove('text-gray-400');
            
            if (navPolicy) {
                navPolicy.classList.remove('bg-primary/10', 'text-primary');
                navPolicy.classList.add('text-gray-700', 'hover:bg-gray-100');
                navPolicy.querySelector('i').classList.remove('text-primary');
                navPolicy.querySelector('i').classList.add('text-gray-400');
            }
            
            if (navStatistics) {
                navStatistics.classList.remove('bg-primary/10', 'text-primary');
                navStatistics.classList.add('text-gray-700', 'hover:bg-gray-100');
                navStatistics.querySelector('i').classList.remove('text-primary');
                navStatistics.querySelector('i').classList.add('text-gray-400');
            }
            
            // 切换到对应标签
            if (tabList) tabList.click();
        });
    }
    
    if (navStatistics) {
        navStatistics.addEventListener('click', function() {
            navStatistics.classList.add('bg-primary/10', 'text-primary');
            navStatistics.classList.remove('text-gray-700', 'hover:bg-gray-100');
            navStatistics.querySelector('i').classList.add('text-primary');
            navStatistics.querySelector('i').classList.remove('text-gray-400');
            
            if (navPolicy) {
                navPolicy.classList.remove('bg-primary/10', 'text-primary');
                navPolicy.classList.add('text-gray-700', 'hover:bg-gray-100');
                navPolicy.querySelector('i').classList.remove('text-primary');
                navPolicy.querySelector('i').classList.add('text-gray-400');
            }
            
            if (navList) {
                navList.classList.remove('bg-primary/10', 'text-primary');
                navList.classList.add('text-gray-700', 'hover:bg-gray-100');
                navList.querySelector('i').classList.remove('text-primary');
                navList.querySelector('i').classList.add('text-gray-400');
            }
            
            // 显示提示
            alert('统计分析功能待实现');
        });
    }
}

// 初始化按钮功能
function initButtonActions() {
    const btnAddPolicy = document.getElementById('btn-add-policy');
    const btnExport = document.getElementById('btn-export');
    const policyContent = document.getElementById('policy-content');
    const listContent = document.getElementById('list-content');
    
    if (btnAddPolicy) {
        btnAddPolicy.addEventListener('click', function() {
            if (listContent && listContent.classList.contains('hidden')) {
                alert('新增补偿政策功能待实现');
            } else {
                alert('新增补偿项目清单功能待实现');
            }
        });
    }
    
    if (btnExport) {
        btnExport.addEventListener('click', function() {
            if (listContent && listContent.classList.contains('hidden')) {
                alert('导出报表功能待实现');
            } else {
                alert('导出补偿清单功能待实现');
            }
        });
    }
}

// 初始化搜索功能
function initSearchFunction() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchText = this.value.toLowerCase();
            // 搜索逻辑待实现
            console.log('搜索:', searchText);
            
            // 简单的搜索动画效果
            if (searchText.length > 0) {
                this.classList.add('border-primary');
                this.classList.remove('border-gray-200');
            } else {
                this.classList.remove('border-primary');
                this.classList.add('border-gray-200');
            }
        });
    }
}

// 初始化滚动动画
function initScrollAnimations() {
    function handleScrollAnimations() {
        const elements = document.querySelectorAll('.scroll-animation');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    }
    
    // 初始化滚动动画
    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations(); // 初始检查
}

// 初始化地区选择
function initRegionSelection() {
    const regionRadios = document.querySelectorAll('input[name="region"]');
    regionRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            // 移除所有标签的高亮样式
            regionRadios.forEach(r => {
                const label = r.closest('label');
                if (r === this) {
                    label.classList.add('border-primary/20', 'bg-primary/5');
                    label.classList.remove('border-gray-200');
                    r.closest('span').classList.add('text-primary');
                    r.closest('span').classList.remove('text-gray-700');
                } else {
                    label.classList.remove('border-primary/20', 'bg-primary/5');
                    label.classList.add('border-gray-200');
                    r.closest('span').classList.remove('text-primary');
                    r.closest('span').classList.add('text-gray-700');
                }
            });
            
            // 地区筛选逻辑待实现
            console.log('地区筛选:', this.id);
        });
    });
}

// 初始化表格行悬停效果
function initTableRowHover() {
    const tableRows = document.querySelectorAll('.table-row-hover');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateZ(5px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// 初始化清单展开/收起功能
function initExpandableLists() {
    const expandButtons = document.querySelectorAll('.expand-list');
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const listItem = this.closest('.rounded-xl');
            const detailSection = listItem.querySelector('.p-5:last-child');
            const icon = this.querySelector('i');
            
            if (detailSection && detailSection.classList.contains('hidden')) {
                // 使用framer-motion实现展开动画
                const detailContainer = detailSection;
                detailContainer.style.maxHeight = '0';
                detailContainer.style.overflow = 'hidden';
                detailContainer.style.transition = 'max-height 0.5s ease';
                
                detailSection.classList.remove('hidden');
                // 强制重排
                detailContainer.offsetHeight;
                // 设置最大高度以触发过渡
                detailContainer.style.maxHeight = detailContainer.scrollHeight + 'px';
                
                if (icon) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            } else if (detailSection) {
                // 使用framer-motion实现收起动画
                const detailContainer = detailSection;
                detailContainer.style.maxHeight = detailContainer.scrollHeight + 'px';
                
                // 强制重排
                detailContainer.offsetHeight;
                // 设置最大高度为0以触发过渡
                detailContainer.style.maxHeight = '0';
                
                // 过渡结束后隐藏元素
                setTimeout(() => {
                    detailSection.classList.add('hidden');
                    detailContainer.style.maxHeight = '';
                    detailContainer.style.overflow = '';
                    detailContainer.style.transition = '';
                }, 500);
                
                if (icon) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            }
        });
    });
}