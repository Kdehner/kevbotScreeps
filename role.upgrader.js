/* eslint-disable no-undef */
const roleUpgrader = {
  /** @param { Creep } creep **/
  run(creep) {
    if (creep.memory.working && creep.carry.energy === 0) {
      creep.memory.working = false;
      creep.say('Harvest');
    }
    if (!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
      creep.memory.working = true;
      creep.say('Upgrade');
    }

    if (creep.memory.working) {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {
          visualizePathStyle: { stroke: '#ffffff' },
        });
      }
    } else {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  },
};

module.exports = roleUpgrader;
