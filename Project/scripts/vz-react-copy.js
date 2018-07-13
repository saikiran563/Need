var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

var os = require('os');

if (os.type() === 'Linux') 
   exec("cp -a ./node_modules/VZ-React-Dev/. ./src/vz-react", puts); 
else if (os.type() === 'Darwin') 
   exec("cp -a ./node_modules/VZ-React-Dev/. ./src/vz-react", puts); 
else if (os.type() === 'Windows_NT') 
   exec("xcopy \"node_modules/VZ-React-Dev\" \"src/vz-react\" /E", puts);
else
   throw new Error("Unsupported OS found: " + os.type());