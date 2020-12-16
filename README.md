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
**Author:** Wyatt Merians
**Title:** FitBit Data Collection and Visualization System _or_ Enhancing Healthcare Chatbot Experience through Fitbit Data
**Mentor:** Dr. Hidy Kong
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
Python was used in two parts. The first is the collection of FitBit Data, and the second is the integration via Amazon Web Services (AWS) Lambda and AWS DynamoDB.
In order to accomplish the first section and collect the data, I utilized both FitBit API and FitBit SDK. I also used the datetime, os, json, and sys Python modules. I also used Oauth2 by ORCAS.
In 
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
The Lambda Folder encapsulates the files I wrote to allow FitBit Data to be collected and saved to AWS DynamoDB via a Lambda Function. In order to be used, one will have to add in the Lambda, DynamoDB, and FitBit API & SDK missing information. Additionally, one would have to add the missing modules and then zip everything together and upload to their Lambda function.

## Visualization Results

## Poster Presentation

## Video Presentation

## Useful Resources
FitBit SDK and API Documentation listed in Sources. These sources take a lot of reading and diving in order to find everything one is looking for.
"Using the Fitbit Web API with Python" by Michael Galarnyk is a great tutorial and introduction to grabbing FitBit data. I used this article to learn and set up my own initial FitBit collection system.

## Sources
**FitBit SDK:** https://dev.fitbit.com/build/reference/web-api/
**FitBit API:** https://python-fitbit.readthedocs.io/en/latest/#quickstart
**Oauth2:** https://github.com/orcasgit/python-fitbit/blob/master/gather_keys_oauth2.py
**"Using the Fitbit Web API with Python" by Michael Galarnyk:** https://towardsdatascience.com/using-the-fitbit-web-api-with-python-f29f119621ea

## Acknowledgements
I want to thank my mentor Dr. Hidy Kong, who guided me throughout this project. Additionally, I want to thank Will Kearns, Weichao Yuwen, and the rest of the CocoBot Team at the University of Washington.
