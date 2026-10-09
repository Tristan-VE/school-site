/* =====================================================================
   HIER PAS JE ALLE TEKSTEN AAN
   Open dit bestand in een teksteditor, wijzig de tekst tussen de
   aanhalingstekens "..." en sla op. Ververs daarna de pagina.

   EEN EXTRA BLOKJE TOEVOEGEN
   Kopieer een blok van { tot } , plak hem op de plek waar je hem wilt
   hebben (de volgorde hier is de volgorde op de pagina) en pas de tekst
   aan. Zet een komma achter elk blok, behalve het laatste.

   Velden per blokje:
     titel        de kop onder het plaatje
     tekst        de uitleg eronder (mag leeg zijn: "")
     afbeelding   het plaatje, bijvoorbeeld "images/mijn-plaatje.png"
     alt          beschrijving van het plaatje voor screenreaders (mag weg)
     breedte, hoogte   afmetingen van het plaatje in pixels (mag weg)
     onderdelen   (optioneel) een lijst met korte zinnen, een per onderdeel
     code         (optioneel) een plaatje van je code, bijvoorbeeld "images/code-les-3.png"
     codetekst    (optioneel) wat de code doet, onder het codeplaatje
     model        (alleen Inventor) een 3D-bestand, bijvoorbeeld
                  "modellen/mijn-model.stl". Dan kun je het draaien.
     afbeeldingen (optioneel) twee plaatjes naast elkaar, zie de doos
   ===================================================================== */

