const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const start_time = process.argv[2].split(':')[1];
const report = process.argv[3].split(':').slice(1).join(':');

const slackBlocks = (timestamp, branch, duration, result) => {
  timestamp = timestamp.replaceAll('-', ':');

  const attachmentsArray = [
    {
      blocks: [
        {
          type: 'section',
          fields: [
            {
              // time of execution
              type: 'mrkdwn',
              text: `*Test Execution started at:*\n ${timestamp}`
            },
            {
              // branch
              type: 'mrkdwn',
              text: `*Branch:*\n${branch}`
            }
          ]
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          fields: [
            {
              // total tests and duration
              type: 'mrkdwn',
              text: `*Total Tests:*\n${result.totalScenarios}\n*Duration:*\n${duration}s`
            },
            {
              // summary
              type: 'mrkdwn',
              text: `*Summary:*\n\n:large_green_circle: PASS - ${result.totalPassedScenarios}\n\n:red_circle: FAIL - ${result.totalFailedScenarios}`
            }
          ]
        },
        {
          type: 'divider'
        },
        {
          type: 'section',
          text: {
            // report link
            type: 'mrkdwn',
            text: 'See details in report'
          },
          accessory: {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'View Report',
              emoji: true
            },
            value: 'click_me_report',
            url: `${result.report}`,
            action_id: 'button-action'
          }
        }
      ]
    }
  ];

  const failedScenariosBlock = [
    {
      type: 'divider'
    },
    {
      type: 'section',
      text: {
        // failed scnenarios
        type: 'mrkdwn',
        text: `*Failed Test/s Overview*\`\`\`\n${result.failedScenarioNames}\`\`\``
      }
    }
  ];

  const additionalReportBlock = [
    {
      type: 'divider'
    },
    {
      type: 'section',
      text: {
        // vrt link
        type: 'mrkdwn',
        text: 'Visual Regression Tracker'
      },
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'Launch',
          emoji: true
        },
        value: 'click_me_report',
        url: `${result.vrt}`,
        action_id: 'button-action'
      }
    },
    {
      type: 'divider'
    },
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: '<@U03MXPE82H2> / <@U035JQ60G0P>\nPlease check the failure !'
        }
      ]
    }
  ];

  attachmentsArray[0].color = result.totalFailedScenarios
    ? '#C21E56'
    : '#3CB371';

  if (result.totalFailedScenarios > 0 && result.totalFailedScenarios <= 10) {
    attachmentsArray[0].blocks =
      attachmentsArray[0].blocks.concat(failedScenariosBlock);
  }
  if (result.totalFailedScenarios) {
    attachmentsArray[0].blocks = attachmentsArray[0].blocks.concat(
      additionalReportBlock
    );
  }

  return attachmentsArray;
};

// Read report json data
const data = JSON.parse(fs.readFileSync('cypress/reports/index.json'));

const stats = data.stats;
const totalFeatures = stats.suites;
const totalScenarios = stats.tests;
const totalPassedScenarios = stats.passes;
const totalFailedScenarios = stats.failures;
const msec = stats.duration;
let failedScenarioNames = '';

const results = data.results;

for (const test of results) {
  const suites = test.suites[0].tests;
  for (const suite of suites) {
    if (suite.pass === false) {
      failedScenarioNames += `${
        path.parse(test.fullFile).base
      } - ${suite.title.replace(/#/g, '# ')}\n`;
    }
  }
}

console.info('\n================================================');
console.info('\nTotal Features Executed - ' + totalFeatures);
console.info('\nTotal Scenarios Executed - ' + totalScenarios);
console.info('\nTotal Scenarios Passed - ' + totalPassedScenarios);
console.info('\nTotal Scenarios Failed - ' + totalFailedScenarios);
console.info('\n================================================');

const failedScenariosList =
  '\n' +
  '-'.repeat(65) +
  '\nFailed Scenarios\n' +
  '-'.repeat(65) +
  '\n' +
  failedScenarioNames;

console.info(failedScenariosList);

const duration = Math.ceil(msec / 1000);

const branch = execSync('ls .git/refs/heads');

const result = {};
result.totalScenarios = totalScenarios;
result.totalPassedScenarios = totalPassedScenarios;
result.totalFailedScenarios = totalFailedScenarios;
result.failedScenarioNames = failedScenarioNames;
result.report = report;
result.vrt =
  'https://vrt-dev.devplat.comcast.com/5be062d1-b966-4f86-b33b-c81a53918372';

const blocks = slackBlocks(start_time, branch, duration, result);

const slackNotification = JSON.stringify(blocks, null, '\t');

fs.writeFileSync('tests-slack-notification.json', slackNotification);