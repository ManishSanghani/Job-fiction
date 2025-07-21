#!/usr/bin/env node

const { exec } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🔧 Port 5000 Fix Script');
console.log('========================\n');

// Function to check if port 5000 is in use
function checkPort5000() {
    return new Promise((resolve, reject) => {
        exec('netstat -ano | findstr :5000', (error, stdout, stderr) => {
            if (error) {
                resolve(false); // Port not in use
            } else {
                resolve(stdout.trim() !== '');
            }
        });
    });
}

// Function to kill process on port 5000
function killProcessOnPort5000() {
    return new Promise((resolve, reject) => {
        exec('for /f "tokens=5" %a in (\'netstat -aon ^| findstr :5000\') do taskkill /f /pid %a', (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
}

async function main() {
    try {
        const isPortInUse = await checkPort5000();
        
        if (isPortInUse) {
            console.log('⚠️  Port 5000 is currently in use');
            console.log('This might be causing the EADDRINUSE error');
            
            rl.question('Do you want to kill the process using port 5000? (y/n): ', async (answer) => {
                if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
                    try {
                        await killProcessOnPort5000();
                        console.log('✅ Process on port 5000 has been terminated');
                        console.log('🔄 You can now try starting the application again');
                    } catch (error) {
                        console.log('❌ Failed to kill process:', error.message);
                        console.log('💡 Try running the application with a different port:');
                        console.log('   PORT=3001 npm start');
                    }
                } else {
                    console.log('💡 You can try starting the application with a different port:');
                    console.log('   PORT=3001 npm start');
                }
                rl.close();
            });
        } else {
            console.log('✅ Port 5000 is not in use');
            console.log('💡 The EADDRINUSE error might be from a different port');
            console.log('🔄 Try starting the application again: npm start');
            rl.close();
        }
    } catch (error) {
        console.error('❌ Error checking port:', error);
        rl.close();
    }
}

main(); 