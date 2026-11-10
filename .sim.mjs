// data/roles.json
var roles_default = {
  schemaVersion: "1.3",
  game: {
    id: "loup-garou-bel-tounsi",
    titleFr: "LOUP GAROU BEL TOUNSI",
    titleAr: "\u0644\u0648\u0628 \u063A\u0627\u0631\u0648 \u0628\u0627\u0644\u062A\u0648\u0646\u0633\u064A",
    narratorAr: "\u0627\u0644\u0645\u0639\u0644\u0651\u0645",
    minPlayers: 8,
    maxPlayers: 24
  },
  camps: [
    {
      id: "village",
      nameFr: "Village",
      nameAr: "\u0627\u0644\u062D\u0648\u0645\u0629",
      color: "#3E7CB1",
      emoji: "\u{1F3D8}\uFE0F"
    },
    {
      id: "loups",
      nameFr: "Loups",
      nameAr: "\u0627\u0644\u0630\u064A\u0627\u0628\u0629",
      color: "#D1603D",
      emoji: "\u{1F43A}"
    },
    {
      id: "amoureux",
      nameFr: "Amoureux",
      nameAr: "\u0627\u0644\u062D\u0628\u0627\u064A\u0628",
      color: "#E4698F",
      emoji: "\u{1F494}"
    },
    {
      id: "solo",
      nameFr: "Solitaire",
      nameAr: "\u0648\u062D\u062F\u0627\u0646\u064A",
      color: "#A96BD9",
      emoji: "\u{1F525}"
    }
  ],
  roles: [
    {
      id: "loup_garou",
      nameFr: "Loup Garou",
      emoji: "\u{1F43A}",
      camp: "loups",
      isWolf: true,
      wake: "every_night",
      nightOrder: 190,
      count: {
        min: 1,
        max: 6
      },
      descAr: "\u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u064A\u0642\u064A\u0651\u0645\u0647\u0645 \u0643\u0644 \u0644\u064A\u0644\u0629\u060C \u0648\u0647\u0648\u0645\u0627 \u064A\u062E\u062A\u0627\u0631\u0648 \u0634\u0643\u0648\u0646 \u0628\u0627\u0634 \u064A\u0642\u062A\u0644\u0648.",
      mechAr: "\u0643\u0644 \u0644\u064A\u0644\u0629 \u064A\u0641\u064A\u0642\u0648 \u0645\u0639 \u0628\u0639\u0636\u0647\u0645\u060C \u064A\u062A\u0639\u0627\u0631\u0641\u0648\u060C \u0648\u064A\u062A\u0651\u0641\u0642\u0648 \u0628\u0627\u0644\u0625\u0634\u0627\u0631\u0629 \u0648\u0628\u0644\u0627 \u062D\u0633\u0651 \u0639\u0644\u0649 \u0636\u062D\u064A\u0651\u0629 \u0648\u062D\u062F\u0629. \u0627\u0644\u0630\u064A\u0628 \u0645\u0627 \u064A\u0627\u0643\u0644\u0634 \u0630\u064A\u0628.",
      sayAr: "\u0627\u0644\u062D\u0648\u0645\u0629 \u0627\u0644\u0643\u0644 \u0631\u0627\u0642\u062F\u0629... \u0627\u0644\u0630\u064A\u0627\u0628\u0629 \u064A\u0641\u064A\u0642\u0648. \u0634\u0648\u0641\u0648 \u0628\u0639\u0636\u0643\u0645\u060C \u0648\u0623\u0634\u0651\u0631\u0648 \u0639\u0644\u0649 \u0627\u0644\u0644\u064A \u0628\u0627\u0634 \u064A\u0627\u0643\u0644\u0648\u0647 \u0627\u0644\u0644\u064A\u0644\u0629.",
      action: {
        type: "kill",
        targets: 1,
        collective: true
      },
      constraints: [
        "alive",
        "not_wolf"
      ]
    },
    {
      id: "loup_rouge",
      nameFr: "Loup Rouge",
      emoji: "\u{1F534}",
      camp: "loups",
      isWolf: true,
      wake: "every_night",
      nightOrder: 180,
      count: {
        min: 0,
        max: 1
      },
      descAr: "\u0639\u0646\u062F\u0648 \u0627\u0644\u062D\u0642\u0651 \u0643\u0644 \u0644\u064A\u0644\u0629 \u064A\u0642\u0648\u0645 \u0642\u0628\u0644 \u0627\u0644\u0630\u064A\u0627\u0628\u0629 \u0627\u0644\u0622\u062E\u0631\u064A\u0646\u060C \u0648\u064A\u062E\u062A\u0627\u0631 \u0634\u0643\u0648\u0646 \u064A\u0628\u0644\u0648\u0643\u064A \u2014 \u0627\u0644\u0642\u0648\u0651\u0629 \u0645\u062A\u0627\u0639 \u0647\u0630\u0627\u0643\u0629 \u0645\u0627 \u062A\u062E\u062F\u0645\u0634 \u0627\u0644\u0644\u064A\u0644\u0629.",
      mechAr: "\u064A\u0646\u062C\u0651\u0645 \u064A\u0628\u0644\u0648\u0643\u064A \u062D\u062A\u0651\u0649 \u0630\u064A\u0628 \u0645\u0646 \u0635\u062D\u0627\u0628\u0648. \u0645\u0627 \u064A\u0646\u062C\u0651\u0645\u0634 \u064A\u0628\u0644\u0648\u0643\u064A \u0646\u0641\u0633 \u0627\u0644\u0644\u0627\u0639\u0628 \u0632\u0648\u0632 \u0644\u064A\u0627\u0644\u064A \u0648\u0631\u0627 \u0628\u0639\u0636\u0647\u0645. \u0627\u0644\u0623\u067E\u0644\u064A\u0643\u0627\u0633\u064A\u0648\u0646 \u062A\u0644\u063A\u064A \u0627\u0644\u0639\u0645\u0644 \u0645\u062A\u0627\u0639\u0648 \u062D\u062A\u0651\u0649 \u0643\u0627\u0646 \u0639\u0645\u0644\u0648 \u0642\u0628\u0644.",
      sayAr: "Le Loup Rouge \u064A\u0641\u064A\u0642 \u0648\u062D\u062F\u0648 \u0642\u0628\u0644 \u0635\u062D\u0627\u0628\u0648. \u0634\u0643\u0648\u0646 \u0628\u0627\u0634 \u062A\u0628\u0644\u0648\u0643\u064A \u0627\u0644\u0644\u064A\u0644\u0629\u061F",
      action: {
        type: "roleblock",
        targets: 1
      },
      constraints: [
        "alive",
        "not_same_as_previous_night"
      ],
      canTargetWolf: true
    },
    {
      id: "loup_pere_infecte",
      nameFr: "Loup P\xE8re Infecte",
      emoji: "\u{1F9EC}",
      camp: "loups",
      isWolf: true,
      wake: "every_night",
      nightOrder: 210,
      count: {
        min: 0,
        max: 1
      },
      startsAtNight: 2,
      uses: 1,
      descAr: "\u0645\u0646 \u0627\u0644\u0644\u064A\u0644\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629 \u064A\u0642\u0648\u0645 \u0648\u062D\u062F\u0648 \u0628\u0639\u062F \u0627\u0644\u0630\u064A\u0627\u0628\u0629\u060C \u0648\u064A\u062E\u062A\u0627\u0631 \u0643\u0627\u0646 \u064A\u0639\u062F\u0651\u064A \u0644\u0644\u0634\u062E\u0635 \u0627\u0644\u0644\u064A \u0642\u062A\u0644\u0648\u0647 \u0627\u0644\u0630\u064A\u0627\u0628\u0629 \u0648\u0644\u0651\u0627 \u0644\u0627.",
      mechAr: "\u0645\u0631\u0651\u0629 \u0648\u062D\u062F\u0629 \u0641\u064A \u0627\u0644\u0637\u0628\u0642\u0629 \u0628\u0631\u0643. \u0643\u0627\u0646 \u0639\u062F\u0651\u0649: \u0627\u0644\u0636\u062D\u064A\u0651\u0629 \u0645\u0627 \u062A\u0645\u0648\u062A\u0634\u060C \u062A\u0648\u0644\u0651\u064A \u0630\u064A\u0628 \u0648\u062A\u062D\u0627\u0641\u0638 \u0639\u0644\u0649 \u0627\u0644\u0642\u0648\u0651\u0629 \u0645\u062A\u0627\u0639\u0647\u0627. \u0648\u0645\u0646 \u0628\u0639\u062F \u0645\u0627 \u064A\u0639\u062F\u0651\u064A \u0645\u0627 \u0639\u0627\u062F\u0634 \u064A\u0641\u064A\u0642 \u0648\u062D\u062F\u0648.",
      sayAr: "Le Loup P\xE8re Infecte \u064A\u0641\u064A\u0642 \u0648\u062D\u062F\u0648. \u0647\u0627\u0630\u0627 \u0647\u0648 \u0627\u0644\u0644\u064A \u0642\u062A\u0644\u062A\u0648\u0647... \u062A\u062D\u0628\u0651 \u062A\u0639\u062F\u0651\u064A\u0644\u0648\u061F",
      action: {
        type: "convert",
        targets: "wolves_victim"
      }
    },
    {
      id: "loup_noir",
      nameFr: "Loup Noir",
      emoji: "\u26AB",
      camp: "loups",
      isWolf: true,
      wake: "every_night",
      nightOrder: 220,
      count: {
        min: 0,
        max: 1
      },
      descAr: "\u0643\u0644 \u0644\u064A\u0644\u0629 \u064A\u062E\u062A\u0627\u0631 \u0634\u062E\u0635. \u0627\u0644\u0634\u062E\u0635 \u0647\u0630\u0627\u0643\u0629 \u0643\u064A \u064A\u062C\u064A \u0627\u0644\u0635\u0628\u0627\u062D \u0645\u0627 \u0639\u0646\u062F\u0648\u0634 \u0627\u0644\u062D\u0642\u0651 \u064A\u062A\u0643\u0644\u0651\u0645 \u0648\u0644\u0627 \u064A\u06A4\u0648\u062A\u064A \u2014 \u0648\u0643\u0627\u0646 \u062A\u0643\u0644\u0651\u0645 \u0648\u0644\u0651\u0627 \u06A4\u0648\u062A\u0649\u060C \u064A\u062A\u062D\u064A\u0651\u062F \u0645\u0646 \u0627\u0644\u0644\u0639\u0628\u0629.",
      mechAr: "\u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u0645\u0627 \u064A\u0639\u0644\u0646\u0634 \u0627\u0644\u0625\u0633\u0645 \u2014 \u0627\u0644\u062D\u0627\u062C\u0629 \u0633\u0631\u0651\u064A\u0651\u0629 \u0628\u064A\u0646 \u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u0648\u0627\u0644\u0644\u0627\u0639\u0628. \u0627\u0644\u0623\u067E\u0644\u064A\u0643\u0627\u0633\u064A\u0648\u0646 \u062A\u0648\u0631\u0651\u064A \u{1F910} \u0644\u0644\u0645\u0639\u0644\u0651\u0645 \u0628\u0631\u0643\u060C \u0648\u0639\u0646\u062F\u0648 \u0628\u0648\u062A\u0648\u0646 \xAB\u062A\u0643\u0644\u0651\u0645 \u2190 \u062E\u0631\u062C\xBB.",
      sayAr: "Le Loup Noir \u064A\u0641\u064A\u0642. \u0634\u0643\u0648\u0646 \u0628\u0627\u0634 \u062A\u0633\u0643\u0651\u0631\u0644\u0648 \u0641\u0645\u0651\u0647 \u063A\u062F\u0648\u0629\u061F",
      action: {
        type: "mute_and_novote",
        targets: 1,
        duration: "next_day"
      },
      secretAnnouncement: true
    },
    {
      id: "grand_mechant_loup",
      nameFr: "Grand M\xE9chant Loup",
      emoji: "\u{1F43A}",
      camp: "loups",
      isWolf: true,
      wake: "every_night",
      nightOrder: 200,
      count: {
        min: 0,
        max: 1
      },
      minPlayersRequired: 15,
      official: true,
      descAr: "\u064A\u0627\u0643\u0644 \u0645\u0639 \u0627\u0644\u0630\u064A\u0627\u0628\u0629 \u0643\u064A\u0641 \u0627\u0644\u0643\u0644\u060C \u0648\u0632\u064A\u062F \u064A\u0641\u064A\u0642 \u0648\u062D\u062F\u0648 \u0645\u0631\u0651\u0629 \u062B\u0627\u0646\u064A\u0629 \u0648\u064A\u0642\u062A\u0644 \u0636\u062D\u064A\u0651\u0629 \u0632\u0627\u064A\u062F\u0629. \u0623\u0645\u0627 \u0627\u0644\u0642\u0648\u0651\u0629 \u062A\u0637\u064A\u062D \u0645\u0646\u0651\u0648 \u0643\u064A\u0641 \u064A\u0645\u0648\u062A \u0623\u064A\u0651 \u0630\u064A\u0628.",
      mechAr: "\u0636\u062D\u064A\u0651\u0629 \u062B\u0627\u0646\u064A\u0629 \u0643\u0644 \u0644\u064A\u0644\u0629 \u0628\u0634\u0631\u0637 \u0645\u0627 \u0645\u0627\u062A \u062D\u062A\u0651\u0649 \u0630\u064A\u0628 (\u062D\u062A\u0651\u0649 Enfant Sauvage \u0627\u0644\u0644\u064A \u0648\u0644\u0651\u0649 \u0630\u064A\u0628). \u0645\u0627 \u064A\u0646\u062C\u0651\u0645\u0634 \u064A\u0627\u0643\u0644 \u0630\u064A\u0628.",
      sayAr: "Le Grand M\xE9chant Loup \u064A\u0641\u064A\u0642 \u0648\u062D\u062F\u0648. \u0634\u0643\u0648\u0646 \u0628\u0627\u0634 \u062A\u0627\u0643\u0644 \u0632\u0627\u062F\u0629 \u0627\u0644\u0644\u064A\u0644\u0629\u061F",
      action: {
        type: "kill",
        targets: 1
      },
      disabledWhen: "any_wolf_dead"
    },
    {
      id: "villageois",
      nameFr: "Villageois",
      emoji: "\u{1F473}",
      camp: "village",
      wake: "never",
      nightOrder: null,
      count: {
        min: 0,
        max: 12
      },
      descAr: "\u0645\u0627 \u0639\u0646\u062F\u0643 \u062D\u062A\u0651\u0649 \u0642\u0648\u0651\u0629. \u0639\u0646\u062F\u0643 \u0643\u0627\u0646 \u0644\u0633\u0627\u0646\u0643 \u0648\u0639\u0642\u0644\u0643. \u0623\u0642\u0639\u062F\u060C \u0627\u0633\u0645\u0639 \u0645\u0644\u064A\u062D\u060C \u0648\u0634\u0648\u0641 \u0634\u0643\u0648\u0646 \u0627\u0644\u0644\u064A \u0643\u0644\u0627\u0645\u0648 \u0645\u0627 \u064A\u0645\u0634\u064A\u0634.",
      mechAr: "\u0628\u0627\u0644\u0644\u064A\u0644 \u0645\u0627 \u064A\u0641\u064A\u0642\u0634. \u0628\u0627\u0644\u0646\u0647\u0627\u0631 \u064A\u062D\u0643\u064A \u0648\u064A\u06A4\u0648\u062A\u064A \u0643\u064A\u0641 \u0627\u0644\u0643\u0644.",
      sayAr: null
    },
    {
      id: "voyante",
      nameFr: "Voyante",
      emoji: "\u{1F52E}",
      camp: "village",
      wake: "every_night",
      nightOrder: 110,
      count: {
        min: 0,
        max: 1
      },
      descAr: "\u0639\u0646\u062F\u0647\u0627 \u0627\u0644\u062D\u0642\u0651 \u0643\u0644 \u0644\u064A\u0644\u0629 \u062A\u062E\u062A\u0627\u0631 \u0634\u062E\u0635 \u0628\u0627\u0634 \u062A\u0639\u0631\u0641 \u0627\u0644\u062F\u0648\u0631 \u0645\u062A\u0627\u0639\u0648.",
      mechAr: "\u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u064A\u0648\u0631\u064A\u0647\u0627 \u0627\u0644\u0643\u0627\u0631\u0637\u0629 \u0628\u0627\u0644\u0636\u0628\u0637 (\u0645\u0648\u0634 \u0628\u0631\u0643 \u0630\u064A\u0628 \u0648\u0644\u0651\u0627 \u0644\u0627).",
      sayAr: "La Voyante \u062A\u0641\u064A\u0642. \u0634\u0643\u0648\u0646 \u062A\u062D\u0628\u0651 \u062A\u0634\u0648\u0641 \u0627\u0644\u062F\u0648\u0631 \u0645\u062A\u0627\u0639\u0648 \u0627\u0644\u0644\u064A\u0644\u0629\u061F",
      action: {
        type: "reveal_role",
        targets: 1
      },
      constraints: [
        "alive",
        "not_self"
      ]
    },
    {
      id: "salvateur",
      nameFr: "Salvateur",
      emoji: "\u{1F6E1}\uFE0F",
      camp: "village",
      wake: "every_night",
      nightOrder: 140,
      count: {
        min: 0,
        max: 1
      },
      descAr: "\u064A\u062E\u062A\u0627\u0631 \u0643\u0644 \u0644\u064A\u0644\u0629 \u0648\u0627\u062D\u062F \u064A\u062D\u0645\u064A\u0647 \u0645\u0646 \u0647\u062C\u0645\u0629 \u0627\u0644\u0630\u064A\u0627\u0628\u0629.",
      mechAr: "\u064A\u0646\u062C\u0651\u0645 \u064A\u062D\u0645\u064A \u0631\u0648\u062D\u0648. \u0645\u0627 \u064A\u0646\u062C\u0651\u0645\u0634 \u064A\u062D\u0645\u064A \u0646\u0641\u0633 \u0627\u0644\u0634\u062E\u0635 \u0632\u0648\u0632 \u0644\u064A\u0627\u0644\u064A \u0648\u0631\u0627 \u0628\u0639\u0636\u0647\u0645. \u0645\u0627 \u064A\u062D\u0645\u064A\u0634 \u0645\u0646 Pyromane \u0648\u0644\u0627 Barbier \u0648\u0644\u0627 Alien \u0648\u0644\u0627 Sorci\xE8re \u0648\u0644\u0627 \u062D\u0643\u0645 \u0627\u0644\u062D\u0648\u0645\u0629.",
      sayAr: "Le Salvateur \u064A\u0641\u064A\u0642. \u0639\u0644\u0649 \u0634\u0643\u0648\u0646 \u0628\u0627\u0634 \u062A\u062D\u0631\u0633 \u0627\u0644\u0644\u064A\u0644\u0629\u061F",
      action: {
        type: "protect",
        targets: 1
      },
      constraints: [
        "alive",
        "not_same_as_previous_night"
      ],
      canTargetSelf: true,
      protectsAgainst: [
        "wolves",
        "grand_mechant_loup"
      ]
    },
    {
      id: "sorciere",
      nameFr: "Sorci\xE8re",
      emoji: "\u{1F9EA}",
      camp: "village",
      wake: "every_night",
      nightOrder: 900,
      count: {
        min: 0,
        max: 1
      },
      descAr: "\u0639\u0646\u062F\u0647\u0627 \u0634\u0631\u0628\u0629 \u0627\u0644\u062D\u064A\u0627\u0629 \u062A\u062D\u064A\u064A \u0628\u064A\u0647\u0627 \u0627\u0644\u0644\u064A \u0642\u062A\u0644\u0648\u0647 \u0627\u0644\u0630\u064A\u0627\u0628\u0629\u060C \u0648\u0634\u0631\u0628\u0629 \u0627\u0644\u0645\u0648\u062A \u062A\u0642\u062A\u0644 \u0628\u064A\u0647\u0627 \u0634\u062E\u0635.",
      mechAr: "\u0643\u0644 \u0634\u0631\u0628\u0629 \u062A\u062A\u0633\u062A\u0639\u0645\u0644 \u0645\u0631\u0651\u0629 \u0648\u062D\u062F\u0629 \u0641\u064A \u0627\u0644\u0637\u0628\u0642\u0629\u060C \u0648\u062A\u0646\u062C\u0651\u0645 \u062A\u0633\u062A\u0639\u0645\u0644 \u0627\u0644\u0632\u0648\u0632 \u0641\u064A \u0646\u0641\u0633 \u0627\u0644\u0644\u064A\u0644\u0629. \u062A\u0646\u062C\u0651\u0645 \u062A\u062D\u064A\u064A \u0631\u0648\u062D\u0647\u0627. \u062A\u0641\u064A\u0642 \u0622\u062E\u0631 \u0648\u062D\u062F\u0629.",
      sayAr: "La Sorci\xE8re \u062A\u0641\u064A\u0642. \u0647\u0627\u0630\u0627 \u0647\u0648 \u0627\u0644\u0644\u064A \u0642\u062A\u0644\u0648\u0647 \u0627\u0644\u0644\u064A\u0644\u0629... \u062A\u062D\u0628\u0651 \u062A\u062D\u064A\u0651\u064A\u0647\u061F \u0648\u062A\u062D\u0628\u0651 \u062A\u0642\u062A\u0644 \u0641\u064A \u062D\u062F\u0651\u061F",
      action: {
        type: "heal_or_poison",
        healUses: 1,
        poisonUses: 1,
        sameNightAllowed: true
      },
      canHealSelf: true,
      alwaysLast: true
    },
    {
      id: "ancien_sage",
      nameFr: "Ancien Sage",
      emoji: "\u{1F9D3}",
      camp: "village",
      wake: "every_night",
      nightOrder: 100,
      count: {
        min: 0,
        max: 1
      },
      requiresSeating: true,
      descAr: "\u0643\u0628\u064A\u0631 \u0627\u0644\u0642\u0631\u064A\u0629. \u064A\u0644\u0632\u0645\u0648 \u0632\u0648\u0632 \u0636\u0631\u0628\u0627\u062A \u0645\u0646 \u0627\u0644\u0630\u064A\u0627\u0628\u0629 \u0628\u0627\u0634 \u064A\u0645\u0648\u062A (\u064A\u0646\u062C\u0651\u0645\u0648 \u064A\u0643\u0648\u0646\u0648 \u0641\u064A \u0644\u064A\u0627\u0644\u064A \u0645\u062A\u0641\u0631\u0651\u0642\u0629). \u0648\u0643\u0627\u0646 \u0627\u0644\u062D\u0648\u0645\u0629 \u0642\u062A\u0644\u0648\u0647 \u0628\u0627\u0644\u06A4\u0648\u062A\u060C \u0627\u0644\u0643\u0644 \u064A\u062E\u0633\u0631\u0648 \u0627\u0644\u0642\u0648\u0649 \u0645\u062A\u0627\u0639\u0647\u0645. \u0648\u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u064A\u0642\u064A\u0651\u0645\u0648 \u0643\u0644 \u0644\u064A\u0644\u0629 \u0628\u0627\u0634 \u064A\u062E\u062A\u0627\u0631 \u0627\u062A\u0651\u062C\u0627\u0647 \u0627\u0644\u0643\u0644\u0645\u0629 \u062A\u062F\u0648\u0631.",
      mechAr: "\u0631\u0648\u062D\u064A\u0646 \u0636\u062F\u0651 \u0627\u0644\u0630\u064A\u0627\u0628\u0629\u060C \u0627\u0644\u0639\u062F\u0651\u0627\u062F \u064A\u062A\u0639\u0645\u0651\u0631 \u062D\u062A\u0651\u0649 \u0641\u064A \u0644\u064A\u0627\u0644\u064A \u0628\u0639\u064A\u062F\u0629 \u0639\u0644\u0649 \u0628\u0639\u0636\u0647\u0627. \u0645\u0627\u062A \u0628\u0627\u0644\u06A4\u0648\u062A \u2190 \u0643\u0644 \u0623\u062F\u0648\u0627\u0631 \u0627\u0644\u062D\u0648\u0645\u0629 \u062A\u062E\u0633\u0631 \u0642\u0648\u0627\u0647\u0627 \u0644\u0644\u0622\u062E\u0631.",
      sayAr: "L'Ancien Sage \u064A\u0641\u064A\u0642. \u0627\u0644\u0643\u0644\u0645\u0629 \u063A\u062F\u0648\u0629 \u062A\u062F\u0648\u0631 \u0645\u0639 \u0648\u0644\u0651\u0627 \u0636\u062F\u0651 \u0639\u0642\u0627\u0631\u0628 \u0627\u0644\u0633\u0627\u0639\u0629\u061F",
      action: {
        type: "set_speech_direction",
        options: [
          "horaire",
          "anti_horaire"
        ]
      },
      lives: 2,
      onLynched: "village_loses_all_powers"
    },
    {
      id: "detective",
      nameFr: "D\xE9tective",
      emoji: "\u{1F575}\uFE0F",
      camp: "village",
      wake: "every_night",
      nightOrder: 130,
      count: {
        min: 0,
        max: 1
      },
      descAr: "\u064A\u062E\u062A\u0627\u0631 \u0632\u0648\u0632 \u0623\u0634\u062E\u0627\u0635\u060C \u0648\u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u064A\u0642\u0648\u0644\u0644\u0648 \u0643\u0627\u0646 \u0646\u0641\u0633 \u0627\u0644\u0643\u0644\u0627\u0646 \u0648\u0644\u0651\u0627 \u0632\u0648\u0632 \u0623\u0639\u062F\u0627\u0621.",
      mechAr: "\u0627\u0644\u062C\u0648\u0627\u0628: \u{1F44D} \u0646\u0641\u0633 \u0627\u0644\u0643\u0644\u0627\u0646 / \u{1F44E} \u0623\u0639\u062F\u0627\u0621. \u0627\u0644\u062D\u0633\u0627\u0628 \u064A\u062A\u0639\u0645\u0644 \u0645\u0646 \u062C\u062F\u0648\u0644 \u0627\u0644\u0643\u0644\u0627\u0646\u0627\u062A.",
      sayAr: "Le D\xE9tective \u064A\u0641\u064A\u0642. \u0623\u0634\u0651\u0631 \u0639\u0644\u0649 \u0632\u0648\u0632... \u0646\u0641\u0633 \u0627\u0644\u0643\u0644\u0627\u0646 \u0648\u0644\u0651\u0627 \u0623\u0639\u062F\u0627\u0621\u061F",
      action: {
        type: "compare_clans",
        targets: 2
      }
    },
    {
      id: "ours",
      nameFr: "Ours",
      emoji: "\u{1F43B}",
      camp: "village",
      wake: "never",
      nightOrder: null,
      count: {
        min: 0,
        max: 1
      },
      requiresSeating: true,
      morningAnnouncement: true,
      descAr: "\u0643\u0644 \u0635\u0628\u0627\u062D: \u0643\u0627\u0646 \u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u0642\u0627\u0644 \u0627\u0644\u062F\u0628\u0651 \u064A\u06A4\u0631\u06A4\u0631\u060C \u064A\u0639\u0646\u064A \u0648\u0627\u062D\u062F \u0645\u0646 \u0627\u0644\u0632\u0648\u0632 \u0627\u0644\u0642\u0627\u0639\u062F\u064A\u0646 \u0639\u0644\u0649 \u064A\u0645\u064A\u0646\u0648 \u0648\u0644\u0651\u0627 \u0639\u0644\u0649 \u064A\u0633\u0627\u0631\u0648 \u0647\u0648 \u0630\u064A\u0628. \u0648\u0643\u0627\u0646 \u0642\u0627\u0644 \u0645\u0627 \u064A\u06A4\u0631\u06A4\u0631\u0634\u060C \u0627\u0644\u0632\u0648\u0632 villageois.",
      mechAr: "\u0645\u0627 \u064A\u0641\u064A\u0642\u0634. \u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0642\u062F\u0651\u0627\u0645 \u0627\u0644\u0643\u0644 \u0643\u0644 \u0635\u0628\u0627\u062D. \u0627\u0644\u062C\u064A\u0631\u0627\u0646 = \u0623\u0642\u0631\u0628 \u0644\u0627\u0639\u0628\u064A\u0646 \u0623\u062D\u064A\u0627\u0621 \u0639\u0644\u0649 \u0627\u0644\u064A\u0645\u064A\u0646 \u0648\u0627\u0644\u064A\u0633\u0627\u0631.",
      sayAr: "\u0635\u0628\u0627\u062D \u0627\u0644\u062E\u064A\u0631... \u0627\u0644\u062F\u0628\u0651 \u064A\u06A4\u0631\u06A4\u0631! / \u0627\u0644\u062F\u0628\u0651 \u0633\u0627\u0643\u062A \u0627\u0644\u0635\u0628\u0627\u062D \u0647\u0630\u0627.",
      action: {
        type: "neighbors_wolf_check",
        scope: "alive_neighbors"
      }
    },
    {
      id: "corbeau",
      nameFr: "Corbeau",
      emoji: "\u{1F426}\u200D\u2B1B",
      camp: "village",
      wake: "every_night",
      nightOrder: 160,
      count: {
        min: 0,
        max: 1
      },
      descAr: "\u0643\u0644 \u0644\u064A\u0644\u0629 \u064A\u062E\u062A\u0627\u0631 \u0634\u0643\u0648\u0646 \u064A\u0632\u064A\u062F\u0644\u0648 \u0623\u0635\u0648\u0627\u062A \u0641\u064A \u0627\u0644\u06A4\u0648\u062A.",
      mechAr: "+2 \u0635\u0648\u062A \u0636\u062F\u0651 \u0627\u0644\u0647\u062F\u0641 \u0641\u064A \u06A4\u0648\u062A \u0627\u0644\u0635\u0628\u0627\u062D.",
      sayAr: "Le Corbeau \u064A\u0641\u064A\u0642. \u0639\u0644\u0649 \u0634\u0643\u0648\u0646 \u0628\u0627\u0634 \u062A\u062D\u0637\u0651 \u0627\u0644\u0632\u0648\u0632 \u0623\u0635\u0648\u0627\u062A\u061F",
      action: {
        type: "add_votes",
        targets: 1,
        amount: 2
      }
    },
    {
      id: "berger",
      nameFr: "Berger",
      emoji: "\u{1F411}",
      camp: "village",
      wake: "every_night",
      nightOrder: 150,
      count: {
        min: 0,
        max: 1
      },
      requiresRole: "pyromane",
      descAr: "\u0639\u0646\u062F\u0648 \u0642\u0637\u064A\u0639 \u062E\u0631\u0641\u0627\u0646 \u2014 \u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u0647\u0648 \u0627\u0644\u0644\u064A \u064A\u062D\u062F\u0651\u062F \u0627\u0644\u0639\u062F\u062F \u0645\u0646 \u0627\u0644\u0628\u062F\u0627\u064A\u0629. \u0643\u0644 \u0644\u064A\u0644\u0629 \u064A\u0628\u0639\u062B <b>\u062E\u0631\u0641\u0627\u0646\u0648 \u0627\u0644\u0643\u0644 \u0627\u0644\u0644\u064A \u0628\u0627\u0642\u064A\u064A\u0646</b>\u060C \u062E\u0631\u0648\u0641 \u0644\u0643\u0644 \u0648\u0627\u062D\u062F (\u0645\u0627 \u064A\u0646\u062C\u0651\u0645\u0634 \u064A\u0628\u0639\u062B \u0632\u0648\u0632 \u062E\u0631\u0641\u0627\u0646 \u0644\u0646\u0641\u0633 \u0627\u0644\u0634\u062E\u0635). \u0648\u0643\u064A \u064A\u0643\u0645\u0651\u0644\u0648 \u0627\u0644\u062E\u0631\u0641\u0627\u0646 \u0627\u0644\u0643\u0644\u060C \u064A\u0648\u0644\u0651\u064A Villageois \u0639\u0627\u062F\u064A.",
      mechAr: "\u0646\u062A\u064A\u062C\u0629 \u0643\u0644 \u062E\u0631\u0648\u0641: \u2620\uFE0F <b>\u0645\u0627\u062A</b> = \u0627\u0644\u0634\u062E\u0635 \u0630\u064A\u0628 \xB7 \u{1F4A7} <b>\u0631\u062C\u0639 \u0645\u0628\u0644\u0648\u0644</b> = \u0627\u0644\u0634\u062E\u0635 \u0647\u0648 Pyromane \u0648\u0644\u0651\u0627 \u0648\u0627\u062D\u062F \u0645\u0628\u0644\u0648\u0644 \u0628\u0627\u0644\u0625\u064A\u0633\u0627\u0646\u0633 \xB7 \u2705 <b>\u0631\u062C\u0639 \u0628\u062E\u064A\u0631</b> = \u0644\u0627 \u0630\u064A\u0628 \u0644\u0627 \u0645\u0628\u0644\u0648\u0644.\n\u0627\u0644\u0635\u0628\u0627\u062D \u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u064A\u0639\u0644\u0646 <b>\u0627\u0644\u0623\u0639\u062F\u0627\u062F \u0628\u0631\u0643</b> \u0642\u062F\u0651\u0627\u0645 \u0627\u0644\u062D\u0648\u0645\u0629 \u0627\u0644\u0643\u0644\u060C \u0628\u0644\u0627 \u0623\u0633\u0645\u0627\u0621. \u0627\u0644\u0640 Berger \u0648\u062D\u062F\u0648 \u064A\u0639\u0631\u0641 \u0648\u064A\u0646 \u0628\u0639\u062B \u062E\u0631\u0641\u0627\u0646\u0648 \u2014 \u0645\u0646\u0647\u0627 \u064A\u0633\u062A\u0646\u062A\u062C\u060C \u0648\u064A\u0646\u062C\u0651\u0645 \u064A\u062D\u0643\u064A \u0648\u0644\u0651\u0627 \u064A\u0643\u0630\u0628 \u0641\u064A \u0642\u0639\u062F\u0629 \u0627\u0644\u062D\u0648\u0645\u0629.\n\u2620\uFE0F \u0627\u0644\u062E\u0631\u0648\u0641 \u0627\u0644\u0645\u064A\u0651\u062A <b>\u064A\u062A\u0634\u0637\u0628 \u0644\u0644\u0622\u062E\u0631</b>. \u{1F4A7} \u0627\u0644\u0645\u0628\u0644\u0648\u0644 \u064A\u0631\u062C\u0639 \u0648\u064A\u062A\u0628\u0639\u062B \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649\u060C \u0623\u0645\u0627 \u064A\u0628\u0642\u0649 \u0645\u0628\u0644\u0648\u0644 \u2014 \u0648\u0643\u0627\u0646 \u0627\u0644\u0640 Pyromane \u0634\u0639\u0651\u0644 \u0627\u0644\u0646\u0627\u0631\u060C \u064A\u062D\u0631\u0642 \u0645\u0639\u0627 \u0627\u0644\u0646\u0627\u0633 \u0627\u0644\u0645\u0628\u0644\u0648\u0644\u064A\u0646.",
      sayAr: "Le Berger \u064A\u0641\u064A\u0642. \u0628\u0627\u0642\u064A\u0644\u0643 {sheepLeft} \u062E\u0631\u0641\u0627\u0646 \u2014 \u0644\u0639\u0646\u062F \u0634\u0643\u0648\u0646 \u062A\u0628\u0639\u062B\u0647\u0645 \u0627\u0644\u0644\u064A\u0644\u0629\u061F",
      action: {
        type: "scout_herd",
        targets: "all_remaining_sheep",
        mandatoryAll: true,
        oneSheepPerPlayer: true,
        canTargetSelf: false,
        resultKinds: [
          "dead_sheep",
          "wet_sheep",
          "safe_sheep"
        ]
      },
      setupParam: {
        id: "sheepCount",
        labelAr: "\u0639\u062F\u062F \u0627\u0644\u062E\u0631\u0641\u0627\u0646",
        default: 3,
        min: 2,
        max: 6,
        setBy: "narrator"
      },
      report: {
        when: "morning",
        visibility: "public_anonymous",
        revealsTargets: false,
        format: "counts_only",
        templateAr: "\u062E\u0628\u0631 \u0627\u0644\u0631\u0639\u064A\u0627\u0646: \u2620\uFE0F {dead} \u062E\u0631\u0648\u0641 \u0645\u0627\u062A\u0648 \xB7 \u{1F4A7} {wet} \u0631\u062C\u0639\u0648 \u0645\u0628\u0644\u0648\u0644\u064A\u0646 \xB7 \u2705 {safe} \u0631\u062C\u0639\u0648 \u0628\u062E\u064A\u0631.",
        noteAr: "\u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u0645\u0627 \u064A\u0633\u0645\u0651\u064A\u0634 \u0634\u0643\u0648\u0646 \u0632\u0627\u0631\u0648 \u0627\u0644\u062E\u0631\u0641\u0627\u0646. \u0627\u0644\u0640 Berger \u0628\u0631\u0643 \u064A\u0639\u0631\u0641 \u0627\u0644\u0623\u0647\u062F\u0627\u0641 \u0627\u0644\u0644\u064A \u0627\u062E\u062A\u0627\u0631\u0647\u0645."
      },
      sheep: {
        deadIsLost: true,
        wetIsReusable: true,
        wetStaysWet: true,
        burnsWithPyromane: true,
        wetCauses: [
          "target_is_pyromane",
          "target_was_doused_by_pyromane"
        ]
      },
      onZeroSheep: "becomes_villageois"
    },
    {
      id: "barbier",
      nameFr: "Barbier",
      emoji: "\u{1F52B}",
      camp: "village",
      wake: "on_demand",
      nightOrder: null,
      count: {
        min: 0,
        max: 1
      },
      uses: 1,
      descAr: "\u0631\u0627\u062C\u0644 \u0628\u0644\u062D\u064A\u0629\u060C \u0639\u0646\u062F\u0648 <b>\u0641\u0648\u0633\u064A \u0648\u0637\u0644\u0642\u0629 \u0648\u062D\u062F\u0629 \u0628\u0631\u0643</b> \u0641\u064A \u0627\u0644\u0637\u0628\u0642\u0629 \u0627\u0644\u0643\u0644. \u064A\u062A\u0641\u0627\u0647\u0645 \u0645\u0639 \u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u0639\u0644\u0649 <b>\u0625\u0634\u0627\u0631\u0629</b>. \u0643\u064A\u0641 \u064A\u0639\u0645\u0644\u0647\u0627\u060C \u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u064A\u0631\u0642\u0651\u062F \u0627\u0644\u0646\u0627\u0633 \u0627\u0644\u0643\u0644\u060C \u064A\u0642\u064A\u0651\u0645\u0648 \u0648\u062D\u062F\u0648\u060C \u0648\u064A\u062E\u062A\u0627\u0631 \u0634\u0643\u0648\u0646 \u064A\u0636\u0631\u0628.",
      mechAr: "\u{1F43A} \u0636\u0631\u0628 <b>\u0630\u064A\u0628</b> \u2190 \u064A\u0639\u064A\u0634. \u{1F525} \u0636\u0631\u0628 <b>joueur solo</b> (Pyromane / Alien) \u2190 \u064A\u0639\u064A\u0634 \u0632\u0627\u062F\u0629. \u{1F3D8}\uFE0F \u0636\u0631\u0628 <b>villageois</b> \u2190 <b>\u064A\u0645\u0648\u062A \u0645\u0639\u0627\u0647</b> (\u0627\u0644\u0637\u0644\u0642\u0629 \u0637\u0627\u062D\u062A \u0641\u064A \u063A\u064A\u0631 \u0628\u0644\u0627\u0635\u062A\u0647\u0627).\n<b>\u0637\u0644\u0642\u0629 \u0648\u062D\u062F\u0629 \u0628\u0631\u0643 \u0641\u064A \u0627\u0644\u0637\u0628\u0642\u0629.</b> \u062F\u0648\u0631 \u0645\u0641\u0639\u0651\u0644 \u0628\u0627\u0644\u064A\u062F: \u0628\u0648\u062A\u0648\u0646 \u{1F52B} \u0639\u0646\u062F \u0627\u0644\u0645\u0639\u0644\u0651\u0645\u060C \u064A\u0646\u062C\u0651\u0645 \u064A\u0636\u063A\u0637\u0648 \u0641\u064A \u0623\u064A \u0648\u0642\u062A.",
      sayAr: "\u0627\u0644\u0643\u0644 \u064A\u063A\u0645\u0651\u0636 \u0639\u064A\u0646\u064A\u0647... Le Barbier \u064A\u0641\u064A\u0642. \u0639\u0646\u062F\u0643 \u0637\u0644\u0642\u0629 \u0648\u062D\u062F\u0629 \u2014 \u0639\u0644\u0649 \u0634\u0643\u0648\u0646 \u0628\u0627\u0634 \u062A\u0637\u0644\u0642\u061F",
      action: {
        type: "duel_kill",
        targets: 1,
        survivesIfTargetCampIn: [
          "loups",
          "solo"
        ]
      },
      narratorButton: {
        emoji: "\u{1F52B}",
        labelAr: "Le Barbier \u0639\u0645\u0644 \u0627\u0644\u0625\u0634\u0627\u0631\u0629"
      },
      weapon: {
        kindAr: "\u0641\u0648\u0633\u064A",
        bullets: 1,
        emoji: "\u{1F52B}"
      }
    },
    {
      id: "voleur",
      nameFr: "Voleur",
      emoji: "\u{1F0CF}",
      camp: "variable",
      campStart: "village",
      wake: "first_night",
      nightOrder: 5,
      count: {
        min: 0,
        max: 1
      },
      official: true,
      descAr: "\u0627\u0644\u0644\u064A\u0644\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0628\u0631\u0643\u060C \u0648<b>\u0642\u0628\u0644 \u0627\u0644\u0643\u0644</b>. \u0641\u064A \u0648\u0633\u0637 \u0627\u0644\u0637\u0627\u0648\u0644\u0629 \u0641\u0645\u0651\u0627 <b>\u0632\u0648\u0632 \u0643\u0627\u0631\u0637\u0627\u062A \u0645\u0642\u0644\u0648\u0628\u064A\u0646</b> \u0645\u0627 \u062A\u0642\u0633\u0645\u0648\u0634 \u2014 \u0627\u0644\u0640 Voleur \u064A\u0634\u0648\u0641\u0647\u0645\u060C \u0648\u064A\u0646\u062C\u0651\u0645 <b>\u064A\u0628\u062F\u0651\u0644 \u0627\u0644\u0643\u0627\u0631\u0637\u0629 \u0645\u062A\u0627\u0639\u0648</b> \u0628\u0648\u062D\u062F\u0629 \u0645\u0646\u0647\u0645.",
      mechAr: "\u{1F43A} \u0643\u0627\u0646 <b>\u0627\u0644\u0632\u0648\u0632 \u0643\u0627\u0631\u0637\u0627\u062A \u0630\u064A\u0627\u0628\u0629</b> \u2190 <b>\u0645\u062C\u0628\u0648\u0631</b> \u064A\u0627\u062E\u0630 \u0648\u062D\u062F\u0629 \u0645\u0646\u0647\u0645 \u0648\u064A\u0648\u0644\u0651\u064A \u0630\u064A\u0628.\n\u{1F500} \u0643\u0627\u0646 \u0644\u0627\u060C \u062D\u0631\u0651: \u064A\u0628\u062F\u0651\u0644 \u0648\u0644\u0651\u0627 \u064A\u062E\u0644\u0651\u064A \u0643\u0627\u0631\u0637\u062A\u0648.\n\u0643\u064A\u0641 \u064A\u0628\u062F\u0651\u0644\u060C <b>\u064A\u0644\u0639\u0628 \u0628\u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u062C\u062F\u064A\u062F \u0644\u0644\u0622\u062E\u0631</b>\u060C \u0648\u0627\u0644\u0641\u0631\u0642\u0629 \u0645\u062A\u0627\u0639\u0648 \u062A\u0648\u0644\u0651\u064A \u0641\u0631\u0642\u0629 \u0627\u0644\u0643\u0627\u0631\u0637\u0629 \u0627\u0644\u062C\u062F\u064A\u062F\u0629. \u0648\u0643\u0627\u0646 \u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u062C\u062F\u064A\u062F \u064A\u062E\u062F\u0645 \u0641\u064A \u0627\u0644\u0644\u064A\u0644\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 (Cupidon \xB7 Enfant Sauvage) \u2190 \u064A\u0644\u0639\u0628\u0648 \u0641\u064A <b>\u0646\u0641\u0633 \u0627\u0644\u0644\u064A\u0644\u0629</b>\u060C \u0628\u0639\u062F \u0645\u0627 \u064A\u0628\u062F\u0651\u0644.\n\u{1F642} \u0643\u0627\u0646 \u062E\u0644\u0651\u0649 \u0643\u0627\u0631\u0637\u0629 Voleur \u2190 \u064A\u0648\u0644\u0651\u064A <b>Villageois \u0639\u0627\u062F\u064A</b> \u0628\u0644\u0627 \u0642\u0648\u0651\u0629.",
      sayAr: "Le Voleur \u064A\u0641\u064A\u0642. \u0647\u0627\u0643 \u0627\u0644\u0632\u0648\u0632 \u0643\u0627\u0631\u0637\u0627\u062A \u0627\u0644\u0644\u064A \u0641\u064A \u0627\u0644\u0648\u0633\u0637... \u062A\u062D\u0628\u0651 \u062A\u0628\u062F\u0651\u0644\u060C \u0648\u0644\u0651\u0627 \u062A\u062E\u0644\u0651\u064A \u0643\u0627\u0631\u0637\u062A\u0643\u061F",
      action: {
        type: "swap_with_center",
        centerCards: 2,
        forcedIfAllWolves: true,
        mayDecline: true
      },
      setupEffect: {
        extraCenterCards: 2,
        extraCardRole: "villageois",
        noteAr: "\u0643\u0627\u0646 \u0644\u0639\u0628\u0646\u0627 \u0628\u0627\u0644\u0640 Voleur\u060C \u0632\u064A\u062F <b>\u0632\u0648\u0632 \u0643\u0627\u0631\u0637\u0627\u062A Villageois</b> \u0632\u064A\u0627\u062F\u0629 \u0641\u064A \u0627\u0644\u0628\u0627\u0643\u064A. \u0628\u0639\u062F \u0627\u0644\u062A\u0648\u0632\u064A\u0639\u060C \u0627\u0644\u0632\u0648\u0632 \u0643\u0627\u0631\u0637\u0627\u062A \u0627\u0644\u0644\u064A \u0641\u0636\u0644\u0648 \u064A\u062A\u062D\u0637\u0651\u0648 \u0645\u0642\u0644\u0648\u0628\u064A\u0646 \u0641\u064A \u0648\u0633\u0637 \u0627\u0644\u0637\u0627\u0648\u0644\u0629."
      },
      keepsNewRoleForever: true,
      ifKeepsOwnCard: "villageois"
    },
    {
      id: "cupidon",
      nameFr: "Cupidon",
      emoji: "\u{1F498}",
      camp: "village",
      wake: "first_night",
      nightOrder: 10,
      count: {
        min: 0,
        max: 1
      },
      official: true,
      descAr: "\u0627\u0644\u0644\u064A\u0644\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0628\u0631\u0643\u060C \u064A\u0623\u0634\u0651\u0631 \u0639\u0644\u0649 \u0632\u0648\u0632 \u0644\u0639\u0651\u0627\u0628\u0629 \u0648\u064A\u062E\u0644\u0651\u064A\u0647\u0645 \u062D\u0628\u0627\u064A\u0628 (\u064A\u0646\u062C\u0651\u0645 \u064A\u062E\u062A\u0627\u0631 \u0631\u0648\u062D\u0648). \u0643\u0627\u0646 \u0645\u0627\u062A \u0648\u0627\u062D\u062F \u0641\u064A\u0647\u0645\u060C \u0627\u0644\u0622\u062E\u0631 \u064A\u0645\u0648\u062A \u0628\u0627\u0644\u0642\u0647\u0631 \u0641\u064A \u0646\u0641\u0633 \u0627\u0644\u0644\u062D\u0638\u0629.",
      mechAr: "\u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u064A\u0634\u062F\u0651\u0647\u0645 \u0641\u064A \u0643\u062A\u0641\u0647\u0645 \u0628\u0627\u0644\u0633\u0643\u0651\u0627\u062A\u060C \u0648\u0645\u0646 \u0628\u0639\u062F \u0627\u0644\u062D\u0628\u0627\u064A\u0628 \u064A\u0641\u064A\u0642\u0648 \u0648\u064A\u062A\u0639\u0627\u0631\u0641\u0648. \u0643\u0627\u0646 \u0627\u0644\u0632\u0648\u0632 \u0645\u0646 \u0641\u0631\u0642\u062A\u064A\u0646 \u0645\u062E\u062A\u0644\u0641\u062A\u064A\u0646\u060C \u064A\u0648\u0644\u0651\u064A\u0648 \u0641\u0631\u064A\u0642 \u062B\u0627\u0644\u062B \u0648\u0644\u0627\u0632\u0645\u0647\u0645 \u064A\u0628\u0642\u0627\u0648 \u0647\u0648\u0645\u0627 \u0627\u0644\u0632\u0648\u0632. \u0627\u0644\u062D\u0628\u064A\u0628 \u0645\u0627 \u064A\u06A4\u0648\u062A\u064A\u0634 \u0636\u062F\u0651 \u062D\u0628\u064A\u0628\u0648.",
      sayAr: "Cupidon \u064A\u0641\u064A\u0642 \u0648\u064A\u062E\u062A\u0627\u0631 \u0632\u0648\u0632 \u062D\u0628\u0627\u064A\u0628... \u062A\u0648\u0651\u0627 \u0627\u0644\u062D\u0628\u0627\u064A\u0628 \u064A\u0641\u064A\u0642\u0648 \u0648\u064A\u062A\u0639\u0627\u0631\u0641\u0648\u060C \u0648\u064A\u0631\u062C\u0639\u0648 \u064A\u0631\u0642\u062F\u0648.",
      action: {
        type: "make_lovers",
        targets: 2
      },
      canTargetSelf: true
    },
    {
      id: "enfant_sauvage",
      nameFr: "Enfant Sauvage",
      emoji: "\u{1F43E}",
      camp: "village",
      wake: "first_night",
      nightOrder: 20,
      count: {
        min: 0,
        max: 1
      },
      official: true,
      descAr: "\u0643\u0628\u0631 \u0641\u064A \u0627\u0644\u063A\u0627\u0628\u0629 \u0645\u0639 \u0627\u0644\u0630\u064A\u0627\u0628\u0629. \u0627\u0644\u0644\u064A\u0644\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u064A\u062E\u062A\u0627\u0631 \xAB\u0627\u0644\u0645\u0648\u062F\u0627\u0644\xBB \u0645\u062A\u0627\u0639\u0648. \u0637\u0648\u0644 \u0645\u0627 \u0627\u0644\u0645\u0648\u062F\u0627\u0644 \u062D\u064A\u0651 \u0647\u0648 villageois \u0639\u0627\u062F\u064A\u060C \u0648\u0643\u064A\u0641 \u064A\u0645\u0648\u062A \u0627\u0644\u0645\u0648\u062F\u0627\u0644 \u064A\u0648\u0644\u0651\u064A Loup Garou \u0644\u0644\u0622\u062E\u0631.",
      mechAr: "\u0627\u0644\u0623\u067E\u0644\u064A\u0643\u0627\u0633\u064A\u0648\u0646 \u062A\u0628\u062F\u0651\u0644 \u0627\u0644\u0641\u0631\u064A\u0642 \u0648\u062D\u062F\u0647\u0627 \u0643\u064A\u0641 \u064A\u0645\u0648\u062A \u0627\u0644\u0645\u0648\u062F\u0627\u0644. \u0643\u064A \u064A\u0648\u0644\u0651\u064A \u0630\u064A\u0628 \u0648\u064A\u0645\u0648\u062A\u060C Grand M\xE9chant Loup \u064A\u062E\u0633\u0631 \u0627\u0644\u0642\u0648\u0651\u0629 \u0645\u062A\u0627\u0639\u0648 \u0632\u0627\u062F\u0629.",
      sayAr: "L'Enfant Sauvage \u064A\u0641\u064A\u0642 \u0648\u064A\u062E\u062A\u0627\u0631 \u0627\u0644\u0645\u0648\u062F\u0627\u0644 \u0645\u062A\u0627\u0639\u0648.",
      action: {
        type: "pick_model",
        targets: 1
      },
      becomesWolfWhen: "model_dead"
    },
    {
      id: "servante_devouee",
      nameFr: "Servante D\xE9vou\xE9e",
      emoji: "\u{1F475}",
      camp: "village",
      wake: "on_demand",
      nightOrder: null,
      count: {
        min: 0,
        max: 1
      },
      official: true,
      descAr: "\u0642\u0628\u0644 \u0645\u0627 \u064A\u062A\u0643\u0634\u0641 \u062F\u0648\u0631 \u0627\u0644\u0644\u064A \u062D\u0643\u0645\u062A \u0639\u0644\u064A\u0647 \u0627\u0644\u062D\u0648\u0645\u0629 \u0628\u0627\u0644\u06A4\u0648\u062A\u060C \u062A\u0646\u062C\u0651\u0645 \u062A\u0643\u0634\u0641 \u0631\u0648\u062D\u0647\u0627 \u0648\u062A\u0627\u062E\u0630 \u0627\u0644\u0643\u0627\u0631\u0637\u0629 \u0645\u062A\u0627\u0639\u0648.",
      mechAr: "\u062A\u062E\u0633\u0631 \u0643\u0627\u0631\u0637\u062A\u0647\u0627 \u0648\u062A\u0648\u0644\u0651\u064A \u062A\u0644\u0639\u0628 \u0627\u0644\u062F\u0648\u0631 \u0645\u062A\u0627\u0639\u0648 \u0644\u0644\u0622\u062E\u0631\u060C \u0648\u0627\u0644\u0642\u0648\u0649 \u064A\u0631\u062C\u0639\u0648 \u062C\u062F\u0627\u062F. \u0643\u0627\u0646 \u0647\u064A \u062D\u0628\u064A\u0628\u0629 \u0645\u0627 \u062A\u0646\u062C\u0651\u0645\u0634 \u062A\u0633\u062A\u0639\u0645\u0644 \u0627\u0644\u0642\u0648\u0651\u0629 \u2014 \u0623\u0645\u0627 \u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u064A\u0633\u0623\u0644\u0647\u0627 \u062F\u064A\u0645\u0627 \u0628\u0627\u0634 \u0645\u0627 \u064A\u0628\u0627\u0646\u0634 \u0634\u064A\u0621.",
      sayAr: "\u0642\u0628\u0644 \u0645\u0627 \u0646\u0643\u0634\u0641\u0648 \u0627\u0644\u0643\u0627\u0631\u0637\u0629... La Servante D\xE9vou\xE9e\u060C \u062A\u062D\u0628\u0651 \u062A\u0627\u062E\u0630 \u0628\u0644\u0627\u0635\u062A\u0648\u061F",
      action: {
        type: "swap_with_dead",
        trigger: "before_lynch_reveal"
      },
      disabledIfLover: true,
      narratorButton: {
        emoji: "\u{1F475}",
        labelAr: "La Servante \u062A\u0628\u062F\u0651\u0644"
      }
    },
    {
      id: "renard",
      nameFr: "Renard",
      emoji: "\u{1F98A}",
      camp: "village",
      wake: "every_night",
      nightOrder: 120,
      count: {
        min: 0,
        max: 1
      },
      official: true,
      requiresSeating: true,
      descAr: "\u0643\u0644 \u0644\u064A\u0644\u0629 \u064A\u0623\u0634\u0651\u0631 \u0639\u0644\u0649 \u0644\u0627\u0639\u0628\u060C \u0648\u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u064A\u0634\u0648\u0641 \u0647\u0648 \u0648\u062C\u0627\u0631\u0648 \u0627\u0644\u064A\u0645\u064A\u0646 \u0648\u062C\u0627\u0631\u0648 \u0627\u0644\u064A\u0633\u0627\u0631.",
      mechAr: "\u{1F44D} \u0641\u0645\u0651\u0627 \u0630\u064A\u0628 \u0641\u064A \u0627\u0644\u06403 \u2190 \u064A\u062D\u0627\u0641\u0638 \u0639\u0644\u0649 \u0627\u0644\u0642\u0648\u0651\u0629 \u0648\u064A\u0639\u0627\u0648\u062F. \u{1F44E} \u0645\u0627 \u0641\u0645\u0651\u0627\u0634 \u0630\u064A\u0628 \u2190 \u064A\u062E\u0633\u0631 \u0627\u0644\u0642\u0648\u0651\u0629 \u0644\u0644\u0622\u062E\u0631\u060C \u0623\u0645\u0627 \u0628\u0631\u0651\u0623 3 \u0646\u0627\u0633. \u064A\u0646\u062C\u0651\u0645 \u0645\u0627 \u064A\u0634\u0645\u0651\u0634 \u0641\u064A \u0644\u064A\u0644\u0629 \u0648\u064A\u0639\u0627\u0648\u062F \u0641\u064A \u0627\u0644\u0644\u064A \u0628\u0639\u062F\u0647\u0627.",
      sayAr: "Le Renard \u064A\u0641\u064A\u0642. \u062A\u062D\u0628\u0651 \u062A\u0634\u0645\u0651 \u0627\u0644\u0644\u064A\u0644\u0629\u061F \u0623\u0634\u0651\u0631 \u0639\u0644\u0649 \u0648\u0627\u062D\u062F \u2014 \u0648\u0646\u0634\u0648\u0641\u0648 \u0647\u0648 \u0648\u062C\u064A\u0631\u0627\u0646\u0648.",
      action: {
        type: "sniff_trio",
        targets: 1,
        scope: "alive_neighbors"
      },
      losesPowerOnFail: true,
      optional: true
    },
    {
      id: "pyromane",
      nameFr: "Pyromane",
      emoji: "\u{1F525}",
      camp: "solo",
      wake: "every_night",
      nightOrder: 170,
      count: {
        min: 0,
        max: 1
      },
      descAr: "\u0643\u0644 \u0644\u064A\u0644\u0629 \u064A\u062E\u062A\u0627\u0631: \u064A\u0628\u0644\u0651\u0644 \u0646\u0627\u0633 \u0628\u0627\u0644\u0625\u064A\u0633\u0627\u0646\u0633\u060C \u0648\u0644\u0651\u0627 \u064A\u0634\u0639\u0644 \u0627\u0644\u0646\u0627\u0631 \u0641\u064A \u0627\u0644\u0644\u064A \u0628\u0644\u0651\u0644\u0647\u0645 \u0642\u0628\u0644.",
      mechAr: "\u0639\u0645\u0644 \u0648\u0627\u062D\u062F \u0641\u064A \u0627\u0644\u0644\u064A\u0644\u0629: \u{1F4A7} \u064A\u0628\u0644\u0651\u0644 \u0648\u0644\u0651\u0627 \u{1F525} \u064A\u062D\u0631\u0642. \u0648\u0642\u062A \u0645\u0627 \u064A\u062D\u0631\u0642\u060C \u0627\u0644\u0645\u0628\u0644\u0648\u0644\u064A\u0646 \u0627\u0644\u0643\u0644 \u064A\u0645\u0648\u062A\u0648 \u062F\u0641\u0639\u0629 \u0648\u062D\u062F\u0629. Le Salvateur \u0645\u0627 \u064A\u062D\u0645\u064A\u0634 \u0645\u0646 \u0627\u0644\u0646\u0627\u0631.",
      sayAr: "Le Pyromane \u064A\u0641\u064A\u0642. \u062A\u062D\u0628\u0651 \u062A\u0628\u0644\u0651\u0644 \u0641\u064A \u062D\u062F\u0651\u060C \u0648\u0644\u0651\u0627 \u062A\u0634\u0639\u0644 \u0627\u0644\u0646\u0627\u0631\u061F",
      action: {
        type: "douse_or_burn",
        dousePerNightFormula: "berger.sheepCount - 1",
        dousePerNightDefault: 2
      },
      winCondition: "last_alive"
    },
    {
      id: "alien",
      nameFr: "Alien",
      emoji: "\u{1F47D}",
      camp: "solo",
      wake: "on_demand",
      nightOrder: null,
      count: {
        min: 0,
        max: 1
      },
      descAr: "\u064A\u062A\u0641\u0627\u0647\u0645 \u0645\u0639 \u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u0639\u0644\u0649 \u0625\u0634\u0627\u0631\u0629. \u0648\u0642\u062A \u0645\u0627 \u064A\u062D\u0628\u0651 \u064A\u0639\u0637\u064A\u0647\u0627\u060C \u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u064A\u0631\u0642\u0651\u062F \u0627\u0644\u0642\u0631\u064A\u0629 \u0648\u064A\u0642\u064A\u0651\u0645\u0648\u060C \u0648\u0647\u0648 \u064A\u0633\u0645\u0651\u064A \u062F\u0648\u0631 \u0645\u062A\u0627\u0639 \u0634\u062E\u0635.",
      mechAr: "\u{1F3AF} \u0635\u0627\u0628 \u2190 \u0647\u0648 \u064A\u0639\u064A\u0634 \u0648\u0627\u0644\u0634\u062E\u0635 \u064A\u0645\u0648\u062A. \u274C \u063A\u0644\u0637 \u2190 \u0647\u0648 \u0627\u0644\u0644\u064A \u064A\u0645\u0648\u062A. \u0639\u062F\u0648\u0651 \u0644\u0644\u0643\u0644\u0651: \u0644\u0644\u062D\u0648\u0645\u0629 \u0648\u0644\u0644\u0630\u064A\u0627\u0628\u0629 \u0648\u0644\u0644\u0640 Pyromane \u0648\u0644\u0644\u062D\u0628\u0627\u064A\u0628.",
      sayAr: "\u0627\u0644\u0643\u0644 \u064A\u063A\u0645\u0651\u0636... Alien \u064A\u0641\u064A\u0642. \u0634\u0643\u0648\u0646\u061F \u0648\u0634\u0646\u0648\u0651\u0629 \u0627\u0644\u062F\u0648\u0631 \u0645\u062A\u0627\u0639\u0648\u061F",
      action: {
        type: "guess_role",
        targets: 1,
        onCorrect: "target_dies",
        onWrong: "self_dies"
      },
      winCondition: "last_alive",
      narratorButton: {
        emoji: "\u{1F47D}",
        labelAr: "Alien \u0639\u0645\u0644 \u0627\u0644\u0625\u0634\u0627\u0631\u0629"
      }
    }
  ],
  firstNightOrder: [
    "voleur",
    "__thief_swap__",
    "cupidon",
    "__lovers_recognize__",
    "enfant_sauvage",
    "__secret_signs__"
  ],
  deathResolutionOrder: [
    "loup_rouge_block",
    "salvateur_protection",
    "wolves_kill",
    "grand_mechant_loup_kill",
    "pere_infecte_convert",
    "sorciere_heal",
    "sorciere_poison",
    "pyromane_burn",
    "berger_wet_sheep_burn",
    "barbier_or_alien_strike",
    "enfant_sauvage_transform",
    "lovers_chain_death",
    "check_victory"
  ],
  detectiveClanMatrix: {
    note: "R\xE9ponse du narrateur : true = \u0646\u0641\u0633 \u0627\u0644\u0643\u0644\u0627\u0646 / false = \u0623\u0639\u062F\u0627\u0621",
    clanOf: {
      village: "village",
      loups: "loups",
      pyromane: "solo_pyromane",
      alien: "solo_alien",
      amoureux: "amoureux"
    },
    rules: [
      {
        a: "village",
        b: "village",
        sameClan: true
      },
      {
        a: "loups",
        b: "loups",
        sameClan: true
      },
      {
        a: "amoureux",
        b: "amoureux",
        sameClan: true
      },
      {
        a: "village",
        b: "loups",
        sameClan: false
      },
      {
        a: "solo_*",
        b: "*",
        sameClan: false
      },
      {
        a: "amoureux",
        b: "*",
        sameClan: false
      }
    ]
  },
  winConditions: [
    {
      camp: "village",
      rule: "no_wolf_alive AND no_solo_alive"
    },
    {
      camp: "loups",
      rule: "wolves_alive >= others_alive"
    },
    {
      camp: "amoureux",
      rule: "mixed_couple AND only_lovers_alive"
    },
    {
      camp: "solo",
      role: "pyromane",
      rule: "last_alive"
    },
    {
      camp: "solo",
      role: "alien",
      rule: "last_alive"
    }
  ],
  houseRules: [
    {
      id: "gahwa",
      nameAr: "\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0642\u0647\u0648\u0629",
      descAr: "\u0627\u0644\u0642\u0639\u062F\u0629 \u062A\u062F\u0648\u0645 \u0642\u062F\u0651 \u0645\u0627 \u062A\u0634\u0631\u0628 \u0642\u0647\u0648\u0629: 3 \u062F\u0642\u0627\u064A\u0642.",
      default: true,
      param: {
        minutes: 3
      }
    },
    {
      id: "nmima",
      nameAr: "\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0646\u0645\u064A\u0645\u0629",
      descAr: "\u0643\u0644 \u0635\u0628\u0627\u062D \u0646\u0645\u064A\u0645\u0629 \u0635\u062D\u064A\u062D\u0629 \u0648\u0644\u0651\u0627 \u0643\u0630\u0628 \u0628\u0627\u0644\u0632\u0647\u0631.",
      default: true
    },
    {
      id: "hess",
      nameAr: "\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u062D\u0633\u0651",
      descAr: "\u0627\u0644\u0644\u064A \u064A\u062D\u0643\u064A \u0641\u064A \u0627\u0644\u0644\u064A\u0644 \u064A\u062E\u0633\u0631 \u0635\u0648\u062A\u0648 \u063A\u062F\u0648\u0629.",
      default: true
    },
    {
      id: "zenga",
      nameAr: "\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u0632\u0646\u06A8\u0629",
      descAr: "\u062A\u0639\u0627\u062F\u0644 \u2190 \u062F\u0641\u0627\u0639 \u062F\u0642\u064A\u0642\u0629 \u2190 \u06A4\u0648\u062A \u062B\u0627\u0646\u064A \u2190 \u0648\u0625\u0644\u0651\u0627 \u062D\u062A\u0651\u0649 \u062D\u062F\u0651 \u0645\u0627 \u064A\u0645\u0648\u062A.",
      default: true
    },
    {
      id: "7echma",
      nameAr: "\u0642\u0627\u0646\u0648\u0646 \u0627\u0644\u062D\u0634\u0648\u0645\u0629",
      descAr: "\u0627\u0644\u0644\u064A \u0645\u0627\u062A \u0645\u0627 \u0639\u0627\u062F\u0634 \u064A\u062D\u0643\u064A.",
      default: true
    },
    {
      id: "ramadan",
      nameAr: "\u0648\u0636\u0639 \u0631\u0645\u0636\u0627\u0646",
      descAr: "\u0627\u0644\u0644\u064A\u0644 \xAB\u0628\u0639\u062F \u0627\u0644\u0641\u0637\u0648\u0631\xBB\u060C \u0627\u0644\u0641\u064A\u0642\u0629 \xAB\u0627\u0644\u0633\u062D\u0648\u0631\xBB\u060C \u0627\u0644\u0642\u0639\u062F\u0629 +\u062F\u0642\u064A\u0642\u062A\u064A\u0646.",
      default: false
    },
    {
      id: "sari3",
      nameAr: "\u0648\u0636\u0639 \u0627\u0644\u0633\u0631\u064A\u0639",
      descAr: "\u0628\u0644\u0627 Sorci\xE8re\u060C \u0627\u0644\u0642\u0639\u062F\u0629 90 \u062B\u0627\u0646\u064A\u0629.",
      default: false
    }
  ],
  compositionRules: [
    "berger \u0646\u062D\u0637\u0651\u0648\u0647 \u0643\u0627\u0646 \u0643\u0627\u0646 Pyromane \u0641\u064A \u0627\u0644\u0644\u0639\u0628\u0629",
    "grand_mechant_loup \u064A\u0644\u0632\u0645 15 \u0644\u0627\u0639\u0628 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644\u0651",
    "ours / renard / ancien_sage \u064A\u0644\u0632\u0645\u0647\u0645 \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0642\u0639\u062F\u0629",
    "\u0639\u062F\u062F \u0627\u0644\u0630\u064A\u0627\u0628\u0629 \u2248 round(nbJoueurs / 4.5)",
    "voleur: \u0632\u064A\u062F \u0632\u0648\u0632 \u0643\u0627\u0631\u0637\u0627\u062A Villageois \u0632\u064A\u0627\u062F\u0629 \u2014 \u064A\u062A\u062D\u0637\u0651\u0648 \u0645\u0642\u0644\u0648\u0628\u064A\u0646 \u0641\u064A \u0648\u0633\u0637 \u0627\u0644\u0637\u0627\u0648\u0644\u0629",
    "berger: \u064A\u0628\u0639\u062B \u062E\u0631\u0641\u0627\u0646\u0648 \u0627\u0644\u0643\u0644 \u0643\u0644 \u0644\u064A\u0644\u0629 \u2014 \u062E\u0631\u0648\u0641 \u0644\u0643\u0644 \u0634\u062E\u0635\u060C \u0648\u0627\u0644\u062E\u0628\u0631 \u0627\u0644\u0635\u0628\u0627\u062D \u0628\u0627\u0644\u0623\u0639\u062F\u0627\u062F \u0628\u0631\u0643"
  ],
  compositions: [
    {
      players: 8,
      roles: [
        "loup_garou",
        "loup_rouge",
        "voyante",
        "salvateur",
        "sorciere",
        "villageois",
        "villageois",
        "villageois"
      ]
    },
    {
      players: 10,
      roles: [
        "loup_garou",
        "loup_rouge",
        "voyante",
        "salvateur",
        "sorciere",
        "detective",
        "ours",
        "villageois",
        "villageois",
        "villageois"
      ]
    },
    {
      players: 12,
      roles: [
        "loup_garou",
        "loup_rouge",
        "loup_noir",
        "voyante",
        "salvateur",
        "sorciere",
        "detective",
        "ours",
        "cupidon",
        "villageois",
        "villageois",
        "villageois"
      ]
    },
    {
      players: 15,
      roles: [
        "loup_garou",
        "loup_rouge",
        "loup_noir",
        "loup_pere_infecte",
        "voyante",
        "salvateur",
        "sorciere",
        "detective",
        "ours",
        "corbeau",
        "renard",
        "ancien_sage",
        "villageois",
        "villageois",
        "villageois"
      ]
    },
    {
      players: 18,
      roles: [
        "loup_garou",
        "loup_garou",
        "loup_rouge",
        "loup_noir",
        "loup_pere_infecte",
        "grand_mechant_loup",
        "voyante",
        "salvateur",
        "sorciere",
        "detective",
        "ours",
        "corbeau",
        "renard",
        "ancien_sage",
        "barbier",
        "berger",
        "pyromane",
        "villageois"
      ]
    },
    {
      players: 22,
      roles: [
        "loup_garou",
        "loup_garou",
        "loup_rouge",
        "loup_noir",
        "loup_pere_infecte",
        "grand_mechant_loup",
        "voyante",
        "salvateur",
        "sorciere",
        "detective",
        "ours",
        "corbeau",
        "renard",
        "ancien_sage",
        "barbier",
        "berger",
        "cupidon",
        "enfant_sauvage",
        "servante_devouee",
        "pyromane",
        "alien",
        "villageois"
      ]
    }
  ]
};

