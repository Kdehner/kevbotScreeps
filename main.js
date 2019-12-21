/* eslint-disable no-undef, no-console */
const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const roleBuilder = require('./role.builder');
const roleRepairer = require('./role.repairer');

module.exports.loop = function () {
  const harvesters = _.filter(
    Game.creeps,
    creep => creep.memory.role === 'harvester'
  );

  const upgrader = _.filter(
    Game.creeps,
    creep => creep.memory.role === 'upgrader'
  );

  const builder = _.filter(
    Game.creeps,
    creep => creep.memory.role === 'builder'
  );

  const repairer = _.filter(
    Game.creeps,
    creep => creep.memory.role === 'repairer'
  );

  if (harvesters.length < 2) {
    const newName = `Harvester${Game.time}`;
    Game.spawns.kevbotPrime.spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: 'harvester' },
    });
  }
  if (upgrader.length < 1) {
    const newName = `Upgrader${Game.time}`;
    Game.spawns.kevbotPrime.spawnCreep([WORK, CARRY, MOVE], newName, {
      memory: { role: 'upgrader' },
    });
  }
  if (builder.length < 1) {
    const newName = `Builder${Game.time}`;
    Game.spawns.kevbotPrime.spawnCreep([WORK, CARRY, MOVE],
      newName, {
        memory: { role: 'builder' },
      });
  }
  if (repairer.length < 1) {
    const newName = `Repairer${Game.time}`;
    Game.spawns.kevbotPrime.spawnCreep([WORK, CARRY, MOVE],
      newName, {
        memory: { role: 'repairer' },
      });
  }
  if (Game.spawns.kevbotPrime.spawning) {
    const spawn = Game.spawns.kevbotPrime;
    const spawningCreep = Game.creeps[spawn.spawning.name];
    spawn.room.visual.text(
      spawningCreep.memory.role,
      spawn.pos.x + 1,
      spawn.pos.y,
      { align: 'left', opacity: 0.8 }
    );
  }

  for (const name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
    }
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.role === 'harvester') {
      roleHarvester.run(creep);
    }
    if (creep.memory.role === 'upgrader') {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role === 'builder') {
      roleBuilder.run(creep);
    }
    if (creep.memory.role === 'repairer') {
      roleRepairer.run(creep);
    }
  }
};
