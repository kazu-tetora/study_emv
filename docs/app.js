// ===================================================
// EMV Study Site - Main Application
// ===================================================

document.addEventListener('DOMContentLoaded', () => {
  renderSpecsTab();
  renderGlossaryTab();
  renderReferenceTab();
  renderSequenceTab();
  initSearch();
  initTheme();

  // Handle URL hash for direct tab navigation
  const hash = window.location.hash.replace('#', '');
  if (['specs', 'glossary', 'reference', 'sequence', 'search', 'quiz'].includes(hash)) {
    switchTab(hash);
  }
});

// ===================================================
// Tab Switching
// ===================================================
function switchTab(tabId) {
  // Update tab buttons
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.tab === tabId);
  });

  // Update tab content
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-${tabId}`);
  });

  // Update URL hash
  window.location.hash = tabId;

  // Focus search input when switching to search
  if (tabId === 'search') {
    setTimeout(() => document.getElementById('search-input')?.focus(), 100);
  }
}

// ===================================================
// Theme Toggle
// ===================================================
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('emv-study-theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  
  const currentTheme = savedTheme || (prefersLight ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  toggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('emv-study-theme', newTheme);
    
    // Re-render Mermaid diagrams if on sequence tab
    reinitializeMermaid(newTheme);
  });
}

function reinitializeMermaid(theme) {
  if (window.mermaid) {
    const mermaidTheme = theme === 'light' ? 'default' : 'dark';
    mermaid.initialize({
      startOnLoad: false,
      theme: mermaidTheme,
      sequence: { showSequenceNumbers: true, actorMargin: 50, noteMargin: 10 }
    });
    
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab && activeTab.id === 'tab-sequence') {
      // Need to clear and re-render the HTML to force Mermaid to redraw SVG
      renderSequenceTab();
      setTimeout(processMermaidDiagrams, 50);
    }
  }
}

// ===================================================
// Tab 1: Specifications Overview
// ===================================================
function renderSpecsTab() {
  const container = document.getElementById('specs-content');
  let html = '';

  for (const [catKey, category] of Object.entries(SPEC_DATA)) {
    html += `
      <div class="category-section">
        <div class="category-header">
          <span class="category-badge ${catKey}">${catKey === 'contact' ? '🔌 Contact' : '📡 Contactless'}</span>
          <span class="category-desc">${category.description}</span>
        </div>
        <div class="spec-cards ${catKey}">
    `;

    for (const book of category.books) {
      const icon = catKey === 'contact' ? '📘' : '📗';
      const pagesInfo = book.pages ? `${book.pages}p` : '';
      const chapCount = book.chapters.length;

      html += `
        <div class="spec-card" id="card-${book.id}">
          <div class="spec-card-header" onclick="toggleCard('${book.id}')">
            <div class="spec-card-icon">${icon}</div>
            <div class="spec-card-info">
              <div class="spec-card-title">${book.title}</div>
              <div class="spec-card-desc">${book.description}</div>
            </div>
            <div class="spec-card-meta">
              ${pagesInfo ? `<span class="spec-card-pages">${pagesInfo}</span>` : ''}
              <span class="count-badge">${chapCount}章</span>
              <span class="spec-card-toggle">▼</span>
            </div>
          </div>
          <div class="chapters-container">
            <div class="chapters-list">
              ${renderChapters(book.chapters, { ...book, category: catKey })}
            </div>
          </div>
        </div>
      `;
    }

    html += `</div></div>`;
  }

  container.innerHTML = html;
}

function renderChapters(chapters, book) {
  return chapters.map(ch => `
    <div class="chapter-item" style="cursor: pointer;" onclick="openPdfModal('${book.category}', '${book.filename}', ${ch.page}, '${book.title} - Chapter ${ch.number}')">
      <div class="chapter-number" title="Open PDF at page ${ch.page}">${ch.number}</div>
      <div class="chapter-content">
        <div class="chapter-title">${ch.title} <span style="font-size:11px; color:var(--text-muted);">[p.${ch.page}]</span></div>
        <div class="chapter-summary">${ch.summary}</div>
        <div class="chapter-keywords">
          ${ch.keywords.map(kw => `<span class="keyword-tag">${kw}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function toggleCard(bookId) {
  const card = document.getElementById(`card-${bookId}`);
  card.classList.toggle('expanded');
}

// ===================================================
// Tab 2: Glossary
// ===================================================
function renderGlossaryTab() {
  const container = document.getElementById('glossary-content');

  // Get all unique first letters
  const letters = [...new Set(GLOSSARY_DATA.map(g => g.term[0].toUpperCase()))].sort();
  const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Build alphabet index
  const alphabetHtml = allLetters.map(l => {
    const exists = letters.includes(l);
    return `<button class="alpha-link ${exists ? '' : 'disabled'}" 
              ${exists ? `onclick="filterGlossaryByLetter('${l}')"` : ''}
              data-letter="${l}">${l}</button>`;
  }).join('');

  // Build category filters
  const usedCategories = [...new Set(GLOSSARY_DATA.map(g => g.category))];
  const filterHtml = `
    <button class="filter-chip active" onclick="filterGlossaryByCategory('all')">すべて</button>
    ${usedCategories.map(cat => `
      <button class="filter-chip" onclick="filterGlossaryByCategory('${cat}')" 
              style="--filter-color: ${GLOSSARY_CATEGORIES[cat]?.color || '#666'}">
        ${GLOSSARY_CATEGORIES[cat]?.label || cat}
      </button>
    `).join('')}
  `;

  container.innerHTML = `
    <div class="glossary-controls">
      <div class="glossary-search-wrapper">
        <span class="glossary-search-icon">🔍</span>
        <input type="text" class="glossary-search" id="glossary-filter" 
               placeholder="用語を検索..." oninput="filterGlossary()" autocomplete="off">
      </div>
    </div>
    <div class="alphabet-index">${alphabetHtml}</div>
    <div class="category-filters">${filterHtml}</div>
    <div class="search-stats" id="glossary-count">${GLOSSARY_DATA.length} 件の用語</div>
    <div class="glossary-grid" id="glossary-list"></div>
  `;

  renderGlossaryItems(GLOSSARY_DATA);
}

let currentGlossaryFilter = { text: '', category: 'all', letter: '' };

function renderGlossaryItems(items) {
  const list = document.getElementById('glossary-list');
  const count = document.getElementById('glossary-count');

  if (items.length === 0) {
    list.innerHTML = `
      <div class="search-empty">
        <div class="search-empty-icon">📝</div>
        <h3>該当する用語がありません</h3>
        <p>検索条件を変更してお試しください。</p>
      </div>
    `;
    count.textContent = '0 件の用語';
    return;
  }

  count.textContent = `${items.length} 件の用語`;
  list.innerHTML = items.map(g => {
    const catInfo = GLOSSARY_CATEGORIES[g.category] || { label: g.category, color: '#666' };
    return `
      <div class="glossary-item">
        <div class="glossary-term-row">
          <span class="glossary-term">${g.term}</span>
          <span class="glossary-fullname">${g.fullName}</span>
          <span class="glossary-ja">🇯🇵 ${g.ja}</span>
          <span class="glossary-category-tag" style="background: ${catInfo.color}22; color: ${catInfo.color}; border: 1px solid ${catInfo.color}33;">
            ${catInfo.label}
          </span>
        </div>
        <div class="glossary-def">${g.definition}</div>
        ${g.relatedSpecs.length > 0 ? `
          <div class="glossary-refs">
            ${g.relatedSpecs.map(s => `<span class="ref-tag">📖 ${s}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

function filterGlossary() {
  const text = document.getElementById('glossary-filter').value.toLowerCase();
  currentGlossaryFilter.text = text;
  applyGlossaryFilter();
}

function filterGlossaryByCategory(cat) {
  currentGlossaryFilter.category = cat;
  currentGlossaryFilter.letter = '';

  // Update filter chips
  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.classList.toggle('active', 
      (cat === 'all' && chip.textContent.trim() === 'すべて') ||
      chip.textContent.trim() === (GLOSSARY_CATEGORIES[cat]?.label || cat)
    );
  });

  // Reset alphabet
  document.querySelectorAll('.alpha-link').forEach(a => a.classList.remove('active'));

  applyGlossaryFilter();
}

function filterGlossaryByLetter(letter) {
  currentGlossaryFilter.letter = currentGlossaryFilter.letter === letter ? '' : letter;

  // Update alphabet links
  document.querySelectorAll('.alpha-link').forEach(a => {
    a.classList.toggle('active', a.dataset.letter === currentGlossaryFilter.letter);
  });

  applyGlossaryFilter();
}

function applyGlossaryFilter() {
  const { text, category, letter } = currentGlossaryFilter;

  let filtered = GLOSSARY_DATA;

  if (text) {
    filtered = filtered.filter(g =>
      g.term.toLowerCase().includes(text) ||
      g.fullName.toLowerCase().includes(text) ||
      g.ja.includes(text) ||
      g.definition.includes(text) ||
      g.relatedSpecs.some(s => s.toLowerCase().includes(text))
    );
  }

  if (category !== 'all') {
    filtered = filtered.filter(g => g.category === category);
  }

  if (letter) {
    filtered = filtered.filter(g => g.term[0].toUpperCase() === letter);
  }

  renderGlossaryItems(filtered);
}

// ===================================================
// Tab 3: Reference (Commands & Tags)
// ===================================================
function renderReferenceTab() {
  renderReferenceItems();
}

function renderReferenceItems(cmdFilterText = '', tagFilterText = '') {
  const cmdList = document.getElementById('cmd-list');
  const tagList = document.getElementById('tag-list');

  // Filter commands
  let cmds = CMD_DATA;
  if (cmdFilterText) {
    const q = cmdFilterText.toLowerCase();
    cmds = cmds.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.cla.toLowerCase().includes(q) || 
      c.ins.toLowerCase().includes(q) || 
      c.description.toLowerCase().includes(q)
    );
  }

  // Render commands
  if (cmds.length === 0) {
    cmdList.innerHTML = `<div class="search-empty"><p>該当するコマンドがありません</p></div>`;
  } else {
    cmdList.innerHTML = cmds.map(c => `
      <div class="reference-item">
        <div class="cmd-header">
          <span class="cmd-name">${c.name}</span>
          <span class="cmd-code">CLA: ${c.cla} | INS: ${c.ins}</span>
          <span class="glossary-category-tag" style="background: rgba(99, 102, 241, 0.1); border-color: rgba(99, 102, 241, 0.2); color: var(--accent-indigo); margin-left: auto;">
            ${c.category}
          </span>
        </div>
        <div class="reference-desc">${c.description}</div>
        <div class="glossary-refs">
          ${c.relatedSpecs.map(s => `<span class="ref-tag">📖 ${s}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  // Filter tags
  let tags = TAG_DATA;
  if (tagFilterText) {
    const q = tagFilterText.toLowerCase();
    tags = tags.filter(t => 
      t.tag.toLowerCase().includes(q) || 
      t.name.toLowerCase().includes(q) || 
      t.description.toLowerCase().includes(q)
    );
  }

  // Render tags
  if (tags.length === 0) {
    tagList.innerHTML = `<div class="search-empty"><p>該当するタグがありません</p></div>`;
  } else {
    tagList.innerHTML = tags.map(t => `
      <div class="reference-item">
        <div class="tag-header">
          <span class="tag-hex">${t.tag}</span>
          <span class="tag-name">${t.name}</span>
          <span class="glossary-category-tag" style="background: rgba(52, 211, 153, 0.1); border-color: rgba(52, 211, 153, 0.2); color: var(--accent-emerald); margin-left: auto;">
            ${t.source}
          </span>
        </div>
        <div class="tag-meta">
          <span>Format: ${t.format}</span> | <span>Length: ${t.length}</span>
        </div>
        <div class="reference-desc">${t.description}</div>
      </div>
    `).join('');
  }
}

function filterReference() {
  const cmdText = document.getElementById('cmd-filter').value;
  const tagText = document.getElementById('tag-filter').value;
  renderReferenceItems(cmdText, tagText);
}

// ===================================================
// Tab 4: Sequence Diagrams
// ===================================================
function renderSequenceTab() {
  const container = document.getElementById('sequence-list');
  let html = '';

  for (const seq of SEQUENCE_DATA) {
    const catClass = seq.category === 'contact' ? 'contact' : 'contactless';
    const catLabel = seq.category === 'contact' ? '🔌 Contact' : '📡 Contactless';
    
    let stepsHtml = '';
    seq.steps.forEach((step, idx) => {
      stepsHtml += `
        <div class="sequence-step-item">
          <div class="step-number">${idx + 1}.</div>
          <div class="step-desc"><strong>${step.step}:</strong> ${step.description}</div>
        </div>
      `;
    });

    html += `
      <div class="sequence-card" id="seq-${seq.id}">
        <div class="sequence-header">
          <div class="sequence-title">
            ${seq.title}
            <span class="category-badge ${catClass}">${catLabel}</span>
          </div>
          <div class="sequence-desc">${seq.description}</div>
        </div>
        
        <div class="sequence-diagram">
          <pre class="mermaid">${seq.mermaid}</pre>
        </div>
        
        <div class="sequence-steps">
          <h3 class="sequence-steps-title">ステップ解説</h3>
          <div class="sequence-steps-list">
            ${stepsHtml}
          </div>
        </div>
      </div>
    `;
  }
  
  container.innerHTML = html;
}

// Ensure Mermaid processes dynamically added diagrams when tab switches
function processMermaidDiagrams() {
  if (window.mermaid) {
    try {
      mermaid.init(undefined, document.querySelectorAll('.mermaid'));
    } catch (e) {
      console.error("Mermaid parsing failed", e);
    }
  }
}

// Optional intercept for switchTab to hook into visibility
const originalSwitchTab = switchTab;
switchTab = function(tabId) {
  originalSwitchTab(tabId);
  if (tabId === 'sequence') {
    // Adding slight delay to allow display:block before rendering SVG
    setTimeout(processMermaidDiagrams, 50);
  }
};

// ===================================================
// Tab 5: Search
// ===================================================
function initSearch() {
  const input = document.getElementById('search-input');
  let debounceTimer = null;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => performSearch(input.value), 200);
  });

  // Render suggestion chips
  const suggestions = [
    'PIN暗号化', 'オフライン認証', 'CVM', 'GENERATE AC', 'kernel',
    'AID', 'アプリケーション選択', 'RSA', 'ECC', 'TLV',
    '状態遷移', 'Data Storage', '署名検証', 'セキュアメッセージング'
  ];

  document.getElementById('search-suggestions').innerHTML = suggestions.map(s =>
    `<button class="suggestion-chip" onclick="searchFor('${s}')">${s}</button>`
  ).join('');

  // Show initial empty state
  showSearchEmpty();
}

