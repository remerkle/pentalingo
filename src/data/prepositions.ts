import type { PrepositionExercise } from '../types';

// [sentence with "___" blank, correct preposition, distractor 1, distractor 2, translation/usage note]
type Entry = readonly [string, string, string, string, string];

function makeEntries(languageId: string, prefix: string, entries: Entry[]): PrepositionExercise[] {
  return entries.map(([sentence, correct, d1, d2, translation], i) => ({
    id: `prep-${prefix}-${i + 1}`,
    languageId,
    sentence,
    correct,
    distractors: [d1, d2],
    translation,
  }));
}

const DUTCH_PREPOSITIONS = makeEntries('nl', 'nl', [
  ['Ik ga ___ de trein naar Amsterdam.', 'met', 'op', 'in', "I'm going to Amsterdam by train — \"met\" for means of transport."],
  ['Ik zit ___ tafel te eten.', 'aan', 'op', 'bij', "I'm sitting at the table eating — \"aan tafel\" is a fixed expression."],
  ['Het boek ligt ___ de tafel.', 'op', 'aan', 'in', 'The book is lying on the table — physical surface.'],
  ['Ik wacht ___ de bus.', 'op', 'voor', 'aan', "I'm waiting for the bus — \"wachten op\" is fixed."],
  ['Ik denk vaak ___ jou.', 'aan', 'over', 'om', "I often think of you — \"denken aan\" is fixed."],
  ['We gaan morgen ___ school.', 'naar', 'in', 'op', "We're going to school tomorrow — \"naar\" shows direction."],
  ['___ de zomer ga ik op vakantie.', 'In', 'Op', 'Aan', 'In summer I go on vacation.'],
  ['Ik werk ___ een kantoor in Utrecht.', 'in', 'op', 'aan', 'I work in an office in Utrecht — enclosed space.'],
  ['Ze is verliefd ___ hem.', 'op', 'aan', 'met', "She's in love with him — \"verliefd op\" is fixed."],
  ['Ik ben trots ___ mijn dochter.', 'op', 'aan', 'voor', "I'm proud of my daughter — \"trots op\" is fixed."],
  ['Hij lijkt ___ zijn vader.', 'op', 'aan', 'als', 'He resembles his father — "lijken op" is fixed.'],
  ['We praten ___ het weer.', 'over', 'van', 'om', "We're talking about the weather — \"praten over\" is fixed."],
  ['Ik hou ___ chocolade.', 'van', 'voor', 'aan', "I love chocolate — \"houden van\" is fixed."],
  ['Het cadeau is ___ jou.', 'voor', 'aan', 'naar', 'The gift is for you.'],
  ['Ik ga ___ het weekend naar mijn ouders.', 'in', 'op', 'aan', 'I\'m going to my parents\' on the weekend — Dutch uses "in het weekend", unlike English "on the weekend".'],
  ['Zij woont ___ de derde verdieping.', 'op', 'in', 'aan', 'She lives on the third floor — "op de verdieping" is fixed.'],
  ['Ik ben bang ___ spinnen.', 'voor', 'van', 'aan', "I'm afraid of spiders — \"bang voor\" is fixed."],
  ['Hij is goed ___ wiskunde.', 'in', 'op', 'aan', "He's good at math — \"goed in\" is used for subjects/skills."],
  ['We kijken ___ een film vanavond.', 'naar', 'aan', 'op', "We're watching a movie tonight — \"kijken naar\" is fixed."],
  ['Ik luister ___ muziek.', 'naar', 'aan', 'op', "I'm listening to music — \"luisteren naar\" is fixed."],
]);

