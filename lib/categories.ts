export type Calculadora = {
  id: string
  nombre: string
  descripcion: string
  icono: string
  ruta: string
}

export type Categoria = {
  id: string
  nombre: string
  descripcion: string
  calculadoras: Calculadora[]
  icono: string
}

export const categorias: Categoria[] = [
  {
    id: "finanzas-dinero",
    nombre: "Finanzas y Dinero",
    descripcion:
      "Herramientas para cálculos financieros básicos, conversiones de monedas y estimaciones de inversiones.",
    icono: "Landmark",
    calculadoras: [
      {
        id: "interes-compuesto",
        nombre: "Interés Compuesto",
        descripcion:
          "Calcula el valor futuro de una inversión o depósito basado en el capital inicial, tasa de interés anual, frecuencia de capitalización y período de tiempo.",
        icono: "TrendingUp",
        ruta: "/categoria/finanzas-dinero/interes-compuesto",
      },
      {
        id: "euros-pesetas",
        nombre: "Conversor Euros ↔ Pesetas",
        descripcion:
          "Convierte cantidades entre Euros (EUR) y la antigua Peseta española (ESP) usando el tipo de cambio fijo oficial.",
        icono: "RefreshCw",
        ruta: "/categoria/finanzas-dinero/euros-pesetas",
      },
      {
        id: "fondos-indexados",
        nombre: "Crecimiento de Fondos Indexados",
        descripcion: "Proyecta el crecimiento potencial de una inversión en fondos indexados a lo largo del tiempo.",
        icono: "LineChart",
        ruta: "/categoria/finanzas-dinero/fondos-indexados",
      },
    ],
  },
  {
    id: "salud-bienestar",
    nombre: "Salud y Bienestar",
    descripcion: "Herramientas para estimaciones relacionadas con la salud y el bienestar personal.",
    icono: "Heart",
    calculadoras: [
      {
        id: "apiretal",
        nombre: "Dosis de Apiretal",
        descripcion: "Estima la dosis recomendada (en ml) de Apiretal (paracetamol) según el peso del niño.",
        icono: "Droplet",
        ruta: "/categoria/salud-bienestar/apiretal",
      },
      {
        id: "dalsy",
        nombre: "Dosis de Dalsy",
        descripcion: "Estima la dosis recomendada (en ml) de Dalsy (ibuprofeno) según el peso del niño.",
        icono: "Droplet",
        ruta: "/categoria/salud-bienestar/dalsy",
      },
      {
        id: "ciclos-sueno",
        nombre: "Ciclos de Sueño",
        descripcion: "Ayuda a determinar horarios óptimos para dormir o despertar basándose en ciclos de sueño.",
        icono: "Moon",
        ruta: "/categoria/salud-bienestar/ciclos-sueno",
      },
      {
        id: "ciclo-menstrual",
        nombre: "Ciclo Menstrual",
        descripcion: "Predice la fecha aproximada de la próxima menstruación y la ventana fértil.",
        icono: "Calendar",
        ruta: "/categoria/salud-bienestar/ciclo-menstrual",
      },
      {
        id: "homa-ir",
        nombre: "Índice HOMA-IR",
        descripcion: "Calcula el índice HOMA-IR para evaluar la resistencia a la insulina.",
        icono: "Activity",
        ruta: "/categoria/salud-bienestar/homa-ir",
      },
    ],
  },
  {
    id: "matematicas-ciencias",
    nombre: "Matemáticas y Ciencias",
    descripcion: "Herramientas para cálculos matemáticos y científicos básicos.",
    icono: "Square",
    calculadoras: [
      {
        id: "raiz-cuadrada",
        nombre: "Raíz Cuadrada",
        descripcion: "Calcula la raíz cuadrada de un número no negativo.",
        icono: "Check",
        ruta: "/categoria/matematicas-ciencias/raiz-cuadrada",
      },
      {
        id: "mcd",
        nombre: "Máximo Común Divisor (MCD)",
        descripcion: "Encuentra el máximo común divisor de dos o más números enteros.",
        icono: "Divide",
        ruta: "/categoria/matematicas-ciencias/mcd",
      },
      {
        id: "notacion-cientifica",
        nombre: "Notación Científica",
        descripcion: "Convierte números entre notación decimal estándar y notación científica.",
        icono: "Superscript",
        ruta: "/categoria/matematicas-ciencias/notacion-cientifica",
      },
      {
        id: "coeficientes-binomiales",
        nombre: "Coeficientes Binomiales",
        descripcion: "Calcula el coeficiente binomial 'n sobre k'.",
        icono: "Code",
        ruta: "/categoria/matematicas-ciencias/coeficientes-binomiales",
      },
      {
        id: "ecuacion-cuadratica",
        nombre: "Ecuación Cuadrática",
        descripcion: "Resuelve ecuaciones cuadráticas de la forma ax² + bx + c = 0.",
        icono: "Function",
        ruta: "/categoria/matematicas-ciencias/ecuacion-cuadratica",
      },
      {
        id: "aceleracion",
        nombre: "Aceleración",
        descripcion: "Calcula la aceleración constante basándose en la velocidad inicial, final y el tiempo.",
        icono: "ZapFast",
        ruta: "/categoria/matematicas-ciencias/aceleracion",
      },
    ],
  },
  {
    id: "vida-diaria",
    nombre: "Vida Diaria y Utilidades",
    descripcion: "Herramientas para cálculos y conversiones de uso cotidiano.",
    icono: "CalendarClock",
    calculadoras: [
      {
        id: "metros-cuadrados",
        nombre: "Metros Cuadrados (Área)",
        descripcion: "Calcula el área de una superficie rectangular o cuadrada.",
        icono: "SquareStack",
        ruta: "/categoria/vida-diaria/metros-cuadrados",
      },
      {
        id: "ritmo-carrera",
        nombre: "Ritmo de Carrera",
        descripcion: "Calcula el ritmo medio de carrera a partir de la distancia y el tiempo.",
        icono: "Running",
        ruta: "/categoria/vida-diaria/ritmo-carrera",
      },
      {
        id: "gasolina-viaje",
        nombre: "Gasolina para Viaje",
        descripcion: "Estima la cantidad de gasolina necesaria y el coste total para un viaje.",
        icono: "Fuel",
        ruta: "/categoria/vida-diaria/gasolina-viaje",
      },
      {
        id: "letra-dni",
        nombre: "Letra del DNI",
        descripcion: "Calcula la letra de control correspondiente a un número de DNI español.",
        icono: "CreditCard",
        ruta: "/categoria/vida-diaria/letra-dni",
      },
      {
        id: "consumo-gasolina",
        nombre: "Consumo de Gasolina",
        descripcion: "Calcula la eficiencia de combustible de un vehículo.",
        icono: "Car",
        ruta: "/categoria/vida-diaria/consumo-gasolina",
      },
    ],
  },
  {
    id: "construccion-hogar",
    nombre: "Construcción y Hogar",
    descripcion: "Herramientas básicas para cálculos relacionados con construcción y hogar.",
    icono: "Home",
    calculadoras: [
      {
        id: "areas-triangulos",
        nombre: "Área de Triángulos",
        descripcion: "Calcula el área de un triángulo proporcionando la base y la altura.",
        icono: "Triangle",
        ruta: "/categoria/construccion-hogar/areas-triangulos",
      },
      {
        id: "volumen-concreto",
        nombre: "Volumen de Concreto",
        descripcion: "Calcula el volumen de concreto necesario para rellenar una forma rectangular.",
        icono: "Box",
        ruta: "/categoria/construccion-hogar/volumen-concreto",
      },
    ],
  },
]
