const fs = require('fs');
const execSync = require('child_process').execSync;

const studentList = process.argv[2];
const operation = process.argv[3];

const repoRoot = 'git@github.com:rolling-scopes-school';
const courseSuf = '-BSU-course';
const repoFolder = 'repos';
const repoPath = `~/Workspace/projects/front-end-school/students-scripts/${repoFolder}/`;
let student;

const operations = {
    clone: `git clone ${repoRoot}/'${student}${courseSuf}.git ./${repoFolder}/${student}`,
    pull: `cd ${repoPath}${student} \n git pull`,
    checkout: 'checkout'
}

const students = fs
    .readFileSync(`./${studentList}`, 'utf-8')
    .split('\n')
    .filter(function (student) {
        return student !== '';
    });

const failedToClone = [];

for (let i = 0; i < students.length; i++) {
    student = students[i];
    try {
        console.log(`pulling ${student}${courseSuf}\n`);

        execSync(`cd ${repoPath}${student} \n git pull`);

    } catch (e) {
        failedToClone.push(student);
    }
}

if (failedToClone.length !== 0) {
    console.log('Failed to pull some repos:\n');
    console.log(failedToClone.join('\n'));
} else {
    console.log('Success!');
}