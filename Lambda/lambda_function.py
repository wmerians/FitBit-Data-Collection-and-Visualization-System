# Wyatt Merians
# lambda_function.py
# 12/7/2020

import json
import fitbit
import requests
import sys
import datetime
import boto3

from decimal import Decimal
from grabData import todayData, oneData, rangeData


def lambda_handler(event, context):
	# CODE TO AUTHORIZE THE USER
	# Add client ID and secret to authorize
	CLIENT_ID = ''
	CLIENT_SECRET = ''
 	
	# Lambda code to receive correct information to run
	code = event["queryStringParameters"]["code"]
	url = 'https://api.fitbit.com/oauth2/token'
	load = {'code': code, 'grant_type': 'authorization_code', 'client_id': '', 'redirect_uri': ''} # Add Missing Info (Removed for security purposes)
	headers = {'Authorization': '', 'Content-Type': 'application/x-www-form-urlencoded'} # Add missing Info (removed for security purposes)
	r = requests.post(url, params=load, headers=headers)

	response = r.json()
	token = response['access_token']
	rToken = response['refresh_token']

	# Authorization
	authd_client = fitbit.Fitbit(CLIENT_ID, CLIENT_SECRET, access_token=token, refresh_token=rToken)
	
	# Paths for all activity (intraday)
	act_paths = [ "activities/calories/",
						 		"activities/caloriesBMR/",
								"activities/steps/",
								"activities/distance/",
								"activities/minutesSedentary/",
								"activities/minutesLightlyActive/",
								"activities/minutesFairlyActive/",
								"activities/minutesVeryActive/",
								"activities/activityCalories/"
							] 

	# way to set pacific standard time
	pstTime = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=-7)))

	# connect to dynamodb
	dynamodb = boto3.resource('dynamodb')
	# Removed table name for security purposes (add back in for use)
	table = dynamodb.Table('')

	# user's name
	user = "Test"

	# This method grabs today's data
	todayData(authd_client, table, user, pstTime, act_paths)

	# This method grabs one days worth of data & final num is changeable based on what day they wanna grab
	oneData(authd_client, table, user, pstTime, act_paths, 1) # num = how many days ago the day was

	# grab the past two weeks or another range
	rangeData(authd_client, table, user, pstTime, act_paths, 1, 15)

	# return callback url
	return {
		'statusCode': 200,
		'body': json.dumps('Hello from Lambda!')
	}
