# AWS EC2 Deployment Steps

implements the deployment process outlined in the following medium article:

https://hackernoon.com/tutorial-creating-and-managing-a-node-js-server-on-aws-part-1-d67367ac5171

condenses a bunch of the steps into bash scripts (in particular install.js takes care of 4-5 parts of the installation process for the remote server)

this process assumes the following:

1. AWS account with correct IAM permissions for EC2
2. the AWS CLI configured locally  
3. EC2 SSH key for the EC2 instance called "esee.pem" saved to ./.ssh folder 

these are the package.json scripts:

```json
"dep-connect" : "cd ~/.ssh & ssh -i ~/.ssh/esee.pem ubuntu@$npm_package_publicDNS",
"dep-install" : "chmod 400 ./deploy/install & ./install ubuntu@$npm_package_publicDNS",
"dep-nginx" : "chmod 400 ./nginxConfig & ./nginxConfig",
"deploy" : "pm2 deploy ecosystem.config.js production",
```

This is the AWS CLI script to launch an EC2- careful - don't wanna blow the free tier :p

```bash
aws ec2 run-instances --launch-template LaunchTemplateId=lt-04dfc64765fa9b907,Version=1 >> ./deploy/ec2Init.json
```

template data is listed at the bottom.



# Its a Process


### Part Zero- make sure you have...

1. An EC2 instance running and configured to your local AWS CLI - the LaunchTemplate is the free tier.

2. A github repo initalized with SSH 



### Part One- on the local machine

1. place the public address from the EC2 console at the top of package.json as "publicDNS"

2. "npm run dep-install" - shells into the remote server and runs all the installation scripts via pseudo-terminal (putting nginx, node, postgres, pm2 on the remote instance)



### Part Two- on the remote machine

1. connect - "npm run dep-connect" to shell into EC2 to configure on the remote server.

2. configure git- 

	a. make SSH key:

		ssh-keygen -t rsa  use default name, NO PASS PHRASE
		
		less ~/.ssh/id_rsa.pub - copy...

	b. paste in github repo under settings/deploy keys

	c. have the remote server load the SSH key automatically:

		nano ~/.bashrc

		paste in at the top:

		eval `ssh-agent -s`

		ssh-add

3. git clone

4. complete nginx config from repo- "npm run dep-nginx" 

    run "sudo nginx -t" to check that everything is configged correctly

    run "sudo service nginx restart" for good measure

5. run sudo npm i 

6. test if the project runs as cloned, if not, manually change it on the local server, then push the changes until it works. changing on the remote server won't help- your changes will be lost later when you relay your local commits over server side 


### Part Three- back on the local machine- complete CI/CD toolchain with pm2

1. make sure pm2 is installed globally and locally with "--save-dev"

2. complete the ecosystem.config file.

This is the last one that worked:

```js

module.exports = {
  apps: [{
    name: 'Rawww',
    script: './main.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-69-228-6.us-west-2.compute.amazonaws.com',
      key: '~/.ssh/esee.pem',
      ref: 'origin/master',
      repo: 'git@github.com:iamjoncannon/Raw.git',
      path: '/home/ubuntu/Raw',
      'post-deploy': 'sudo npm install && sudo pm2 startOrRestart ecosystem.config.js'
    }
  }
}

```

3. run locally:

```bash
pm2 deploy ecosystem.config.js production setup
```

4. commit and push the ecosystem file to the repo

5. run locally:

```bash
pm2 deploy ecosystem.config.js production
```

or 

```bashchmod
npm run deploy
```

notes:

1. always push the bundled version of the app to the server- never use webpack on the server itself, this will create git issues. you can just literally run "webpack" one last time before git adding to make sure.

2. you got these two weird errors server side:

    warning: unable to access '/home/ubuntu/.config/git/ignore': Permission denied

    warning: unable to access '/home/ubuntu/.config/git/attributes': Permission denied

    but it didn't affect the app

    you can't access the .config folder to change these files, it must be an AWS thing


# AWS config on local machine 






### free tier for ubuntu



```json

{
    "LaunchTemplateData": {
        "EbsOptimized": false,
        "IamInstanceProfile": {
            "Arn": "arn:aws:iam::283564121446:instance-profile/EnablesEC2ToAccessSystemsManagerRole"
        },
        "BlockDeviceMappings": [
            {
                "DeviceName": "/dev/sda1",
                "Ebs": {
                    "Encrypted": false,
                    "DeleteOnTermination": true,
                    "SnapshotId": "snap-0ba61120c12fdc251",
                    "VolumeSize": 8,
                    "VolumeType": "gp2"
                }
            }
        ],
        "NetworkInterfaces": [
            {
                "AssociatePublicIpAddress": true,
                "DeleteOnTermination": true,
                "Description": "",
                "DeviceIndex": 0,
                "Groups": [
                    "sg-06ca17e9f8e10d552"
                ],
                "Ipv6Addresses": [],
                "PrivateIpAddresses": [
                    {
                        "Primary": true,
                        "PrivateIpAddress": "172.31.29.177"
                    }
                ],
                "SubnetId": "subnet-5fa49826"
            }
        ],
        "ImageId": "ami-005bdb005fb00e791",
        "InstanceType": "t2.micro",
        "KeyName": "esee",
        "Monitoring": {
            "Enabled": false
        },
        "Placement": {
            "AvailabilityZone": "us-west-2b",
            "GroupName": "",
            "Tenancy": "default"
        },
        "TagSpecifications": [
            {
                "ResourceType": "instance",
                "Tags": [
                    {
                        "Key": "Name",
                        "Value": "esee SEED"
                    }
                ]
            }
        ],
        "CreditSpecification": {
            "CpuCredits": "standard"
        },
        "CpuOptions": {
            "CoreCount": 1,
            "ThreadsPerCore": 1
        },
        "CapacityReservationSpecification": {
            "CapacityReservationPreference": "open"
        },
        "HibernationOptions": {
            "Configured": false
        }
    }
}

```
