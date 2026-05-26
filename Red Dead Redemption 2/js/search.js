document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input, .search-box input, .mobile-search-input');
    const searchButton = document.querySelector('.search-btn, .search-box button');
    
    if (searchInput) {
        if (searchButton) {
            searchButton.addEventListener('click', performSearch);
        }
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (!query) {
            alert('请输入搜索关键词');
            return;
        }

        const searchResults = [];
        
        const pages = [
            { url: 'index.html', title: '🏜️ 首页', keywords: ['热门攻略', '最新更新', '任务', '收集品', '战斗技巧'] },
            { url: 'missions.html', title: '🔫 任务攻略', keywords: ['主线任务', '支线任务', '陌生人任务', '第一章', '第二章', '第三章', '第四章', '第五章', '第六章', '金牌条件', 'Gold Medal'] },
            { url: 'mission-detail.html', title: '🎯 第一章：雪中绝境', keywords: ['犁刀村', '任务攻略', '新手', '亚瑟·摩根', '范德林德帮', '金牌'] },
            { url: 'collectibles.html', title: '💎 收集品指南', keywords: ['藏宝图', '传奇动物', '恐龙骨', '香烟卡', '杰克霍尔帮', '剧毒路线', '山狮', '收集'] },
            { url: 'guide.html', title: '📖 游戏指南', keywords: ['新手入门', '马匹养成', '荣誉系统', '经济系统', '赚钱', '操作指南'] },
            { url: 'combat.html', title: '⚔️ 战斗技巧', keywords: ['死亡之眼', '武器系统', '近战格斗', '狩猎技巧', '手枪', '步枪', '霰弹枪'] }
        ];

        pages.forEach(page => {
            if (page.title.toLowerCase().includes(query) || 
                page.keywords.some(keyword => keyword.toLowerCase().includes(query))) {
                searchResults.push(page);
            }
        });

        displayResults(searchResults, query);
    }

    function displayResults(results, query) {
        const resultsHtml = document.createElement('div');
        resultsHtml.className = 'search-modal';
        resultsHtml.innerHTML = `
            <div class="search-modal-overlay"></div>
            <div class="search-modal-content">
                <div class="search-modal-header">
                    <h3>搜索结果: "${query}"</h3>
                    <button class="search-modal-close">&times;</button>
                </div>
                <div class="search-modal-body">
                    ${results.length > 0 ? 
                        `<ul>${results.map(r => `<li><a href="${r.url}">${r.title}</a></li>`).join('')}</ul>` : 
                        '<p>未找到匹配的内容，请尝试其他关键词</p>'}
                </div>
            </div>
        `;
        
        document.body.appendChild(resultsHtml);
        document.body.style.overflow = 'hidden';
        
        const closeBtn = resultsHtml.querySelector('.search-modal-close');
        const overlay = resultsHtml.querySelector('.search-modal-overlay');
        
        const closeModal = () => {
            resultsHtml.remove();
            document.body.style.overflow = '';
        };
        
        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
    }
});
