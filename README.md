# FitBit Data Collection and Visualization System

## Table of Contents
* [About](#about)
* [Contact Me](#contact-me)
* [Introduction](#introduction)
* [General Information](#general-information)
* [Folder Information](#folder-information)
* [Visualization Results](#visualization-results)
* [Poster Presentation](#poster-presentation)
* [Video Presentation](#video-presentation)
* [Useful Resources](#useful-resources)
* [Sources](#sources)
* [Acknowledgements](#acknowledgements)

## About
**Author:** Wyatt Merians <br/>
**Title:** FitBit Data Collection and Visualization System _or_ Enhancing Healthcare Chatbot Experience through Fitbit Data <br/>
**Mentor:** Dr. Hidy Kong <br/>
**Project Timeline:** Developed from March 2020 to December 2020.

## Contact Me
If you have questions, confusion, or any other reason, please contact me at _w.merians@gmail.com_ with this project title in the subject line, and I will get back to you as soon as possible.

## Introduction
Enhancing Healthcare Chatbot Experience through Fitbit Data: This is a FitBit Collection and Visualization System that I designed and developed to integrate FitBit Data into CocoBot, a mobile app chatbot for caregivers of children with chronic conditions.

## General Information
### Project Status
My portion of this project is finished; my goal was to learn how to grab data from FitBit and start the process of integration with Cocobot. This project will be continued by other team members on this joint project by Seattle University and The University of Washington.
### Future Improvements
In order to improve the lambda function's speed, one ought to the lambda function into two lambda functions: One to authorize and the other to grab and save data.
### Technologies
This project was developed in Python and Javascript, utilizing other tools when necessary.
#### Python
Python was used in two parts. The first is the collection of FitBit Data, and the second is the integration via Amazon Web Services (AWS) Lambda and AWS DynamoDB. <br/>
In order to accomplish the first section and collect the data, I utilized both FitBit API and FitBit SDK. I also used the datetime, os, json, and sys Python modules. I also used Oauth2 by ORCAS. <br/>
In order to accomplish the second section and to collect data via AWS Lambda, I utilized everything in the first section and used AWS Lambda, AWS DynamoDB, boto3 (required for AWS), Requests, and decimal.
#### Javascript
Javascript was used to create the initial visualizations. We focused on creating heatmaps via D3.
### Scope of functionalities
Grab FitBit Data via one's computer or an AWS Lambda Function, and create activity and sleep visualizations from a JSON file.

## Folder Information
### D3
The D3 Folder encapsulates the files that created the D3 visualizations. This folder contains both the activity and sleep initial visualizations. The results can be seen in Visualization Results.
### FitBit
The FitBit Folder encapsulates the files to grab and collect FitBit activity and sleep data. These files were the first developed and used to learn how to grab data. If you want to use these files for your own project, you will need to register a FitBit app in order to get Client ID and Secret. I removed mine for security and privacy purposes, but if you add all the needed modules and add your own Client ID and Secret, these files will allow you to grab FitBit data.
### Lambda
The Lambda Folder encapsulates the files I wrote to allow FitBit Data to be collected and saved to AWS DynamoDB via a Lambda Function. These files also parse and save the data correctly. In order to be used, one will have to add in the Lambda, DynamoDB, and FitBit API & SDK missing information. Additionally, one would have to add the missing modules and then zip everything together and upload to their Lambda function.

## Visualization Results
### Activity Visualization (in Calories)
![Activity Visualization](https://user-images.githubusercontent.com/52422172/102399744-a462ee00-3fa6-11eb-80c6-5e9eaaf878a4.png)
### Sleep Visualization
![Sleep Visualization](https://user-images.githubusercontent.com/52422172/102399914-d411f600-3fa6-11eb-90aa-3c3267f82a37.png)

## Poster Presentation
![Merians Poster](https://user-images.githubusercontent.com/52422172/102400648-dd4f9280-3fa7-11eb-9491-ec6f03e6679a.png)

## Video Presentation

## Useful Resources
FitBit SDK and API Documentation listed in Sources. These sources take a lot of reading and diving in order to find everything one is looking for. <br/>
"Using the Fitbit Web API with Python" by Michael Galarnyk is a great tutorial and introduction to grabbing FitBit data. I used this article to learn and set up my own initial FitBit collection system. <br/>
AWS Lambda and DynamoDB documentation. 

## Sources
**FitBit SDK:** https://dev.fitbit.com/build/reference/web-api/ <br/>
**FitBit API:** https://python-fitbit.readthedocs.io/en/latest/#quickstart <br/>
**Oauth2:** https://github.com/orcasgit/python-fitbit/blob/master/gather_keys_oauth2.py <br/>
**"Using the Fitbit Web API with Python" by Michael Galarnyk:** https://towardsdatascience.com/using-the-fitbit-web-api-with-python-f29f119621ea 
**AWS Lambda:** https://docs.aws.amazon.com/lambda/latest/dg/welcome.html
**AWS DynamoDB:** https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.get_item

## Acknowledgements
I want to thank my mentor Dr. Hidy Kong, who guided me throughout this project. Additionally, I want to thank Will Kearns, Weichao Yuwen, and the rest of the CocoBot Team at the University of Washington.
