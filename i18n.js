/* ============================================================
   i18n.js — Capa bilingüe ES/EN del núcleo del juego (Fase 8)
   Español es el idioma canónico (por defecto); inglés se activa
   con el botón de idioma y se guarda en localStorage.
   Fase 8b1 cubre: niveles, figuras, intro/tour, controles,
   hints matemáticos, feedback principal y lección de picos.
   (Lecciones, mascotas-actitudes, creador y guía docente: fases
   siguientes, para no entregar una traducción a medias.)
   ============================================================ */

var DICT = {
  /* ---------- ES (canónico) ---------- */
  es: {
    langBtn: 'EN',
    introTitle: 'El círculo',
    introSkip: 'Saltar',
    introReplay: 'Ver otra vez',
    introPlay: '¡A jugar!',
    introScene1: 'Esto es 1... un círculo entero.',
    introScene2: '¡Mira! Lo picamos en 4 partes iguales...',
    introScene3: 'Esto es un cuarto (1/4)... ¡un trozo de 4!',
    introScene4: 'Cada bloque rojo es un cuarto (1/4), un trozo como este.',
    tourScene1: '¿Jugamos? Elige un bloque de abajo y toca el círculo para llenarlo.',
    tourScene2: 'También hay Mapa, Mercado, Dúo, Simon y Creador: ¡cada rincón guarda sorpresas!',
    tourScene3: 'Juega mucho y cuida a tu mascota: ¡crecerá y evolucionará contigo!',
    playBtn: 'Tocar mi compás',
    loopBtn: '5 vueltas',
    clearBtn: 'Vaciar',
    cueBtn: 'Pista',
    trayTitle: 'ELIGE UN BLOQUE',
    scoreLabel: 'Aciertos',
    yourBar: 'Tu compás',
    levelUp: '¡Nivel ',
    restPrefix: 'silencio · ',
    pickBlock: 'Ahora toca un sector del círculo.',
    chooseBlock: 'Elige un bloque y vuelve a tocar el círculo.',
    newChallenge: '¡Nuevo reto desbloqueado!',
    nowYou: 'Ahora tú: elige rojo y completa el círculo.',
    circlePlaying: 'El punto recorre tu compás…',
    fiveRounds: '¡El ritmo dará cinco vueltas!',
    noAudio: 'Este navegador no puede reproducir el tambor.',
    circleComplete: '¡Círculo completo! +1 acierto',
    anotherRound: '¡Muy bien! Vamos con otro reto.',
    levelComplete: '¡Fase 2 Completada!',
    picadasTitle: '🎯 Picos nuevos: 3/8 y 2/16',
    picadas38Strong: '3/8 · Puntillo',
    picadas38Text: 'Un cuarto y un octavo PEGADOS en un solo bloque: ocupa 3 tajadas y suena "TAM-ta". ¡Cambia el orden del ritmo!',
    picadas216Strong: '2/16 · Pique doble',
    picadas216Text: 'Un octavo partido en dos golpes rapiditos: "ta-ka" dentro de la misma tajada azul.',
    listen: '▶ Escuchar',
    picadasClose: '¡Entendido, a jugar!',
    petSelectTitle: 'Bautiza a tu Mascota',
    renameTitle: 'Bautiza a tu Mascota',
    renameSave: '✨ ¡Guardar nombre!',
    renameReset: 'Restablecer nombre original',
    renameClose: 'Cerrar sin cambiar',
    renameDone: '¡Nombre restablecido al original!',
    renameHello: '¡Hola! Soy',
    helpAria: 'Ver cómo se juega',
    statusLevel: 'Nivel ',
    wheelAria: 'Círculo completo: cuatro de cuatro.',
    demoWatch: 'Mira cómo se completa el círculo…',
    guide1: '4 sectores · cada trozo rojo es un cuarto (1/4).',
    guide5: 'La redonda (1/1) llena los 8 octavos: el círculo entero.',
    guide7: 'Escucha primero. Después reconstruye sin mirar.',
    guidePrefix: 'Reto: ',
    guideDefault: '8 octavos · dos octavos (1/8) forman un cuarto (1/4).',
    /* spoken de figuras: key = tipo */
    spoken_quarter: 'un cuarto', spoken_eighth: 'un octavo', spoken_half: 'un medio',
    spoken_restQuarter: 'un cuarto', spoken_restEighth: 'un octavo', spoken_restHalf: 'un medio',
    spoken_whole: 'un entero', spoken_dottedQuarter: 'tres octavos', spoken_restDottedQuarter: 'tres octavos',
    spoken_sixteenthPair: 'dos dieciseisavos',
    name_quarter: 'Pulso', name_eighth: 'Rápido', name_half: 'Largo', name_whole: 'Redonda',
    name_dottedQuarter: 'Puntillo', name_sixteenthPair: 'Pique doble',
    /* fractionText por unidades */
    frac8: 'un entero (1 = 4/4)', frac6: 'seis octavos (6/8)', frac4: 'un medio (1/2)',
    frac2: 'un cuarto (1/4)', frac1: 'un octavo (1/8)', frac3: 'tres octavos (3/8)',
    frac5: 'cinco octavos (5/8)', frac7: 'siete octavos (7/8)',
    hintMissingSingular: 'Te falta', hintMissingPlural: 'Te faltan',
    hintExtraSingular: 'Te sobra', hintExtraPlural: 'Te sobran',
    hintComplete: 'Tu círculo está completo: un entero (1).',
    /* mascotas: roles y descripciones (los nombres son marca, quedan igual) */
    pet_bumbo_role: 'Tamborilero',
    pet_bumbo_desc: 'Cálido, alegre y con un pulso firme como un tambor.',
    pet_clave_role: 'Agudo y rápido',
    pet_clave_desc: 'Vivaz y chispeante. Adora los octavos y la velocidad sincopada.',
    pet_guira_role: 'Suave y constante',
    pet_guira_desc: 'Dulce y paciente. Mantiene la cadencia continua sin perder una sola fracción.'
  },

  /* ---------- EN ---------- */
  en: {
    langBtn: 'ES',
    introTitle: 'The circle',
    introSkip: 'Skip',
    introReplay: 'Watch again',
    introPlay: "Let's play!",
    introScene1: 'This is 1... a whole circle.',
    introScene2: 'Look! We slice it into 4 equal parts...',
    introScene3: 'This is one quarter (1/4)... one of 4 slices!',
    introScene4: 'Each red block is one quarter (1/4), a slice like this one.',
    tourScene1: 'Shall we play? Pick a block below and tap the circle to fill it.',
    tourScene2: 'There is also the Map, Market, Dúo, Simon and Creator: every corner hides surprises!',
    tourScene3: 'Play a lot and take care of your pet: it will grow and evolve with you!',
    playBtn: 'Play my bar',
    loopBtn: '5 rounds',
    clearBtn: 'Clear',
    cueBtn: 'Cue',
    trayTitle: 'PICK A BLOCK',
    scoreLabel: 'Score',
    yourBar: 'Your bar',
    levelUp: 'Level ',
    restPrefix: 'rest · ',
    pickBlock: 'Now tap a slice of the circle.',
    chooseBlock: 'Pick a block and tap the circle again.',
    newChallenge: 'New challenge unlocked!',
    nowYou: 'Your turn: pick red and complete the circle.',
    circlePlaying: 'The dot goes around your bar…',
    fiveRounds: 'The rhythm will play five rounds!',
    noAudio: 'This browser cannot play the drum.',
    circleComplete: 'Circle complete! +1 hit',
    anotherRound: 'Great job! Here comes another round.',
    levelComplete: 'Phase 2 Complete!',
    picadasTitle: '🎯 New beats: 3/8 and 2/16',
    picadas38Strong: '3/8 · Dotted',
    picadas38Text: 'A quarter and an eighth GLUED into one block: it takes 3 slices and sounds "TAM-ta". It changes where the accent falls!',
    picadas216Strong: '2/16 · Double hit',
    picadas216Text: 'One eighth split into two quick taps: "ta-ka" inside the same blue slice.',
    listen: '▶ Listen',
    picadasClose: "Got it, let's play!",
    petSelectTitle: 'Name your Pet',
    renameTitle: 'Name your Pet',
    renameSave: '✨ Save name!',
    renameReset: 'Reset original name',
    renameClose: 'Close without changing',
    renameDone: 'Name restored to the original!',
    renameHello: 'Hi! I am',
    helpAria: 'See how to play',
    statusLevel: 'Level ',
    wheelAria: 'Circle complete: four of four.',
    demoWatch: 'Watch how the circle fills up…',
    guide1: '4 slices · each red block is one quarter (1/4).',
    guide5: 'The whole note (1/1) fills all 8 eighths: the entire circle.',
    guide7: 'Listen first. Then rebuild it without looking.',
    guidePrefix: 'Challenge: ',
    guideDefault: '8 eighths · two eighths (1/8) make one quarter (1/4).',
    spoken_quarter: 'one quarter', spoken_eighth: 'one eighth', spoken_half: 'one half',
    spoken_restQuarter: 'one quarter', spoken_restEighth: 'one eighth', spoken_restHalf: 'one half',
    spoken_whole: 'one whole', spoken_dottedQuarter: 'three eighths', spoken_restDottedQuarter: 'three eighths',
    spoken_sixteenthPair: 'two sixteenths',
    name_quarter: 'Pulse', name_eighth: 'Quick', name_half: 'Long', name_whole: 'Whole note',
    name_dottedQuarter: 'Dotted', name_sixteenthPair: 'Double hit',
    frac8: 'one whole (1 = 4/4)', frac6: 'six eighths (6/8)', frac4: 'one half (1/2)',
    frac2: 'one quarter (1/4)', frac1: 'one eighth (1/8)', frac3: 'three eighths (3/8)',
    frac5: 'five eighths (5/8)', frac7: 'seven eighths (7/8)',
    hintMissingSingular: 'You are missing', hintMissingPlural: 'You are missing',
    hintExtraSingular: 'You have', hintExtraPlural: 'You have too many',
    hintComplete: 'Your circle is complete: one whole (1).',
    pet_bumbo_role: 'Drummer',
    pet_bumbo_desc: 'Warm, cheerful and with a drum-steady pulse.',
    pet_clave_role: 'High and fast',
    pet_clave_desc: 'Lively and sparky. Loves eighths and syncopated speed.',
    pet_guira_role: 'Smooth and steady',
    pet_guira_desc: 'Sweet and patient. Keeps the groove going without losing a single fraction.'
  }
};