function searchFor(term) {
  document.getElementById('search-input').value = term;
  performSearch(term);
}

function performSearch(query) {
  if (!query || query.trim().length < 1) {
    showSearchEmpty();
    return;
  }

  const q = query.toLowerCase().trim();
  const results = { specs: [], glossary: [], commands: [], tags: [], sequences: [] };

  // Search in spec chapters
  for (const [catKey, category] of Object.entries(SPEC_DATA)) {
    for (const book of category.books) {
      for (const chapter of book.chapters) {
        const score = calcRelevance(q, [
          chapter.title,
          chapter.summary,
          ...chapter.keywords,
          chapter.number
        ]);

        if (score > 0) {
          results.specs.push({
            score,
            category: catKey,
            filename: book.filename,
            page: chapter.page,
            bookTitle: book.title,
            bookId: book.id,
            chapterNumber: chapter.number,
            chapterTitle: chapter.title,
            summary: chapter.summary,
            keywords: chapter.keywords
          });
        }
      }
    }
  }

  // Search in glossary
  for (const g of GLOSSARY_DATA) {
    const score = calcRelevance(q, [
      g.term,
      g.fullName,
      g.ja,
      g.definition,
      ...g.relatedSpecs
    ]);

    if (score > 0) {
      results.glossary.push({
        score,
        ...g
      });
    }
  }

  // Search in commands
  for (const c of CMD_DATA) {
    const score = calcRelevance(q, [
      c.name, c.cla, c.ins, c.description, ...c.relatedSpecs
    ]);
    if (score > 0) results.commands.push({ score, ...c });
  }

  // Search in tags
  for (const t of TAG_DATA) {
    const score = calcRelevance(q, [
      t.tag, t.name, t.description, t.format, t.source
    ]);
    if (score > 0) results.tags.push({ score, ...t });
  }

  // Search in sequences
  for (const s of SEQUENCE_DATA) {
    const stepTexts = s.steps.map(step => step.step + " " + step.description);
    const score = calcRelevance(q, [
      s.title, s.description, s.mermaid, ...stepTexts
    ]);
    if (score > 0) results.sequences.push({ score, ...s });
  }

  // Sort by relevance
  results.specs.sort((a, b) => b.score - a.score);
  results.glossary.sort((a, b) => b.score - a.score);
  results.commands.sort((a, b) => b.score - a.score);
  results.tags.sort((a, b) => b.score - a.score);
  results.sequences.sort((a, b) => b.score - a.score);

  renderSearchResults(results, q);
}

