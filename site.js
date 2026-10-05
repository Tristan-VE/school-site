/* Bouwt de pagina op uit content.js en regelt het grote venster (foto of 3D). */
(function () {
  var S = window.SITE;
  var pagina = document.body.getAttribute('data-pagina');
  var P = S && S[pagina];
  if (!P) return;
  var T = S.teksten;

  function el(tag, cls, tekst) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (tekst) e.textContent = tekst;
    return e;
  }
  function $(id) { return document.getElementById(id); }

  /* ---------- vaste teksten ---------- */
  document.title = P.tabtitel;
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', P.beschrijving);
  $('naam').textContent = S.naam;
  $('ondertitel').textContent = S.ondertitel;
  S.menu.forEach(function (m) {
    var a = el('a', '', m.tekst);
    a.href = m.link;
    if (m.pagina === pagina) a.setAttribute('aria-current', 'page');
    $('menu').appendChild(a);
  });
  $('voet-tekst').textContent = S.voettekst;
  $('voet-link').textContent = P.voetlink.tekst;
  $('voet-link').href = P.voetlink.link;

  /* ---------- home ---------- */
  if (pagina === 'home') {
    var over = $('over');
    var top = el('div', 'over-top');
    var tekstkolom = el('div', 'over-tekst');
    tekstkolom.appendChild(el('h2', '', P.titel));
    (P.alineas || []).forEach(function (a) { tekstkolom.appendChild(el('p', '', a)); });
    top.appendChild(tekstkolom);
    if (P.foto) {
      var f = el('img', 'over-foto');
      f.src = P.foto;
      f.alt = P.fotoAlt || '';
      top.appendChild(f);
      over.classList.add('met-foto');
    }
    over.appendChild(top);
    if (P.kaarten && P.kaarten.length) {
      var sec = el('div');
      sec.appendChild(el('h2', 'kaarten-kop', P.kaartKop));
      var kaarten = el('div', 'kaarten');
      P.kaarten.forEach(function (k) {
        var a = el('a', 'kaart');
        a.href = k.link;
        a.appendChild(el('h3', '', k.titel));
        if (k.tekst) a.appendChild(el('p', '', k.tekst));
        kaarten.appendChild(a);
      });
      sec.appendChild(kaarten);
      over.appendChild(sec);
    }
    return;
  }

  /* ---------- inleiding ---------- */
  var inl = Array.isArray(P.intro) ? P.intro : [P.intro];
  inl.forEach(function (t) { $('intro').appendChild(el('p', 'intro', t)); });

  /* ---------- blokjes ---------- */
  var blokken = P.blokjes;
  var raster = $('blokken');
  if (!blokken.length) { raster.hidden = true; return; }

  function plaatjes(item) {
    if (item.afbeeldingen) return item.afbeeldingen;
    if (item.afbeelding) {
      return [{ bestand: item.afbeelding, alt: item.alt, breedte: item.breedte, hoogte: item.hoogte }];
    }
    return [];
  }

  blokken.forEach(function (item, i) {
    var fig = el('figure');
    var lijst = plaatjes(item);
    var houder = fig;
    if (lijst.length > 1) {
      fig.className = 'wide';
      houder = el('div', 'pair');
      fig.appendChild(houder);
    }
    if (!lijst.length) lijst = [null];

    lijst.forEach(function (p) {
      var knop = el('button', item.model ? 'zoom model' : 'zoom');
      knop.type = 'button';
      var alt = (p && p.alt) || item.tekst || item.titel;
      knop.setAttribute('aria-label', (item.model ? T.bekijk3d : T.vergroot) + alt);
      if (p) {
        var img = el('img');
        img.src = p.bestand;
        img.alt = alt;
        if (p.breedte) img.width = p.breedte;
        if (p.hoogte) img.height = p.hoogte;
        img.loading = 'lazy';
        knop.appendChild(img);
      } else {
        knop.classList.add('leeg');
        knop.appendChild(el('span', '', '3D'));
      }
      knop.addEventListener('click', function () { openVenster(i); });
      houder.appendChild(knop);
    });

    var cap = el('figcaption');
    cap.appendChild(el('h2', '', item.titel));
    if (item.tekst) cap.appendChild(el('p', '', item.tekst));
    if (item.onderdelen && item.onderdelen.length) {
      var ul = el('ul', 'onderdelen');
      item.onderdelen.forEach(function (z) { ul.appendChild(el('li', '', z)); });
      cap.appendChild(ul);
    }
    fig.appendChild(cap);
    if (item.code) {
      var cd = el('div', 'code');
      cd.appendChild(el('h3', '', T.codeKop));
      var ck = el('button', 'zoom codeknop');
      ck.type = 'button';
      ck.setAttribute('aria-label', T.vergroot + T.codeBij + item.titel);
      var ci = el('img');
      ci.src = item.code;
      ci.alt = T.codeBij + item.titel;
      if (item.codeBreedte) ci.width = item.codeBreedte;
      if (item.codeHoogte) ci.height = item.codeHoogte;
      ci.loading = 'lazy';
      ck.appendChild(ci);
      ck.addEventListener('click', function () { openVenster(i, 'code'); });
      cd.appendChild(ck);
      if (T.codeHint) cd.appendChild(el('p', 'codehint', T.codeHint));
      if (item.codetekst) cd.appendChild(el('p', 'codetekst', item.codetekst));
      fig.appendChild(cd);
    }
    raster.appendChild(fig);
  });

  /* ---------- groot venster ---------- */
  var dlg = $('viewer');
  if (!dlg || !dlg.showModal) return;
  var vimg = $('vimg'), v3d = $('v3d'), vhint = $('vhint');
  var vtitle = $('vtitle'), vtext = $('vtext'), vcount = $('vcount');
  $('vprev').textContent = T.vorige;
  $('vclose').textContent = T.sluiten;
  $('vnext').textContent = T.volgende;

  var cur = 0, scene = null, token = 0, cache = {};
  var fotoKleur = pagina === 'inventor' ? '#303744' : '#fff';

  function bytes(b64) {
    var bin = atob(b64), n = bin.length, u = new Uint8Array(n);
    for (var k = 0; k < n; k++) u[k] = bin.charCodeAt(k);
    return u.buffer;
  }

  /* Eerst gewoon het bestand ophalen. Lukt dat niet (bijv. omdat je de site
     lokaal opent door te dubbelklikken), dan gebruiken we modellen.js. */
  function haalModel(url) {
    if (cache[url]) return Promise.resolve(cache[url]);
    var ingebouwd = window.MODELLEN && window.MODELLEN[url];
    var p;
    if (location.protocol === 'file:') {
      p = ingebouwd ? Promise.resolve(bytes(ingebouwd)) : Promise.reject(new Error('Niet in modellen.js: ' + url));
    } else {
      p = fetch(url).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.arrayBuffer();
      }).catch(function (e) {
        if (ingebouwd) return bytes(ingebouwd);
        throw e;
      });
    }
    return p.then(function (buf) { cache[url] = buf; return buf; });
  }

  function toonFoto(item, melding, extra) {
    if (scene) scene.stop();
    v3d.hidden = true;
    var p = extra ? { bestand: extra.src, alt: extra.alt } : plaatjes(item)[0];
    vimg.hidden = !p;
    if (p) {
      vimg.src = p.bestand;
      vimg.alt = p.alt || item.tekst || item.titel;
      vimg.style.background = fotoKleur;
    }
    vhint.textContent = melding || '';
    vhint.hidden = !melding;
  }

  function toon3d(item) {
    var mijn = ++token;
    vimg.hidden = true;
    v3d.hidden = false;
    vhint.hidden = false;
    vhint.textContent = T.laden;
    if (!scene) {
      try { scene = window.Weergave3D.maak(v3d); }
      catch (e) { scene = null; toonFoto(item, T.geenWebgl); return; }
    }
    scene.formaat();
    haalModel(item.model).then(function (buf) {
      if (mijn !== token) return;
      scene.laad(buf);
      scene.start();
      vhint.textContent = T.hint3d;
    }).catch(function (e) {
      if (window.console) console.warn('3D-model laden mislukt:', e);
      if (mijn === token) toonFoto(item, T.foutModel);
    });
  }

  function toon(i, soort) {
    cur = (i + blokken.length) % blokken.length;
    var item = blokken[cur];
    var titel = item.titel, tekst = item.tekst;
    if (soort === 'code' && item.code) {
      token++;
      toonFoto(item, '', { src: item.code, alt: T.codeBij + item.titel });
      titel = T.codeBij + item.titel;
      tekst = item.codetekst;
    } else if (item.model && window.Weergave3D) toon3d(item);
    else { token++; toonFoto(item); }
    vtitle.textContent = titel;
    vtext.textContent = tekst || '';
    vtext.hidden = !tekst;
    vcount.textContent = (cur + 1) + ' ' + T.van + ' ' + blokken.length;
  }

  function openVenster(i, soort) { dlg.showModal(); toon(i, soort); }

  dlg.addEventListener('close', function () {
    token++;
    if (scene) { scene.weg(); scene = null; }
  });
  window.addEventListener('resize', function () { if (scene && dlg.open) scene.formaat(); });
  $('vprev').addEventListener('click', function () { toon(cur - 1); });
  $('vnext').addEventListener('click', function () { toon(cur + 1); });
  $('vclose').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') toon(cur - 1);
    if (e.key === 'ArrowRight') toon(cur + 1);
  });
})();
