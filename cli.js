import { argv } from 'node:process';

const getUsername = () => {
    const argum = argv.slice(2);

    const argUsername = argum.find((item) => item.startsWith('--username='));
    const username = argUsername ? argUsername.split('=')[1] : "User";

    console.log(`Welcome to the File Manager, ${username}!`);
};

export default getUsername;