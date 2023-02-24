'use strict';

const weatherSymbol = weatherSymbol => {
  // 1 selkeää
  // 2 puolipilvistä;
  // 21 heikkoja sadekuuroja;
  // 22 sadekuuroja;
  // 23 voimakkaita sadekuuroja;
  // 3 pilvistä;
  // 31 heikkoa vesisadetta;
  // 32 vesisadetta;
  // 33 voimakasta vesisadetta;
  // 41 heikkoja lumikuuroja;
  // 42 lumikuuroja;
  // 43 voimakkaita lumikuuroja;
  // 51 heikkoa lumisadetta;
  // 52 lumisadetta;
  // 53 voimakasta lumisadetta;
  // 61 ukkoskuuroja;
  // 62 voimakkaita ukkoskuuroja;
  // 63 ukkosta;
  // 64 voimakasta ukkosta;
  // 71 heikkoja räntäkuuroja;
  // 72 räntäkuuroja;
  // 73 voimakkaita räntäkuuroja;
  // 81 heikkoa räntäsadetta;
  // 82 räntäsadetta;
  // 83 voimakasta räntäsadetta;
  // 91 utua;
  // 92 sumua
  if (weatherSymbol === 1) {
    return 'Selkeää';
  } else if (weatherSymbol === 2) {
    return 'Puolipilvistä';
  } else if (weatherSymbol === 21) {
    return 'Heikkoja sadekuuroja';
  } else if (weatherSymbol === 22) {
    return 'Sadekuuroja';
  } else if (weatherSymbol === 23) {
    return 'Voimakkaita sadekuuroja';
  } else if (weatherSymbol === 3) {
    return 'Pilvistä';
  } else if (weatherSymbol === 31) {
    return 'Heikkoa vesisadetta';
  } else if (weatherSymbol === 32) {
    return 'Vesisadetta';
  } else if (weatherSymbol === 33) {
    return 'Voimakasta vesisadetta';
  } else if (weatherSymbol === 41) {
    return 'Heikkoja lumikuuroja';
  } else if (weatherSymbol === 42) {
    return 'Lumikuuroja';
  } else if (weatherSymbol === 43) {
    return 'Voimakkaita lumikuuroja';
  } else if (weatherSymbol === 51) {
    return 'Heikkoa lumisadetta';
  } else if (weatherSymbol === 52) {
    return 'Lumisadetta';
  } else if (weatherSymbol === 53) {
    return 'Voimakasta lumisadetta';
  } else if (weatherSymbol === 61) {
    return 'Ukkoskuuroja';
  } else if (weatherSymbol === 62) {
    return 'Voimakkaita ukkoskuuroja';
  } else if (weatherSymbol === 63) {
    return 'Ukkosta';
  } else if (weatherSymbol === 64) {
    return 'Voimakasta ukkosta';
  } else if (weatherSymbol === 71) {
    return 'Heikkoja räntäkuuroja';
  } else if (weatherSymbol === 72) {
    return 'Räntäkuuroja';
  } else if (weatherSymbol === 73) {
    return 'Voimakkaita räntäkuuroja';
  } else if (weatherSymbol === 81) {
    return 'Heikkoa räntäsadetta';
  } else if (weatherSymbol === 82) {
    return 'Räntäsadetta';
  } else if (weatherSymbol === 83) {
    return 'Voimakasta räntäsadetta';
  } else if (weatherSymbol === 91) {
    return 'Utua';
  } else if (weatherSymbol === 92) {
    return 'Sumua';
  } else {
    return 'tuntematon';
  }
};
export default weatherSymbol;
