import os from 'node:os';

export function handleOsCommand(currentLine) {
  const [command, ...args] = currentLine.split(' ');
  if (command === 'os') {
    switch (args[0]) {
      case '--EOL':
        console.log('End-Of-Line:', JSON.stringify(os.EOL));
        break;

      case '--cpus':
        const cpus = os.cpus();
        console.log(`overall  count of CPUs: ${cpus.length}`);
        cpus.forEach((cpu, index) => {
          console.log(`CPU ${index + 1}: ${cpu.model} - ${cpu.speed / 1000} GHz`);
        });
        break;

      case '--homedir':
        console.log('Home Directory:', os.homedir());
        break;

      case '--username':
        console.log('System User Name:', os.userInfo().username);
        break;

      case '--architecture':
        console.log('CPU Architecture:', os.arch());
        break;
    }
  }
}
