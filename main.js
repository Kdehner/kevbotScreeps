const roleHarvester = require();

module.exports.loop = function () {
  const spawn1 = Game.spawns['Spawn1'];

  for (let name in Memory.creeps) {
    if (!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log(`Clearing non-existing creep memory:${name}`);
    }
  }

  const harvesters = _.filter(Game.creeps, creep => creep.memory.role === 'harvester');
  
  if(harvesters.length < 2) {
    const newName = `Harvester${Game.time}`;
    console.log(`Spawning new harvester: ${newName}`);
    spawn1.spawnCreep([WORK,CARRY,MOVE], newName, {memory: {role: 'harvester'}});
  }

  if(spawn1.spawning) {
    const spawnCreep = Game.creeps[spawn1.spawning.name];
    spawn1.room.visual.text(
      `🛠️ ${spawningCreep.memory.role}`,
      spawn1.pos.x + 1,
      spawn1.pos.y,
      {align: 'left', opacity: 0.8}
    );
  }

  for (let name in Game.creeps) {
    const creep = Game.creeps[name];
    if(creep.memory.role === 'harvester') {
      roleHarvester.run(creep);
    }
  }

}