import csv
import json

data = {}
# Open a csv reader called DictReader
with open('timelinecontent.csv', encoding='utf-8') as csvf:
    csvReader = csv.DictReader(csvf)

    # Convert each row into a dictionary
    # and add it to data
    for rows in csvReader:
        key = rows['ID']
        data[key] = rows

        # Coins have extra property obverse and reverse
        # which are named using the following convention
        # startPeriod_Name_obverse(reverse).png
        if rows["Type"] == "Coin":
            image_name = 'assets/images/' + str(rows["Start"]) + "_" + rows["Name"].lower(
            ).replace(" ", "_").replace(".", "").replace("-", "_") + "_{type}.png"
            data[key]["Obverse"] = image_name.format(type="obverse")
            data[key]["Reverse"] = image_name.format(type="reverse")


# Open a json writer, and use the json.dumps()
# function to dump data
with open("timelinecontent.js", 'w', encoding='utf-8') as js:
    js.write("export const TimeLineData = "+json.dumps(data, indent=4))
