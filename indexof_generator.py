import glob
import os
import re
from os import walk

asset_file = "/assets"
project_name = "/linktree"
current_dict = os.getcwd()
files = []


def atoi(text):
    return int(text) if text.isdigit() else text


def natural_keys(text):
    return [atoi(x) for x in re.split(r"(\d+)", text)]


for (dirpath, dirnames, filenames) in walk(current_dict + asset_file):
    sorted_url = dirpath.replace(current_dict, "")
    getted_files = glob.glob(dirpath + "/*")
    getted_files = sorted(getted_files, key=natural_keys)
    new_html = f"""<!DOCTYPE html>
    <html><head>
    <title>Index of {project_name + sorted_url}</title>
    </head>
    <body>
    <h1>Index of {project_name + sorted_url}</h1>
    <table>
    <tbody><tr><td><a href="../"><=Back</a></td></tr>"""
    for dicted in getted_files:
        print(dicted)
        sorted2 = dicted.replace(current_dict, "")
        print(dirpath)
        sorted3 = dicted.replace(dirpath + "/", "")
        if sorted3 != "index.html":
            new_html += f"""
            <tr><td><a href="{sorted3}">{sorted3}</a></td></tr>
            """
    new_html += "</tbody></table></body></html>"
    with open(dirpath + "/index.html", "w+") as file1:
        file1.write(new_html)
