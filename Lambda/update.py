# Wyatt Merians
# update.py
# 12/7/2020

import json
import fitbit
import requests
import sys
import datetime
import boto3
from decimal import Decimal

# Code to replace floats by Will Kearns
def replace_floats(obj):
	if isinstance(obj, list):
		for i in range(len(obj)):
			obj[i] = replace_floats(obj[i])
		return obj
	elif isinstance(obj, dict):
		for k in obj:
			obj[k] = replace_floats(obj[k])
		return obj
	elif isinstance(obj, float):
		return Decimal(str(obj))
	elif obj == "":
		return None
	else:
		return obj

# Average sleep minutes to 15 minute intervals
def averageSleepMinuteData(obj):
	sumVal = 0
	dateSum = ""
	minuteList = []
	# find correct section of data
	for i in obj['sleep']:
			for j in i:
				if j == "minuteData":
					# for every element
					for k in i[j]:
						# for every 15 minute chunk, sum data then average and save append it to minuteList
						if ":00:" in k["dateTime"]:
							if dateSum != "":
								sumVal /= 15
								newDict = {
									"dateTime": dateSum,
									"value": str(sumVal)
								}
								minuteList.append(newDict)
							dateSum = k["dateTime"]
							sumVal = 0
							sumVal += int(k["value"])
						elif ":15:" in k["dateTime"]:
							if dateSum != "":
								sumVal /= 15
								newDict = {
									"dateTime": dateSum,
									"value": str(sumVal)
								}
								minuteList.append(newDict)
							dateSum = k["dateTime"]
							sumVal = 0
							sumVal += int(k["value"])
						elif ":30:" in k["dateTime"]:
							if dateSum != "":
								sumVal /= 15
								newDict = {
									"dateTime": dateSum,
									"value": str(sumVal)
								}
								minuteList.append(newDict)
							dateSum = k["dateTime"]
							sumVal = 0
							sumVal += int(k["value"])
						elif ":45:" in k["dateTime"]:
							if dateSum != "":
								sumVal /= 15
								newDict = {
									"dateTime": dateSum,
									"value": str(sumVal)
								}
								minuteList.append(newDict)
							dateSum = k["dateTime"]
							sumVal = 0
							sumVal += int(k["value"])
						else:
							sumVal += int(k["value"])
					# Replace data
					i[j] = minuteList
	return obj

# Update Sleep data in dynamoDb
def updateSleep(table, user, dateVal, value):
	response = table.update_item(
		Key={
			"userID": user,
			"date": dateVal
		},
		UpdateExpression="set #sType = :val",
		ExpressionAttributeNames={
			"#sType": "sleep"
		},
		ExpressionAttributeValues={
			":val": value
		}
	)
	print(response)

# set up the activity map to be able to hold activity data
def actDateSetup(table, user, dateVal):
	response = table.update_item(
		Key={
			"userID": user,
			"date": dateVal
		},
		UpdateExpression="set #aType=:val",
		ExpressionAttributeNames={
			"#aType": "activity"
		},
		ExpressionAttributeValues={
			":val": {
				"calories": {}, 
				"caloriesIntraday": {},
				"caloriesBMR": {},
				"steps": {},
				"stepsIntraday": {},
				"distance": {},
				"distanceIntraday": {},
				"minutesSedentary": {},
				"minutesSedentaryIntraday": {},
				"minutesLightlyActive": {},
				"minutesLightlyActiveIntraday": {},
				"minutesFairlyActive": {},
				"minutesFairlyActiveIntraday": {},
				"minutesVeryActive": {},
				"minutesVeryActiveIntraday": {},
				"activityCalories": {}
			}
		}
	)
	print(response)

# update activity in dynamoDB
def updateAct(table, user, dateVal, cat, value):
	response = table.update_item(
		Key={
			"userID": user,
			"date": dateVal
		},
		UpdateExpression="set #aType.#category=:val",
		ExpressionAttributeNames={
			"#aType": "activity",
			"#category": cat
		},
		ExpressionAttributeValues={
			":val": value
		}
	)
	print(response)
