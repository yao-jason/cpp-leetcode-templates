fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const body = document.body;
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebar-toggle');
    const patternTabs = document.getElementById('pattern-tabs');
    const grid = document.getElementById('card-grid');

    toggle.onclick = () => {
      body.classList.toggle('sidebar-closed');
    };

    const clear = el => { while (el.firstChild) el.removeChild(el.firstChild); };

    Object.keys(data).forEach((pattern, idx) => {
      const btn = document.createElement('button');
      btn.textContent = pattern;
      if (idx === 0) btn.classList.add('active');
      btn.onclick = () => {
        document.querySelectorAll('#pattern-tabs button')
          .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCards(data[pattern]);
      };
      patternTabs.appendChild(btn);
    });

    function renderCards(problems) {
      clear(grid);
      problems.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';

        const h2 = document.createElement('h2');
        const a = document.createElement('a');
        a.href = p.link;
        a.target = '_blank';
        a.textContent = p.title;
        h2.appendChild(a);
        card.appendChild(h2);

        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.className = 'language-cpp';
        code.textContent = p.code;
        pre.appendChild(code);
        card.appendChild(pre);

        grid.appendChild(card);
      });
      hljs.highlightAll();
    }

    renderCards(data[Object.keys(data)[0]]);
  })
  .catch(err => console.error('載入 data.json 失敗', err));