function calcRelevance(query, fields) {
  let score = 0;
  const q = query.toLowerCase();

  for (const field of fields) {
    if (!field) continue;
    const f = field.toLowerCase();

    if (f === q) score += 10;
    else if (f.startsWith(q)) score += 5;
    else if (f.includes(q)) score += 2;
  }

  return score;
}

function highlightText(text, query) {
  if (!query) return text;
  const q = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${q})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

function renderSearchResults(results, query) {
  const container = document.getElementById('search-results');
  const stats = document.getElementById('search-stats');
  const total = results.specs.length + results.glossary.length;

  stats.textContent = `${total} 件の結果が見つかりました`;

  if (total === 0) {
    container.innerHTML = `
      <div class="search-empty">
        <div class="search-empty-icon">🔍</div>
        <h3>結果が見つかりませんでした</h3>
        <p>別のキーワードでお試しください。英語・日本語・略語に対応しています。</p>
      </div>
    `;
    return;
  }

  let html = '';

  // Spec results
  if (results.specs.length > 0) {
    html += `<div class="search-result-group">
      <div class="search-result-group-title">📖 仕様書の章 (${results.specs.length}件)</div>`;

    for (const r of results.specs.slice(0, 30)) {
      const catIcon = r.category === 'contact' ? '🔌' : '📡';
      html += `
        <div class="search-result-item" onclick="openPdfModal('${r.category}', '${r.filename}', ${r.page}, '${r.bookTitle} - Chapter ${r.chapterNumber}')">
          <div class="search-result-title">${highlightText(r.chapterTitle, query)} <span style="font-size:11px; color:var(--text-muted);">[p.${r.page}]</span></div>
          <div class="search-result-spec">${catIcon} ${r.bookTitle} — Chapter ${r.chapterNumber}</div>
          <div class="search-result-summary">${highlightText(r.summary, query)}</div>
        </div>
      `;
    }

    html += `</div>`;
  }

  // Glossary results
  if (results.glossary.length > 0) {
    html += `<div class="search-result-group">
      <div class="search-result-group-title">📝 用語 (${results.glossary.length}件)</div>`;

    for (const g of results.glossary.slice(0, 20)) {
      html += `
        <div class="search-result-item" onclick="navigateToGlossary('${g.term}')">
          <div class="search-result-title">
            ${highlightText(g.term, query)} 
            <span style="color: var(--text-secondary); font-weight: 400;">— ${highlightText(g.fullName, query)}</span>
          </div>
          <div class="search-result-spec">🇯🇵 ${highlightText(g.ja, query)}</div>
          <div class="search-result-summary">${highlightText(g.definition, query)}</div>
        </div>
      `;
    }

    html += `</div>`;
  }

  // Command results
  if (results.commands.length > 0) {
    html += `<div class="search-result-group">
      <div class="search-result-group-title">⚙️ APDU コマンド (${results.commands.length}件)</div>`;

    for (const c of results.commands.slice(0, 10)) {
      html += `
        <div class="search-result-item" onclick="navigateToReference('cmd', '${c.name}')">
          <div class="search-result-title">
            ${highlightText(c.name, query)}
            <span style="font-family: monospace; font-size: 11px; margin-left: 8px; color: var(--accent-cyan);">CLA:${highlightText(c.cla, query)} INS:${highlightText(c.ins, query)}</span>
          </div>
          <div class="search-result-summary">${highlightText(c.description, query)}</div>
        </div>
      `;
    }
    html += `</div>`;
  }

  // Tag results
  if (results.tags.length > 0) {
    html += `<div class="search-result-group">
      <div class="search-result-group-title">🏷️ データ要素・タグ (${results.tags.length}件)</div>`;

    for (const t of results.tags.slice(0, 15)) {
      html += `
        <div class="search-result-item" onclick="navigateToReference('tag', '${t.tag}')">
          <div class="search-result-title">
            <span style="font-family: monospace; color: var(--accent-amber); margin-right: 8px;">${highlightText(t.tag, query)}</span>
            ${highlightText(t.name, query)}
          </div>
          <div class="search-result-summary">${highlightText(t.description, query)}</div>
        </div>
      `;
    }
    html += `</div>`;
  }

  // Sequence results
  if (results.sequences.length > 0) {
    html += `<div class="search-result-group">
      <div class="search-result-group-title">🔄 シーケンス・通信フロー (${results.sequences.length}件)</div>`;

    for (const s of results.sequences.slice(0, 5)) {
      const catIcon = s.category === 'contact' ? '🔌' : '📡';
      html += `
        <div class="search-result-item" onclick="navigateToSequence('${s.id}')">
          <div class="search-result-title">${highlightText(s.title, query)}</div>
          <div class="search-result-spec">${catIcon} ${s.category === 'contact' ? 'Contact' : 'Contactless'} Transaction Flow</div>
          <div class="search-result-summary">${highlightText(s.description, query)}</div>
        </div>
      `;
    }
    html += `</div>`;
  }

  container.innerHTML = html;
}

