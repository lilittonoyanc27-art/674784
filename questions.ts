export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  es: string;
  hy: string;
  personalityTrait?: string;
  tacticalNoteEs?: string;
  tacticalNoteHy?: string;
}

export interface QuizQuestion {
  id: number;
  partId: 1 | 2 | 3 | 4 | 5;
  partTitleEs: string;
  partTitleHy: string;
  partEmoji: string;
  titleEs: string;
  titleHy: string;
  icon: string;
  scenarioEs: string;
  scenarioHy: string;
  options: QuestionOption[];
  rewardAmount: string;
  rewardValue: number;
  isMilestone?: boolean;
}

export const QUIZ_PARTS = [
  {
    id: 1,
    titleEs: 'Durante el partido',
    titleHy: 'Խաղի ընթացքում',
    color: 'emerald',
    badge: '🟢',
    range: '1–10',
    descriptionHy: 'Խաղադաշտում կայացվող վայրկյանական որոշումներ',
    descriptionEs: 'Decisiones tácticas inmediatas en el campo'
  },
  {
    id: 2,
    titleEs: 'El equipo y el entrenador',
    titleHy: 'Թիմը և մարզիչը',
    color: 'amber',
    badge: '🟡',
    range: '11–15',
    descriptionHy: 'Հարաբերություններ, թիմային ոգի և կարգապահություն',
    descriptionEs: 'Relaciones, vestuario y liderazgo de equipo'
  },
  {
    id: 3,
    titleEs: 'Situaciones difíciles',
    titleHy: 'Բարդ իրավիճակներ',
    color: 'orange',
    badge: '🟠',
    range: '16–20',
    descriptionHy: 'Ճնշում, վնասվածքներ, եղանակ և անսպասելի շրջադարձեր',
    descriptionEs: 'Presión ambiental, lesiones y momentos críticos'
  },
  {
    id: 4,
    titleEs: 'Decisiones de un futbolista',
    titleHy: 'Ֆուտբոլիստի որոշումները',
    color: 'rose',
    badge: '🔴',
    range: '21–25',
    descriptionHy: 'Կարիերա, պայմանագրեր, հոգեբանություն և ընտանիք',
    descriptionEs: 'Carrera profesional, contratos y vida personal'
  },
  {
    id: 5,
    titleEs: 'Eres el entrenador',
    titleHy: 'Դու մարզիչն ես',
    color: 'blue',
    badge: '🔵',
    range: '26–30',
    descriptionHy: 'Գլխավոր մարզչի և ազգային հավաքականի ավագի որոշումները',
    descriptionEs: 'Gestión táctica, vestuario y la gran final mundial'
  }
];

