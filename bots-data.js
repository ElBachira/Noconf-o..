// bots-data.js

const botsData = [
  {
    // === Datos Generales ===
    id: "bom-seok", // Identificador ÚNICO para la URL (ej: ?bot=bom-seok)
    nombre: "Han Bom-seok",
    tituloPagina: "Bom-seok", // Para la <title> de la página
    imagenPolaroid: "stellan.png",
    washiTape: "Bachira",
    cita: "Me convertí en el villano de su historia para sobrevivir. Aquí, al menos las reglas son claras: Proteger a los corderos y cazar a los lobos, incluso si tengo que usar sus propios dientes",
    
    // === Reproductor de Música ===
    audioSrc: "song.mp3",
    nombreCancion: "Wildflower",
    artistaCancion: "Billie Eilish",
    
    // === Ficha de Datos (Sección de Papel) ===
    ficha: {
      nombreCompleto: "Han Bom-seok (한봄석) / Jugador 380",
      edad: "26 años (pero con el alma de alguien que ya ha vivido —y muerto— varias veces)",
      genero: "Masculino",
      preferencia: "Que no seas tan estúpidamente vulnerable. O que, al menos, te quedes detrás de él"
    },
    
    // === Etiquetas ===
    tags: ["380", "Deuda", "Protector"],

    // === Secciones de Texto Largo ===
    tuRol: "Eres Park {{user}}, Jugadora 125. Eres la \"cordera\". Pequeña, tímida y visiblemente aterrorizada, eres la antítesis de todo lo que Bom-seok proyecta. Para él, no eres una carga, eres su ancla a la humanidad. Eres un eco de la inocencia que no pudo proteger en su pasado, y se ha aferrado a ti con la ferocidad de un lobo defendiendo a su única cría. Él te eligió porque estás demasiado asustada para traicionar, y en este mundo de mentiras, tu honesta cobardía es el bien más preciado. Eres, sin saberlo, su misión, su mayor debilidad y la única razón por la que todavía lucha por algo más que su propia supervivencia.",
    historia: "Me convertí en el villano de la historia de otra persona...", // Aquí iría el texto completo de la historia

    // === Stats (Pestaña de Análisis) ===
    stats: {
      "🤬 HDP": 75,
      "🥀 Angst": 95,
      "✨ Fantasía": 20,
      "🌶️ Cochino": 60,
      "🎭 Drama": 90,
      "💌 Amor": 85,
      "🧠 Locura": 70
    },

    // === Links (Pestaña de Plataformas) ===
    links: {
      janitor: "https://janitorai.com/characters/02071b20-8784-4dd3-bc00-c57c7bda874a_character-bom-seok",
      card: "card.png",
      haiku: "https://poe.com/Han_Bom-seok",
      sonnet: "https://poe.com/Han_Bom-seokS",
      chub: "https://chub.ai/characters/ElBachira/bom-seok-04c001c95759",
      caveduck: "https://es.cvdk.io/c/DWHdRr8_QgqvCQJWmR3m6g?rc=undefined"
    }
  },
  {
    // === AQUÍ EMPIEZA TU SEGUNDO BOT ===
    id: "acelin",
    nombre: "Acelin",
    tituloPagina: "Acelin",
    imagenPolaroid: "ruta/a/la/foto_de_acelin.png",
    washiTape: "Otro Autor",
    cita: "Irónicamente, es la misma persona que aborrece en su vida civil...",
    
    audioSrc: "otra_cancion.mp3",
    nombreCancion: "Otra Canción",
    artistaCancion: "Otro Artista",
    
    ficha: {
      nombreCompleto: "Acelin Dubois / Héroe X",
      // ...rellenar el resto de datos para Acelin
    },
    tags: ["Héroe", "París", "Secreto"],
    tuRol: "...",
    historia: "...",
    stats: { "🤬 HDP": 20, "🥀 Angst": 60, /* etc... */ },
    links: { janitor: "...", card: "...", /* etc... */ }
  }
  // ... Y así sucesivamente para tus 74 bots. Solo tienes que añadir un nuevo objeto {} a este array.
];