/* Niveles: títulos y misiones (fuera del diccionario general por tamaño) */
DICT.es.levels = {
  1: ['Nivel 1 · Pulso rojo', 'Completa el círculo con 4 trozos de un cuarto (1/4).'],
  2: ['Nivel 2 · Doble azul', 'Cada un cuarto (1/4) se divide en dos octavos (1/8).'],
  3: ['Nivel 3 · Medio y silencio', 'Suma un medio (1/2) y deja descansar un cuarto (1/4).'],
  4: ['Nivel 4 · Más silencios', 'El tambor también descansa un octavo (1/8) o un medio (1/2).'],
  5: ['Nivel 5 · El círculo entero', 'Descubre la redonda: un entero (1/1) llena todo el círculo.'],
  6: ['Nivel 6 · Mezcla total', 'Copia el reto mezclando sonidos, piques y silencios.'],
  7: ['Nivel 7 · Oído detective', 'Escucha el ritmo secreto y reconstrúyelo. Tienes 2 intentos.'],
  8: ['Nivel 8 · Tempo loco', '¡Más rápido! Copia la mezcla y tócala a toda velocidad.'],
  9: ['Nivel 9 · Compás partido', 'El ritmo también puede empezar con silencio: reconstruye el compás partido.'],
  10: ['Nivel 10 · Gran final', 'La prueba final: tres retos mezclando todo lo aprendido.'],
  11: ['Nivel 11 · Suma sonora', 'Escucha 2 grupos de golpes: súmalos y coloca el total en el compás.'],
  12: ['Nivel 12 · Resta silenciosa', 'Escucha los golpes; los que se silencian se restan. Toca los que quedan.'],
  13: ['Nivel 13 · Cadena', 'Secuencias encadenadas (3 grupos). ¡El tempo sube, mantén el ritmo!'],
  14: ['Nivel 14 · Reto mixto', '5 rondas alternando suma y resta. ¡Siente la matemática con ritmo!'],
  15: ['Nivel 15 · Veces', 'La multiplicación es repetición que se oye. ¡Escucha las veces y toca el total!'],
  16: ['Nivel 16 · Reparto', 'La división reparte los golpes en grupos iguales. ¿Cuántos tocan por grupo?'],
  17: ['Nivel 17 · Tablas con ritmo', 'Tablas sobre el pulso para tu memoria muscular. ¡Sigue los múltiplos!'],
  18: ['Nivel 18 · Gran reto 2', 'La prueba maestra de las 4 operaciones. ¡Tu mascota alcanzará su máximo esplendor!']
};
DICT.en.levels = {
  1: ['Level 1 · Red pulse', 'Complete the circle with 4 quarter blocks (1/4).'],
  2: ['Level 2 · Blue double', 'Each quarter (1/4) splits into two eighths (1/8).'],
  3: ['Level 3 · Half and rest', 'Add one half (1/2) and let a quarter (1/4) rest.'],
  4: ['Level 4 · More rests', 'The drum can also rest an eighth (1/8) or a half (1/2).'],
  5: ['Level 5 · The whole circle', 'Meet the whole note: one whole (1/1) fills the whole circle.'],
  6: ['Level 6 · Total mix', 'Copy the challenge mixing sounds, taps and rests.'],
  7: ['Level 7 · Ear detective', 'Listen to the secret rhythm and rebuild it. You get 2 tries.'],
  8: ['Level 8 · Crazy tempo', 'Faster! Copy the mix and play it at full speed.'],
  9: ['Level 9 · Offbeat bar', 'A rhythm can also start with a rest: rebuild the offbeat bar.'],
  10: ['Level 10 · Grand final', 'The final test: three challenges mixing everything you learned.'],
  11: ['Level 11 · Sound addition', 'Listen to 2 groups of hits: add them and place the total in your bar.'],
  12: ['Level 12 · Silent subtraction', 'Listen to the hits; the ones that go silent are subtracted. Play the ones left.'],
  13: ['Level 13 · Chain', 'Chained sequences (3 groups). Tempo goes up — keep the beat!'],
  14: ['Level 14 · Mixed challenge', '5 rounds alternating addition and subtraction. Feel the math with rhythm!'],
  15: ['Level 15 · Times', 'Multiplication is repetition you can hear. Count the times and play the total!'],
  16: ['Level 16 · Sharing', 'Division shares the hits into equal groups. How many play per group?'],
  17: ['Level 17 · Tables with rhythm', 'Times tables on the pulse for your muscle memory. Follow the multiples!'],
  18: ['Level 18 · Grand challenge 2', 'The master test of all 4 operations. Your pet will reach its finest form!']
};

