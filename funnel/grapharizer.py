import csv
import json

start_path = "???"
filename = '???'

def create_unique_paths(tuples):
    paths = []
    for pathOne, pathTwo, _ in tuples:
        paths.append(pathOne)
        paths.append(pathTwo)
    return list(set(paths))


def create_links(tuples):
    links = []
    total = count_starting_values(tuples, start_path)
    for pathTo, pathFrom, val in tuples:
        if pathTo != pathFrom:
            links.append(
                {
                    "source": unique_paths.index(pathFrom),
                    "target": unique_paths.index(pathTo),
                    "value": float(val)
                })
    return links


def create_nodes(unique_paths):
    nodes = []
    for path in unique_paths:
        nodes.append({
            "name": path,
            "group": 1
        })
    return nodes


def count_starting_values(tuples, first_step):
    val = 0
    for path, _, value in tuples:
        if path == first_step:
            val += int(value)
    return val


tuples = []
with open(filename) as tsv:
    for line in csv.reader(tsv, dialect="excel-tab"):
        tuples.append(line)

tuples.pop(0)

unique_paths = create_unique_paths(tuples)
nodes = create_nodes(unique_paths)
links = create_links(tuples)

whole_thing = {
    "nodes": nodes,
    "links": links
}

print json.dumps(whole_thing)
