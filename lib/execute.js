const fs = require('fs');
const execSync = require('child_process').execSync;

const studentList = process.argv[3];
const operation = process.argv[2];

const repoRoot = 'git@github.com:rolling-scopes-school';
const courseSuf = '-BSU-course';
const repoFolder = 'test';
const repoPath = `${__dirname}/${repoFolder}/`;

const operations = {
    clone: {
        command: (student) => { return `git clone ${repoRoot}/${student}${courseSuf}.git ./${repoFolder}/${student}`; }
    },
    pull: {
        command: (student) => { return `cd ${repoPath}${student} \n git pull`; },
    },
    checkout: {
        command: () => { return 'checkout'; }
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
        console.log(`${operation} ${student}${courseSuf}\n`);
        let op = operations[operation].command(student);
        execSync(op);
    } catch (e) {
        failedToClone.push(student);
    }
}

if (failedToClone.length !== 0) {
    console.log(`Failed to ${operation} some repos:\n`);
    console.log(failedToClone.join('\n'));
} else {
    console.log('Success!');
}