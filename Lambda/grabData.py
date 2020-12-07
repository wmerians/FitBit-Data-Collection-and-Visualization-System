# Wyatt Merians
# grabData.py
# 12/7/2020

import json
import fitbit
import requests
import sys
import datetime
import boto3

from decimal import Decimal

from newItems import newItemDB
from activity import activity
from sleep import sleep

# Order for data saving (each function calls these functions at the end)
# 1. Create the organizational structure for dynamoDB: newItemDB()
# 2. Grab and save sleep data: sleep()
# 3. Grab and save activity data: activity()

# Note: for any item in dynamoDB, one must save it all at once (in one script) or it will 
# overwrite previously saved data.

# Today's Data
def todayData(auth2_client, table, user, pstTime, pathArr):
	# set today for grabbing data
	today = str((pstTime).strftime("%Y-%m-%d"))	
	# set today for saving data to dynamoDB
	todayDate = str((pstTime).strftime("%m%d%Y"))
	
	newItemDB(table, user, todayDate)
	sleep(auth2_client, table, user, today, todayDate)
	activity(auth2_client, table, pathArr, user, today, todayDate)

# to grab a single days data
def oneData(auth2_client, table, user, pstTime, pathArr, pastNum):
	# set date for grabbing data
	day = str((pstTime - datetime.timedelta(days=pastNum)).strftime("%Y-%m-%d"))	
	# set date for saving data to dynamoDB
	dataDate = str((pstTime - datetime.timedelta(days=pastNum)).strftime("%m%d%Y"))
	
	newItemDB(table, user, dataDate)
	sleep(auth2_client, table, user, day, dataDate)
	activity(auth2_client, table, pathArr, user, day, dataDate)

# Past Two Week or a specific range
def rangeData(auth2_client, table, user, pstTime, pathArr, rangeStart, rangeEnd):
	# loop starting from rangeStart ending when j = rangeEnd
	for j in range(rangeStart, rangeEnd):
		# set date for grabbing data
		day = str((pstTime - datetime.timedelta(days=j)).strftime("%Y-%m-%d"))
		# set date for saving data to dynamoDB
		dataDate = str((pstTime - datetime.timedelta(days=j)).strftime("%m%d%Y"))		
	
		newItemDB(table, user, dataDate)
		sleep(auth2_client, table, user, day, dataDate)
		activity(auth2_client, table, pathArr, user, day, dataDate)
