const { exec } = require('child_process');
const { postMessage } = require('../utils');

module.exports = {
  name: 'build',
  description: 'starts a build on specific job (actually only on static-ticket)',
  execute(req, res) {
    const { sender: { name: senderName }, thread, argumentText } = req.body.message;
    const args = argumentText.split(' ').slice(2);
    console.log(args);

    if (args.length > 1) return res.send({ text: 'I only accept *one* argument for this command: branch name of *static-ticket* repository.' });

    const options = {
      data: {
        thread,
      },
    };

    try {
      res.send({ text: `Starting build process of branch *${args[0]}*. Will report status soon 🤘` });

      exec(`java -jar jenkins-cli.jar -s http://jenkins.qa.directtalk.com.br:8080/jenkins/ build "static-ticket_Deploy_RC" -p Machine=Licence -p Branch=${args[0]} -v -f`, (error, stdout, stderr) => {
        const link = `https://alexandria.hiplatform.com/jenkins/job/static-ticket_Deploy_RC/${stdout.substr(stdout.length - 15, 3)}/console`;

        if (error || stderr) {
          options.data.cards = [{
            header: {
              title: '1001 Jenkins',
              subtitle: 'Build failed 😔',
              imageUrl: 'https://lh3.googleusercontent.com/proxy/fI_xSzgrxu6Ckw7OSHbutybNupGcnX2tyqnoVG3qZSmDDQcPDJ2YvVwuj5ZM3wi7hzb-CArqASXsre6Mdiv9GsndmYi7CuWeAQdko5VhjreSlxBVqW5qur6F9Q=s88-c-mo',
              imageStyle: 'IMAGE',
            },
            sections: [{
              widgets: [{
                textParagraph: {
                  text: `I couldnt finish build ${stdout.substring(stdout.length - 17)}`,
                },
                buttons: [{
                  textButton: {
                    text: 'OPEN JENKINS CONSOLE',
                    onClick: {
                      openLink: {
                        url: link,
                      },
                    },
                  },
                }],
              }],
            }],
          }];

          // options.data.text = `<${senderName}>, I couldnt finish build ${stdout.substring(stdout.length - 17)}${link}`;
          return postMessage(options);
        }

        options.data.text = `<${senderName}>, Build ${stdout.substring(stdout.length - 17)}${link}`;
        return postMessage(options);
      });
    } catch (error) {
      console.error('Error when trying to start a build', error);
      options.data.text = `<${senderName}>, Something when wrong when processing your build. 😔`;
      return postMessage(options);
    }

    return true;
  },
};
