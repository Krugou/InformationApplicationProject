// jest.config.js on Jest - testikehyksen konfiguraatiotiedosto, joka sisältää testejä koskevat asetukset, kuten testien etsintäpolun, testattavan koodin polun, testiympäristön määrittelyt, tiedostojen ja testattavien koodinpätkien poissulkemiset sekä monia muita vaihtoehtoja.Jest käyttää jest.config.js - tiedostoa lukeakseen testausasetukset ja mukauttaakseen testiympäristön tarpeisiisi.

export default {
  'extensionsToTreatAsEsm': ['.js'],
  'testEnvironment': 'node',
  'transform': {},
  'transformIgnorePatterns': [
    '/node_modules/(?!(@babel/runtime|lodash-es|other-es-module)/)',
  ],
};

