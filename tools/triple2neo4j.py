import requests

dataset = 5
schema = 5

# Extract
url = "http://127.0.0.1:8000/datasets/turtles/"+str(dataset)

headers = {'Accept': 'application/json'}

r = requests.get(url, headers=headers)

for turtle in r.json():

    print(turtle['predicate'])

    property = {
        "name": turtle['predicate'],
    }
    

    predicate = requests.post(
        'http://localhost:3333/api/property/'+str(schema), headers=headers, data=property)
    print(predicate.json())

    turtle['predicate'] = 'P'+str(predicate.json()['id'])

    # # transform

    # # load
    rep = requests.post('http://localhost:3333/api/entity/'+str(schema), data=turtle)
    print(rep.json())
