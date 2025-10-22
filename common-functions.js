// 公共功能模块
// 提供多个页面共用的基础功能

// 折叠/展开筛选区域
export function initFilterToggle(toggleBtnId, sectionId, arrowId) {
    const toggleBtn = document.getElementById(toggleBtnId);
    const section = document.getElementById(sectionId);
    const arrow = document.getElementById(arrowId);
    
    if (toggleBtn && section && arrow) {
        toggleBtn.addEventListener('click', function() {
            section.classList.toggle('hidden');
            arrow.classList.toggle('rotate-180');
        });
    }
}

// 折叠/展开统计区域
export function initStatsToggle(toggleBtnId, sectionId, arrowId) {
    const toggleBtn = document.getElementById(toggleBtnId);
    const section = document.getElementById(sectionId);
    const arrow = document.getElementById(arrowId);
    
    if (toggleBtn && section && arrow) {
        toggleBtn.addEventListener('click', function() {
            section.classList.toggle('hidden');
            arrow.classList.toggle('rotate-180');
        });
    }
}

// 折叠/展开地区分类树
export function initRegionTreeToggle(toggleId, containerSelector) {
    const toggle = document.getElementById(toggleId);
    const container = document.querySelector(containerSelector);
    
    if (toggle && container) {
        toggle.addEventListener('click', function() {
            container.classList.toggle('w-0');
            container.classList.toggle('w-80');
            container.classList.toggle('opacity-0');
            container.classList.toggle('opacity-100');
            container.classList.toggle('ml-0');
            container.classList.toggle('ml-6');
            
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-chevron-left');
                icon.classList.toggle('fa-chevron-right');
            }
        });
    }
}

// 初始化树节点折叠/展开功能
export function initTreeNodeToggle() {
    const treeNodes = document.querySelectorAll('.tree-node');
    treeNodes.forEach(node => {
        const toggleBtn = node.querySelector('.tree-node-toggle');
        const children = node.querySelector('.tree-node-children');
        
        if (toggleBtn && children) {
            toggleBtn.addEventListener('click', function() {
                children.classList.toggle('hidden');
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-chevron-down');
                    icon.classList.toggle('fa-chevron-right');
                }
            });
        }
    });
}

// 选择树节点
export function selectTreeNode(nodeId) {
    // 移除所有节点的active类
    document.querySelectorAll('.tree-node').forEach(node => {
        node.classList.remove('active');
    });
    
    // 为当前节点添加active类
    const treeNode = document.getElementById(nodeId);
    if (treeNode) {
        treeNode.classList.add('active');
    }
}

// 选择子树节点
export function selectSubTreeNode(parentId, nodeId) {
    // 移除所有节点的active类
    document.querySelectorAll('.tree-node').forEach(node => {
        node.classList.remove('active');
    });
    
    // 为当前节点添加active类
    const subTreeNode = document.getElementById(nodeId);
    if (subTreeNode) {
        subTreeNode.classList.add('active');
    }
}

// 初始化模态框关闭功能
export function initModalClose(modalId, cancelBtnId) {
    const modal = document.getElementById(modalId);
    const cancelBtn = document.getElementById(cancelBtnId);
    
    if (modal && cancelBtn) {
        // 点击取消按钮关闭模态框
        cancelBtn.addEventListener('click', function() {
            modal.classList.add('hidden');
        });
        
        // 点击模态框外部关闭模态框
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
        
        // 按ESC键关闭模态框
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
            }
        });
    }
}