# Merians, Wyatt
# monthActivity.py
# Last Edit Day: 7/21/2020
# Clean Up Day: 12/4/2020

import fitbit
import gather_keys_oauth2 as Oauth2
import datetime
import json
import os
import sys

# Plug in Client ID and Secret
CLIENT_ID = ''
CLIENT_SECRET = ''

server = Oauth2.OAuth2Server(CLIENT_ID, CLIENT_SECRET)
server.browser_authorize()

ACCESS_TOKEN = str(server.fitbit.client.session.token['access_token'])
REFRESH_TOKEN = str(server.fitbit.client.session.token['refresh_token'])

auth2_client = fitbit.Fitbit(CLIENT_ID, CLIENT_SECRET, oauth2=True, access_token=ACCESS_TOKEN, refresh_token=REFRESH_TOKEN)

# Array of the path to grab certain data
pathArr = ["activities/calories/", 
					 "activities/caloriesBMR/",
					 "activities/steps/",
		 			 "activities/distance/",
					 "activities/floors/",
					 "activities/elevation/",
					 "activities/minutesSedentary/",
					 "activities/minutesLightlyActive/",
					 "activities/minutesFairlyActive/",
					 "activities/minutesVeryActive/",
					 "activities/activityCalories/"
					]

# Set yesterday as a date
yesterday = str((datetime.datetime.now() - datetime.timedelta(days=1)).strftime("%Y-%m-%d"))

for i in pathArr: # per item in pathArr
	try:
		# Grab Data
		fitData = auth2_client.time_series(i, base_date=yesterday, period='1m')
		print(fitData)
	except fitbit.exceptions.HTTPBadRequest: # Error if path does not exist
		print(i, "is an invalid path")
	except fitbit.exceptions.HTTPTooManyRequests: # Error if too many requests
		print("Too many requests")
		sys.exit()
