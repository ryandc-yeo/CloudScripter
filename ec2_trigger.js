import { EC2Client, RunInstancesCommand } from "@aws-sdk/client-ec2";

export const handler = async (event) => {
  const REGION = process.env.REGION;
  const AMI = process.env.AMI;
  const INSTANCE_TYPE = process.env.INSTANCE_TYPE;
  const KEY_NAME = process.env.KEY_NAME;
  const SUBNET_ID = process.env.SUBNET_ID;

  const ec2Client = new EC2Client({ region: REGION });

  const initScript = `#!/bin/bash
        yum update -y
        yum install -y httpd24
        service httpd start
        chkconfig httpd on
        echo > /var/www/html/index.html
        shutdown -h +5`;

  const runInstancesParams = {
    ImageId: AMI,
    InstanceType: INSTANCE_TYPE,
    KeyName: KEY_NAME,
    SubnetId: SUBNET_ID,
    MaxCount: 1,
    MinCount: 1,
    InstanceInitiatedShutdownBehavior: "terminate",
    UserData: Buffer.from(initScript).toString("base64"),
  };

  const runInstancesCommand = new RunInstancesCommand(runInstancesParams);
  try {
    const data = await ec2Client.send(runInstancesCommand);
    console.log("Instance ID:", data.Instances[0].InstanceId);
  } catch (err) {
    console.error("Error:", err);
  }
};
