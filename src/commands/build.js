const { exec } = require('child_process');

module.exports = {
  name: 'build',
  description: 'trigger a build on specific job (actually only on static-ticket)',
  execute(req, res) {
    const args = req.body.message.argumentText.split(' ').slice(1);

    if (args.length > 1) return res.send({ text: 'I only accept *one* argument for this command: branch name of static-ticket repository.' });

    try {
      // res.send({ text: `Trying to build branch *${args[0]}*` });

      exec(`java -jar jenkins-cli.jar -s http://jenkins.qa.directtalk.com.br:8080/jenkins/ build "static-ticket_Deploy_RC" -p Machine=Licence -p Branch=${args[0]} -v -f`, (error, stdout, stderr) => {
        const link = `https://alexandria.hiplatform.com/jenkins/job/static-ticket_Deploy_RC/${stdout.substr(stdout.length - 15, 3)}/console`;

        if (error || stderr) {
          return res.send({ text: `I couldnt finish build ${stdout.substring(stdout.length - 17)}${link}` });
        }

        return res.send({ text: `Build ${stdout.substring(stdout.length - 17)}${link}` });
      });
    } catch (error) {
      console.error('Error on build command', error);
    }
  },
};
