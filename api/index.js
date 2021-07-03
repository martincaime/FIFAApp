const server = require('./src/app.js');
const { conn, Player } = require('./src/db.js');
const axios = require('axios');

conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001');
    axios.get('https://www.easports.com/fifa/ultimate-team/api/fut/item')
      .then(response => {
        for (let i = 1; i <= response.data.totalPages; i++) {
          axios.get(`https://www.easports.com/fifa/ultimate-team/api/fut/item?page=${i}`).then(
            res => {
              const players = res.data.items.map(p => ({
                name: p.name,
                position: p.position,
                nation: p.nation.name,
                club: p.club.name
              }))
              for (let i = 0; i < players.length; i++) {
                async function createPlayer(player) {
                  return await Player.findOrCreate({
                    where: {
                      name: player.name,
                      position: player.position,
                      nation: player.nation,
                      club: player.club
                    }
                  })
                }
                createPlayer(players[i])
              }
            }
            ).then(() => console.log(`Page ${i} imported to DB`))
        }
      }).then(() => console.log('Done'))
      .catch(e => console.error(e))
  });
});
