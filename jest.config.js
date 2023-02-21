// jest.config.js on Jest - testikehyksen konfiguraatiotiedosto, joka sisältää testejä koskevat asetukset, kuten testien etsintäpolun, testattavan koodin polun, testiympäristön määrittelyt, tiedostojen ja testattavien koodinpätkien poissulkemiset sekä monia muita vaihtoehtoja.Jest käyttää jest.config.js - tiedostoa lukeakseen testausasetukset ja mukauttaakseen testiympäristön tarpeisiisi.

module.exports = {



  // Define any additional Jest configuration options you need
  // For example, you can configure Jest to only look for tests in specific directories
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)']
};