/* Mensajes de desbloqueo por nivel (levelPop al avanzar) */
DICT.es.unlocks = {
  2: 'Un cuarto (1/4) ahora se pica en dos octavos (1/8)',
  3: 'Dos cuartos (1/4) forman un medio (1/2)',
  4: 'Nuevas pausas de un octavo y un medio',
  5: 'Una redonda (1/1) llena todo el círculo',
  6: 'Ahora mezclamos todo lo que aprendiste',
  7: 'Escucha con atención... ¡ahora hazlo tú!',
  8: '¡Más rápido!',
  9: 'El silencio también abre el compás',
  10: 'La prueba final: todo mezclado',
  11: 'Fase 2: Suma sonora con golpes rítmicos',
  12: 'Resta silenciosa: apaga los golpes',
  13: 'Cadena rítmica a tempo creciente',
  14: 'Reto mixto de suma y resta',
  15: 'Multiplicación con ritmo: veces',
  16: 'División con ritmo: reparto equitativo',
  17: 'Tablas rítmicas al pulso',
  18: 'Gran Reto 2: ¡Las 4 operaciones!'
};
DICT.en.unlocks = {
  2: 'A quarter (1/4) now splits into two eighths (1/8)',
  3: 'Two quarters (1/4) make one half (1/2)',
  4: 'New rests: one eighth and one half',
  5: 'A whole note (1/1) fills the entire circle',
  6: 'Now we mix everything you have learned',
  7: 'Listen closely... now you do it!',
  8: 'Faster!',
  9: 'Silence can also open the bar',
  10: 'The final test: everything mixed',
  11: 'Phase 2: Sound addition with rhythm hits',
  12: 'Silent subtraction: turn hits off',
  13: 'Rhythm chains at rising tempo',
  14: 'Mixed challenge of addition and subtraction',
  15: 'Multiplication with rhythm: times',
  16: 'Division with rhythm: fair sharing',
  17: 'Rhythm tables on the pulse',
  18: 'Grand Challenge 2: all 4 operations!'
};

