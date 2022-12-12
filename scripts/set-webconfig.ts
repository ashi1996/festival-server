// Load node modules
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const folder_target = 'dist';
// Mapping file
// each property is a reference to .env variable name
const mapping = [
  {
    key: 'MYZONE',
    target: folder_target + '/src/web.config',
    port: 'APP_PORT',
  },
];
// File Output
const template = (port) => `<?xml version="1.0" encoding="UTF-8"?>

<!-- *******************************************************
// This file is generated automatically by the system
// **** Do not override - the content will be overwritten ****
// ******************************************************* -->

<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <clear />
                <rule name="ReverseProxyInboundRule1" stopProcessing="true">
                    <match url="(.*)" />
                    <conditions logicalGrouping="MatchAll" trackAllCaptures="false" />
                    <action type="Rewrite" url="http://localhost:${port}/{R:1}" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
`;
// Method for writing the file to directory
const writeFile = async (_path, _payload): Promise<[any, any]> =>
  new Promise((resolve, reject) => {
   if (!fs.existsSync(folder_target)) {
      fs.mkdirSync(folder_target);
    }
    fs.writeFile(_path, _payload, function (err) {
      if (err) {
        return reject([err, false]);
      } else {
        return resolve([null, _path]);
      }
    });
  });
// `environment.ts` file structure
mapping.forEach(async (item) => {
  // Create evniroment file payload
  const payload = template(process.env[item.port]);
  // Configure Angular `environment.base.ts` file path
  const absolutePath = path.join(__dirname, '..', item.target);
  // Log
  console.log('The file `web.config` will be written with the following content: \n',);
  console.log(payload);
  // invke writing to file system
  try {
      const [err, result] = await writeFile(absolutePath, payload);
      if (err) {
        console.log(result);
      } else {
        console.log(`IIS ${item.key} web.config file generated correctly at ${result} \n`);
      }
  } catch (error) {
      console.log('error');
      console.log(error);
  }
});