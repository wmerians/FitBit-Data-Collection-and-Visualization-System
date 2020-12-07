# Wyatt Merians
# sleep.py
# 12/7/2020

import json
import fitbit
import requests
import sys
import datetime
import boto3
from decimal import Decimal

from newItems import newItemDB
from update import averageSleepMinuteData, updateSleep

# Grab sleep data
def sleep(auth2_client, table, user, dateVal, dateName):
	try:
		# Grab sleep data for dateVal
		fitData = auth2_client.sleep(date=dateVal)
		# clean up sleep data	
		updatedFitData = averageSleepMinuteData(fitData)
		# Per item in fitData
		for i in updatedFitData['sleep']:
			# Insert in dynamoDBD
			updateSleep(table, user, dateName, i)
	except fitbit.exceptions.HTTPBadRequest: # Error if path does not exist
		print(i, "is an invalid path")
	except fitbit.exceptions.HTTPTooManyRequests: # Error if too many requests
		print("Too many requests")
		sys.exit()
	except Exception as e: # try to catch other errors without crashing
		print(e)