/* Textos estáticos de la interfaz por selector */
var STATIC_TEXTS = {
  en: [
    ['#introTitle', 'The circle'],
    ['#introSkip', 'Skip'],
    ['#introReplay', 'Watch again'],
    ['#introPlay', "Let's play!"],
    ['#play > span:last-child', 'Play my bar'],
    ['#loop > span:last-child', '5 rounds'],
    ['#clear > span', 'Clear'],
    ['#restCueToggle > span:last-child', 'Cue'],
    ['.tray-title', 'PICK A BLOCK'],
    ['.score-label', 'Score'],
    ['.measure-label > span:first-child', 'Your bar'],
    ['#petRenameSaveBtn', '✨ Save name!'],
    ['#petRenameResetBtn', 'Reset original name'],
    ['#petRenameCloseBtn', 'Close without changing'],
    ['#petConfirmBtn', '✨ Save name!'],
    ['#picadasLessonTitle', '🎯 New beats: 3/8 and 2/16'],
    ['#picadasLessonClose', "Got it, let's play!"],
    ['#picadasDemo38', '▶ Listen'],
    ['#picadasDemo216', '▶ Listen'],
    ['#petSelectTitle', 'Choose your rhythm buddy'],
    ['#petRenameTitle', 'Name your Pet'],
    ['#petRenameBtn', '✏️ Name']
  ],
  es: [
    ['#introTitle', 'El círculo'],
    ['#introSkip', 'Saltar'],
    ['#introReplay', 'Ver otra vez'],
    ['#introPlay', '¡A jugar!'],
    ['#play > span:last-child', 'Tocar mi compás'],
    ['#loop > span:last-child', '5 vueltas'],
    ['#clear > span', 'Vaciar'],
    ['#restCueToggle > span:last-child', 'Pista'],
    ['.tray-title', 'ELIGE UN BLOQUE'],
    ['.score-label', 'Aciertos'],
    ['.measure-label > span:first-child', 'Tu compás'],
    ['#petRenameSaveBtn', '✨ ¡Guardar nombre!'],
    ['#petRenameResetBtn', 'Restablecer nombre original'],
    ['#petRenameCloseBtn', 'Cerrar sin cambiar'],
    ['#petConfirmBtn', '✨ ¡Guardar nombre!'],
    ['#picadasLessonTitle', '🎯 Picos nuevos: 3/8 y 2/16'],
    ['#picadasLessonClose', '¡Entendido, a jugar!'],
    ['#picadasDemo38', '▶ Escuchar'],
    ['#picadasDemo216', '▶ Escuchar'],
    ['#petSelectTitle', 'Elige a tu compañero de ritmo'],
    ['#petRenameTitle', 'Bautiza a tu Mascota'],
    ['#petRenameBtn', '✏️ Bautizar']
  ]
};

