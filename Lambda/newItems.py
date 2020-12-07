# Wyatt Merians
# newItems.py
# 12/7/2020

import json
import fitbit
import requests
import sys
import datetime
import boto3

# Create a new DynamoDB item
def newItemDB(table, user, dateVal):
	response = table.put_item (
		TableName='fitbitData',
		ConditionExpression="attribute_not_exists(Id)",
		Item={
			"userID": user,
			"date": dateVal,
			"activity": {
  		},
			"sleep": {
			}
 		}
	)
	print(response)
