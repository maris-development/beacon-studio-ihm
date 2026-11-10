import type { BrandLocales } from "@/i18n";

// Text overrides per locale. Use inline literals, so the type check catches a wrong key.
export default {
    en: {
        app: {
            logoAlt: "Informatiehuis Marien logo",
            logoText: "Beacon Studio"
        },
        home: {
            title: {
                beforeHighlight: "Query the marine data of the",
                highlight: "Dutch North Sea"
            },
            subtitle:
                "Monitoring and research data about water quality, the seabed, fish, birds and marine mammals, from 1968 to today."
        }
    },
    es: {
        app: {
            logoAlt: "Logotipo de Informatiehuis Marien",
            logoText: "Beacon Studio"
        },
        home: {
            title: {
                beforeHighlight: "Consulte los datos marinos del",
                highlight: "mar del Norte neerlandés"
            },
            subtitle:
                "Datos de seguimiento e investigación sobre la calidad del agua, el fondo marino, los peces, las aves y los mamíferos marinos, desde 1968 hasta hoy."
        }
    },
    it: {
        app: {
            logoAlt: "Logo di Informatiehuis Marien",
            logoText: "Beacon Studio"
        },
        home: {
            title: {
                beforeHighlight: "Interroga i dati marini del",
                highlight: "Mare del Nord olandese"
            },
            subtitle:
                "Dati di monitoraggio e di ricerca sulla qualità dell'acqua, il fondale marino, i pesci, gli uccelli e i mammiferi marini, dal 1968 a oggi."
        }
    },
    nl: {
        app: {
            logoAlt: "Logo van Informatiehuis Marien",
            logoText: "Beacon Studio"
        },
        home: {
            title: {
                beforeHighlight: "Bevraag de mariene data van de",
                highlight: "Nederlandse Noordzee"
            },
            subtitle:
                "Monitorings- en onderzoeksdata over waterkwaliteit, de zeebodem, vissen, vogels en zeezoogdieren, van 1968 tot nu."
        }
    }
} satisfies BrandLocales;
