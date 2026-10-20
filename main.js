import { COMPAS } from './logic.js';
import { LEVELS, CHALLENGES, MATH_PROBLEMS, LEVEL_LESSONS, PETS } from './data.js';

(function () {
      'use strict';

      var TYPES = COMPAS.TYPES;

      var SOUNDS = {
        drum:   { name: 'Tambor', className: 'sound-drum', icon: '<svg viewBox="0 0 32 32" aria-hidden="true"><ellipse cx="16" cy="8" rx="10" ry="4"></ellipse><path d="M6 8v15c0 2 4.5 4 10 4s10-2 10-4V8M6 16c0 2 4.5 4 10 4s10-2 10-4"></path></svg>' },
        kick:   { name: 'Bombo', className: 'sound-kick', icon: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11"></circle><circle cx="16" cy="16" r="4"></circle><path d="M5 27h22"></path></svg>' },
        snare:  { name: 'Caja', className: 'sound-snare', icon: '<svg viewBox="0 0 32 32" aria-hidden="true"><ellipse cx="16" cy="10" rx="10" ry="4"></ellipse><path d="M6 10v11c0 2 4.5 4 10 4s10-2 10-4V10M8 23l16-10M8 13l16 10"></path></svg>' },
        shaker: { name: 'Shaker', className: 'sound-shaker', icon: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 5h10l3 6-4 16h-8L8 11l3-6Z"></path><path d="M9 12h14"></path></svg>' },
        clap:   { name: 'Palmas', className: 'sound-clap', icon: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 17V8a2 2 0 0 1 4 0v7-10a2 2 0 0 1 4 0v10-8a2 2 0 0 1 4 0v9-6a2 2 0 0 1 4 0v10c0 5-4 8-9 8-6 0-9-4-11-8l4-3Z"></path></svg>' },
        bell:   { name: 'Campana', className: 'sound-bell', icon: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 23h16l-3-4v-6a5 5 0 0 0-10 0v6l-3 4Z"></path><path d="M13 26c1 2 5 2 6 0"></path></svg>' },
        piano:  { name: 'Piano juguetón', className: 'sound-snare', melodic: true, icon: '' },
        guitar: { name: 'Cuerda pulsada', className: 'sound-shaker', melodic: true, icon: '' },
        strings:{ name: 'Colchón de cuerdas', className: 'sound-kick', melodic: true, icon: '' },
        marimba:  { name: 'Marimba cálida', className: 'sound-marimba', melodic: true, icon: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="6" width="5" height="20" rx="1.5" fill="currentColor"/><rect x="11" y="8" width="5" height="18" rx="1.5" fill="currentColor"/><rect x="18" y="10" width="5" height="16" rx="1.5" fill="currentColor"/><rect x="25" y="12" width="5" height="14" rx="1.5" fill="currentColor"/></svg>' },
        xylophone:{ name: 'Xilófono brillante', className: 'sound-xylophone', melodic: true, icon: '<svg viewBox="0 0 32 32" aria-hidden="true"><polygon points="5,8 27,13 27,24 5,28" fill="none" stroke="currentColor" stroke-width="2"/><line x1="9" y1="9" x2="9" y2="27" stroke="currentColor" stroke-width="2"/><line x1="14" y1="10" x2="14" y2="26" stroke="currentColor" stroke-width="2"/><line x1="19" y1="11" x2="19" y2="25" stroke="currentColor" stroke-width="2"/><line x1="24" y1="12" x2="24" y2="24" stroke="currentColor" stroke-width="2"/></svg>' },
        flute:    { name: 'Flauta dulce', className: 'sound-flute', melodic: true, icon: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="13" width="24" height="6" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="10" cy="16" r="1.5" fill="currentColor"/><circle cx="15" cy="16" r="1.5" fill="currentColor"/><circle cx="20" cy="16" r="1.5" fill="currentColor"/><circle cx="25" cy="16" r="1.5" fill="currentColor"/></svg>' },
        bells:    { name: 'Campanitas mágicas', className: 'sound-bell', melodic: true, icon: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="12" cy="14" r="5" fill="currentColor"/><circle cx="20" cy="18" r="6" fill="currentColor"/><path d="M12 9 L20 12" stroke="currentColor" stroke-width="2"/></svg>' },
        synth:    { name: 'Sintetizador pop', className: 'sound-kick', melodic: true, icon: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="10" width="22" height="12" rx="2" fill="currentColor"/><circle cx="9" cy="16" r="2" fill="#fff"/><circle cx="16" cy="16" r="2" fill="#fff"/><line x1="21" y1="13" x2="25" y2="13" stroke="#fff" stroke-width="1.5"/><line x1="21" y1="16" x2="25" y2="16" stroke="#fff" stroke-width="1.5"/></svg>' }
      };
      
      var mathOperationStrip = document.getElementById('mathOperationStrip');
      var mathProblemView = document.getElementById('mathProblemView');
      var mathListenBtn = document.getElementById('mathListenBtn');
      var levelSelectToggle = document.getElementById('levelSelectToggle');
      var levelJumpMenu = document.getElementById('levelJumpMenu');
      var progressTrack = document.getElementById('progressTrack');
      var streak3 = document.getElementById('streak3');
      var streak4 = document.getElementById('streak4');

      function currentMathProblem() {
        if (!MATH_PROBLEMS[state.level]) return null;
        var list = MATH_PROBLEMS[state.level];
        return list[state.challengeIndex % list.length];
      }

      function renderMathProblemView() {
        if (!mathProblemView) return;
        var prob = currentMathProblem();
        if (!prob) {
          mathOperationStrip.hidden = true;
          return;
        }
        mathOperationStrip.hidden = false;
        mathProblemView.innerHTML = '';

        function makeGroup(count, className, labelText) {
          var g = document.createElement('div');
          g.className = 'math-group';
          var dotsWrap = document.createElement('div');
          dotsWrap.className = 'math-dots';
          for (var i = 0; i < count; i++) {
            var dot = document.createElement('span');
            dot.className = 'math-dot ' + className;
            dot.dataset.group = labelText;
            dot.dataset.index = i;
            dotsWrap.appendChild(dot);
          }
          g.appendChild(dotsWrap);
          var countLbl = document.createElement('span');
          countLbl.className = 'math-group-count';
          countLbl.textContent = count + (count === 1 ? ' golpe' : ' golpes');
          g.appendChild(countLbl);
          return g;
        }

        function makeSign(symbol) {
          var s = document.createElement('span');
          s.className = 'math-sign';
          s.textContent = symbol;
          return s;
        }

        if (prob.op === '+') {
          mathProblemView.appendChild(makeGroup(prob.a, '', 'A'));
          mathProblemView.appendChild(makeSign('+'));
          mathProblemView.appendChild(makeGroup(prob.b, 'dot-blue', 'B'));
        } else if (prob.op === '−') {
          // Resta: grupo inicial de activos y grupo a restar
          mathProblemView.appendChild(makeGroup(prob.initial, '', 'Inicial'));
          mathProblemView.appendChild(makeSign('−'));
          mathProblemView.appendChild(makeGroup(prob.sub, 'dot-silent', 'Resta'));
        } else if (prob.op === 'chain') {
          mathProblemView.appendChild(makeGroup(prob.a, '', 'A'));
          mathProblemView.appendChild(makeSign('+'));
          mathProblemView.appendChild(makeGroup(prob.b, 'dot-blue', 'B'));
          mathProblemView.appendChild(makeSign('+'));
          mathProblemView.appendChild(makeGroup(prob.c, 'dot-green', 'C'));
        } else if (prob.op === '×') {
          // Multiplicación: [group dots] × times veces
          var repBox = document.createElement('div');
          repBox.className = 'math-repeat-box';
          for (var t = 0; t < prob.times; t++) {
            var gSub = makeGroup(prob.group, t === 0 ? '' : (t === 1 ? 'dot-blue' : 'dot-green'), 'Repetición ' + (t + 1));
            repBox.appendChild(gSub);
          }
          mathProblemView.appendChild(repBox);
          mathProblemView.appendChild(makeSign('(' + prob.times + ' veces)'));
        } else if (prob.op === '÷') {
          // División: totalAmount repartido en groupsCount
          mathProblemView.appendChild(makeGroup(prob.totalAmount, '', 'Total'));
          mathProblemView.appendChild(makeSign('÷'));
          var divInfo = document.createElement('div');
          divInfo.className = 'math-div-group';
          divInfo.innerHTML = '<span style="font-size:1.15rem;font-weight:900">' + prob.groupsCount + '</span><span style="font-size:.65rem;text-transform:uppercase">grupos</span>';
          mathProblemView.appendChild(divInfo);
        } else if (prob.op === 'table') {
          // Tabla con ritmo
          var tableCard = document.createElement('div');
          tableCard.className = 'math-group';
          tableCard.innerHTML = '<span class="math-table-badge">Tabla del ' + prob.table + '</span><div class="math-dots"></div><span class="math-group-count">' + prob.count + ' × ' + prob.table + '</span>';
          var dotsWrapT = tableCard.querySelector('.math-dots');
          for (var td = 0; td < prob.total; td++) {
            var dotT = document.createElement('span');
            dotT.className = 'math-dot ' + (td % prob.table === 0 ? '' : 'dot-blue');
            dotsWrapT.appendChild(dotT);
          }
          mathProblemView.appendChild(tableCard);
        } else if (prob.op === 'mix4') {
          // Mix 4 operaciones: (2 x 2) + 3
          mathProblemView.appendChild(makeGroup(2, '', '2 veces 2'));
          mathProblemView.appendChild(makeGroup(2, 'dot-blue', ''));
          mathProblemView.appendChild(makeSign('+'));
          mathProblemView.appendChild(makeGroup(prob.plus, 'dot-green', 'Extra'));
        }

        mathProblemView.appendChild(makeSign('='));

        var targetGroup = document.createElement('div');
        targetGroup.className = 'math-group target';
        targetGroup.innerHTML = '<span class="math-target-badge">?</span><span class="math-group-count">toca ' + prob.total + ' en compás</span>';
        mathProblemView.appendChild(targetGroup);
      }

      function playMathOperation() {
        if (state.playing) return;
        var prob = currentMathProblem();
        if (!prob) return;
        var ctx = makeAudio();
        if (!ctx) return;

        state.playing = true;
        mathListenBtn.disabled = true;
        setFeedback('Escucha con atención los grupos de golpes...', '');

        var now = ctx.currentTime + 0.05;
        var unitMs = (prob.tempo || 220);
        var curMs = 0;

        var allDots = Array.prototype.slice.call(mathProblemView.querySelectorAll('.math-dot'));
        allDots.forEach(function (d) { d.classList.remove('pulsing'); });

        function pulseDot(dotEl, delay) {
          setTimeout(function () {
            if (dotEl) {
              dotEl.classList.add('pulsing');
              setTimeout(function () { dotEl.classList.remove('pulsing'); }, 200);
            }
          }, delay);
        }

        if (prob.op === '+') {
          var dotsA = mathProblemView.querySelectorAll('.math-dot:not(.dot-blue):not(.dot-green)');
          for (var i = 0; i < prob.a; i++) {
            (function (idx) {
              var at = now + curMs / 1000;
              playPercussion(state.selectedSound, at, 0.7);
              pulseDot(dotsA[idx], curMs);
              curMs += unitMs;
            }(i));
          }
          curMs += 350; // Pausa entre sumandos
          var dotsB = mathProblemView.querySelectorAll('.math-dot.dot-blue');
          for (var j = 0; j < prob.b; j++) {
            (function (idx) {
              var at = now + curMs / 1000;
              playPercussion(state.selectedSound, at, 0.7);
              pulseDot(dotsB[idx], curMs);
              curMs += unitMs;
            }(j));
          }
        } else if (prob.op === '−') {
          var dotsInit = mathProblemView.querySelectorAll('.math-dot:not(.dot-silent)');
          for (var k = 0; k < prob.initial; k++) {
            (function (idx) {
              var at = now + curMs / 1000;
              playPercussion(state.selectedSound, at, 0.7);
              pulseDot(dotsInit[idx], curMs);
              curMs += unitMs;
            }(k));
          }
          curMs += 350; // Pausa
          var dotsSub = mathProblemView.querySelectorAll('.math-dot.dot-silent');
          for (var m = 0; m < prob.sub; m++) {
            (function (idx) {
              var at = now + curMs / 1000;
              noiseBurst(at, 0.09, 0.22, 600); // Sonido suave de silencio/apagado
              pulseDot(dotsSub[idx], curMs);
              curMs += unitMs;
            }(m));
          }
        } else if (prob.op === 'chain') {
          var dotsChA = mathProblemView.querySelectorAll('.math-dot:not(.dot-blue):not(.dot-green)');
          for (var c1 = 0; c1 < prob.a; c1++) {
            (function (idx) {
              playPercussion(state.selectedSound, now + curMs / 1000, 0.68);
              pulseDot(dotsChA[idx], curMs);
              curMs += unitMs;
            }(c1));
          }
          curMs += 300;
          var dotsChB = mathProblemView.querySelectorAll('.math-dot.dot-blue');
          for (var c2 = 0; c2 < prob.b; c2++) {
            (function (idx) {
              playPercussion(state.selectedSound, now + curMs / 1000, 0.68);
              pulseDot(dotsChB[idx], curMs);
              curMs += unitMs;
            }(c2));
          }
          curMs += 300;
          var dotsChC = mathProblemView.querySelectorAll('.math-dot.dot-green');
          for (var c3 = 0; c3 < prob.c; c3++) {
            (function (idx) {
              playPercussion(state.selectedSound, now + curMs / 1000, 0.68);
              pulseDot(dotsChC[idx], curMs);
              curMs += unitMs;
            }(c3));
          }
        } else if (prob.op === '×') {
          // Multiplicación sonora: repite 'times' veces el grupo de 'group' golpes
          var multDots = Array.prototype.slice.call(mathProblemView.querySelectorAll('.math-dot'));
          var dotPtr = 0;
          for (var t = 0; t < prob.times; t++) {
            for (var g = 0; g < prob.group; g++) {
              (function (dIdx) {
                playPercussion(state.selectedSound, now + curMs / 1000, 0.72);
                pulseDot(multDots[dIdx], curMs);
                curMs += unitMs;
              }(dotPtr++));
            }
            curMs += 320; // Pausa entre repeticiones rítmicas
          }
        } else if (prob.op === '÷') {
          // División sonora: reproduce el total y luego el pulso repartido
          var divDots = Array.prototype.slice.call(mathProblemView.querySelectorAll('.math-dot'));
          for (var da = 0; da < prob.totalAmount; da++) {
            (function (dIdx) {
              playPercussion(state.selectedSound, now + curMs / 1000, 0.6);
              pulseDot(divDots[dIdx], curMs);
              curMs += (unitMs * 0.85);
            }(da));
          }
          curMs += 400;
          chime(now + curMs / 1000); // Campana de reparto
          curMs += 300;
        } else if (prob.op === 'table') {
          // Tablas rítmicas: acento en múltiplos
          var tabDots = Array.prototype.slice.call(mathProblemView.querySelectorAll('.math-dot'));
          for (var tCount = 0; tCount < prob.total; tCount++) {
            (function (tIdx) {
              var isAccent = (tIdx % prob.table === 0);
              playPercussion(state.selectedSound, now + curMs / 1000, isAccent ? 0.85 : 0.45);
              pulseDot(tabDots[tIdx], curMs);
              curMs += unitMs;
            }(tCount));
          }
        } else if (prob.op === 'mix4') {
          // Mix 4: 2x2 + 3
          var mixDots = Array.prototype.slice.call(mathProblemView.querySelectorAll('.math-dot'));
          for (var mx = 0; mx < mixDots.length; mx++) {
            (function (mIdx) {
              playPercussion(state.selectedSound, now + curMs / 1000, 0.7);
              pulseDot(mixDots[mIdx], curMs);
              curMs += unitMs;
            }(mx));
          }
        }

        setTimeout(function () {
          state.playing = false;
          mathListenBtn.disabled = false;
          setFeedback('¡Ahora coloca ' + prob.total + ' golpes en el compás!', '');
          showPetSpeech('¡Toca ' + prob.total + ' golpes en el círculo!', 2800);
        }, curMs + 250);
      }

      mathListenBtn.addEventListener('click', playMathOperation);

      function renderLevelJumpMenu() {
        if (!levelJumpMenu) return;
        levelJumpMenu.innerHTML = '';
        for (var lvl = 1; lvl <= 18; lvl++) {
          (function (l) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'level-jump-btn' + (state.level === l ? ' active' : '');
            btn.textContent = 'N' + l;
            btn.title = LEVELS[l].title;
            btn.addEventListener('click', function () {
              state.level = l;
              state.streak = 0;
              state.challengeIndex = 0;
              state.levelErrors = 0;
              levelJumpMenu.hidden = true;
              levelSelectToggle.setAttribute('aria-expanded', 'false');
              clearCircle('Saltaste al ' + LEVELS[l].title);
              renderTray();
              renderStatus();
              setupChallenge();
              startLevelLesson(l);
            });
            levelJumpMenu.appendChild(btn);
          }(lvl));
        }
      }

      levelSelectToggle.addEventListener('click', function () {
        var isHidden = levelJumpMenu.hidden;
        levelJumpMenu.hidden = !isHidden;
        levelSelectToggle.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
        if (isHidden) renderLevelJumpMenu();
      });

      var GAME_SOUND_KEYS = ['drum', 'kick', 'snare', 'shaker', 'clap', 'bell', 'marimba', 'xylophone', 'flute'];


      /* Estado del juego */
      var state = {
        level: 1,
        streak: 0,
        score: 0,
        selected: 'quarter',
        selectedSound: 'drum',
        placements: [],
        nextId: 1,
        playing: false,
        demo: true,
        challengeIndex: 0,
        target: null,
        detectiveAttempts: 0,
        consecutiveFailures: 0,
        levelErrors: 0,
        creatorUnlocked: false
      };

      /* Estado de las mascotas con persistencia en localStorage */
      var petState = {
        id: 'bumbo',
        xp: 0,
        stage: 1,
        coins: 0,
        inventory: [],
        equipped: {},
        stallRate: 150,
        completedLevels: {},
        customName: '',
        signatureRhythm: null,
        tints: {}
      };

      function getPetDisplayName(petId) {
        if (petId === petState.id && petState.customName && petState.customName.trim()) {
          return petState.customName.trim();
        }
        return PETS[petId] ? PETS[petId].name : 'Mascota';
      }

      function loadPetStorage() {
        try {
          var raw = localStorage.getItem('compas_pet_v2');
          if (raw) {
            var data = JSON.parse(raw);
            if (data && PETS[data.id]) {
              petState.id = data.id;
              petState.xp = typeof data.xp === 'number' ? data.xp : 0;
              petState.stage = COMPAS.stageForXp(petState.xp);
              petState.coins = typeof data.coins === 'number' ? data.coins : 0;
              petState.inventory = Array.isArray(data.inventory) ? data.inventory : [];
              petState.equipped = (data.equipped && typeof data.equipped === 'object') ? data.equipped : {};
              petState.stallRate = (typeof data.stallRate === 'number' && data.stallRate > 0) ? data.stallRate : 150;
              petState.completedLevels = data.completedLevels || {};
              petState.customName = typeof data.customName === 'string' ? data.customName : '';
              petState.signatureRhythm = data.signatureRhythm || null;
              petState.tints = (data.tints && typeof data.tints === 'object') ? data.tints : {};
              return true;
            }
          }
        } catch (e) {
          console.warn('Error leyendo localStorage de mascotas', e);
        }
        return false;
      }

      function savePetStorage() {
        try {
          petState.stage = COMPAS.stageForXp(petState.xp);
          localStorage.setItem('compas_pet_v2', JSON.stringify({
            id: petState.id,
            xp: petState.xp,
            stage: petState.stage,
            coins: petState.coins,
            inventory: petState.inventory,
            equipped: petState.equipped,
            stallRate: petState.stallRate,
            completedLevels: petState.completedLevels,
            customName: petState.customName || '',
            signatureRhythm: petState.signatureRhythm || null,
            tints: petState.tints || {}
          }));
        } catch (e) {
          console.warn('Error guardando localStorage de mascotas', e);
        }
      }

      var hasStoredPet = loadPetStorage();

      var audio = null;
      var tray = document.getElementById('tray');
      var feedback = document.getElementById('feedback');
      var playBtn = document.getElementById('play');
      var loopBtn = document.getElementById('loop');
      var loopCounter = document.getElementById('loopCounter');
      var clearBtn = document.getElementById('clear');
      var measure = document.getElementById('measure');
      var wheel = document.getElementById('rhythmWheel');
      var wheelSlots = document.getElementById('wheelSlots');
      var wheelFills = document.getElementById('wheelFills');
      var wheelLabels = document.getElementById('wheelLabels');
      var playhead = document.getElementById('playhead');
      var circleGuide = document.getElementById('circleGuide');
      var soundOptions = document.getElementById('soundOptions');
      var detectiveListen = document.getElementById('detectiveListen');
      var SVG_NS = 'http://www.w3.org/2000/svg';

      /* Elementos UI de Mascotas */
      var petCorner = document.getElementById('petCorner');
      var petWidget = document.getElementById('petWidget');
      var petBubble = document.getElementById('petBubble');
      var petAvatarWrap = document.getElementById('petAvatarWrap');
      var petWidgetName = document.getElementById('petWidgetName');
      var petWidgetStage = document.getElementById('petWidgetStage');
      var petXpFill = document.getElementById('petXpFill');
      var petXpText = document.getElementById('petXpText');
      var petSwitchBtn = document.getElementById('petSwitchBtn');
      var petSelectModal = document.getElementById('petSelectModal');
      var petCardsContainer = document.getElementById('petCardsContainer');
      var petConfirmBtn = document.getElementById('petConfirmBtn');
      var petModalCloseBtn = document.getElementById('petModalCloseBtn');
      var petEvoModal = document.getElementById('petEvoModal');
      var evoStageArt = document.getElementById('evoStageArt');
      var evoBadge = document.getElementById('evoBadge');
      var petEvoDesc = document.getElementById('petEvoDesc');
      var petEvoContinueBtn = document.getElementById('petEvoContinueBtn');

      var bubbleTimer = null;

      function makeAudio() {
        if (!audio) {
          var Ctx = window.AudioContext || window.webkitAudioContext;
          if (Ctx) audio = new Ctx();
          /* — Añadido (Fase 6): bus master con compresor — pega la mezcla y
             evita la saturación cuando suenan varias notas a la vez — */
          if (audio) {
            var comp = audio.createDynamicsCompressor();
            comp.threshold.value = -18;
            comp.knee.value = 22;
            comp.ratio.value = 5;
            comp.attack.value = 0.004;
            comp.release.value = 0.16;
            var master = audio.createGain();
            master.gain.value = 0.9;
            master.connect(comp);
            comp.connect(audio.destination);
            audioMaster = master;
          }
        }
        if (audio && audio.state === 'suspended') audio.resume();
        return audio;
      }
      var audioMaster = null;
      function out(ctx) { return audioMaster || (ctx ? ctx.destination : null); }

      function drum(at, pitch, strength) {
        var ctx = makeAudio();
        if (!ctx) return;
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch || 145, at);
        osc.frequency.exponentialRampToValueAtTime(52, at + 0.13);
        gain.gain.setValueAtTime(0.0001, at);
        gain.gain.exponentialRampToValueAtTime(strength || 0.55, at + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.26);
        osc.connect(gain).connect(out(ctx));
        osc.start(at);
        osc.stop(at + 0.28);

        var buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * .055), ctx.sampleRate);
        var data = buffer.getChannelData(0);
        for (var i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
        var noise = ctx.createBufferSource();
        var ng = ctx.createGain();
        noise.buffer = buffer;
        ng.gain.setValueAtTime(.12 * (strength || .55), at);
        ng.gain.exponentialRampToValueAtTime(.0001, at + .055);
        noise.connect(ng).connect(out(ctx));
        noise.start(at);
      }

      function noiseBurst(at, duration, volume, highpass) {
        var ctx = makeAudio();
        if (!ctx) return;
        var buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * duration), ctx.sampleRate);
        var data = buffer.getChannelData(0);
        for (var i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
        var source = ctx.createBufferSource();
        var filter = ctx.createBiquadFilter();
        var gain = ctx.createGain();
        filter.type = 'highpass';
        filter.frequency.value = highpass || 900;
        gain.gain.setValueAtTime(volume, at);
        gain.gain.exponentialRampToValueAtTime(.0001, at + duration);
        source.buffer = buffer;
        source.connect(filter).connect(gain).connect(out(ctx));
        source.start(at);
      }

      function tone(at, frequency, duration, volume, kind) {
        var ctx = makeAudio();
        if (!ctx) return;
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = kind || 'sine';
        osc.frequency.setValueAtTime(frequency, at);
        /* — Añadido (Fase 6): ataque suave de 4ms — elimina el clic digital
           al iniciar cada nota (antes arrancaba a volumen máximo) — */
        gain.gain.setValueAtTime(0.0001, at);
        gain.gain.linearRampToValueAtTime(volume, at + 0.004);
        gain.gain.exponentialRampToValueAtTime(.0001, at + duration);
        osc.connect(gain).connect(out(ctx));
        osc.start(at);
        osc.stop(at + duration + .03);
      }

      function playPercussion(kind, at, strength) {
        strength = strength || .55;
        if (kind === 'drum') { drum(at, 145, strength); noiseBurst(at, 0.012, 0.22 * strength, 3200); }
        else if (kind === 'kick') { drum(at, 78, Math.min(.85, strength + .16)); noiseBurst(at, 0.014, 0.3 * strength, 1800); }
        else if (kind === 'snare') { noiseBurst(at, .19, .34 * strength, 750); noiseBurst(at, .05, .3 * strength, 2600); tone(at, 170, .12, .13 * strength, 'triangle'); }
        else if (kind === 'shaker') noiseBurst(at, .095, .3 * strength, 4200);
        else if (kind === 'clap') {
          noiseBurst(at, .055, .26 * strength, 1200);
          noiseBurst(at + .045, .06, .22 * strength, 1200);
          noiseBurst(at + .09, .1, .18 * strength, 1200);
        } else if (kind === 'bell') {
          tone(at, 880, .7, .15 * strength, 'sine');
          tone(at, 1320, .55, .09 * strength, 'sine');
          tone(at, 2640, .3, .04 * strength, 'sine');
        }
      }

      function playMarimba(at, frequency, duration, strength) {
        var ctx = makeAudio();
        if (!ctx) return;
        duration = duration || 0.65;
        strength = strength || 0.6;
        frequency = frequency || 261.63;

        var filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(Math.min(frequency * 3.5, 2200), at);
        filter.Q.value = 1.8;
        filter.connect(out(ctx));

        var osc1 = ctx.createOscillator();
        var gain1 = ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(frequency, at);
        gain1.gain.setValueAtTime(0.0001, at);
        gain1.gain.exponentialRampToValueAtTime(0.55 * strength, at + 0.004);
        gain1.gain.exponentialRampToValueAtTime(0.0001, at + duration);
        osc1.connect(gain1).connect(filter);
        osc1.start(at);
        osc1.stop(at + duration + 0.04);

        var osc2 = ctx.createOscillator();
        var gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(frequency * 3.9, at);
        gain2.gain.setValueAtTime(0.0001, at);
        gain2.gain.exponentialRampToValueAtTime(0.22 * strength, at + 0.003);
        gain2.gain.exponentialRampToValueAtTime(0.0001, at + Math.min(0.12, duration * 0.3));
        osc2.connect(gain2).connect(filter);
        osc2.start(at);
        osc2.stop(at + 0.15);

        var oscClick = ctx.createOscillator();
        var gainClick = ctx.createGain();
        oscClick.type = 'triangle';
        oscClick.frequency.setValueAtTime(170, at);
        oscClick.frequency.exponentialRampToValueAtTime(45, at + 0.035);
        gainClick.gain.setValueAtTime(0.28 * strength, at);
        gainClick.gain.exponentialRampToValueAtTime(0.0001, at + 0.04);
        oscClick.connect(gainClick).connect(filter);
        oscClick.start(at);
        oscClick.stop(at + 0.05);
      }

      function playXylophone(at, frequency, duration, strength) {
        var ctx = makeAudio();
        if (!ctx) return;
        duration = duration || 0.45;
        strength = strength || 0.55;
        frequency = frequency || 523.25;

        var osc1 = ctx.createOscillator();
        var gain1 = ctx.createGain();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(frequency, at);
        gain1.gain.setValueAtTime(0.0001, at);
        gain1.gain.exponentialRampToValueAtTime(0.5 * strength, at + 0.002);
        gain1.gain.exponentialRampToValueAtTime(0.0001, at + duration);
        gain1.connect(out(ctx));
        osc1.connect(gain1);
        osc1.start(at);
        osc1.stop(at + duration + 0.03);

        var oscPing = ctx.createOscillator();
        var gainPing = ctx.createGain();
        oscPing.type = 'sine';
        oscPing.frequency.setValueAtTime(frequency * 3.0, at);
        gainPing.gain.setValueAtTime(0.0001, at);
        gainPing.gain.exponentialRampToValueAtTime(0.3 * strength, at + 0.002);
        gainPing.gain.exponentialRampToValueAtTime(0.0001, at + 0.16);
        gainPing.connect(out(ctx));
        oscPing.connect(gainPing);
        oscPing.start(at);
        oscPing.stop(at + 0.18);
      }

      function playFlute(at, frequency, duration, strength) {
        var ctx = makeAudio();
        if (!ctx) return;
        duration = duration || 0.75;
        strength = strength || 0.5;
        frequency = frequency || 440;

        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, at);

        var lfo = ctx.createOscillator();
        var lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(5.0, at);
        lfoGain.gain.setValueAtTime(0.0001, at);
        lfoGain.gain.linearRampToValueAtTime(3.5, at + 0.2);
        lfo.connect(osc.frequency);
        lfo.start(at);
        lfo.stop(at + duration + 0.05);

        gain.gain.setValueAtTime(0.0001, at);
        gain.gain.linearRampToValueAtTime(0.42 * strength, at + 0.045);
        gain.gain.setValueAtTime(0.36 * strength, at + duration * 0.7);
        gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
        osc.connect(gain).connect(out(ctx));
        osc.start(at);
        osc.stop(at + duration + 0.05);

        var osc2 = ctx.createOscillator();
        var gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(frequency * 2, at);
        gain2.gain.setValueAtTime(0.0001, at);
        gain2.gain.linearRampToValueAtTime(0.12 * strength, at + 0.05);
        gain2.gain.exponentialRampToValueAtTime(0.0001, at + duration * 0.8);
        osc2.connect(gain2).connect(out(ctx));
        osc2.start(at);
        osc2.stop(at + duration + 0.05);

        noiseBurst(at, 0.07, 0.08 * strength, 2600);
      }

      function playSound(kind, at, strength, settings) {
        settings = settings || { pitch: 0, echo: 10, bright: 55 };
        var ratio = Math.pow(2, (settings.pitch || 0) / 12);
        if (kind === 'marimba') {
          playMarimba(at, 261.63 * ratio, 0.65, strength);
          return;
        }
        if (kind === 'xylophone') {
          playXylophone(at, 523.25 * ratio, 0.45, strength);
          return;
        }
        if (kind === 'flute') {
          playFlute(at, 440 * ratio, 0.75, strength);
          return;
        }
        if (kind === 'bells') {
          tone(at, 880 * ratio, 0.75, (strength || .5) * .35, 'triangle');
          tone(at, 1760 * ratio, 0.45, (strength || .5) * .18, 'sine');
          return;
        }
        if (kind === 'synth') {
          tone(at, 220 * ratio, 0.6, (strength || .5) * .38, 'sawtooth');
          tone(at, 440 * ratio, 0.4, (strength || .5) * .22, 'square');
          return;
        }
        if (!SOUNDS[kind] || !SOUNDS[kind].melodic) {
          playPercussion(kind, at, strength);
          tone(at, (kind === 'kick' ? 72 : kind === 'bell' ? 880 : 165) * ratio, .13, (strength || .5) * (.025 + settings.bright / 1200), 'triangle');
          if (settings.echo > 22) playPercussion(kind, at + .12 + settings.echo / 900, strength * settings.echo / 260);
          return;
        }
        var base = kind === 'piano' ? 523.25 : kind === 'guitar' ? 392 : 261.63;
        var duration = kind === 'strings' ? 1.1 : kind === 'piano' ? .52 : .68;
        var wave = kind === 'piano' ? 'triangle' : kind === 'guitar' ? 'sawtooth' : 'sine';
        tone(at, base * ratio, duration, (strength || .5) * .28, wave);
        if (kind === 'piano') tone(at, base * ratio * 2, .3, (strength || .5) * .08, 'sine');
        if (kind === 'strings') tone(at, base * ratio * 1.5, duration, (strength || .5) * .12, 'triangle');
        if (settings.echo > 8) tone(at + .16, base * ratio, duration * .7, (strength || .5) * settings.echo / 900, wave);
      }

      function chime(at) {
        var ctx = makeAudio();
        if (!ctx) return;
        [523.25, 659.25, 783.99].forEach(function (f, i) {
          var o = ctx.createOscillator();
          var g = ctx.createGain();
          o.type = 'triangle';
          o.frequency.value = f;
          g.gain.setValueAtTime(.0001, at + i * .045);
          g.gain.exponentialRampToValueAtTime(.12, at + i * .045 + .02);
          g.gain.exponentialRampToValueAtTime(.0001, at + .55 + i * .045);
          o.connect(g).connect(out(ctx));
          o.start(at + i * .045);
          o.stop(at + .65);
        });
      }

      function errorSound(at) {
        var ctx = makeAudio();
        if (!ctx) return;
        var o = ctx.createOscillator();
        var g = ctx.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(120, at);
        o.frequency.exponentialRampToValueAtTime(65, at + .36);
        g.gain.setValueAtTime(.12, at);
        g.gain.exponentialRampToValueAtTime(.0001, at + .4);
        o.connect(g).connect(out(ctx));
        o.start(at);
        o.stop(at + .42);
      }

      /* Sonidos característicos de cada mascota */
      function playPetSignature(petId) {
        var ctx = makeAudio();
        if (!ctx) return;
        var now = ctx.currentTime + 0.04;
        if (petId === 'bumbo') {
          // Bumbo: pulso firme bombo/tambor (PUM - PUM - PA - PUM)
          drum(now, 125, 0.7);
          drum(now + 0.22, 135, 0.65);
          noiseBurst(now + 0.44, 0.14, 0.38, 700);
          drum(now + 0.66, 110, 0.85);
        } else if (petId === 'clave') {
          // Clave: agudo y sincopado (TA-KA-TI-KA-TA)
          tone(now, 980, 0.08, 0.35, 'triangle');
          tone(now + 0.12, 1120, 0.07, 0.32, 'triangle');
          tone(now + 0.26, 880, 0.09, 0.36, 'triangle');
          tone(now + 0.38, 1120, 0.07, 0.32, 'triangle');
          tone(now + 0.52, 1320, 0.12, 0.38, 'sine');
        } else if (petId === 'guira') {
          // Güira: cadencia constante rascador (CHIK-A-CHIK-A-CHIK)
          noiseBurst(now, 0.09, 0.32, 3800);
          noiseBurst(now + 0.11, 0.07, 0.24, 4600);
          noiseBurst(now + 0.24, 0.1, 0.34, 3800);
          noiseBurst(now + 0.36, 0.07, 0.24, 4600);
          noiseBurst(now + 0.5, 0.13, 0.38, 4200);
        }
      }

      function fanfareSound() {
        var ctx = makeAudio();
        if (!ctx) return;
        var now = ctx.currentTime + 0.05;
        var notes = [440, 554.37, 659.25, 880];
        notes.forEach(function (freq, i) {
          tone(now + i * 0.11, freq, 0.45, 0.26, 'triangle');
        });
        chime(now + 0.5);
      }

      function playCoinSound() {
        var ctx = makeAudio();
        if (!ctx) return;
        var now = ctx.currentTime + 0.02;
        tone(now, 2400, 0.08, 0.22, 'sine');
        tone(now + 0.07, 3300, 0.15, 0.28, 'sine');
      }

      function playCashRegisterSound() {
        var ctx = makeAudio();
        if (!ctx) return;
        var now = ctx.currentTime + 0.02;
        noiseBurst(now, 0.04, 0.16, 1200);
        tone(now + 0.05, 1760, 0.1, 0.22, 'triangle');
        tone(now + 0.12, 2637, 0.24, 0.32, 'sine');
      }

      function getPetAccessorySvg(accId) {
        if (!accId) return '';
        switch (accId) {
          case 'cap_red':
            return '<g class="pet-acc pet-acc-cap"><path d="M11 16 Q24 7 37 16 L39 19 Q24 15 9 19 Z" fill="#e11d48" stroke="#9f1239" stroke-width="1.2"/><ellipse cx="24" cy="13" rx="10" ry="3.8" fill="#ef4444"/><ellipse cx="24" cy="10" rx="2" ry="1" fill="#fff" opacity="0.6"/></g>';
          case 'cap_safari':
            return '<g class="pet-acc pet-acc-safari"><ellipse cx="24" cy="15" rx="16" ry="5.5" fill="#ca8a04" stroke="#854d0e" stroke-width="1"/><path d="M16 15 Q24 6 32 15" fill="#eab308" stroke="#854d0e" stroke-width="1"/><line x1="16" y1="14" x2="32" y2="14" stroke="#713f12" stroke-width="2"/></g>';
          case 'glasses_neon':
            return '<g class="pet-acc pet-acc-glasses"><rect x="10" y="19" width="12" height="8.5" rx="2.5" fill="#0f172a" stroke="#06b6d4" stroke-width="2"/><rect x="26" y="19" width="12" height="8.5" rx="2.5" fill="#0f172a" stroke="#06b6d4" stroke-width="2"/><line x1="22" y1="23" x2="26" y2="23" stroke="#06b6d4" stroke-width="2.5"/><line x1="12" y1="21" x2="16" y2="25" stroke="#fff" stroke-width="1" opacity="0.75"/><line x1="28" y1="21" x2="32" y2="25" stroke="#fff" stroke-width="1" opacity="0.75"/></g>';
          case 'glasses_star':
            return '<g class="pet-acc pet-acc-star"><polygon points="16,18 18,23 23,23 19,26 21,31 16,28 11,31 13,26 9,23 14,23" fill="#facc15" stroke="#ca8a04" stroke-width="1.2"/><polygon points="32,18 34,23 39,23 35,26 37,31 32,28 27,31 29,26 25,23 30,23" fill="#facc15" stroke="#ca8a04" stroke-width="1.2"/><line x1="21" y1="24" x2="27" y2="24" stroke="#ca8a04" stroke-width="2"/></g>';
          case 'bowtie_gala':
            return '<g class="pet-acc pet-acc-bowtie"><polygon points="16,35 24,37.5 16,40.5" fill="#7c3aed" stroke="#5b21b6" stroke-width="1"/><polygon points="32,35 24,37.5 32,40.5" fill="#7c3aed" stroke="#5b21b6" stroke-width="1"/><circle cx="24" cy="37.5" r="2.4" fill="#fbbf24" stroke="#d97706" stroke-width="1"/></g>';
          case 'bowtie_rhythm':
            return '<g class="pet-acc pet-acc-bowtie-rhythm"><polygon points="16,34.5 24,37.5 16,40.5" fill="#10b981" stroke="#047857" stroke-width="1"/><polygon points="32,34.5 24,37.5 32,40.5" fill="#10b981" stroke="#047857" stroke-width="1"/><circle cx="24" cy="37.5" r="2.8" fill="#ef4444"/><circle cx="24" cy="37.5" r="1.3" fill="#fff"/></g>';
          case 'headphones_dj':
            return '<g class="pet-acc pet-acc-hp"><path d="M7 26 C7 9 41 9 41 26" fill="none" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round"/><rect x="4" y="21" width="5.5" height="11" rx="2.5" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.4"/><rect x="38.5" y="21" width="5.5" height="11" rx="2.5" fill="#1e3a8a" stroke="#60a5fa" stroke-width="1.4"/><circle cx="6.7" cy="26.5" r="1.5" fill="#93c5fd"/><circle cx="41.2" cy="26.5" r="1.5" fill="#93c5fd"/></g>';
          case 'headphones_gold':
            return '<g class="pet-acc pet-acc-hp-gold"><path d="M7 26 C7 9 41 9 41 26" fill="none" stroke="#d97706" stroke-width="3.5" stroke-linecap="round"/><rect x="4" y="21" width="5.5" height="11" rx="2.5" fill="#f59e0b" stroke="#78350f" stroke-width="1.4"/><rect x="38.5" y="21" width="5.5" height="11" rx="2.5" fill="#f59e0b" stroke="#78350f" stroke-width="1.4"/><circle cx="6.7" cy="26.5" r="1.5" fill="#fef08a"/><circle cx="41.2" cy="26.5" r="1.5" fill="#fef08a"/></g>';
          default:
            return '';
        }
      }

      /* Generación de arte SVG de las Mascotas con Accesorios */
      function getPetSvg(petId, stage, size, accessoryId) {
        size = size || 48;
        var p = PETS[petId] || PETS.bumbo;
        stage = stage || 1;
        var mainCol = (petState && petState.tints && petState.tints[petId]) || p.color;
        var accCol = p.accent;
        var activeAcc = (accessoryId !== undefined) ? accessoryId : (petState && petState.equipped && petState.equipped[petId]);
        var accOverlay = getPetAccessorySvg(activeAcc);

        if (stage === 1) {
          // Etapa 1: Huevo rítmico
          var decor = '';
          if (petId === 'bumbo') {
            decor = '<path d="M12 28 Q24 22 36 28" stroke="' + accCol + '" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="24" cy="20" r="3" fill="' + accCol + '"/>';
          } else if (petId === 'clave') {
            decor = '<line x1="16" y1="18" x2="32" y2="30" stroke="#fff" stroke-width="3" stroke-linecap="round"/><line x1="16" y1="30" x2="32" y2="18" stroke="' + accCol + '" stroke-width="2.5" stroke-linecap="round"/>';
          } else {
            decor = '<line x1="15" y1="20" x2="33" y2="20" stroke="' + accCol + '" stroke-width="2.5" stroke-dasharray="3,3"/><line x1="14" y1="26" x2="34" y2="26" stroke="' + accCol + '" stroke-width="2.5" stroke-dasharray="3,3"/><line x1="16" y1="32" x2="32" y2="32" stroke="' + accCol + '" stroke-width="2.5" stroke-dasharray="3,3"/>';
          }
          return '<svg viewBox="0 0 48 48" class="pet-avatar-svg" aria-hidden="true">' +
            '<ellipse cx="24" cy="26" rx="15" ry="19" fill="' + mainCol + '" stroke="#fff" stroke-width="2.5"/>' +
            '<ellipse cx="24" cy="26" rx="12" ry="16" fill="none" stroke="' + accCol + '" stroke-width="1.5" opacity="0.45"/>' +
            decor +
            '<ellipse cx="20" cy="17" rx="3" ry="5" fill="#ffffff" opacity="0.45" transform="rotate(-18 20 17)"/>' +
            accOverlay +
          '</svg>';
        }

        if (stage === 2) {
          // Etapa 2: Cría vivaz
          var eyes = '<circle cx="18" cy="22" r="3.2" fill="#15322d"/><circle cx="30" cy="22" r="3.2" fill="#15322d"/><circle cx="19.2" cy="20.8" r="1.1" fill="#fff"/><circle cx="31.2" cy="20.8" r="1.1" fill="#fff"/>';
          var smile = '<path d="M21 28 Q24 32 27 28" stroke="#15322d" stroke-width="2" fill="none" stroke-linecap="round"/>';
          var cheeks = '<circle cx="14" cy="26" r="2.2" fill="#ff7849" opacity="0.65"/><circle cx="34" cy="26" r="2.2" fill="#ff7849" opacity="0.65"/>';
          var props = '';

          if (petId === 'bumbo') {
            // Tamborcito con baquetas
            props = '<ellipse cx="24" cy="36" rx="12" ry="5" fill="#bedacc" stroke="' + mainCol + '" stroke-width="2"/>' +
              '<line x1="8" y1="24" x2="15" y2="33" stroke="' + accCol + '" stroke-width="2.5" stroke-linecap="round"/>' +
              '<line x1="40" y1="24" x2="33" y2="33" stroke="' + accCol + '" stroke-width="2.5" stroke-linecap="round"/>';
          } else if (petId === 'clave') {
            // Antenas de corchea
            props = '<line x1="20" y1="12" x2="16" y2="5" stroke="' + mainCol + '" stroke-width="2.5" stroke-linecap="round"/><circle cx="16" cy="5" r="2.5" fill="' + accCol + '"/>' +
              '<line x1="28" y1="12" x2="32" y2="5" stroke="' + mainCol + '" stroke-width="2.5" stroke-linecap="round"/><circle cx="32" cy="5" r="2.5" fill="' + accCol + '"/>';
          } else {
            // Varita rascadora
            props = '<line x1="33" y1="22" x2="42" y2="32" stroke="' + accCol + '" stroke-width="3" stroke-linecap="round"/>' +
              '<line x1="18" y1="32" x2="30" y2="32" stroke="#fff" stroke-width="1.8" stroke-dasharray="2,2"/>';
          }

          return '<svg viewBox="0 0 48 48" class="pet-avatar-svg" aria-hidden="true">' +
            '<circle cx="24" cy="24" r="16" fill="' + mainCol + '" stroke="#fff" stroke-width="2.5"/>' +
            props + eyes + smile + cheeks +
            accOverlay +
          '</svg>';
        }

        // Etapa 3: Maestro del ritmo
        var maestroAura = '<circle cx="24" cy="24" r="20" fill="none" stroke="' + accCol + '" stroke-width="2.5" stroke-dasharray="4,3" opacity="0.8"/>';
        var crown = '<polygon points="17,11 20,6 24,10 28,6 31,11" fill="' + accCol + '" stroke="#936800" stroke-width="1.2"/>';
        var bigEyes = '<circle cx="18" cy="23" r="3.6" fill="#15322d"/><circle cx="30" cy="23" r="3.6" fill="#15322d"/><circle cx="19.4" cy="21.6" r="1.3" fill="#fff"/><circle cx="31.4" cy="21.6" r="1.3" fill="#fff"/>';
        var grin = '<path d="M20 29 Q24 35 28 29 Z" fill="#b7232c" stroke="#15322d" stroke-width="1.5"/>';

        return '<svg viewBox="0 0 48 48" class="pet-avatar-svg" aria-hidden="true">' +
          maestroAura +
          '<circle cx="24" cy="25" r="16.5" fill="' + mainCol + '" stroke="#fff" stroke-width="2.5"/>' +
          crown + bigEyes + grin +
          accOverlay +
        '</svg>';
      }

      function updatePetWidget() {
        var p = PETS[petState.id] || PETS.bumbo;
        petWidgetName.textContent = getPetDisplayName(petState.id);
        petWidgetStage.textContent = COMPAS.stageName(petState.stage);
        var coinsEl = document.getElementById('petCoinsCount');
        if (coinsEl) coinsEl.textContent = petState.coins || 0;
        var marketCoinsEl = document.getElementById('marketCoinsCount');
        if (marketCoinsEl) marketCoinsEl.textContent = petState.coins || 0;

        petAvatarWrap.innerHTML = getPetSvg(petState.id, petState.stage, 48);

        var prog = COMPAS.xpProgress(petState.xp);
        petXpFill.style.width = prog.percent + '%';
        petXpText.textContent = prog.label;
      }

      function showPetSpeech(text, duration) {
        duration = duration || 3200;
        if (bubbleTimer) clearTimeout(bubbleTimer);
        petBubble.textContent = text;
        petBubble.classList.add('show');
        bubbleTimer = setTimeout(function () {
          petBubble.classList.remove('show');
        }, duration);
      }

      function celebratePetWin() {
        petWidget.classList.add('cheer');
        setTimeout(function () { petWidget.classList.remove('cheer'); }, 850);
        var p = PETS[petState.id] || PETS.bumbo;
        var phrase = p.phrases.win[Math.floor(Math.random() * p.phrases.win.length)];
        showPetSpeech(phrase, 3600);
      }

      function encouragePetFail() {
        petWidget.classList.add('encourage');
        setTimeout(function () { petWidget.classList.remove('encourage'); }, 950);
        var p = PETS[petState.id] || PETS.bumbo;
        var phrase = p.phrases.fail3[Math.floor(Math.random() * p.phrases.fail3.length)];
        showPetSpeech(phrase, 4000);
      }

      function interactPet() {
        makeAudio();
        petWidget.classList.add('jump');
        setTimeout(function () { petWidget.classList.remove('jump'); }, 600);
        var sig = petState.signatureRhythm;
        if (Array.isArray(sig) && sig.length > 0) {
          playSignatureSequence(sig);
          showPetSpeech('¡Escucha mi firma sonora de ' + sig.length + ' compases!', 3400);
          return;
        }
        if (sig && sig.placements && sig.placements.length > 0) {
          playCustomRhythm(sig);
          showPetSpeech('¡Escucha mi firma sonora propia!', 3200);
          return;
        }
        playPetSignature(petState.id);
        var p = PETS[petState.id] || PETS.bumbo;
        var phrase = p.phrases.normal[Math.floor(Math.random() * p.phrases.normal.length)];
        showPetSpeech(phrase, 3000);
      }

      function checkPetEvolution(oldStage) {
        var newStage = COMPAS.stageForXp(petState.xp);
        if (newStage > oldStage) {
          var prevStageEl = document.getElementById('evoPrevStage');
          if (prevStageEl) {
            prevStageEl.innerHTML = getPetSvg(petState.id, oldStage, 60);
          }
          petState.stage = newStage;
          savePetStorage();
          updatePetWidget();
          evoStageArt.innerHTML = getPetSvg(petState.id, newStage, 95);
          evoBadge.textContent = '¡Nueva Etapa: ' + COMPAS.stageName(newStage) + '!';
          petEvoDesc.textContent = '¡' + PETS[petState.id].name + ' ha evolucionado a ' + COMPAS.stageName(newStage) + ' con ' + petState.xp + ' XP!';
          petEvoModal.hidden = false;
          fanfareSound();
          confetti();
          renderMap();
        }
      }

      function openPetSelector(canCancel) {
        petModalCloseBtn.style.display = canCancel ? 'inline-block' : 'none';
        petCardsContainer.innerHTML = '';
        var selectedId = petState.id;

        Object.keys(PETS).forEach(function (key) {
          var pet = PETS[key];
          var card = document.createElement('article');
          card.className = 'pet-card' + (selectedId === key ? ' selected' : '');
          card.tabIndex = 0;
          card.role = 'button';
          card.setAttribute('aria-pressed', selectedId === key ? 'true' : 'false');
          card.innerHTML =
            '<div class="pet-card-avatar">' + getPetSvg(pet.id, 2, 60) + '</div>' +
            '<h3 class="pet-card-name">' + pet.name + '</h3>' +
            '<span class="pet-card-role">' + pet.role + '</span>' +
            '<p class="pet-card-desc">' + pet.desc + '</p>' +
            '<button class="pet-sound-sample-btn" type="button">🎵 Escuchar</button>';

          var sampleBtn = card.querySelector('.pet-sound-sample-btn');
          sampleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            playPetSignature(pet.id);
          });

          card.addEventListener('click', function () {
            selectedId = pet.id;
            Array.prototype.slice.call(petCardsContainer.children).forEach(function (c) {
              c.classList.remove('selected');
              c.setAttribute('aria-pressed', 'false');
            });
            card.classList.add('selected');
            card.setAttribute('aria-pressed', 'true');
            playPetSignature(pet.id);
          });

          card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              card.click();
            }
          });

          petCardsContainer.appendChild(card);
        });

        petConfirmBtn.onclick = function () {
          petState.id = selectedId;
          savePetStorage();
          updatePetWidget();
          petSelectModal.hidden = true;
          interactPet();
        };

        petSelectModal.hidden = false;
      }

      petModalCloseBtn.addEventListener('click', function () {
        petSelectModal.hidden = true;
      });

      petEvoContinueBtn.addEventListener('click', function () {
        petEvoModal.hidden = true;
      });

      petWidget.addEventListener('click', function (e) {
        if (e.target.closest('#petSwitchBtn')) {
          e.stopPropagation();
          openPetSelector(true);
        } else {
          interactPet();
        }
      });

      petWidget.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          interactPet();
        }
      });

      function setFeedback(text, kind) {
        feedback.textContent = text;
        feedback.className = 'feedback' + (kind ? ' ' + kind : '');
      }

      function svgEl(name, attrs) {
        var el = document.createElementNS(SVG_NS, name);
        Object.keys(attrs || {}).forEach(function (key) { el.setAttribute(key, attrs[key]); });
        return el;
      }

      function polar(radius, angleDeg) {
        var angle = (angleDeg - 90) * Math.PI / 180;
        return { x: 120 + radius * Math.cos(angle), y: 120 + radius * Math.sin(angle) };
      }

      function wedgePath(startUnit, spanUnits, innerRadius, outerRadius) {
        if (spanUnits >= 8) {
          return [
            'M', 120, 120 - outerRadius,
            'A', outerRadius, outerRadius, 0, 1, 1, 120, 120 + outerRadius,
            'A', outerRadius, outerRadius, 0, 1, 1, 120, 120 - outerRadius,
            'M', 120, 120 - innerRadius,
            'A', innerRadius, innerRadius, 0, 1, 0, 120, 120 + innerRadius,
            'A', innerRadius, innerRadius, 0, 1, 0, 120, 120 - innerRadius,
            'Z'
          ].join(' ');
        }
        var startAngle = startUnit * 45;
        var endAngle = (startUnit + spanUnits) * 45;
        var outerStart = polar(outerRadius, startAngle);
        var outerEnd = polar(outerRadius, endAngle);
        var innerEnd = polar(innerRadius, endAngle);
        var innerStart = polar(innerRadius, startAngle);
        var large = spanUnits > 4 ? 1 : 0;
        return [
          'M', outerStart.x, outerStart.y,
          'A', outerRadius, outerRadius, 0, large, 1, outerEnd.x, outerEnd.y,
          'L', innerEnd.x, innerEnd.y,
          'A', innerRadius, innerRadius, 0, large, 0, innerStart.x, innerStart.y,
          'Z'
        ].join(' ');
      }

      function occupiedUnits() {
        var occupied = new Array(8).fill(null);
        state.placements.forEach(function (p) {
          for (var i = p.start; i < p.start + p.span; i++) occupied[i] = p;
        });
        return occupied;
      }

      function renderWheel() {
        wheelSlots.innerHTML = '';
        wheelFills.innerHTML = '';
        wheelLabels.innerHTML = '';
        var slotSpan = state.level === 1 ? 2 : 1;
        var slotCount = 8 / slotSpan;
        var occupied = occupiedUnits();

        for (var i = 0; i < slotCount; i++) {
          (function (start) {
            var slot = svgEl('path', {
              d: wedgePath(start, slotSpan, 39, 105),
              class: 'wheel-slot',
              tabindex: '0',
              role: 'button',
              'data-start': start,
              'aria-label': sectorLabel(start, slotSpan, occupied)
            });
            slot.addEventListener('click', function () { place(start); });
            slot.addEventListener('keydown', function (event) {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                place(start);
              }
            });
            wheelSlots.appendChild(slot);
          }(i * slotSpan));
        }

        state.placements.forEach(function (p) {
          var type = TYPES[p.type];
          var fill = svgEl('path', {
            d: wedgePath(p.start, p.span, 39, 105),
            class: 'wheel-fill ' + type.className,
            'data-placement': p.id
          });
          wheelFills.appendChild(fill);

          var middle = polar(p.span === 1 ? 77 : 76, (p.start + p.span / 2) * 45);
          var label = svgEl('text', {
            x: middle.x,
            y: middle.y,
            class: 'wheel-label'
          });
          label.textContent = type.silent ? 'sil. ' + type.fraction : type.fraction;
          wheelLabels.appendChild(label);
        });

        for (var beat = 0; beat < 4; beat++) {
          var pos = polar(113, beat * 90 + 45);
          var number = svgEl('text', { x: pos.x, y: pos.y, class: 'wheel-beat' });
          number.textContent = String(beat + 1);
          wheelLabels.appendChild(number);
        }

        var complete = totalUnits() === 8;
        measure.classList.toggle('complete', complete);
        wheel.setAttribute('aria-label', complete ? 'Círculo completo: cuatro de cuatro.' : hintText());
        circleGuide.textContent = state.level === 1
          ? '4 sectores · cada trozo rojo es un cuarto (1/4).'
          : state.level === 5
            ? 'La redonda (1/1) llena los 8 octavos: el círculo entero.'
            : state.level >= 6 && state.target
              ? (state.level === 7 ? 'Escucha primero. Después reconstruye sin mirar.' : 'Reto: ' + targetText(state.target))
              : '8 octavos · dos octavos (1/8) forman un cuarto (1/4).';
      }

      function sectorLabel(start, span, occupied) {
        var from = start + 1;
        var to = start + span;
        var found = occupied[start];
        var placeText = span === 2 ? 'Sector ' + (start / 2 + 1) : 'Mitad ' + from;
        if (found) return placeText + ', ocupado por ' + TYPES[found.type].name + ': ' + TYPES[found.type].spoken + ' (' + TYPES[found.type].fraction + '). Toca para cambiarlo.';
        return placeText + ', vacío. Toca para colocar el bloque elegido.';
      }

      function renderTray() {
        tray.innerHTML = '';
        LEVELS[state.level].blocks.forEach(function (key) {
          var item = TYPES[key];
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'rhythm-block ' + item.className + (state.selected === key ? ' selected' : '');
          b.dataset.type = key;
          b.setAttribute('aria-pressed', state.selected === key ? 'true' : 'false');
          var spokenLabel = item.silent ? 'silencio · ' + item.spoken : item.spoken;
          b.setAttribute('aria-label', item.name + ': ' + item.spoken + ', ' + item.fraction);
          b.innerHTML = '<span class="fraction">' + item.fraction + '</span><span class="name">' + spokenLabel + '</span>';
          b.addEventListener('click', function () {
            if (state.playing) return;
            if (state.demo) endDemo(false);
            makeAudio();
            state.selected = key;
            renderTray();
            setFeedback('Ahora toca un sector del círculo.', '');
            maybeShowPicadasLesson(key);
          });
          tray.appendChild(b);
        });
      }

      function renderSoundPicker() {
        soundOptions.innerHTML = '';
        GAME_SOUND_KEYS.forEach(function (key) {
          var item = SOUNDS[key];
          var button = document.createElement('button');
          button.type = 'button';
          button.className = 'sound-option ' + item.className + (state.selectedSound === key ? ' selected' : '');
          button.setAttribute('aria-pressed', state.selectedSound === key ? 'true' : 'false');
          button.setAttribute('aria-label', item.name + '. Toca para escuchar y elegir.');
          button.innerHTML = item.icon + '<strong>' + item.name + '</strong>';
          button.addEventListener('click', function () {
            if (state.playing) return;
            var ctx = makeAudio();
            if (!ctx) return;
            state.selectedSound = key;
            renderSoundPicker();
            playSound(key, ctx.currentTime + .03, .72);
            setFeedback('¡' + item.name + ' elegido! Ese será tu sonido.', 'good');
          });
          soundOptions.appendChild(button);
        });
      }

      function renderStatus() {
        var currentLevel = LEVELS[state.level] || LEVELS[1];
        document.getElementById('levelTitle').textContent = currentLevel.title;
        document.getElementById('mission').textContent = currentLevel.mission;
        document.getElementById('score').textContent = state.score;
        if (levelSelectToggle) {
          levelSelectToggle.textContent = 'Nivel ' + state.level + ' ▾';
        }

        var isLevel14 = (state.level === 14 || state.level === 18);
        if (streak3 && streak4) {
          streak3.style.display = isLevel14 ? 'block' : 'none';
          streak4.style.display = isLevel14 ? 'block' : 'none';
        }
        if (progressTrack) {
          progressTrack.style.gridTemplateColumns = isLevel14 ? 'repeat(5, 1fr)' : 'repeat(3, 1fr)';
        }

        var maxStreak = isLevel14 ? 5 : 3;
        for (var i = 0; i < maxStreak; i++) {
          var el = document.getElementById('streak' + i);
          if (el) el.classList.toggle('on', i < state.streak);
        }
      }

      function clearCircle(message) {
        state.placements = [];
        renderWheel();
        if (message) setFeedback(message, '');
      }

      var overlaps = COMPAS.overlaps;

      function place(start) {
        if (state.playing || !state.selected) return;
        if (state.demo) endDemo(false);
        var ctx = makeAudio();
        var type = TYPES[state.selected];
        if (type.units === 8) start = 0;
        var overflow = start + type.units - 8;

        if (overflow > 0) {
          state.levelErrors = (state.levelErrors || 0) + 1;
          setFeedback('Te ' + fractionVerb(overflow, 'sobra', 'sobran') + ' ' + fractionText(overflow) + ' para cerrar el círculo.', 'try');
          if (ctx) errorSound(ctx.currentTime + .02);
          measure.classList.add('shake');
          setTimeout(function () { measure.classList.remove('shake'); }, 350);
          return;
        }

        state.placements = state.placements.filter(function (p) { return !overlaps(p, start, type.units); });
        state.placements.push({ id: state.nextId++, type: state.selected, start: start, span: type.units });
        state.placements.sort(function (a, b) { return a.start - b.start; });
        renderWheel();
        setFeedback(totalUnits() === 8 ? '¡El círculo llegó a 4/4! Escúchalo.' : hintText(), '');
      }

      function totalUnits() {
        return COMPAS.placementsTotal(state.placements);
      }

      function hintText() {
        return COMPAS.hintFor(COMPAS.placementsTotal(state.placements));
      }

      var fractionVerb = COMPAS.fractionVerb;
      var fractionText = COMPAS.fractionText;
      var targetPlacements = COMPAS.targetPlacements;
      var targetText = COMPAS.targetText;

      function setupChallenge() {
        if (state.level >= 11 && state.level <= 18) {
          state.target = null;
          detectiveListen.classList.remove('show');
          renderMathProblemView();
          renderWheel();
          renderStatus();
          var prob = currentMathProblem();
          setFeedback('Escucha la operación con el botón azul y coloca ' + prob.total + ' golpes en el compás.', '');
          return;
        }

        if (mathOperationStrip) mathOperationStrip.hidden = true;

        if (state.level < 6) {
          state.target = null;
          detectiveListen.classList.remove('show');
          return;
        }
        state.target = CHALLENGES[state.level][state.challengeIndex % CHALLENGES[state.level].length].slice();
        state.detectiveAttempts = 0;
        detectiveListen.classList.toggle('show', state.level === 7);
        renderWheel();
        renderStatus();
        if (state.level === 7) {
          setFeedback('Pulsa “Escuchar el ritmo secreto”. Luego reconstrúyelo.', '');
        } else {
          setFeedback('Construye exactamente el reto que ves.', '');
        }
      }

      function currentMatchesTarget() {
        return COMPAS.placementsMatch(state.placements, state.target);
      }

      function firstTargetDifference() {
        var diff = COMPAS.firstDifference(state.placements, state.target);
        if (!diff) return 'Pista: escucha dónde cae cada golpe y cada silencio.';
        var t = TYPES[diff.type];
        return 'Pista: en el trozo ' + (diff.start + 1) + ' va ' + (t.silent ? 'un silencio de ' : '') + t.spoken + ' (' + t.fraction + ').';
      }

      function playSecret() {
        if (state.playing || state.level !== 7 || !state.target) return;
        var ctx = makeAudio();
        if (!ctx) return;
        state.playing = true;
        detectiveListen.disabled = true;
        setFeedback('Escucha con atención… ¡ahora hazlo tú!', '');
        var unitMs = 250;
        var start = ctx.currentTime + .08;
        targetPlacements(state.target).forEach(function (p) {
          if (!TYPES[p.type].silent) playPercussion(state.selectedSound, start + p.start * unitMs / 1000, .64);
        });
        setTimeout(function () {
          state.playing = false;
          detectiveListen.disabled = false;
          setFeedback('Ahora reconstruye el ritmo secreto.', '');
        }, 2200);
      }

      function flashPlacement(id, delay) {
        setTimeout(function () {
          var fill = wheelFills.querySelector('[data-placement="' + id + '"]');
          if (!fill) return;
          fill.classList.add('pulse');
          setTimeout(function () { fill.classList.remove('pulse'); }, 210);
        }, delay);
      }

      function startPlayhead(roundMs) {
        playhead.classList.remove('running');
        void playhead.offsetWidth;
        /* — Añadido (Fase 6): la órbita dura exactamente una vuelta del compás
           (antes 2s fijos: se desincronizaba en Tempo loco, N8) — */
        playhead.style.animationDuration = (roundMs || 2000) + 'ms';
        playhead.classList.add('running');
      }

      function setLoopCounter(round, repeats) {
        if (repeats === 1) {
          loopCounter.classList.remove('show', 'bump');
          loopCounter.textContent = '';
          return;
        }
        loopCounter.textContent = 'Vuelta ' + round + ' de ' + repeats;
        loopCounter.classList.add('show');
        loopCounter.classList.remove('bump');
        void loopCounter.offsetWidth;
        loopCounter.classList.add('bump');
      }

      /* — Añadido (Fase 3): pista de silencios — tic suave en las pausas para que
         el pulso se SIENTA a través del silencio. Auto-apagada en niveles detective
         porque el reto es identificar los silencios de oído (playSecret no la usa). — */
      var restCueEnabled = true;
      function playRestCue(at) {
        try { noiseBurst(at, 0.055, 0.09, 5200); } catch (e) { }
      }

      function playMeasure(repeats) {
        if (state.playing) return;
        repeats = repeats || 1;
        if (state.demo) endDemo(true);
        var ctx = makeAudio();
        if (!ctx) {
          setFeedback('Este navegador no puede reproducir el tambor.', 'try');
          return;
        }
        state.playing = true;
        playBtn.disabled = true;
        loopBtn.disabled = true;
        setFeedback(repeats > 1 ? '¡El ritmo dará cinco vueltas!' : 'El punto recorre tu compás…', '');
        setLoopCounter(1, repeats);

        var unitMs = state.level === 8 ? 150 : 250;
        var roundMs = unitMs * 8;
        var start = ctx.currentTime + .08;
        var placements = state.placements.slice().sort(function (a, b) { return a.start - b.start; });
                var valid = false;
        var mathProb = currentMathProblem();
        if (state.level >= 11 && state.level <= 18 && mathProb) {
          var actualSoundUnits = 0;
          state.placements.forEach(function (p) {
            if (!TYPES[p.type].silent) actualSoundUnits += p.span;
          });
          valid = (actualSoundUnits === mathProb.total);
        } else {
          valid = totalUnits() === 8 && currentMatchesTarget();
        }

        for (var round = 0; round < repeats; round++) {
          (function (roundIndex) {
            var roundDelay = roundIndex * roundMs;
            setTimeout(function () {
              startPlayhead(roundMs);
              setLoopCounter(roundIndex + 1, repeats);
            }, roundDelay);

            placements.forEach(function (p) {
              var type = TYPES[p.type];
              var at = start + (roundDelay + p.start * unitMs) / 1000;
              flashPlacement(p.id, roundDelay + p.start * unitMs);
              if (!type.silent) {
                var strength = p.type === 'eighth' ? .42 : p.type === 'whole' ? .8 : .62;
                playSound(state.selectedSound, at, strength, { pitch: 0, echo: 0, bright: 55 });
                /* — Añadido (Fase 6): pique doble 2/16 = segundo golpe a medio octavo — */
                if (type.twin) playSound(state.selectedSound, at + unitMs / 2000, .34, { pitch: 0, echo: 0, bright: 55 });
              } else if (restCueEnabled) {
                playRestCue(at);
              }
            });
            if (!placements.length) errorSound(start + (roundDelay + 150) / 1000);
            if (!valid) errorSound(start + (roundDelay + 1980) / 1000);
          }(round));
        }

        if (valid) chime(start + repeats * roundMs / 1000 + .03);

        setTimeout(function () {
          playhead.classList.remove('running');
          state.playing = false;
          playBtn.disabled = false;
          loopBtn.disabled = false;
          setLoopCounter(0, 1);
          if (valid) {
            state.consecutiveFailures = 0;
            success();
          } else {
            state.streak = 0;
            state.consecutiveFailures += 1;
            state.levelErrors = (state.levelErrors || 0) + 1;
            renderStatus();

            // Ánimo de la mascota tras 3 fallos consecutivos
            if (state.consecutiveFailures >= 3) {
              encouragePetFail();
            }

                        if (state.level >= 11 && state.level <= 18 && mathProb) {
              var actualUnits = 0;
              state.placements.forEach(function (p) {
                if (!TYPES[p.type].silent) actualUnits += p.span;
              });
              if (actualUnits < mathProb.total) {
                setFeedback('Has colocado ' + actualUnits + ' golpes. Te faltan ' + (mathProb.total - actualUnits) + ' para completar ' + mathProb.total + '.', 'try');
              } else {
                setFeedback('Has colocado ' + actualUnits + ' golpes. Te sobran ' + (actualUnits - mathProb.total) + ' para completar ' + mathProb.total + '.', 'try');
              }
            } else if (state.level === 7 && totalUnits() === 8) {
              state.detectiveAttempts += 1;
              if (state.detectiveAttempts >= 2) {
                setFeedback(firstTargetDifference() + ' Escúchalo otra vez.', 'try');
                state.detectiveAttempts = 0;
                setTimeout(playSecret, 900);
              } else {
                setFeedback(firstTargetDifference() + ' Te queda 1 intento.', 'try');
              }
            } else if (state.level >= 6 && totalUnits() === 8) {
              setFeedback('El círculo cierra, pero el orden no coincide. Mira el reto.', 'try');
            } else {
              setFeedback(hintText(), 'try');
            }
            measure.classList.add('shake');
            setTimeout(function () { measure.classList.remove('shake'); }, 350);
          }
        }, repeats * roundMs + 240);
      }

      function success() {
        state.score += 1;
        state.streak += 1;
        renderStatus();
        renderWheel();
        setFeedback('¡Círculo completo! +1 acierto', 'good');
        confetti();

        // Celebración de la mascota en cada acierto
        celebratePetWin();

        // Al completar los aciertos seguidos se supera el nivel (3 para N1-N13/N15-N17, 5 para N14 y N18)
        var neededStreak = (state.level === 14 || state.level === 18) ? 5 : 3;
        if (state.streak >= neededStreak) {
          // Otorga 100 XP y monedas de ritmo por nivel completado
          var oldStage = petState.stage;
          petState.xp += 100;
          petState.completedLevels[state.level] = true;

          // Monedas de ritmo: 10 por nivel (+5 si es sin fallos)
          var perfectRound = (!state.levelErrors || state.levelErrors === 0);
          var earnedCoins = perfectRound ? 15 : 10;
          var coinsLabel = perfectRound ? ' · +15 🪙 (¡Sin fallos!)' : ' · +10 🪙';
          petState.coins = (petState.coins || 0) + earnedCoins;
          if (perfectRound) {
            updateWeeklyMissionProgress('m1_no_errors', 1);
            updateWeeklyMissionProgress('m3_no_errors', 1);
          }
          state.levelErrors = 0;

          savePetStorage();
          updatePetWidget();
          playCoinSound();

          if (state.level < 18) {
            state.level += 1;
            state.streak = 0;
            state.challengeIndex = 0;
            checkModeUnlocksOnLevelUp(state.level);
            var unlocked = state.level === 2
              ? 'Un cuarto (1/4) ahora se pica en dos octavos (1/8)'
              : state.level === 3
                ? 'Dos cuartos (1/4) forman un medio (1/2)'
                : state.level === 4
                  ? 'Nuevas pausas de un octavo y un medio'
                  : state.level === 5
                    ? 'Una redonda (1/1) llena todo el círculo'
                    : state.level === 6
                      ? 'Ahora mezclamos todo lo que aprendiste'
                      : state.level === 7
                        ? 'Escucha con atención... ¡ahora hazlo tú!'
                        : state.level === 8
                          ? '¡Más rápido!'
                          : state.level === 9
                            ? 'El silencio también abre el compás'
                            : state.level === 10
                              ? 'La prueba final: todo mezclado'
                              : state.level === 11
                                ? 'Fase 2: Suma sonora con golpes rítmicos'
                                : state.level === 12
                                  ? 'Resta silenciosa: apaga los golpes'
                                  : state.level === 13
                                    ? 'Cadena rítmica a tempo creciente'
                                    : state.level === 14
                                      ? 'Reto mixto de suma y resta'
                                      : state.level === 15
                                        ? 'Multiplicación con ritmo: veces'
                                        : state.level === 16
                                          ? 'División con ritmo: reparto equitativo'
                                          : state.level === 17
                                            ? 'Tablas rítmicas al pulso'
                                            : 'Gran Reto 2: ¡Las 4 operaciones!';
            levelPop('¡Nivel ' + state.level + '!', unlocked + ' · +100 XP' + coinsLabel);

            setTimeout(function () {
              state.selected = LEVELS[state.level].blocks[0];
              clearCircle('¡Nuevo reto desbloqueado!');
              renderTray();
              renderStatus();
              setupChallenge();
              checkPetEvolution(oldStage);
              startLevelLesson(state.level);
            }, 950);
          } else {
            state.streak = 0;
            state.creatorUnlocked = true;
            renderStatus();
            levelPop('¡Fase 2 Completada!', '¡Has dominado las 4 operaciones con ritmo! · +100 XP' + coinsLabel);
            confetti();
            checkPetEvolution(oldStage);
            setTimeout(function () {
              setFeedback('¡Completaste el Módulo C! Escribe continua para la integración final (Módulo D).', 'good');
            }, 1200);
          }
        } else {
          setTimeout(function () {
            if (state.level >= 6) state.challengeIndex += 1;
            clearCircle('¡Muy bien! Vamos con otro reto.');
            setupChallenge();
          }, 900);
        }
      }

      function confetti() {
        var holder = document.getElementById('celebrate');
        var colors = ['var(--red)', 'var(--blue)', 'var(--green)', 'var(--yellow)', 'var(--cyan)'];
        for (var i = 0; i < 28; i++) {
          var bit = document.createElement('i');
          bit.className = 'confetti';
          bit.style.left = (4 + Math.random() * 92) + '%';
          bit.style.background = colors[i % colors.length];
          bit.style.animationDelay = (Math.random() * .22) + 's';
          bit.style.transform = 'rotate(' + (Math.random() * 180) + 'deg)';
          holder.appendChild(bit);
        }
        setTimeout(function () { holder.innerHTML = ''; }, 1600);
      }

      function levelPop(title, subtitle) {
        var pop = document.createElement('div');
        pop.className = 'level-pop';
        pop.innerHTML = title + '<small>' + subtitle + '</small>';
        document.body.appendChild(pop);
        setTimeout(function () { pop.remove(); }, 1100);
      }

      var intro = document.getElementById('circleIntro');
      var introPetEl = document.getElementById('introPet');
      var gameApp = document.getElementById('gameApp');
      var introSkip = document.getElementById('introSkip');
      var introCopy = document.getElementById('introCopy');
      var lessonCircle = document.getElementById('lessonCircle');
      var circleVisuals = document.getElementById('circleVisuals');
      var introDotsWrap = document.querySelector('.intro-dots');
      var introDots = Array.prototype.slice.call(document.querySelectorAll('.intro-dot'));
      var introTimeline = document.getElementById('introTimeline');
      var introActions = document.getElementById('introActions');
      var introReplay = document.getElementById('introReplay');
      var introPlay = document.getElementById('introPlay');
      var introTimers = [];
      var INTRO_SCENES = [
        'Esto es 1... un círculo entero.',
        '¡Mira! Lo picamos en 4 partes iguales...',
        'Esto es un cuarto (1/4)... ¡un trozo de 4!',
        'Cada bloque rojo es un cuarto (1/4), un trozo como este.'
      ];
      /* — Tour de la app (añadido): escenas que siguen al mini-curso original — */
      var TOUR_SCENES = [
        '¿Jugamos? Elige un bloque de abajo y toca el círculo para llenarlo.',
        'También hay Mapa, Mercado, Dúo, Simon y Creador: ¡cada rincón guarda sorpresas!',
        'Juega mucho y cuida a tu mascota: ¡crecerá y evolucionará contigo!'
      ];
      var INTRO_SCENE_TOTAL = INTRO_SCENES.length + TOUR_SCENES.length; /* 7 */
      var INTRO_TOUR_MS = INTRO_SCENES.length * 3900;                    /* 15600: inicio del tour */
      var INTRO_TOTAL_MS = INTRO_SCENE_TOTAL * 3900;                     /* 27300: fin */
      var INTRO_SEEN_KEY = 'compas_intro_seen_v1';
      var levelLesson = document.getElementById('levelLesson');
      var levelLessonTitle = document.getElementById('levelLessonTitle');
      var levelLessonSkip = document.getElementById('levelLessonSkip');
      var levelLessonCopy = document.getElementById('levelLessonCopy');
      var levelLessonDotsWrap = document.getElementById('levelLessonDots');
      var levelLessonDots = Array.prototype.slice.call(levelLessonDotsWrap.querySelectorAll('.intro-dot'));
      var levelLessonTimeline = document.getElementById('levelLessonTimeline');
      var levelVideoArt = document.getElementById('levelVideoArt');
      var levelLessonContinue = document.getElementById('levelLessonContinue');
      var levelLessonTimers = [];
      var levelLessonSeen = { 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false, 14: false, 15: false, 16: false, 17: false, 18: false };

      function clearIntroTimers() {
        introTimers.forEach(function (timer) { clearTimeout(timer); });
        introTimers = [];
      }

      /* — Añadido: la intro se recuerda como vista (localStorage seguro) — */
      function hasSeenIntro() {
        try { return localStorage.getItem(INTRO_SEEN_KEY) === 'true'; } catch (e) { return false; }
      }
      function markIntroSeen() {
        try { localStorage.setItem(INTRO_SEEN_KEY, 'true'); } catch (e) { }
      }

      function setIntroScene(scene) {
        lessonCircle.classList.toggle('appear', scene >= 1);
        lessonCircle.classList.toggle('split', scene >= 2);
        lessonCircle.classList.toggle('highlight', scene >= 3);
        circleVisuals.classList.toggle('show-block', scene >= 4);
        introDots.forEach(function (dot, index) { dot.classList.toggle('on', index === scene - 1); });
        introDotsWrap.setAttribute('aria-label', 'Escena ' + scene + ' de ' + INTRO_SCENE_TOTAL);
        introCopy.textContent = scene <= INTRO_SCENES.length
          ? INTRO_SCENES[scene - 1]
          : TOUR_SCENES[scene - INTRO_SCENES.length - 1];
        introCopy.classList.remove('cue');
        void introCopy.offsetWidth;
        introCopy.classList.add('cue');
        if (introPetEl) introPetEl.classList.toggle('tour', scene > INTRO_SCENES.length);
      }

      function showIntroEnding() {
        introActions.classList.add('show');
        introTimeline.classList.remove('running');
        introPlay.focus();
      }

      function startIntro() {
        clearIntroTimers();
        introActions.classList.remove('show');
        lessonCircle.className = 'lesson-circle';
        circleVisuals.classList.remove('show-block');
        introTimeline.classList.remove('running');
        void introTimeline.offsetWidth;
        /* Añadido: la barra de progreso cubre mini-curso + tour */
        introTimeline.querySelector('i').style.animationDuration = INTRO_TOTAL_MS + 'ms';
        introTimeline.classList.add('running');
        /* Añadido: mascota guía acompañando todas las escenas */
        if (introPetEl) introPetEl.innerHTML = getPetSvg(petState.id, petState.stage || 1, 64);
        setIntroScene(1);
        introTimers.push(setTimeout(function () { setIntroScene(2); }, 3900));
        introTimers.push(setTimeout(function () { setIntroScene(3); }, 7800));
        introTimers.push(setTimeout(function () { setIntroScene(4); }, 11700));
        /* — Tour de la app (añadido): mismo ritmo que el mini-curso — */
        introTimers.push(setTimeout(function () { setIntroScene(5); }, INTRO_TOUR_MS));
        introTimers.push(setTimeout(function () { setIntroScene(6); }, INTRO_TOUR_MS + 3900));
        introTimers.push(setTimeout(function () { setIntroScene(7); }, INTRO_TOUR_MS + 7800));
        introTimers.push(setTimeout(showIntroEnding, INTRO_TOTAL_MS));
      }

      function clearLevelLessonTimers() {
        levelLessonTimers.forEach(function (timer) { clearTimeout(timer); });
        levelLessonTimers = [];
      }

      function setLevelLessonScene(level, scene) {
        var lesson = LEVEL_LESSONS[level];
        levelVideoArt.setAttribute('class', 'level-video-art lesson-' + level + ' scene-' + scene);
        levelLessonDots.forEach(function (dot, index) { dot.classList.toggle('on', index === scene - 1); });
        levelLessonDotsWrap.setAttribute('aria-label', 'Escena ' + scene + ' de 3');
        levelLessonCopy.textContent = lesson.subtitles[scene - 1];
        levelLessonCopy.classList.remove('cue');
        void levelLessonCopy.offsetWidth;
        levelLessonCopy.classList.add('cue');
      }

      function showLevelLessonEnding() {
        levelLessonContinue.classList.add('show');
        levelLessonTimeline.classList.remove('running');
        levelLessonContinue.focus();
      }

      function startLevelLesson(level) {
        var lesson = LEVEL_LESSONS[level];
        if (!lesson || levelLessonSeen[level]) return;
        levelLessonSeen[level] = true;
        clearLevelLessonTimers();
        levelLessonTitle.textContent = lesson.title;
        levelLessonContinue.classList.remove('show');
        levelLesson.hidden = false;
        gameApp.setAttribute('inert', '');
        gameApp.setAttribute('aria-hidden', 'true');
        document.body.classList.add('intro-open');
        levelLessonTimeline.classList.remove('running');
        levelLessonTimeline.querySelector('i').style.animationDuration = lesson.duration + 'ms';
        void levelLessonTimeline.offsetWidth;
        levelLessonTimeline.classList.add('running');
        setLevelLessonScene(level, 1);
        levelLessonTimers.push(setTimeout(function () { setLevelLessonScene(level, 2); }, lesson.duration / 3));
        levelLessonTimers.push(setTimeout(function () { setLevelLessonScene(level, 3); }, lesson.duration * 2 / 3));
        levelLessonTimers.push(setTimeout(showLevelLessonEnding, lesson.duration));
      }

      function finishLevelLesson() {
        clearLevelLessonTimers();
        levelLesson.hidden = true;
        gameApp.removeAttribute('inert');
        gameApp.removeAttribute('aria-hidden');
        document.body.classList.remove('intro-open');
        playBtn.focus();
      }

      function finishIntro() {
        clearIntroTimers();
        intro.hidden = true;
        gameApp.removeAttribute('inert');
        gameApp.removeAttribute('aria-hidden');
        document.body.classList.remove('intro-open');
        markIntroSeen();

        // Si es la primera vez (no hay mascota en storage), abrir el selector
        if (!hasStoredPet) {
          openPetSelector(false);
        }

        runDemo();
      }

      introSkip.addEventListener('click', finishIntro);
      introReplay.addEventListener('click', startIntro);
      introPlay.addEventListener('click', finishIntro);
      /* — Añadido: botón "?" de la barra de estado repite la intro completa — */
      document.getElementById('helpBtn').addEventListener('click', function () {
        intro.hidden = false;
        document.body.classList.add('intro-open');
        startIntro();
      });
      levelLessonSkip.addEventListener('click', finishLevelLesson);
      levelLessonContinue.addEventListener('click', finishLevelLesson);

      playBtn.addEventListener('click', function () { playMeasure(1); });
      loopBtn.addEventListener('click', function () { playMeasure(5); });
      /* — Añadido (Fase 3): interruptor de la pista de silencios — */
      var restCueToggleBtn = document.getElementById('restCueToggle');
      if (restCueToggleBtn) {
        restCueToggleBtn.addEventListener('click', function () {
          restCueEnabled = !restCueEnabled;
          restCueToggleBtn.setAttribute('aria-pressed', restCueEnabled ? 'true' : 'false');
          restCueToggleBtn.classList.toggle('off', !restCueEnabled);
          showPetSpeech(restCueEnabled ? '🤫 Pista de silencios: ¡encendida!' : 'Pista de silencios: apagada.', 2200);
        });
      }

      /* ============================================================
         Añadido (Fase 6): lección de picos nuevos — 3/8 y 2/16.
         Se muestra UNA sola vez, la primera vez que el niño elige
         un bloque de puntillo o pique doble en cualquier bandeja.
         ============================================================ */
      var PICADAS_KEY = 'compas_picadas_lesson_v1';
      function maybeShowPicadasLesson(typeKey) {
        if (typeKey !== 'dottedQuarter' && typeKey !== 'sixteenthPair') return;
        try { if (localStorage.getItem(PICADAS_KEY) === 'true') return; } catch (e) { return; }
        var modal = document.getElementById('picadasLessonModal');
        if (modal) modal.hidden = false;
      }
      function closePicadasLesson() {
        try { localStorage.setItem(PICADAS_KEY, 'true'); } catch (e) { }
        var modal = document.getElementById('picadasLessonModal');
        if (modal) modal.hidden = true;
      }
      function picadaDemo38() {
        var ctx = makeAudio();
        if (!ctx) return;
        var t = ctx.currentTime + 0.08;
        var u = 0.25;
        // TAM-ta: así suena el 3/8 (cuarto + octavo pegados)
        playSound('drum', t, 0.62, { pitch: 0, echo: 0, bright: 55 });
        playSound('drum', t + 2 * u, 0.42, { pitch: 0, echo: 0, bright: 55 });
        // ta-TAM: con los bloques sueltos el orden puede cambiar
        playSound('drum', t + 2.2, 0.42, { pitch: 0, echo: 0, bright: 55 });
        playSound('drum', t + 2.2 + u, 0.62, { pitch: 0, echo: 0, bright: 55 });
      }
      function picadaDemo216() {
        var ctx = makeAudio();
        if (!ctx) return;
        var t = ctx.currentTime + 0.08;
        var u = 0.25;
        // ta: un octavo normal
        playSound('drum', t, 0.62, { pitch: 0, echo: 0, bright: 55 });
        // ta-ka: el pique doble parte el octavo en dos rapiditos
        playSound('drum', t + 0.9, 0.5, { pitch: 0, echo: 0, bright: 55 });
        playSound('drum', t + 0.9 + u / 2, 0.34, { pitch: 0, echo: 0, bright: 55 });
      }
      (function bindPicadasLesson() {
        var close = document.getElementById('picadasLessonClose');
        if (close) close.addEventListener('click', closePicadasLesson);
        var d38 = document.getElementById('picadasDemo38');
        if (d38) d38.addEventListener('click', picadaDemo38);
        var d216 = document.getElementById('picadasDemo216');
        if (d216) d216.addEventListener('click', picadaDemo216);
      }());
      clearBtn.addEventListener('click', function () {
        if (state.playing) return;
        if (state.demo) endDemo(false);
        makeAudio();
        clearCircle('Elige un bloque y vuelve a tocar el círculo.');
      });

      var demoTimers = [];
      function endDemo(keepCircle) {
        demoTimers.forEach(function (timer) { clearTimeout(timer); });
        demoTimers = [];
        state.demo = false;
        if (!keepCircle) state.placements = [];
        renderWheel();
        setFeedback('Ahora tú: elige rojo y completa el círculo.', '');
      }

      function runDemo() {
        setFeedback('Mira cómo se completa el círculo…', '');
        for (var i = 0; i < 4; i++) {
          (function (index) {
            demoTimers.push(setTimeout(function () {
              if (!state.demo) return;
              state.placements.push({ id: state.nextId++, type: 'quarter', start: index * 2, span: 2 });
              renderWheel();
              var current = state.placements[state.placements.length - 1];
              flashPlacement(current.id, 0);
            }, 450 + index * 650));
          }(i));
        }
        demoTimers.push(setTimeout(function () { if (state.demo) endDemo(false); }, 4200));
      }

      detectiveListen.addEventListener('click', playSecret);

      var creatorEl = document.getElementById('creator');
      var creatorMeasuresEl = document.getElementById('creatorMeasures');
      var creatorTrayEl = document.getElementById('creatorTray');
      var creatorNow = document.getElementById('creatorNow');
      var creatorLoopBtn = document.getElementById('creatorLoop');
      var creatorState = {
        active: 0,
        selected: 'quarter',
        loop: false,
        playing: false,
        missionDone: {},
        discoveries: {},
        measures: [0, 1, 2, 3].map(function (index) {
          return { placements: [], sound: ['drum', 'piano', 'guitar', 'strings'][index], settings: { pitch: 0, echo: 10, bright: 55 }, nextId: 1 };
        })
      };

      /* — Añadido (Fase 2): capas marcadas para escucha simultánea — */
      var creatorLayers = [false, false, false, false];

      function showCreatorMode() {
        if (!state.creatorUnlocked) return;
        gameApp.style.display = 'none';
        creatorEl.classList.add('show');
        renderCreator();
        window.scrollTo(0, 0);
      }

      function showGameMode() {
        creatorEl.classList.remove('show');
        gameApp.style.display = '';
        document.getElementById('showGame').classList.add('active');
        document.getElementById('showCreator').classList.remove('active');
        window.scrollTo(0, 0);
      }

      document.getElementById('showCreator').addEventListener('click', showCreatorMode);
      document.getElementById('showGame').addEventListener('click', showGameMode);
      document.getElementById('creatorShowGame').addEventListener('click', showGameMode);

      function creatorOccupied(measureData) {
        return COMPAS.occupiedOf(measureData.placements);
      }

      function creatorPlace(measureIndex, start) {
        if (creatorState.playing) return;
        makeAudio();
        creatorState.active = measureIndex;
        var bar = creatorState.measures[measureIndex];
        var type = TYPES[creatorState.selected];
        if (type.units === 8) start = 0;
        if (start + type.units > 8) {
          creatorNow.textContent = 'Ese bloque se sale del círculo. Prueba un hueco más grande.';
          return;
        }
        bar.placements = bar.placements.filter(function (p) { return !overlaps(p, start, type.units); });
        bar.placements.push({ id: bar.nextId++, type: creatorState.selected, start: start, span: type.units, sound: creatorState.selectedSound || bar.sound });
        bar.placements.sort(function (a, b) { return a.start - b.start; });
        creatorNow.textContent = 'Compás ' + (measureIndex + 1) + (creatorBarUnits(bar) === 8 ? ' completo: ¡un entero!' : ' activo · faltan ' + fractionText(8 - creatorBarUnits(bar)) + '.');
        renderCreator();
        checkLearning();
      }

      function creatorBarUnits(bar) {
        return COMPAS.barUnits(bar);
      }

      function renderCreatorMeasures() {
        creatorMeasuresEl.innerHTML = '';
        creatorState.measures.forEach(function (bar, measureIndex) {
          var card = document.createElement('article');
          card.className = 'creator-measure' + (creatorState.active === measureIndex ? ' active' : '') + (creatorLayers[measureIndex] ? ' layer-on' : '');
          card.addEventListener('click', function () { creatorState.active = measureIndex; renderCreator(); });
          var heading = document.createElement('h3');
          heading.textContent = 'Compás ' + (measureIndex + 1) + ' · ' + creatorBarUnits(bar) + '/8';
          card.appendChild(heading);
          /* — Añadido (Fase 2): interruptor de capa para escucha simultánea — */
          var layerBtn = document.createElement('button');
          layerBtn.type = 'button';
          layerBtn.className = 'creator-layer-btn' + (creatorLayers[measureIndex] ? ' on' : '');
          layerBtn.textContent = '🔀';
          layerBtn.title = 'Marcar para escuchar este compás junto a los otros marcados';
          layerBtn.setAttribute('aria-pressed', creatorLayers[measureIndex] ? 'true' : 'false');
          layerBtn.addEventListener('click', function (event) {
            event.stopPropagation();
            creatorLayers[measureIndex] = !creatorLayers[measureIndex];
            renderCreator();
          });
          card.appendChild(layerBtn);
          var svg = svgEl('svg', { viewBox: '0 0 240 240', class: 'mini-wheel', role: 'group', 'aria-label': 'Compás ' + (measureIndex + 1) });
          var occupied = creatorOccupied(bar);
          for (var unit = 0; unit < 8; unit++) {
            (function (start) {
              var slot = svgEl('path', { d: wedgePath(start, 1, 42, 105), class: 'wheel-slot', tabindex: '0', role: 'button', 'aria-label': 'Trozo ' + (start + 1) });
              slot.addEventListener('click', function (event) { event.stopPropagation(); creatorPlace(measureIndex, start); });
              slot.addEventListener('keydown', function (event) {
                if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); event.stopPropagation(); creatorPlace(measureIndex, start); }
              });
              svg.appendChild(slot);
            }(unit));
          }
          bar.placements.forEach(function (p) {
            var type = TYPES[p.type];
            var fill = svgEl('path', { d: wedgePath(p.start, p.span, 42, 105), class: 'wheel-fill ' + type.className, 'data-cbar': measureIndex, 'data-cplacement': p.id });
            svg.appendChild(fill);
            var mid = polar(76, (p.start + p.span / 2) * 45);
            var label = svgEl('text', { x: mid.x, y: mid.y, class: 'wheel-label' });
            label.textContent = type.silent ? 'sil.' : type.fraction;
            svg.appendChild(label);
          });
          card.appendChild(svg);
          var select = document.createElement('select');
          select.className = 'measure-sound';
          select.setAttribute('aria-label', 'Sonido del compás ' + (measureIndex + 1));
          Object.keys(SOUNDS).forEach(function (key) {
            var option = document.createElement('option');
            option.value = key;
            var isPremium = (key === 'bells' || key === 'synth');
            var isUnlocked = !isPremium || isItemOwned('sound_' + key);
            option.textContent = SOUNDS[key].name + (!isUnlocked ? ' 🔒' : '');
            if (!isUnlocked) option.disabled = true;
            option.selected = bar.sound === key;
            select.appendChild(option);
          });
          select.addEventListener('click', function (event) { event.stopPropagation(); });
          select.addEventListener('change', function (event) {
            event.stopPropagation();
            creatorState.active = measureIndex;
            bar.sound = select.value;
            updateLab();
            var ctx = makeAudio();
            if (ctx) playSound(bar.sound, ctx.currentTime + .03, .7, bar.settings);
          });
          card.appendChild(select);
          creatorMeasuresEl.appendChild(card);
        });
      }

      function renderCreatorTray() {
        creatorTrayEl.innerHTML = '';
        LEVELS[8].blocks.forEach(function (key) {
          var item = TYPES[key];
          var button = document.createElement('button');
          button.type = 'button';
          button.className = 'rhythm-block ' + item.className + (creatorState.selected === key ? ' selected' : '');
          button.setAttribute('aria-pressed', creatorState.selected === key ? 'true' : 'false');
          button.innerHTML = '<span class="fraction">' + item.fraction + '</span><span class="name">' + (item.silent ? 'silencio · ' : '') + item.spoken + '</span>';
          button.addEventListener('click', function () {
            creatorState.selected = key;
            renderCreatorTray();
            creatorNow.textContent = 'Bloque ' + (item.silent ? 'silencio de ' : '') + item.spoken + ' elegido.';
            maybeShowPicadasLesson(key);
          });
          creatorTrayEl.appendChild(button);
        });
      }

      function renderCreator() {
        renderCreatorMeasures();
        renderCreatorTray();
        updateLab();
        updateCreatorMath();
      }

      function setKnob(faceId, value, min, max) {
        var angle = -130 + ((value - min) / (max - min)) * 260;
        document.getElementById(faceId).style.setProperty('--angle', angle + 'deg');
      }

      function updateLab() {
        var bar = creatorState.measures[creatorState.active];
        document.getElementById('labSoundName').textContent = 'Compás ' + (creatorState.active + 1) + ' · ' + SOUNDS[bar.sound].name;
        var pitch = document.getElementById('pitchKnob');
        var echo = document.getElementById('echoKnob');
        var bright = document.getElementById('brightKnob');
        pitch.value = bar.settings.pitch;
        echo.value = bar.settings.echo;
        bright.value = bar.settings.bright;
        document.getElementById('pitchValue').textContent = (bar.settings.pitch > 0 ? '+' : '') + bar.settings.pitch;
        document.getElementById('echoValue').textContent = bar.settings.echo + '%';
        document.getElementById('brightValue').textContent = bar.settings.bright + '%';
        setKnob('pitchFace', bar.settings.pitch, -12, 12);
        setKnob('echoFace', bar.settings.echo, 0, 100);
        setKnob('brightFace', bar.settings.bright, 0, 100);
      }

      function knobInput(key, inputId, faceId, min, max, suffix) {
        var input = document.getElementById(inputId);
        input.addEventListener('input', function () {
          var bar = creatorState.measures[creatorState.active];
          bar.settings[key] = Number(input.value);
          document.getElementById(key === 'pitch' ? 'pitchValue' : key === 'echo' ? 'echoValue' : 'brightValue').textContent = (key === 'pitch' && input.value > 0 ? '+' : '') + input.value + (suffix || '');
          setKnob(faceId, Number(input.value), min, max);
          var ctx = makeAudio();
          if (ctx) playSound(bar.sound, ctx.currentTime + .02, .62, bar.settings);
        });
      }

      knobInput('pitch', 'pitchKnob', 'pitchFace', -12, 12, '');
      knobInput('echo', 'echoKnob', 'echoFace', 0, 100, '%');
      knobInput('bright', 'brightKnob', 'brightFace', 0, 100, '%');

      function playCreator() {
        if (creatorState.playing) return;
        var ctx = makeAudio();
        if (!ctx) return;
        creatorState.playing = true;
        var unitMs = 190;
        var barMs = unitMs * 8;
        var cycles = creatorState.loop ? 3 : 1;
        var start = ctx.currentTime + .08;
        creatorNow.textContent = creatorState.loop ? 'Tu secuencia sonará 3 vueltas…' : 'Sonando los 4 compases…';
        for (var cycle = 0; cycle < cycles; cycle++) {
          creatorState.measures.forEach(function (bar, barIndex) {
            bar.placements.forEach(function (p) {
              if (TYPES[p.type].silent) {
                if (restCueEnabled) playRestCue(start + (cycle * 4 * barMs + barIndex * barMs + p.start * unitMs) / 1000);
                return;
              }
              var offsetMs = cycle * 4 * barMs + barIndex * barMs + p.start * unitMs;
              playSound(p.sound || bar.sound, start + offsetMs / 1000, p.type === 'eighth' ? .43 : .65, bar.settings);
              /* — Añadido (Fase 6): pique doble 2/16 — */
              if (TYPES[p.type].twin) playSound(p.sound || bar.sound, start + offsetMs / 1000 + unitMs / 2000, .34, bar.settings);
            });
          });
        }
        setTimeout(function () {
          creatorState.playing = false;
          creatorNow.textContent = '¡Tu secuencia terminó! Puedes ajustarla o descargarla.';
        }, cycles * 4 * barMs + 180);
      }

      document.getElementById('creatorPlay').addEventListener('click', playCreator);
      creatorLoopBtn.addEventListener('click', function () {
        creatorState.loop = !creatorState.loop;
        creatorLoopBtn.classList.toggle('active', creatorState.loop);
        creatorLoopBtn.setAttribute('aria-pressed', creatorState.loop ? 'true' : 'false');
        creatorLoopBtn.textContent = creatorState.loop ? '🔁 Loop ×3' : '🔁 Loop';
      });
      document.getElementById('creatorClear').addEventListener('click', function () {
        creatorState.measures[creatorState.active].placements = [];
        creatorNow.textContent = 'Compás ' + (creatorState.active + 1) + ' vacío.';
        renderCreator();
        checkLearning();
      });

      function completeMission(key, message) {
        if (creatorState.missionDone[key]) return;
        creatorState.missionDone[key] = true;
        var card = document.querySelector('[data-mission="' + key + '"]');
        if (card) card.classList.add('done');
        creatorNow.textContent = message;
        levelPop('¡Misión cumplida!', message);
        confetti();
      }

      function addDiscovery(key, message) {
        if (creatorState.discoveries[key]) return;
        creatorState.discoveries[key] = true;
        document.getElementById('emptyDiscovery').style.display = 'none';
        var item = document.createElement('p');
        item.className = 'discovery';
        item.textContent = message;
        document.getElementById('discoveryList').appendChild(item);
        confetti();
      }

      function checkLearning() {
        var bars = creatorState.measures;
        COMPAS.detectMissions(bars).forEach(function (mission) {
          completeMission(mission.key, mission.message);
        });
        bars.forEach(function (bar) {
          COMPAS.detectDiscoveries(bar).forEach(function (discovery) {
            addDiscovery(discovery.key, discovery.message);
          });
        });
      }

      function synthSample(kind, t, settings, seed) {
        var pitchRatio = Math.pow(2, settings.pitch / 12);
        var bright = .25 + settings.bright / 100;
        if (kind === 'kick' || kind === 'drum') return Math.sin(2 * Math.PI * (kind === 'kick' ? 72 : 128) * pitchRatio * t) * Math.exp(-7 * t) * .8;
        if (kind === 'snare' || kind === 'clap' || kind === 'shaker') {
          var noise = Math.sin((seed * 12.9898 + t * 78233.3)) * 43758.5453;
          noise = (noise - Math.floor(noise)) * 2 - 1;
          return noise * Math.exp(-(kind === 'shaker' ? 28 : 14) * t) * .42 * bright;
        }
        if (kind === 'bell') return (Math.sin(2 * Math.PI * 880 * pitchRatio * t) + .35 * Math.sin(2 * Math.PI * 1320 * pitchRatio * t)) * Math.exp(-4 * t) * .35;
        var base = kind === 'piano' ? 523.25 : kind === 'guitar' ? 392 : 261.63;
        var envelope = kind === 'strings' ? Math.min(1, t * 9) * Math.exp(-1.7 * t) : Math.exp(-(kind === 'guitar' ? 5 : 3.8) * t);
        return (Math.sin(2 * Math.PI * base * pitchRatio * t) + bright * .22 * Math.sin(4 * Math.PI * base * pitchRatio * t)) * envelope * .34;
      }

      function makeWav() {
        var rate = 22050;
        var unitSec = .19;
        var totalSec = 4 * 8 * unitSec + .8;
        var samples = new Float32Array(Math.ceil(totalSec * rate));
        creatorState.measures.forEach(function (bar, barIndex) {
          bar.placements.forEach(function (p, eventIndex) {
            if (TYPES[p.type].silent) return;
            var startSample = Math.floor((barIndex * 8 + p.start) * unitSec * rate);
            var snd = p.sound || bar.sound;
            var duration = (SOUNDS[snd] && SOUNDS[snd].melodic) ? .75 : .4;
            var count = Math.floor(duration * rate);
            for (var j = 0; j < count && startSample + j < samples.length; j++) {
              var value = synthSample(snd, j / rate, bar.settings, eventIndex + startSample);
              samples[startSample + j] += value;
              if (bar.settings.echo > 0) {
                var echoAt = startSample + j + Math.floor((.11 + bar.settings.echo / 800) * rate);
                if (echoAt < samples.length) samples[echoAt] += value * bar.settings.echo / 240;
              }
            }
          });
        });
        var buffer = new ArrayBuffer(44 + samples.length * 2);
        var view = new DataView(buffer);
        function text(offset, value) { for (var i = 0; i < value.length; i++) view.setUint8(offset + i, value.charCodeAt(i)); }
        text(0, 'RIFF'); view.setUint32(4, 36 + samples.length * 2, true); text(8, 'WAVE'); text(12, 'fmt ');
        view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true); view.setUint32(24, rate, true); view.setUint32(28, rate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true); text(36, 'data'); view.setUint32(40, samples.length * 2, true);
        for (var s = 0; s < samples.length; s++) {
          var sample = Math.max(-1, Math.min(1, samples[s]));
          view.setInt16(44 + s * 2, sample < 0 ? sample * 32768 : sample * 32767, true);
        }
        return new Blob([view], { type: 'audio/wav' });
      }

      document.getElementById('creatorDownload').addEventListener('click', function () {
        var hasNotes = creatorState.measures.some(function (bar) { return bar.placements.length > 0; });
        if (!hasNotes) { creatorNow.textContent = 'Añade algunos bloques antes de descargar.'; return; }
        var url = URL.createObjectURL(makeWav());
        var link = document.createElement('a');
        link.href = url;
        link.download = 'mi-ritmo-ED-Dev.wav';
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1200);
        creatorNow.textContent = 'WAV descargado. Ya puedes enviarlo por WhatsApp o compartirlo.';
      });

      var teacherEl = document.getElementById('teacher');
      function openTeacher() {
        teacherEl.hidden = false;
        gameApp.setAttribute('inert', '');
        document.body.classList.add('intro-open');
        document.getElementById('teacherClose').focus();
      }
      function closeTeacher() {
        teacherEl.hidden = true;
        if (intro.hidden && levelLesson.hidden && petSelectModal.hidden && petEvoModal.hidden) {
          gameApp.removeAttribute('inert');
          document.body.classList.remove('intro-open');
        }
      }
      function shareToWhatsApp(text) {
        var url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(text);
        window.location.href = url;
      }

      document.getElementById('teacherClose').addEventListener('click', closeTeacher);
      document.getElementById('teacherPrint').addEventListener('click', function () { window.print(); });
      document.getElementById('teacherShare').addEventListener('click', function () {
        var text = 'Mi hijo/a creó un ritmo con matemática en "Completa el compás" (ED-Dev): fracciones que suenan. ¡Escúchalo!';
        shareToWhatsApp(text);
      });
      Array.prototype.forEach.call(document.querySelectorAll('[data-open-teacher]'), function (btn) {
        btn.addEventListener('click', openTeacher);
      });

      document.getElementById('creatorShare').addEventListener('click', function () {
        var hasNotes = creatorState.measures.some(function (bar) { return bar.placements.length > 0; });
        if (!hasNotes) { creatorNow.textContent = 'Añade algunos bloques antes de compartir.'; return; }
        var blob = makeWav();
        var file = null;
        try { file = new File([blob], 'mi-ritmo-ED-Dev.wav', { type: 'audio/wav' }); } catch (e) { file = null; }
        if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
          navigator.share({ files: [file], title: 'Mi ritmo', text: '¡Escucha el ritmo que creé en Completa el compás!' }).catch(function () {});
        } else {
          shareToWhatsApp('¡Escucha el ritmo que creé en Completa el compás! (te envío mi WAV)');
          creatorNow.textContent = 'Se abrió WhatsApp: adjunta el WAV descargado.';
        }
      });

      
      var mapView = document.getElementById('mapView');
      var showMapBtn = document.getElementById('showMap');
      var creatorShowMapBtn = document.getElementById('creatorShowMap');
      var mapShowGameBtn = document.getElementById('mapShowGame');
      var mapShowCreatorBtn = document.getElementById('mapShowCreator');
      var creatorMathTotal = document.getElementById('creatorMathTotal');
      var creatorMathEvalBtn = document.getElementById('creatorMathEvalBtn');

      var duoView = document.getElementById('duoView');
      var simonView = document.getElementById('simonView');
      var marketView = document.getElementById('marketView');
      var stallView = document.getElementById('stallView');

      function hideAllViews() {
        gameApp.style.display = 'none';
        creatorEl.classList.remove('show');
        if (mapView) mapView.classList.remove('show');
        if (duoView) duoView.classList.remove('show');
        if (simonView) simonView.classList.remove('show');
        if (marketView) marketView.classList.remove('show');
        if (stallView) stallView.classList.remove('show');
      }

      function updateNavActive(modeKey) {
        var allButtons = document.querySelectorAll('.mode-switch button');
        for (var i = 0; i < allButtons.length; i++) {
          allButtons[i].classList.remove('active');
        }
        var mapping = {
          game: ['showGame', 'mapShowGame', 'creatorShowGame', 'duoShowGame', 'simonShowGame', 'marketShowGame', 'stallShowGame'],
          creator: ['showCreator', 'mapShowCreator', 'duoShowCreator', 'simonShowCreator', 'marketShowCreator', 'stallShowCreator'],
          map: ['showMap', 'creatorShowMap', 'duoShowMap', 'simonShowMap', 'marketShowMap', 'stallShowMap'],
          market: ['showMarket', 'mapShowMarket', 'creatorShowMarket', 'duoShowMarket', 'simonShowMarket', 'marketShowMarket', 'stallShowMarket'],
          stall: ['showStall', 'mapShowStall', 'creatorShowStall', 'duoShowStall', 'simonShowStall', 'marketShowStall', 'stallShowStall'],
          duo: ['showDuo', 'mapShowDuo', 'creatorShowDuo', 'simonShowDuo', 'marketShowDuo', 'stallShowDuo'],
          simon: ['showSimon', 'mapShowSimon', 'creatorShowSimon', 'duoShowSimon', 'marketShowSimon', 'stallShowSimon']
        };
        var activeIds = mapping[modeKey] || [];
        activeIds.forEach(function (id) {
          var b = document.getElementById(id);
          if (b) b.classList.add('active');
        });
      }

      function showGameMode() {
        hideAllViews();
        gameApp.style.display = '';
        updateNavActive('game');
        renderStatus();
        window.scrollTo(0, 0);
      }

      
      /* =========================================================
         SISTEMA DE DESBLOQUEO PROGRESIVO Y MODO DOCENTE
         ========================================================= */
      var MODE_UNLOCKS = {
        game:    { minLevel: 1,  name: 'Niveles',               icon: '🎮' },
        map:     { minLevel: 1,  name: 'Mapa',                  icon: '🗺️' },
        creator: { minLevel: 3,  name: 'Mi ritmo & Cancionero', icon: '🎼' },
        simon:   { minLevel: 3,  name: 'Eco Rítmico',           icon: '🎯' },
        library: { minLevel: 4,  name: 'Biblioteca de Ritmos',  icon: '📚' },
        market:  { minLevel: 5,  name: 'Mercadito',             icon: '🏪' },
        stall:   { minLevel: 7,  name: 'El Puesto de Bebidas',  icon: '🥤' },
        duo:     { minLevel: 8,  name: '2 Jugadores & Salas',   icon: '👥' },
        academy: { minLevel: 12, name: 'Academia Matemática',   icon: '📐' }
      };

      var isTeacherUnlockedAll = (localStorage.getItem('compas_teacher_unlocked_all') === 'true');

      function getHighestPlayerLevel() {
        var max = (state && state.level) ? state.level : 1;
        if (petState && petState.completedLevels) {
          Object.keys(petState.completedLevels).forEach(function (k) {
            var num = parseInt(k, 10);
            if (!isNaN(num) && num + 1 > max) max = num + 1;
          });
        }
        return max;
      }

      function isModeUnlocked(modeKey) {
        if (isTeacherUnlockedAll) return true;
        var rule = MODE_UNLOCKS[modeKey];
        if (!rule) return true;
        return getHighestPlayerLevel() >= rule.minLevel;
      }

      function notifyModeLocked(modeKey) {
        var rule = MODE_UNLOCKS[modeKey];
        if (!rule) return;
        var lvl = getHighestPlayerLevel();
        var diff = rule.minLevel - lvl;
        makeAudio();
        var ctx = makeAudio();
        if (ctx) playSound('bell', ctx.currentTime + 0.02, 0.4, { pitch: -2, echo: 10, bright: 30 });
        if (petWidget) {
          petWidget.classList.add('jump');
          setTimeout(function () { petWidget.classList.remove('jump'); }, 600);
        }
        var msg = '🔒 ' + rule.icon + ' ' + rule.name + ' se desbloquea al alcanzar el Nivel ' + rule.minLevel + '. ';
        if (diff > 0) {
          msg += '¡Te falta' + (diff === 1 ? ' solo 1 nivel' : 'n ' + diff + ' niveles') + ' para conquistarlo!';
        } else {
          msg += '¡Sigue avanzando!';
        }
        showPetSpeech(msg, 4500);
      }

      function updateNavButtonsLockState() {
        var buttons = document.querySelectorAll('.mode-switch button[data-mode]');
        buttons.forEach(function (btn) {
          var modeKey = btn.getAttribute('data-mode');
          var rule = MODE_UNLOCKS[modeKey];
          if (!rule) return;

          var unlocked = isModeUnlocked(modeKey);
          if (unlocked) {
            btn.classList.remove('mode-btn-locked');
            btn.classList.add('mode-btn-unlocked');
            btn.title = rule.name;
            // Clean text
            if (modeKey === 'game') btn.textContent = 'Niveles';
            else if (modeKey === 'map') btn.textContent = '🗺️ Mapa';
            else if (modeKey === 'creator') btn.textContent = '🎼 Mi ritmo';
            else if (modeKey === 'simon') btn.textContent = '🎯 Eco';
            else if (modeKey === 'library') btn.textContent = '📚 Biblioteca';
            else if (modeKey === 'market') btn.textContent = '🏪 Mercadito';
            else if (modeKey === 'stall') btn.textContent = '🥤 El Puesto';
            else if (modeKey === 'duo') btn.textContent = '👥 2 Jugadores';
            else if (modeKey === 'academy') btn.textContent = '📐 Academia';
          } else {
            btn.classList.add('mode-btn-locked');
            btn.classList.remove('mode-btn-unlocked');
            btn.title = 'Bloqueado · Requiere Nivel ' + rule.minLevel;
            if (modeKey === 'creator') btn.textContent = '🎼 Mi ritmo 🔒 N3';
            else if (modeKey === 'simon') btn.textContent = '🎯 Eco 🔒 N3';
            else if (modeKey === 'library') btn.textContent = '📚 Biblioteca 🔒 N4';
            else if (modeKey === 'market') btn.textContent = '🏪 Mercadito 🔒 N5';
            else if (modeKey === 'stall') btn.textContent = '🥤 El Puesto 🔒 N7';
            else if (modeKey === 'duo') btn.textContent = '👥 2 Jugadores 🔒 N8';
            else if (modeKey === 'academy') btn.textContent = '📐 Academia 🔒 N12';
          }
        });
      }

      function checkModeUnlocksOnLevelUp(newLevel) {
        var unlockedNow = [];
        Object.keys(MODE_UNLOCKS).forEach(function (k) {
          var rule = MODE_UNLOCKS[k];
          if (rule.minLevel === newLevel) {
            unlockedNow.push(rule.icon + ' ' + rule.name);
          }
        });
        if (unlockedNow.length > 0) {
          confetti();
          fanfareSound();
          celebratePetWin();
          showPetSpeech('🎉 ¡Nuevo modo desbloqueado: ' + unlockedNow.join(', ') + '!', 5000);
          /* — Añadido (Fase 3): anuncio destacado del Creador multicompás al llegar al nivel 3 — */
          if (unlockedNow.some(function (n) { return n.indexOf('Mi ritmo') > -1; })) {
            setTimeout(function () {
              levelPop('🎼 ¡Nuevo mundo desbloqueado!', 'Mi ritmo & Cancionero: crea canciones con 4 compases');
            }, 1200);
          }
        }
        updateNavButtonsLockState();
      }

      
      function openLibraryDirect() {
        if (!isModeUnlocked('library')) {
          notifyModeLocked('library');
          return;
        }
        renderLibrary();
        if (rhythmLibraryModal) rhythmLibraryModal.style.display = 'flex';
      }

      ['showLibrary', 'mapShowLibrary', 'creatorShowLibrary', 'duoShowLibrary', 'simonShowLibrary', 'marketShowLibrary', 'stallShowLibrary'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('click', openLibraryDirect);
      });

      /* Conectar Toggle Modo Docente */
      var teacherUnlockToggle = document.getElementById('teacherUnlockAllToggle');
      if (teacherUnlockToggle) {
        teacherUnlockToggle.checked = isTeacherUnlockedAll;
        teacherUnlockToggle.addEventListener('change', function () {
          isTeacherUnlockedAll = teacherUnlockToggle.checked;
          try {
            localStorage.setItem('compas_teacher_unlocked_all', isTeacherUnlockedAll ? 'true' : 'false');
          } catch (e) {}
          updateNavButtonsLockState();
          if (isTeacherUnlockedAll) {
            confetti();
            fanfareSound();
            showPetSpeech('🔓 ¡Modo Docente activado! Todos los juegos y herramientas están desbloqueados.', 4000);
          } else {
            showPetSpeech('🔒 Modo Docente desactivado. Los juegos se adaptan al progreso del alumno.', 3500);
          }
        });
      }


      function showCreatorMode() {
        if (!isModeUnlocked('creator')) {
          notifyModeLocked('creator');
          return;
        }
        hideAllViews();
        creatorEl.classList.add('show');
        updateNavActive('creator');
        renderCreator();
        window.scrollTo(0, 0);
      }

      function showMapMode() {
        if (!isModeUnlocked('map')) {
          notifyModeLocked('map');
          return;
        }
        hideAllViews();
        if (mapView) mapView.classList.add('show');
        updateNavActive('map');
        renderMap();
        window.scrollTo(0, 0);
      }

      function showDuoMode() {
        if (!isModeUnlocked('duo')) {
          notifyModeLocked('duo');
          return;
        }
        hideAllViews();
        if (duoView) duoView.classList.add('show');
        updateNavActive('duo');
        renderDuoView();
        window.scrollTo(0, 0);
      }

      function showSimonMode() {
        if (!isModeUnlocked('simon')) {
          notifyModeLocked('simon');
          return;
        }
        hideAllViews();
        if (simonView) simonView.classList.add('show');
        updateNavActive('simon');
        renderSimonView();
        window.scrollTo(0, 0);
      }

      function showMarketMode() {
        if (!isModeUnlocked('market')) {
          notifyModeLocked('market');
          return;
        }
        hideAllViews();
        if (marketView) marketView.classList.add('show');
        updateNavActive('market');
        renderMarketView();
        window.scrollTo(0, 0);
      }

      function showStallMode() {
        if (!isModeUnlocked('stall')) {
          notifyModeLocked('stall');
          return;
        }
        hideAllViews();
        if (stallView) stallView.classList.add('show');
        updateNavActive('stall');
        renderStallView();
        window.scrollTo(0, 0);
      }

      // Enlazar botones de navegación
      ['showGame', 'creatorShowGame', 'mapShowGame', 'duoShowGame', 'simonShowGame', 'marketShowGame', 'stallShowGame'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('click', showGameMode);
      });
      ['showCreator', 'mapShowCreator', 'duoShowCreator', 'simonShowCreator', 'marketShowCreator', 'stallShowCreator'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('click', showCreatorMode);
      });
      ['showMap', 'creatorShowMap', 'duoShowMap', 'simonShowMap', 'marketShowMap', 'stallShowMap'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('click', showMapMode);
      });
      ['showMarket', 'mapShowMarket', 'creatorShowMarket', 'duoShowMarket', 'simonShowMarket', 'stallShowMarket'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('click', showMarketMode);
      });
      ['showStall', 'mapShowStall', 'creatorShowStall', 'duoShowStall', 'simonShowStall', 'marketShowStall'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('click', showStallMode);
      });
      ['showDuo', 'mapShowDuo', 'creatorShowDuo', 'simonShowDuo', 'marketShowDuo', 'stallShowDuo'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('click', showDuoMode);
      });
      ['showSimon', 'mapShowSimon', 'creatorShowSimon', 'duoShowSimon', 'marketShowSimon', 'stallShowSimon'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('click', showSimonMode);
      });

      /* =========================================================
         ESTADO Y LÓGICA DEL MODO 2 JUGADORES
         ========================================================= */
      var tabCoop = document.getElementById('tabCoop');
      var tabDuel = document.getElementById('tabDuel');
      var duoCoopPane = document.getElementById('duoCoopPane');
      var duoDuelPane = document.getElementById('duoDuelPane');

      var coopWheel = document.getElementById('coopWheel');
      var coopTotal = document.getElementById('coopTotal');
      var coopPlayBtn = document.getElementById('coopPlayBtn');
      var coopClearBtn = document.getElementById('coopClearBtn');
      var coopNewMissionBtn = document.getElementById('coopNewMissionBtn');
      var coopFeedback = document.getElementById('coopFeedback');
      var coopP1Avatar = document.getElementById('coopP1Avatar');
      var coopP2Avatar = document.getElementById('coopP2Avatar');
      var coopP1PetBtn = document.getElementById('coopP1PetBtn');
      var coopP2PetBtn = document.getElementById('coopP2PetBtn');
      var coopP1Card = document.getElementById('coopP1Card');
      var coopP2Card = document.getElementById('coopP2Card');
      var coopP1TurnIndicator = document.getElementById('coopP1TurnIndicator');
      var coopP2TurnIndicator = document.getElementById('coopP2TurnIndicator');
      var coopP1Tray = document.getElementById('coopP1Tray');
      var coopP2Tray = document.getElementById('coopP2Tray');
      var coopMissionTitle = document.getElementById('coopMissionTitle');
      var coopMissionDesc = document.getElementById('coopMissionDesc');
      var coopSwapRolesBtn = document.getElementById('coopSwapRolesBtn');

      // Referencias DOM para Duelos (Módulo F)
      var duelModePvp = document.getElementById('duelModePvp');
      var duelModeCpu = document.getElementById('duelModeCpu');
      var duelDiffBar = document.getElementById('duelDiffBar');
      var duelLobbyView = document.getElementById('duelLobbyView');
      var duelArenaView = document.getElementById('duelArenaView');
      var lobbyP1Avatar = document.getElementById('lobbyP1Avatar');
      var lobbyP2Avatar = document.getElementById('lobbyP2Avatar');
      var lobbyP1Name = document.getElementById('lobbyP1Name');
      var lobbyP2Name = document.getElementById('lobbyP2Name');
      var lobbyP2RoleText = document.getElementById('lobbyP2RoleText');
      var lobbyP1PetPickers = document.getElementById('lobbyP1PetPickers');
      var lobbyP2PetPickers = document.getElementById('lobbyP2PetPickers');
      var lobbyP1AccSelect = document.getElementById('lobbyP1AccSelect');
      var lobbyP2AccSelect = document.getElementById('lobbyP2AccSelect');
      var lobbyP1CardsRow = document.getElementById('lobbyP1CardsRow');
      var lobbyP2CardsRow = document.getElementById('lobbyP2CardsRow');
      var duelStartBtn = document.getElementById('duelStartBtn');
      var duelBackToLobbyBtn = document.getElementById('duelBackToLobbyBtn');

      var duelArenaRoundText = document.getElementById('duelArenaRoundText');
      var arenaP1Avatar = document.getElementById('arenaP1Avatar');
      var arenaP2Avatar = document.getElementById('arenaP2Avatar');
      var arenaP1Name = document.getElementById('arenaP1Name');
      var arenaP2Name = document.getElementById('arenaP2Name');
      var arenaP1Stars = document.getElementById('arenaP1Stars');
      var arenaP2Stars = document.getElementById('arenaP2Stars');
      var arenaP1HpText = document.getElementById('arenaP1HpText');
      var arenaP2HpText = document.getElementById('arenaP2HpText');
      var arenaP1HpFill = document.getElementById('arenaP1HpFill');
      var arenaP2HpFill = document.getElementById('arenaP2HpFill');
      var arenaP1CardIcon = document.getElementById('arenaP1CardIcon');
      var arenaP1CardName = document.getElementById('arenaP1CardName');
      var arenaP2CardIcon = document.getElementById('arenaP2CardIcon');
      var arenaP2CardName = document.getElementById('arenaP2CardName');
      var arenaP1Box = document.getElementById('arenaP1Box');
      var arenaP2Box = document.getElementById('arenaP2Box');
      var duelTurnBanner = document.getElementById('duelTurnBanner');
      var duelTurnIcon = document.getElementById('duelTurnIcon');
      var duelTurnText = document.getElementById('duelTurnText');
      var duelChallengeQuestion = document.getElementById('duelChallengeQuestion');
      var duelChallengeSub = document.getElementById('duelChallengeSub');
      var duelOptionsGrid = document.getElementById('duelOptionsGrid');
      var duelBattleLog = document.getElementById('duelBattleLog');
      var duelWinModal = document.getElementById('duelWinModal');
      var duelWinTitle = document.getElementById('duelWinTitle');
      var duelWinSub = document.getElementById('duelWinSub');
      var duelWinRewardWinner = document.getElementById('duelWinRewardWinner');
      var duelWinRewardLoser = document.getElementById('duelWinRewardLoser');
      var duelRematchBtn = document.getElementById('duelRematchBtn');
      var duelShareBtn = document.getElementById('duelShareBtn');

      var PET_OPTIONS = ['bumbo', 'clave', 'guira'];

      // Referencias DOM para Módulo G (Reto en equipo, Cofre y Misiones)
      var rolePillConstructor = document.getElementById('rolePillConstructor');
      var rolePillVerifier = document.getElementById('rolePillVerifier');
      var coopVerifyBtn = document.getElementById('coopVerifyBtn');
      var coopChestModal = document.getElementById('coopChestModal');
      var coopChestDesc = document.getElementById('coopChestDesc');
      var coopChestShareBtn = document.getElementById('coopChestShareBtn');
      var coopChestCloseBtn = document.getElementById('coopChestCloseBtn');

      var weeklyMissionsTrigger = document.getElementById('weeklyMissionsTrigger');
      var weeklyMissionsBadge = document.getElementById('weeklyMissionsBadge');
      var weeklyMissionsModal = document.getElementById('weeklyMissionsModal');
      var weeklyModalCloseBtn = document.getElementById('weeklyModalCloseBtn');
      var weeklyCardsList = document.getElementById('weeklyCardsList');
      var weeklyShareWhatsappBtn = document.getElementById('weeklyShareWhatsappBtn');

      // Definición de las 3 cartas de poder estilo Yu-Gi-Oh por mascota
      var YUGI_CARDS = {
        bumbo: [
          {
            id: 'bumbo_redoble',
            name: 'Redoble x2',
            badge: 'ATK · ÉPICA ★★★',
            icon: '🥁',
            desc: 'Doble daño demoledor (50 HP) al encadenar 2 aciertos seguidos.',
            pet: 'bumbo'
          },
          {
            id: 'bumbo_escudo',
            name: 'Escudo de Bombo',
            badge: 'DEF · RARA ★★',
            icon: '🛡️',
            desc: 'Absorbe por completo el contraataque del primer fallo de cada ronda.',
            pet: 'bumbo'
          },
          {
            id: 'bumbo_trueno',
            name: 'Golpe de Trueno',
            badge: 'POT · RARA ★★',
            icon: '⚡',
            desc: '+10 de daño adicional en todos tus aciertos (35 HP de daño base).',
            pet: 'bumbo'
          }
        ],
        clave: [
          {
            id: 'clave_eco',
            name: 'Eco Sanador',
            badge: 'MAG · ÉPICA ★★★',
            icon: '🌿',
            desc: 'Cada acierto restaura +15 HP a tu mascota además de golpear.',
            pet: 'clave'
          },
          {
            id: 'clave_sincopa',
            name: 'Síncopa Sorpresa',
            badge: 'ATK · RARA ★★',
            icon: '💥',
            desc: 'Ataque imprevisto a contratiempo: inflige 38 de daño directo.',
            pet: 'clave'
          },
          {
            id: 'clave_caoba',
            name: 'Pared de Caoba',
            badge: 'DEF · RARA ★★',
            icon: '🪵',
            desc: 'Reduce a la mitad el daño que recibes de los fallos (solo 10 HP).',
            pet: 'clave'
          }
        ],
        guira: [
          {
            id: 'guira_raspe',
            name: 'Raspe Crítico',
            badge: 'CRI · ÉPICA ★★★',
            icon: '✨',
            desc: '35% de probabilidad de asestar un golpe crítico de 45 de daño.',
            pet: 'guira'
          },
          {
            id: 'guira_metronomo',
            name: 'Metrónomo Dorado',
            badge: 'ORO · RARA ★★',
            icon: '🪙',
            desc: 'Cada acierto te da +5 monedas al instante y +6 de daño adicional.',
            pet: 'guira'
          },
          {
            id: 'guira_rafaga',
            name: 'Ráfaga de Remonte',
            badge: 'VIDA · RARA ★★',
            icon: '🌪️',
            desc: 'Si tus HP caen a 35 o menos, te cura +25 HP de emergencia (1 vez/ronda).',
            pet: 'guira'
          }
        ]
      };

      /* =========================================================
         MÓDULO G — MISIONES SEMANALES ROTATIVAS (LOCALSTORAGE)
         ========================================================= */
      function getWeeklyKey() {
        var now = new Date();
        var d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
        var dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return d.getUTCFullYear() + '-W' + (weekNo < 10 ? '0' + weekNo : weekNo);
      }

      var WEEKLY_POOLS = [
        [
          { id: 'm1_no_errors', icon: '🏆', title: 'Maestro del Compás', desc: 'Completa 3 niveles sin ningún fallo en el compás', target: 3, reward: 35 },
          { id: 'm2_duel_win', icon: '⚔️', title: 'Guerrero Rítmico', desc: 'Gana 1 Duelo en Modo Duelo (vs CPU o amigo)', target: 1, reward: 30 },
          { id: 'm3_coop_chest', icon: '🤝', title: 'Dúo Armónico', desc: 'Abre el Cofre de 40 monedas en el Reto Cooperativo', target: 1, reward: 40 }
        ],
        [
          { id: 'm1_market_stall', icon: '🥤', title: 'Comerciante Estrella', desc: 'Entrega 3 vueltos exactos en el puesto de meriendas', target: 3, reward: 35 },
          { id: 'm2_duel_win', icon: '⚔️', title: 'Furia Musical', desc: 'Gana 1 combate de duelo al mejor de 3 rondas', target: 1, reward: 30 },
          { id: 'm3_no_errors', icon: '✨', title: 'Compás Perfecto', desc: 'Supera 2 niveles seguidos sin cometer errores', target: 2, reward: 40 }
        ],
        [
          { id: 'm1_no_errors', icon: '🎯', title: 'Pulso Impecable', desc: 'Completa 3 niveles con 100% de aciertos', target: 3, reward: 35 },
          { id: 'm3_coop_chest', icon: '🤝', title: 'Tesoro en Equipo', desc: 'Abre el Cofre Dorado cooperativo sin fallos', target: 1, reward: 40 },
          { id: 'm2_market_shop', icon: '🏪', title: 'Estilo Rítmico', desc: 'Prueba o equipa un accesorio en El Mercadito', target: 1, reward: 25 }
        ]
      ];

      function loadWeeklyMissions() {
        var currentKey = getWeeklyKey();
        var raw = localStorage.getItem('compas_weekly_missions_v1');
        var data = null;
        if (raw) {
          try { data = JSON.parse(raw); } catch (e) { data = null; }
        }

        if (!data || data.weekKey !== currentKey) {
          var seed = 0;
          for (var i = 0; i < currentKey.length; i++) seed += currentKey.charCodeAt(i);
          var poolIdx = Math.abs(seed) % WEEKLY_POOLS.length;
          var template = WEEKLY_POOLS[poolIdx];

          data = {
            weekKey: currentKey,
            missions: template.map(function (m) {
              return {
                id: m.id,
                icon: m.icon,
                title: m.title,
                desc: m.desc,
                target: m.target,
                reward: m.reward,
                progress: 0,
                claimed: false
              };
            })
          };
          saveWeeklyMissions(data);
        }
        return data;
      }

      function saveWeeklyMissions(data) {
        try {
          localStorage.setItem('compas_weekly_missions_v1', JSON.stringify(data));
        } catch (e) {}
        updateWeeklyBadge();
      }

      function updateWeeklyMissionProgress(missionId, amount) {
        amount = amount || 1;
        var data = loadWeeklyMissions();
        var changed = false;
        data.missions.forEach(function (m) {
          if (m.id === missionId && !m.claimed && m.progress < m.target) {
            m.progress = Math.min(m.target, m.progress + amount);
            changed = true;
            if (m.progress >= m.target) {
              makeAudio();
              chime((audio ? audio.currentTime : 0) + 0.05);
              showPetSpeech('🎯 ¡Misión semanal cumplida! Toca "Misiones" para reclamar tu recompensa 🪙', 4000);
            }
          }
        });
        if (changed) {
          saveWeeklyMissions(data);
        }
      }

      function updateWeeklyBadge() {
        if (!weeklyMissionsBadge) return;
        var data = loadWeeklyMissions();
        var unclaimedReady = 0;
        data.missions.forEach(function (m) {
          if (m.progress >= m.target && !m.claimed) unclaimedReady++;
        });
        if (unclaimedReady > 0) {
          weeklyMissionsBadge.textContent = '!' + unclaimedReady;
          weeklyMissionsBadge.style.background = '#22c55e';
        } else {
          var remaining = data.missions.filter(function (m) { return !m.claimed; }).length;
          weeklyMissionsBadge.textContent = remaining + '/3';
          weeklyMissionsBadge.style.background = '#ef4444';
        }
      }

      function renderWeeklyMissionsModal() {
        var data = loadWeeklyMissions();
        weeklyCardsList.innerHTML = '';

        data.missions.forEach(function (m) {
          var isDone = (m.progress >= m.target);
          var card = document.createElement('div');
          card.className = 'mission-card' + (isDone ? ' completed' : '');

          var pct = Math.min(100, Math.round((m.progress / m.target) * 100));

          var actionHtml = '';
          if (m.claimed) {
            actionHtml = '<button class="btn-claim-mission claimed" type="button" disabled>✓ ¡Reclamada! (+' + m.reward + ' 🪙)</button>';
          } else if (isDone) {
            actionHtml = '<button class="btn-claim-mission" type="button" data-claim-id="' + m.id + '">🎁 ¡Reclamar +' + m.reward + ' monedas!</button>';
          } else {
            actionHtml = '<div style="font-size: 0.8rem; font-weight: 800; color: var(--muted); text-align: center;">En progreso (' + m.progress + '/' + m.target + ')...</div>';
          }

          card.innerHTML =
            '<div class="mission-head-row">' +
              '<div class="mission-title-wrap">' +
                '<span class="mission-icon">' + m.icon + '</span>' +
                '<span class="mission-title-text">' + m.title + '</span>' +
              '</div>' +
              '<span class="mission-reward-badge">+' + m.reward + ' 🪙</span>' +
            '</div>' +
            '<p class="mission-desc">' + m.desc + '</p>' +
            '<div class="mission-progress-wrap">' +
              '<div class="mission-progress-track">' +
                '<div class="mission-progress-fill" style="width: ' + pct + '%;"></div>' +
              '</div>' +
              '<span class="mission-progress-text">' + m.progress + ' / ' + m.target + '</span>' +
            '</div>' +
            actionHtml;

          var claimBtn = card.querySelector('button[data-claim-id]');
          if (claimBtn) {
            claimBtn.addEventListener('click', function () {
              m.claimed = true;
              petState.coins = (petState.coins || 0) + m.reward;
              savePetStorage();
              updatePetWidget();
              saveWeeklyMissions(data);
              makeAudio();
              playCashRegisterSound();
              confetti();
              renderWeeklyMissionsModal();
              showPetSpeech('¡Excelente! Reclamaste +' + m.reward + ' monedas de ritmo 🪙', 3500);
            });
          }

          weeklyCardsList.appendChild(card);
        });
      }

      if (weeklyMissionsTrigger) {
        weeklyMissionsTrigger.addEventListener('click', function () {
          renderWeeklyMissionsModal();
          weeklyMissionsModal.style.display = 'flex';
        });
      }
      if (weeklyModalCloseBtn) {
        weeklyModalCloseBtn.addEventListener('click', function () {
          weeklyMissionsModal.style.display = 'none';
        });
      }
      if (weeklyShareWhatsappBtn) {
        weeklyShareWhatsappBtn.addEventListener('click', function () {
          var data = loadWeeklyMissions();
          var completedCount = data.missions.filter(function (m) { return m.progress >= m.target; }).length;
          var text = '🎯 ¡He completado ' + completedCount + '/3 misiones semanales en Completa el compás!\n' +
            '🪙 Monedas acumuladas: ' + (petState.coins || 0) + ' monedas de ritmo.\n' +
            '¡Ven a jugar matemática y música!';
          shareToWhatsApp(text);
        });
      }
      updateWeeklyBadge();

      var duoState = {
        submode: 'coop',
        coop: {
          turn: 1, // 1: J1, 2: J2
          rolesSwapped: false, // false: J1 constructor / J2 verificador, true: J2 constructor / J1 verificador
          placements: [],
          p1Selected: 'quarter',
          p2Selected: 'quarter',
          p1PetIdx: 0,
          p2PetIdx: 1,
          missionIdx: 0,
          nextId: 1,
          errors: 0,
          isVerifying: false,
          missions: [
            { title: '¡Construyan juntos 1 compás entero (4/4)!', desc: 'El Constructor coloca los sumandos de fracciones en el círculo y el Verificador los comprueba al ritmo del metrónomo. ¡Meta exacta: 8/8!', target: 8 },
            { title: '¡Suma en equipo: 3 octavos + 5 octavos!', desc: 'Coloquen 3/8 y 5/8 para cerrar exactamente el círculo rítmico (8/8).', target: 8 },
            { title: '¡Medio compás exacto (1/2 + 1/2)!', desc: 'Coloquen dos medios (1/2 + 1/2 = 4/8 + 4/8) para crear 1 entero sonoro.', target: 8 },
            { title: '¡Tres partes rítmicas: 1/4 + 1/4 + 1/2!', desc: 'Combinen cuartos y medios hasta llenar exactamente la rueda (8/8).', target: 8 },
            { title: '¡Cadencia de 6 octavos (3/4 de compás)!', desc: 'Llenen juntos 6/8 de compás con fracciones variadas.', target: 6 },
            { title: '¡Ritmo dinámico: corcheas y negras!', desc: 'Combinen 4 corcheas (1/8 c/u) y 2 negras (1/4 c/u) para cerrar el compás.', target: 8 }
          ]
        },
        duel: {
          mode: 'pvp', // 'pvp' o 'cpu'
          difficulty: 'easy', // 'easy', 'medium', 'hard'
          inBattle: false,
          p1Pet: 'bumbo',
          p1Acc: (petState && petState.equipped && petState.equipped.bumbo) || 'cap_red',
          p1CardId: 'bumbo_redoble',
          p2Pet: 'clave',
          p2Acc: (petState && petState.equipped && petState.equipped.clave) || 'glasses_neon',
          p2CardId: 'clave_eco',
          round: 1,
          p1Score: 0,
          p2Score: 0,
          p1Hp: 100,
          p2Hp: 100,
          turn: 1, // 1 para J1, 2 para J2 / CPU
          p1Streak: 0,
          p2Streak: 0,
          p1ShieldReady: true,
          p2ShieldReady: true,
          p1RemonteUsed: false,
          p2RemonteUsed: false,
          currentChallenge: null,
          isResolving: false
        }
      };

      if (tabCoop && tabDuel) {
        tabCoop.addEventListener('click', function () {
          duoState.submode = 'coop';
          tabCoop.classList.add('active');
          tabDuel.classList.remove('active');
          duoCoopPane.hidden = false;
          duoDuelPane.hidden = true;
          renderDuoView();
        });
        tabDuel.addEventListener('click', function () {
          duoState.submode = 'duel';
          tabDuel.classList.add('active');
          tabCoop.classList.remove('active');
          duoCoopPane.hidden = true;
          duoDuelPane.hidden = false;
          renderDuoView();
        });
      }

      function renderDuoView() {
        if (duoState.submode === 'coop') {
          renderCoopPane();
        } else {
          renderDuelPane();
        }
      }

      function renderCoopPane() {
        var c = duoState.coop;
        var mission = c.missions[c.missionIdx % c.missions.length];
        coopMissionTitle.textContent = mission.title;
        coopMissionDesc.textContent = mission.desc;

        // Identificación dinámica de roles (soporta J1 Constructor / J2 Verificador o viceversa)
        var constrPlayer = c.rolesSwapped ? 2 : 1;
        var verifPlayer = c.rolesSwapped ? 1 : 2;

        // Mascotas y accesorios equipados
        var p1Pet = PET_OPTIONS[c.p1PetIdx];
        var p2Pet = PET_OPTIONS[c.p2PetIdx];
        var p1Acc = (petState && petState.equipped && petState.equipped[p1Pet]) || null;
        var p2Acc = (petState && petState.equipped && petState.equipped[p2Pet]) || null;
        coopP1Avatar.innerHTML = getPetSvg(p1Pet, 2, 40, p1Acc);
        coopP2Avatar.innerHTML = getPetSvg(p2Pet, 2, 40, p2Acc);

        // Indicador de roles y turnos
        if (rolePillConstructor) {
          rolePillConstructor.textContent = '🔨 J' + constrPlayer + ': Constructor (Pone los sumandos)';
          rolePillConstructor.classList.toggle('active', c.turn === constrPlayer);
        }
        if (rolePillVerifier) {
          rolePillVerifier.textContent = '🥁 J' + verifPlayer + ': Verificador al ritmo (Metrónomo)';
          rolePillVerifier.classList.toggle('active', c.turn === verifPlayer);
        }

        if (c.turn === constrPlayer) {
          if (constrPlayer === 1) {
            coopP1Card.classList.add('active-turn');
            coopP2Card.classList.remove('active-turn');
            coopP1TurnIndicator.textContent = '👉 Tu turno de colocar sumandos';
            coopP2TurnIndicator.textContent = 'Esperando a que J1 coloque...';
          } else {
            coopP2Card.classList.add('active-turn');
            coopP1Card.classList.remove('active-turn');
            coopP2TurnIndicator.textContent = '👉 Tu turno de colocar sumandos';
            coopP1TurnIndicator.textContent = 'Esperando a que J2 coloque...';
          }
        } else {
          if (verifPlayer === 2) {
            coopP1Card.classList.remove('active-turn');
            coopP2Card.classList.add('active-turn');
            coopP1TurnIndicator.textContent = 'Esperando a que J2 verifique...';
            coopP2TurnIndicator.textContent = '👉 ¡Toca "Verificar al ritmo" abajo!';
          } else {
            coopP2Card.classList.remove('active-turn');
            coopP1Card.classList.add('active-turn');
            coopP2TurnIndicator.textContent = 'Esperando a que J1 verifique...';
            coopP1TurnIndicator.textContent = '👉 ¡Toca "Verificar al ritmo" abajo!';
          }
        }

        if (coopVerifyBtn) {
          coopVerifyBtn.textContent = '🥁 ¡Verificar al ritmo! (Turno de J' + verifPlayer + ')';
        }

        // Bandejas de bloques para J1 (Constructor)
        var blockKeys = ['whole', 'half', 'quarter', 'eighth'];
        coopP1Tray.innerHTML = '';
        blockKeys.forEach(function (key) {
          var type = TYPES[key];
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'rhythm-block ' + type.className + (c.p1Selected === key ? ' selected' : '');
          btn.innerHTML = '<span class="fraction">' + type.fraction + '</span>';
          btn.addEventListener('click', function () {
            c.p1Selected = key;
            c.turn = 1;
            renderCoopPane();
          });
          coopP1Tray.appendChild(btn);
        });

        // Bandejas de bloques para J2
        coopP2Tray.innerHTML = '';
        blockKeys.forEach(function (key) {
          var type = TYPES[key];
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'rhythm-block ' + type.className + (c.p2Selected === key ? ' selected' : '');
          btn.innerHTML = '<span class="fraction">' + type.fraction + '</span>';
          btn.addEventListener('click', function () {
            c.p2Selected = key;
            c.turn = 2;
            renderCoopPane();
          });
          coopP2Tray.appendChild(btn);
        });

        // Rueda cooperativa
        coopWheel.setAttribute('viewBox', '0 0 240 240');
        coopWheel.innerHTML = '';

        var totalUnits = 0;
        c.placements.forEach(function (p) {
          totalUnits += p.span;
        });

        coopTotal.textContent = totalUnits + '/8';

        // Ranuras vacías
        for (var u = 0; u < 8; u++) {
          (function (start) {
            var slot = svgEl('path', { d: wedgePath(start, 1, 42, 105), class: 'wheel-slot', role: 'button', tabindex: '0', 'aria-label': 'Trozo ' + (start + 1) });
            slot.addEventListener('click', function (e) {
              e.stopPropagation();
              onCoopSlotClick(start);
            });
            coopWheel.appendChild(slot);
          }(u));
        }

        // Fichas colocadas
        c.placements.forEach(function (p) {
          var type = TYPES[p.type];
          var playerClass = p.player === 1 ? 'coop-p1-fill' : 'coop-p2-fill';
          var fill = svgEl('path', { d: wedgePath(p.start, p.span, 42, 105), class: 'wheel-fill ' + type.className + ' ' + playerClass });
          fill.style.stroke = p.player === 1 ? '#0ea5e9' : '#f97316';
          fill.style.strokeWidth = '3px';
          coopWheel.appendChild(fill);

          var mid = polar(76, (p.start + p.span / 2) * 45);
          var label = svgEl('text', { x: mid.x, y: mid.y, class: 'wheel-label' });
          label.textContent = (p.player === 1 ? 'J1 ' : 'J2 ') + type.fraction;
          coopWheel.appendChild(label);
        });

        // Estado del feedback
        if (totalUnits === mission.target) {
          coopFeedback.className = 'coop-feedback-box good';
          coopFeedback.textContent = '🎉 ¡El compás suma ' + totalUnits + '/8! J' + verifPlayer + ': Pulsa "Verificar al ritmo" para escuchar y abrir el cofre.';
        } else if (totalUnits > mission.target) {
          coopFeedback.className = 'coop-feedback-box';
          var excess = totalUnits - mission.target;
          var excessName = excess === 1 ? '1/8 (corchea)' : (excess === 2 ? '2/8 = 1/4 (negra)' : (excess === 4 ? '4/8 = 1/2 (blanca)' : excess + '/8'));
          coopFeedback.textContent = '¡Cuidado! Se pasaron por ' + excessName + ' (' + totalUnits + '/8 de ' + mission.target + '/8). Pulsen Limpiar para ajustar.';
        } else {
          coopFeedback.className = 'coop-feedback-box';
          var missing = mission.target - totalUnits;
          var missingName = missing === 1 ? '1/8 (corchea)' : (missing === 2 ? '2/8 = 1/4 (negra)' : (missing === 4 ? '4/8 = 1/2 (blanca)' : missing + '/8'));
          coopFeedback.textContent = 'Llevan ' + totalUnits + '/8. ¡Faltan ' + missingName + ' para la meta (' + mission.target + '/8)!';
        }
      }

      function onCoopSlotClick(start) {
        var c = duoState.coop;
        if (c.isVerifying) return;

        var selectedKey = c.turn === 1 ? c.p1Selected : c.p2Selected;
        var type = TYPES[selectedKey];
        var span = type.units;
        if (span === 8) start = 0;

        if (start + span > 8) {
          c.errors = (c.errors || 0) + 1;
          makeAudio();
          errorSound((audio ? audio.currentTime : 0) + 0.05);
          coopFeedback.textContent = 'Ese bloque se sale del compás. Elige una fracción más pequeña o un hueco libre.';
          return;
        }

        // Verificar solapamiento
        var occupied = new Array(8).fill(false);
        c.placements.forEach(function (p) {
          for (var i = p.start; i < p.start + p.span; i++) occupied[i] = true;
        });

        for (var s = start; s < start + span; s++) {
          if (occupied[s]) {
            c.errors = (c.errors || 0) + 1;
            makeAudio();
            errorSound((audio ? audio.currentTime : 0) + 0.05);
            coopFeedback.textContent = 'Ese hueco ya está ocupado. Toca una zona libre del compás.';
            return;
          }
        }

        makeAudio();
        var ctx = makeAudio();
        if (ctx) {
          if (c.turn === 1) playMarimba(ctx.currentTime + 0.02, 261.63 + start * 32, 0.5, 0.75);
          else playXylophone(ctx.currentTime + 0.02, 523.25 + start * 40, 0.45, 0.75);
        }

        c.placements.push({
          id: c.nextId++,
          player: c.turn,
          type: selectedKey,
          start: start,
          span: span
        });

        // Cambiar turno entre constructor y verificador
        c.turn = (c.turn === 1 ? 2 : 1);
        renderCoopPane();
      }

      // Verificación rítmica por parte del Verificador (Reto en equipo)
      function verifyCoopMeasure() {
        var c = duoState.coop;
        if (c.isVerifying) return;
        c.isVerifying = true;

        if (coopVerifyBtn) coopVerifyBtn.classList.add('verifying');
        coopFeedback.textContent = '🎵 Verificando el compás al ritmo del metrónomo...';

        var totalUnits = 0;
        c.placements.forEach(function (p) { totalUnits += p.span; });
        var mission = c.missions[c.missionIdx % c.missions.length];

        // Reproducir rítmicamente el compás con metrónomo
        var ctx = makeAudio();
        if (ctx) {
          var now = ctx.currentTime + 0.08;
          var sorted = c.placements.slice().sort(function (a, b) { return a.start - b.start; });

          // Pulsos del compás (metrónomo)
          for (var b = 0; b < 8; b++) {
            playPercussion((b % 2 === 0 ? 'woodblock' : 'shaker'), now + b * 0.28, 0.4);
          }

          sorted.forEach(function (p) {
            var at = now + p.start * 0.28;
            if (p.player === 1) playMarimba(at, 261.63 + p.start * 28, 0.45, 0.8);
            else playXylophone(at, 523.25 + p.start * 35, 0.4, 0.8);
          });
        }

        var durationMs = (Math.max(8, totalUnits) * 280) + 400;

        setTimeout(function () {
          c.isVerifying = false;
          if (coopVerifyBtn) coopVerifyBtn.classList.remove('verifying');

          var constrPlayer = c.rolesSwapped ? 2 : 1;
          var verifPlayer = c.rolesSwapped ? 1 : 2;

          if (totalUnits === mission.target) {
            if ((c.errors || 0) === 0) {
              // --- SIN FALLOS = COFRE DE 40 MONEDAS ---
              fanfareSound();
              playCoinSound();
              confetti();

              petState.coins = (petState.coins || 0) + 40;
              petState.xp += 30;
              savePetStorage();
              updatePetWidget();

              // Registrar misión semanal de equipo
              updateWeeklyMissionProgress('m3_coop_chest', 1);

              coopChestDesc.textContent = '¡Increíble trabajo en equipo! J' + constrPlayer + ' colocó los sumandos exactos y J' + verifPlayer + ' los verificó al ritmo sin cometer ningún fallo. ¡Recompensa de 40 monedas ganada!';
              coopChestModal.style.display = 'flex';
            } else {
              // Completado con fallos previos: premio de aliento
              chime((audio ? audio.currentTime : 0) + 0.05);
              confetti();
              petState.coins = (petState.coins || 0) + 15;
              savePetStorage();
              updatePetWidget();

              coopFeedback.className = 'coop-feedback-box good';
              coopFeedback.textContent = '🎉 ¡Compás corregido con éxito! Ganaron +15 monedas 🪙. ¡Intenten el siguiente reto sin fallos para abrir el Cofre de 40 monedas!';
            }
          } else if (totalUnits < mission.target) {
            c.errors = (c.errors || 0) + 1;
            errorSound((audio ? audio.currentTime : 0) + 0.05);
            coopFeedback.className = 'coop-feedback-box';
            var missing = mission.target - totalUnits;
            var missingName = missing === 1 ? '1/8 (corchea)' : (missing === 2 ? '2/8 = 1/4 (negra)' : (missing === 4 ? '4/8 = 1/2 (blanca)' : missing + '/8'));
            coopFeedback.textContent = '¡Casi! Tienen ' + totalUnits + '/' + mission.target + '. Falta ' + missingName + ' para completar el círculo rítmico. J' + constrPlayer + ', coloca más sumandos.';
            c.turn = constrPlayer;
            renderCoopPane();
          } else {
            c.errors = (c.errors || 0) + 1;
            errorSound((audio ? audio.currentTime : 0) + 0.05);
            coopFeedback.className = 'coop-feedback-box';
            var excess = totalUnits - mission.target;
            var excessName = excess === 1 ? '1/8 (corchea)' : (excess === 2 ? '2/8 = 1/4 (negra)' : (excess === 4 ? '4/8 = 1/2 (blanca)' : excess + '/8'));
            coopFeedback.textContent = '¡Cuidado! Se pasaron por ' + excessName + ' (' + totalUnits + '/' + mission.target + '). Pulsen Limpiar para ajustar.';
            c.turn = constrPlayer;
            renderCoopPane();
          }
        }, durationMs);
      }

      if (coopVerifyBtn) {
        coopVerifyBtn.addEventListener('click', verifyCoopMeasure);
      }

      if (coopSwapRolesBtn) {
        coopSwapRolesBtn.addEventListener('click', function () {
          var c = duoState.coop;
          c.rolesSwapped = !c.rolesSwapped;
          var newConstr = c.rolesSwapped ? 2 : 1;
          c.turn = newConstr;
          makeAudio();
          chime((audio ? audio.currentTime : 0) + 0.05);
          renderCoopPane();
        });
      }

      if (coopChestCloseBtn) {
        coopChestCloseBtn.addEventListener('click', function () {
          coopChestModal.style.display = 'none';
          duoState.coop.missionIdx++;
          duoState.coop.placements = [];
          duoState.coop.turn = duoState.coop.rolesSwapped ? 2 : 1;
          duoState.coop.errors = 0;
          renderCoopPane();
        });
      }

      if (coopChestShareBtn) {
        coopChestShareBtn.addEventListener('click', function () {
          var text = '🤝 ¡Acabamos de completar un compás 4/4 en equipo sin fallos en Completa el compás y abrimos el cofre de 40 monedas de ritmo! 🪙🎁🎶 ¡Ven a jugar con nosotros!';
          shareToWhatsApp(text);
        });
      }

      if (coopP1PetBtn) {
        coopP1PetBtn.addEventListener('click', function () {
          duoState.coop.p1PetIdx = (duoState.coop.p1PetIdx + 1) % PET_OPTIONS.length;
          playPetSignature(PET_OPTIONS[duoState.coop.p1PetIdx]);
          renderCoopPane();
        });
      }
      if (coopP2PetBtn) {
        coopP2PetBtn.addEventListener('click', function () {
          duoState.coop.p2PetIdx = (duoState.coop.p2PetIdx + 1) % PET_OPTIONS.length;
          playPetSignature(PET_OPTIONS[duoState.coop.p2PetIdx]);
          renderCoopPane();
        });
      }
      if (coopClearBtn) {
        coopClearBtn.addEventListener('click', function () {
          duoState.coop.placements = [];
          renderCoopPane();
        });
      }
      if (coopNewMissionBtn) {
        coopNewMissionBtn.addEventListener('click', function () {
          duoState.coop.missionIdx++;
          duoState.coop.placements = [];
          duoState.coop.turn = duoState.coop.rolesSwapped ? 2 : 1;
          duoState.coop.errors = 0;
          renderCoopPane();
        });
      }
      if (coopPlayBtn) {
        coopPlayBtn.addEventListener('click', function () {
          var c = duoState.coop;
          if (!c.placements.length) return;
          var ctx = makeAudio();
          if (!ctx) return;
          var now = ctx.currentTime + 0.05;
          var sorted = c.placements.slice().sort(function (a, b) { return a.start - b.start; });
          sorted.forEach(function (p) {
            var at = now + p.start * 0.28;
            if (p.player === 1) playMarimba(at, 261.63 + p.start * 28, 0.45, 0.75);
            else playXylophone(at, 523.25 + p.start * 35, 0.4, 0.75);
          });
        });
      }

      /* =========================================================
         MÓDULO F — LÓGICA DE DUELOS (COMPETIR)
         ========================================================= */

      // Helper para obtener datos de una carta Yu-Gi-Oh
      function getYugiCard(cardId) {
        var all = [].concat(YUGI_CARDS.bumbo, YUGI_CARDS.clave, YUGI_CARDS.guira);
        for (var i = 0; i < all.length; i++) {
          if (all[i].id === cardId) return all[i];
        }
        return YUGI_CARDS.bumbo[0];
      }

      // Generador de retos de cálculo rítmico según niveles desbloqueados
      function generateDuelChallenge(unlockedLevel) {
        unlockedLevel = unlockedLevel || (petState && petState.unlockedLevel) || 1;
        var pool = [];

        // Reto 1: Fracción básica para completar 1/2 compás (4/8)
        pool.push({
          tag: 'Fracción de Compás',
          question: '¿Cuántos octavos (corcheas) forman 1/2 compás?',
          sub: '1/2 compás = ___ octavos (1/8)',
          correct: '4 octavos',
          options: ['4 octavos', '2 octavos', '6 octavos', '8 octavos'],
          formula: '1/2 = 4/8'
        });

        // Reto 2: Completar compás de 4/4 (8 octavos)
        pool.push({
          tag: 'Completar el Compás',
          question: 'Tienes 1/2 (4/8) y 1/4 (2/8). ¿Cuánto falta para 8/8?',
          sub: '4/8 + 2/8 = 6/8. ¡Faltan para cerrar el círculo!',
          correct: '2 octavos (1 negra)',
          options: ['2 octavos (1 negra)', '1 octavo (1 corchea)', '3 octavos', '4 octavos'],
          formula: '4/8 + 2/8 + 2/8 = 8/8'
        });

        // Reto 3: Suma rítmica de dos negras
        pool.push({
          tag: 'Suma de Tiempos',
          question: '¿A cuántos octavos equivalen 2 negras (1/4 + 1/4)?',
          sub: 'Cada negra vale 2 octavos.',
          correct: '4 octavos',
          options: ['4 octavos', '2 octavos', '3 octavos', '5 octavos'],
          formula: '2/8 + 2/8 = 4/8'
        });

        // Reto 4: Equivalencia de corcheas en 1 negra
        pool.push({
          tag: 'Equivalencia Rítmica',
          question: '¿Cuántas corcheas (1/8) entran en una negra (1/4)?',
          sub: 'Divide 1/4 entre 1/8.',
          correct: '2 corcheas',
          options: ['2 corcheas', '1 corchea', '4 corcheas', '3 corcheas'],
          formula: '1/4 = 2/8'
        });

        // Reto 5: Resta silenciosa
        pool.push({
          tag: 'Resta con Silencios',
          question: 'Compás de 8/8: hay 1 silencio de blanca (4/8). ¿Cuánto espacio sonoro queda?',
          sub: '8 octavos − 4 octavos de silencio =',
          correct: '4 octavos',
          options: ['4 octavos', '2 octavos', '5 octavos', '6 octavos'],
          formula: '8/8 − 4/8 = 4/8'
        });

        if (unlockedLevel >= 4) {
          pool.push({
            tag: 'Suma Mixta',
            question: 'Suma: 1 negra (2/8) + 1 corchea (1/8) + 1 corchea (1/8) =',
            sub: '2 octavos + 1 octavo + 1 octavo =',
            correct: '4 octavos (1/2)',
            options: ['4 octavos (1/2)', '3 octavos', '5 octavos', '6 octavos'],
            formula: '2/8 + 1/8 + 1/8 = 4/8'
          });
          pool.push({
            tag: 'Completar 4/4',
            question: 'Tienes 5 octavos en el círculo. ¿Cuánto falta para 8/8?',
            sub: '5/8 + ___ = 8/8',
            correct: '3 octavos',
            options: ['3 octavos', '2 octavos', '4 octavos', '1 octavo'],
            formula: '5/8 + 3/8 = 8/8'
          });
        }

        if (unlockedLevel >= 8) {
          pool.push({
            tag: 'Compás de 3/4',
            question: 'Un compás de 3/4 tiene 6 octavos. Si colocas 1 blanca (4/8), ¿cuánto queda?',
            sub: '6 octavos − 4 octavos =',
            correct: '2 octavos',
            options: ['2 octavos', '1 octavo', '3 octavos', '4 octavos'],
            formula: '6/8 − 4/8 = 2/8'
          });
          pool.push({
            tag: 'Cadena Sonora',
            question: 'Calcula: (2 octavos + 3 octavos) − 1 octavo =',
            sub: '5 octavos − 1 octavo =',
            correct: '4 octavos',
            options: ['4 octavos', '3 octavos', '5 octavos', '6 octavos'],
            formula: '5/8 − 1/8 = 4/8'
          });
        }

        if (unlockedLevel >= 12) {
          pool.push({
            tag: 'Multiplicación Rítmica',
            question: '3 golpes de negra (cada una vale 2 octavos): ¿cuántos octavos suman?',
            sub: '3 veces 2 octavos =',
            correct: '6 octavos',
            options: ['6 octavos', '4 octavos', '5 octavos', '8 octavos'],
            formula: '3 × 2/8 = 6/8'
          });
          pool.push({
            tag: 'Reparto Rítmico',
            question: 'Repartes 8 octavos entre 2 compases iguales. ¿Cuántos octavos tocan a cada compás?',
            sub: '8 dividido entre 2 =',
            correct: '4 octavos',
            options: ['4 octavos', '2 octavos', '3 octavos', '6 octavos'],
            formula: '8 ÷ 2 = 4'
          });
          pool.push({
            tag: 'Gran Prueba 4/4',
            question: '¿Cuántas corcheas (1/8) llenan 1 compás entero (4/4)?',
            sub: '8 octavos forman la unidad completa.',
            correct: '8 corcheas',
            options: ['8 corcheas', '4 corcheas', '6 corcheas', '12 corcheas'],
            formula: '8 × 1/8 = 8/8'
          });
        }

        // Selección aleatoria
        var item = pool[Math.floor(Math.random() * pool.length)];

        // Mezclar opciones
        var shuffled = item.options.slice().sort(function () { return Math.random() - 0.5; });
        return {
          tag: item.tag,
          question: item.question,
          sub: item.sub,
          correct: item.correct,
          options: shuffled,
          formula: item.formula
        };
      }

      // Animación de daño flotante
      function showFloatingDuelDamage(parentEl, text, isHeal) {
        if (!parentEl) return;
        var tag = document.createElement('div');
        tag.className = 'duel-floating-dmg' + (isHeal ? ' heal' : '');
        tag.textContent = text;
        parentEl.appendChild(tag);
        setTimeout(function () {
          if (tag.parentNode) tag.parentNode.removeChild(tag);
        }, 1200);
      }

      // Renderizador principal del panel de Duelo
      function renderDuelPane() {
        var d = duoState.duel;

        if (!d.inBattle) {
          // --- MODO LOBBY / PREPARACIÓN ---
          duelLobbyView.style.display = 'block';
          duelArenaView.style.display = 'none';

          // Actualizar botones de modo (2P vs CPU)
          duelModePvp.classList.toggle('active', d.mode === 'pvp');
          duelModeCpu.classList.toggle('active', d.mode === 'cpu');
          duelDiffBar.style.display = (d.mode === 'cpu') ? 'flex' : 'none';

          // Actualizar botones de dificultad
          var diffBtns = duelDiffBar.querySelectorAll('.duel-diff-btn');
          diffBtns.forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-diff') === d.difficulty);
          });

          // Textos J2 vs CPU
          if (d.mode === 'cpu') {
            lobbyP2Name.textContent = '🤖 Máquina (CPU)';
            var diffLabel = d.difficulty === 'easy' ? '🟢 Aprendiz' : (d.difficulty === 'medium' ? '🟡 Músico' : '🔴 Maestro');
            lobbyP2RoleText.textContent = 'Dificultad: ' + diffLabel;
          } else {
            lobbyP2Name.textContent = 'Jugador 2 🟧';
            lobbyP2RoleText.textContent = 'Segundo turno';
          }

          // Avatares lobby
          lobbyP1Avatar.innerHTML = getPetSvg(d.p1Pet, 2, 48, d.p1Acc);
          lobbyP2Avatar.innerHTML = getPetSvg(d.p2Pet, 2, 48, d.p2Acc);

          // Selectores de mascota J1
          var p1PetBtns = lobbyP1PetPickers.querySelectorAll('.duel-pet-pick-btn');
          p1PetBtns.forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-pet') === d.p1Pet);
          });

          // Selectores de mascota J2
          var p2PetBtns = lobbyP2PetPickers.querySelectorAll('.duel-pet-pick-btn');
          p2PetBtns.forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-pet') === d.p2Pet);
          });

          // Sincronizar selectores de accesorios
          lobbyP1AccSelect.value = d.p1Acc || '';
          lobbyP2AccSelect.value = d.p2Acc || '';

          // Renderizar cartas Yu-Gi-Oh para J1
          renderLobbyCardsRow(lobbyP1CardsRow, d.p1Pet, d.p1CardId, function (selectedId) {
            d.p1CardId = selectedId;
            renderDuelPane();
          });

          // Renderizar cartas Yu-Gi-Oh para J2 / CPU
          renderLobbyCardsRow(lobbyP2CardsRow, d.p2Pet, d.p2CardId, function (selectedId) {
            d.p2CardId = selectedId;
            renderDuelPane();
          });

        } else {
          // --- MODO ARENA DE COMBATE ---
          duelLobbyView.style.display = 'none';
          duelArenaView.style.display = 'block';

          // Ronda actual
          duelArenaRoundText.textContent = 'Ronda ' + d.round + ' / 3';

          // Avatares de combate
          arenaP1Avatar.innerHTML = getPetSvg(d.p1Pet, 2, 72, d.p1Acc);
          arenaP2Avatar.innerHTML = getPetSvg(d.p2Pet, 2, 72, d.p2Acc);

          // Nombres
          arenaP1Name.textContent = 'J1 · ' + (PETS[d.p1Pet] ? PETS[d.p1Pet].name : 'Bumbo');
          if (d.mode === 'cpu') {
            arenaP2Name.textContent = '🤖 CPU · ' + (PETS[d.p2Pet] ? PETS[d.p2Pet].name : 'Clave');
          } else {
            arenaP2Name.textContent = 'J2 · ' + (PETS[d.p2Pet] ? PETS[d.p2Pet].name : 'Clave');
          }

          // Estrellas de victoria por rondas
          var p1StarsHtml = '';
          for (var s1 = 0; s1 < d.p1Score; s1++) p1StarsHtml += '⭐';
          for (var s1e = d.p1Score; s1e < 2; s1e++) p1StarsHtml += '⭕';
          arenaP1Stars.innerHTML = p1StarsHtml;

          var p2StarsHtml = '';
          for (var s2 = 0; s2 < d.p2Score; s2++) p2StarsHtml += '⭐';
          for (var s2e = d.p2Score; s2e < 2; s2e++) p2StarsHtml += '⭕';
          arenaP2Stars.innerHTML = p2StarsHtml;

          // Barras de vida HP (100 HP)
          arenaP1HpText.textContent = Math.max(0, d.p1Hp) + '/100';
          arenaP2HpText.textContent = Math.max(0, d.p2Hp) + '/100';

          arenaP1HpFill.style.width = Math.max(0, Math.min(100, d.p1Hp)) + '%';
          arenaP2HpFill.style.width = Math.max(0, Math.min(100, d.p2Hp)) + '%';

          arenaP1HpFill.className = 'duel-hp-fill' + (d.p1Hp <= 25 ? ' low' : (d.p1Hp <= 50 ? ' mid' : ''));
          arenaP2HpFill.className = 'duel-hp-fill' + (d.p2Hp <= 25 ? ' low' : (d.p2Hp <= 50 ? ' mid' : ''));

          // Miniatura de Carta Yu-Gi-Oh activa
          var card1 = getYugiCard(d.p1CardId);
          arenaP1CardIcon.textContent = card1.icon;
          arenaP1CardName.textContent = card1.name;

          var card2 = getYugiCard(d.p2CardId);
          arenaP2CardIcon.textContent = card2.icon;
          arenaP2CardName.textContent = card2.name;

          // Banner de turno
          duelTurnBanner.className = 'duel-turn-banner ' + (d.turn === 1 ? 'p1-turn' : (d.mode === 'cpu' ? 'cpu-turn' : 'p2-turn'));
          if (d.turn === 1) {
            duelTurnIcon.textContent = '👉';
            duelTurnText.textContent = '¡Turno de Jugador 1 (' + (PETS[d.p1Pet].name) + ')! Acierta el reto para atacar.';
          } else {
            if (d.mode === 'cpu') {
              duelTurnIcon.textContent = '🤖';
              duelTurnText.textContent = 'La máquina (' + (PETS[d.p2Pet].name) + ') está pensando... 💭';
            } else {
              duelTurnIcon.textContent = '👉';
              duelTurnText.textContent = '¡Turno de Jugador 2 (' + (PETS[d.p2Pet].name) + ')! Acierta el reto para atacar.';
            }
          }

          // Si no hay reto activo, generar uno nuevo
          if (!d.currentChallenge) {
            d.currentChallenge = generateDuelChallenge((petState && petState.unlockedLevel) || 1);
          }

          // Renderizar reto actual
          renderDuelChallengeBox();

          // Si es turno de la CPU, disparar la IA
          if (d.turn === 2 && d.mode === 'cpu' && !d.isResolving) {
            triggerCpuTurn();
          }
        }
      }

      // Renderiza las 3 tarjetas estilo Yu-Gi-Oh en el lobby
      function renderLobbyCardsRow(containerEl, petId, activeCardId, onSelectCallback) {
        containerEl.innerHTML = '';
        var cards = YUGI_CARDS[petId] || YUGI_CARDS.bumbo;
        cards.forEach(function (c) {
          var isSelected = (c.id === activeCardId);
          var cardDiv = document.createElement('div');
          cardDiv.className = 'duel-card-yugi' + (isSelected ? ' selected' : '');
          cardDiv.innerHTML =
            '<div class="duel-card-header">' +
              '<span class="duel-card-name">' + c.name + '</span>' +
              '<span class="duel-card-badge">' + c.badge + '</span>' +
            '</div>' +
            '<div class="duel-card-body">' +
              '<span class="duel-card-icon">' + c.icon + '</span>' +
              '<span class="duel-card-desc">' + c.desc + '</span>' +
            '</div>' +
            (isSelected ? '<div class="duel-card-status-pill">✓ SELECCIONADA PARA EL DUELO</div>' : '');
          cardDiv.addEventListener('click', function () {
            makeAudio();
            playPercussion('woodblock', (audio ? audio.currentTime : 0) + 0.02, 0.6);
            onSelectCallback(c.id);
          });
          containerEl.appendChild(cardDiv);
        });
      }

      // Renderiza la caja de reto rítmico interactivo
      function renderDuelChallengeBox() {
        var d = duoState.duel;
        var ch = d.currentChallenge;
        if (!ch) return;

        duelChallengeQuestion.textContent = ch.question;
        duelChallengeSub.textContent = ch.sub;

        duelOptionsGrid.innerHTML = '';
        ch.options.forEach(function (optText, idx) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'duel-option-btn';
          btn.textContent = optText;

          // Si es turno de CPU, deshabilitar interacción humana
          if (d.turn === 2 && d.mode === 'cpu') {
            btn.disabled = true;
          } else {
            btn.addEventListener('click', function () {
              executeDuelTurnAction(optText, btn);
            });
          }
          duelOptionsGrid.appendChild(btn);
        });
      }

      // Ejecución de respuesta (humano o CPU)
      function executeDuelTurnAction(chosenAnswer, clickedBtn) {
        var d = duoState.duel;
        if (d.isResolving) return;
        d.isResolving = true;

        var ch = d.currentChallenge;
        var isCorrect = (chosenAnswer === ch.correct);
        var attackerPlayer = d.turn;
        var defenderPlayer = (d.turn === 1 ? 2 : 1);

        var attackerPet = (attackerPlayer === 1 ? d.p1Pet : d.p2Pet);
        var defenderPet = (attackerPlayer === 1 ? d.p2Pet : d.p1Pet);

        var attackerCardId = (attackerPlayer === 1 ? d.p1CardId : d.p2CardId);
        var defenderCardId = (attackerPlayer === 1 ? d.p2CardId : d.p1CardId);

        var attackerAvatarEl = (attackerPlayer === 1 ? arenaP1Avatar : arenaP2Avatar);
        var defenderAvatarEl = (attackerPlayer === 1 ? arenaP2Avatar : arenaP1Avatar);
        var defenderBoxEl = (attackerPlayer === 1 ? arenaP2Box : arenaP1Box);
        var attackerBoxEl = (attackerPlayer === 1 ? arenaP1Box : arenaP2Box);

        makeAudio();
        var ctxTime = (audio ? audio.currentTime : 0) + 0.05;

        // Deshabilitar todos los botones durante la resolución
        var allBtns = duelOptionsGrid.querySelectorAll('.duel-option-btn');
        allBtns.forEach(function (b) { b.disabled = true; });

        if (isCorrect) {
          // --- ACIERTO: LA MASCOTA DEL JUGADOR ATACA ---
          if (clickedBtn) clickedBtn.classList.add('opt-correct');

          // Racha de aciertos
          if (attackerPlayer === 1) d.p1Streak++;
          else d.p2Streak++;
          var streak = (attackerPlayer === 1 ? d.p1Streak : d.p2Streak);

          // Daño base: 25 HP
          var damage = 25;
          var battleMsg = '✨ ¡Acierto! ' + (PETS[attackerPet].name) + ' ataca con ritmo.';

          // 1. Carta Bumbo: Redoble x2 (50 HP tras 2 aciertos seguidos)
          if (attackerCardId === 'bumbo_redoble' && streak >= 2) {
            damage = 50;
            battleMsg = '🥁🥁 ¡REDOBLE X2 ACTIVADO! ¡' + (PETS[attackerPet].name) + ' inflige 50 DE DAÑO!';
          }
          // 2. Carta Bumbo: Golpe de Trueno (+10 daño extra fijo = 35 HP)
          else if (attackerCardId === 'bumbo_trueno') {
            damage = 35;
            battleMsg = '⚡ ¡GOLPE DE TRUENO! Ataque demoledor de 35 de daño.';
          }
          // 3. Carta Clave: Eco Sanador (+15 HP a la mascota atacante)
          else if (attackerCardId === 'clave_eco') {
            var heal = 15;
            if (attackerPlayer === 1) d.p1Hp = Math.min(100, d.p1Hp + heal);
            else d.p2Hp = Math.min(100, d.p2Hp + heal);
            showFloatingDuelDamage(attackerBoxEl, '+15 HP', true);
            battleMsg = '🌿 ¡ECO SANADOR! ' + (PETS[attackerPet].name) + ' golpea y recupera +15 HP.';
          }
          // 4. Carta Clave: Síncopa Sorpresa (38 de daño directo)
          else if (attackerCardId === 'clave_sincopa') {
            damage = 38;
            battleMsg = '💥 ¡SÍNCOPA SORPRESA! Impacto rítmico imprevisto de 38 de daño.';
          }
          // 5. Carta Güira: Raspe Crítico (35% probabilidad de 45 daño)
          else if (attackerCardId === 'guira_raspe') {
            if (Math.random() < 0.35) {
              damage = 45;
              battleMsg = '✨ ¡RASPE CRÍTICO! ¡Golpe demoledor de 45 de daño!';
            }
          }
          // 6. Carta Güira: Metrónomo Dorado (+5 monedas inmediatas y +6 daño = 31 HP)
          else if (attackerCardId === 'guira_metronomo') {
            damage = 31;
            petState.coins = (petState.coins || 0) + 5;
            savePetStorage();
            updatePetWidget();
            playCoinSound();
            battleMsg = '🪙 ¡METRÓNOMO DORADO! +5 monedas de ritmo y 31 de daño.';
          }

          // Sonido de ataque y firma de mascota
          playPetSignature(attackerPet);
          playPercussion('kick', ctxTime + 0.1, 0.85);

          // Animación de embestida atacante
          var attackClass = (attackerPlayer === 1 ? 'combat-attacking-p1' : 'combat-attacking-p2');
          attackerAvatarEl.classList.add(attackClass);
          setTimeout(function () { attackerAvatarEl.classList.remove(attackClass); }, 450);

          // Animación y daño al defensor
          setTimeout(function () {
            defenderAvatarEl.classList.add('combat-hit');
            setTimeout(function () { defenderAvatarEl.classList.remove('combat-hit'); }, 500);

            showFloatingDuelDamage(defenderBoxEl, '-' + damage + ' HP', false);

            if (defenderPlayer === 1) d.p1Hp -= damage;
            else d.p2Hp -= damage;

            // Carta Güira del defensor: Ráfaga de Remonte (Cura 25 HP si cae a <= 35)
            var defHp = (defenderPlayer === 1 ? d.p1Hp : d.p2Hp);
            var remonteUsed = (defenderPlayer === 1 ? d.p1RemonteUsed : d.p2RemonteUsed);
            if (defenderCardId === 'guira_rafaga' && defHp > 0 && defHp <= 35 && !remonteUsed) {
              if (defenderPlayer === 1) { d.p1Hp = Math.min(100, d.p1Hp + 25); d.p1RemonteUsed = true; }
              else { d.p2Hp = Math.min(100, d.p2Hp + 25); d.p2RemonteUsed = true; }
              showFloatingDuelDamage(defenderBoxEl, '+25 HP', true);
              battleMsg += ' | 🌪️ ¡Ráfaga de Remonte salvavidas activada!';
            }

            duelBattleLog.textContent = battleMsg;
            renderDuelPane();

            // Verificar si el defensor quedó derrotado (0 HP)
            var finalDefHp = (defenderPlayer === 1 ? d.p1Hp : d.p2Hp);
            if (finalDefHp <= 0) {
              handleDuelRoundVictory(attackerPlayer);
            } else {
              // Siguiente turno
              setTimeout(function () {
                d.turn = (d.turn === 1 ? 2 : 1);
                d.currentChallenge = null;
                d.isResolving = false;
                renderDuelPane();
              }, 1200);
            }
          }, 300);

        } else {
          // --- FALLO: TE ATACAN (CONTRAATAQUE RIVAL) ---
          if (clickedBtn) clickedBtn.classList.add('opt-wrong');
          errorSound(ctxTime);

          // Reset de racha
          if (attackerPlayer === 1) d.p1Streak = 0;
          else d.p2Streak = 0;

          var counterDamage = 20;
          var counterMsg = '💥 ¡Fallo! ' + (PETS[defenderPet].name) + ' aprovecha y contraataca.';

          // Revisar cartas defensivas del atacante que cometió el fallo
          if (attackerCardId === 'bumbo_escudo') {
            var shieldReady = (attackerPlayer === 1 ? d.p1ShieldReady : d.p2ShieldReady);
            if (shieldReady) {
              counterDamage = 0;
              if (attackerPlayer === 1) d.p1ShieldReady = false;
              else d.p2ShieldReady = false;
              counterMsg = '🛡️ ¡ESCUDO DE BOMBO! Bloqueó el 100% del contraataque.';
            }
          } else if (attackerCardId === 'clave_caoba') {
            counterDamage = 10;
            counterMsg = '🪵 ¡PARED DE CAOBA! Daño de contraataque reducido a la mitad (10 HP).';
          }

          duelBattleLog.textContent = counterMsg;

          setTimeout(function () {
            if (counterDamage > 0) {
              attackerAvatarEl.classList.add('combat-hit');
              setTimeout(function () { attackerAvatarEl.classList.remove('combat-hit'); }, 500);
              showFloatingDuelDamage(attackerBoxEl, '-' + counterDamage + ' HP', false);

              if (attackerPlayer === 1) d.p1Hp -= counterDamage;
              else d.p2Hp -= counterDamage;

              // Carta Güira del atacante si cae a <= 35
              var atkHp = (attackerPlayer === 1 ? d.p1Hp : d.p2Hp);
              var remonteUsed = (attackerPlayer === 1 ? d.p1RemonteUsed : d.p2RemonteUsed);
              if (attackerCardId === 'guira_rafaga' && atkHp > 0 && atkHp <= 35 && !remonteUsed) {
                if (attackerPlayer === 1) { d.p1Hp = Math.min(100, d.p1Hp + 25); d.p1RemonteUsed = true; }
                else { d.p2Hp = Math.min(100, d.p2Hp + 25); d.p2RemonteUsed = true; }
                showFloatingDuelDamage(attackerBoxEl, '+25 HP', true);
              }
            }

            renderDuelPane();

            var finalAtkHp = (attackerPlayer === 1 ? d.p1Hp : d.p2Hp);
            if (finalAtkHp <= 0) {
              handleDuelRoundVictory(defenderPlayer);
            } else {
              // Pasar turno
              setTimeout(function () {
                d.turn = (d.turn === 1 ? 2 : 1);
                d.currentChallenge = null;
                d.isResolving = false;
                renderDuelPane();
              }, 1200);
            }
          }, 350);
        }
      }

      // Turno automático de la CPU según dificultad
      function triggerCpuTurn() {
        var d = duoState.duel;
        var diff = d.difficulty || 'easy';
        var delay = (diff === 'easy' ? 2200 : (diff === 'medium' ? 1600 : 1100));

        // Precisión según dificultad
        var accuracy = (diff === 'easy' ? 0.50 : (diff === 'medium' ? 0.72 : 0.90));

        setTimeout(function () {
          if (!d.inBattle || d.turn !== 2) return;
          var ch = d.currentChallenge;
          if (!ch) return;

          var willHit = (Math.random() < accuracy);
          var chosenAnswer = ch.correct;

          if (!willHit) {
            // Elegir una incorrecta
            var wrongOpts = ch.options.filter(function (o) { return o !== ch.correct; });
            chosenAnswer = wrongOpts[Math.floor(Math.random() * wrongOpts.length)] || ch.correct;
          }

          // Encontrar botón visual para iluminarlo
          var allBtns = duelOptionsGrid.querySelectorAll('.duel-option-btn');
          var targetBtn = null;
          allBtns.forEach(function (b) {
            if (b.textContent === chosenAnswer) targetBtn = b;
          });

          executeDuelTurnAction(chosenAnswer, targetBtn);
        }, delay);
      }

      // Victoria de una Ronda (Mejor de 3)
      function handleDuelRoundVictory(winnerPlayer) {
        var d = duoState.duel;
        chime((audio ? audio.currentTime : 0) + 0.05);

        if (winnerPlayer === 1) {
          d.p1Score++;
          duelBattleLog.textContent = '🎉 ¡Jugador 1 gana la Ronda ' + d.round + '!';
        } else {
          d.p2Score++;
          var winnerLabel = (d.mode === 'cpu' ? 'La Máquina (CPU)' : 'Jugador 2');
          duelBattleLog.textContent = '🎉 ¡' + winnerLabel + ' gana la Ronda ' + d.round + '!';
        }

        renderDuelPane();

        // Comprobar si alguien ha alcanzado 2 victorias (mejor de 3)
        if (d.p1Score >= 2 || d.p2Score >= 2) {
          setTimeout(function () {
            handleDuelMatchVictory(winnerPlayer);
          }, 1200);
        } else {
          // Ronda siguiente
          setTimeout(function () {
            d.round++;
            d.p1Hp = 100;
            d.p2Hp = 100;
            d.p1Streak = 0;
            d.p2Streak = 0;
            d.p1ShieldReady = true;
            d.p2ShieldReady = true;
            d.p1RemonteUsed = false;
            d.p2RemonteUsed = false;
            d.turn = (d.round % 2 === 1) ? 1 : 2;
            d.currentChallenge = null;
            d.isResolving = false;
            duelBattleLog.textContent = '⚔️ ¡Comienza la Ronda ' + d.round + '! HP restablecidos a 100.';
            renderDuelPane();
          }, 1600);
        }
      }

      // Victoria Definitiva del Duelo (Ganador 30 monedas, Perdedor 10 monedas)
      function handleDuelMatchVictory(winnerPlayer) {
        var d = duoState.duel;
        fanfareSound();
        confetti();

        var winnerPet = (winnerPlayer === 1 ? d.p1Pet : d.p2Pet);
        var winnerPetName = (PETS[winnerPet] ? PETS[winnerPet].name : 'Mascota');
        var winnerCard = getYugiCard(winnerPlayer === 1 ? d.p1CardId : d.p2CardId);

        var winnerTitle = (winnerPlayer === 1 ? '¡Jugador 1 es el Campeón!' : (d.mode === 'cpu' ? '¡La Máquina ha Ganado!' : '¡Jugador 2 es el Campeón!'));
        duelWinTitle.textContent = '🏆 ' + winnerTitle;
        duelWinSub.textContent = winnerPetName + ' triunfó en el combate al mejor de 3 rondas con su carta ' + winnerCard.name + '.';

        // Reparto oficial de monedas de ritmo según reglas de Módulo F
        var winnerCoins = 30;
        var loserCoins = 10;
        var totalCoinsEarned = (winnerPlayer === 1 ? winnerCoins : loserCoins);

        petState.coins = (petState.coins || 0) + totalCoinsEarned;
        savePetStorage();
        updatePetWidget();

        // Misión semanal: victoria en combate de duelo
        if (winnerPlayer === 1 || d.mode === 'pvp') {
          updateWeeklyMissionProgress('m2_duel_win', 1);
        }

        duelWinRewardWinner.textContent = '🥇 Ganador: +' + winnerCoins + ' monedas 🪙';
        duelWinRewardLoser.textContent = '🥈 Rival: +' + loserCoins + ' monedas 🪙';

        duelWinModal.style.display = 'flex';
      }

      // Listeners de interfaz de Duelo
      if (duelModePvp && duelModeCpu) {
        duelModePvp.addEventListener('click', function () {
          duoState.duel.mode = 'pvp';
          renderDuelPane();
        });
        duelModeCpu.addEventListener('click', function () {
          duoState.duel.mode = 'cpu';
          renderDuelPane();
        });
      }

      if (duelDiffBar) {
        var dBtns = duelDiffBar.querySelectorAll('.duel-diff-btn');
        dBtns.forEach(function (btn) {
          btn.addEventListener('click', function () {
            duoState.duel.difficulty = btn.getAttribute('data-diff');
            renderDuelPane();
          });
        });
      }

      if (lobbyP1PetPickers) {
        var p1PickBtns = lobbyP1PetPickers.querySelectorAll('.duel-pet-pick-btn');
        p1PickBtns.forEach(function (b) {
          b.addEventListener('click', function () {
            var pet = b.getAttribute('data-pet');
            duoState.duel.p1Pet = pet;
            duoState.duel.p1CardId = (YUGI_CARDS[pet] ? YUGI_CARDS[pet][0].id : 'bumbo_redoble');
            playPetSignature(pet);
            renderDuelPane();
          });
        });
      }

      if (lobbyP2PetPickers) {
        var p2PickBtns = lobbyP2PetPickers.querySelectorAll('.duel-pet-pick-btn');
        p2PickBtns.forEach(function (b) {
          b.addEventListener('click', function () {
            var pet = b.getAttribute('data-pet');
            duoState.duel.p2Pet = pet;
            duoState.duel.p2CardId = (YUGI_CARDS[pet] ? YUGI_CARDS[pet][0].id : 'clave_eco');
            playPetSignature(pet);
            renderDuelPane();
          });
        });
      }

      if (lobbyP1AccSelect) {
        lobbyP1AccSelect.addEventListener('change', function () {
          duoState.duel.p1Acc = lobbyP1AccSelect.value;
          renderDuelPane();
        });
      }
      if (lobbyP2AccSelect) {
        lobbyP2AccSelect.addEventListener('change', function () {
          duoState.duel.p2Acc = lobbyP2AccSelect.value;
          renderDuelPane();
        });
      }

      // Botón Iniciar Combate
      if (duelStartBtn) {
        duelStartBtn.addEventListener('click', function () {
          var d = duoState.duel;
          d.inBattle = true;
          d.round = 1;
          d.p1Score = 0;
          d.p2Score = 0;
          d.p1Hp = 100;
          d.p2Hp = 100;
          d.turn = 1;
          d.p1Streak = 0;
          d.p2Streak = 0;
          d.p1ShieldReady = true;
          d.p2ShieldReady = true;
          d.p1RemonteUsed = false;
          d.p2RemonteUsed = false;
          d.currentChallenge = null;
          d.isResolving = false;
          duelWinModal.style.display = 'none';
          duelBattleLog.textContent = '⚔️ ¡Comienza el combate! 100 HP por lado al mejor de 3 rondas.';

          makeAudio();
          fanfareSound();
          renderDuelPane();
        });
      }

      // Botón volver al lobby
      if (duelBackToLobbyBtn) {
        duelBackToLobbyBtn.addEventListener('click', function () {
          duoState.duel.inBattle = false;
          duelWinModal.style.display = 'none';
          renderDuelPane();
        });
      }

      // Botón revancha
      if (duelRematchBtn) {
        duelRematchBtn.addEventListener('click', function () {
          var d = duoState.duel;
          duelWinModal.style.display = 'none';
          d.inBattle = true;
          d.round = 1;
          d.p1Score = 0;
          d.p2Score = 0;
          d.p1Hp = 100;
          d.p2Hp = 100;
          d.turn = 1;
          d.p1Streak = 0;
          d.p2Streak = 0;
          d.p1ShieldReady = true;
          d.p2ShieldReady = true;
          d.p1RemonteUsed = false;
          d.p2RemonteUsed = false;
          d.currentChallenge = null;
          d.isResolving = false;
          duelBattleLog.textContent = '⚔️ ¡Revancha iniciada! ¡A luchar con ritmo!';
          makeAudio();
          renderDuelPane();
        });
      }

      // Botón compartir en WhatsApp el resultado del Duelo
      if (duelShareBtn) {
        duelShareBtn.addEventListener('click', function () {
          var d = duoState.duel;
          var winnerPet = (d.p1Score >= 2 ? d.p1Pet : d.p2Pet);
          var winnerName = (PETS[winnerPet] ? PETS[winnerPet].name : 'Mascota');
          var card = getYugiCard(d.p1Score >= 2 ? d.p1CardId : d.p2CardId);

          var msg = '🥁 ¡He jugado un Duelo de Ritmo en Completa el compás!\n' +
            '🏆 Campeón: ' + winnerName + '\n' +
            '🃏 Carta de poder: ' + card.name + ' (' + card.badge + ')\n' +
            '🪙 ¡Recompensa ganada: +30 monedas de ritmo!\n' +
            '¡Ven a jugar y aprende matemática con ritmo!';

          var url = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(msg);
          window.location.href = url;
        });
      }

      /* =========================================================
         ESTADO Y LÓGICA DEL MINIJUEGO ECO RÍTMICO (SIMON MUSICAL)
         ========================================================= */
      var simonRoundVal = document.getElementById('simonRoundVal');
      var simonNotesVal = document.getElementById('simonNotesVal');
      var simonBestVal = document.getElementById('simonBestVal');
      var simonPetAvatar = document.getElementById('simonPetAvatar');
      var simonCenterState = document.getElementById('simonCenterState');
      var simonPlayBtn = document.getElementById('simonPlayBtn');
      var simonRepeatBtn = document.getElementById('simonRepeatBtn');
      var simonFeedback = document.getElementById('simonFeedback');

      var SIMON_PADS = [
        { id: 0, name: 'Do · Bombo', sound: 'drum', freq: 130, className: 'pad-red' },
        { id: 1, name: 'Mi · Xilófono', sound: 'xylophone', freq: 329.63, className: 'pad-blue' },
        { id: 2, name: 'Sol · Flauta', sound: 'flute', freq: 392.00, className: 'pad-yellow' },
        { id: 3, name: 'Do\' · Marimba', sound: 'marimba', freq: 523.25, className: 'pad-green' }
      ];

      var simonState = {
        sequence: [],
        playerStep: 0,
        round: 1,
        best: parseInt(localStorage.getItem('compas_simon_best') || '0', 10),
        playing: false,
        acceptingInput: false
      };

      function renderSimonView() {
        simonRoundVal.textContent = simonState.round;
        simonNotesVal.textContent = simonState.sequence.length || 2;
        simonBestVal.textContent = simonState.best;
        simonPetAvatar.innerHTML = getPetSvg(petState.id, petState.stage, 44);
      }

      function flashSimonPad(idx, duration) {
        duration = duration || 380;
        var pad = document.getElementById('simonPad' + idx);
        if (pad) {
          pad.classList.add('active-glow');
          setTimeout(function () {
            pad.classList.remove('active-glow');
          }, duration);
        }
        var info = SIMON_PADS[idx];
        var ctx = makeAudio();
        if (ctx) {
          var now = ctx.currentTime + 0.02;
          if (info.sound === 'drum') drum(now, 130, 0.75);
          else if (info.sound === 'xylophone') playXylophone(now, info.freq, 0.45, 0.75);
          else if (info.sound === 'flute') playFlute(now, info.freq, 0.65, 0.7);
          else if (info.sound === 'marimba') playMarimba(now, info.freq, 0.6, 0.75);
        }
      }

      function startSimonGame() {
        makeAudio();
        simonState.round = 1;
        simonState.sequence = [
          Math.floor(Math.random() * 4),
          Math.floor(Math.random() * 4)
        ];
        simonState.playerStep = 0;
        renderSimonView();
        playSimonSequence();
      }

      function playSimonSequence() {
        simonState.playing = true;
        simonState.acceptingInput = false;
        if (simonRepeatBtn) simonRepeatBtn.disabled = true;
        if (simonPlayBtn) simonPlayBtn.disabled = true;
        simonCenterState.textContent = '🎵 ¡Escucha!';
        simonFeedback.className = 'simon-feedback-box';
        simonFeedback.textContent = 'Tu mascota toca el patrón... memoriza las notas y colores.';

        var stepDelay = 560;
        simonState.sequence.forEach(function (padIdx, i) {
          setTimeout(function () {
            flashSimonPad(padIdx, 360);
          }, i * stepDelay);
        });

        setTimeout(function () {
          simonState.playing = false;
          simonState.acceptingInput = true;
          simonState.playerStep = 0;
          if (simonRepeatBtn) simonRepeatBtn.disabled = false;
          if (simonPlayBtn) simonPlayBtn.disabled = false;
          simonCenterState.textContent = '👉 ¡Tu turno!';
          simonFeedback.textContent = '¡Ahora repite el eco tocando los mismos sectores al pulso!';
        }, simonState.sequence.length * stepDelay + 250);
      }

      function onSimonPadTap(idx) {
        if (!simonState.acceptingInput || simonState.playing) return;
        makeAudio();
        flashSimonPad(idx, 280);

        var expected = simonState.sequence[simonState.playerStep];
        if (idx === expected) {
          simonState.playerStep++;
          if (simonState.playerStep === simonState.sequence.length) {
            // Ronda superada
            simonState.acceptingInput = false;
            simonFeedback.className = 'simon-feedback-box good';
            simonFeedback.textContent = '🌟 ¡Eco perfecto! ¡Bien escuchado! (+15 XP)';
            simonCenterState.textContent = '🎉 ¡Bravo!';
            chime((audio ? audio.currentTime : 0) + 0.05);

            var oldStage = petState.stage;
            petState.xp += 15;
            savePetStorage();
            updatePetWidget();
            checkPetEvolution(oldStage);

            simonState.round++;
            if (simonState.round - 1 > simonState.best) {
              simonState.best = simonState.round - 1;
              localStorage.setItem('compas_simon_best', simonState.best);
            }
            renderSimonView();

            setTimeout(function () {
              simonState.sequence.push(Math.floor(Math.random() * 4));
              renderSimonView();
              playSimonSequence();
            }, 1200);
          }
        } else {
          // Error amistoso
          simonState.acceptingInput = false;
          errorSound((audio ? audio.currentTime : 0) + 0.05);
          simonFeedback.className = 'simon-feedback-box error';
          simonFeedback.textContent = '¡Casi! Escucha el patrón otra vez pulsando "Reescuchar patrón".';
          simonCenterState.textContent = '👂 ¡Prueba otra vez!';
          if (simonRepeatBtn) simonRepeatBtn.disabled = false;
        }
      }

      for (var p = 0; p < 4; p++) {
        (function (idx) {
          var padEl = document.getElementById('simonPad' + idx);
          if (padEl) {
            padEl.addEventListener('click', function () { onSimonPadTap(idx); });
          }
        }(p));
      }

      if (simonPlayBtn) {
        simonPlayBtn.addEventListener('click', startSimonGame);
      }
      if (simonRepeatBtn) {
        simonRepeatBtn.addEventListener('click', function () {
          if (!simonState.sequence.length) return;
          playSimonSequence();
        });
      }

      function renderMap() {
        var zones = {
          1: document.getElementById('mapZone1'),
          2: document.getElementById('mapZone2'),
          3: document.getElementById('mapZone3'),
          4: document.getElementById('mapZone4')
        };
        Object.keys(zones).forEach(function (k) { if (zones[k]) zones[k].innerHTML = ''; });

        for (var l = 1; l <= 18; l++) {
          (function (lvl) {
            var zoneKey = (lvl <= 5) ? 1 : (lvl <= 10) ? 2 : (lvl <= 14) ? 3 : 4;
            var targetZone = zones[zoneKey];
            if (!targetZone) return;

            var isCompleted = Boolean(petState.completedLevels[lvl]);
            var isCurrent = (state.level === lvl);

            var node = document.createElement('div');
            node.className = 'map-node' + (isCompleted ? ' completed' : '') + (isCurrent ? ' current' : '');
            node.setAttribute('role', 'button');
            node.tabIndex = 0;
            node.title = LEVELS[lvl].title;

            var petBadge = '';
            if (isCurrent) {
              petBadge = '<div class="map-node-pet" title="' + PETS[petState.id].name + ' te acompaña">' + getPetSvg(petState.id, petState.stage, 32) + '</div>';
            }

            node.innerHTML = petBadge +
              '<span class="map-node-num">' + (isCompleted ? '✓' : lvl) + '</span>' +
              '<strong class="map-node-title">' + LEVELS[lvl].title.replace(/^Nivel \d+\s*·\s*/, '') + '</strong>' +
              '<span class="map-node-status">' + (isCurrent ? 'Tu nivel' : isCompleted ? 'Completado' : 'Nivel ' + lvl) + '</span>';

            node.addEventListener('click', function () {
              state.level = lvl;
              state.streak = 0;
              state.challengeIndex = 0;
              state.levelErrors = 0;
              exitMapToGame();
              clearCircle('Viajaste a ' + LEVELS[lvl].title);
              renderTray();
              setupChallenge();
              startLevelLesson(lvl);
            });

            node.addEventListener('keydown', function (e) {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); node.click(); }
            });

            targetZone.appendChild(node);
          }(l));
        }
      }

      function updateCreatorMath() {
        if (!creatorMathTotal) return;
        var totalUnits = 0;
        creatorState.measures.forEach(function (bar) {
          totalUnits += COMPAS.barUnits(bar);
        });
        var wholes = Math.floor(totalUnits / 8);
        var rem = totalUnits % 8;
        var text = totalUnits + '/32 octavos = ' + wholes + ' entero' + (wholes === 1 ? '' : 's');
        if (rem > 0) text += ' y ' + rem + '/8';
        creatorMathTotal.textContent = text;
      }

      if (creatorMathEvalBtn) {
        creatorMathEvalBtn.addEventListener('click', function () {
          var b1 = COMPAS.barUnits(creatorState.measures[0]);
          var b2 = COMPAS.barUnits(creatorState.measures[1]);
          var sum = b1 + b2;
          var diff = Math.abs(b1 - b2);
          var msg = 'Compás 1 (' + b1 + '/8) + Compás 2 (' + b2 + '/8) suman ' + sum + '/8.';
          if (sum === 8) msg += ' ¡Hacen exactamente 1 entero!';
          else msg += ' Diferencia: ' + diff + ' octavos.';
          creatorNow.textContent = msg;
          showPetSpeech(msg, 4000);
          makeAudio();
          chime((audio ? audio.currentTime : 0) + 0.05);
        });
      }

      /* =========================================================
         MÓDULO E: TIENDA "EL MERCADITO DEL COMPÁS"
         ========================================================= */
      var MARKET_ITEMS = [
        {
          id: 'cap_red',
          cat: 'acc',
          name: 'Gorra Deportiva',
          desc: 'Roja con visera estilizada para saltar con ritmo.',
          price: 25,
          iconSvg: '<svg viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="14" ry="14" fill="#f1f5f9"/><g transform="translate(0,6)"><path d="M11 16 Q24 7 37 16 L39 19 Q24 15 9 19 Z" fill="#e11d48" stroke="#9f1239" stroke-width="1.2"/><ellipse cx="24" cy="13" rx="10" ry="3.8" fill="#ef4444"/><ellipse cx="24" cy="10" rx="2" ry="1" fill="#fff" opacity="0.6"/></g></svg>'
        },
        {
          id: 'cap_safari',
          cat: 'acc',
          name: 'Gorra Safari',
          desc: 'Sombrero de explorador para ritmos salvajes.',
          price: 30,
          iconSvg: '<svg viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="14" ry="14" fill="#f1f5f9"/><g transform="translate(0,6)"><ellipse cx="24" cy="15" rx="16" ry="5.5" fill="#ca8a04" stroke="#854d0e" stroke-width="1"/><path d="M16 15 Q24 6 32 15" fill="#eab308" stroke="#854d0e" stroke-width="1"/><line x1="16" y1="14" x2="32" y2="14" stroke="#713f12" stroke-width="2"/></g></svg>'
        },
        {
          id: 'glasses_neon',
          cat: 'acc',
          name: 'Gafas de Sol Neón',
          desc: 'Lentes oscuros con montura cian brillante.',
          price: 35,
          iconSvg: '<svg viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="14" ry="14" fill="#f1f5f9"/><g transform="translate(0,2)"><rect x="10" y="19" width="12" height="8.5" rx="2.5" fill="#0f172a" stroke="#06b6d4" stroke-width="2"/><rect x="26" y="19" width="12" height="8.5" rx="2.5" fill="#0f172a" stroke="#06b6d4" stroke-width="2"/><line x1="22" y1="23" x2="26" y2="23" stroke="#06b6d4" stroke-width="2.5"/></g></svg>'
        },
        {
          id: 'glasses_star',
          cat: 'acc',
          name: 'Gafas Estelares',
          desc: 'Estrellas doradas para brillar como un maestro.',
          price: 40,
          iconSvg: '<svg viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="14" ry="14" fill="#f1f5f9"/><g transform="translate(0,2)"><polygon points="16,18 18,23 23,23 19,26 21,31 16,28 11,31 13,26 9,23 14,23" fill="#facc15" stroke="#ca8a04" stroke-width="1.2"/><polygon points="32,18 34,23 39,23 35,26 37,31 32,28 27,31 29,26 25,23 30,23" fill="#facc15" stroke="#ca8a04" stroke-width="1.2"/></g></svg>'
        },
        {
          id: 'bowtie_gala',
          cat: 'acc',
          name: 'Pajarita de Gala',
          desc: 'Elegancia morada con botón de oro.',
          price: 30,
          iconSvg: '<svg viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="14" ry="14" fill="#f1f5f9"/><g transform="translate(0,-12)"><polygon points="16,35 24,37.5 16,40.5" fill="#7c3aed" stroke="#5b21b6" stroke-width="1"/><polygon points="32,35 24,37.5 32,40.5" fill="#7c3aed" stroke="#5b21b6" stroke-width="1"/><circle cx="24" cy="37.5" r="2.4" fill="#fbbf24" stroke="#d97706" stroke-width="1"/></g></svg>'
        },
        {
          id: 'bowtie_rhythm',
          cat: 'acc',
          name: 'Pajarita Rítmica',
          desc: 'Verde esmeralda con centro rojo vivo.',
          price: 35,
          iconSvg: '<svg viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="14" ry="14" fill="#f1f5f9"/><g transform="translate(0,-12)"><polygon points="16,34.5 24,37.5 16,40.5" fill="#10b981" stroke="#047857" stroke-width="1"/><polygon points="32,34.5 24,37.5 32,40.5" fill="#10b981" stroke="#047857" stroke-width="1"/><circle cx="24" cy="37.5" r="2.8" fill="#ef4444"/></g></svg>'
        },
        {
          id: 'headphones_dj',
          cat: 'acc',
          name: 'Audífonos DJ',
          desc: 'Graves profundos y estilo musical de escenario.',
          price: 45,
          iconSvg: '<svg viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="14" ry="14" fill="#f1f5f9"/><path d="M10 26 C10 11 38 11 38 26" fill="none" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/><rect x="7" y="21" width="5" height="10" rx="2" fill="#1e3a8a"/><rect x="36" y="21" width="5" height="10" rx="2" fill="#1e3a8a"/></svg>'
        },
        {
          id: 'headphones_gold',
          cat: 'acc',
          name: 'Audífonos de Oro',
          desc: 'Los audífonos de los verdaderos campeones del compás.',
          price: 50,
          iconSvg: '<svg viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="14" ry="14" fill="#f1f5f9"/><path d="M10 26 C10 11 38 11 38 26" fill="none" stroke="#d97706" stroke-width="3" stroke-linecap="round"/><rect x="7" y="21" width="5" height="10" rx="2" fill="#f59e0b"/><rect x="36" y="21" width="5" height="10" rx="2" fill="#f59e0b"/></svg>'
        },
        {
          id: 'sound_bells',
          cat: 'inst',
          soundKey: 'bells',
          name: 'Campanitas Mágicas',
          desc: 'Desbloquea el timbre de campana celeste en "Mi ritmo".',
          price: 40,
          iconSvg: '<svg viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="14" ry="14" fill="#fef3c7"/><circle cx="18" cy="22" r="6" fill="#f59e0b"/><circle cx="28" cy="26" r="7" fill="#fbbf24"/><path d="M18 16 L28 19" stroke="#d97706" stroke-width="2.5"/></svg>'
        },
        {
          id: 'sound_synth',
          cat: 'inst',
          soundKey: 'synth',
          name: 'Sintetizador Pop',
          desc: 'Desbloquea el sintetizador electrónico alegre en "Mi ritmo".',
          price: 40,
          iconSvg: '<svg viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="14" ry="14" fill="#f5d0fe"/><rect x="10" y="16" width="28" height="16" rx="3" fill="#8b5cf6"/><circle cx="16" cy="24" r="2.5" fill="#fff"/><circle cx="24" cy="24" r="2.5" fill="#fff"/><line x1="30" y1="20" x2="35" y2="20" stroke="#fff" stroke-width="2"/><line x1="30" y1="24" x2="35" y2="24" stroke="#fff" stroke-width="2"/></svg>'
        },
        /* — Añadido (Fase 4): tintes de color para el cuerpo de la mascota — */
        {
          id: 'tint_original', cat: 'tint', color: null,
          name: 'Color original',
          desc: 'Vuelve al color de nacimiento de tu mascota.',
          price: 0,
          iconSvg: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="14" fill="#f1f5f9"/><circle cx="24" cy="24" r="10" fill="none" stroke="#f04444" stroke-width="3"/><circle cx="24" cy="24" r="6" fill="none" stroke="#ffd438" stroke-width="3"/><circle cx="24" cy="24" r="2.5" fill="none" stroke="#39a867" stroke-width="3"/></svg>'
        },
        {
          id: 'tint_violeta', cat: 'tint', color: '#8b5cf6',
          name: 'Tinte Violeta',
          desc: 'Un morado mágico y elegante.',
          price: 45,
          iconSvg: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="14" fill="#f1f5f9"/><ellipse cx="24" cy="26" rx="9" ry="12" fill="#8b5cf6" stroke="#5b21b6" stroke-width="1.5"/><path d="M18 14 q3 -4 6 0" stroke="#5b21b6" stroke-width="1.5" fill="none"/></svg>'
        },
        {
          id: 'tint_cian', cat: 'tint', color: '#1daea5',
          name: 'Tinte Cian',
          desc: 'Fresco como el mar caribeño.',
          price: 45,
          iconSvg: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="14" fill="#f1f5f9"/><ellipse cx="24" cy="26" rx="9" ry="12" fill="#1daea5" stroke="#0e8a83" stroke-width="1.5"/><path d="M18 14 q3 -4 6 0" stroke="#0e8a83" stroke-width="1.5" fill="none"/></svg>'
        },
        {
          id: 'tint_dorado', cat: 'tint', color: '#d4a017',
          name: 'Tinte Dorado',
          desc: 'Brilla como trofeo de campeón.',
          price: 60,
          iconSvg: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="14" fill="#f1f5f9"/><ellipse cx="24" cy="26" rx="9" ry="12" fill="#d4a017" stroke="#92600a" stroke-width="1.5"/><path d="M18 14 q3 -4 6 0" stroke="#92600a" stroke-width="1.5" fill="none"/></svg>'
        },
        {
          id: 'tint_rosa', cat: 'tint', color: '#ec4899',
          name: 'Tinte Rosa',
          desc: 'Dulce y divertido como chicle.',
          price: 60,
          iconSvg: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="14" fill="#f1f5f9"/><ellipse cx="24" cy="26" rx="9" ry="12" fill="#ec4899" stroke="#9d174d" stroke-width="1.5"/><path d="M18 14 q3 -4 6 0" stroke="#9d174d" stroke-width="1.5" fill="none"/></svg>'
        }
      ];

      var fittingAvatarWrap = document.getElementById('fittingAvatarWrap');
      var fittingPetName = document.getElementById('fittingPetName');
      var fittingAccStatus = document.getElementById('fittingAccStatus');
      var unequipAccBtn = document.getElementById('unequipAccBtn');
      var shareOutfitBtn = document.getElementById('shareOutfitBtn');
      var marketAccessoriesGrid = document.getElementById('marketAccessoriesGrid');
      var marketInstrumentsGrid = document.getElementById('marketInstrumentsGrid');
      var marketTintsGrid = document.getElementById('marketTintsGrid');
      var openEggBtn = document.getElementById('openEggBtn');

      var eggModal = document.getElementById('eggModal');
      var eggModalEgg = document.getElementById('eggModalEgg');
      var eggPrizeResult = document.getElementById('eggPrizeResult');
      var eggPrizeIcon = document.getElementById('eggPrizeIcon');
      var eggPrizeName = document.getElementById('eggPrizeName');
      var eggPrizeDesc = document.getElementById('eggPrizeDesc');
      var eggModalCloseBtn = document.getElementById('eggModalCloseBtn');

      function isItemOwned(id) {
        return (petState.inventory && petState.inventory.indexOf(id) !== -1);
      }

      function getEquippedAcc(petId) {
        return (petState.equipped && petState.equipped[petId]) || null;
      }

      function renderMarketView() {
        var p = PETS[petState.id] || PETS.bumbo;
        if (fittingPetName) fittingPetName.textContent = p.name;
        var currentAcc = getEquippedAcc(petState.id);
        if (fittingAvatarWrap) {
          fittingAvatarWrap.innerHTML = getPetSvg(petState.id, petState.stage, 105, currentAcc);
        }
        if (fittingAccStatus) {
          if (currentAcc) {
            var itemFound = MARKET_ITEMS.find(function (it) { return it.id === currentAcc; });
            fittingAccStatus.textContent = 'Equipado: ' + (itemFound ? itemFound.name : currentAcc);
            if (unequipAccBtn) unequipAccBtn.style.display = 'flex';
          } else {
            fittingAccStatus.textContent = 'Sin accesorio equipado';
            if (unequipAccBtn) unequipAccBtn.style.display = 'none';
          }
        }

        var coinsCountEl = document.getElementById('marketCoinsCount');
        if (coinsCountEl) coinsCountEl.textContent = petState.coins || 0;

        renderMarketShelves();
      }

      function renderMarketShelves() {
        if (!marketAccessoriesGrid || !marketInstrumentsGrid) return;
        marketAccessoriesGrid.innerHTML = '';
        marketInstrumentsGrid.innerHTML = '';
        if (marketTintsGrid) marketTintsGrid.innerHTML = '';

        MARKET_ITEMS.forEach(function (item) {
          var card = document.createElement('article');
          card.className = 'market-card';
          var owned = isItemOwned(item.id);
          var isEquipped = (item.cat === 'acc' && getEquippedAcc(petState.id) === item.id);

          if (isEquipped) card.classList.add('equipped');
          else if (owned) card.classList.add('owned');

          var iconEl = document.createElement('div');
          iconEl.className = 'market-item-icon';
          iconEl.innerHTML = item.iconSvg;
          card.appendChild(iconEl);

          var titleEl = document.createElement('h3');
          titleEl.className = 'market-item-title';
          titleEl.textContent = item.name;
          card.appendChild(titleEl);

          var descEl = document.createElement('p');
          descEl.className = 'market-item-desc';
          descEl.textContent = item.desc;
          card.appendChild(descEl);

          var priceEl = document.createElement('div');
          priceEl.className = 'market-item-price';
          priceEl.innerHTML = owned ? '<span style="color:#16a34a;font-size:0.85rem;">✓ Comprado</span>' : ('<span>🪙</span> ' + item.price);
          card.appendChild(priceEl);

          var btn = document.createElement('button');
          btn.className = 'market-buy-btn';
          btn.type = 'button';

          if (item.cat === 'acc') {
            if (isEquipped) {
              btn.textContent = 'Puesto ✓';
              btn.classList.add('is-equipped');
              btn.disabled = true;
            } else if (owned) {
              btn.textContent = 'Equipar';
              btn.classList.add('equip');
              btn.addEventListener('click', function () { equipAccessory(item.id); });
            } else {
              btn.textContent = 'Comprar (' + item.price + ' 🪙)';
              btn.disabled = (petState.coins < item.price);
              btn.addEventListener('click', function () { buyMarketItem(item); });
            }
          } else if (item.cat === 'tint') {
            /* — Añadido (Fase 4): tintes de color para la mascota — */
            var tintOwned = owned || item.price === 0;
            var isApplied = (item.color === null)
              ? !(petState.tints && petState.tints[petState.id])
              : !!(petState.tints && petState.tints[petState.id] === item.color);
            if (isApplied) {
              btn.textContent = 'Aplicado ✓';
              btn.classList.add('is-equipped');
              btn.disabled = true;
            } else if (tintOwned) {
              btn.textContent = 'Aplicar';
              btn.classList.add('equip');
              btn.addEventListener('click', function () { applyTint(item); });
            } else {
              btn.textContent = 'Comprar (' + item.price + ' 🪙)';
              btn.disabled = (petState.coins < item.price);
              btn.addEventListener('click', function () { buyMarketItem(item); });
            }
          } else {
            // Instrumento
            if (owned) {
              btn.textContent = 'Desbloqueado ✓';
              btn.classList.add('is-equipped');
              btn.disabled = true;
            } else {
              btn.textContent = 'Desbloquear (' + item.price + ' 🪙)';
              btn.disabled = (petState.coins < item.price);
              btn.addEventListener('click', function () { buyMarketItem(item); });
            }
          }
          card.appendChild(btn);

          if (item.cat === 'acc') marketAccessoriesGrid.appendChild(card);
          else if (item.cat === 'tint') { if (marketTintsGrid) marketTintsGrid.appendChild(card); }
          else marketInstrumentsGrid.appendChild(card);
        });
      }

      function buyMarketItem(item) {
        if (petState.coins < item.price) {
          showPetSpeech('¡Te faltan monedas de ritmo! Juega niveles o atiende en El Puesto para ganar más.', 3500);
          return;
        }
        petState.coins -= item.price;
        if (!petState.inventory) petState.inventory = [];
        if (petState.inventory.indexOf(item.id) === -1) {
          petState.inventory.push(item.id);
        }
        if (item.cat === 'acc') {
          if (!petState.equipped) petState.equipped = {};
          petState.equipped[petState.id] = item.id;
        }
        /* — Añadido (Fase 4): comprar un tinte lo aplica de inmediato — */
        if (item.cat === 'tint') applyTint(item);
        savePetStorage();
        updatePetWidget();
        updateWeeklyMissionProgress('m2_market_shop', 1);
        playCashRegisterSound();
        confetti();
        renderMarketView();
        showPetSpeech('¡Estupendo! Adquiriste ' + item.name + '.', 3500);
      }

      /* — Añadido (Fase 4): aplicar o quitar el tinte de color de la mascota — */
      function applyTint(item) {
        if (!petState.tints) petState.tints = {};
        if (item.color === null) {
          delete petState.tints[petState.id];
          showPetSpeech('¡De vuelta a mi color original!', 3000);
        } else {
          petState.tints[petState.id] = item.color;
          showPetSpeech('¡Me encanta mi nuevo color! 🎨', 3000);
        }
        savePetStorage();
        updatePetWidget();
        renderMarketView();
        confetti();
      }

      function equipAccessory(accId) {
        if (!petState.equipped) petState.equipped = {};
        petState.equipped[petState.id] = accId;
        savePetStorage();
        updatePetWidget();
        updateWeeklyMissionProgress('m2_market_shop', 1);
        makeAudio();
        chime((audio ? audio.currentTime : 0) + 0.05);
        renderMarketView();
        showPetSpeech('¡Qué bien se ve ' + PETS[petState.id].name + ' con este accesorio!', 3200);
      }

      function unequipAccessory() {
        if (!petState.equipped) petState.equipped = {};
        petState.equipped[petState.id] = null;
        savePetStorage();
        updatePetWidget();
        renderMarketView();
        showPetSpeech('Accesorio guardado en el armario.', 2500);
      }

      if (unequipAccBtn) unequipAccBtn.addEventListener('click', unequipAccessory);

      if (shareOutfitBtn) {
        shareOutfitBtn.addEventListener('click', function () {
          var p = PETS[petState.id] || PETS.bumbo;
          var curAcc = getEquippedAcc(petState.id);
          var accName = 'estilo natural';
          if (curAcc) {
            var it = MARKET_ITEMS.find(function (x) { return x.id === curAcc; });
            if (it) accName = it.name;
          }
          var text = '¡Mira el look de mi mascota ' + p.name + ' con ' + accName + ' en Completa el compás! 🐾🪙 Tengo ' + (petState.coins || 0) + ' monedas de ritmo aprendiendo matemática musical.';
          shareToWhatsApp(text);
        });
      }

      /* Huevo Sorpresa */
      if (openEggBtn) {
        openEggBtn.addEventListener('click', function () {
          if ((petState.coins || 0) < 50) {
            showPetSpeech('El Huevo Sorpresa cuesta 50 monedas. ¡Gana más en los niveles o en El Puesto!', 3500);
            return;
          }
          petState.coins -= 50;
          savePetStorage();
          updatePetWidget();
          renderMarketView();

          // Abrir modal
          if (eggModal) {
            eggModal.hidden = false;
            eggModalEgg.style.display = 'block';
            eggModalEgg.className = 'egg-modal-egg shake';
            eggPrizeResult.style.display = 'none';
            eggModalCloseBtn.style.display = 'none';
          }
        });
      }

      if (eggModalEgg) {
        eggModalEgg.addEventListener('click', function () {
          if (eggPrizeResult.style.display === 'flex') return;
          playCashRegisterSound();
          eggModalEgg.className = 'egg-modal-egg hatched';

          // Determinar premio
          var unownedItems = MARKET_ITEMS.filter(function (it) { return !isItemOwned(it.id); });
          var wonPrize = null;
          if (unownedItems.length > 0) {
            wonPrize = unownedItems[Math.floor(Math.random() * unownedItems.length)];
            petState.inventory.push(wonPrize.id);
            if (wonPrize.cat === 'acc') {
              if (!petState.equipped) petState.equipped = {};
              petState.equipped[petState.id] = wonPrize.id;
            }
          } else {
            // Ya tiene todo: regalo de 60 monedas
            petState.coins = (petState.coins || 0) + 60;
            wonPrize = {
              name: '¡Cofre de Oro! (+60 Monedas)',
              desc: '¡Colección completa! Has ganado 60 monedas de ritmo extra.',
              iconSvg: '<div style="font-size:2.8rem;">💰</div>'
            };
          }
          savePetStorage();
          updatePetWidget();
          confetti();
          fanfareSound();

          setTimeout(function () {
            eggModalEgg.style.display = 'none';
            eggPrizeResult.style.display = 'flex';
            eggPrizeIcon.innerHTML = wonPrize.iconSvg;
            eggPrizeName.textContent = wonPrize.name;
            eggPrizeDesc.textContent = wonPrize.desc;
            eggModalCloseBtn.style.display = 'block';
          }, 450);
        });
      }

      if (eggModalCloseBtn) {
        eggModalCloseBtn.addEventListener('click', function () {
          if (eggModal) eggModal.hidden = true;
          renderMarketView();
        });
      }

      /* =========================================================
         MÓDULO E: MINIJUEGO "EL PUESTO" (Caja Registradora)
         ========================================================= */
      var STALL_PRODUCTS = [
        { id: 'empanada', name: 'Empanada crujiente', icon: '🥟', usd: 3 },
        { id: 'jugo', name: 'Jugo natural', icon: '🧃', usd: 2 },
        { id: 'fruta', name: 'Manzana dulce', icon: '🍎', usd: 1 },
        { id: 'arepa', name: 'Arepita musical', icon: '🫓', usd: 4 },
        { id: 'helado', name: 'Helado de ritmo', icon: '🍦', usd: 2 }
      ];

      var STALL_CUSTOMERS = [
        { name: 'Pablito el Percusionista', avatar: '🥁', phrase: '¡Hola! Tocar tanto tambor me dio apetito.' },
        { name: 'Sofía la Flautista', avatar: '🎶', phrase: '¡Buenas! Una rica merienda para seguir practicando mi flauta.' },
        { name: 'Don Compás', avatar: '🎩', phrase: '¡Buen día! Vengo por mi merienda favorita de la tarde.' },
        { name: 'Doña Marimba', avatar: '🌺', phrase: '¡Hola corazón! Qué rico aroma tiene tu puesto hoy.' },
        { name: 'Carlitos el del Saxo', avatar: '🎷', phrase: '¡Hola! Dame algo refrescante antes de mi concierto.' }
      ];

      var stallState = {
        difficulty: 1, // 1: $, 2: Bs, 3: Mixto
        orderCount: 0,
        currentCustomer: null,
        orderItems: [],
        totalCostUsd: 0,
        totalCostBs: 0,
        paidCurrency: 'usd',
        paidAmount: 0,
        expectedCurrency: 'usd',
        expectedChange: 0,
        trayMoney: [] // [{ curr: 'usd'|'bs', val: number }]
      };

      var stallDiff1 = document.getElementById('stallDiff1');
      var stallDiff2 = document.getElementById('stallDiff2');
      var stallDiff3 = document.getElementById('stallDiff3');
      var openRateModalBtn = document.getElementById('openRateModalBtn');
      var stallRateDisplay = document.getElementById('stallRateDisplay');
      var rateModal = document.getElementById('rateModal');
      var rateValueInput = document.getElementById('rateValueInput');
      var saveRateBtn = document.getElementById('saveRateBtn');
      var closeRateBtn = document.getElementById('closeRateBtn');

      var stallCustomerAvatar = document.getElementById('stallCustomerAvatar');
      var stallCustomerName = document.getElementById('stallCustomerName');
      var stallCustomerBubble = document.getElementById('stallCustomerBubble');
      var stallCustomerPaidVisual = document.getElementById('stallCustomerPaidVisual');

      var ticketOrderId = document.getElementById('ticketOrderId');
      var ticketItemsContainer = document.getElementById('ticketItemsContainer');
      var ticketTotalDisplay = document.getElementById('ticketTotalDisplay');
      var ticketMathGuide = document.getElementById('ticketMathGuide');

      var stallUsdDrawer = document.getElementById('stallUsdDrawer');
      var stallBsDrawer = document.getElementById('stallBsDrawer');
      var trayRunningTotal = document.getElementById('trayRunningTotal');
      var trayChipsContainer = document.getElementById('trayChipsContainer');
      var stallDeliverBtn = document.getElementById('stallDeliverBtn');
      var stallClearTrayBtn = document.getElementById('stallClearTrayBtn');
      var stallNextCustomerBtn = document.getElementById('stallNextCustomerBtn');
      var stallFeedbackBox = document.getElementById('stallFeedbackBox');

      function getStallRate() {
        return (petState.stallRate && petState.stallRate > 0) ? petState.stallRate : 150;
      }

      function updateRateDisplay() {
        var r = getStallRate();
        if (stallRateDisplay) stallRateDisplay.textContent = r;
        if (rateValueInput) rateValueInput.value = r;
      }

      function initStallDifficultyTabs() {
        [stallDiff1, stallDiff2, stallDiff3].forEach(function (btn, index) {
          if (!btn) return;
          btn.addEventListener('click', function () {
            stallState.difficulty = index + 1;
            [stallDiff1, stallDiff2, stallDiff3].forEach(function (b) { if (b) b.classList.remove('active'); });
            btn.classList.add('active');
            generateNewStallOrder();
          });
        });
      }

      function generateNewStallOrder() {
        var rate = getStallRate();
        updateRateDisplay();

        // Elegir cliente
        var cust = STALL_CUSTOMERS[Math.floor(Math.random() * STALL_CUSTOMERS.length)];
        stallState.currentCustomer = cust;
        stallState.orderCount += 1;

        // Armar pedido (1 a 2 productos)
        var numItems = (Math.random() > 0.5) ? 2 : 1;
        var shuffled = STALL_PRODUCTS.slice().sort(function () { return 0.5 - Math.random(); });
        var chosen = shuffled.slice(0, numItems);
        stallState.orderItems = chosen;

        var totalUsd = chosen.reduce(function (sum, it) { return sum + it.usd; }, 0);
        var totalBs = totalUsd * rate;
        stallState.totalCostUsd = totalUsd;
        stallState.totalCostBs = totalBs;

        // Configurar según dificultad
        if (stallState.difficulty === 1) {
          // Vuelto en $
          stallState.paidCurrency = 'usd';
          stallState.expectedCurrency = 'usd';
          var billOptions = [5, 10, 20].filter(function (b) { return b > totalUsd; });
          stallState.paidAmount = billOptions.length > 0 ? billOptions[0] : 20;
          stallState.expectedChange = stallState.paidAmount - totalUsd;
        } else if (stallState.difficulty === 2) {
          // Vuelto en Bs
          stallState.paidCurrency = 'bs';
          stallState.expectedCurrency = 'bs';
          var bsBills = [500, 1000, 2000].filter(function (b) { return b > totalBs; });
          stallState.paidAmount = bsBills.length > 0 ? bsBills[0] : (Math.ceil(totalBs / 500) * 500 + 500);
          stallState.expectedChange = stallState.paidAmount - totalBs;
        } else {
          // Dificultad 3: Mixto con Tasa
          stallState.paidCurrency = 'bs';
          stallState.expectedCurrency = 'bs';
          var bsBillsMix = [500, 1000, 2000].filter(function (b) { return b > totalBs; });
          stallState.paidAmount = bsBillsMix.length > 0 ? bsBillsMix[0] : (totalBs + 300);
          stallState.expectedChange = stallState.paidAmount - totalBs;
        }

        // Resetear bandeja
        stallState.trayMoney = [];
        renderStallUI();
      }

      function renderStallUI() {
        var cust = stallState.currentCustomer;
        if (!cust) return;

        if (stallCustomerAvatar) stallCustomerAvatar.textContent = cust.avatar;
        if (stallCustomerName) stallCustomerName.textContent = cust.name;
        if (stallCustomerBubble) {
          var itemsText = stallState.orderItems.map(function (it) { return it.name; }).join(' y ');
          stallCustomerBubble.textContent = cust.phrase + ' Por favor: ' + itemsText + '.';
        }

        // Billete que entrega el cliente
        if (stallCustomerPaidVisual) {
          if (stallState.paidCurrency === 'usd') {
            stallCustomerPaidVisual.innerHTML = '<span class="bill-btn bill-usd" style="cursor:default;pointer-events:none;">💵 $' + stallState.paidAmount + '</span>';
          } else {
            stallCustomerPaidVisual.innerHTML = '<span class="bill-btn bill-bs" style="cursor:default;pointer-events:none;">💴 Bs ' + stallState.paidAmount + '</span>';
          }
        }

        // Pizarra de ticket
        if (ticketOrderId) ticketOrderId.textContent = '#' + stallState.orderCount;
        if (ticketItemsContainer) {
          ticketItemsContainer.innerHTML = '';
          stallState.orderItems.forEach(function (it) {
            var row = document.createElement('div');
            row.className = 'ticket-item';
            var priceText = '$' + it.usd;
            if (stallState.difficulty >= 2) {
              priceText += ' (Bs ' + (it.usd * getStallRate()) + ')';
            }
            row.innerHTML = '<span>' + it.icon + ' ' + it.name + '</span><span>' + priceText + '</span>';
            ticketItemsContainer.appendChild(row);
          });
        }

        if (ticketTotalDisplay) {
          if (stallState.difficulty === 1) {
            ticketTotalDisplay.textContent = '$' + stallState.totalCostUsd;
          } else if (stallState.difficulty === 2) {
            ticketTotalDisplay.textContent = 'Bs ' + stallState.totalCostBs;
          } else {
            ticketTotalDisplay.textContent = '$' + stallState.totalCostUsd + ' = Bs ' + stallState.totalCostBs;
          }
        }

        if (ticketMathGuide) {
          var paidStr = (stallState.paidCurrency === 'usd' ? '$' : 'Bs ') + stallState.paidAmount;
          var costStr = (stallState.expectedCurrency === 'usd' ? '$' : 'Bs ') + (stallState.expectedCurrency === 'usd' ? stallState.totalCostUsd : stallState.totalCostBs);
          var chgStr = (stallState.expectedCurrency === 'usd' ? '$' : 'Bs ') + stallState.expectedChange;
          ticketMathGuide.innerHTML = 'Pagó con: <strong>' + paidStr + '</strong> · Total: <strong>' + costStr + '</strong> · Vuelto: <strong>' + chgStr + '</strong>';
        }

        // Mostrar gavetas según lo que pide
        if (stallUsdDrawer) {
          stallUsdDrawer.style.display = (stallState.expectedCurrency === 'usd') ? 'block' : 'none';
        }
        if (stallBsDrawer) {
          stallBsDrawer.style.display = (stallState.expectedCurrency === 'bs') ? 'block' : 'none';
        }

        renderStallTray();

        if (stallFeedbackBox) {
          stallFeedbackBox.className = 'stall-feedback-box';
          stallFeedbackBox.textContent = '';
        }
        if (stallDeliverBtn) stallDeliverBtn.style.display = 'flex';
        if (stallClearTrayBtn) stallClearTrayBtn.style.display = 'flex';
        if (stallNextCustomerBtn) stallNextCustomerBtn.style.display = 'none';
      }

      function getTrayTotal() {
        return stallState.trayMoney.reduce(function (sum, item) { return sum + item.val; }, 0);
      }

      function renderStallTray() {
        if (!trayRunningTotal || !trayChipsContainer) return;
        var total = getTrayTotal();
        var symbol = stallState.expectedCurrency === 'usd' ? '$' : 'Bs ';
        trayRunningTotal.textContent = symbol + total;

        trayChipsContainer.innerHTML = '';
        if (stallState.trayMoney.length === 0) {
          var hint = document.createElement('span');
          hint.className = 'tray-empty-hint';
          hint.textContent = 'Toca los billetes o monedas arriba para reunirlos aquí...';
          trayChipsContainer.appendChild(hint);
        } else {
          stallState.trayMoney.forEach(function (m, idx) {
            var chip = document.createElement('span');
            chip.className = 'tray-chip ' + m.curr;
            chip.textContent = (m.curr === 'usd' ? '$' : 'Bs ') + m.val;
            chip.title = 'Toca para quitar';
            chip.style.cursor = 'pointer';
            chip.addEventListener('click', function () {
              stallState.trayMoney.splice(idx, 1);
              renderStallTray();
            });
            trayChipsContainer.appendChild(chip);
          });
        }
      }

      function addMoneyToTray(curr, val) {
        if (stallState.expectedCurrency !== curr) return;
        stallState.trayMoney.push({ curr: curr, val: Number(val) });
        playCashRegisterSound();
        renderStallTray();
      }

      // Conectar botones de billetes y monedas
      document.querySelectorAll('.bill-btn[data-curr], .coin-btn[data-curr]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var curr = btn.getAttribute('data-curr');
          var val = btn.getAttribute('data-val');
          addMoneyToTray(curr, val);
        });
      });

      if (stallClearTrayBtn) {
        stallClearTrayBtn.addEventListener('click', function () {
          stallState.trayMoney = [];
          renderStallTray();
        });
      }

      if (stallDeliverBtn) {
        stallDeliverBtn.addEventListener('click', function () {
          var totalDelivered = getTrayTotal();
          var expected = stallState.expectedChange;
          var symbol = stallState.expectedCurrency === 'usd' ? '$' : 'Bs ';

          if (totalDelivered === expected) {
            // ¡Vuelto exacto!
            var tip = Math.floor(Math.random() * 4) + 2; // +2 a +5 monedas de propina
            petState.coins = (petState.coins || 0) + tip;
            savePetStorage();
            updatePetWidget();
            updateWeeklyMissionProgress('m1_market_stall', 1);
            confetti();
            fanfareSound();
            celebratePetWin();

            stallFeedbackBox.className = 'stall-feedback-box good show';
            stallFeedbackBox.innerHTML = '🎉 ¡Vuelto exacto! <strong>' + symbol + expected + '</strong>.<br>El cliente está feliz y te dejó <strong>+' + tip + ' monedas de propina</strong> 🪙.';
            stallDeliverBtn.style.display = 'none';
            stallClearTrayBtn.style.display = 'none';
            stallNextCustomerBtn.style.display = 'flex';
          } else {
            // Error
            errorSound((audio ? audio.currentTime : 0) + 0.05);
            stallFeedbackBox.className = 'stall-feedback-box bad show';
            var diff = totalDelivered - expected;
            if (diff > 0) {
              stallFeedbackBox.innerHTML = '🤔 Entregaste ' + symbol + totalDelivered + ' (le sobran ' + symbol + diff + '). El vuelto exacto es <strong>' + symbol + expected + '</strong>. ¡Inténtalo de nuevo!';
            } else {
              stallFeedbackBox.innerHTML = '🤔 Entregaste ' + symbol + totalDelivered + ' (le faltan ' + symbol + (-diff) + '). El vuelto exacto es <strong>' + symbol + expected + '</strong>. ¡Inténtalo de nuevo!';
            }
          }
        });
      }

      if (stallNextCustomerBtn) {
        stallNextCustomerBtn.addEventListener('click', function () {
          generateNewStallOrder();
        });
      }

      /* Modal de Tasa de Cambio */
      if (openRateModalBtn) {
        openRateModalBtn.addEventListener('click', function () {
          updateRateDisplay();
          if (rateModal) rateModal.hidden = false;
        });
      }
      if (closeRateBtn) {
        closeRateBtn.addEventListener('click', function () {
          if (rateModal) rateModal.hidden = true;
        });
      }
      if (saveRateBtn) {
        saveRateBtn.addEventListener('click', function () {
          var val = parseInt(rateValueInput.value, 10);
          if (isNaN(val) || val <= 0) {
            val = 150;
          }
          petState.stallRate = val;
          savePetStorage();
          updateRateDisplay();
          if (rateModal) rateModal.hidden = true;
          generateNewStallOrder();
          showPetSpeech('Tasa actualizada: 1 $ = ' + val + ' Bs', 3000);
        });
      }

      function renderStallView() {
        updateRateDisplay();
        if (!stallState.currentCustomer) {
          initStallDifficultyTabs();
          generateNewStallOrder();
        } else {
          renderStallUI();
        }
      }

      
      /* =========================================================================
         FASE 4, 5, 6, 7, 8: LOGICA INTEGRAL DE EXPANSIÓN (ED-Dev)
         ========================================================================= */

      /* --- FASE 4: BAUTIZAR MASCOTA Y FIRMA RÍTMICA --- */
      var petRenameBtn = document.getElementById('petRenameBtn');
      var petRenameModal = document.getElementById('petRenameModal');
      var petRenameInput = document.getElementById('petRenameInput');
      var petRenameAvatar = document.getElementById('petRenameAvatar');
      var petRenameSaveBtn = document.getElementById('petRenameSaveBtn');
      var petRenameResetBtn = document.getElementById('petRenameResetBtn');
      var petRenameCloseBtn = document.getElementById('petRenameCloseBtn');
      var creatorSetPetRhythm = document.getElementById('creatorSetPetRhythm');

      if (petRenameBtn) {
        petRenameBtn.addEventListener('click', function () {
          if (petRenameAvatar) petRenameAvatar.innerHTML = getPetSvg(petState.id, petState.stage, 68);
          if (petRenameInput) petRenameInput.value = petState.customName || '';
          if (petRenameModal) petRenameModal.hidden = false;
        });
      }
      if (petRenameCloseBtn) {
        petRenameCloseBtn.addEventListener('click', function () {
          if (petRenameModal) petRenameModal.hidden = true;
        });
      }
      if (petRenameResetBtn) {
        petRenameResetBtn.addEventListener('click', function () {
          petState.customName = '';
          savePetStorage();
          updatePetWidget();
          if (petRenameModal) petRenameModal.hidden = true;
          showPetSpeech('¡Nombre restablecido al original!', 3000);
        });
      }
      if (petRenameSaveBtn) {
        petRenameSaveBtn.addEventListener('click', function () {
          var name = petRenameInput ? petRenameInput.value.trim() : '';
          petState.customName = name;
          savePetStorage();
          updatePetWidget();
          if (petRenameModal) petRenameModal.hidden = true;
          confetti();
          fanfareSound();
          celebratePetWin();
          showPetSpeech('¡Me encanta mi nuevo nombre: ' + (name || (PETS[petState.id] ? PETS[petState.id].name : 'Mascota')) + '!', 3800);
        });
      }

      function playCustomRhythm(customBar) {
        var ctx = makeAudio();
        if (!ctx || !customBar || !customBar.placements) return;
        var start = ctx.currentTime + 0.05;
        var unitSec = 0.18;
        customBar.placements.forEach(function (p) {
          if (TYPES[p.type] && TYPES[p.type].silent) {
            if (restCueEnabled) playRestCue(start + p.start * unitSec);
            return;
          }
          var snd = p.sound || customBar.sound || 'drum';
          playSound(snd, start + p.start * unitSec, p.type === 'eighth' ? 0.45 : 0.65, customBar.settings || { pitch: 0, echo: 0, bright: 50 });
          if (TYPES[p.type].twin) playSound(snd, start + p.start * unitSec + unitSec / 2, .32, customBar.settings || { pitch: 0, echo: 0, bright: 50 });
        });
      }

      /* — Añadido (Fase 1): reproduce una firma sonora de varios compases en secuencia — */
      function playSignatureSequence(bars) {
        var ctx = makeAudio();
        if (!ctx || !bars || !bars.length) return;
        var unitSec = 0.19;
        var barSec = unitSec * 8;
        var start = ctx.currentTime + 0.05;
        bars.forEach(function (bar, i) {
          if (!bar || !bar.placements) return;
          bar.placements.forEach(function (p) {
            if (TYPES[p.type] && TYPES[p.type].silent) {
              if (restCueEnabled) playRestCue(start + i * barSec + p.start * unitSec);
              return;
            }
            var snd = p.sound || bar.sound || 'drum';
            playSound(snd, start + i * barSec + p.start * unitSec, p.type === 'eighth' ? 0.45 : 0.65, bar.settings || { pitch: 0, echo: 0, bright: 50 });
            if (TYPES[p.type].twin) playSound(snd, start + i * barSec + p.start * unitSec + unitSec / 2, .32, bar.settings || { pitch: 0, echo: 0, bright: 50 });
          });
        });
      }

      /* — Añadido (Fase 2): reproduce los compases marcados SIMULTÁNEAMENTE (capas) — */
      function playLayersTogether(bars) {
        var ctx = makeAudio();
        if (!ctx || !bars || !bars.length) return;
        var start = ctx.currentTime + 0.08;
        var unitSec = 0.19;
        bars.forEach(function (bar) {
          if (!bar || !bar.placements) return;
          bar.placements.forEach(function (p) {
            if (TYPES[p.type] && TYPES[p.type].silent) {
              if (restCueEnabled) playRestCue(start + p.start * unitSec);
              return;
            }
            var snd = p.sound || bar.sound || 'drum';
            playSound(snd, start + p.start * unitSec, p.type === 'eighth' ? 0.45 : 0.65, bar.settings || { pitch: 0, echo: 0, bright: 50 });
            if (TYPES[p.type].twin) playSound(snd, start + p.start * unitSec + unitSec / 2, .32, bar.settings || { pitch: 0, echo: 0, bright: 50 });
          });
        });
      }

      if (creatorSetPetRhythm) {
        creatorSetPetRhythm.addEventListener('click', function () {
          var bar = creatorState.measures[creatorState.active];
          if (!bar || bar.placements.length === 0) {
            creatorNow.textContent = 'Añade notas al compás primero antes de asignarlo como firma sonora.';
            return;
          }
          petState.signatureRhythm = JSON.parse(JSON.stringify(bar));
          savePetStorage();
          confetti();
          fanfareSound();
          celebratePetWin();
          creatorNow.textContent = '✨ ¡Compás guardado como firma sonora de tu mascota!';
          showPetSpeech('¡Ahora tocaré este ritmo cuando me saludes! 🎶', 4000);
        });
      }

      /* — Añadido (Fase 1): firma sonora multi-compás (2 a 4 compases en secuencia) — */
      /* — Añadido (Fase 5): botón "Más opciones" del creador — */
      var creatorMoreToggle = document.getElementById('creatorMoreToggle');
      if (creatorMoreToggle) {
        creatorMoreToggle.addEventListener('click', function () {
          var box = document.getElementById('creatorMoreOptions');
          var abierto = !box.hidden;
          box.hidden = abierto;
          creatorMoreToggle.setAttribute('aria-expanded', String(!abierto));
          creatorMoreToggle.textContent = abierto ? '⋯ Más opciones' : '✕ Cerrar opciones';
        });
      }

      var creatorSetPetSignatureMulti = document.getElementById('creatorSetPetSignatureMulti');
      if (creatorSetPetSignatureMulti) {
        creatorSetPetSignatureMulti.addEventListener('click', function () {
          var bars = creatorState.measures.filter(function (bar) {
            return bar && bar.placements && bar.placements.length > 0;
          });
          if (bars.length < 2) {
            creatorNow.textContent = 'Pon notas en 2 o más compases y vuelve a pulsar: ¡tu mascota aprenderá la secuencia!';
            return;
          }
          petState.signatureRhythm = bars.map(function (bar) { return JSON.parse(JSON.stringify(bar)); });
          savePetStorage();
          confetti();
          fanfareSound();
          celebratePetWin();
          creatorNow.textContent = '✨ ¡Tus ' + bars.length + ' compases son la nueva firma sonora de tu mascota!';
          showPetSpeech('¡Aprenderé tu secuencia de ' + bars.length + ' compases! 🎶', 4000);
        });
      }

      /* — Añadido (Fase 2): escuchar los compases marcados en capas simultáneas — */
      var creatorPlayLayersBtn = document.getElementById('creatorPlayLayers');
      if (creatorPlayLayersBtn) {
        creatorPlayLayersBtn.addEventListener('click', function () {
          var marked = creatorState.measures.filter(function (bar, i) {
            return creatorLayers[i] && bar.placements.length > 0;
          });
          if (marked.length < 2) {
            creatorNow.textContent = 'Marca 2 o más compases con 🔀 (y ponles notas) para oírlos juntos.';
            return;
          }
          playLayersTogether(marked);
          creatorNow.textContent = '🎧 Sonando ' + marked.length + ' compases en capas simultáneas…';
        });
      }

      /* --- FASE 5: POLIFONÍA EN CREADOR --- */
      var creatorSoundPills = [
        { id: 'drum', label: '🥁 Bombo' },
        { id: 'snare', label: '💥 Caja' },
        { id: 'clap', label: '👏 Palmas' },
        { id: 'marimba', label: '🪵 Marimba' },
        { id: 'xylophone', label: '🔔 Xilófono' },
        { id: 'flute', label: '🎶 Flauta' },
        { id: 'bell', label: '✨ Campana' }
      ];
      creatorState.selectedSound = 'drum';

      function renderCreatorSoundPills() {
        var pillBar = document.getElementById('creatorSoundPillBar');
        if (!pillBar) return;
        pillBar.innerHTML = '';
        creatorSoundPills.forEach(function (sp) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'sound-pill-btn' + (creatorState.selectedSound === sp.id ? ' active' : '');
          btn.textContent = sp.label;
          btn.addEventListener('click', function () {
            creatorState.selectedSound = sp.id;
            renderCreatorSoundPills();
            var ctx = makeAudio();
            if (ctx) playSound(sp.id, ctx.currentTime + 0.02, 0.6, { pitch: 0, echo: 0, bright: 50 });
          });
          pillBar.appendChild(btn);
        });
      }
      renderCreatorSoundPills();

      /* --- FASE 5: BIBLIOTECA DE RITMOS --- */
      var rhythmLibraryModal = document.getElementById('rhythmLibraryModal');
      var rhythmLibraryList = document.getElementById('rhythmLibraryList');
      var creatorSaveToLibrary = document.getElementById('creatorSaveToLibrary');
      var creatorOpenLibrary = document.getElementById('creatorOpenLibrary');
      var rhythmLibraryCloseBtn = document.getElementById('rhythmLibraryCloseBtn');
      var rhythmLibraryCloseFooterBtn = document.getElementById('rhythmLibraryCloseFooterBtn');

      function getLibraryRhythms() {
        try {
          var raw = localStorage.getItem('compas_library_v1');
          return raw ? JSON.parse(raw) : [];
        } catch (e) {
          return [];
        }
      }

      function saveLibraryRhythms(list) {
        try {
          localStorage.setItem('compas_library_v1', JSON.stringify(list));
        } catch (e) {}
      }

      function renderLibrary() {
        if (!rhythmLibraryList) return;
        var list = getLibraryRhythms();
        rhythmLibraryList.innerHTML = '';
        if (list.length === 0) {
          rhythmLibraryList.innerHTML = '<div style="text-align:center; padding:24px 8px; color:var(--muted); font-weight:700;">Aún no tienes compases guardados.<br>Compón uno en el Creador y pulsa "💾 Guardar compás".</div>';
          return;
        }
        list.forEach(function (item, index) {
          var card = document.createElement('div');
          card.className = 'rhythm-item-card';
          var info = document.createElement('div');
          info.className = 'rhythm-item-info';
          info.innerHTML = '<h4 class="rhythm-item-title">' + (item.name || ('Compás ' + (index + 1))) + '</h4>' +
            '<div class="rhythm-item-meta">' + item.date + ' · ' + (item.bar ? item.bar.placements.length : 0) + ' figuras · Sonido: ' + (SOUNDS[item.bar ? item.bar.sound : 'drum'] ? SOUNDS[item.bar.sound].name : 'Acústico') + '</div>';
          
          var actions = document.createElement('div');
          actions.className = 'rhythm-item-actions';

          var playBtn = document.createElement('button');
          playBtn.className = 'btn-rhythm-load';
          playBtn.style.background = 'var(--green)';
          playBtn.style.borderColor = 'var(--green-deep)';
          playBtn.textContent = '▶';
          playBtn.title = 'Escuchar';
          playBtn.addEventListener('click', function () {
            playCustomRhythm(item.bar);
          });

          var loadBtn = document.createElement('button');
          loadBtn.className = 'btn-rhythm-load';
          loadBtn.textContent = '📥 Cargar';
          loadBtn.title = 'Cargar en compás activo';
          loadBtn.addEventListener('click', function () {
            if (item.bar && creatorState.measures[creatorState.active]) {
              creatorState.measures[creatorState.active] = JSON.parse(JSON.stringify(item.bar));
              renderCreator();
              rhythmLibraryModal.style.display = 'none';
              creatorNow.textContent = '¡Cargado "' + item.name + '" en el Compás ' + (creatorState.active + 1) + '!';
            }
          });

          var addSongBtn = document.createElement('button');
          addSongBtn.className = 'btn-rhythm-load';
          addSongBtn.style.background = '#8b5cf6';
          addSongBtn.style.borderColor = '#6d28d9';
          addSongBtn.textContent = '🎼 + Canción';
          addSongBtn.title = 'Añadir a la línea de tiempo de la canción';
          addSongBtn.addEventListener('click', function () {
            addBarToSong(item.bar, item.name);
            rhythmLibraryModal.style.display = 'none';
            creatorNow.textContent = '¡Añadido "' + item.name + '" al Cancionero!';
          });

          /* — Añadido (Fase 1): asignar directo como firma sonora de la mascota — */
          var petBtn = document.createElement('button');
          petBtn.className = 'btn-rhythm-load';
          petBtn.style.background = 'var(--cyan)';
          petBtn.style.borderColor = '#0e8a83';
          petBtn.textContent = '🐾 Mascota';
          petBtn.title = 'Asignar como firma sonora de tu mascota';
          petBtn.addEventListener('click', function () {
            if (item.bar && item.bar.placements && item.bar.placements.length) {
              petState.signatureRhythm = JSON.parse(JSON.stringify(item.bar));
              savePetStorage();
              confetti();
              fanfareSound();
              celebratePetWin();
              rhythmLibraryModal.style.display = 'none';
              creatorNow.textContent = '✨ "' + (item.name || 'Compás') + '" es ahora la firma sonora de tu mascota.';
              showPetSpeech('¡Tocaré "' + (item.name || 'tu compás') + '" cuando me saludes! 🎶', 4000);
            }
          });

          var delBtn = document.createElement('button');
          delBtn.className = 'btn-rhythm-delete';
          delBtn.textContent = '🗑️';
          delBtn.title = 'Eliminar';
          delBtn.addEventListener('click', function () {
            list.splice(index, 1);
            saveLibraryRhythms(list);
            renderLibrary();
          });

          actions.appendChild(playBtn);
          actions.appendChild(loadBtn);
          actions.appendChild(addSongBtn);
          actions.appendChild(petBtn);
          actions.appendChild(delBtn);

          card.appendChild(info);
          card.appendChild(actions);
          rhythmLibraryList.appendChild(card);
        });
      }

      if (creatorSaveToLibrary) {
        creatorSaveToLibrary.addEventListener('click', function () {
          if (!isModeUnlocked('library')) {
            notifyModeLocked('library');
            return;
          }
          var bar = creatorState.measures[creatorState.active];
          if (!bar || bar.placements.length === 0) {
            creatorNow.textContent = 'Añade notas al compás antes de guardarlo.';
            return;
          }
          var defaultName = 'Ritmo ' + (getLibraryRhythms().length + 1) + ' (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')';
          var list = getLibraryRhythms();
          list.unshift({
            id: Date.now(),
            name: defaultName,
            date: new Date().toLocaleDateString(),
            bar: JSON.parse(JSON.stringify(bar))
          });
          saveLibraryRhythms(list);
          confetti();
          creatorNow.textContent = '💾 ¡Compás guardado en tu biblioteca como "' + defaultName + '"!';
        });
      }

      if (creatorOpenLibrary) {
        creatorOpenLibrary.addEventListener('click', function () {
          if (!isModeUnlocked('library')) {
            notifyModeLocked('library');
            return;
          }
          renderLibrary();
          if (rhythmLibraryModal) rhythmLibraryModal.style.display = 'flex';
        });
      }
      if (rhythmLibraryCloseBtn) {
        rhythmLibraryCloseBtn.addEventListener('click', function () {
          if (rhythmLibraryModal) rhythmLibraryModal.style.display = 'none';
        });
      }
      if (rhythmLibraryCloseFooterBtn) {
        rhythmLibraryCloseFooterBtn.addEventListener('click', function () {
          if (rhythmLibraryModal) rhythmLibraryModal.style.display = 'none';
        });
      }

      /* --- FASE 5: CANCIONERO (HASTA 2 MINUTOS CON TEMPO VARIABLE) --- */
      var songState = {
        sequence: [],
        bpm: 110,
        isPlaying: false,
        stopSignal: false
      };

      var songTimeline = document.getElementById('songTimeline');
      var songBpmSlider = document.getElementById('songBpmSlider');
      var songBpmVal = document.getElementById('songBpmVal');
      var songDurationTag = document.getElementById('songDurationTag');
      var songClearTimelineBtn = document.getElementById('songClearTimelineBtn');
      var songPlayBtn = document.getElementById('songPlayBtn');
      var songExportMp3Btn = document.getElementById('songExportMp3Btn');
      var songExportMp4Btn = document.getElementById('songExportMp4Btn');
      var creatorExportMp3 = document.getElementById('creatorExportMp3');
      var creatorExportMp4 = document.getElementById('creatorExportMp4');

      function updateSongDuration() {
        if (!songDurationTag) return;
        var barSeconds = (4 * 60) / songState.bpm;
        var totalSec = Math.round(songState.sequence.length * barSeconds);
        var mins = Math.floor(totalSec / 60);
        var secs = totalSec % 60;
        var timeStr = mins + ':' + (secs < 10 ? '0' : '') + secs;
        songDurationTag.textContent = 'Duración: ' + timeStr + ' (' + songState.sequence.length + ' compases / máx 60)';
      }

      function renderSongTimeline() {
        if (!songTimeline) return;
        songTimeline.innerHTML = '';
        if (songState.sequence.length === 0) {
          songTimeline.innerHTML = '<span style="font-size:0.85rem; color:var(--muted); font-weight:700; margin:auto;">La línea de tiempo está vacía. Añade C1, C2, C3, C4 o compases de tu biblioteca.</span>';
          updateSongDuration();
          return;
        }
        songState.sequence.forEach(function (item, idx) {
          var block = document.createElement('div');
          block.className = 'song-block-item';
          block.id = 'songBlock_' + idx;
          block.innerHTML = '<span>' + (item.label || ('C' + (idx + 1))) + '</span><span style="font-size:0.65rem; color:var(--muted);">' + (item.bar ? item.bar.placements.length : 0) + ' fig</span>';
          
          var rmBtn = document.createElement('button');
          rmBtn.className = 'remove-block';
          rmBtn.textContent = '×';
          rmBtn.title = 'Quitar';
          rmBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            songState.sequence.splice(idx, 1);
            renderSongTimeline();
          });
          block.appendChild(rmBtn);

          block.addEventListener('click', function () {
            playCustomRhythm(item.bar);
          });
          songTimeline.appendChild(block);
        });
        updateSongDuration();
      }

      function addBarToSong(bar, label) {
        if (songState.sequence.length >= 60) {
          creatorNow.textContent = 'Has alcanzado el límite máximo de 60 compases (aprox. 2 minutos).';
          return;
        }
        songState.sequence.push({
          label: label,
          bar: JSON.parse(JSON.stringify(bar))
        });
        renderSongTimeline();
      }

      document.querySelectorAll('.btn-song-add-slot').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var barIdx = parseInt(btn.getAttribute('data-bar'), 10);
          var bar = creatorState.measures[barIdx];
          if (!bar || bar.placements.length === 0) {
            creatorNow.textContent = 'Compás ' + (barIdx + 1) + ' está vacío. Añade figuras antes de incluirlo.';
            return;
          }
          addBarToSong(bar, 'C' + (barIdx + 1));
        });
      });

      if (songClearTimelineBtn) {
        songClearTimelineBtn.addEventListener('click', function () {
          songState.sequence = [];
          renderSongTimeline();
        });
      }

      if (songBpmSlider) {
        songBpmSlider.addEventListener('input', function () {
          songState.bpm = Number(songBpmSlider.value);
          if (songBpmVal) songBpmVal.textContent = songState.bpm + ' BPM';
          updateSongDuration();
        });
      }

      function playSong() {
        if (songState.isPlaying) {
          songState.stopSignal = true;
          return;
        }
        if (songState.sequence.length === 0) {
          creatorNow.textContent = 'Añade compases a la canción antes de reproducir.';
          return;
        }
        var ctx = makeAudio();
        if (!ctx) return;

        songState.isPlaying = true;
        songState.stopSignal = false;
        if (songPlayBtn) songPlayBtn.textContent = '⏹ Detener Canción';
        var pulseSec = 60 / songState.bpm / 2; // octavo de compás (4/4 = 8 unidades)
        var barSec = pulseSec * 8;
        var start = ctx.currentTime + 0.1;

        songState.sequence.forEach(function (item, sIdx) {
          var barStart = start + sIdx * barSec;
          item.bar.placements.forEach(function (p) {
            if (TYPES[p.type] && TYPES[p.type].silent) return;
            var offset = barStart + p.start * pulseSec;
            var snd = p.sound || item.bar.sound || 'drum';
            playSound(snd, offset, p.type === 'eighth' ? 0.45 : 0.65, item.bar.settings || { pitch: 0, echo: 0, bright: 50 });
          });

          // Animación visual de bloque activo
          setTimeout(function () {
            if (songState.stopSignal) return;
            document.querySelectorAll('.song-block-item').forEach(function (el) { el.classList.remove('active-playing'); });
            var blk = document.getElementById('songBlock_' + sIdx);
            if (blk) blk.classList.add('active-playing');
          }, (sIdx * barSec) * 1000);
        });

        var totalMs = (songState.sequence.length * barSec) * 1000;
        setTimeout(function () {
          songState.isPlaying = false;
          if (songPlayBtn) songPlayBtn.textContent = '▶ Reproducir Canción';
          document.querySelectorAll('.song-block-item').forEach(function (el) { el.classList.remove('active-playing'); });
          creatorNow.textContent = '¡Canción finalizada!';
        }, totalMs + 300);
      }

      if (songPlayBtn) songPlayBtn.addEventListener('click', playSong);

      /* --- EXPORTACIÓN DUAL MP3 / MP4 --- */
      function downloadBlob(blob, filename) {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
      }

      function buildSongWavBlob(measuresList, bpm) {
        var rate = 22050;
        var unitSec = (60 / bpm) / 2;
        var totalSec = measuresList.length * 8 * unitSec + 0.8;
        var samples = new Float32Array(Math.ceil(totalSec * rate));

        measuresList.forEach(function (bar, barIndex) {
          bar.placements.forEach(function (p, eventIndex) {
            if (TYPES[p.type] && TYPES[p.type].silent) return;
            var startSample = Math.floor((barIndex * 8 + p.start) * unitSec * rate);
            var snd = p.sound || bar.sound || 'drum';
            var duration = (SOUNDS[snd] && SOUNDS[snd].melodic) ? 0.75 : 0.4;
            var count = Math.floor(duration * rate);
            var settings = bar.settings || { pitch: 0, echo: 0, bright: 50 };
            for (var j = 0; j < count && startSample + j < samples.length; j++) {
              var val = synthSample(snd, j / rate, settings, eventIndex + startSample);
              samples[startSample + j] += val;
            }
          });
        });

        var buffer = new ArrayBuffer(44 + samples.length * 2);
        var view = new DataView(buffer);
        function writeStr(offset, str) { for (var i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i)); }
        writeStr(0, 'RIFF'); view.setUint32(4, 36 + samples.length * 2, true); writeStr(8, 'WAVE'); writeStr(12, 'fmt ');
        view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true); view.setUint32(24, rate, true); view.setUint32(28, rate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true); writeStr(36, 'data'); view.setUint32(40, samples.length * 2, true);
        for (var s = 0; s < samples.length; s++) {
          var val = Math.max(-1, Math.min(1, samples[s]));
          view.setInt16(44 + s * 2, val < 0 ? val * 32768 : val * 32767, true);
        }
        return new Blob([view], { type: 'audio/mp3' });
      }

      if (creatorExportMp3) {
        creatorExportMp3.addEventListener('click', function () {
          var hasNotes = creatorState.measures.some(function (b) { return b.placements.length > 0; });
          if (!hasNotes) { creatorNow.textContent = 'Añade notas al compás primero.'; return; }
          var blob = buildSongWavBlob(creatorState.measures, 110);
          downloadBlob(blob, 'mi-ritmo-ED-Dev.mp3');
          creatorNow.textContent = '🎵 ¡Audio MP3 descargado exitosamente!';
        });
      }

      if (songExportMp3Btn) {
        songExportMp3Btn.addEventListener('click', function () {
          if (songState.sequence.length === 0) { creatorNow.textContent = 'Añade compases a la canción primero.'; return; }
          var bars = songState.sequence.map(function (s) { return s.bar; });
          var blob = buildSongWavBlob(bars, songState.bpm);
          downloadBlob(blob, 'mi-cancion-completa-ED-Dev.mp3');
          creatorNow.textContent = '🎵 ¡Canción completa MP3 descargada!';
        });
      }

      function recordAnimatedMp4(measuresList, bpm, filename, onDone) {
        var canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 640;
        var ctx2d = canvas.getContext('2d');
        var unitSec = (60 / bpm) / 2;
        var totalSec = Math.min(measuresList.length * 8 * unitSec + 0.5, 120);

        var stream = canvas.captureStream(30);
        var mime = (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('video/mp4')) ? 'video/mp4' : 'video/webm';
        var recorder = new MediaRecorder(stream, { mimeType: mime });
        var chunks = [];

        recorder.ondataavailable = function (e) { if (e.data.size > 0) chunks.push(e.data); };
        recorder.onstop = function () {
          var blob = new Blob(chunks, { type: mime });
          downloadBlob(blob, filename);
          if (onDone) onDone();
        };

        recorder.start();
        var startTime = performance.now();
        var animId;

        function drawFrame(now) {
          var elapsedSec = (now - startTime) / 1000;
          if (elapsedSec >= totalSec) {
            cancelAnimationFrame(animId);
            recorder.stop();
            return;
          }

          // Background
          var grad = ctx2d.createRadialGradient(320, 320, 40, 320, 320, 400);
          grad.addColorStop(0, '#1e1b4b');
          grad.addColorStop(1, '#09090b');
          ctx2d.fillStyle = grad;
          ctx2d.fillRect(0, 0, 640, 640);

          // Title & Math info
          ctx2d.fillStyle = '#f8fafc';
          ctx2d.font = 'bold 24px sans-serif';
          ctx2d.textAlign = 'center';
          ctx2d.fillText('Completa el compás · ED-Dev', 320, 50);

          var curBarIdx = Math.floor(elapsedSec / (8 * unitSec));
          curBarIdx = Math.min(curBarIdx, measuresList.length - 1);
          var curUnit = Math.floor((elapsedSec % (8 * unitSec)) / unitSec);

          ctx2d.font = '18px sans-serif';
          ctx2d.fillStyle = '#38bdf8';
          ctx2d.fillText('Compás ' + (curBarIdx + 1) + ' / ' + measuresList.length + ' · Pulso ' + (curUnit + 1) + ' / 8', 320, 85);

          // Draw Rotating Wheel
          var cx = 320, cy = 320, radius = 180;
          var angleRot = elapsedSec * 1.2;
          ctx2d.save();
          ctx2d.translate(cx, cy);
          ctx2d.rotate(angleRot);

          for (var u = 0; u < 8; u++) {
            var aStart = (u / 8) * Math.PI * 2;
            var aEnd = ((u + 1) / 8) * Math.PI * 2;
            ctx2d.beginPath();
            ctx2d.moveTo(0, 0);
            ctx2d.arc(0, 0, radius, aStart, aEnd);
            ctx2d.closePath();
            ctx2d.fillStyle = (u === curUnit) ? '#fef08a' : ((u % 2 === 0) ? '#334155' : '#1e293b');
            ctx2d.fill();
            ctx2d.strokeStyle = '#0284c7';
            ctx2d.lineWidth = 3;
            ctx2d.stroke();
          }

          // Center badge
          ctx2d.beginPath();
          ctx2d.arc(0, 0, 60, 0, Math.PI * 2);
          ctx2d.fillStyle = '#0284c7';
          ctx2d.fill();
          ctx2d.restore();

          // Center text
          ctx2d.fillStyle = '#ffffff';
          ctx2d.font = 'bold 22px sans-serif';
          ctx2d.textAlign = 'center';
          ctx2d.fillText('4/4 = 1', cx, cy + 8);

          // Dancing Pet Avatar text & XP
          ctx2d.font = 'bold 20px sans-serif';
          ctx2d.fillStyle = '#f59e0b';
          ctx2d.fillText('🐾 ' + getPetDisplayName(petState.id) + ' (' + COMPAS.stageName(petState.stage) + ')', 320, 560);

          ctx2d.font = '14px sans-serif';
          ctx2d.fillStyle = '#94a3b8';
          ctx2d.fillText('Matemática sensorial con fracciones y ritmo', 320, 595);

          animId = requestAnimationFrame(drawFrame);
        }

        animId = requestAnimationFrame(drawFrame);
      }

      if (creatorExportMp4) {
        creatorExportMp4.addEventListener('click', function () {
          var hasNotes = creatorState.measures.some(function (b) { return b.placements.length > 0; });
          if (!hasNotes) { creatorNow.textContent = 'Añade notas al compás primero.'; return; }
          creatorNow.textContent = '🎬 Generando video animado MP4... Por favor espera unos segundos.';
          recordAnimatedMp4(creatorState.measures, 110, 'mi-ritmo-animado-ED-Dev.mp4', function () {
            creatorNow.textContent = '🎬 ¡Video MP4 generado y descargado!';
            confetti();
          });
        });
      }

      if (songExportMp4Btn) {
        songExportMp4Btn.addEventListener('click', function () {
          if (songState.sequence.length === 0) { creatorNow.textContent = 'Añade compases a la canción primero.'; return; }
          creatorNow.textContent = '🎬 Renderizando video animado de la canción completa...';
          var bars = songState.sequence.map(function (s) { return s.bar; });
          recordAnimatedMp4(bars, songState.bpm, 'mi-cancion-animada-ED-Dev.mp4', function () {
            creatorNow.textContent = '🎬 ¡Video MP4 de la canción descargado!';
            confetti();
          });
        });
      }

      /* --- FASE 6: ACADEMIA MATEMÁTICA & ÁLGEBRA LINEAL RÍTMICA --- */
      var mathAcademyModal = document.getElementById('mathAcademyModal');
      var mathAcademyContent = document.getElementById('mathAcademyContent');
      var mathAcademyCloseBtn = document.getElementById('mathAcademyCloseBtn');
      var mathAcademyCloseFooterBtn = document.getElementById('mathAcademyCloseFooterBtn');

      var mathAcademyLessons = {
        suma: {
          title: '➕ Suma de Fracciones con Distinto Denominador',
          html: '<p style="font-size:0.92rem; font-weight:700;">Para sumar dos tiempos con distinto denominador (ej. 1/2 blanca + 1/4 negra), buscamos el mínimo común múltiplo subdividiendo el compás en partes iguales:</p>' +
            '<div class="math-equation-display">1/2 + 1/4 = 2/4 + 1/4 = 3/4 (o 6/8 de compás)</div>' +
            '<p style="font-size:0.85rem; color:var(--muted); font-weight:700;">En la pizza rítmica, la blanca cubre la mitad (4 octavos) y la negra cubre un cuarto (2 octavos). Juntas ocupan 6 de los 8 trozos.</p>' +
            '<button class="math-action-btn" id="mathPlaySumaBtn" type="button">🔊 Escuchar y ver la suma</button>'
        },
        resta: {
          title: '➖ Resta de Fracciones y Silencios Rítmicos',
          html: '<p style="font-size:0.92rem; font-weight:700;">Restar sonido equivale a introducir silencios obligatorios para balancear la métrica:</p>' +
            '<div class="math-equation-display">1 entero − 3/8 = 5/8 (Quedan 5 octavos de sonido)</div>' +
            '<p style="font-size:0.85rem; color:var(--muted); font-weight:700;">El compás de 4/4 necesita completarse siempre. Los silencios valen cero en sonido pero ocupan espacio real en la pizza rítmica.</p>' +
            '<button class="math-action-btn" id="mathPlayRestaBtn" type="button">🔊 Escuchar resta con silencio</button>'
        },
        multi: {
          title: '✖️ Multiplicación de Fracciones: Subdivisión Rítmica',
          html: '<p style="font-size:0.92rem; font-weight:700;">Multiplicar una fracción por otra significa tomar una porción de una porción:</p>' +
            '<div class="math-equation-display">1/2 × 1/4 = 1/8 ("La mitad de una negra es una corchea")</div>' +
            '<p style="font-size:0.85rem; color:var(--muted); font-weight:700;">Cada vez que duplicamos la velocidad de una figura musical, dividimos a la mitad su valor fraccionario temporal.</p>' +
            '<button class="math-action-btn" id="mathPlayMultiBtn" type="button">🔊 Escuchar subdivisión 1/4 a 1/8</button>'
        },
        div: {
          title: '➗ División de Fracciones: Reparto Temporal',
          html: '<p style="font-size:0.92rem; font-weight:700;">La división responde a la pregunta: ¿cuántas figuras caben exactamente en un espacio?</p>' +
            '<div class="math-equation-display">1/2 ÷ 1/8 = 4 (Caben 4 corcheas en media redonda)</div>' +
            '<p style="font-size:0.85rem; color:var(--muted); font-weight:700;">4 corcheas (4 × 1/8 = 4/8 = 1/2) llenan con precisión la mitad del compás.</p>' +
            '<button class="math-action-btn" id="mathPlayDivBtn" type="button">🔊 Escuchar las 4 partes repartidas</button>'
        },
        algebra: {
          title: '📊 Álgebra Lineal Rítmica: Vectores y Matrices de Modulación',
          html: '<p style="font-size:0.92rem; font-weight:700;">Un compás de 8 pulsos puede representarse rigurosamente como un vector de estados en <strong>R^8</strong>:</p>' +
            '<div class="math-equation-display">v = [ 1, 0, 1, 0, 0, 1, 1, 0 ]^T</div>' +
            '<p style="font-size:0.85rem; font-weight:700;">Donde 1 representa un golpe y 0 un silencio o prolongación.</p>' +
            '<div style="background:var(--surface); border:2px solid var(--line); border-radius:12px; padding:10px; margin:10px 0;">' +
              '<h4 style="margin:0 0 6px;">Transformaciones Matriciales:</h4>' +
              '<ul style="margin:0; padding-left:18px; font-size:0.85rem; font-weight:700;">' +
                '<li><strong>Matriz de Retrogradación (Inversión J):</strong> Invierte el orden temporal del ritmo (tocar hacia atrás).</li>' +
                '<li><strong>Matriz de Permutación Cíclica (P_k):</strong> Desplaza o rota los acentos k pulsos en el compás.</li>' +
              '</ul>' +
            '</div>' +
            '<div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">' +
              '<button class="math-action-btn" id="algebraApplyJBtn" type="button">🔄 Aplicar Matriz J (Inversión)</button>' +
              '<button class="math-action-btn" id="algebraApplyPBtn" type="button" style="background:var(--blue); border-color:var(--blue-deep);">🌀 Aplicar Matriz P2 (Rotar)</button>' +
            '</div>'
        }
      };

      var algebraCurrentVector = [1, 0, 1, 0, 0, 1, 1, 0];

      function renderMathAcademyTab(tabKey) {
        document.querySelectorAll('.math-academy-tab').forEach(function (t) {
          t.classList.toggle('active', t.getAttribute('data-tab') === tabKey);
        });
        var data = mathAcademyLessons[tabKey] || mathAcademyLessons.suma;
        if (mathAcademyContent) {
          mathAcademyContent.innerHTML = '<h3 style="margin:0 0 8px; font-family:&quot;Baloo 2&quot;,sans-serif; color:var(--blue-deep);">' + data.title + '</h3>' + data.html;

          // Wire up tab audio buttons
          var btnSuma = document.getElementById('mathPlaySumaBtn');
          if (btnSuma) btnSuma.addEventListener('click', function () {
            var ctx = makeAudio();
            if (!ctx) return;
            var t0 = ctx.currentTime + 0.05;
            playSound('marimba', t0, 0.7, { pitch: 0, echo: 0, bright: 50 }); // 1/2
            playSound('marimba', t0 + 0.7, 0.6, { pitch: 4, echo: 0, bright: 60 }); // 1/4
            confetti();
            rewardAcademyCoins();
          });

          var btnResta = document.getElementById('mathPlayRestaBtn');
          if (btnResta) btnResta.addEventListener('click', function () {
            var ctx = makeAudio();
            if (!ctx) return;
            var t0 = ctx.currentTime + 0.05;
            for (var i = 0; i < 5; i++) {
              playSound('drum', t0 + i * 0.22, 0.6, { pitch: 0, echo: 0, bright: 50 });
            }
            confetti();
            rewardAcademyCoins();
          });

          var btnMulti = document.getElementById('mathPlayMultiBtn');
          if (btnMulti) btnMulti.addEventListener('click', function () {
            var ctx = makeAudio();
            if (!ctx) return;
            var t0 = ctx.currentTime + 0.05;
            playSound('bell', t0, 0.8, { pitch: 0, echo: 0, bright: 50 });
            playSound('xylophone', t0 + 0.5, 0.5, { pitch: 5, echo: 0, bright: 60 });
            playSound('xylophone', t0 + 0.75, 0.5, { pitch: 7, echo: 0, bright: 60 });
            confetti();
            rewardAcademyCoins();
          });

          var btnDiv = document.getElementById('mathPlayDivBtn');
          if (btnDiv) btnDiv.addEventListener('click', function () {
            var ctx = makeAudio();
            if (!ctx) return;
            var t0 = ctx.currentTime + 0.05;
            for (var k = 0; k < 4; k++) {
              playSound('xylophone', t0 + k * 0.18, 0.6, { pitch: k * 2, echo: 0, bright: 50 });
            }
            confetti();
            rewardAcademyCoins();
          });

          var btnJ = document.getElementById('algebraApplyJBtn');
          if (btnJ) btnJ.addEventListener('click', function () {
            algebraCurrentVector.reverse();
            var ctx = makeAudio();
            if (ctx) {
              var t0 = ctx.currentTime + 0.05;
              algebraCurrentVector.forEach(function (val, idx) {
                if (val === 1) playSound('snare', t0 + idx * 0.16, 0.6, { pitch: 2, echo: 0, bright: 60 });
              });
            }
            confetti();
            rewardAcademyCoins();
          });

          var btnP = document.getElementById('algebraApplyPBtn');
          if (btnP) btnP.addEventListener('click', function () {
            var item = algebraCurrentVector.pop();
            algebraCurrentVector.unshift(item);
            var ctx = makeAudio();
            if (ctx) {
              var t0 = ctx.currentTime + 0.05;
              algebraCurrentVector.forEach(function (val, idx) {
                if (val === 1) playSound('marimba', t0 + idx * 0.16, 0.6, { pitch: idx, echo: 0, bright: 60 });
              });
            }
            confetti();
            rewardAcademyCoins();
          });
        }
      }

      function rewardAcademyCoins() {
        petState.coins = (petState.coins || 0) + 5;
        savePetStorage();
        updatePetWidget();
        var tag = document.getElementById('mathAcademyRewardTag');
        if (tag) tag.textContent = '🎉 ¡Excelente! +5 🪙 acumuladas (Total: ' + petState.coins + ')';
      }

      function openMathAcademy() {
        if (!isModeUnlocked('academy')) {
          notifyModeLocked('academy');
          return;
        }
        renderMathAcademyTab('suma');
        if (mathAcademyModal) mathAcademyModal.style.display = 'flex';
      }

      document.querySelectorAll('.math-academy-tab').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var key = btn.getAttribute('data-tab');
          renderMathAcademyTab(key);
        });
      });

      ['showAcademy', 'mapShowAcademy', 'creatorShowAcademy', 'duoShowAcademy', 'simonShowAcademy', 'marketShowAcademy', 'stallShowAcademy'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('click', openMathAcademy);
      });

      if (mathAcademyCloseBtn) mathAcademyCloseBtn.addEventListener('click', function () {
        if (mathAcademyModal) mathAcademyModal.style.display = 'none';
      });
      if (mathAcademyCloseFooterBtn) mathAcademyCloseFooterBtn.addEventListener('click', function () {
        if (mathAcademyModal) mathAcademyModal.style.display = 'none';
      });

      /* --- FASE 7: VIDEO DIDÁCTICO EN GUÍA DOCENTE --- */
      var teacherPlayVideoBtn = document.getElementById('teacherPlayVideoBtn');
      var teacherDownloadVideoMp4 = document.getElementById('teacherDownloadVideoMp4');
      var teacherVideoCanvas = document.getElementById('teacherVideoCanvas');

      function drawTeacherGuideFrame(ctx, step) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, 600, 340);

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Neurociencia y Matemática del Compás', 300, 36);

        var cx = 300, cy = 170, radius = 95;
        var labels = ['1 (Redonda)', '1/2 (Blanca)', '1/4 (Negra)', '1/8 (Corchea)'];
        var divisions = [1, 2, 4, 8];
        var divCount = divisions[step % 4];

        for (var i = 0; i < divCount; i++) {
          var a1 = (i / divCount) * Math.PI * 2 - Math.PI / 2;
          var a2 = ((i + 1) / divCount) * Math.PI * 2 - Math.PI / 2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.arc(cx, cy, radius, a1, a2);
          ctx.closePath();
          ctx.fillStyle = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b'][i % 4];
          ctx.fill();
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText('Etapa: ' + labels[step % 4], 300, 290);
        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('El pulso musical ancla la relación de proporcionalidad espacial y auditiva.', 300, 315);
      }

      if (teacherPlayVideoBtn && teacherVideoCanvas) {
        var tCtx = teacherVideoCanvas.getContext('2d');
        drawTeacherGuideFrame(tCtx, 0);

        teacherPlayVideoBtn.addEventListener('click', function () {
          var step = 0;
          var timer = setInterval(function () {
            step++;
            drawTeacherGuideFrame(tCtx, step);
            var audioCtx = makeAudio();
            if (audioCtx) playSound('bell', audioCtx.currentTime + 0.02, 0.4, { pitch: step * 2, echo: 0, bright: 50 });
            if (step >= 8) clearInterval(timer);
          }, 900);
        });
      }

      if (teacherDownloadVideoMp4 && teacherVideoCanvas) {
        teacherDownloadVideoMp4.addEventListener('click', function () {
          var stream = teacherVideoCanvas.captureStream(30);
          var mime = (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('video/mp4')) ? 'video/mp4' : 'video/webm';
          var rec = new MediaRecorder(stream, { mimeType: mime });
          var chunks = [];
          rec.ondataavailable = function (e) { if (e.data.size > 0) chunks.push(e.data); };
          rec.onstop = function () {
            downloadBlob(new Blob(chunks, { type: mime }), 'guia-docente-video-fracciones.mp4');
            confetti();
          };
          rec.start();
          var step = 0;
          var tCtx = teacherVideoCanvas.getContext('2d');
          var interval = setInterval(function () {
            step++;
            drawTeacherGuideFrame(tCtx, step);
            if (step >= 10) {
              clearInterval(interval);
              rec.stop();
            }
          }, 600);
        });
      }

      /* --- FASE 8: SALAS MULTIJUGADOR ONLINE EN TIEMPO REAL (CÓDIGO PIN) --- */
      var tabOnline = document.getElementById('tabOnline');
      var duoOnlinePane = document.getElementById('duoOnlinePane');
      var onlineLobbyView = document.getElementById('onlineLobbyView');
      var onlineRoomActiveView = document.getElementById('onlineRoomActiveView');
      var onlineCreateRoomBtn = document.getElementById('onlineCreateRoomBtn');
      var onlineJoinRoomBtn = document.getElementById('onlineJoinRoomBtn');
      var onlineJoinPinInput = document.getElementById('onlineJoinPinInput');
      var onlineActivePinDisplay = document.getElementById('onlineActivePinDisplay');
      var onlineCopyPinBtn = document.getElementById('onlineCopyPinBtn');
      var onlineShareWhatsAppBtn = document.getElementById('onlineShareWhatsAppBtn');
      var onlineLeaveRoomBtn = document.getElementById('onlineLeaveRoomBtn');
      var onlineRoomStatusText = document.getElementById('onlineRoomStatusText');
      var onlineP1NameDisplay = document.getElementById('onlineP1NameDisplay');
      var onlineP2NameDisplay = document.getElementById('onlineP2NameDisplay');
      var onlineP1AvatarWrap = document.getElementById('onlineP1AvatarWrap');
      var onlineP2AvatarWrap = document.getElementById('onlineP2AvatarWrap');
      var onlineRoomModeSelect = document.getElementById('onlineRoomModeSelect');
      var onlineGameHint = document.getElementById('onlineGameHint');

      var onlineState = {
        channel: null,
        pin: null,
        isHost: false,
        mode: 'duel',
        connected: false
      };

      function generatePin() {
        var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        var pin = '';
        for (var i = 0; i < 4; i++) {
          pin += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return pin;
      }

      function initOnlineRoom(pin, isHost, mode) {
        onlineState.pin = pin;
        onlineState.isHost = isHost;
        onlineState.mode = mode || 'duel';
        onlineState.connected = false;

        if (onlineActivePinDisplay) onlineActivePinDisplay.textContent = pin;
        if (onlineLobbyView) onlineLobbyView.style.display = 'none';
        if (onlineRoomActiveView) onlineRoomActiveView.style.display = 'block';

        if (onlineP1AvatarWrap) onlineP1AvatarWrap.innerHTML = getPetSvg(petState.id, petState.stage, 52);
        if (onlineP1NameDisplay) onlineP1NameDisplay.textContent = getPetDisplayName(petState.id);

        if (isHost) {
          if (onlineRoomStatusText) {
            onlineRoomStatusText.className = 'online-status-badge waiting';
            onlineRoomStatusText.textContent = '⏳ Sala creada. Esperando al Jugador 2...';
          }
          if (onlineP2NameDisplay) onlineP2NameDisplay.textContent = 'Esperando rival...';
        }

        // Setup real-time BroadcastChannel & localStorage sync
        var channelName = 'compas_room_' + pin;
        if (onlineState.channel) {
          try { onlineState.channel.close(); } catch (e) {}
        }
        if (typeof BroadcastChannel !== 'undefined') {
          onlineState.channel = new BroadcastChannel(channelName);
          onlineState.channel.onmessage = function (event) {
            handleOnlineMessage(event.data);
          };
        }

        // Announce presence
        broadcastOnlineMessage({
          type: isHost ? 'HOST_ANNOUNCE' : 'GUEST_JOIN',
          pin: pin,
          mode: onlineState.mode,
          name: getPetDisplayName(petState.id),
          petId: petState.id,
          stage: petState.stage
        });
      }

      function broadcastOnlineMessage(data) {
        if (onlineState.channel) {
          onlineState.channel.postMessage(data);
        }
        // LocalStorage event sync fallback
        try {
          localStorage.setItem('compas_sync_' + onlineState.pin, JSON.stringify({ data: data, time: Date.now() }));
        } catch (e) {}
      }

      window.addEventListener('storage', function (e) {
        if (onlineState.pin && e.key === 'compas_sync_' + onlineState.pin && e.newValue) {
          try {
            var parsed = JSON.parse(e.newValue);
            if (parsed && parsed.data) handleOnlineMessage(parsed.data);
          } catch (err) {}
        }
      });

      function handleOnlineMessage(msg) {
        if (!msg || msg.pin !== onlineState.pin) return;
        if (msg.type === 'GUEST_JOIN' && onlineState.isHost) {
          onlineState.connected = true;
          if (onlineRoomStatusText) {
            onlineRoomStatusText.className = 'online-status-badge connected';
            onlineRoomStatusText.textContent = '🟢 ¡Jugador 2 conectado en vivo!';
          }
          if (onlineP2NameDisplay) onlineP2NameDisplay.textContent = msg.name;
          if (onlineP2AvatarWrap) onlineP2AvatarWrap.innerHTML = getPetSvg(msg.petId || 'bumbo', msg.stage || 1, 52);
          if (onlineGameHint) onlineGameHint.innerHTML = '¡Ambos jugadores listos! Modo: <strong>' + (onlineState.mode === 'duel' ? '⚔️ Duelo Rítmico' : '🤝 Compás Cooperativo') + '</strong>.';
          fanfareSound();
          confetti();

          // Acknowledge to guest
          broadcastOnlineMessage({
            type: 'HOST_ACK',
            pin: onlineState.pin,
            mode: onlineState.mode,
            name: getPetDisplayName(petState.id),
            petId: petState.id,
            stage: petState.stage
          });
        } else if (msg.type === 'HOST_ACK' && !onlineState.isHost) {
          onlineState.connected = true;
          if (onlineRoomStatusText) {
            onlineRoomStatusText.className = 'online-status-badge connected';
            onlineRoomStatusText.textContent = '🟢 ¡Conectado al Anfitrión!';
          }
          if (onlineP2NameDisplay) onlineP2NameDisplay.textContent = msg.name;
          if (onlineP2AvatarWrap) onlineP2AvatarWrap.innerHTML = getPetSvg(msg.petId || 'bumbo', msg.stage || 1, 52);
          if (onlineGameHint) onlineGameHint.innerHTML = '¡Conectado! Modo: <strong>' + (msg.mode === 'duel' ? '⚔️ Duelo Rítmico' : '🤝 Compás Cooperativo') + '</strong>.';
          fanfareSound();
          confetti();
        }
      }

      if (tabOnline) {
        tabOnline.addEventListener('click', function () {
          if (tabCoop) tabCoop.classList.remove('active');
          if (tabDuel) tabDuel.classList.remove('active');
          tabOnline.classList.add('active');
          if (duoCoopPane) duoCoopPane.style.display = 'none';
          if (duoDuelPane) duoDuelPane.style.display = 'none';
          if (duoOnlinePane) duoOnlinePane.style.display = 'block';
        });
      }

      if (onlineCreateRoomBtn) {
        onlineCreateRoomBtn.addEventListener('click', function () {
          var pin = generatePin();
          var mode = onlineRoomModeSelect ? onlineRoomModeSelect.value : 'duel';
          initOnlineRoom(pin, true, mode);
        });
      }

      if (onlineJoinRoomBtn) {
        onlineJoinRoomBtn.addEventListener('click', function () {
          var pin = onlineJoinPinInput ? onlineJoinPinInput.value.trim().toUpperCase() : '';
          if (pin.length < 4) {
            alertHint('Ingresa un PIN de 4 caracteres.');
            return;
          }
          initOnlineRoom(pin, false, 'duel');
        });
      }

      if (onlineCopyPinBtn) {
        onlineCopyPinBtn.addEventListener('click', function () {
          if (onlineState.pin && navigator.clipboard) {
            navigator.clipboard.writeText(onlineState.pin);
            onlineCopyPinBtn.textContent = '✅ ¡Copiado!';
            setTimeout(function () { onlineCopyPinBtn.textContent = '📋 Copiar PIN'; }, 2000);
          }
        });
      }

      if (onlineShareWhatsAppBtn) {
        onlineShareWhatsAppBtn.addEventListener('click', function () {
          if (!onlineState.pin) return;
          var text = '¡Únete a mi sala de ritmo en "Completa el compás"! Mi código PIN es: ' + onlineState.pin + '. ¡Vamos a jugar en vivo!';
          shareToWhatsApp(text);
        });
      }

      if (onlineLeaveRoomBtn) {
        onlineLeaveRoomBtn.addEventListener('click', function () {
          if (onlineState.channel) {
            try { onlineState.channel.close(); } catch (e) {}
            onlineState.channel = null;
          }
          onlineState.pin = null;
          if (onlineLobbyView) onlineLobbyView.style.display = 'grid';
          if (onlineRoomActiveView) onlineRoomActiveView.style.display = 'none';
        });
      }

      function alertHint(msg) {
        showPetSpeech(msg, 3000);
      }


      renderCreator();
      renderTray();
      renderSoundPicker();
      renderWheel();
      renderStatus();
      updatePetWidget();
      updateNavButtonsLockState();

      /* — Arranque de la intro (movido al final: todo el estado del módulo
         debe estar inicializado antes de que finishIntro pueda llamar a runDemo) — */
      if (intro.hidden || hasSeenIntro()) {
        // Intro ya vista (o estado congelado por un snapshot guardado):
        // ir directo al juego sin bloquear el scroll ni correr timers invisibles.
        intro.hidden = true;
        document.body.classList.remove('intro-open');
        finishIntro();
      } else {
        document.body.classList.add('intro-open');
        requestAnimationFrame(startIntro);
      }
    }());
