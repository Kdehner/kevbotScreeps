/* eslint-disable no-undef */
const roleUpgrader = require('./role.upgrader');

const roleRepairer = {
  /** @param { Creep } creep **/
  run(creep) {
    if (creep.memory.working && creep.carry.energy === 0) {
      creep.memory.working = false;
      creep.say('Harvest');
    }
    if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true;
      creep.say('Repair');
    }
    if (creep.memory.working) {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax,
      });
      if (targets.length > 0) {
        if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {
            visualizePathStyle: {
              stroke: '#ffffff',
            },
          });
        }
      }
    } else {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {
          visualizePathStyle: {
            stroke: '#ffaa00',
          },
        });
      }
    }
  },
};

module.exports = roleRepairer;
