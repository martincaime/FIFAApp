const { Player } = require('../db');
const { Router } = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = Router();

router.get('/api/v1/players', async (req, res) => {
  let { search, order = 'asc', page } = req.query;
  let players = await Player.findAll({
    where: {
      name: {
        [Op.iLike]: `%${search}%`
      }
    }
  });
  order === 'desc' ? players.sort((a, b) => {
    if (a.name < b.name) {
      return 1;
    }
    else if (a.name > b.name) {
      return -1;
    }
    else return 0;
  }): players.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    else if (a.name < b.name) {
      return -1;
    }
    else return 0;
  })
  res.send({ 
    'Page': page, 
    'totalPages': Math.ceil(players.length / 10), 
    'Items': players.length > 10 ? 10 : players.length, 
    'totalItems': players.length, 
    'Players' : players.slice((page - 1) * 10, page*10)
    } 
    )
})

router.post('/api/v1/team', async (req, res) => {
  let { name, page } = req.body;
  let players = await Player.findAll({
    where: {
      club: {
        [Op.iLike]: `%${name}%`
      }
    }
  });
  res.send({ 
    'Page': page, 
    'totalPages': Math.ceil(players.length / 10), 
    'Items': players.length > 10 ? 10 : players.length,
    'totalItems': players.length, 
    'Players' : players.slice((page - 1) * 10, page*10)
    } 
    )
})


module.exports = router;
