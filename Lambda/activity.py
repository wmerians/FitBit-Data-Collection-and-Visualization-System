# Wyatt Merians
# activity.py
# 12/7/2020

import json
import fitbit
import requests
import sys
import datetime
import boto3
from decimal import Decimal

from update import replace_floats, actDateSetup, updateAct 

def activity(auth2_client, table, pathArr, user, dateVal, dateName):
	try:
		#set up dynamoDB to insert in activity
		actDateSetup(table, user, dateName)
		for i in pathArr: #per item in pathArr
			# cat is category or the name in pathArr without / or -
			sep = i.split('/')
			cat = sep[1]
	
			# grab fitData
			fitData = auth2_client.intraday_time_series(i, base_date=dateVal, detail_level="15min")			

			# remove floats and replace with decimals
			val = replace_floats(fitData)
			for j in val:
				if "intraday" in j:
					# if j includes intraday append it to the category
					iCat = [cat, "Intraday"]
					cat2 = ''.join(iCat)
					# clean up activity data with Intraday
					updateAct(table, user, dateName, cat2, val[j])
				else:
					# clean up activity without intraday
					updateAct(table, user, dateName, cat, val[j])
	
	except fitbit.exceptions.HTTPBadRequest: # Error if path does not exist
		print(i, "is an invalid path")
	except fitbit.exceptions.HTTPTooManyRequests: # Error if too many requests
		print("Too many requests")
		sys.exit()
	except Exception as e: # catch exceptions
		print(e)