const SPANISH_PREPOSITIONS = makeEntries('es', 'es', [
  ['Este regalo es ___ ti.', 'para', 'por', 'a', 'This gift is for you — "para" marks the recipient.'],
  ['Te llamo ___ teléfono.', 'por', 'para', 'en', 'I\'ll call you by phone — "por" marks the means.'],
  ['Voy a la tienda ___ pan.', 'por', 'para', 'a', 'I\'m going to the store for bread — "ir por" = to go get something.'],
  ['Estudio español ___ viajar a España.', 'para', 'por', 'de', 'I study Spanish (in order) to travel to Spain — "para" marks purpose.'],
  ['Estoy ___ casa ahora mismo.', 'en', 'a', 'de', "I'm at home right now — \"en\" for static location."],
  ['Voy ___ casa después del trabajo.', 'a', 'en', 'de', "I'm going home after work — \"a\" for movement/direction."],
  ['Pienso mucho ___ ti.', 'en', 'a', 'con', 'I think about you a lot — "pensar en" is fixed.'],
  ['Sueño ___ tener mi propia casa.', 'con', 'en', 'de', 'I dream of having my own house — "soñar con" is fixed.'],
  ['Este tren sale ___ Madrid.', 'de', 'desde', 'en', 'This train departs from Madrid — "salir de" for leaving a place.'],
  ['Trabajo aquí ___ 2015.', 'desde', 'de', 'por', "I've worked here since 2015 — \"desde\" marks a starting point in time."],
  ['Dependo ___ mis padres todavía.', 'de', 'en', 'con', 'I still depend on my parents — "depender de" is fixed.'],
  ['Me alegro ___ verte.', 'de', 'en', 'por', 'I\'m glad to see you — "alegrarse de" is fixed.'],
  ['Confío ___ ti.', 'en', 'de', 'a', 'I trust you — "confiar en" is fixed.'],
  ['Nos vemos ___ las ocho.', 'a', 'en', 'de', 'See you at eight o\'clock — "a" for clock times.'],
  ['El museo está abierto ___ la mañana.', 'por', 'en', 'de', 'The museum is open in the morning — "por la mañana" for general time of day.'],
  ['Nací ___ el año 1995.', 'en', 'a', 'de', 'I was born in 1995 — "en" with years.'],
  ['Este libro fue escrito ___ un autor famoso.', 'por', 'para', 'de', 'This book was written by a famous author — "por" marks the agent.'],
  ['Vamos a caminar ___ el parque.', 'por', 'para', 'en', 'We\'re going to walk through the park — "por" = through/along.'],
  ['Este café es ___ mi abuela.', 'para', 'por', 'de', 'This coffee is for my grandmother — "para" marks the recipient.'],
  ['Cambié mis dólares ___ euros.', 'por', 'para', 'de', 'I exchanged my dollars for euros — "cambiar X por Y".'],
]);

const ENGLISH_PREPOSITIONS = makeEntries('en', 'en', [
  ['I was born ___ 1990.', 'in', 'on', 'at', 'Use "in" for years, months, and seasons.'],
  ['The meeting is ___ Monday morning.', 'on', 'in', 'at', 'Use "on" for specific days.'],
  ['She arrived ___ 9 o\'clock.', 'at', 'in', 'on', 'Use "at" for precise clock times.'],
  ['I have lived here ___ five years.', 'for', 'since', 'during', 'Use "for" with a length/duration of time.'],
  ['I haven\'t seen him ___ Monday.', 'since', 'for', 'from', 'Use "since" with a starting point in time.'],
  ['He explained the problem ___ me.', 'to', 'for', 'with', '"Explain" pairs with "to", not "for".'],
  ['This present is ___ you.', 'for', 'to', 'at', 'Use "for" to show who something is intended for.'],
  ['Sweden is located ___ Norway and Finland.', 'between', 'among', 'amongst', '"Between" is for exactly two things.'],
  ['She is one ___ the best students in the class.', 'among', 'between', 'from', '"Among" is used with groups of three or more.'],
  ['Please finish the report ___ Friday.', 'by', 'until', 'till', '"By" means "no later than".'],
  ['I will be studying ___ 9 pm.', 'until', 'by', 'to', '"Until" describes an action continuing up to a point.'],
  ['She is interested ___ art.', 'in', 'on', 'at', '"Interested in" is a fixed pairing.'],
  ['He\'s good ___ math.', 'at', 'in', 'on', '"Good at" is a fixed pairing for skills.'],
  ['I\'m afraid ___ spiders.', 'of', 'from', 'for', '"Afraid of" is a fixed pairing.'],
  ['We depend ___ each other.', 'on', 'of', 'from', '"Depend on" is a fixed pairing.'],
  ['I\'m looking forward ___ the trip.', 'to', 'for', 'at', '"Look forward to" is fixed (followed by -ing/noun).'],
  ['He arrived ___ the airport an hour early.', 'at', 'in', 'to', 'Use "at" for a specific point like an airport.'],
  ['She arrived ___ London yesterday.', 'in', 'at', 'to', 'Use "in" for cities and countries.'],
  ['The book is ___ the table.', 'on', 'in', 'at', 'Use "on" for surfaces.'],
  ['There\'s some milk ___ the fridge.', 'in', 'on', 'at', 'Use "in" for enclosed spaces.'],
]);

