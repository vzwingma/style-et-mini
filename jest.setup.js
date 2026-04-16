// Setup file pour les tests React Native avec React 19
// Fournit window.dispatchEvent qui est absent dans l'environnement react-native de jest

if (typeof global.window === 'undefined') {
  global.window = global;
}

if (typeof global.window.dispatchEvent !== 'function') {
  global.window.dispatchEvent = function() {};
}
