const chalk = require('./node_modules/chalk');

const fs = require('fs');
const execSync = require('child_process').execSync;

const operation = process.argv[2];
const studentList = process.argv[3];
const branch = process.argv[4];

const repoRoot = 'git@github.com:rolling-scopes-school';
const courseSuf = '-BSU-course';
const repoFolder = 'repos';
const repoPath = `${__dirname}/${repoFolder}/`;

const operations = {
    clone: {
        command: (student) => { return `git clone ${repoRoot}/${student}${courseSuf}.git ./${repoFolder}/${student}`; }
    },
    pull: {
        command: (student) => { return `cd ${repoPath}${student} \n git pull`; },
    },
    checkout: {
        command: (student) => { return `cd ${repoPath}${student} \n git checkout ${branch}`; }
    }
}

const students = fs
    .readFileSync(`./${studentList}`, 'utf-8')
    .split('\n')
    .filter(function (student) {
        return student !== '';
    });

const failedToClone = [];

for (let i = 0; i < students.length; i++) {
    let student = students[i];

    try {
        console.log(`${operation} ${student}${courseSuf}`);
        let op = operations[operation].command(student);
        execSync(op);
        console.log(chalk.green('OK\n'));
    } catch (e) {
        failedToClone.push(student);
    }
}

if (failedToClone.length !== 0) {
    console.log(chalk.bold.red(`Failed to ${operation} some repos:\n`));
    console.log(failedToClone.join('\n'));
} else {
    console.log(chalk.bold.green('Success!'));
}