// src/engine/data.ts
var GAME = roles_default.game;
var ROLES = roles_default.roles;
var HOUSE_RULES = roles_default.houseRules ?? [];
var CAMPS = roles_default.camps ?? {};
var byId = new Map(ROLES.map((r) => [r.id, r]));
var role = (id) => byId.get(id) ?? { id, nameFr: id, emoji: "\u2753", camp: "village", wake: "never", nightOrder: null, count: { min: 0, max: 1 }, descAr: "", mechAr: "", sayAr: "" };
var roleName = (id) => role(id).nameFr;
var roleEmoji = (id) => role(id).emoji;
var roleCamp = (id) => role(id).camp;
var WOLF_ROLES = ROLES.filter((r) => r.camp === "loups").map((r) => r.id);
function suggestedWolves(n) {
  return Math.max(1, Math.round(n / 4.5));
}
function autoCompose(n, opts = {}) {
  const wolves = suggestedWolves(n);
  const out = [];
  const wolfPool = ["loup_garou", "loup_rouge", "loup_pere_infecte", "loup_noir"];
  if (n >= 15) wolfPool.splice(1, 0, "grand_mechant_loup");
  out.push("loup_garou");
  for (let i = 1; i < wolves; i++) out.push(wolfPool[i % wolfPool.length] ?? "loup_garou");
  const ban = new Set(opts.exclude ?? []);
  const core = ["voyante", "sorciere", "salvateur", "cupidon", "detective", "ours", "corbeau", "ancien_sage", "barbier", "renard", "servante_devouee", "enfant_sauvage"].filter((r) => !ban.has(r));
  if (opts.useVoleur && !ban.has("voleur")) core.unshift("voleur");
  for (const r of core) {
    if (out.length >= n) break;
    out.push(r);
  }
  if (n >= 12 && out.length < n) {
    out.push("pyromane");
    out.push("berger");
  }
  if (n >= 16 && out.length < n) out.push("alien");
  while (out.length < n) out.push("villageois");
  return out.slice(0, n);
}