var LANG_KEY = 'compas_lang_v1';
var currentLang = 'es';
try { currentLang = localStorage.getItem(LANG_KEY) === 'en' ? 'en' : 'es'; } catch (e) { }

export function getLang() { return currentLang; }

export function setLang(l) {
  currentLang = (l === 'en') ? 'en' : 'es';
  try { localStorage.setItem(LANG_KEY, currentLang); } catch (e) { }
}

export function t(key) {
  var d = DICT[currentLang] || DICT.es;
  return (key in d) ? d[key] : (key in DICT.es ? DICT.es[key] : key);
}

export function tLevel(n, which) {
  var d = (DICT[currentLang] && DICT[currentLang].levels) || DICT.es.levels;
  var row = d[n] || DICT.es.levels[n];
  return which === 'mission' ? row[1] : row[0];
}

export function tUnlock(n) {
  var d = (DICT[currentLang] && DICT[currentLang].unlocks) || DICT.es.unlocks;
  return d[n] || DICT.es.unlocks[n] || '';
}

export function tSpoken(typeKey) { return t('spoken_' + typeKey); }
export function tName(typeKey) { return t('name_' + typeKey); }

/* fractionText/hintFor bilingües (la lógica canónica vive en logic.js) */
export function tf(units) {
  var d = DICT[currentLang] || DICT.es;
  var k = 'frac' + units;
  if (k in d) return d[k];
  return units + (currentLang === 'en' ? ' eighths (' + units + '/8)' : ' octavos (' + units + '/8)');
}

export function thint(units) {
  var d = DICT[currentLang] || DICT.es;
  var missing = 8 - units;
  if (missing > 0) {
    var m = (missing === 2 || missing === 4 || missing === 8 || currentLang === 'en')
      ? d.hintMissingPlural : d.hintMissingSingular;
    return m + ' ' + tf(missing) + '.';
  }
  if (missing < 0) {
    var e = (-missing === 2 || -missing === 4 || -missing === 8 || currentLang === 'en')
      ? d.hintExtraPlural : d.hintExtraSingular;
    return e + ' ' + tf(-missing) + '.';
  }
  return d.hintComplete;
}

/* Aplica los textos estáticos de la interfaz según el idioma activo */
export function applyStaticTexts() {
  var list = STATIC_TEXTS[currentLang] || STATIC_TEXTS.es;
  list.forEach(function (row) {
    var el = document.querySelector(row[0]);
    if (el) el.textContent = row[1];
  });
}
