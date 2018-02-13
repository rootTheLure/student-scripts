var fs = require('fs');
var execSync = require('child_process').execSync;

var students = fs
    .readFileSync('./students4', 'utf-8')
    .split('\n')
    .filter(function (student) {
        return student !== '';
    });

var failedToClone = [];
var student;

for (var i = 0; i < students.length; i++) {
    student = students[i];
    try {
        console.log('>>>> ' + student + '\n');

        execSync('cd ~/Workspace/projects/front-end-school/students-scripts/repos/' + student + '\n git checkout TDD');

    } catch (e) {
        failedToClone.push(student);
    }
}

if (failedToClone.length !== 0) {
    console.log('Failed to checkout some repos:\n');
    console.log(failedToClone.join('\n'));
} else {
    console.log('Success!');
}
