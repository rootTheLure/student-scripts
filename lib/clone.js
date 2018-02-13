var fs = require('fs');
var execSync = require('child_process').execSync;

var repoRoot = 'git@github.com:rolling-scopes-school';
var courseSuf = '-BSU-course';

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
		console.log(`clonning ${repoRoot}/'${student}${courseSuf}.git\n`);

		execSync('git clone git@github.com:rolling-scopes-school/' + student + '-BSU-course.git ./repos/' + student);
	} catch (e) {
		failedToClone.push(student);
	}
}

if (failedToClone.length !== 0) {
    console.log('Failed to clone some repos:\n');
    console.log(failedToClone.join('\n'));
} else {
	console.log('Success!');
}