window.SITE = {

  naam: "Tristan",
  ondertitel: "Technicus Engineering",
  voettekst: "Tristan, Technicus Engineering",

  menu: [
    { tekst: "Home",          link: "index.html",         pagina: "home" },
    { tekst: "Tinkercad",     link: "tinkercad.html",     pagina: "tinkercad" },
    { tekst: "Inventor",      link: "inventor.html",      pagina: "inventor" },
    { tekst: "LDR-autootje",  link: "ldr-autootje.html",  pagina: "ldr" }
  ],

  /* Teksten in het grote venster */
  teksten: {
    vorige: "Vorige",
    sluiten: "Sluiten",
    volgende: "Volgende",
    van: "van",
    vergroot: "Vergroot: ",
    bekijk3d: "Bekijk en draai in 3D: ",
    codeKop: "Code",
    codeBij: "Code bij ",
    hint3d: "Sleep om te draaien. Scroll of knijp om in en uit te zoomen.",
    laden: "Model laden...",
    foutModel: "Dit 3D-model kon niet geladen worden. Hieronder staat de foto.",
    geenWebgl: "Je browser kan geen 3D laten zien. Hieronder staat de foto."
  },

  /* -------------------------------- Home --------------------------------- */
  home: {
    tabtitel: "Tristan | Home",
    beschrijving: "Over Tristan, student Technicus Engineering.",
    titel: "Hallo, ik ben Tristan",
    alineas: [
      "Ik doe nu de opleiding Technicus Engineering. Op deze site laat ik zien wat ik tijdens de lessen heb gemaakt.",
      "op mijn site vind je mijn Tinkercad schema's, mijn 3D-tekeningen en het LDR-autootje."
    ],
    foto: "",          /* Wil je een foto van jezelf? Zet hem in images/ en vul bijvoorbeeld "images/tristan.jpg" in. */
    fotoAlt: "Foto van Tristan",
    kaartKop: "Wat je hier kunt vinden",
    kaarten: [
      { titel: "Tinkercad",    tekst: "Schakelingen met een ATtiny, leds, sensoren, een motor en meer.", link: "tinkercad.html" },
      { titel: "Inventor",     tekst: "3D-tekeningen die je zelf kunt draaien.",                         link: "inventor.html" },
      { titel: "LDR-autootje", tekst: "Mijn autootje met een lichtsensor.",                              link: "ldr-autootje.html" }
    ],
    voetlink: { tekst: "Tinkercad", link: "tinkercad.html" }
  },

  /* ------------------------------ LDR-autootje --------------------------- */
  ldr: {
    tabtitel: "Tristan | LDR-autootje",
    beschrijving: "Het LDR-autootje van Tristan.",
    intro: [
      "Hier vertel ik hoe je een licht bestuurbaar autootje maakt."
    ],
    voetlink: { tekst: "Tinkercad", link: "tinkercad.html" },
    blokjes: [
      {
        titel: "Les 1: De basis opbouwen",
        tekst: "De voeding en de ATtiny op het breadboard.",
        onderdelen: [
          "De 9 V-batterij zit aangesloten op de spanningsregelaar 7805. Die maakt er 5 V van.",
          "Het oranje draadje brengt die 5 V naar pootje 8 van de ATtiny."
        ],
        afbeelding: "images/ldr-les1-basis.png", breedte: 1200, hoogte: 462,
        alt: "Tinkercad: een 9V-batterij met een rode en een zwarte draad naar een breadboard, met een 5V-regelaar, een oranje draadje en een ATtiny."
      },
      {
        titel: "Les 2: Transistors toevoegen",
        tekst: "Nieuw toegevoegd.",
        onderdelen: [
          "De twee transistors (NPN) werken als schakelaar: een signaal van de ATtiny schakelt de 9v.",
          "De blauwe draadjes verbinden pin 1 en pin 0 met de basis van de transistoren."
        ],
        afbeelding: "images/ldr-les2-transistors.png", breedte: 1172, hoogte: 414,
        alt: "Tinkercad: een 9V-batterij op een breadboard met een 5V-regelaar, een ATtiny en twee NPN-transistors met blauwe draadjes."
      }
    ]   /* Een blokje toevoegen werkt hier hetzelfde als bij Tinkercad */
  },

  /* ------------------------------ Tinkercad ------------------------------ */
  tinkercad: {
    tabtitel: "Tristan | Tinkercad",
    beschrijving: "Schakelingen van Tristan, gemaakt in Tinkercad.",
    /* Meerdere alinea's? Zet ze als losse stukken tekst tussen [ ] met een komma ertussen. */
    intro: [
      "Hieronder staan alle schema's die ik met tinkercad hebben gemaakt. in de lessen heb ik geleerd hoe ik met tinkercad om ga en wat elk onderdeel doet bijvoorbeeld hoe je een multimeter gebruikt. "
    ],
    voetlink: { tekst: "Inventor", link: "inventor.html" },
    blokjes: [
      {
        titel: "Les 1: Spanning en stroom meten",
        tekst: "Een led die knippert, met drie meters om te zien wat er in de schakeling gebeurt.",
        onderdelen: [
          "De spanningsregelaar 7805 maakt van de 9 V --> 5 V voor de ATtiny.",
          "De ATtiny is de microcontroller. Hij zet de led aan en uit.",
          "De weerstand beperkt de stroom door de led, zodat de led niet uitbrand.",
          "De eerste voltmeter meet de spanning over de regelaar 7805, dus de spanning van de batterij.",
          "De tweede voltmeter meet de spanning over de led.",
          "De ampèremeter meet de stroom die door de led loopt."
        ],
        afbeelding: "images/tinkercad-spanning-stroom.png", breedte: 440, hoogte: 294,
        alt: "Tinkercad-schakeling met een 9V-batterij, regelaar, ATtiny en led, met een voltmeter en een ampèremeter.",
        code: "images/code-les-1.png", codeBreedte: 552, codeHoogte: 582,
        codetekst: "Pin 1 gaat 1 seconde aan en 1 seconde uit, steeds opnieuw. Zo gaat de led knipperen."
      },
      {
        titel: "Les 2: looplampje",
        tekst: "Vijf leds waarbij een voor een een lampje gaat branden.",
        onderdelen: [
          "De twee knoopcellen van 3 V leveren samen de spanning van 6 V.",
          "De ATtiny stuurt de vijf leds aan met pin 0 tot en met 4.",
          "Elke led heeft een eigen weerstand die de stroom beperkt.",
          "De voltmeter meet de spanning over een van de leds."
        ],
        afbeelding: "images/tinkercad-leds.png", breedte: 408, hoogte: 282,
        alt: "Tinkercad-schakeling met een ATtiny en vijf leds op een breadboard.",
        code: "images/code-les-2.png", codeBreedte: 260, codeHoogte: 1012,
        codetekst: "Steeds staat één pin op HOOG en de andere vier op LAAG, met 1 seconde wachten ertussen. Daardoor brandt elke led om de beurt."
      },
      {
        titel: "Les 4: Lichtsensor met piezo motor",
        tekst: "Een lichtsensor bepaalt wanneer de rgb-led en de piezo motor aan gaan.",
        onderdelen: [
          "De lichtsensor (LDR) is een weerstand die verandert met het licht. Samen met een vaste weerstand geeft hij de ATtiny een spanning die meeverandert met het licht.",
          "De ATtiny leest die spanning in op pin A2.",
          "De rgb-led kan in drie kleuren branden. De ATtiny stuurt elke kleur aan met een eigen pin.",
          "De piezo maakt geluid als zijn pin op HOOG staat.",
          "De twee voltmeters meten de spanning op twee plekken in de schakeling."
        ],
        afbeelding: "images/tinkercad-lichtsensor.png", breedte: 432, hoogte: 314,
        alt: "Tinkercad-schakeling met een ATtiny, een lichtsensor, een rgb-led en een zoemer.",
        code: "images/code-les-4.png", codeBreedte: 424, codeHoogte: 1020,
        codetekst: "Is de waarde op A2 lager dan 500? Dan branden de drie kleuren van de led om de beurt 1 seconde en klinkt daarna de zoemer 3 seconden. Anders staat alles uit."
      },
      {
        titel: "Les 5: Lampen met lichtsensor",
        tekst: "Twee lampen die knipperen als de lichtsensor een lage waarde meet.",
        onderdelen: [
          "De 9 V-batterij levert de spanning en de 5 V-regelaar maakt daar 5 V van voor de ATtiny.",
          "De lichtsensor en de weerstand samen geven de ATtiny een spanning die met het licht meeverandert.",
          "De ATtiny leest die spanning in op pin A1.",
          "De ATtiny schakelt de twee lampen aan en uit, elk met een eigen pin (pin 0 en pin 1)."
        ],
        afbeelding: "images/tinkercad-lampen.png", breedte: 436, hoogte: 276,
        alt: "Tinkercad-schakeling met een 9V-batterij, 5V-regelaar, ATtiny, een lichtsensor en twee lampen.",
        code: "images/code-les-5.png", codeBreedte: 498, codeHoogte: 818,
        codetekst: "Is de waarde op A1 lager dan 500? Dan brandt eerst de ene lamp, dan de andere, dan allebei en dan geen van beide, elk 1 seconde. Anders blijven beide lampen uit."
      },
      {
        titel: "Les 6: Lichtsensor en potmeter",
        tekst: "Een lichtsensor en een potmeter aan een knoopcel, met twee voltmeters.",
        onderdelen: [
          "De knoopcel van 3 V levert de spanning.",
          "De lichtsensor is een weerstand die kleiner of groter wordt als er meer of minder licht op valt.",
          "De potmeter is een weerstand die je zelf verandert door aan de knop te draaien.",
          "De eerste voltmeter meet de spanning over de lichtsensor.",
          "De tweede voltmeter meet de spanning over (een deel van) de potmeter."
        ],
        afbeelding: "images/tinkercad-lichtsensor-potmeter.png", breedte: 1400, hoogte: 768,
        alt: "Tinkercad-schakeling met een knoopcel, een lichtsensor en een potmeter, met twee voltmeters."
      },
      {
        titel: "Les 7: Gelijkstroommotor en lamp",
        tekst: "Een gelijkstroommotor en een lamp die de ATtiny met twee transistors aanstuurt.",
        onderdelen: [
          "De 9 V-batterij levert de spanning en de 5 V-regelaar maakt daar 5 V van voor de ATtiny.",
          "De gelijkstroommotor en de lamp hebben meer stroom nodig dan een pin van de ATtiny kan leveren.",
          "Elke transistor werkt als schakelaar: de ATtiny geeft een klein signaal en de transistor laat dan de grote stroom voor de gelijkstroommotor of de lamp door.",
          "De ampèremeter meet de totale stroom die de batterij levert."
        ],
        afbeelding: "images/tinkercad-motor-lamp.png", breedte: 1324, hoogte: 706,
        alt: "Tinkercad-schakeling met een ATtiny die via twee transistors een motor en een lamp schakelt.",
        code: "images/code-les-7.png", codeBreedte: 496, codeHoogte: 834,
        codetekst: "Pin 0 en pin 1 krijgen een waarde tussen 0 en 255: eerst 50 (6 seconden), dan 200 (6 seconden) en dan 0 (2 seconden). Hoe hoger de waarde, hoe harder de motor draait en hoe feller de lamp brandt."
      },
      {
        titel: "de pinout van de ATtiny",
        afbeelding: "images/attiny85-pinout.svg", breedte: 600, hoogte: 480,
        alt: "Pinout van de ATtiny85: pootje 1 reset, 2 pin 3 (A3), 3 pin 4 (A2), 4 GND, 5 pin 0 (PWM), 6 pin 1 (PWM), 7 pin 2 (A1), 8 VCC."
      }
    ]
  },

  /* ------------------------------ Inventor ------------------------------- */
  inventor: {
    tabtitel: "Tristan | Inventor",
    beschrijving: "3D-tekeningen van Tristan, gemaakt in Inventor.",
    intro: "Hier staan mijn 3D-tekeningen die ik heb gemaakt in Inventor.",
    voetlink: { tekst: "Tinkercad", link: "tinkercad.html" },
    blokjes: [
      {
        titel: "Vierkante plaat met gat",
        afbeelding: "images/inventor-plaat.jpg", breedte: 952, hoogte: 1134,
        model: "modellen/Opdracht_1a.stl"
      },
      {
        titel: "Ronde dop",
        afbeelding: "images/inventor-stop.jpg", breedte: 882, hoogte: 954,
        model: "modellen/Opdracht_1b.stl"
      },
      {
        titel: "Plaat met dop",
        alt: "Een plaat met een ronde dop in het gat.",
        afbeelding: "images/inventor-plaat-met-stop.jpg", breedte: 590, hoogte: 706,
        model: "modellen/Opdracht_1c.stl"
      },
      {
        titel: "Bol",
        afbeelding: "images/inventor-bol.jpg", breedte: 866, hoogte: 818,
        model: "modellen/Balletje.stl"
      },
	  {
        titel: "Doosje met vormpjes",
        afbeeldingen: [
          {
            bestand: "images/inventor-doos-1.jpg", breedte: 1000, hoogte: 964,
            alt: "Een kubus met een ronde, een vierkante en een halfronde opening."
          },
          {
            bestand: "images/inventor-doos-2.jpg", breedte: 978, hoogte: 912,
            alt: "Dezelfde kubus met een driehoekige, een vierkante en een sleufvormige opening."
          }
        ],
        model: "modellen/Extra_opdracht.stl"
      },
      {
        titel: "Driehoek met gat",
        afbeelding: "images/inventor-driehoek.png", breedte: 866, hoogte: 818,
        model: "modellen/driehoek.stl"
      }
    ]
  }
};
