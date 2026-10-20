    /* COMPAS · Lógica pura de "Completa el compás" (sin DOM).
       Probada con node en tests/logic.test.js — no editar sin correr los tests. */
    export const COMPAS = (function () {
      'use strict';

      var TYPES = {
        quarter:     { fraction: '1/4', spoken: 'un cuarto', name: 'Pulso', className: 'red', units: 2 },
        eighth:      { fraction: '1/8', spoken: 'un octavo', name: 'Rápido', className: 'blue', units: 1 },
        half:        { fraction: '1/2', spoken: 'un medio', name: 'Largo', className: 'green', units: 4 },
        restQuarter: { fraction: '1/4', spoken: 'un cuarto', name: 'Silencio', className: 'gray rest-red', units: 2, silent: true },
        restEighth:  { fraction: '1/8', spoken: 'un octavo', name: 'Silencio', className: 'gray rest-blue', units: 1, silent: true },
        restHalf:    { fraction: '1/2', spoken: 'un medio', name: 'Silencio', className: 'gray rest-green', units: 4, silent: true },
        whole:       { fraction: '1/1', spoken: 'un entero', name: 'Redonda', className: 'yellow', units: 8 },
        dottedQuarter:     { fraction: '3/8', spoken: 'tres octavos', name: 'Puntillo', className: 'purple', units: 3 },
        restDottedQuarter: { fraction: '3/8', spoken: 'tres octavos', name: 'Silencio', className: 'gray rest-purple', units: 3, silent: true },
        dottedHalf:        { fraction: '6/8', spoken: 'seis octavos', name: 'Puntillo largo', className: 'cyan', units: 6 },
        restDottedHalf:    { fraction: '6/8', spoken: 'seis octavos', name: 'Silencio', className: 'gray rest-cyan', units: 6, silent: true }
      };

      var LEVELS = {
        1: { title: 'Nivel 1 · Pulso rojo', mission: 'Completa el círculo con 4 trozos de un cuarto (1/4).', blocks: ['quarter'] },
        2: { title: 'Nivel 2 · Doble azul', mission: 'Cada un cuarto (1/4) se divide en dos octavos (1/8).', blocks: ['quarter', 'eighth'] },
        3: { title: 'Nivel 3 · Medio y silencio', mission: 'Suma un medio (1/2) y deja descansar un cuarto (1/4).', blocks: ['quarter', 'eighth', 'half', 'restQuarter'] },
        4: { title: 'Nivel 4 · Más silencios', mission: 'El tambor también descansa un octavo (1/8) o un medio (1/2).', blocks: ['quarter', 'eighth', 'half', 'restQuarter', 'restEighth', 'restHalf'] },
        5: { title: 'Nivel 5 · El círculo entero', mission: 'Descubre la redonda: un entero (1/1) llena todo el círculo.', blocks: ['quarter', 'eighth', 'half', 'restQuarter', 'restEighth', 'restHalf', 'whole'] },
        6: { title: 'Nivel 6 · Mezcla total', mission: 'Copia el reto mezclando sonidos, piques y silencios.', blocks: ['quarter', 'eighth', 'half', 'restQuarter', 'restEighth', 'restHalf', 'whole', 'dottedQuarter', 'restDottedQuarter', 'dottedHalf', 'restDottedHalf'] },
        7: { title: 'Nivel 7 · Oído detective', mission: 'Escucha el ritmo secreto y reconstrúyelo. Tienes 2 intentos.', blocks: ['quarter', 'eighth', 'half', 'restQuarter', 'restEighth', 'restHalf'] },
        8: { title: 'Nivel 8 · Tempo loco', mission: '¡Más rápido! Copia la mezcla y tócala a toda velocidad.', blocks: ['quarter', 'eighth', 'half', 'restQuarter', 'restEighth', 'restHalf', 'whole', 'dottedQuarter', 'restDottedQuarter', 'dottedHalf', 'restDottedHalf'] },
        9: { title: 'Nivel 9 · Compás partido', mission: 'El ritmo también puede empezar con silencio: reconstruye el compás partido.', blocks: ['quarter', 'eighth', 'half', 'restQuarter', 'restEighth', 'restHalf', 'dottedQuarter', 'restDottedQuarter', 'dottedHalf', 'restDottedHalf'] },
        10: { title: 'Nivel 10 · Gran final', mission: 'La prueba final: tres retos mezclando todo lo aprendido.', blocks: ['quarter', 'eighth', 'half', 'restQuarter', 'restEighth', 'restHalf', 'whole', 'dottedQuarter', 'restDottedQuarter', 'dottedHalf', 'restDottedHalf'] },
        11: { title: 'Nivel 11 · Suma sonora', mission: 'Escucha 2 grupos de golpes: súmalos y coloca el total en el compás.', mathType: 'sum', blocks: ['eighth', 'quarter', 'half'] },
        12: { title: 'Nivel 12 · Resta silenciosa', mission: 'Escucha los golpes; los que se silencian se restan. Toca los que quedan.', mathType: 'sub', blocks: ['eighth', 'quarter', 'half', 'restEighth', 'restQuarter'] },
        13: { title: 'Nivel 13 · Cadena', mission: 'Secuencias encadenadas (3 grupos). ¡El tempo sube, mantén el ritmo!', mathType: 'chain', blocks: ['eighth', 'quarter', 'half'] },
        14: { title: 'Nivel 14 · Reto mixto', mission: '5 rondas alternando suma y resta. ¡Siente la matemática con ritmo!', mathType: 'mixed', blocks: ['eighth', 'quarter', 'half', 'restEighth', 'restQuarter'] },
        15: { title: 'Nivel 15 · Veces', mission: 'La multiplicación es repetición que se oye. ¡Escucha las veces y toca el total!', mathType: 'times', blocks: ['eighth', 'quarter', 'half'] },
        16: { title: 'Nivel 16 · Reparto', mission: 'La división reparte los golpes en grupos iguales. ¿Cuántos tocan por grupo?', mathType: 'split', blocks: ['eighth', 'quarter', 'half'] },
        17: { title: 'Nivel 17 · Tablas con ritmo', mission: 'Tablas sobre el pulso para tu memoria muscular. ¡Sigue los múltiplos!', mathType: 'table', blocks: ['eighth', 'quarter', 'half'] },
        18: { title: 'Nivel 18 · Gran reto 2', mission: 'La prueba maestra de las 4 operaciones. ¡Tu mascota alcanzará su máximo esplendor!', mathType: 'mix4', blocks: ['eighth', 'quarter', 'half', 'whole', 'restEighth', 'restQuarter'] }
      };

      var CHALLENGES = {
        6: [
          ['half', 'quarter', 'eighth', 'restEighth'],
          ['quarter', 'restQuarter', 'half'],
          ['eighth', 'eighth', 'restQuarter', 'quarter', 'quarter']
        ],
        7: [
          ['quarter', 'eighth', 'eighth', 'half'],
          ['restQuarter', 'quarter', 'eighth', 'eighth', 'quarter'],
          ['half', 'restEighth', 'eighth', 'quarter']
        ],
        8: [
          ['eighth', 'eighth', 'quarter', 'restEighth', 'eighth', 'quarter'],
          ['quarter', 'restQuarter', 'eighth', 'eighth', 'quarter'],
          ['eighth', 'restEighth', 'eighth', 'restEighth', 'half']
        ],
        9: [
          ['restEighth', 'eighth', 'quarter', 'restQuarter', 'quarter'],
          ['restQuarter', 'eighth', 'eighth', 'half'],
          ['eighth', 'restEighth', 'quarter', 'quarter', 'restQuarter']
        ],
        10: [
          ['half', 'eighth', 'eighth', 'restQuarter'],
          ['quarter', 'restEighth', 'eighth', 'restEighth', 'eighth', 'quarter'],
          ['whole']
        ]
      };

      
      var MATH_PROBLEMS = {
        11: [
          { a: 2, b: 3, total: 5, op: '+', formulaText: '2 + 3 = 5' },
          { a: 3, b: 4, total: 7, op: '+', formulaText: '3 + 4 = 7' },
          { a: 4, b: 2, total: 6, op: '+', formulaText: '4 + 2 = 6' }
        ],
        12: [
          { initial: 5, sub: 2, total: 3, op: '−', formulaText: '5 − 2 = 3' },
          { initial: 6, sub: 2, total: 4, op: '−', formulaText: '6 − 2 = 4' },
          { initial: 7, sub: 3, total: 4, op: '−', formulaText: '7 − 3 = 4' }
        ],
        13: [
          { a: 2, b: 3, c: 1, total: 6, op: 'chain', tempo: 220, formulaText: '2 + 3 + 1 = 6' },
          { a: 1, b: 4, c: 2, total: 7, op: 'chain', tempo: 180, formulaText: '1 + 4 + 2 = 7' },
          { a: 2, b: 2, c: 3, total: 7, op: 'chain', tempo: 145, formulaText: '2 + 2 + 3 = 7' }
        ],
        14: [
          { a: 3, b: 2, total: 5, op: '+', formulaText: '3 + 2 = 5' },
          { initial: 6, sub: 3, total: 3, op: '−', formulaText: '6 − 3 = 3' },
          { a: 4, b: 3, total: 7, op: '+', formulaText: '4 + 3 = 7' },
          { initial: 7, sub: 2, total: 5, op: '−', formulaText: '7 − 2 = 5' },
          { a: 2, b: 1, c: 3, total: 6, op: 'chain', tempo: 160, formulaText: '2 + 1 + 3 = 6' }
        ],
        15: [
          { times: 2, group: 3, total: 6, op: '×', formulaText: '2 veces 3 = 6 golpes' },
          { times: 2, group: 4, total: 8, op: '×', formulaText: '2 veces 4 = 8 golpes (¡un entero!)' },
          { times: 3, group: 2, total: 6, op: '×', formulaText: '3 veces 2 = 6 golpes' }
        ],
        16: [
          { totalAmount: 6, groupsCount: 2, total: 3, op: '÷', formulaText: '6 repartido en 2 = 3 por grupo' },
          { totalAmount: 8, groupsCount: 2, total: 4, op: '÷', formulaText: '8 repartido en 2 = 4 por grupo' },
          { totalAmount: 8, groupsCount: 4, total: 2, op: '÷', formulaText: '8 repartido en 4 = 2 por grupo' }
        ],
        17: [
          { table: 2, count: 4, total: 8, op: 'table', formulaText: 'Tabla del 2: 4 × 2 = 8 golpes' },
          { table: 5, count: 1, total: 5, op: 'table', formulaText: 'Tabla del 5: 1 × 5 = 5 golpes' },
          { table: 2, count: 3, total: 6, op: 'table', formulaText: 'Tabla del 2: 3 × 2 = 6 golpes' }
        ],
        18: [
          { a: 3, b: 3, total: 6, op: '+', formulaText: 'Suma: 3 + 3 = 6' },
          { initial: 7, sub: 3, total: 4, op: '−', formulaText: 'Resta: 7 − 3 = 4' },
          { times: 2, group: 3, total: 6, op: '×', formulaText: 'Multiplicación: 2 × 3 = 6' },
          { totalAmount: 8, groupsCount: 2, total: 4, op: '÷', formulaText: 'División: 8 ÷ 2 = 4' },
          { times: 2, group: 2, plus: 3, total: 7, op: 'mix4', formulaText: 'Gran Final: (2 × 2) + 3 = 7' }
        ]
      };

      var LEVEL_LESSONS = {
        2: { title: 'Nivel 2 · Un octavo', duration: 12000, subtitles: [
          'Mira... picamos un cuarto (1/4) en 2.',
          '¡Cada trozo es un octavo (1/8)!',
          'Dos octavos (1/8 + 1/8) llenan un cuarto (1/4).'
        ] },
        3: { title: 'Nivel 3 · Un medio y silencio', duration: 12600, subtitles: [
          'Dos cuartos (1/4 + 1/4) juntos...',
          '¡Hacen un medio (1/2)!',
          'El tambor descansa un cuarto (1/4): eso es un silencio.'
        ] },
        4: { title: 'Nivel 4 · Silencios nuevos', duration: 12600, subtitles: [
          'El gris significa pausa: el tambor descansa.',
          'El tambor descansa un octavo (1/8)... el punto sigue.',
          'Ahora descansa un medio (1/2)... sin perder el pulso.'
        ] },
        5: { title: 'Nivel 5 · La redonda', duration: 12000, subtitles: [
          'Todos los trozos juntos forman 1 círculo entero.',
          '¡Un solo bloque... un entero (1/1)...',
          '...llena TODO el círculo! Esta es la redonda.'
        ] },
        6: { title: 'Nivel 6 · Mezcla total', duration: 10500, subtitles: [
          'Ya conoces cada trozo, sus nombres y sus silencios.',
          'Ahora mezclamos todo lo que aprendiste.',
          'Lee el reto, ordena los bloques y cierra el círculo.'
        ] },
        7: { title: 'Nivel 7 · Oído detective', duration: 10500, subtitles: [
          'En música también podemos ver con los oídos.',
          'Escucha con atención... cada golpe ocupa un trozo.',
          '¡Ahora hazlo tú! Tienes 2 intentos y una pista.'
        ] },
        8: { title: 'Nivel 8 · Tempo loco', duration: 9000, subtitles: [
          'El mismo círculo puede girar a otra velocidad.',
          '¡Más rápido! Los trozos valen lo mismo.',
          'Mantén el pulso, completa 3 retos y abre Mi ritmo.'
        ] },
        9: { title: 'Nivel 9 · Compás partido', duration: 10500, subtitles: [
          'El silencio también puede abrir el compás.',
          'Escucha: el primer golpe llega después de la pausa.',
          'Reconstruye el ritmo partido, trozo a trozo.'
        ] },
        10: { title: 'Nivel 10 · Gran final', duration: 9000, subtitles: [
          'Ya lees el círculo como un mapa.',
          'Tres retos finales con todo lo aprendido.',
          'Complétalos y desbloquea Mi ritmo para siempre.'
        ] },
        11: { title: 'Nivel 11 · Suma sonora', duration: 11000, subtitles: [
          'La suma es acumular sonidos en el tiempo.',
          'Escucha dos golpes... y luego tres golpes más...',
          '¡Juntos son cinco golpes! Súmalos en tu compás.'
        ] },
        12: { title: 'Nivel 12 · Resta silenciosa', duration: 11000, subtitles: [
          'Restar en música es apagar golpes sin frenar el tiempo.',
          'Cinco golpes sonaban... pero dos se vuelven silencio.',
          '¡Solo tres siguen sonando! Toca los que quedan.'
        ] },
        13: { title: 'Nivel 13 · Cadena', duration: 10500, subtitles: [
          'Una cadena rítmica une tres grupos seguidos.',
          'Dos más tres más uno... ¡seis golpes en total!',
          '¡Atento! Con cada ronda el tempo irá más rápido.'
        ] },
        14: { title: 'Nivel 14 · Reto mixto', duration: 10000, subtitles: [
          '¡El reto supremo de suma y resta rítmica!',
          'Cinco rondas combinadas: escucha si suma o si resta.',
          'Completa las 5 rondas y domina la matemática sonora.'
        ] },
        15: { title: 'Nivel 15 · Veces', duration: 11000, subtitles: [
          'La multiplicación es un patrón que se repite.',
          'Cuatro golpes... repetidos dos veces... ¡hacen ocho!',
          'Escucha cada repetición y toca el total multiplicado.'
        ] },
        16: { title: 'Nivel 16 · Reparto', duration: 11000, subtitles: [
          'La división es repartir el compás en partes iguales.',
          'Ocho golpes en dos grupos iguales... ¡tocan a cuatro!',
          'Toca el valor exacto que le corresponde a cada grupo.'
        ] },
        17: { title: 'Nivel 17 · Tablas con ritmo', duration: 10500, subtitles: [
          'Las tablas tienen ritmo propio: dos, cuatro, seis, ocho...',
          'Siente los acentos rítmicos en cada múltiplo.',
          'La memoria muscular y el oído aprenden jugando.'
        ] },
        18: { title: 'Nivel 18 · Gran reto 2', duration: 10000, subtitles: [
          '¡La gran prueba de las 4 operaciones!',
          'Suma, resta, multiplica y reparte con ritmo.',
          '¡Tu mascota evolucionará al máximo ante tus ojos!'
        ] }
      };

      function unitsOf(key) { return TYPES[key].units; }

      function placementsTotal(placements) {
        return placements.reduce(function (sum, p) { return sum + p.span; }, 0);
      }

      function overlaps(a, start, span) {
        return a.start < start + span && start < a.start + a.span;
      }

      function occupiedOf(placements) {
        var occupied = new Array(8).fill(null);
        placements.forEach(function (p) {
          for (var i = p.start; i < p.start + p.span; i++) occupied[i] = p;
        });
        return occupied;
      }

      function targetPlacements(target) {
        var cursor = 0;
        return (target || []).map(function (type, index) {
          var item = { id: 'target-' + index, type: type, start: cursor, span: TYPES[type].units };
          cursor += item.span;
          return item;
        });
      }

      function targetText(target) {
        return target.map(function (key) {
          var item = TYPES[key];
          return (item.silent ? 'silencio ' : '') + item.fraction;
        }).join(' · ');
      }

      function placementsMatch(placements, target) {
        var actual = placements.slice().sort(function (a, b) { return a.start - b.start; });
        if (!target) return placementsTotal(actual) === 8;
        var expected = targetPlacements(target);
        if (expected.length !== actual.length) return false;
        return expected.every(function (item, index) {
          return actual[index].type === item.type && actual[index].start === item.start && actual[index].span === item.span;
        });
      }

      function firstDifference(placements, target) {
        var expected = targetPlacements(target || []);
        var actual = placements.slice().sort(function (a, b) { return a.start - b.start; });
        for (var i = 0; i < expected.length; i++) {
          if (!actual[i] || actual[i].start !== expected[i].start || actual[i].type !== expected[i].type) {
            return { start: expected[i].start, type: expected[i].type };
          }
        }
        return null;
      }

      function fractionVerb(units, singular, plural) {
        return units === 1 || units === 2 || units === 4 || units === 8 ? singular : plural;
      }

      function fractionText(units) {
        if (units === 8) return 'un entero (1 = 4/4)';
        if (units === 6) return 'tres cuartos (3/4)';
        if (units === 4) return 'un medio (1/2)';
        if (units === 2) return 'un cuarto (1/4)';
        if (units === 1) return 'un octavo (1/8)';
        if (units === 3) return 'tres octavos (3/8)';
        if (units === 5) return 'cinco octavos (5/8)';
        if (units === 7) return 'siete octavos (7/8)';
        return units + ' octavos (' + units + '/8)';
      }

      function hintFor(total) {
        var diff = 8 - total;
        if (diff > 0) return 'Te ' + fractionVerb(diff, 'falta', 'faltan') + ' ' + fractionText(diff) + '.';
        if (diff < 0) return 'Te ' + fractionVerb(-diff, 'sobra', 'sobran') + ' ' + fractionText(-diff) + '.';
        return 'Tu círculo está completo: un entero (1).';
      }

      function barUnits(bar) {
        return placementsTotal(bar.placements);
      }

      function isFullEighthBar(bar) {
        return barUnits(bar) === 8 && bar.placements.length === 8 &&
          bar.placements.every(function (p) { return p.type === 'eighth'; });
      }

      function detectMissions(bars) {
        var out = [];
        if (bars.filter(isFullEighthBar).length >= 2) {
          out.push({ key: 'eighths', message: '¡Usaste 16 octavos: 16 × 1/8 = 2 enteros!' });
        }
        // Misión: Compás 1 + Compás 2 = exactamente 8 octavos (1 entero)
        if (bars.length >= 2) {
          var b1 = barUnits(bars[0]);
          var b2 = barUnits(bars[1]);
          if (b1 > 0 && b2 > 0 && (b1 + b2 === 8)) {
            out.push({ key: 'sumBars', message: '¡Suma de compases perfecta! C1 (' + b1 + '/8) + C2 (' + b2 + '/8) = 1 entero completo (8/8)!' });
          }
        }
        // Misión: Resta de silencios (1 compás con al menos 2 silencios y 6 de sonido)
        bars.forEach(function (bar) {
          var sUnits = 0, rUnits = 0;
          bar.placements.forEach(function (p) {
            if (TYPES[p.type].silent) rUnits += p.span; else sUnits += p.span;
          });
          if (rUnits >= 2 && sUnits === 6) {
            out.push({ key: 'subRhythm', message: '¡Resta rítmica! Al compás entero (8) le restaste 2 silencios y quedan 6 octavos sonando.' });
          }
        });
        var sounded = 0;
        var silent = 0;
        bars.forEach(function (bar) {
          bar.placements.forEach(function (p) {
            if (TYPES[p.type].silent) silent += 1; else sounded += 1;
          });
        });
        if (silent > 0 && sounded === silent * 2) {
          out.push({ key: 'ratio', message: '¡Creaste una razón 2 a 1: dos sonidos por cada silencio!' });
        }
        for (var i = 0; i < bars.length - 1; i++) {
          if (barUnits(bars[i]) === 8 && barUnits(bars[i + 1]) === 4) {
            out.push({ key: 'half', message: '¡La mitad de 1 entero es 1/2! El segundo compás ocupa exactamente la mitad.' });
            break;
          }
        }
        var hasWhole = bars.some(function (bar) {
          return barUnits(bar) === 8 && bar.placements.length === 1 && bar.placements[0].span === 8;
        });
        var hasEight = bars.some(function (bar) {
          return barUnits(bar) === 8 && bar.placements.length === 8;
        });
        if (hasWhole && hasEight) {
          out.push({ key: 'contrast', message: '¡1 entero también puede ser 8 octavos: distinta forma, mismo valor!' });
        }
        return out;
      }

      function detectDiscoveries(bar) {
        var out = [];
        var units = barUnits(bar);
        if (isFullEighthBar(bar)) {
          out.push({ key: 'eight-eighths', message: '¡8 octavos = 4 cuartos = 1 entero! Descubriste una equivalencia.' });
        }
        if (units === 8 && bar.placements.length === 4 && bar.placements.every(function (p) { return p.span === 2; })) {
          out.push({ key: 'four-quarters', message: '¡4 cuartos = 1 entero! El círculo demuestra la suma.' });
        }
        var soundUnits = 0;
        var restUnits = 0;
        bar.placements.forEach(function (p) {
          if (TYPES[p.type].silent) restUnits += p.span; else soundUnits += p.span;
        });
        if (soundUnits === 4 && restUnits === 4) {
          out.push({ key: 'balanced-half', message: '¡Mitad sonido + mitad silencio = 1 entero! Encontraste equilibrio.' });
        }
        return out;
      }

      /* MÓDULO A: Lógica pura de Mascotas */
      var PETS = {
        bumbo: {
          id: 'bumbo',
          name: 'Bumbo',
          role: 'Tamborilero',
          desc: 'Cálido, alegre y con un pulso firme como un tambor.',
          color: '#f04444',
          accent: '#ffd438',
          phrases: {
            normal: ['¡A tiempo con el pulso!', '¡Pum-pum! Siente el ritmo.', '¡Cada golpe cuenta en el compás!'],
            win: ['¡PUM! ¡Un entero perfecto! +100 XP', '¡Qué ritmo tan contundente!', '¡Compás redondo, maestro!'],
            fail3: ['¡Tranquilo! Respira y escucha el compás conmigo.', '¡Poco a poco! El tambor no se apura.', '¡Tú puedes! Volvamos a marcar el pulso.']
          }
        },
        clave: {
          id: 'clave',
          name: 'Clave',
          role: 'Agudo y rápido',
          desc: 'Vivaz y chispeante. Adora los octavos y la velocidad sincopada.',
          color: '#2387ea',
          accent: '#1daea5',
          phrases: {
            normal: ['¡Rápido como un octavo!', '¡Tic-tac-toc! Al grano.', '¡Sigue la síncopa!'],
            win: ['¡Velocidad supersónica! +100 XP', '¡Qué precisión de octavos!', '¡Imparable! ¡Círculo cerrado!'],
            fail3: ['¡No pasa nada! A veces hay que frenar un cuarto.', '¡Ojo al dato! Contemos los trozos despacito.', '¡Ánimo! El próximo lo clavas.']
          }
        },
        guira: {
          id: 'guira',
          name: 'Güira',
          role: 'Suave y constante',
          desc: 'Dulce y paciente. Mantiene la cadencia continua sin perder una sola fracción.',
          color: '#39a867',
          accent: '#ffd438',
          phrases: {
            normal: ['Suave, suave... sin prisas.', 'Raspa que raspa, el compás avanza.', 'Todo encaja con armonía.'],
            win: ['¡Qué fluidez musical! +100 XP', '¡Cadencia impecable!', '¡Un entero lleno de luz!'],
            fail3: ['No te preocupes, corazón. Tómate un respiro de medio compás.', 'La paciencia llena el círculo. ¡Prueba otra vez!', 'Aquí estoy contigo, inténtalo de nuevo.']
          }
        }
      };

      function stageForXp(xp) {
        if (xp >= 900) return 3; // Maestro
        if (xp >= 400) return 2; // Cría
        return 1; // Huevo
      }

      function stageName(stage) {
        if (stage === 3) return 'Maestro';
        if (stage === 2) return 'Cría';
        return 'Huevo';
      }

      function xpProgress(xp) {
        if (xp >= 900) {
          return { current: xp, next: 900, percent: 100, label: xp + ' XP (Máximo)' };
        }
        if (xp >= 400) {
          var step = xp - 400;
          return { current: xp, next: 900, percent: Math.min(100, Math.round((step / 500) * 100)), label: xp + ' / 900 XP' };
        }
        return { current: xp, next: 400, percent: Math.min(100, Math.round((xp / 400) * 100)), label: xp + ' / 400 XP' };
      }

      return {
        TYPES: TYPES,
        LEVELS: LEVELS,
        CHALLENGES: CHALLENGES,
        LEVEL_LESSONS: LEVEL_LESSONS,
        MATH_PROBLEMS: MATH_PROBLEMS,
        PETS: PETS,
        stageForXp: stageForXp,
        stageName: stageName,
        xpProgress: xpProgress,
        unitsOf: unitsOf,
        placementsTotal: placementsTotal,
        overlaps: overlaps,
        occupiedOf: occupiedOf,
        targetPlacements: targetPlacements,
        targetText: targetText,
        placementsMatch: placementsMatch,
        firstDifference: firstDifference,
        fractionVerb: fractionVerb,
        fractionText: fractionText,
        hintFor: hintFor,
        barUnits: barUnits,
        detectMissions: detectMissions,
        detectDiscoveries: detectDiscoveries
      };
    })();