function showSearchEmpty() {
  document.getElementById('search-stats').textContent = '';
  document.getElementById('search-results').innerHTML = `
    <div class="search-empty">
      <div class="search-empty-icon">✨</div>
      <h3>キーワードを入力するか、候補をクリック</h3>
      <p>仕様書の章と用語を横断的に検索します</p>
    </div>
  `;
}

// ===================================================
// Navigation helpers
// ===================================================
function navigateToSpec(bookId) {
  switchTab('specs');
  setTimeout(() => {
    const card = document.getElementById(`card-${bookId}`);
    if (card) {
      card.classList.add('expanded');
      card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}

function navigateToGlossary(term) {
  switchTab('glossary');
  setTimeout(() => {
    const filterInput = document.getElementById('glossary-filter');
    if (filterInput) {
      filterInput.value = term;
      filterGlossary();
    }
  }, 100);
}

function navigateToReference(type, term) {
  switchTab('reference');
  setTimeout(() => {
    if (type === 'cmd') {
      const input = document.getElementById('cmd-filter');
      if (input) {
        input.value = term;
        filterReference();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else if (type === 'tag') {
      const input = document.getElementById('tag-filter');
      if (input) {
        input.value = term;
        filterReference();
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, 100);
}

function navigateToSequence(id) {
  switchTab('sequence');
  setTimeout(() => {
    const el = document.getElementById(`seq-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.style.border = '1px solid var(--accent-indigo)';
      el.style.boxShadow = 'var(--shadow-glow)';
      setTimeout(() => {
        el.style.border = '';
        el.style.boxShadow = '';
      }, 2000);
    }
  }, 100);
}

// ===================================================
// PDF Modal Viewer
// ===================================================
function openPdfModal(category, filename, page, title) {
  const modal = document.getElementById('pdf-modal');
  const iframe = document.getElementById('pdf-iframe');
  const titleEl = document.getElementById('pdf-modal-title');
  const downloadBtn = document.getElementById('pdf-modal-download');
  const newtabBtn = document.getElementById('pdf-modal-newtab');
  
  // Construct URL
  const pdfUrl = `spec/${category}/${filename}`;
  const fullUrl = `${pdfUrl}#page=${page}&view=FitH`;
  
  // Update UI
  titleEl.textContent = title;
  downloadBtn.href = pdfUrl;
  newtabBtn.href = fullUrl;
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
  
  // Load PDF
  iframe.classList.remove('loaded');
  iframe.onload = () => iframe.classList.add('loaded');
  iframe.src = fullUrl;
}

function closePdfModal() {
  const modal = document.getElementById('pdf-modal');
  const iframe = document.getElementById('pdf-iframe');
  
  modal.classList.remove('active');
  document.body.style.overflow = '';
  
  // Clear src after transition to stop memory leaks
  setTimeout(() => {
    iframe.src = 'about:blank';
    iframe.classList.remove('loaded');
  }, 300);
}

// Close modal on escape key or outside click
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePdfModal();
});

document.getElementById('pdf-modal')?.addEventListener('click', (e) => {
  if (e.target.id === 'pdf-modal') closePdfModal();
});