// src/engine/engine.ts
var clone = (x) => JSON.parse(JSON.stringify(x));
var uid = () => Math.random().toString(36).slice(2, 9);
var alive = (s) => s.players.filter((p) => p.alive);
var byId2 = (s, id) => s.players.find((p) => p.id === id);
var nameOf = (s, id) => byId2(s, id)?.name ?? "\u061F";
var findRole = (s, roleId) => s.players.find((p) => p.roleId === roleId);
var aliveWithRole = (s, roleId) => s.players.find((p) => p.roleId === roleId && p.alive);
var hasRole = (s, roleId) => !!aliveWithRole(s, roleId);
function createGame(names, rolesInPlay, options) {
  const shuffled = shuffle(rolesInPlay);
  const players = names.map((name, i) => ({
    id: uid(),
    name: name.trim() || `\u0644\u0627\u0639\u0628 ${i + 1}`,
    seat: i,
    roleId: shuffled[i],
    originRoleId: shuffled[i],
    alive: true,
    camp: roleCamp(shuffled[i]),
    lover: false,
    doused: false,
    muted: false,
    bites: 0,
    infected: false,
    lostVote: false,
    deviceId: null,
    deathNight: null,
    deathCause: null
  }));
  const opts = {
    sheepCount: 3,
    debateSeconds: 180,
    houseRules: {},
    useVoleur: rolesInPlay.includes("voleur"),
    ...options
  };
  const memory = {
    sheepStart: opts.sheepCount,
    sheepAlive: opts.sheepCount,
    sheepWet: 0,
    salvateurLast: null,
    loupRougeLast: null,
    corbeauTarget: null,
    sorciereHeal: false,
    sorciereKill: false,
    barbierUsed: false,
    infectUsed: false,
    renardLost: false,
    voleurDone: false,
    villagePowersLost: false,
    wolfDied: false,
    enfantModel: null,
    alienAttempts: 0,
    speechDirection: "cw",
    centerCards: opts.useVoleur ? ["villageois", "villageois"] : []
  };
  const s = {
    phase: "night",
    night: 1,
    day: 0,
    mode: options?.mode ?? "assisted",
    players,
    rolesInPlay,
    memory,
    queue: [],
    stepIdx: 0,
    picks: {},
    lastReveal: null,
    morning: null,
    votes: {},
    winner: null,
    log: [{ night: 0, phase: "setup", textAr: "\u0627\u0644\u0637\u0628\u0642\u0629 \u0628\u062F\u0627\u062A \u2014 \u0627\u0644\u0643\u0627\u0631\u0637\u0627\u062A \u062A\u0642\u0633\u0645\u0648.", emoji: "\u{1F3B4}" }],
    options: opts
  };
  return beginNight(s);
}
function shuffle(a) {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}
var NIGHT_ORDER = [
  "alien",
  // 👽
  "barbier",
  // 🔫
  "cupidon",
  // 💘 1ʳᵉ nuit
  "enfant_sauvage",
  // 🐾 1ʳᵉ nuit
  "loup_rouge",
  // 🔴
  "salvateur",
  // 🛡️
  "berger",
  // 🐑
  "loup_garou",
  // 🐺 tous les loups
  "grand_mechant_loup",
  // 🐺 (rattaché aux loups)
  "loup_pere_infecte",
  // 🩸 à partir de la nuit 2, après les loups
  "voyante",
  // 🔮
  "renard",
  // 🦊 (rattaché aux rôles d'information)
  "sorciere",
  // 🧪
  "pyromane",
  // 🔥
  "detective",
  // 🕵️
  "corbeau",
  // 🐦‍⬛
  "ancien_sage",
  // 🧓
  "lovers_recognize",
  // ❤️ « Cupidon encore » — les amoureux se reconnaissent
  "loup_noir"
  // 🤐
];
function beginNight(state) {
  const s = clone(state);
  s.phase = "night";
  s.picks = {};
  s.lastReveal = null;
  s.morning = null;
  s.stepIdx = 0;
  s.players.forEach((p) => {
    p.muted = false;
    p.lostVote = false;
  });
  const q = [];
  const first = s.night === 1;
  if (first && hasRole(s, "voleur")) q.push("voleur");
  for (const rid of NIGHT_ORDER) {
    if (rid === "lovers_recognize") {
      if (first && s.players.some((p) => p.lover)) q.push(rid);
      continue;
    }
    if (!aliveWithRole(s, rid)) continue;
    if ((rid === "cupidon" || rid === "enfant_sauvage") && !first) continue;
    if (rid === "loup_pere_infecte" && (first || s.memory.infectUsed)) continue;
    if (rid === "grand_mechant_loup" && s.memory.wolfDied) continue;
    if (rid === "renard" && s.memory.renardLost) continue;
    if (rid === "berger" && s.memory.sheepAlive <= 0) continue;
    if (rid === "barbier" && s.memory.barbierUsed) continue;
    if (rid === "sorciere" && s.memory.sorciereHeal && s.memory.sorciereKill) continue;
    if (s.memory.villagePowersLost && roleCamp(rid) === "village") continue;
    q.push(rid);
  }
  if (first && q.includes("cupidon") && !q.includes("lovers_recognize")) {
    q.splice(q.indexOf("loup_noir") >= 0 ? q.indexOf("loup_noir") : q.length, 0, "lovers_recognize");
  }
  s.queue = q;
  return s;
}
function currentStep(s) {
  if (s.phase !== "night" || s.stepIdx >= s.queue.length) return null;
  const key = s.queue[s.stepIdx];
  const others = (excl = []) => alive(s).filter((p) => !excl.includes(p.id)).map((p) => p.id);
  const me = (rid) => aliveWithRole(s, rid);
  switch (key) {
    case "voleur": {
      return {
        key,
        roleId: "voleur",
        titleFr: "Voleur",
        emoji: "\u{1F0CF}",
        kind: "voleur",
        sayAr: role("voleur").sayAr,
        hintAr: "\u0632\u0648\u0632 \u0643\u0627\u0631\u0637\u0627\u062A \u0645\u0642\u0644\u0648\u0628\u064A\u0646 \u0641\u064A \u0648\u0633\u0637 \u0627\u0644\u0637\u0627\u0648\u0644\u0629. \u0643\u0627\u0646 \u0627\u0644\u0632\u0648\u0632 \u0630\u064A\u0627\u0628\u0629 \u2192 \u0645\u062C\u0628\u0648\u0631 \u064A\u0627\u062E\u0630 \u0648\u062D\u062F\u0629.",
        options: s.memory.centerCards.map((c, i) => ({ id: String(i), labelAr: roleName(c), emoji: roleEmoji(c) })),
        secret: true
      };
    }
    case "cupidon": {
      return {
        key,
        roleId: "cupidon",
        titleFr: "Cupidon",
        emoji: "\u{1F498}",
        kind: "pick",
        sayAr: role("cupidon").sayAr,
        min: 2,
        max: 2,
        candidates: alive(s).map((p) => p.id),
        hintAr: "\u064A\u0646\u062C\u0651\u0645 \u064A\u062E\u062A\u0627\u0631 \u0631\u0648\u062D\u0648. \u0643\u0627\u0646 \u0627\u0644\u0632\u0648\u0632 \u0645\u0646 \u0641\u0631\u0642\u062A\u064A\u0646 \u0645\u062E\u062A\u0644\u0641\u062A\u064A\u0646 \u2192 \u064A\u0648\u0644\u0651\u064A\u0648 \u0641\u0631\u064A\u0642 \u062B\u0627\u0644\u062B."
      };
    }
    case "lovers_recognize": {
      const l = s.players.filter((p) => p.lover);
      return {
        key,
        roleId: null,
        titleFr: "Les Amoureux",
        emoji: "\u2764\uFE0F",
        kind: "info",
        sayAr: "\u0627\u0644\u062D\u0628\u0627\u064A\u0628 \u064A\u0641\u064A\u0642\u0648 \u0648\u064A\u062A\u0639\u0627\u0631\u0641\u0648... \u0648\u0645\u0646 \u0628\u0639\u062F \u064A\u0631\u062C\u0639\u0648 \u064A\u0631\u0642\u062F\u0648.",
        hintAr: l.length === 2 ? `${l[0].name} \u2764\uFE0F ${l[1].name}` : "",
        secret: true
      };
    }
    case "enfant_sauvage": {
      const p = me("enfant_sauvage");
      return {
        key,
        roleId: "enfant_sauvage",
        titleFr: "Enfant Sauvage",
        emoji: "\u{1F43E}",
        kind: "pick",
        sayAr: role("enfant_sauvage").sayAr,
        min: 1,
        max: 1,
        candidates: others([p.id]),
        hintAr: "\u0643\u064A \u064A\u0645\u0648\u062A \u0627\u0644\u0645\u0648\u062F\u0627\u0644 \u0645\u062A\u0627\u0639\u0648\u060C \u064A\u0648\u0644\u0651\u064A \u0630\u064A\u0628."
      };
    }
    case "barbier": {
      const p = me("barbier");
      return {
        key,
        roleId: "barbier",
        titleFr: "Barbier",
        emoji: "\u{1F52B}",
        kind: "pick",
        sayAr: "Le Barbier \u064A\u0641\u064A\u0642. \u0639\u0646\u062F\u0643 <b>\u0637\u0644\u0642\u0629 \u0648\u062D\u062F\u0629</b> \u0641\u064A \u0627\u0644\u0637\u0628\u0642\u0629 \u0627\u0644\u0643\u0644 \u2014 \u062A\u062D\u0628\u0651 \u062A\u0633\u062A\u0639\u0645\u0644\u0647\u0627 \u0627\u0644\u0644\u064A\u0644\u0629\u061F",
        min: 0,
        max: 1,
        candidates: alive(s).filter((x) => x.id !== p.id).map((x) => x.id),
        hintAr: "\u{1F43A} \u0636\u0631\u0628 \u0630\u064A\u0628 \u0648\u0644\u0651\u0627 \u0648\u062D\u062F\u0627\u0646\u064A \u2192 \u064A\u0639\u064A\u0634 \xB7 \u{1F3D8}\uFE0F \u0636\u0631\u0628 \u0648\u0627\u062D\u062F \u0645\u0646 \u0627\u0644\u062D\u0648\u0645\u0629 \u2192 \u064A\u0645\u0648\u062A \u0645\u0639\u0627\u0647. \u0645\u0627 \u064A\u062D\u0628\u0651\u0634 \u2192 \u0639\u062F\u0651\u064A."
      };
    }
    case "alien": {
      const p = me("alien");
      return {
        key,
        roleId: "alien",
        titleFr: "Alien",
        emoji: "\u{1F47D}",
        kind: "alien",
        sayAr: "L'Alien \u064A\u0641\u064A\u0642. \u062A\u062D\u0628\u0651 \u062A\u062D\u0632\u0631 \u0639\u0644\u0649 \u062F\u0648\u0631 \u0648\u0627\u062D\u062F \u0627\u0644\u0644\u064A\u0644\u0629\u061F",
        min: 0,
        max: 1,
        candidates: alive(s).filter((x) => x.id !== p.id).map((x) => x.id),
        hintAr: `\u062D\u0632\u0631 \u0635\u062D\u0651 \u2192 \u0627\u0644\u0622\u062E\u0631 \u064A\u0637\u064A\u0631 \xB7 \u063A\u0644\u0637 \u2192 \u0627\u0644\u0640 Alien \u064A\u0645\u0648\u062A. (\u062D\u0627\u0648\u0644 ${s.memory.alienAttempts} \u0645\u0631\u0651\u0629 \u0642\u0628\u0644)`
      };
    }
    case "secret_signs": {
      const who = [hasRole(s, "barbier") && "Barbier \u{1F52B}", hasRole(s, "alien") && "Alien \u{1F47D}"].filter(Boolean).join(" \xB7 ");
      return {
        key,
        roleId: null,
        titleFr: who,
        emoji: "\u{1F91D}",
        kind: "info",
        sayAr: "\u062A\u0648\u0651\u0627 \u064A\u062A\u0641\u0627\u0647\u0645\u0648 \u0645\u0639 \u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u0639\u0644\u0649 \u0627\u0644\u0625\u0634\u0627\u0631\u0629 \u0645\u062A\u0627\u0639\u0647\u0645 \u2014 \u0648\u0642\u062A \u0645\u0627 \u064A\u0639\u0645\u0644\u0648\u0647\u0627\u060C \u0646\u0631\u0642\u0651\u062F\u0648 \u0627\u0644\u062D\u0648\u0645\u0629 \u0627\u0644\u0643\u0644.",
        hintAr: "\u0641\u064A \u0645\u0648\u0636\u0629 host/join\u060C \u0627\u0644\u0644\u0639\u0651\u0627\u0628 \u064A\u0636\u063A\u0637 \u0627\u0644\u0628\u0648\u062A\u0648\u0646 \u0641\u064A \u062A\u064A\u0644\u064A\u0641\u0648\u0646\u0648 \u0648\u0627\u0644\u0645\u0639\u0644\u0651\u0645 \u064A\u0648\u0635\u0644\u0648 \u0627\u0644\u0625\u0634\u0639\u0627\u0631."
      };
    }
    case "ancien_sage": {
      return {
        key,
        roleId: "ancien_sage",
        titleFr: "Ancien Sage",
        emoji: "\u{1F9D3}",
        kind: "choice",
        sayAr: role("ancien_sage").sayAr || "Ancien Sage \u064A\u0641\u064A\u0642. \u0627\u062A\u0651\u062C\u0627\u0647 \u0627\u0644\u0643\u0644\u0645\u0629 \u0644\u063A\u062F\u0648\u0629\u061F",
        options: [
          { id: "cw", labelAr: "\u0645\u0639 \u0639\u0642\u0627\u0631\u0628 \u0627\u0644\u0633\u0627\u0639\u0629", emoji: "\u{1F503}" },
          { id: "ccw", labelAr: "\u0636\u062F\u0651 \u0639\u0642\u0627\u0631\u0628 \u0627\u0644\u0633\u0627\u0639\u0629", emoji: "\u{1F504}" }
        ]
      };
    }
    case "voyante": {
      const p = me("voyante");
      return {
        key,
        roleId: "voyante",
        titleFr: "Voyante",
        emoji: "\u{1F52E}",
        kind: "pick",
        sayAr: role("voyante").sayAr,
        min: 1,
        max: 1,
        candidates: others([p.id]),
        secret: true
      };
    }
    case "renard": {
      const p = me("renard");
      return {
        key,
        roleId: "renard",
        titleFr: "Renard",
        emoji: "\u{1F98A}",
        kind: "pick",
        sayAr: role("renard").sayAr,
        min: 1,
        max: 1,
        candidates: alive(s).map((x) => x.id),
        hintAr: "\u064A\u0634\u0645\u0651 \u0627\u0644\u0634\u062E\u0635 + \u062C\u0627\u0631\u0648 \u0627\u0644\u064A\u0645\u064A\u0646 + \u062C\u0627\u0631\u0648 \u0627\u0644\u064A\u0633\u0627\u0631. \u0643\u0627\u0646 \u0645\u0627 \u0641\u0645\u0651\u0627\u0634 \u0630\u064A\u0628 \u2192 \u064A\u062E\u0633\u0631 \u0642\u0648\u0651\u062A\u0648 \u0644\u0644\u0622\u062E\u0631.",
        secret: true
      };
    }
    case "detective": {
      const p = me("detective");
      return {
        key,
        roleId: "detective",
        titleFr: "D\xE9tective",
        emoji: "\u{1F575}\uFE0F",
        kind: "pick",
        sayAr: role("detective").sayAr,
        min: 2,
        max: 2,
        candidates: others([p.id]),
        hintAr: "\u0632\u0648\u0632 \u0623\u0634\u062E\u0627\u0635: \u0646\u0641\u0633 \u0627\u0644\u0643\u0644\u0627\u0646 \u0648\u0644\u0651\u0627 \u0644\u0627\u061F",
        secret: true
      };
    }
    case "salvateur": {
      const last = s.memory.salvateurLast;
      return {
        key,
        roleId: "salvateur",
        titleFr: "Salvateur",
        emoji: "\u{1F6E1}\uFE0F",
        kind: "pick",
        sayAr: role("salvateur").sayAr,
        min: 1,
        max: 1,
        candidates: alive(s).filter((p) => p.id !== last).map((p) => p.id),
        hintAr: last ? `\u0645\u0645\u0646\u0648\u0639 ${nameOf(s, last)} (\u062D\u0631\u0633\u0648 \u0627\u0644\u0628\u0627\u0631\u062D) \xB7 \u064A\u0646\u062C\u0651\u0645 \u064A\u062D\u0631\u0633 \u0631\u0648\u062D\u0648` : "\u064A\u0646\u062C\u0651\u0645 \u064A\u062D\u0631\u0633 \u0631\u0648\u062D\u0648"
      };
    }
    case "berger": {
      const p = me("berger");
      return {
        key,
        roleId: "berger",
        titleFr: "Berger",
        emoji: "\u{1F411}",
        kind: "berger",
        sayAr: `Le Berger \u064A\u0641\u064A\u0642. \u0628\u0627\u0642\u064A\u0644\u0643 ${s.memory.sheepAlive} \u062E\u0631\u0641\u0627\u0646 \u2014 \u0644\u0639\u0646\u062F \u0634\u0643\u0648\u0646 \u062A\u0628\u0639\u062B\u0647\u0645 \u0627\u0644\u0644\u064A\u0644\u0629\u061F`,
        min: Math.min(s.memory.sheepAlive, Math.max(0, alive(s).length - 1)),
        max: Math.min(s.memory.sheepAlive, Math.max(0, alive(s).length - 1)),
        candidates: others([p.id]),
        hintAr: "\u062E\u0631\u0648\u0641 \u0644\u0643\u0644 \u0648\u0627\u062D\u062F \u2014 \u0645\u062C\u0628\u0648\u0631 \u064A\u0628\u0639\u062B\u0647\u0645 \u0627\u0644\u0643\u0644. \u0627\u0644\u062E\u0628\u0631 \u0627\u0644\u0635\u0628\u0627\u062D \u0628\u0627\u0644\u0623\u0639\u062F\u0627\u062F \u0628\u0631\u0643."
      };
    }
    case "corbeau": {
      const p = me("corbeau");
      return {
        key,
        roleId: "corbeau",
        titleFr: "Corbeau",
        emoji: "\u{1F426}\u200D\u2B1B",
        kind: "pick",
        sayAr: role("corbeau").sayAr,
        min: 0,
        max: 1,
        candidates: others([p.id]),
        hintAr: "\u064A\u0632\u064A\u062F +2 \u0635\u0648\u062A \u0639\u0644\u0649 \u0627\u0644\u0644\u064A \u064A\u062E\u062A\u0627\u0631\u0648 \u0641\u064A \u06A4\u0648\u062A \u063A\u062F\u0648\u0629."
      };
    }
    case "pyromane": {
      const n = Math.max(1, s.memory.sheepStart - 1);
      const dousable = alive(s).filter((p) => !p.doused).map((p) => p.id);
      return {
        key,
        roleId: "pyromane",
        titleFr: "Pyromane",
        emoji: "\u{1F525}",
        kind: "pyromane",
        sayAr: role("pyromane").sayAr,
        min: 1,
        max: Math.min(n, dousable.length),
        candidates: dousable,
        hintAr: `\u{1F4A7} \u064A\u0628\u0644\u0651\u0644 \u062D\u062A\u0651\u0649 ${n} \u0646\u0627\u0633 \xB7 \u{1F525} \u0648\u0644\u0651\u0627 \u064A\u0634\u0639\u0644 \u0627\u0644\u0646\u0627\u0631 \u0641\u064A \u0627\u0644\u0645\u0628\u0644\u0648\u0644\u064A\u0646 \u0627\u0644\u0643\u0644 (${alive(s).filter((p) => p.doused).length} \u062A\u0648\u0651\u0627)`
      };
    }
    case "loup_rouge": {
      const last = s.memory.loupRougeLast;
      const p = me("loup_rouge");
      return {
        key,
        roleId: "loup_rouge",
        titleFr: "Loup Rouge",
        emoji: "\u{1F534}",
        kind: "pick",
        sayAr: role("loup_rouge").sayAr,
        min: 0,
        max: 1,
        candidates: alive(s).filter((x) => x.id !== last && x.id !== p.id).map((x) => x.id),
        hintAr: `\u064A\u0628\u0644\u0648\u0643\u064A \u0642\u0648\u0651\u0629 \u0648\u0627\u062D\u062F \u0627\u0644\u0644\u064A\u0644\u0629 \u2014 \u062D\u062A\u0651\u0649 \u0630\u064A\u0628. ${last ? "\u0645\u0645\u0646\u0648\u0639 " + nameOf(s, last) : ""}`
      };
    }
    case "loup_garou": {
      const prey = alive(s).filter((p) => p.camp !== "loups").map((p) => p.id);
      return {
        key,
        roleId: "loup_garou",
        titleFr: "Les Loups Garous",
        emoji: "\u{1F43A}",
        kind: "pick",
        sayAr: role("loup_garou").sayAr,
        min: 1,
        max: 1,
        candidates: prey,
        hintAr: "\u0627\u0644\u0630\u064A\u0628 \u0645\u0627 \u064A\u0627\u0643\u0644\u0634 \u0630\u064A\u0628."
      };
    }
    case "grand_mechant_loup": {
      const victim = s.picks["loup_garou"]?.[0];
      const prey = alive(s).filter((p) => p.camp !== "loups" && p.id !== victim).map((p) => p.id);
      return {
        key,
        roleId: "grand_mechant_loup",
        titleFr: "Grand M\xE9chant Loup",
        emoji: "\u{1F43A}",
        kind: "pick",
        sayAr: role("grand_mechant_loup").sayAr,
        min: 0,
        max: 1,
        candidates: prey,
        hintAr: "\u0636\u062D\u064A\u0651\u0629 \u062B\u0627\u0646\u064A\u0629 \u2014 \u0637\u0648\u0644 \u0645\u0627 \u0645\u0627 \u0645\u0627\u062A \u062D\u062A\u0651\u0649 \u0630\u064A\u0628."
      };
    }
    case "loup_pere_infecte": {
      const victim = s.picks["loup_garou"]?.[0];
      return {
        key,
        roleId: "loup_pere_infecte",
        titleFr: "Loup P\xE8re Infecte",
        emoji: "\u{1FA78}",
        kind: "choice",
        sayAr: role("loup_pere_infecte").sayAr,
        hintAr: victim ? `\u0636\u062D\u064A\u0651\u0629 \u0627\u0644\u0644\u064A\u0644\u0629: ${nameOf(s, victim)} \u2014 \u062A\u0639\u062F\u0651\u064A\u0644\u0648 \u0628\u062F\u0644 \u0645\u0627 \u064A\u0645\u0648\u062A\u061F (\u0645\u0631\u0651\u0629 \u0648\u062D\u062F\u0629 \u0641\u064A \u0627\u0644\u0637\u0628\u0642\u0629)` : "\u0645\u0627 \u0641\u0645\u0651\u0627\u0634 \u0636\u062D\u064A\u0651\u0629.",
        options: [
          { id: "yes", labelAr: "\u0625\u064A\u0647\u060C \u0646\u0639\u062F\u0651\u064A\u0644\u0648", emoji: "\u{1FA78}" },
          { id: "no", labelAr: "\u0644\u0627\u060C \u064A\u0645\u0648\u062A", emoji: "\u{1F480}" }
        ]
      };
    }
    case "loup_noir": {
      const p = me("loup_noir");
      return {
        key,
        roleId: "loup_noir",
        titleFr: "Loup Noir",
        emoji: "\u{1F910}",
        kind: "pick",
        sayAr: role("loup_noir").sayAr,
        min: 0,
        max: 1,
        candidates: alive(s).filter((x) => x.id !== p.id).map((x) => x.id),
        hintAr: "\u0627\u0644\u0644\u064A \u064A\u062E\u062A\u0627\u0631\u0648 \u0645\u0627 \u064A\u062D\u0643\u064A\u0634 \u063A\u062F\u0648\u0629 \u0641\u064A \u0642\u0639\u062F\u0629 \u0627\u0644\u062D\u0648\u0645\u0629."
      };
    }
    case "sorciere": {
      const victim = s.picks["loup_garou"]?.[0];
      return {
        key,
        roleId: "sorciere",
        titleFr: "Sorci\xE8re",
        emoji: "\u{1F9EA}",
        kind: "sorciere",
        sayAr: role("sorciere").sayAr,
        hintAr: victim ? `\u0636\u062D\u064A\u0651\u0629 \u0627\u0644\u0644\u064A\u0644\u0629: ${nameOf(s, victim)}` : "\u0645\u0627 \u0641\u0645\u0651\u0627\u0634 \u0636\u062D\u064A\u0651\u0629 \u0627\u0644\u0644\u064A\u0644\u0629.",
        candidates: alive(s).map((p) => p.id),
        secret: true
      };
    }
  }
  return null;
}
function submitStep(state, value) {
  let s = clone(state);
  const step = currentStep(state);
  if (!step) return s;
  s.picks[step.key] = value;
  s.lastReveal = null;
  switch (step.key) {
    case "voleur": {
      const p = findRole(s, "voleur");
      if (value?.swap === true) {
        const taken = s.memory.centerCards[value.index];
        s.memory.centerCards[value.index] = "voleur";
        p.roleId = taken;
        p.camp = roleCamp(taken);
        s.log.push({ night: 1, phase: "night", textAr: `Le Voleur \u0628\u062F\u0651\u0644 \u0643\u0627\u0631\u0637\u062A\u0648.`, emoji: "\u{1F0CF}" });
        s.lastReveal = { titleAr: "\u{1F0CF} Le Voleur \u0628\u062F\u0651\u0644", bodyAr: `${p.name} \u0648\u0644\u0651\u0627 <b>${roleName(taken)}</b> ${roleEmoji(taken)}`, tone: "neutral" };
        if (taken === "cupidon" && !s.queue.includes("cupidon")) s.queue.splice(s.stepIdx + 1, 0, "cupidon", "lovers_recognize");
        if (taken === "enfant_sauvage" && !s.queue.includes("enfant_sauvage")) s.queue.splice(s.stepIdx + 1, 0, "enfant_sauvage");
      } else {
        p.roleId = "villageois";
        p.camp = "village";
        s.lastReveal = { titleAr: "\u{1F0CF} Le Voleur \u062E\u0644\u0651\u0649 \u0643\u0627\u0631\u0637\u062A\u0648", bodyAr: `${p.name} \u0648\u0644\u0651\u0627 <b>Villageois</b> \u0639\u0627\u062F\u064A \u{1F9CD}`, tone: "neutral" };
      }
      s.memory.voleurDone = true;
      break;
    }
    case "cupidon": {
      const [a, b] = value;
      s.players.forEach((p) => {
        p.lover = p.id === a || p.id === b;
      });
      s.log.push({ night: 1, phase: "night", textAr: `Cupidon \u0631\u0628\u0637 ${nameOf(s, a)} \u2764\uFE0F ${nameOf(s, b)}`, emoji: "\u{1F498}" });
      break;
    }
    case "enfant_sauvage": {
      s.memory.enfantModel = value[0];
      break;
    }
    case "ancien_sage": {
      s.memory.speechDirection = value;
      break;
    }
    case "voyante": {
      const t = byId2(s, value[0]);
      s.lastReveal = {
        titleAr: "\u{1F52E} \u0627\u0644\u06A4\u0648\u0627\u064A\u0627\u0646\u062A \u0634\u0627\u0641\u062A",
        tone: "neutral",
        bodyAr: `<b>${t.name}</b> \u0647\u0648 <b>${roleName(t.roleId)}</b> ${roleEmoji(t.roleId)}`
      };
      break;
    }
    case "renard": {
      const trio = neighbourTrio(s, value[0]);
      const found = trio.some((p) => p.camp === "loups");
      if (!found) s.memory.renardLost = true;
      s.lastReveal = {
        titleAr: "\u{1F98A} \u0627\u0644\u062B\u0639\u0644\u0628 \u0634\u0645\u0651",
        tone: found ? "bad" : "good",
        bodyAr: found ? `\u0641\u0645\u0651\u0627 <b>\u0630\u064A\u0628</b> \u0641\u064A \u0627\u0644\u062B\u0644\u0627\u062B\u0629: ${trio.map((p) => p.name).join(" \xB7 ")} \u{1F43A}` : `\u0645\u0627 \u0641\u0645\u0651\u0627\u0634 \u0630\u064A\u0628 \u0641\u064A ${trio.map((p) => p.name).join(" \xB7 ")} \u2014 <b>\u0627\u0644\u062B\u0639\u0644\u0628 \u062E\u0633\u0631 \u0642\u0648\u0651\u062A\u0648 \u0644\u0644\u0622\u062E\u0631</b> \u{1F63F}`
      };
      break;
    }
    case "detective": {
      const [a, b] = value.map((id) => byId2(s, id));
      const same = clanOf(s, a) === clanOf(s, b);
      s.lastReveal = {
        titleAr: "\u{1F575}\uFE0F \u0646\u062A\u064A\u062C\u0629 \u0627\u0644\u062A\u062D\u0642\u064A\u0642",
        tone: same ? "bad" : "good",
        bodyAr: `<b>${a.name}</b> \u0648 <b>${b.name}</b> ${same ? "\u0645\u0646 <b>\u0646\u0641\u0633 \u0627\u0644\u0643\u0644\u0627\u0646</b> \u2705" : "<b>\u0645\u0648\u0634</b> \u0645\u0646 \u0646\u0641\u0633 \u0627\u0644\u0643\u0644\u0627\u0646 \u274C"}`
      };
      break;
    }
    case "salvateur": {
      s.memory.salvateurLast = value[0];
      break;
    }
    case "corbeau": {
      s.memory.corbeauTarget = value?.[0] ?? null;
      break;
    }
    case "loup_rouge": {
      s.memory.loupRougeLast = value?.[0] ?? null;
      break;
    }
    case "sorciere": {
      if (value.heal) s.memory.sorciereHeal = true;
      if (value.kill) s.memory.sorciereKill = true;
      break;
    }
    case "loup_pere_infecte": {
      if (value === "yes") s.memory.infectUsed = true;
      break;
    }
    case "berger":
    case "barbier":
    case "alien": {
      break;
    }
  }
  s.stepIdx++;
  if (s.stepIdx >= s.queue.length) s = resolveNight(s);
  return s;
}
function neighbourTrio(s, centerId) {
  const ring = alive(s).sort((a, b) => a.seat - b.seat);
  const i = ring.findIndex((p) => p.id === centerId);
  if (i < 0) return [];
  const n = ring.length;
  return n <= 2 ? ring : [ring[(i - 1 + n) % n], ring[i], ring[(i + 1) % n]];
}
function neighbours(s, id) {
  const t = neighbourTrio(s, id);
  return t.filter((p) => p.id !== id);
}
function clanOf(s, p) {
  const mixed = mixedLovers(s);
  if (p.lover && mixed) return "amoureux";
  if (p.camp === "solo") return "solo:" + p.roleId;
  return p.camp;
}
function mixedLovers(s) {
  const l = s.players.filter((p) => p.lover);
  return l.length === 2 && l[0].camp !== l[1].camp;
}
function resolveNight(state) {
  const s = clone(state);
  const deaths = [];
  const notes = [];
  const kill = (id, cause, emoji) => {
    if (!id) return;
    const p = byId2(s, id);
    if (!p || !p.alive) return;
    if (deaths.some((d) => d.playerId === id)) return;
    deaths.push({ playerId: id, cause, emoji });
  };
  const blocked = s.picks["loup_rouge"]?.[0] ?? "";
  const isBlocked = (roleId) => {
    const p = aliveWithRole(s, roleId);
    return !!p && p.id === blocked;
  };
  const guarded = isBlocked("salvateur") ? null : s.picks["salvateur"]?.[0] ?? null;
  let victim = s.picks["loup_garou"]?.[0] ?? null;
  if (victim && victim === guarded) {
    notes.push("\u0627\u0644\u0630\u064A\u0627\u0628\u0629 \u0644\u0642\u0627\u0648 \u0627\u0644\u0628\u0627\u0628 \u0645\u062D\u0631\u0648\u0633 \u{1F6E1}\uFE0F");
    victim = null;
  }
  if (victim) {
    const v = byId2(s, victim);
    if (v.roleId === "ancien_sage") {
      v.bites++;
      if (v.bites < 2) {
        notes.push(`\u0627\u0644\u0634\u064A\u062E \u0646\u062C\u0627 \u0645\u0646 \u0627\u0644\u0639\u0636\u0651\u0629 (${v.bites}/2) \u{1F9D3}`);
        victim = null;
      }
    }
  }
  let victim2 = !s.memory.wolfDied && !isBlocked("grand_mechant_loup") ? s.picks["grand_mechant_loup"]?.[0] ?? null : null;
  if (victim2 && victim2 === guarded) {
    victim2 = null;
    notes.push("\u0627\u0644\u0636\u062D\u064A\u0651\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629 \u0643\u0627\u0646\u062A \u0645\u062D\u0631\u0648\u0633\u0629 \u{1F6E1}\uFE0F");
  }
  if (s.picks["loup_pere_infecte"] === "yes" && victim && !isBlocked("loup_pere_infecte")) {
    const v = byId2(s, victim);
    v.camp = "loups";
    v.infected = true;
    notes.push(`\u0648\u0627\u062D\u062F \u062A\u0639\u062F\u0651\u0649 \u0648\u0648\u0644\u0651\u0649 \u0630\u064A\u0628 \u0641\u064A \u0627\u0644\u0633\u0643\u0651\u0627\u062A \u{1FA78}`);
    victim = null;
  }
  const w = s.picks["sorciere"] ?? {};
  if (w.heal && victim && !isBlocked("sorciere")) {
    notes.push("\u0627\u0644\u0633\u0627\u062D\u0631\u0629 \u062D\u064A\u0651\u0627\u062A \u0636\u062D\u064A\u0651\u0629 \u0627\u0644\u0644\u064A\u0644\u0629 \u{1F49A}");
    victim = null;
  }
  kill(victim, "\u0627\u0644\u0630\u064A\u0627\u0628\u0629 \u0643\u0644\u0627\u0648\u0647", "\u{1F43A}");
  kill(victim2, "Grand M\xE9chant Loup", "\u{1F43A}");
  if (w.kill && !isBlocked("sorciere")) kill(w.kill, "\u0634\u0631\u0628\u0629 \u0627\u0644\u0645\u0648\u062A", "\u{1F9EA}");
  const py = s.picks["pyromane"];
  if (py && !isBlocked("pyromane")) {
    if (py.action === "douse") {
      py.targets.forEach((id) => {
        const p = byId2(s, id);
        if (p) p.doused = true;
      });
    } else if (py.action === "burn") {
      alive(s).filter((p) => p.doused).forEach((p) => kill(p.id, "\u0627\u0644\u0646\u0627\u0631 \u{1F525}", "\u{1F525}"));
      if (s.memory.sheepWet > 0) {
        notes.push(`\u{1F525} ${s.memory.sheepWet} \u062E\u0631\u0648\u0641 \u0645\u0628\u0644\u0648\u0644 \u062A\u062D\u0631\u0642\u0648 \u0632\u0627\u062F\u0629`);
        s.memory.sheepAlive = Math.max(0, s.memory.sheepAlive - s.memory.sheepWet);
        s.memory.sheepWet = 0;
      }
      s.players.forEach((p) => {
        p.doused = false;
      });
    }
  }
  let bergerReport = null;
  const bergerTargets = s.picks["berger"] ?? [];
  if (bergerTargets.length && !isBlocked("berger")) {
    let dead = 0, wet = 0, safe = 0;
    for (const id of bergerTargets) {
      const t = byId2(s, id);
      if (t.camp === "loups") dead++;
      else if (t.roleId === "pyromane" || t.doused) wet++;
      else safe++;
    }
    s.memory.sheepAlive = Math.max(0, s.memory.sheepAlive - dead);
    s.memory.sheepWet = Math.min(s.memory.sheepAlive, s.memory.sheepWet + wet);
    bergerReport = { dead, wet, safe };
  }
  const bTarget = s.picks["barbier"]?.[0];
  if (bTarget && !s.memory.barbierUsed && !isBlocked("barbier")) {
    s.memory.barbierUsed = true;
    const b = aliveWithRole(s, "barbier");
    const t = byId2(s, bTarget);
    const good = t.camp === "loups" || t.camp === "solo";
    kill(t.id, "\u0637\u0644\u0642\u0629 \u0627\u0644\u0640 Barbier \u{1F52B}", "\u{1F52B}");
    if (!good) {
      kill(b.id, "\u0637\u0644\u0642\u062A\u0648 \u0637\u0627\u062D\u062A \u0641\u064A \u063A\u064A\u0631 \u0628\u0644\u0627\u0635\u062A\u0647\u0627", "\u{1F480}");
      notes.push("\u{1F52B} \u0627\u0644\u0640 Barbier \u0636\u0631\u0628 \u0648\u0627\u062D\u062F \u0645\u0646 \u0627\u0644\u062D\u0648\u0645\u0629 \u2014 \u0645\u0627\u062A \u0645\u0639\u0627\u0647");
    } else notes.push("\u{1F52B} \u0627\u0644\u0640 Barbier \u0636\u0631\u0628 \u0641\u064A \u0628\u0644\u0627\u0635\u062A\u0647\u0627 \u2014 \u0639\u0627\u064A\u0634");
  }
  const aPick = s.picks["alien"];
  if (aPick?.target && !isBlocked("alien")) {
    s.memory.alienAttempts++;
    const a = aliveWithRole(s, "alien");
    const t = byId2(s, aPick.target);
    if (t.roleId === aPick.guess) {
      kill(t.id, "\u0627\u0644\u0640 Alien \u0639\u0631\u0641 \u062F\u0648\u0631\u0648 \u{1F47D}", "\u{1F47D}");
      notes.push("\u{1F47D} \u0627\u0644\u0640 Alien \u062D\u0632\u0631 \u0635\u062D\u0651");
    } else {
      kill(a.id, "\u0627\u0644\u0640 Alien \u063A\u0644\u0637 \u0648\u0627\u0646\u0643\u0634\u0641", "\u{1F480}");
      notes.push("\u{1F47D} \u0627\u0644\u0640 Alien \u063A\u0644\u0637 \u2014 \u0645\u0627\u062A");
    }
  }
  const mutedId = isBlocked("loup_noir") ? null : s.picks["loup_noir"]?.[0] ?? null;
  if (mutedId) {
    const p = byId2(s, mutedId);
    if (p) p.muted = true;
  }
  const m = applyDeaths(s, deaths);
  const morning = {
    night: s.night,
    deaths: m.deaths,
    bergerReport,
    oursGrowl: computeOurs(s),
    muted: mutedId,
    rumour: s.options.houseRules?.nmima ? makeRumour(s) : null,
    notes
  };
  s.morning = morning;
  s.phase = "morning";
  s.day = s.night;
  s.log.push({ night: s.night, phase: "morning", emoji: "\u{1F305}", textAr: m.deaths.length ? `\u0627\u0644\u0635\u0628\u0627\u062D: ${m.deaths.map((d) => nameOf(s, d.playerId)).join(" \xB7 ")} \u0637\u0627\u0631\u0648.` : "\u0627\u0644\u0635\u0628\u0627\u062D: \u062D\u062A\u0651\u0649 \u062D\u062F\u0651 \u0645\u0627 \u0645\u0627\u062A \u2014 \u0644\u064A\u0644\u0629 \u0628\u064A\u0636\u0627." });
  return checkVictory(s);
}
function applyDeaths(s, deaths) {
  const out = [];
  const queue = [...deaths];
  while (queue.length) {
    const d = queue.shift();
    const p = byId2(s, d.playerId);
    if (!p || !p.alive) continue;
    p.alive = false;
    p.deathNight = s.night;
    p.deathCause = d.cause;
    out.push(d);
    if (p.camp === "loups") s.memory.wolfDied = true;
    if (p.roleId === "ancien_sage" && d.cause === "\u062D\u0643\u0645 \u0627\u0644\u062D\u0648\u0645\u0629") s.memory.villagePowersLost = true;
    if (s.memory.enfantModel === p.id) {
      const e = s.players.find((x) => x.roleId === "enfant_sauvage" && x.alive);
      if (e) {
        e.camp = "loups";
        s.log.push({ night: s.night, phase: s.phase, emoji: "\u{1F43E}", textAr: `\u0627\u0644\u0645\u0648\u062F\u0627\u0644 \u0645\u062A\u0627\u0639 Enfant Sauvage \u0645\u0627\u062A \u2014 \u0648\u0644\u0651\u0649 \u0630\u064A\u0628.` });
      }
    }
    if (p.lover) {
      const other = s.players.find((x) => x.lover && x.id !== p.id && x.alive);
      if (other) queue.push({ playerId: other.id, cause: "\u0645\u0627\u062A \u0628\u0627\u0644\u0642\u0647\u0631 \u0639\u0644\u0649 \u062D\u0628\u064A\u0628\u0648", emoji: "\u{1F494}" });
    }
  }
  return { deaths: out };
}
function computeOurs(s) {
  const o = aliveWithRole(s, "ours");
  if (!o) return false;
  return neighbours(s, o.id).some((p) => p.camp === "loups");
}
function goDebate(state) {
  const s = clone(state);
  s.phase = "debate";
  return s;
}
function goVote(state) {
  const s = clone(state);
  s.phase = "vote";
  s.votes = {};
  alive(s).forEach((p) => {
    s.votes[p.id] = 0;
  });
  if (s.memory.corbeauTarget && byId2(s, s.memory.corbeauTarget)?.alive) {
    s.votes[s.memory.corbeauTarget] = 2;
  }
  return s;
}
function lynch(state, playerId, servante) {
  let s = clone(state);
  s.memory.corbeauTarget = null;
  if (playerId) {
    const victim = byId2(s, playerId);
    if (servante) {
      const sv = byId2(s, servante);
      if (sv && sv.alive && sv.roleId === "servante_devouee" && !sv.lover) {
        sv.roleId = victim.roleId;
        sv.camp = roleCamp(victim.roleId);
        victim.roleId = "villageois";
        s.log.push({ night: s.night, phase: "vote", emoji: "\u{1F9D5}", textAr: `La Servante D\xE9vou\xE9e \u062E\u0630\u0627\u062A \u0643\u0627\u0631\u0637\u0629 \u0627\u0644\u0644\u064A \u0637\u0627\u0631.` });
      }
    }
    applyDeaths(s, [{ playerId, cause: "\u062D\u0643\u0645 \u0627\u0644\u062D\u0648\u0645\u0629", emoji: "\u270B" }]);
    s.log.push({ night: s.night, phase: "vote", emoji: "\u270B", textAr: `\u0627\u0644\u062D\u0648\u0645\u0629 \u0631\u0641\u0639\u062A \u064A\u062F\u064A\u0647\u0627 \u0639\u0644\u0649 ${victim.name} \u2014 \u0637\u0627\u0631.` });
  } else {
    s.log.push({ night: s.night, phase: "vote", emoji: "\u{1F937}", textAr: "\u0627\u0644\u062D\u0648\u0645\u0629 \u0645\u0627 \u062A\u0641\u0627\u0647\u0645\u062A\u0634 \u2014 \u062D\u062A\u0651\u0649 \u062D\u062F\u0651 \u0645\u0627 \u0637\u0627\u0631." });
  }
  s = checkVictory(s);
  if (!s.winner) {
    s.night++;
    s = beginNight(s);
  }
  return s;
}
function barbierShoot(state, targetId) {
  let s = clone(state);
  const b = aliveWithRole(s, "barbier");
  if (!b || s.memory.barbierUsed) return s;
  s.memory.barbierUsed = true;
  const t = byId2(s, targetId);
  const good = t.camp === "loups" || t.camp === "solo";
  const dd = [{ playerId: t.id, cause: "\u0637\u0644\u0642\u0629 \u0627\u0644\u0640 Barbier \u{1F52B}", emoji: "\u{1F52B}" }];
  if (!good) dd.push({ playerId: b.id, cause: "\u0637\u0644\u0642\u062A\u0648 \u0637\u0627\u062D\u062A \u0641\u064A \u063A\u064A\u0631 \u0628\u0644\u0627\u0635\u062A\u0647\u0627", emoji: "\u{1F480}" });
  applyDeaths(s, dd);
  s.lastReveal = {
    titleAr: good ? "\u{1F52B} \u0637\u0644\u0642\u0629 \u0641\u064A \u0628\u0644\u0627\u0635\u062A\u0647\u0627" : "\u{1F52B} \u0637\u0644\u0642\u0629 \u0636\u0627\u064A\u0639\u0629",
    bodyAr: good ? `<b>${t.name}</b> \u0643\u0627\u0646 <b>${roleName(t.roleId)}</b> \u2014 \u0627\u0644\u0640 Barbier <b>\u064A\u0639\u064A\u0634</b> \u2705` : `<b>${t.name}</b> \u0643\u0627\u0646 <b>${roleName(t.roleId)}</b> \u0645\u0646 \u0627\u0644\u062D\u0648\u0645\u0629 \u2014 \u0627\u0644\u0640 Barbier <b>\u0645\u0627\u062A \u0645\u0639\u0627\u0647</b> \u{1F480}`,
    tone: good ? "good" : "bad"
  };
  s.log.push({ night: s.night, phase: s.phase, emoji: "\u{1F52B}", textAr: `Le Barbier \u0637\u0644\u0642 \u0639\u0644\u0649 ${t.name}.` });
  return checkVictory(s);
}
function alienGuess(state, targetId, guessRoleId) {
  let s = clone(state);
  const a = aliveWithRole(s, "alien");
  if (!a) return s;
  s.memory.alienAttempts++;
  const t = byId2(s, targetId);
  const ok = t.roleId === guessRoleId;
  applyDeaths(s, ok ? [{ playerId: t.id, cause: "\u0627\u0644\u0640 Alien \u0639\u0631\u0641 \u062F\u0648\u0631\u0648 \u{1F47D}", emoji: "\u{1F47D}" }] : [{ playerId: a.id, cause: "\u0627\u0644\u0640 Alien \u063A\u0644\u0637 \u0648\u0627\u0646\u0643\u0634\u0641 \u{1F47D}", emoji: "\u{1F480}" }]);
  s.lastReveal = {
    titleAr: ok ? "\u{1F47D} \u0635\u062D\u0651!" : "\u{1F47D} \u063A\u0644\u0637",
    bodyAr: ok ? `<b>${t.name}</b> \u0643\u0627\u0646 \u0641\u0639\u0644\u0627\u064B <b>${roleName(guessRoleId)}</b> \u2014 \u0637\u0627\u0631 \u{1F480}` : `<b>${t.name}</b> \u0643\u0627\u0646 <b>${roleName(t.roleId)}</b>\u060C \u0645\u0648\u0634 ${roleName(guessRoleId)} \u2014 <b>\u0627\u0644\u0640 Alien \u0645\u0627\u062A</b> \u{1F480}`,
    tone: ok ? "good" : "bad"
  };
  s.log.push({ night: s.night, phase: s.phase, emoji: "\u{1F47D}", textAr: `Alien \u062D\u0632\u0631 \u0639\u0644\u0649 ${t.name}: ${ok ? "\u0635\u062D\u0651" : "\u063A\u0644\u0637"}.` });
  return checkVictory(s);
}
function checkVictory(state) {
  const s = clone(state);
  const a = alive(s);
  const lovers = a.filter((p) => p.lover);
  const solos = a.filter((p) => p.camp === "solo");
  const w = a.filter((p) => p.camp === "loups");
  const win = (camp, labelAr, ids) => {
    s.winner = { camp, labelAr, playerIds: ids };
    s.phase = "end";
    s.log.push({ night: s.night, phase: "end", emoji: "\u{1F3C6}", textAr: labelAr });
    return s;
  };
  if (a.length === 0) return win("personne", "\u0627\u0644\u062D\u0648\u0645\u0629 \u0643\u0644\u0647\u0627 \u0641\u0646\u064A\u062A \u2014 \u062D\u062A\u0651\u0649 \u062D\u062F\u0651 \u0645\u0627 \u0631\u0628\u062D \u{1F480}", []);
  if (lovers.length === 2 && a.length === 2 && mixedLovers(s))
    return win("amoureux", "\u{1F494} \u0627\u0644\u062D\u0628\u0627\u064A\u0628 \u0631\u0628\u062D\u0648 \u2014 \u0628\u0642\u0627\u0648 \u0647\u0648\u0645\u0627 \u0627\u0644\u0632\u0648\u0632!", lovers.map((p) => p.id));
  if (a.length === 1 && solos.length === 1)
    return win("solo", `${solos[0].camp === "solo" ? roleEmoji(solos[0].roleId) : "\u{1F525}"} ${roleName(solos[0].roleId)} \u0631\u0628\u062D \u0648\u062D\u062F\u0648!`, [solos[0].id]);
  if (w.length === 0 && solos.length === 0)
    return win("village", "\u{1F3D8}\uFE0F \u0627\u0644\u062D\u0648\u0645\u0629 \u0631\u0628\u062D\u062A \u2014 \u0627\u0644\u0630\u064A\u0627\u0628\u0629 \u0627\u0644\u0643\u0644 \u0637\u0627\u0631\u0648!", a.map((p) => p.id));
  if (w.length > 0 && solos.length === 0 && w.length >= a.length - w.length)
    return win("loups", "\u{1F43A} \u0627\u0644\u0630\u064A\u0627\u0628\u0629 \u0631\u0628\u062D\u0648 \u2014 \u0648\u0644\u0651\u0627\u0648 \u0623\u063A\u0644\u0628\u064A\u0651\u0629 \u0641\u064A \u0627\u0644\u062D\u0648\u0645\u0629!", w.map((p) => p.id));
  return s;
}
function makeRumour(s) {
  const a = alive(s);
  if (a.length < 4) return null;
  const trueOne = Math.random() < 0.5;
  const pickOne = (x) => x[Math.floor(Math.random() * x.length)];
  const ring = [...a].sort((x, y) => x.seat - y.seat);
  const wolvesAlive = a.filter((p) => p.camp === "loups");
  const villagers = a.filter((p) => p.camp !== "loups");
  const kinds = [
    () => {
      const i = Math.floor(Math.random() * ring.length);
      const trio = [ring[(i - 1 + ring.length) % ring.length], ring[i], ring[(i + 1) % ring.length]];
      const real = trio.some((p) => p.camp === "loups");
      const want = trueOne ? real : !real;
      return want ? `\u0627\u0644\u062D\u0648\u0645\u0629 \u062A\u0642\u0648\u0644: \u0641\u0645\u0651\u0627 \u0630\u064A\u0628 \u0628\u064A\u0646 ${trio.map((p) => p.name).join(" \u0648 ")}.` : null;
    },
    () => {
      const t = pickOne(trueOne ? villagers : wolvesAlive);
      return t ? `\u0627\u0644\u062D\u0648\u0645\u0629 \u062A\u0642\u0648\u0644: ${t.name} \u0645\u0627 \u0647\u0648\u0634 \u0630\u064A\u0628.` : null;
    },
    () => {
      const n = wolvesAlive.length + (trueOne ? 0 : Math.random() < 0.5 ? 1 : -1);
      return n >= 0 ? `\u0627\u0644\u062D\u0648\u0645\u0629 \u062A\u0642\u0648\u0644: \u0628\u0627\u0642\u064A ${n} ${n === 1 ? "\u0630\u064A\u0628" : "\u0630\u064A\u0627\u0628\u0629"} \u0641\u064A \u0627\u0644\u062D\u0648\u0645\u0629.` : null;
    }
  ];
  for (let i = 0; i < 6; i++) {
    const r = pickOne(kinds)();
    if (r) return { textAr: r, trueOne };
  }
  return null;
}
function canBarbier(s) {
  return hasRole(s, "barbier") && !s.memory.barbierUsed;
}
function canAlien(s) {
  return hasRole(s, "alien");
}

