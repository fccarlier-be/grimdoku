// Grimdoku — fusion de deux progressions (sauvegarde en ligne, compte Google).
// Une progression = les clés « grimdoku:* » du navigateur, sans le préfixe : p:<affaire>, seen:<affaire>, rate:<affaire>,
// lettres, lettres-lues, lieux-vus, prologue. Les réglages de l'appareil (settings, compte) ne voyagent pas.
// Partagé par la page (window.GrimSync) et les tests (require).
(function (root) {
  'use strict';
  const LISTS = ['lettres', 'lettres-lues', 'lieux-vus']; // ce qu'on a reçu, lu ou vu ne se perd pas : union
  const LOCAL = ['settings', 'compte', 'oauth'];          // propres à l'appareil (oauth : connexion en cours)
  const keep = (k) => !LOCAL.includes(k);
  // état d'une affaire : le plus récent l'emporte (t, posé à chaque sauvegarde) ; sans date, la résolue, puis la plus avancée
  function newer(a, b) {
    if (a.t || b.t) return (a.t || 0) >= (b.t || 0) ? a : b;
    if (!!a.solved !== !!b.solved) return a.solved ? a : b;
    return Object.keys(a.pos || {}).length >= Object.keys(b.pos || {}).length ? a : b;
  }
  function merge(local, remote) {
    local = local || {}; remote = remote || {};
    const out = {};
    for (const k of new Set([...Object.keys(local), ...Object.keys(remote)])) {
      if (!keep(k)) continue;
      const a = local[k], b = remote[k];
      if (a === undefined || a === null) out[k] = b;
      else if (b === undefined || b === null) out[k] = a;
      else if (LISTS.includes(k)) out[k] = [...new Set([].concat(a, b))];
      else if (k.startsWith('p:')) out[k] = newer(a, b);
      else if (k === 'prologue' || k.startsWith('seen:')) out[k] = !!(a || b);
      else out[k] = a; // note de difficulté… : celle de cet appareil
    }
    return out;
  }
  // comparaison indépendante de l'ordre des clés
  const canon = (v) => Array.isArray(v) ? '[' + v.map(canon).join(',') + ']'
    : v && typeof v === 'object' ? '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}'
    : JSON.stringify(v);
  const same = (a, b) => canon(a) === canon(b);
  const api = { merge, same, keep };
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.GrimSync = api;
})(this);