const GERMAN_PREPOSITIONS = makeEntries('de', 'de', [
  ['Ich fahre ___ Berlin.', 'nach', 'zu', 'in', '"Nach" is used with cities and countries for "to".'],
  ['Ich gehe ___ dem Arzt.', 'zu', 'nach', 'an', '"Zu" is used with people and specific places for "to".'],
  ['Das Buch liegt ___ dem Tisch.', 'auf', 'in', 'an', '"Auf" = on top of a surface.'],
  ['Die Bilder hängen ___ der Wand.', 'an', 'auf', 'in', '"An" = on a vertical surface.'],
  ['Ich wohne ___ einer kleinen Stadt.', 'in', 'an', 'auf', '"In" = inside an enclosed area.'],
  ['Ich komme ___ Deutschland.', 'aus', 'von', 'in', '"Aus" marks origin, from within.'],
  ['Das Geschenk ist ___ meiner Oma.', 'von', 'aus', 'für', '"Von" marks something coming from a person.'],
  ['Ich warte ___ den Bus.', 'auf', 'für', 'an', '"Warten auf" is fixed for "to wait for".'],
  ['Ich freue mich ___ die Ferien.', 'auf', 'über', 'an', '"Sich freuen auf" = to look forward to (something upcoming).'],
  ['Ich freue mich ___ dein Geschenk.', 'über', 'auf', 'für', '"Sich freuen über" = to be happy about something already received.'],
  ['Ich habe Angst ___ Spinnen.', 'vor', 'von', 'an', '"Angst vor" is fixed for "afraid of".'],
  ['Ich arbeite hier ___ 2018.', 'seit', 'für', 'von', '"Seit" = since, a starting point continuing to now.'],
  ['Ich bin ___ zwei Wochen im Urlaub.', 'für', 'seit', 'in', '"Für" = for a planned/intended duration.'],
  ['Sie interessiert sich ___ Kunst.', 'für', 'an', 'auf', '"Sich interessieren für" is fixed for "interested in".'],
  ['Er denkt oft ___ seine Familie.', 'an', 'über', 'auf', '"Denken an" is fixed for "to think of".'],
  ['Wir sprechen ___ das Wetter.', 'über', 'von', 'an', '"Sprechen über" is fixed for "to talk about".'],
  ['Er kommt gerade ___ der Schule.', 'aus', 'von', 'in', '"Aus" for coming from inside a building.'],
  ['Der Zug fährt ___ München ab.', 'von', 'aus', 'nach', '"Von...ab" marks the departure point.'],
  ['Ich lege das Buch ___ den Tisch.', 'auf', 'an', 'in', '"Auf" for placing something onto a surface.'],
  ['Die Kinder spielen ___ dem Garten.', 'in', 'an', 'auf', '"In" for inside an enclosed area like a garden.'],
]);

export const PREPOSITION_EXERCISES: PrepositionExercise[] = [
  ...DUTCH_PREPOSITIONS,
  ...SPANISH_PREPOSITIONS,
  ...ENGLISH_PREPOSITIONS,
  ...GERMAN_PREPOSITIONS,
];