// scripts/sim.ts
var pick = (a) => a[Math.floor(Math.random() * a.length)];
var chance = (p) => Math.random() < p;
function playNight(g) {
  let guard = 0;
  while (g.phase === "night" && guard++ < 120) {
    const st = currentStep(g);
    if (!st) break;
    let v = null;
    switch (st.kind) {
      case "info":
        v = null;
        break;
      case "choice":
        v = pick(st.options).id;
        break;
      case "voleur":
        v = chance(0.6) ? { swap: true, index: Math.random() < 0.5 ? 0 : 1 } : { swap: false };
        break;
      case "pyromane": {
        const doused = alive(g).filter((p) => p.doused).length;
        v = doused >= 2 && chance(0.35) ? { action: "burn" } : { action: "douse", targets: shuffleTake(st.candidates, st.max ?? 2) };
        break;
      }
      case "sorciere": {
        const victim = g.picks["loup_garou"]?.[0];
        v = {
          heal: !!victim && !g.memory.sorciereHeal && chance(0.4),
          kill: !g.memory.sorciereKill && chance(0.25) ? pick(st.candidates) : null
        };
        break;
      }
      case "berger":
      case "pick": {
        const n = st.min === st.max ? st.min : st.min + Math.round(Math.random() * (st.max - st.min));
        v = shuffleTake(st.candidates, n);
        break;
      }
    }
    g = submitStep(g, v);
    g.lastReveal = null;
  }
  return g;
}
function shuffleTake(a, n) {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r.slice(0, Math.max(0, Math.min(n, r.length)));
}
function playGame(nPlayers) {
  const names = Array.from({ length: nPlayers }, (_, i) => `L${i + 1}`);
  let g = createGame(names, autoCompose(nPlayers, { useVoleur: chance(0.5) }), { sheepCount: 2 + Math.floor(Math.random() * 4) });
  let rounds = 0;
  while (g.phase !== "end" && rounds++ < 60) {
    g = playNight(g);
    if (g.phase === "end") break;
    g = goDebate(g);
    if (canBarbier(g) && chance(0.12)) {
      const t = pick(alive(g).filter((p) => p.roleId !== "barbier"));
      if (t) g = barbierShoot(g, t.id);
    }
    if (g.phase === "end") break;
    if (canAlien(g) && chance(0.08)) {
      const t = pick(alive(g).filter((p) => p.roleId !== "alien"));
      if (t) g = alienGuess(g, t.id, chance(0.4) ? t.roleId : pick(ROLES).id);
    }
    if (g.phase === "end") break;
    g = goVote(g);
    const cands = alive(g);
    g = lynch(
      g,
      chance(0.85) && cands.length ? pick(cands).id : null,
      chance(0.3) ? alive(g).find((p) => p.roleId === "servante_devouee")?.id ?? null : null
    );
  }
  return { g, rounds };
}
var N = Number(process.argv[2] ?? 400);
var winners = {};
var unfinished = 0;
var maxRounds = 0;
var errors = [];
for (let i = 0; i < N; i++) {
  const n = 6 + Math.floor(Math.random() * 15);
  try {
    const { g, rounds } = playGame(n);
    maxRounds = Math.max(maxRounds, rounds);
    if (g.phase !== "end" || !g.winner) {
      unfinished++;
      continue;
    }
    winners[g.winner.camp] = (winners[g.winner.camp] ?? 0) + 1;
    const a = alive(g);
    if (a.some((p) => p.alive === false)) errors.push("joueur mort marqu\xE9 vivant");
    if (g.players.some((p) => !p.alive && p.deathCause == null)) errors.push("mort sans cause");
    if (g.memory.sheepAlive < 0) errors.push("moutons n\xE9gatifs");
  } catch (e) {
    errors.push(`${e?.message}
${String(e?.stack).split("\n").slice(1, 4).join("\n")}`);
  }
}
console.log(`
\u{1F3B2} ${N} \u0637\u0628\u0642\u0629 \u0645\u0633\u064A\u0645\u064A\u0644\u064A (6 \u2192 20 \u0644\u0627\u0639\u0628)
`);
console.log("\u{1F3C6} \u0627\u0644\u0631\u0627\u0628\u062D :");
var total = Object.values(winners).reduce((a, b) => a + b, 0);
for (const [k, v] of Object.entries(winners).sort((a, b) => b[1] - a[1])) {
  const pct = (v / total * 100).toFixed(1);
  console.log(`   ${k.padEnd(10)} ${String(v).padStart(4)}  ${pct.padStart(5)} %  ${"\u2588".repeat(Math.round(+pct / 2))}`);
}
console.log(`
\u23F1\uFE0F  \u0623\u0637\u0648\u0644 \u0637\u0628\u0642\u0629 : ${maxRounds} \u062F\u0648\u0631\u0629`);
console.log(`\u{1F6AB} \u0645\u0627 \u0643\u0645\u0651\u0644\u062A\u0634   : ${unfinished}`);
console.log(`\u274C \u0623\u062E\u0637\u0627\u0621       : ${errors.length}`);
if (errors.length) {
  const uniq = [...new Set(errors)].slice(0, 5);
  uniq.forEach((e) => console.log("\n   " + e.replace(/\n/g, "\n   ")));
  process.exit(1);
}
console.log("\n\u2705 \u0627\u0644\u0645\u062D\u0631\u0651\u0643 \u062B\u0627\u0628\u062A \u2014 \u062D\u062A\u0651\u0649 \u0637\u0628\u0642\u0629 \u0645\u0627 \u0637\u0627\u062D\u062A.\n");
