module.exports = {
  async up(db) {
    await db.createCollection('test', {
      // Aqui você pode adicionar mais opções de configuração, se necessário
    });

    // Agora, você pode adicionar documentos à coleção se desejar
    await db.collection('test').insertOne({ justTest: 'Testing migrations' });
  },

  async down(db) {
    await db.collection('test').drop();
  },
};