export const PRIZE_LADDER: { level: number; amount: string; value: number; isMilestone: boolean }[] = [
  { level: 1, amount: '€100', value: 100, isMilestone: false },
  { level: 2, amount: '€200', value: 200, isMilestone: false },
  { level: 3, amount: '€300', value: 300, isMilestone: false },
  { level: 4, amount: '€500', value: 500, isMilestone: false },
  { level: 5, amount: '€1,000', value: 1000, isMilestone: false },
  { level: 6, amount: '€2,000', value: 2000, isMilestone: false },
  { level: 7, amount: '€4,000', value: 4000, isMilestone: false },
  { level: 8, amount: '€8,000', value: 8000, isMilestone: false },
  { level: 9, amount: '€16,000', value: 16000, isMilestone: false },
  { level: 10, amount: '€32,000', value: 32000, isMilestone: true }, // Milestone 1
  { level: 11, amount: '€40,000', value: 40000, isMilestone: false },
  { level: 12, amount: '€50,000', value: 50000, isMilestone: false },
  { level: 13, amount: '€65,000', value: 65000, isMilestone: false },
  { level: 14, amount: '€80,000', value: 80000, isMilestone: false },
  { level: 15, amount: '€100,000', value: 100000, isMilestone: true }, // Milestone 2
  { level: 16, amount: '€125,000', value: 125000, isMilestone: false },
  { level: 17, amount: '€150,000', value: 150000, isMilestone: false },
  { level: 18, amount: '€180,000', value: 180000, isMilestone: false },
  { level: 19, amount: '€210,000', value: 210000, isMilestone: false },
  { level: 20, amount: '€250,000', value: 250000, isMilestone: true }, // Milestone 3
  { level: 21, amount: '€300,000', value: 300000, isMilestone: false },
  { level: 22, amount: '€375,000', value: 375000, isMilestone: false },
  { level: 23, amount: '€450,000', value: 450000, isMilestone: false },
  { level: 24, amount: '€525,000', value: 525000, isMilestone: false },
  { level: 25, amount: '€600,000', value: 600000, isMilestone: true }, // Milestone 4
  { level: 26, amount: '€700,000', value: 700000, isMilestone: false },
  { level: 27, amount: '€800,000', value: 800000, isMilestone: false },
  { level: 28, amount: '€900,000', value: 900000, isMilestone: false },
  { level: 29, amount: '€950,000', value: 950000, isMilestone: false },
  { level: 30, amount: '€1,000,000 🏆', value: 1000000, isMilestone: true } // Champion Milestone
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 🟢 Parte 1. Durante el partido — Խաղի ընթացքում
  {
    id: 1,
    partId: 1,
    partTitleEs: 'Durante el partido',
    partTitleHy: 'Խաղի ընթացքում',
    partEmoji: '🟢',
    icon: '⚽',
    titleEs: 'La última oportunidad',
    titleHy: 'Վերջին հնարավորությունը',
    scenarioHy: 'Դու խաղում ես շատ կարևոր եզրափակիչում։ Հաշիվը 1։1 է, և մնացել է ընդամենը մեկ րոպե։ Դու կարող ես ինքդ հարվածել դարպասին կամ փոխանցել գնդակը ավելի լավ դիրքում գտնվող խաղընկերոջդ։ Ի՞նչ կանես։',
    scenarioEs: 'Estás jugando una final muy importante. El marcador está empatado 1-1 y solo queda un minuto. Puedes disparar a portería o pasar el balón a un compañero que está mejor colocado. ¿Qué harías?',
    rewardAmount: '€100',
    rewardValue: 100,
    options: [
      { id: 'A', hy: 'Ինքս կհարվածեի։', es: 'Dispararía yo mismo.', personalityTrait: 'Համարձակ հարձակվող / Goleador audaz', tacticalNoteHy: 'Դուք վերցնում եք պատասխանատվությունը Ձեր վրա։ Իսկական հարձակվողի բնավորություն։', tacticalNoteEs: 'Asumes la responsabilidad del tiro decisivo. ¡Instinto de delantero puro!' },
      { id: 'B', hy: 'Կփոխանցեի խաղընկերոջս։', es: 'Pasaría el balón a mi compañero.', personalityTrait: 'Թիմային ալտրուիստ / Jugador de equipo altruista', tacticalNoteHy: 'Գերազանց տեսադաշտ. թիմի հաղթանակը Ձեր անձնական գոլից կարևոր է։', tacticalNoteEs: 'Excelente visión táctica. La victoria del colectivo está por encima de la gloria individual.' },
      { id: 'C', hy: 'Կկանգնեի։', es: 'Me detendría.', personalityTrait: 'Զգույշ դիտորդ / Observador pausado', tacticalNoteHy: 'Մեկ վայրկյան դադար՝ իրավիճակը վերագնահատելու համար։', tacticalNoteEs: 'Una pausa para congelar el tiempo y buscar la mejor opción.' },
      { id: 'D', hy: 'Կսպասեի մրցակցին։', es: 'Esperaría al rival.', personalityTrait: 'Խորամանկ մարտավար / Táctico provocador', tacticalNoteHy: 'Գրավում եք պաշտպանին Ձեզ վրա, որպեսզի տարածություն ազատվի։', tacticalNoteEs: 'Provocas la salida del defensa para generar espacios libres.' }
    ]
  },
  {
    id: 2,
    partId: 1,
    partTitleEs: 'Durante el partido',
    partTitleHy: 'Խաղի ընթացքում',
    partEmoji: '🟢',
    icon: '🧤',
    titleEs: 'El error del portero',
    titleHy: 'Դարպասապահի սխալը',
    scenarioHy: 'Քո թիմի դարպասապահը հեշտ գնդակ է բաց թողնում, և ձեր թիմը գոլ է ընդունում։ Նա շատ տխուր է, իսկ մյուս խաղացողները սկսում են բարկանալ։ Ի՞նչ կանես։',
    scenarioEs: 'El portero de tu equipo comete un error y recibe un gol fácil. Está muy triste y los demás jugadores empiezan a enfadarse con él. ¿Qué harías?',
    rewardAmount: '€200',
    rewardValue: 200,
    options: [
      { id: 'A', hy: 'Կբարկանայի նրա վրա։', es: 'Me enfadaría con él.', personalityTrait: 'Խիստ պահանջկոտ / Exigente pasional', tacticalNoteHy: 'Էմոցիոնալ պահպանում. խաղադաշտում կիրքը եռում է։', tacticalNoteEs: 'Reacción visceral. La adrenalina de la final está al máximo.' },
      { id: 'B', hy: 'Կասեի, որ նա վատ դարպասապահ է։', es: 'Le diría que es un mal portero.', personalityTrait: 'Կոպիտ քննադատ / Crítico directo', tacticalNoteHy: 'Ուղիղ խոսք, չնայած կարող է նաև զայրացնել։', tacticalNoteEs: 'Franqueza dura en un momento de tensión.' },
      { id: 'C', hy: 'Կաջակցեի նրան։', es: 'Lo animaría.', personalityTrait: 'Թիմի առաջնորդ / Líder moral', tacticalNoteHy: 'Իսկական ավագի պահվածք. աջակցությունը բարձրացնում է դարպասապահի ոգին։', tacticalNoteEs: 'Comportamiento de auténtico capitán. El apoyo salva la moral del equipo.' },
      { id: 'D', hy: 'Կդադարեի խաղալ։', es: 'Dejaría de jugar.', personalityTrait: 'Բողոքող / Protesta silenciosa', tacticalNoteHy: 'Ցույց եք տալիս Ձեր դժգոհությունը անսովոր կերպով։', tacticalNoteEs: 'Expresas tu inconformidad de forma radical.' }
    ]
  },
  {
    id: 3,
    partId: 1,
    partTitleEs: 'Durante el partido',
    partTitleHy: 'Խաղի ընթացքում',
    partEmoji: '🟢',
    icon: '🟥',
    titleEs: 'La tarjeta roja',
    titleHy: 'Կարմիր քարտը',
    scenarioHy: 'Մրցակիցը քեզ կոպիտ հրում է, բայց մրցավարը ոչինչ չի նկատում։ Դու շատ բարկացած ես, սակայն գիտես, որ պատասխանելու դեպքում կարող ես կարմիր քարտ ստանալ։ Ինչպե՞ս կվարվես։',
    scenarioEs: 'Un rival te empuja de manera agresiva, pero el árbitro no lo ve. Estás muy enfadado, aunque sabes que podrías recibir una tarjeta roja si reaccionas mal. ¿Qué harías?',
    rewardAmount: '€300',
    rewardValue: 300,
    options: [
      { id: 'A', hy: 'Կհրեի նրան։', es: 'Lo empujaría.', personalityTrait: 'Բնական արձագանք / Respuesta visceral', tacticalNoteHy: 'Չեք համբերում անարդարությանը։', tacticalNoteEs: 'Defiendes tu orgullo físico ante la provocación.' },
      { id: 'B', hy: 'Կվիճեի մրցավարի հետ։', es: 'Discutiría con el árbitro.', personalityTrait: 'Արդարության մարտիկ / Buscador de justicia', tacticalNoteHy: 'Փորձում եք մրցավարի ուշադրությունը հրավիրել դրվագի վրա։', tacticalNoteEs: 'Intentas que el árbitro tome nota de las agresiones rivales.' },
      { id: 'C', hy: 'Կլքեի խաղադաշտը։', es: 'Abandonaría el campo.', personalityTrait: 'Դրամատիկ ցուցադրություն / Demostración dramática', tacticalNoteHy: 'Ծայրահեղ քայլ՝ ի նշան բողոքի։', tacticalNoteEs: 'Un gesto drástico en protesta por la falta de protección.' },
      { id: 'D', hy: 'Հանգիստ կմնայի և կշարունակեի խաղալ։', es: 'Mantendría la calma y seguiría jugando.', personalityTrait: 'Սառնասիրտ պրոֆեսիոնալ / Profesional disciplinado', tacticalNoteHy: 'Պրոֆեսիոնալ ինքնատիրապետում. լավագույն պատասխանը գոլ խփելն է։', tacticalNoteEs: 'Cabeza fría. La mejor respuesta al rival es ganar en el marcador.' }
    ]
  },
  {
    id: 4,
    partId: 1,
    partTitleEs: 'Durante el partido',
    partTitleHy: 'Խաղի ընթացքում',
    partEmoji: '🟢',
    icon: '🥅',
    titleEs: 'La portería vacía',
    titleHy: 'Դատարկ դարպասը',
    scenarioHy: 'Դու մենակ ես հայտնվել դատարկ դարպասի դիմաց, բայց քո խաղընկերը նույնպես ցանկանում է գոլ խփել։ Նա խնդրում է փոխանցել գնդակը։ Ի՞նչ որոշում կկայացնես, եթե փոխանցումը վտանգավոր է։',
    scenarioEs: 'Estás solo delante de una portería vacía, pero tu compañero también quiere marcar. Te pide que le pases el balón. ¿Qué decidirías si el pase es arriesgado?',
    rewardAmount: '€500',
    rewardValue: 500,
    options: [
      { id: 'A', hy: 'Անմիջապես կհարվածեի դարպասին։', es: 'Dispararía directamente a portería.', personalityTrait: 'Անսխալ գոլահար / Goleador pragmático', tacticalNoteHy: 'Ռիսկի չեք դիմում և ապահովում եք 100% գոլը։', tacticalNoteEs: 'Garantizas el tanto sin arriesgar la ventaja del equipo.' },
      { id: 'B', hy: 'Ամեն դեպքում կփոխանցեի նրան։', es: 'Le pasaría el balón de todas formas.', personalityTrait: 'Ընկերական նվիրվածություն / Generosidad absoluta', tacticalNoteHy: 'Վստահում եք ընկերոջը, նույնիսկ ռիսկի գնով։', tacticalNoteEs: 'Demuestras lealtad infinita a tu compañero de delantera.' },
      { id: 'C', hy: 'Կսպասեի դարպասապահին։', es: 'Esperaría al portero.', personalityTrait: 'Էսթետ ֆուտբոլիստ / Jugador de espectáculo', tacticalNoteHy: 'Սպասում եք դարպասապահին՝ շոու ստեղծելու համար։', tacticalNoteEs: 'Buscas la jugada de lujo para las cámaras.' },
      { id: 'D', hy: 'Գնդակը դուրս կհանեի։', es: 'Mandaría el balón fuera.', personalityTrait: 'Անսպասելի ֆեյր-փլեյ / Gesto insólito', tacticalNoteHy: 'Չափազանց անսպասելի որոշում։', tacticalNoteEs: 'Una decisión completamente desconcertante e imprevisible.' }
    ]
  },
  {
    id: 5,
    partId: 1,
    partTitleEs: 'Durante el partido',
    partTitleHy: 'Խաղի ընթացքում',
    partEmoji: '🟢',
    icon: '🏃',
    titleEs: 'El contraataque',
    titleHy: 'Հակագրոհը',
    scenarioHy: 'Քո թիմը արագ հակագրոհ է կազմակերպում։ Դու գնդակով վազում ես դեպի դարպասը, բայց նկատում ես, որ երկու պաշտպան մոտենում են քեզ։ Քո խաղընկերը ազատ է ձախ կողմում։ Ի՞նչ կանես։',
    scenarioEs: 'Tu equipo inicia un contraataque rápido. Corres con el balón hacia la portería, pero dos defensas se acercan a ti. Tu compañero está libre por la izquierda. ¿Qué harías?',
    rewardAmount: '€1,000',
    rewardValue: 1000,
    options: [
      { id: 'A', hy: 'Կփորձեի շրջանցել երկու պաշտպաններին։', es: 'Intentaría regatear a los dos defensas.', personalityTrait: 'Վիրտուոզ դրիբլեր / Regateador virtuoso', tacticalNoteHy: 'Ձեր տեխնիկական վարպետությունը կարող է պայթեցնել ստադիոնը։', tacticalNoteEs: 'Confianza ciega en tu regate y habilidad técnica.' },
      { id: 'B', hy: 'Գնդակը կփոխանցեի ձախ։', es: 'Pasaría el balón a la izquierda.', personalityTrait: 'Ժամանակակից փլեյմեյքեր / Organizador inteligente', tacticalNoteHy: 'Կատարյալ հակագրոհի դասագրքային լուծում։', tacticalNoteEs: 'Decisión táctica perfecta: aprovechas la superioridad numérica.' },
      { id: 'C', hy: 'Կվերադառնայի հետ։', es: 'Volvería hacia atrás.', personalityTrait: 'Տեմպի պահապան / Controlador de posesión', tacticalNoteHy: 'Գնդակի վերահսկողության պահպանում։', tacticalNoteEs: 'Prefieres asegurar la posesión y pausar la transición.' },
      { id: 'D', hy: 'Կկանգնեի։', es: 'Me pararía.', personalityTrait: 'Հանկարծակի դադար / Cambio de ritmo brusco', tacticalNoteHy: 'Պաշտպաններին շփոթեցնող արգելակում։', tacticalNoteEs: 'Un freno inesperado para descolocar el repliegue rival.' }
    ]
  },
  {
    id: 6,
    partId: 1,
    partTitleEs: 'Durante el partido',
    partTitleHy: 'Խաղի ընթացքում',
    partEmoji: '🟢',
    icon: '🟨',
    titleEs: 'La tarjeta amarilla',
    titleHy: 'Դեղին քարտը',
    scenarioHy: 'Դու արդեն դեղին քարտ ունես։ Մրցակիցը փորձում է անցնել քո կողքով, իսկ դու կարող ես նրան կանգնեցնել վտանգավոր խախտմամբ։ Ի՞նչ կանես։',
    scenarioEs: 'Ya tienes una tarjeta amarilla. Un rival intenta superarte y podrías detenerlo cometiendo una falta peligrosa. ¿Qué harías?',
    rewardAmount: '€2,000',
    rewardValue: 2000,
    options: [
      { id: 'A', hy: 'Կխախտեի կանոնները։', es: 'Cometería una falta.', personalityTrait: 'Մարտավարական խախտում / Falta táctica límite', tacticalNoteHy: 'Վտանգավոր գրոհի կասեցում՝ հեռացման ռիսկով։', tacticalNoteEs: 'Frenas el peligro asumiendo el riesgo de la expulsión.' },
      { id: 'B', hy: 'Կբռնեի նրա մարզաշապիկը։', es: 'Le agarraría la camiseta.', personalityTrait: 'Կործանիչ պաշտպան / Agarre desesperado', tacticalNoteHy: 'Հուսահատ փորձ՝ կանգնեցնելու մրցակցին։', tacticalNoteEs: 'Recurso desesperado que suele sancionarse con tarjeta.' },
      { id: 'C', hy: 'Կփորձեի կանոնների համաձայն խլել գնդակը։', es: 'Intentaría recuperar el balón limpiamente.', personalityTrait: 'Մաքուր վարպետ / Recuperador limpio', tacticalNoteHy: 'Խելացի և մաքուր խլում՝ առանց խաղադաշտից հեռացվելու։', tacticalNoteEs: 'Defensa con técnica y anticipación sin riesgo de expulsión.' },
      { id: 'D', hy: 'Կհրեի նրան։', es: 'Lo empujaría.', personalityTrait: 'Կոպիտ ուժ / Fuerza desmedida', tacticalNoteHy: 'Ֆիզիկական բախում, որը կարող է ավարտվել կարմիր քարտով։', tacticalNoteEs: 'Contacto directo que casi siempre castiga el colegiado.' }
    ]
  },
  {
    id: 7,
    partId: 1,
    partTitleEs: 'Durante el partido',
    partTitleHy: 'Խաղի ընթացքում',
    partEmoji: '🟢',
    icon: '⏱️',
    titleEs: 'Los últimos cinco minutos',
    titleHy: 'Վերջին հինգ րոպեն',
    scenarioHy: 'Ձեր թիմը հաղթում է 2։1 հաշվով, և մնացել է հինգ րոպե։ Մրցակիցը շատ ուժեղ է հարձակվում, իսկ ձեր պաշտպանները հոգնել են։ Որպես թիմի ավագ՝ ի՞նչ որոշում կկայացնես։',
    scenarioEs: 'Tu equipo gana 2-1 y quedan cinco minutos. El rival está atacando con mucha fuerza y tus defensas están cansados. Como capitán, ¿qué decisión tomarías?',
    rewardAmount: '€4,000',
    rewardValue: 4000,
    options: [
      { id: 'A', hy: 'Բոլորին կուղարկեի հարձակման։', es: 'Mandaría a todos al ataque.', personalityTrait: 'Համարձակ ռիսկի դիմող / Ofensiva total', tacticalNoteHy: 'Փորձում եք խփել երրորդ գոլը և վերջակետ դնել։', tacticalNoteEs: 'Apuesta ultraofensiva para liquidar el encuentro.' },
      { id: 'B', hy: 'Կխնդրեի թիմին ավելի կազմակերպված պաշտպանվել։', es: 'Pediría al equipo que defendiera de forma más organizada.', personalityTrait: 'Հաշվենկատ առաջնորդ / Capitán estratega', tacticalNoteHy: 'Խելամիտ կարգապահություն՝ հաղթանակը պահպանելու համար։', tacticalNoteEs: 'Disciplina y orden defensivo para asegurar los tres puntos.' },
      { id: 'C', hy: 'Կփորձեի ժամանակ ձգել՝ խախտելով կանոնները։', es: 'Intentaría perder tiempo incumpliendo las reglas.', personalityTrait: 'Անտիսպորտային ժամավաճառ / Antifútbol pragmático', tacticalNoteHy: 'Խաղային ժամանակի արհեստական ձգձգում։', tacticalNoteEs: 'Canchería pura y pérdida de tiempo al borde del reglamento.' },
      { id: 'D', hy: 'Կդադարեի վազել։', es: 'Dejaría de correr.', personalityTrait: 'Ուժերի տնտեսում / Ahorro pasivo', tacticalNoteHy: 'Էներգիայի պահուստավորում։', tacticalNoteEs: 'Desconexión física en el tramo definitivo.' }
    ]
  },
  {
    id: 8,
    partId: 1,
    partTitleEs: 'Durante el partido',
    partTitleHy: 'Խաղի ընթացքում',
    partEmoji: '🟢',
    icon: '🎯',
    titleEs: 'El penalti decisivo',
    titleHy: 'Վճռորոշ 11-մետրանոցը',
    scenarioHy: 'Եզրափակիչ խաղում մրցավարը 11-մետրանոց է նշանակում ձեր օգտին։ Թիմի հիմնական հարվածողը վնասվածք ունի, և մարզիչը քեզ է վստահում հարվածը։ Դու շատ հուզված ես։ Ի՞նչ կանես։',
    scenarioEs: 'En la final, el árbitro señala un penalti a favor de tu equipo. El lanzador habitual está lesionado y el entrenador confía en ti. Estás muy nervioso. ¿Qué harías?',
    rewardAmount: '€8,000',
    rewardValue: 8000,
    options: [
      { id: 'A', hy: 'Կհրաժարվեի հարվածելուց։', es: 'Me negaría a lanzar el penalti.', personalityTrait: 'Անկեղծ զգուշավոր / Prudente sincero', tacticalNoteHy: 'Խոստովանում եք հուզմունքը, որպեսզի չվնասեք թիմին։', tacticalNoteEs: 'Reconoces tus nervios antes de arruinar el lanzamiento.' },
      { id: 'B', hy: 'Առանց մտածելու կհարվածեի։', es: 'Dispararía sin pensar.', personalityTrait: 'Ինտուիտիվ ռմբարկու / Rematador instintivo', tacticalNoteHy: 'Մաքուր ինտուիցիա՝ առանց ավելորդ վախի։', tacticalNoteEs: 'Golpeas por puro instinto sin dejar que la mente te traicione.' },
      { id: 'C', hy: 'Կկենտրոնանայի և հանգիստ կհարվածեի։', es: 'Me concentraría y lanzaría con calma.', personalityTrait: 'Երկաթյա նյարդեր / Nervios de acero', tacticalNoteHy: 'Խորը շունչ, կենտրոնացում և հստակ գոլ անկյունում։', tacticalNoteEs: 'Máxima concentración y ejecución con sangre fría.' },
      { id: 'D', hy: 'Կխնդրեի մրցավարին չեղարկել 11-մետրանոցը։', es: 'Pediría al árbitro que anulara el penalti.', personalityTrait: 'Ուտոպիստ արդարադատ / Honradez extrema', tacticalNoteHy: 'Արտասովոր ազնվություն, եթե կասկածում էիք դրվագին։', tacticalNoteEs: 'Una honestidad sin precedentes en el fútbol moderno.' }
    ]
  },
  {
    id: 9,
    partId: 1,
    partTitleEs: 'Durante el partido',
    partTitleHy: 'Խաղի ընթացքում',
    partEmoji: '🟢',
    icon: '⚡',
    titleEs: 'Un rival muy rápido',
    titleHy: 'Շատ արագ մրցակիցը',
    scenarioHy: 'Դու պաշտպան ես։ Մրցակից թիմի հարձակվողը քեզնից շատ արագ է և անընդհատ շրջանցում է քեզ։ Քո մարզիչը խնդրում է փոխել խաղաոճդ։ Ինչպե՞ս կվարվես։',
    scenarioEs: 'Eres defensa. El delantero rival es mucho más rápido que tú y te supera constantemente. Tu entrenador te pide que cambies tu manera de jugar. ¿Qué harías?',
    rewardAmount: '€16,000',
    rewardValue: 16000,
    options: [
      { id: 'A', hy: 'Ավելի լավ դիրք կընտրեի և կկանխատեսեի նրա շարժումները։', es: 'Me colocaría mejor y anticiparía sus movimientos.', personalityTrait: 'Դիրքային ինտելեկտ / Inteligencia táctica', tacticalNoteHy: 'Արագությունը հաղթահարվում է ճիշտ դիրքավորմամբ և կանխատեսմամբ։', tacticalNoteEs: 'La velocidad física se anula con lectura del juego y anticipación.' },
      { id: 'B', hy: 'Ամեն անգամ կփորձեի նրան հրել։', es: 'Intentaría empujarlo cada vez.', personalityTrait: 'Ագրեսիվ մարտիկ / Choque constante', tacticalNoteHy: 'Ֆիզիկական ճնշում արագավազ հարձակվողի վրա։', tacticalNoteEs: 'Frenas su desborde mediante el contacto físico.' },
      { id: 'C', hy: 'Կանտեսեի մարզչի խորհուրդը։', es: 'Ignoraría el consejo del entrenador.', personalityTrait: 'Ինքնավստահ ըմբոստ / Rebelde terco', tacticalNoteHy: 'Գործում եք միայն սեփական մտքերով։', tacticalNoteEs: 'Confías únicamente en tu propio criterio.' },
      { id: 'D', hy: 'Կհրաժարվեի պաշտպանվելուց։', es: 'Me negaría a defender.', personalityTrait: 'Հանձնվող / Rendición', tacticalNoteHy: 'Հրաժարվում եք դժվար մենապայքարից։', tacticalNoteEs: 'Bajas los brazos ante la dificultad.' }
    ]
  },
  {
    id: 10,
    partId: 1,
    partTitleEs: 'Durante el partido',
    partTitleHy: 'Խաղի ընթացքում',
    partEmoji: '🟢',
    icon: '🚩',
    titleEs: 'El fuera de juego',
    titleHy: 'Խաղից դուրս վիճակը',
    scenarioHy: 'Դու կարծում ես, որ մրցակցի գոլը գրանցվել է խաղից դուրս վիճակից, բայց մրցավարը գոլը հաշվել է։ Քո թիմակիցները սկսում են բողոքել։ Ի՞նչ կանես։',
    scenarioEs: 'Crees que el gol del rival se ha marcado en fuera de juego, pero el árbitro lo ha concedido. Tus compañeros empiezan a protestar. ¿Qué harías?',
    rewardAmount: '€32,000',
    rewardValue: 32000,
    isMilestone: true,
    options: [
      { id: 'A', hy: 'Կվիրավորեի մրցավարին։', es: 'Insultaría al árbitro.', personalityTrait: 'Բուռն բողոքարար / Furia descontrolada', tacticalNoteHy: 'Զայրույթի պոռթկում, որը կարող է թիմին տասը հոգով թողնել։', tacticalNoteEs: 'Pérdida de papeles con sanción disciplinaria segura.' },
      { id: 'B', hy: 'Կհեռանայի խաղադաշտից։', es: 'Saldría del campo.', personalityTrait: 'Բոյկոտող / Abandono de protesta', tacticalNoteHy: 'Խաղադաշտի լքում՝ ի նշան անհամաձայնության։', tacticalNoteEs: 'Dejas al equipo en inferioridad numérica.' },
      { id: 'C', hy: 'Կհրաժարվեի խաղը շարունակելուց։', es: 'Me negaría a continuar el partido.', personalityTrait: 'Դիրքորոշման պաշտպան / Resistencia obstinada', tacticalNoteHy: 'Հրաժարվում եք խաղարկել գնդակը կենտրոնից։', tacticalNoteEs: 'Paralizas el reinicio del encuentro.' },
      { id: 'D', hy: 'Հարգանքով կխոսեի մրցավարի հետ և կշարունակեի խաղը։', es: 'Hablaría con respeto al árbitro y continuaría jugando.', personalityTrait: 'Հասուն առաջնորդ / Liderazgo respetuoso', tacticalNoteHy: 'Դիվանագիտություն և պահպանված էներգիա՝ խաղը շրջելու համար։', tacticalNoteEs: 'Diálogo con autoridad sin perder la compostura competitiva.' }
    ]
  },

  // 🟡 Parte 2. El equipo y el entrenador — Թիմը և մարզիչը
  {
    id: 11,
    partId: 2,
    partTitleEs: 'El equipo y el entrenador',
    partTitleHy: 'Թիմը և մարզիչը',
    partEmoji: '🟡',
    icon: '👑',
    titleEs: 'El capitán',
    titleHy: 'Թիմի ավագը',
    scenarioHy: 'Մարզիչը քեզ ընտրել է թիմի ավագ, բայց քո լավագույն ընկերը կարծում է, որ ինքն ավելի արժանի էր այդ պաշտոնին։ Նա դադարում է խոսել քեզ հետ։ Ի՞նչ կանես։',
    scenarioEs: 'El entrenador te ha elegido capitán, pero tu mejor amigo cree que él merecía más ese puesto. Deja de hablar contigo. ¿Qué harías?',
    rewardAmount: '€40,000',
    rewardValue: 40000,
    options: [
      { id: 'A', hy: 'Կասեի, որ դա իր խնդիրն է։', es: 'Le diría que es su problema.', personalityTrait: 'Կոշտ անտարբերություն / Distancia fría', tacticalNoteHy: 'Գործնական մոտեցում, բայց ընկերությունը կարող է տուժել։', tacticalNoteEs: 'Priorizas la jerarquía sin prestar atención a los sentimientos.' },
      { id: 'B', hy: 'Կփորձեի խոսել նրա հետ և պահպանել ընկերությունը։', es: 'Intentaría hablar con él y mantener nuestra amistad.', personalityTrait: 'Իրական ընկեր / Amistad y empatía', tacticalNoteHy: 'Ընկերությունն ու հանդերձարանի համախմբվածությունը ամեն ինչից վեր են։', tacticalNoteEs: 'El valor de la amistad fortalece la armonía del vestuario.' },
      { id: 'C', hy: 'Կսկսեի վիճել նրա հետ։', es: 'Empezaría a discutir con él.', personalityTrait: 'Հարաբերությունների պարզաբանում / Confrontación activa', tacticalNoteHy: 'Վեճ բոլորի աչքի առաջ։', tacticalNoteEs: 'Enfrentamiento directo que tensa el ambiente grupal.' },
      { id: 'D', hy: 'Կանտեսեի նրան բոլոր մարզումների ժամանակ։', es: 'Lo ignoraría en todos los entrenamientos.', personalityTrait: 'Լուռ մեկուսացում / Ley del hielo', tacticalNoteHy: 'Չնկատելու տալով՝ խորացնում եք անջրպետը։', tacticalNoteEs: 'Evitas el contacto aumentando el distanciamiento.' }
    ]
  },
  {
    id: 12,
    partId: 2,
    partTitleEs: 'El equipo y el entrenador',
    partTitleHy: 'Թիմը և մարզիչը',
    partEmoji: '🟡',
    icon: '🪑',
    titleEs: 'Estás en el banquillo',
    titleHy: 'Դու պահեստային նստարանին ես',
    scenarioHy: 'Դու ամբողջ շաբաթ լավ ես մարզվել, բայց կարևոր խաղում մարզիչը քեզ թողնում է պահեստայինների նստարանին։ Դու հիասթափված ես, որովհետև շատ էիր ցանկանում խաղալ։ Ի՞նչ կանես։',
    scenarioEs: 'Has entrenado muy bien toda la semana, pero en un partido importante el entrenador te deja en el banquillo. Estás decepcionado porque tenías muchas ganas de jugar. ¿Qué harías?',
    rewardAmount: '€50,000',
    rewardValue: 50000,
    options: [
      { id: 'A', hy: 'Կսկսեի բողոքել բոլորի ներկայությամբ։', es: 'Empezaría a protestar delante de todos.', personalityTrait: 'Բացահայտ դժգոհող / Queja abierta', tacticalNoteHy: 'Ձեր դժգոհությունը դառնում է բոլորի քննարկման թեման։', tacticalNoteEs: 'Exteriorizas tu enfado ante todo el grupo.' },
      { id: 'B', hy: 'Կհեռանայի մարզադաշտից։', es: 'Me iría del estadio.', personalityTrait: 'Էգոցենտրիկ քայլ / Deserción emocional', tacticalNoteHy: 'Թողնում եք թիմին մենակ կարևորագույն խաղի պահին։', tacticalNoteEs: 'Gesto de ruptura total con el cuerpo técnico.' },
      { id: 'C', hy: 'Կաջակցեի թիմին և հետո կխոսեի մարզչի հետ։', es: 'Apoyaría al equipo y después hablaría con el entrenador.', personalityTrait: 'Պրոֆեսիոնալ թիմակից / Profesional paciente', tacticalNoteHy: 'Ողջունում եք տղաներին, իսկ խաղից հետո հանգիստ զրուցում մարզչի հետ։', tacticalNoteEs: 'Apoyo incondicional al equipo y diálogo constructivo a solas.' },
      { id: 'D', hy: 'Կասեի, որ այլևս չեմ մարզվելու։', es: 'Diría que no volvería a entrenar.', personalityTrait: 'Ուլտիմատում / Chantaje deportivo', tacticalNoteHy: 'Ծայրահեղ հայտարարություն էմոցիաների ազդեցության տակ։', tacticalNoteEs: 'Amenaza fruto de la frustración momentánea.' }
    ]
  },
  {
    id: 13,
    partId: 2,
    partTitleEs: 'El equipo y el entrenador',
    partTitleHy: 'Թիմը և մարզիչը',
    partEmoji: '🟡',
    icon: '🤝',
    titleEs: 'Un nuevo jugador',
    titleHy: 'Նոր ֆուտբոլիստը',
    scenarioHy: 'Ձեր թիմ է գալիս նոր ֆուտբոլիստ, որը դեռ լավ չի խոսում ձեր լեզվով։ Նա ամաչում է և չի կարողանում ընկերանալ մյուս խաղացողների հետ։ Դու նկատում ես, որ նա միշտ մենակ է։ Ի՞նչ կանես։',
    scenarioEs: 'Llega a tu equipo un futbolista nuevo que todavía no habla bien vuestro idioma. Es tímido y le cuesta hacer amigos. Notas que siempre está solo. ¿Qué harías?',
    rewardAmount: '€65,000',
    rewardValue: 65000,
    options: [
      { id: 'A', hy: 'Կօգնեի նրան հարմարվել թիմին։', es: 'Lo ayudaría a integrarse en el equipo.', personalityTrait: 'Հյուրընկալ առաջնորդ / Integrador empático', tacticalNoteHy: 'Մեծահոգի վերաբերմունք. օգնում եք նրան զգալ իրեն ինչպես տանը։', tacticalNoteEs: 'Facilitas su adaptación; un vestuario unido rinde mejor.' },
      { id: 'B', hy: 'Կանտեսեի նրան։', es: 'Lo ignoraría.', personalityTrait: 'Անտարբեր / Indiferente', tacticalNoteHy: 'Չեք խառնվում ուրիշների հարմարվելու գործընթացին։', tacticalNoteEs: 'Te mantienes al margen de los nuevos compañeros.' },
      { id: 'C', hy: 'Կծաղրեի նրա արտասանությունը։', es: 'Me burlaría de su pronunciación.', personalityTrait: 'Անտակտ կատակասեր / Bromista pesado', tacticalNoteHy: 'Ծաղրը կարող է կոտրել նորեկի ինքնավստահությունը։', tacticalNoteEs: 'Falta de empatía que perjudica la convivencia.' },
      { id: 'D', hy: 'Կասեի, որ պետք է ինքնուրույն ամեն ինչ սովորի։', es: 'Le diría que debe aprenderlo todo solo.', personalityTrait: 'Կոշտ դպրոց / Supervivencia individual', tacticalNoteHy: 'Կարծում եք, որ յուրաքանչյուր ոք ինքնուրույն պետք է հաղթահարի։', tacticalNoteEs: 'Crees que cada uno debe ganarse su propio sitio.' }
    ]
  },
  {
    id: 14,
    partId: 2,
    partTitleEs: 'El equipo y el entrenador',
    partTitleHy: 'Թիմը և մարզիչը',
    partEmoji: '🟡',
    icon: '📋',
    titleEs: 'La estrategia del entrenador',
    titleHy: 'Մարզչի մարտավարությունը',
    scenarioHy: 'Մարզիչը ցանկանում է, որ դու խաղաս պաշտպանությունում, բայց դու նախընտրում ես հարձակվողի դիրքը։ Խաղից առաջ նա բացատրում է, որ թիմին հենց պաշտպանությունում ես պետք։ Ի՞նչ կանես։',
    scenarioEs: 'El entrenador quiere que juegues en defensa, pero tú prefieres ser delantero. Antes del partido te explica que el equipo te necesita precisamente en defensa. ¿Qué harías?',
    rewardAmount: '€80,000',
    rewardValue: 80000,
    options: [
      { id: 'A', hy: 'Կհրաժարվեի խաղալուց։', es: 'Me negaría a jugar.', personalityTrait: 'Կամակոր աստղ / Capricho de estrella', tacticalNoteHy: 'Պահանջում եք միայն Ձեր սիրելի դիրքը։', tacticalNoteEs: 'Te niegas a colaborar si no es en tu posición favorita.' },
      { id: 'B', hy: 'Խաղի ընթացքում ինքնուրույն դիրքս կփոխեի։', es: 'Cambiaría de posición por mi cuenta durante el partido.', personalityTrait: 'Անկարգապահ ազատամիտ / Anárquico táctico', tacticalNoteHy: 'Խախտում եք մարզչական գծագիրը՝ վազելով հարձակման։', tacticalNoteEs: 'Rompes el esquema táctico por iniciativa propia.' },
      { id: 'C', hy: 'Կասեի, որ մարզիչը ոչինչ չի հասկանում։', es: 'Diría que el entrenador no entiende nada.', personalityTrait: 'Իշխանության ժխտում / Desafío a la autoridad', tacticalNoteHy: 'Կասկածի տակ եք դնում մարզչի իրավասությունը։', tacticalNoteEs: 'Cuestionas públicamente las capacidades del míster.' },
      { id: 'D', hy: 'Կփորձեի օգնել թիմին այդ դիրքում։', es: 'Intentaría ayudar al equipo en esa posición.', personalityTrait: 'Բազմակողմանի զինվոր / Jugador polivalente', tacticalNoteHy: 'Ունիվերսալություն և պատրաստակամություն՝ հանուն թիմային նպատակի։', tacticalNoteEs: 'Polivalencia y entrega al servicio de las necesidades del club.' }
    ]
  },
  {
    id: 15,
    partId: 2,
    partTitleEs: 'El equipo y el entrenador',
    partTitleHy: 'Թիմը և մարզիչը',
    partEmoji: '🟡',
    icon: '😠',
    titleEs: 'Dos compañeros discuten',
    titleHy: 'Երկու խաղընկեր վիճում են',
    scenarioHy: 'Մարզման ժամանակ երկու խաղընկեր սկսում են վիճել, որովհետև մեկը մյուսին վատ փոխանցում է կատարել։ Վիճաբանությունը խանգարում է ամբողջ թիմի մարզմանը։ Ի՞նչ կանես։',
    scenarioEs: 'Durante un entrenamiento, dos compañeros empiezan a discutir porque uno le ha dado un mal pase al otro. La discusión interrumpe el entrenamiento de todo el equipo. ¿Qué harías?',
    rewardAmount: '€100,000',
    rewardValue: 100000,
    isMilestone: true,
    options: [
      { id: 'A', hy: 'Կմիանայի վիճաբանությանը։', es: 'Me uniría a la discusión.', personalityTrait: 'Կրակին յուղ լցնող / Echar leña al fuego', tacticalNoteHy: 'Վեճը ավելի է մեծանում Ձեր ներգրավմամբ։', tacticalNoteEs: 'Agravas el conflicto metiéndote en la pelea.' },
      { id: 'B', hy: 'Կփորձեի նրանց հաշտեցնել։', es: 'Intentaría reconciliarlos.', personalityTrait: 'Խաղաղարար / Pacificador sensato', tacticalNoteHy: 'Հանդարտեցնում եք կրքերը և վերականգնում մարզման ռիթմը։', tacticalNoteEs: 'Mediación madura para reconducir la sesión de trabajo.' },
      { id: 'C', hy: 'Կծիծաղեի նրանց վրա։', es: 'Me reiría de ellos.', personalityTrait: 'Հեգնական հանդիսատես / Espectador irónico', tacticalNoteHy: 'Լարված իրավիճակը վերածում եք զվարճանքի։', tacticalNoteEs: 'Resta seriedad a un problema que frena al grupo.' },
      { id: 'D', hy: 'Կսկսեի նրանց նկարահանել։', es: 'Empezaría a grabarlos.', personalityTrait: 'Բլոգեր մարզադաշտում / Generador de contenido viral', tacticalNoteHy: 'Մտածում եք սոցիալական ցանցերի դիտումների մասին։', tacticalNoteEs: 'Buscas viralidad a costa de los problemas internos.' }
    ]
  },

  // 🟠 Parte 3. Situaciones difíciles — Բարդ իրավիճակներ
  {
    id: 16,
    partId: 3,
    partTitleEs: 'Situaciones difíciles',
    partTitleHy: 'Բարդ իրավիճակներ',
    partEmoji: '🟠',
    icon: '🩹',
    titleEs: 'Una lesión',
    titleHy: 'Վնասվածք',
    scenarioHy: 'Շատ կարևոր հանդիպման ժամանակ ոտքդ ցավում է։ Դու ցանկանում ես շարունակել խաղը, որովհետև թիմը քո օգնության կարիքն ունի, բայց ցավն ուժեղանում է։ Ի՞նչ կանես։',
    scenarioEs: 'Durante un partido muy importante te empieza a doler la pierna. Quieres seguir jugando porque tu equipo te necesita, pero el dolor aumenta. ¿Qué harías?',
    rewardAmount: '€125,000',
    rewardValue: 125000,
    options: [
      { id: 'A', hy: 'Կշարունակեի խաղալ՝ թաքցնելով ցավը։', es: 'Seguiría jugando y ocultaría el dolor.', personalityTrait: 'Հերոսական անձնազոհություն / Sacrificio peligroso', tacticalNoteHy: 'Վտանգում եք առողջությունը՝ հանուն այսօրվա արդյունքի։', tacticalNoteEs: 'Arriesgas agravar la lesión por orgullo competitivo.' },
      { id: 'B', hy: 'Ավելի արագ կվազեի։', es: 'Correría todavía más rápido.', personalityTrait: 'Անխոհեմ համառություն / Terquedad temeraria', tacticalNoteHy: 'Փորձում եք հաղթահարել ցավը արագացմամբ։', tacticalNoteEs: 'Intentas forzar la máquina ignorando los avisos del cuerpo.' },
      { id: 'C', hy: 'Կտեղեկացնեի մարզչին և բժշկին։', es: 'Avisaría al entrenador y al médico.', personalityTrait: 'Խոհեմ պրոֆեսիոնալ / Responsabilidad física', tacticalNoteHy: 'Ճիշտ որոշում. առողջությունն ու թարմ փոխարինողը ավելի օգտակար են։', tacticalNoteEs: 'Priorizas la salud a largo plazo y permites que entre alguien al 100%.' },
      { id: 'D', hy: 'Ցավը կանտեսեի մինչև խաղի ավարտը։', es: 'Ignoraría el dolor hasta el final del partido.', personalityTrait: 'Տոկուն մարտիկ / Resistencia estoica', tacticalNoteHy: 'Ատամները սեղմած դիմանում եք մինչև վերջին սուլիչը։', tacticalNoteEs: 'Aguantas hasta el pitido final asumiendo secuelas.' }
    ]
  },
  {
    id: 17,
    partId: 3,
    partTitleEs: 'Situaciones difíciles',
    partTitleHy: 'Բարդ իրավիճակներ',
    partEmoji: '🟠',
    icon: '🌧️',
    titleEs: 'La lluvia fuerte',
    titleHy: 'Ուժեղ անձրև',
    scenarioHy: 'Խաղի ժամանակ սկսվում է ուժեղ անձրև։ Խոտածածկը շատ սայթաքուն է, իսկ գնդակը դժվար է վերահսկել։ Քո սովորական խաղաոճն այլևս արդյունավետ չէ։ Ի՞նչ կանես։',
    scenarioEs: 'Durante el partido empieza a llover mucho. El césped está muy resbaladizo y es difícil controlar el balón. Tu forma habitual de jugar ya no funciona bien. ¿Qué harías?',
    rewardAmount: '€150,000',
    rewardValue: 150000,
    options: [
      { id: 'A', hy: 'Կփոխեի խաղաոճս և ավելի զգույշ կխաղայի։', es: 'Cambiaría mi estilo y jugaría con más cuidado.', personalityTrait: 'Ճկուն հարմարվող / Adaptabilidad camaleónica', tacticalNoteHy: 'Արագ հարմարվում եք եղանակին. պարզ փոխանցումներ և զգուշություն։', tacticalNoteEs: 'Lectura meteorológica: pases rasos firmes y sin riesgos innecesarios.' },
      { id: 'B', hy: 'Կփորձեի ավելի վտանգավոր հնարքներ անել։', es: 'Intentaría hacer jugadas más peligrosas.', personalityTrait: 'Ռիսկային ռոմանտիկ / Espectacularidad mojada', tacticalNoteHy: 'Փորձում եք անել անհնարինը սայթաքուն խոտածածկին։', tacticalNoteEs: 'Desafías las leyes de la física sobre el barro.' },
      { id: 'C', hy: 'Կանտեսեի խաղադաշտի վիճակը։', es: 'Ignoraría el estado del campo.', personalityTrait: 'Անփոփոխ սովորույթ / Inercia habitual', tacticalNoteHy: 'Շարունակում եք կարծես ոչինչ չի փոխվել։', tacticalNoteEs: 'Continúas con tu plan original sin calibrar el terreno.' },
      { id: 'D', hy: 'Կդադարեի փոխանցումներ կատարել։', es: 'Dejaría de hacer pases.', personalityTrait: 'Անհատական փակում / Individualismo forzado', tacticalNoteHy: 'Ամեն ինչ փորձում եք անել միայնակ։', tacticalNoteEs: 'Monopolizas el balón por miedo al fallo del compañero.' }
    ]
  },
  {
    id: 18,
    partId: 3,
    partTitleEs: 'Situaciones difíciles',
    partTitleHy: 'Բարդ իրավիճակներ',
    partEmoji: '🟠',
    icon: '🎟️',
    titleEs: 'La presión del público',
    titleHy: 'Հանդիսատեսի ճնշումը',
    scenarioHy: 'Դու առաջին անգամ խաղում ես մեծ մարզադաշտում։ Հազարավոր մարդիկ գոռում են, իսկ մրցակցի երկրպագուները սուլում են քեզ։ Դու սկսում ես նյարդայնանալ։ Ինչպե՞ս կվարվես։',
    scenarioEs: 'Juegas por primera vez en un estadio enorme. Miles de personas gritan y los aficionados rivales te silban. Empiezas a ponerte nervioso. ¿Qué harías?',
    rewardAmount: '€180,000',
    rewardValue: 180000,
    options: [
      { id: 'A', hy: 'Կվիճեի հանդիսատեսի հետ։', es: 'Discutiría con el público.', personalityTrait: 'Տրիբունայի դեմ մարտիկ / Desafío a la grada', tacticalNoteHy: 'Ժեստեր տրիբունաներին, որոնք էլ ավելի են բորբոքում սուլոցները։', tacticalNoteEs: 'Encararte con miles de hinchas suele aumentar la hostilidad.' },
      { id: 'B', hy: 'Կմտածեի միայն այն մասին, թե մարդիկ ինչ են ասում։', es: 'Pensaría solo en lo que dice la gente.', personalityTrait: 'Կասկածամիտ / Dependiente del qué dirán', tacticalNoteHy: 'Կորցնում եք կենտրոնացումը խաղից դուրս մտքերի պատճառով։', tacticalNoteEs: 'Permites que el ruido exterior contamine tu concentración.' },
      { id: 'C', hy: 'Կխնդրեի փոխարինել ինձ։', es: 'Pediría que me sustituyeran.', personalityTrait: 'Ճնշմանը զիջող / Salida de escape', tacticalNoteHy: 'Լքում եք պայքարը հոգեբանական ծանր պահին։', tacticalNoteEs: 'Pides el cambio al verte superado por el ambiente.' },
      { id: 'D', hy: 'Կկենտրոնանայի խաղի և թիմի վրա։', es: 'Me concentraría en el partido y en el equipo.', personalityTrait: 'Բարձրագույն կենտրոնացում / Enfoque láser', tacticalNoteHy: 'Աղմուկը վերածում եք ներքին մոտիվացիայի։', tacticalNoteEs: 'Aíslas el entorno hostil y te fundes con el juego y tu equipo.' }
    ]
  },
  {
    id: 19,
    partId: 3,
    partTitleEs: 'Situaciones difíciles',
    partTitleHy: 'Բարդ իրավիճակներ',
    partEmoji: '🟠',
    icon: '😢',
    titleEs: 'Tu compañero falla un penalti',
    titleHy: 'Խաղընկերդ վրիպում է 11-մետրանոցից',
    scenarioHy: 'Քո խաղընկերը վերջին րոպեին չի կարողանում իրացնել 11-մետրանոցը, և ձեր թիմը պարտվում է։ Նա սկսում է լաց լինել և ասում է, որ ամեն ինչ իր մեղքով է։ Ի՞նչ կասես նրան։',
    scenarioEs: 'Tu compañero falla un penalti en el último minuto y vuestro equipo pierde. Empieza a llorar y dice que todo es culpa suya. ¿Qué le dirías?',
    rewardAmount: '€210,000',
    rewardValue: 210000,
    options: [
      { id: 'A', hy: '«Դու փչացրեցիր ամեն ինչ»։', es: '«Lo has arruinado todo».', personalityTrait: 'Դաժան մեղադրող / Reproche hiriente', tacticalNoteHy: 'Ծանր հարված արդեն իսկ ընկճված խաղացողին։', tacticalNoteEs: 'Destruyes anímicamente a quien ya se siente culpable.' },
      { id: 'B', hy: '«Մենք թիմ ենք և միասին ենք հաղթում ու պարտվում»։', es: '«Somos un equipo y ganamos y perdemos juntos».', personalityTrait: 'Իրական եղբայրություն / Solidaridad dorada', tacticalNoteHy: 'Ոսկե խոսքեր. ֆուտբոլը թիմային խաղ է, սխալվում են բոլորը։', tacticalNoteEs: 'La esencia del deporte rey: la unión en la adversidad.' },
      { id: 'C', hy: '«Այլևս երբեք 11-մետրանոց մի՛ հարվածիր»։', es: '«No vuelvas a tirar un penalti nunca».', personalityTrait: 'Կտրուկ արգելք / Prohibición categórica', tacticalNoteHy: 'Զրկում եք նրան ապագայում ռեվանշի հնարավորությունից։', tacticalNoteEs: 'Cierras la puerta a su redención futura.' },
      { id: 'D', hy: '«Ես այլևս չեմ ուզում քեզ հետ խաղալ»։', es: '«Ya no quiero jugar contigo».', personalityTrait: 'Անձնական խզում / Ruptura definitiva', tacticalNoteHy: 'Անձնական վիրավորանք պարտության ազդեցությամբ։', tacticalNoteEs: 'Condenas la relación deportiva por un fallo humano.' }
    ]
  },
  {
    id: 20,
    partId: 3,
    partTitleEs: 'Situaciones difíciles',
    partTitleHy: 'Բարդ իրավիճակներ',
    partEmoji: '🟠',
    icon: '🏆',
    titleEs: 'Una victoria inesperada',
    titleHy: 'Անսպասելի հաղթանակ',
    scenarioHy: 'Ձեր թիմը հաղթում է շատ ուժեղ մրցակցի, որին մինչ այդ երբեք չէր հաղթել։ Բոլորը ուրախ են, բայց որոշ խաղացողներ սկսում են ծաղրել պարտված թիմին։ Ի՞նչ կանես։',
    scenarioEs: 'Tu equipo gana a un rival muy fuerte al que nunca había vencido antes. Todos están felices, pero algunos jugadores empiezan a burlarse del equipo derrotado. ¿Qué harías?',
    rewardAmount: '€250,000',
    rewardValue: 250000,
    isMilestone: true,
    options: [
      { id: 'A', hy: 'Ես նույնպես կծաղրեի նրանց։', es: 'Yo también me burlaría de ellos.', personalityTrait: 'Էյֆորիայի գերի / Burlón arrastrado', tacticalNoteHy: 'Տարվում եք ընդհանուր էյֆորիայով և մոռանում հարգանքը։', tacticalNoteEs: 'Te sumas a la falta de respeto impulsado por la adrenalina.' },
      { id: 'B', hy: 'Կասեի, որ նրանք վատ ֆուտբոլիստներ են։', es: 'Diría que son malos futbolistas.', personalityTrait: 'Գոռոզ հաղթող / Vencedor arrogante', tacticalNoteHy: 'Նվաստացնում եք արժանի մրցակցին։', tacticalNoteEs: 'Menosprecias la calidad del rival tras ganar.' },
      { id: 'C', hy: 'Կշնորհավորեի իմ թիմին և կհարգեի մրցակցին։', es: 'Felicitaría a mi equipo y respetaría al rival.', personalityTrait: 'Ազնվական չեմպիոն / Caballero del deporte', tacticalNoteHy: 'Մեծությունը երևում է նրանում, թե ինչպես ես հաղթում։ Ֆեյր-փլեյ։', tacticalNoteEs: 'Nobleza deportiva: celebrar el triunfo con clase y honor.' },
      { id: 'D', hy: 'Կհրաժարվեի մրցակցի հետ ձեռք սեղմելուց։', es: 'Me negaría a dar la mano a los rivales.', personalityTrait: 'Սառը արհամարհանք / Desdén gélido', tacticalNoteHy: 'Խախտում եք ավանդական սպորտային էթիկան։', tacticalNoteEs: 'Rompes el saludo tradicional entre deportistas.' }
    ]
  },

  // 🔴 Parte 4. Decisiones de un futbolista — Ֆուտբոլիստի որոշումները
  {
    id: 21,
    partId: 4,
    partTitleEs: 'Decisiones de un futbolista',
    partTitleHy: 'Ֆուտբոլիստի որոշումները',
    partEmoji: '🔴',
    icon: '🌟',
    titleEs: 'Una oferta del Real Madrid',
    titleHy: '«Ռեալ Մադրիդի» առաջարկը',
    scenarioHy: 'Դու երիտասարդ տաղանդավոր ֆուտբոլիստ ես։ «Ռեալ Մադրիդը» առաջարկում է քեզ միանալ իր երիտասարդական թիմին, բայց դու պետք է տեղափոխվես այլ երկիր և հեռու ապրես ընտանիքիցդ։ Ի՞նչ որոշում կկայացնես։',
    scenarioEs: 'Eres un futbolista joven con mucho talento. El Real Madrid te ofrece entrar en su equipo juvenil, pero tendrías que mudarte a otro país y vivir lejos de tu familia. ¿Qué decidirías?',
    rewardAmount: '€300,000',
    rewardValue: 300000,
    options: [
      { id: 'A', hy: 'Առանց մտածելու անմիջապես կհամաձայնեի։', es: 'Aceptaría inmediatamente sin pensarlo.', personalityTrait: 'Անհապաղ երազող / Soñador impulsivo', tacticalNoteHy: 'Կյանքի շանս, որը բաց թողնել չեք ցանկանում։', tacticalNoteEs: 'El tren blanco pasa una vez en la vida y subes sin dudar.' },
      { id: 'B', hy: 'Անմիջապես կհրաժարվեի առաջարկից։', es: 'Rechazaría la oferta inmediatamente.', personalityTrait: 'Ընտանիքի պահապան / Apego familiar estricto', tacticalNoteHy: 'Ընտանեկան ջերմությունն ավելի կարևոր է, քան փառքը։', tacticalNoteEs: 'La cercanía del hogar prima sobre la gloria internacional.' },
      { id: 'C', hy: 'Կդադարեի ֆուտբոլ խաղալ։', es: 'Dejaría de jugar al fútbol.', personalityTrait: 'Կտրուկ հրաժարում / Giro radical', tacticalNoteHy: 'Անսպասելի հիասթափություն մեծ ճնշման պատճառով։', tacticalNoteEs: 'Una respuesta insólita ante el peso del estrellato.' },
      { id: 'D', hy: 'Կքննարկեի առաջարկը ընտանիքիս հետ և կգնահատեի հնարավորությունները։', es: 'Hablaría con mi familia y valoraría las oportunidades.', personalityTrait: 'Իմաստուն ռազմավար / Madurez reflexiva', tacticalNoteHy: 'Հասուն մոտեցում. որոշումները կայացվում են միասին և կշռադատված։', tacticalNoteEs: 'Equilibrio perfecto: consultar con tus seres queridos y analizar el futuro.' }
    ]
  },
  {
    id: 22,
    partId: 4,
    partTitleEs: 'Decisiones de un futbolista',
    partTitleHy: 'Ֆուտբոլիստի որոշումները',
    partEmoji: '🔴',
    icon: '📱',
    titleEs: 'Las redes sociales',
    titleHy: 'Սոցիալական ցանցերը',
    scenarioHy: 'Դու կարևոր խաղում սխալ ես թույլ տվել, և սոցիալական ցանցերում մարդիկ սկսում են քեզ վատ մեկնաբանություններ գրել։ Դու հիասթափված ես և ցանկանում ես բոլորին պատասխանել։ Ի՞նչ կանես։',
    scenarioEs: 'Has cometido un error en un partido importante y la gente empieza a escribir comentarios negativos sobre ti en las redes sociales. Estás decepcionado y quieres responder a todos. ¿Qué harías?',
    rewardAmount: '€375,000',
    rewardValue: 375000,
    options: [
      { id: 'A', hy: 'Կփորձեի չարձագանքել վիրավորանքներին և կենտրոնանալ մարզումների վրա։', es: 'Intentaría no responder a los insultos y concentrarme en entrenar.', personalityTrait: 'Հոգեբանական վահան / Blindaje mental', tacticalNoteHy: 'Իսկական պրոֆեսիոնալի զենքը լռությունն ու մարզումներն են։', tacticalNoteEs: 'La mejor respuesta a los haters se da trabajando en el césped.' },
      { id: 'B', hy: 'Բոլորին կվիրավորեի։', es: 'Insultaría a todos.', personalityTrait: 'Ցանցային կոնֆլիկտ / Guerra virtual', tacticalNoteHy: 'Պատասխան վիրավորանքները վնասում են Ձեր հեղինակությանը։', tacticalNoteEs: 'Entrar al trapo arruina la imagen pública del deportista.' },
      { id: 'C', hy: 'Կդադարեի ֆուտբոլ խաղալ։', es: 'Dejaría de jugar al fútbol.', personalityTrait: 'Հուսահատված / Depresión deportiva', tacticalNoteHy: 'Թույլ եք տալիս անծանոթներին կործանել Ձեր երազանքը։', tacticalNoteEs: 'Permites que críticas anónimas destruyan tu vocación.' },
      { id: 'D', hy: 'Կսկսեի վիճել յուրաքանչյուր մեկնաբանության տակ։', es: 'Empezaría a discutir en cada comentario.', personalityTrait: 'Անվերջ արդարացող / Polemista incansable', tacticalNoteHy: 'Ժամանակի և էներգիայի անիմաստ կորուստ։', tacticalNoteEs: 'Desgaste inútil intentando convencer a todo internet.' }
    ]
  },
  {
    id: 23,
    partId: 4,
    partTitleEs: 'Decisiones de un futbolista',
    partTitleHy: 'Ֆուտբոլիստի որոշումները',
    partEmoji: '🔴',
    icon: '💰',
    titleEs: 'El dinero o el sueño',
    titleHy: 'Փո՞ղ, թե՞ երազանք',
    scenarioHy: 'Երկու ֆուտբոլային ակումբ քեզ պայմանագիր են առաջարկում։ Առաջինն ավելի բարձր աշխատավարձ է տալիս, բայց քիչ խաղաժամանակ է խոստանում։ Երկրորդում աշխատավարձն ավելի ցածր է, սակայն դու ավելի հաճախ կխաղաս։ Ի՞նչ կանես։',
    scenarioEs: 'Dos clubes de fútbol te ofrecen un contrato. El primero te ofrece un salario más alto, pero pocas oportunidades de jugar. En el segundo ganarías menos dinero, pero jugarías con más frecuencia. ¿Qué harías?',
    rewardAmount: '€450,000',
    rewardValue: 450000,
    options: [
      { id: 'A', hy: 'Կընտրեի միայն բարձր աշխատավարձը։', es: 'Elegiría solo el salario más alto.', personalityTrait: 'Ֆինանսական պրագմատիկ / Pragmatismo económico', tacticalNoteHy: 'Ապահովում եք նյութական բարեկեցությունը առաջին հերթին։', tacticalNoteEs: 'Aseguras el patrimonio económico de inmediato.' },
      { id: 'B', hy: 'Կհամեմատեի երկու առաջարկներն ու զարգացման հնարավորությունները։', es: 'Compararía las dos ofertas y las oportunidades de mejorar.', personalityTrait: 'Հեռատես զարգացող / Visión a largo plazo', tacticalNoteHy: 'Խաղային պրակտիկան երիտասարդ տարիքում ապահովում է ապագա մեծ հաջողությունները։', tacticalNoteEs: 'El desarrollo futbolístico continuo genera mayor valor con los años.' },
      { id: 'C', hy: 'Կմերժեի երկու առաջարկները՝ առանց ուսումնասիրելու։', es: 'Rechazaría ambas ofertas sin analizarlas.', personalityTrait: 'Անվճռական հրաժարվող / Rechazo visceral', tacticalNoteHy: 'Փակում եք երկու դռներն էլ միաժամանակ։', tacticalNoteEs: 'Descartas oportunidades sin medir las consecuencias.' },
      { id: 'D', hy: 'Կընտրեի պատահականորեն։', es: 'Elegiría al azar.', personalityTrait: 'Ճակատագրի խաղացող / Ruleta de destino', tacticalNoteHy: 'Ապավինում եք մետաղադրամին կամ բախտին։', tacticalNoteEs: 'Dejas tu carrera deportiva en manos de la suerte.' }
    ]
  },
  {
    id: 24,
    partId: 4,
    partTitleEs: 'Decisiones de un futbolista',
    partTitleHy: 'Ֆուտբոլիստի որոշումները',
    partEmoji: '🔴',
    icon: '🏃‍♂️',
    titleEs: 'El entrenamiento difícil',
    titleHy: 'Դժվար մարզումը',
    scenarioHy: 'Մարզիչը շատ ծանր մարզում է կազմակերպել։ Դու արդեն հոգնել ես, բայց գիտես, որ պետք է զարգացնես ֆիզիկական պատրաստվածությունդ։ Ի՞նչ կանես, եթե առողջ ես և պարզապես հոգնածություն ես զգում։',
    scenarioEs: 'El entrenador ha preparado un entrenamiento muy exigente. Ya estás cansado, pero sabes que necesitas mejorar tu condición física. ¿Qué harías si estás sano y solo sientes cansancio normal?',
    rewardAmount: '€525,000',
    rewardValue: 525000,
    options: [
      { id: 'A', hy: 'Կհրաժարվեի բոլոր վարժություններից։', es: 'Me negaría a hacer todos los ejercicios.', personalityTrait: 'Կարգապահության խախտում / Negativa de esfuerzo', tacticalNoteHy: 'Հրաժարվում եք ֆիզիկական ծանրաբեռնվածությունից։', tacticalNoteEs: 'Te plantas frente a la carga física programada.' },
      { id: 'B', hy: 'Կձևացնեի, թե վնասվածք ունեմ։', es: 'Fingiría estar lesionado.', personalityTrait: 'Խորամանկ սիմուլյանտ / Simulación de conveniencia', tacticalNoteHy: 'Խաբում եք մարզչական շտաբին հանգստանալու համար։', tacticalNoteEs: 'Truco deshonesto para escapar del sufrimiento físico.' },
      { id: 'C', hy: 'Կշարունակեի մարզվել իմ հնարավորությունների սահմաններում։', es: 'Seguiría entrenando dentro de mis posibilidades.', personalityTrait: 'Կամքի ուժ / Fuerza de voluntad férrea', tacticalNoteHy: 'Հաղթահարում եք հոգնածությունը. չեմպիոնները կռվում են հենց այս պահերին։', tacticalNoteEs: 'Superas la barrera del cansancio donde se forjan los campeones.' },
      { id: 'D', hy: 'Առանց թույլտվության կհեռանայի։', es: 'Me iría sin permiso.', personalityTrait: 'Ինքնակամ փախուստ / Fuga no autorizada', tacticalNoteHy: 'Առանց մեկ բառի լքում եք մարզաբազան։', tacticalNoteEs: 'Abandono sin avisar con grave multa deportiva.' }
    ]
  },
  {
    id: 25,
    partId: 4,
    partTitleEs: 'Decisiones de un futbolista',
    partTitleHy: 'Ֆուտբոլիստի որոշումները',
    partEmoji: '🔴',
    icon: '🧠',
    titleEs: 'El miedo a perder',
    titleHy: 'Պարտվելու վախը',
    scenarioHy: 'Վաղը կարևոր խաղ ունես։ Դու անընդհատ մտածում ես, որ կարող ես սխալվել և հիասթափեցնել թիմին։ Այդ մտքերը խանգարում են քեզ հանգստանալ։ Ի՞նչ կանես։',
    scenarioEs: 'Mañana tienes un partido importante. No paras de pensar que puedes equivocarte y decepcionar a tu equipo. Estos pensamientos te impiden relajarte. ¿Qué harías?',
    rewardAmount: '€600,000',
    rewardValue: 600000,
    isMilestone: true,
    options: [
      { id: 'A', hy: 'Ամբողջ գիշեր չէի քնի։', es: 'No dormiría en toda la noche.', personalityTrait: 'Անքուն տագնապ / Insomnio ansioso', tacticalNoteHy: 'Լարվածությունը հաղթում է ֆիզիկական հանգստին։', tacticalNoteEs: 'Llegas desvelado y sin combustible al gran choque.' },
      { id: 'B', hy: 'Կմտածեի միայն հնարավոր պարտության մասին։', es: 'Pensaría solo en una posible derrota.', personalityTrait: 'Պեսիմիստական պտույտ / Espiral negativa', tacticalNoteHy: 'Նեգատիվ մտքերը սպառում են հաղթանակի կամքը։', tacticalNoteEs: 'Alimentas el miedo al fracaso en tu mente.' },
      { id: 'C', hy: 'Կհրաժարվեի խաղալուց։', es: 'Me negaría a jugar.', personalityTrait: 'Փախուստ պատասխանատվությունից / Retirada preventiva', tacticalNoteHy: 'Խուսափում եք մարտահրավերից։', tacticalNoteEs: 'Te bajas de la convocatoria por puro pánico escénico.' },
      { id: 'D', hy: 'Կփորձեի հանգստանալ, լավ քնել և վստահել իմ պատրաստվածությանը։', es: 'Intentaría relajarme, dormir bien y confiar en mi preparación.', personalityTrait: 'Ներքին վստահություն / Autoconfianza serena', tacticalNoteHy: 'Հիշեք ամիսների աշխատանքը։ Դուք պատրաստ եք հաղթելու։', tacticalNoteEs: 'Confianza en las horas de entrenamiento acumuladas y descanso vital.' }
    ]
  },

  // 🔵 Parte 5. Eres el entrenador — Դու մարզիչն ես
  {
    id: 26,
    partId: 5,
    partTitleEs: 'Eres el entrenador',
    partTitleHy: 'Դու մարզիչն ես',
    partEmoji: '🔵',
    icon: '👨‍🏫',
    titleEs: 'El mejor jugador llega tarde',
    titleHy: 'Լավագույն խաղացողն ուշանում է',
    scenarioHy: 'Դու ֆուտբոլային թիմի մարզիչն ես։ Թիմի լավագույն հարձակվողը երրորդ անգամ ուշանում է մարզումից։ Նա ասում է, որ շատ լավ է խաղում, և ուշանալը կարևոր չէ։ Ինչպե՞ս կվարվես։',
    scenarioEs: 'Eres entrenador de un equipo de fútbol. Tu mejor delantero llega tarde al entrenamiento por tercera vez. Dice que juega muy bien y que llegar tarde no es importante. ¿Qué harías?',
    rewardAmount: '€700,000',
    rewardValue: 700000,
    options: [
      { id: 'A', hy: 'Կխոսեի նրա հետ և կհիշեցնեի թիմի կանոնները։', es: 'Hablaría con él y le recordaría las reglas del equipo.', personalityTrait: 'Արդար մարզիչ / Técnico con principios', tacticalNoteHy: 'Ոչ մի աստղ թիմի կանոններից վեր չէ։ Կարգապահությունը հաղթանակի հիմքն է։', tacticalNoteEs: 'Nadie está por encima del escudo ni de la disciplina del grupo.' },
      { id: 'B', hy: 'Կանտեսեի ուշացումները, որովհետև լավ է խաղում։', es: 'Ignoraría los retrasos porque juega bien.', personalityTrait: 'Արտոնյալ վերաբերմունք / Trato de favor peligroso', tacticalNoteHy: 'Արտոնությունները կարող են քանդել հանդերձարանի հարգանքը։', tacticalNoteEs: 'Creas privilegios que generan resentimiento en el vestuario.' },
      { id: 'C', hy: 'Կպատժեի ամբողջ թիմին։', es: 'Castigaría a todo el equipo.', personalityTrait: 'Կոլեկտիվ պատիժ / Castigo colectivo injusto', tacticalNoteHy: 'Անմեղներին պատժելը կարող է դժգոհություն առաջացնել։', tacticalNoteEs: 'Hacer pagar a justos por pecadores genera desunión.' },
      { id: 'D', hy: 'Կասեի, որ նա կարող է ընդհանրապես չմարզվել։', es: 'Le diría que no necesita entrenar.', personalityTrait: 'Ամբողջական զիջում / Capitulación de autoridad', tacticalNoteHy: 'Կորցնում եք մարզչական ղեկը։', tacticalNoteEs: 'Cedes totalmente el control a los caprichos del jugador.' }
    ]
  },
  {
    id: 27,
    partId: 5,
    partTitleEs: 'Eres el entrenador',
    partTitleHy: 'Դու մարզիչն ես',
    partEmoji: '🔵',
    icon: '⚽',
    titleEs: 'El jugador que nunca marca',
    titleHy: 'Ֆուտբոլիստը, որը գոլ չի խփում',
    scenarioHy: 'Քո թիմում կա հարձակվող, որն արդեն տասը խաղ է՝ գոլ չի խփել։ Նա կորցրել է ինքնավստահությունը և մտածում է, որ այլևս լավ ֆուտբոլիստ չէ։ Որպես մարզիչ՝ ի՞նչ կանես։',
    scenarioEs: 'En tu equipo hay un delantero que lleva diez partidos sin marcar un gol. Ha perdido la confianza en sí mismo y cree que ya no es buen futbolista. Como entrenador, ¿qué harías?',
    rewardAmount: '€800,000',
    rewardValue: 800000,
    options: [
      { id: 'A', hy: 'Բոլորի ներկայությամբ կքննադատեի նրան։', es: 'Lo criticaría delante de todos.', personalityTrait: 'Հրապարակային նսեմացում / Humillación pública', tacticalNoteHy: 'Հրապարակային քննադատությունը ոչնչացնում է վերջին հույսը։', tacticalNoteEs: 'Dañas su autoestima delante de sus compañeros.' },
      { id: 'B', hy: 'Կաջակցեի նրան և կօգնեի բարելավել հմտությունները։', es: 'Lo apoyaría y lo ayudaría a mejorar sus habilidades.', personalityTrait: 'Մանկավարժ մարզիչ / Psicólogo motivador', tacticalNoteHy: 'Իսկական մարզիչը ոգեշնչում է և անհատական աշխատում ճգնաժամի մեջ։', tacticalNoteEs: 'El trabajo técnico extra y el cariño devuelven la chispa al goleador.' },
      { id: 'C', hy: 'Կասեի, որ պետք է թողնի ֆուտբոլը։', es: 'Le diría que debe dejar el fútbol.', personalityTrait: 'Կարիերայի ավարտ / Sentencia destructiva', tacticalNoteHy: 'Կոտրում եք մարդու սպորտային կյանքը։', tacticalNoteEs: 'Empujas al abandono a un deportista en horas bajas.' },
      { id: 'D', hy: 'Կդադարեի նրա հետ խոսել։', es: 'Dejaría de hablar con él.', personalityTrait: 'Սառցե անտարբերություն / Indiferencia helada', tacticalNoteHy: 'Խուսափում եք մարզչական դժվար պատասխանատվությունից։', tacticalNoteEs: 'Te desentiendes de la recuperación humana del jugador.' }
    ]
  },
  {
    id: 28,
    partId: 5,
    partTitleEs: 'Eres el entrenador',
    partTitleHy: 'Դու մարզիչն ես',
    partEmoji: '🔵',
    icon: '🧤',
    titleEs: 'Dos buenos porteros',
    titleHy: 'Երկու լավ դարպասապահ',
    scenarioHy: 'Դու մարզիչ ես և ունես երկու շատ լավ դարպասապահ։ Երկուսն էլ ցանկանում են խաղալ եզրափակիչում։ Նրանցից մեկը քո վաղեմի ընկերոջ որդին է, բայց մյուսը վերջին մարզումներում ավելի լավ է հանդես եկել։ Ո՞ւմ կընտրես։',
    scenarioEs: 'Eres entrenador y tienes dos porteros muy buenos. Ambos quieren jugar la final. Uno de ellos es hijo de un viejo amigo tuyo, pero el otro ha rendido mejor en los últimos entrenamientos. ¿A quién elegirías?',
    rewardAmount: '€900,000',
    rewardValue: 900000,
    options: [
      { id: 'A', hy: 'Ընկերոջս որդուն։', es: 'Al hijo de mi amigo.', personalityTrait: 'Ծանոթ-բարեկամ / Nepotismo amistoso', tacticalNoteHy: 'Անձնական կապերը վեր դասելը խախտում է արդար մրցակցությունը։', tacticalNoteEs: 'Favoreces vínculos personales por encima del mérito deportivo.' },
      { id: 'B', hy: 'Վիճակահանությամբ կընտրեի։', es: 'Lo decidiría por sorteo.', personalityTrait: 'Բախտախաղ / Lotería irresponsable', tacticalNoteHy: 'Խուսափում եք կոնկրետ որոշում կայացնելու բարդությունից։', tacticalNoteEs: 'Delegas una responsabilidad técnica al azar de una moneda.' },
      { id: 'C', hy: 'Ավելի լավ պատրաստված դարպասապահին։', es: 'Al portero que esté mejor preparado.', personalityTrait: 'Արժանիքների արդար գնահատող / Meritocracia pura', tacticalNoteHy: 'Մերիտոկրատիա. խաղում է նա, ով ավելի լավ է պատրաստված։ Թիմը գնահատում է արդարությունը։', tacticalNoteEs: 'Premio al rendimiento real en los entrenamientos. Justicia total.' },
      { id: 'D', hy: 'Կխնդրեի, որ երկուսն էլ հրաժարվեն խաղալուց։', es: 'Les pediría a los dos que no jugaran.', personalityTrait: 'Աբսուրդ չեզոքություն / Solución absurda', tacticalNoteHy: 'Զրկում եք թիմին երկու հիմնական դարպասապահներից։', tacticalNoteEs: 'Dejar la portería vacía por no atreverse a elegir.' }
    ]
  },
  {
    id: 29,
    partId: 5,
    partTitleEs: 'Eres el entrenador',
    partTitleHy: 'Դու մարզիչն ես',
    partEmoji: '🔵',
    icon: '🏆',
    titleEs: 'La final del campeonato',
    titleHy: 'Առաջնության եզրափակիչը',
    scenarioHy: 'Դու թիմի մարզիչն ես, և վաղը ձեր առաջին եզրափակիչն է։ Որոշ խաղացողներ շատ լարված են, իսկ մյուսները չափազանց ինքնավստահ։ Ինչպե՞ս կնախապատրաստես թիմին։',
    scenarioEs: 'Eres el entrenador de un equipo y mañana jugáis vuestra primera final. Algunos jugadores están muy nerviosos y otros tienen demasiada confianza. ¿Cómo prepararías al equipo?',
    rewardAmount: '€950,000',
    rewardValue: 950000,
    options: [
      { id: 'A', hy: 'Կասեի, որ հաղթանակն արդեն ապահովված է։', es: 'Les diría que la victoria ya está asegurada.', personalityTrait: 'Կեղծ հանգստացնող / Exceso de confianza', tacticalNoteHy: 'Թուլացնում եք զգոնությունը խաղից առաջ։', tacticalNoteEs: 'Generas una relajación peligrosa antes del pitido inicial.' },
      { id: 'B', hy: 'Կկազմակերպեի շատ ծանր մարզում՝ առանց հանգստի։', es: 'Organizaría un entrenamiento muy duro sin descanso.', personalityTrait: 'Ֆիզիկական հյուծում / Agotamiento previo', tacticalNoteHy: 'Խաղացողները կմտնեն եզրափակիչ հոգնած մկաններով։', tacticalNoteEs: 'Llegan a la final sin energía en las piernas.' },
      { id: 'C', hy: 'Կասեի, որ պարտության դեպքում բոլորը կպատժվեն։', es: 'Les diría que todos serían castigados si perdieran.', personalityTrait: 'Վախի մթնոլորտ / Régimen de terror', tacticalNoteHy: 'Ավելացնում եք ճնշումը և կապկպում նրանց ոտքերը։', tacticalNoteEs: 'El miedo al castigo atenaza las piernas y bloquea el talento.' },
      { id: 'D', hy: 'Կխոսեի թիմի հետ, կբացատրեի մարտավարությունը և կփորձեի բարձրացնել վստահությունը։', es: 'Hablaría con el equipo, explicaría la estrategia e intentaría aumentar su confianza.', personalityTrait: 'Մեծ մարտավար և հոգեբան / Gran estratega pedagógico', tacticalNoteHy: 'Կատարյալ հավասարակշռություն՝ հստակ պլան և հանգիստ վստահություն։', tacticalNoteEs: 'Plan de partido claro, serenidad táctica y motivación medida.' }
    ]
  },
  {
    id: 30,
    partId: 5,
    partTitleEs: 'Eres el entrenador',
    partTitleHy: 'Դու մարզիչն ես',
    partEmoji: '🔵',
    icon: '🌍',
    titleEs: 'El sueño de ser campeón del mundo',
    titleHy: 'Աշխարհի չեմպիոն դառնալու երազանքը',
    scenarioHy: 'Պատկերացրու, որ դու ազգային հավաքականի ավագն ես։ Ձեր թիմն առաջին անգամ հասել է աշխարհի առաջնության եզրափակիչ։ Խաղից առաջ երիտասարդ ֆուտբոլիստները շատ հուզված են և վախենում են պարտվելուց։ Որպես ավագ՝ ի՞նչ կասես նրանց։',
    scenarioEs: 'Imagina que eres el capitán de tu selección nacional. Tu equipo ha llegado por primera vez a la final del Mundial. Antes del partido, los jugadores jóvenes están muy nerviosos y tienen miedo de perder. Como capitán, ¿qué les dirías?',
    rewardAmount: '€1,000,000 🏆',
    rewardValue: 1000000,
    isMilestone: true,
    options: [
      { id: 'A', hy: '«Մենք արդեն պարտվել ենք»։', es: '«Ya hemos perdido».', personalityTrait: 'Կապիտուլյացիա / Rendición previa', tacticalNoteHy: 'Կոտրում եք ազգային հավաքականի վերջին հավատը։', tacticalNoteEs: 'Un mensaje derrotista que anula el espíritu mundialista.' },
      { id: 'B', hy: '«Վստահե՛ք ձեզ, պայքարե՛ք մինչև վերջ և երբեք մի՛ հանձնվեք»։', es: '«Confiad en vosotros, luchad hasta el final y no os rindáis nunca».', personalityTrait: 'Լեգենդար առաջնորդ / Capitán legendario eterno', tacticalNoteHy: 'Պատմական ճառ, որը կմտնի ֆուտբոլի պատմության դասագրքեր։ Դուք չեմպիոն եք։', tacticalNoteEs: 'Las palabras inmortales que forjan campeones del mundo. ¡A por la gloria eterna!' },
      { id: 'C', hy: '«Միայն ես կարող եմ հաղթել այս խաղը»։', es: '«Solo yo puedo ganar este partido».', personalityTrait: 'Էգոիստ առաջնորդ / Liderazgo personalista', tacticalNoteHy: 'Արհամարհում եք ամբողջ թիմի աշխատանքը։', tacticalNoteEs: 'Te adjudicas el papel mesiánico olvidando al bloque.' },
      { id: 'D', hy: '«Կարևոր չէ, թե ինչպես կխաղաք»։', es: '«No importa cómo juguéis».', personalityTrait: 'Անտարբերություն / Indiferencia total', tacticalNoteHy: 'Անտարբերություն կարիերայի կարևորագույն խաղից առաջ։', tacticalNoteEs: 'Un mensaje tibio en el momento más sublime del fútbol.' }
    ]
  }
];
